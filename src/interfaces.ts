// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

export interface FormattedCheckable {
  readonly isFormatted: boolean;
}

export interface SymbolDecomposable extends FormattedCheckable {
  toString(): string;
  toSymbols(): string[];
}

export interface PartiallyFormattable extends SymbolDecomposable {
  formatted(): SymbolDecomposable;
  unformatted(): string;
}

export interface FormattedResult extends Array<PartiallyFormattable>, SymbolDecomposable {}

export interface FormatOptions {
  split?: string;
  strictSplit?: boolean;
  preferSingleSymbols?: boolean;
  stripNonLetters?: boolean;
  join?: string;
}
