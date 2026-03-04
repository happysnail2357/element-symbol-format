// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

export interface FormattedCheckable {
  readonly isFormatted: boolean;
}

export interface SymbolDecomposable {
  toString(): string;
  toSymbols(): string[];
}

export interface PartiallyFormattable extends SymbolDecomposable, FormattedCheckable {
  formatted(): SymbolDecomposable;
  unformatted(): string;
}

export interface FormattedResult
  extends Array<PartiallyFormattable>, SymbolDecomposable, FormattedCheckable {}

export interface FormatOptions {
  split?: string;
  strictSplit?: boolean;
  preferSingleSymbols?: boolean;
  stripNonLetters?: boolean;
  join?: string;
}
