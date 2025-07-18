// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

/**
 * A traversal path through the AST to a node.
 *
 * Similar to the idea of a `NodeId`, a `NodePath` uniquely identifies a node,
 * assuming you know the root node.
 *
 * The implementation doesn't cover all parts of the tree. It currently only
 * works on parts of the tree that the frontend uses.
 */
export type NodePath = { steps: Array<Step> }

export type Step =
  | { type: 'ProgramBodyItem'; index: number }
  | { type: 'CallCallee' }
  | { type: 'CallArg'; index: number }
  | { type: 'CallKwCallee' }
  | { type: 'CallKwUnlabeledArg' }
  | { type: 'CallKwArg'; index: number }
  | { type: 'BinaryLeft' }
  | { type: 'BinaryRight' }
  | { type: 'UnaryArg' }
  | { type: 'PipeBodyItem'; index: number }
  | { type: 'ArrayElement'; index: number }
  | { type: 'ArrayRangeStart' }
  | { type: 'ArrayRangeEnd' }
  | { type: 'ObjectProperty'; index: number }
  | { type: 'ObjectPropertyKey' }
  | { type: 'ObjectPropertyValue' }
  | { type: 'ExpressionStatementExpr' }
  | { type: 'VariableDeclarationDeclaration' }
  | { type: 'VariableDeclarationInit' }
  | { type: 'FunctionExpressionParam'; index: number }
  | { type: 'FunctionExpressionBody' }
  | { type: 'FunctionExpressionBodyItem'; index: number }
  | { type: 'ReturnStatementArg' }
  | { type: 'MemberExpressionObject' }
  | { type: 'MemberExpressionProperty' }
  | { type: 'IfExpressionCondition' }
  | { type: 'IfExpressionThen' }
  | { type: 'IfExpressionElseIf'; index: number }
  | { type: 'IfExpressionElseIfCond' }
  | { type: 'IfExpressionElseIfBody' }
  | { type: 'IfExpressionElse' }
  | { type: 'ImportStatementItem'; index: number }
  | { type: 'ImportStatementItemName' }
  | { type: 'ImportStatementItemAlias' }
  | { type: 'LabeledExpressionExpr' }
  | { type: 'LabeledExpressionLabel' }
  | { type: 'AscribedExpressionExpr' }
