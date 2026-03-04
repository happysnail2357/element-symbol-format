// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

import * as interfaces from "./interfaces";

export class SegmentSymbols implements interfaces.SymbolDecomposable {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  toSymbols(): string[] {
    const symbols: string[] = [];

    const chars = this.value.split("").filter((char: string): boolean => char.match(/[A-Za-z]/));

    for (let i = 0; i < chars.length; i++) {
      if (chars[i].match(/[A-Z]/)) {
        const iNext = i + 1;

        if (iNext < chars.length && chars[iNext].match(/[a-z]/)) {
          symbols.push(chars[i] + chars[iNext]);
        } else {
          symbols.push(chars[i]);
        }
      }
    }

    return symbols;
  }
}

export class ResultSegment implements interfaces.PartiallyFormattable {
  readonly isFormatted: boolean;
  private value: string;
  private firstMiss: number;

  constructor(value: string, firstMiss: number) {
    this.firstMiss = firstMiss;
    this.value = value;

    this.isFormatted = firstMiss >= value.length;
  }

  formatted(): SegmentSymbols {
    const formattedPart = this.value.substr(0, this.firstMiss);

    return new SegmentSymbols(formattedPart, true);
  }

  unformatted(): string {
    if (this.isFormatted) {
      return "";
    } else {
      return this.value.substr(this.firstMiss);
    }
  }

  toString(): string {
    return this.value;
  }

  toSymbols(): string[] {
    const symbols = this.formatted().toSymbols();

    if (!this.isFormatted) {
      const stripped = this.unformatted()
        .split("")
        .filter((char: string): boolean => char.match(/[A-Za-z]/))
        .join("");

      symbols.push(stripped);
    }

    return symbols;
  }
}

export class ResultArray extends Array<ResultSegment> implements interfaces.FormattedResult {
  readonly isFormatted: boolean;
  private join: string;

  constructor(join: string, ...segments: ResultSegment[]) {
    super(...segments);

    this.isFormatted = segments.length > 0; // Assume true if there is at least one segment
    this.join = join;

    for (const segment of segments) {
      if (!segment.isFormatted) {
        this.isFormatted = false;
        break;
      }
    }
  }

  toString(): string {
    const segments: string[] = [];

    for (const segment of this) {
      segments.push(segment.toString());
    }

    return segments.join(this.join);
  }

  toSymbols(): string[] {
    const symbols: string[] = [];

    this.forEach((segment, index) => {
      const segmentSymbols = segment.toSymbols();

      symbols.push(...segmentSymbols);

      if (index != this.length - 1) {
        symbols.push(this.join);
      }
    }, this);

    return symbols;
  }
}
