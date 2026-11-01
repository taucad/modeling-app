//! Conversions between KCL source data and Language Server Protocol types.

use tower_lsp::lsp_types::Diagnostic;
use tower_lsp::lsp_types::DiagnosticSeverity;
use tower_lsp::lsp_types::DiagnosticTag;
use tower_lsp::lsp_types::Position;
use tower_lsp::lsp_types::Range;

use crate::CompilationIssue;
use crate::errors::Severity;
use crate::errors::Suggestion;
use crate::errors::Tag;

/// Convert an object into LSP diagnostics for a source document.
pub trait IntoDiagnostic {
    /// Convert the object to diagnostics. `uri` is the document under which
    /// the diagnostics are published.
    fn to_lsp_diagnostics(&self, text: &str, uri: &tower_lsp::lsp_types::Url) -> Vec<Diagnostic>;

    /// Get the severity of the diagnostic.
    fn severity(&self) -> DiagnosticSeverity;
}

impl IntoDiagnostic for CompilationIssue {
    fn to_lsp_diagnostics(&self, code: &str, _uri: &tower_lsp::lsp_types::Url) -> Vec<Diagnostic> {
        let edit = self.suggestion.as_ref().map(|s| to_lsp_edit(s, code));

        vec![Diagnostic {
            range: self.source_range.to_lsp_range(code),
            severity: Some(self.severity()),
            code: None,
            code_description: None,
            source: Some("kcl".to_string()),
            message: self.message.clone(),
            related_information: None,
            tags: tag_to_lsp_tags(self.tag),
            data: edit.map(|e| serde_json::to_value(e).unwrap()),
        }]
    }

    fn severity(&self) -> DiagnosticSeverity {
        match self.severity {
            Severity::Warning => DiagnosticSeverity::WARNING,
            _ => DiagnosticSeverity::ERROR,
        }
    }
}

fn tag_to_lsp_tags(tag: Tag) -> Option<Vec<DiagnosticTag>> {
    match tag {
        Tag::Deprecated => Some(vec![DiagnosticTag::DEPRECATED]),
        Tag::Unnecessary => Some(vec![DiagnosticTag::UNNECESSARY]),
        Tag::UnknownNumericUnits | Tag::None => None,
    }
}

pub type LspSuggestion = (Suggestion, tower_lsp::lsp_types::Range);

pub(crate) fn to_lsp_edit(suggestion: &Suggestion, code: &str) -> LspSuggestion {
    let range = suggestion.source_range.to_lsp_range(code);
    (suggestion.clone(), range)
}

pub trait ToLspRange {
    fn to_lsp_range(&self, code: &str) -> Range {
        let start = self.start_to_lsp_position(code);
        let end = self.end_to_lsp_position(code);
        Range { start, end }
    }

    fn start_to_lsp_position(&self, code: &str) -> Position;
    fn end_to_lsp_position(&self, code: &str) -> Position;
}

impl ToLspRange for crate::SourceRange {
    fn start_to_lsp_position(&self, code: &str) -> Position {
        offset_to_lsp_position(code, self.start())
    }

    fn end_to_lsp_position(&self, code: &str) -> Position {
        offset_to_lsp_position(code, self.end())
    }
}

/// The LSP position of a byte offset: the zero-based line, and the column in UTF-16 code units, the encoding LSP
/// uses unless a client negotiates another. An offset just after a line break is column 0 of the next line.
pub fn offset_to_lsp_position(code: &str, offset: usize) -> Position {
    let mut offset = offset.min(code.len());
    while !code.is_char_boundary(offset) {
        offset -= 1;
    }
    let before = &code[..offset];
    let line_start = before.rfind('\n').map_or(0, |index| index + 1);
    Position {
        line: before.matches('\n').count() as u32,
        character: before[line_start..].encode_utf16().count() as u32,
    }
}

/// The byte offset of an LSP position, the inverse of [`offset_to_lsp_position`]. A line past the end resolves to the
/// end of the code, and a column past the end of its line to the end of that line.
pub fn lsp_position_to_offset(code: &str, position: Position) -> usize {
    let mut line_start = 0;
    for _ in 0..position.line {
        match code[line_start..].find('\n') {
            Some(index) => line_start += index + 1,
            None => return code.len(),
        }
    }
    let line_end = code[line_start..]
        .find('\n')
        .map_or(code.len(), |index| line_start + index);
    let line = code[line_start..line_end]
        .strip_suffix('\r')
        .unwrap_or(&code[line_start..line_end]);
    let mut units = 0;
    for (index, character) in line.char_indices() {
        if units >= position.character as usize {
            return line_start + index;
        }
        units += character.len_utf16();
    }
    line_start + line.len()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn range(code: &str, start: usize, end: usize) -> Range {
        crate::SourceRange::new(start, end, crate::ModuleId::default()).to_lsp_range(code)
    }

    #[test]
    fn a_range_at_the_start_of_a_line_starts_on_that_line() {
        let code = "pinChamfer = 0.5mm\nneedleOD = 10mm\n";
        let start = code.find("needleOD").unwrap();
        assert_eq!(
            range(code, start, start + "needleOD".len()),
            Range::new(Position::new(1, 0), Position::new(1, 8))
        );
    }

    #[test]
    fn a_range_ending_after_a_line_break_ends_on_the_next_line() {
        let code = "a = 1\nb = 2";
        assert_eq!(range(code, 0, 6), Range::new(Position::new(0, 0), Position::new(1, 0)));
    }

    #[test]
    fn the_first_and_last_offsets_map_to_the_document_bounds() {
        let code = "a = 1\nb = 2\n";
        assert_eq!(offset_to_lsp_position(code, 0), Position::new(0, 0));
        assert_eq!(offset_to_lsp_position(code, code.len()), Position::new(2, 0));
        assert_eq!(offset_to_lsp_position(code, code.len() + 5), Position::new(2, 0));
        assert_eq!(offset_to_lsp_position("", 0), Position::new(0, 0));
    }

    #[test]
    fn columns_count_utf16_code_units() {
        // The degree sign is 2 bytes and 1 UTF-16 unit; MATHEMATICAL ITALIC SMALL X is 4 bytes and 2 UTF-16 units.
        let code = "// 90° turn\n𝑥 = 1 // 𝑥 bad";
        let bad = code.find("bad").unwrap();
        assert_eq!(offset_to_lsp_position(code, bad), Position::new(1, 13));
        let turn = code.find("turn").unwrap();
        assert_eq!(offset_to_lsp_position(code, turn), Position::new(0, 7));
    }

    #[test]
    fn positions_round_trip_through_offsets() {
        let code = "// 90° turn\r\n𝑥 = 1\n\nlast";
        for offset in (0..=code.len()).filter(|offset| code.is_char_boundary(*offset)) {
            let position = offset_to_lsp_position(code, offset);
            let line = code.lines().nth(position.line as usize).unwrap_or_default();
            if position.character as usize > line.encode_utf16().count() {
                // The `\r` of a CRLF break has no column of its own.
                continue;
            }
            assert_eq!(
                lsp_position_to_offset(code, position),
                offset,
                "offset {offset} at {position:?}"
            );
        }
    }

    #[test]
    fn positions_past_the_end_clamp() {
        let code = "ab\r\ncd";
        assert_eq!(lsp_position_to_offset(code, Position::new(0, 10)), 2);
        assert_eq!(lsp_position_to_offset(code, Position::new(1, 10)), code.len());
        assert_eq!(lsp_position_to_offset(code, Position::new(9, 0)), code.len());
    }
}
