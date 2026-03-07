// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

import * as interfaces from "./interfaces";
import { isLetter, isLowerCase, isUpperCase } from "./helpers";

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

    const chars = this.value.split("").filter((char) => isLetter(char));

    for (let i = 0; i < chars.length; i++) {
      if (isUpperCase(chars[i])) {
        const iNext = i + 1;

        if (iNext < chars.length && isLowerCase(chars[iNext])) {
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

  get formatted(): SegmentSymbols {
    const formattedPart = this.value.substr(0, this.firstMiss);

    return new SegmentSymbols(formattedPart, true);
  }

  get unformatted(): string {
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
    const symbols = this.formatted.toSymbols();

    if (!this.isFormatted) {
      const stripped = this.unformatted
        .split("")
        .filter((char) => isLetter(char))
        .join("");

      symbols.push(stripped);
    }

    return symbols;
  }
}

export class ResultArray extends Array<ResultSegment> implements interfaces.FormattedResult {
  readonly isFormatted: boolean;
  private joinStr: string;

  constructor(join: string, ...segments: ResultSegment[]) {
    super(...segments);

    this.isFormatted = true; // Assume true
    this.joinStr = join;

    // Check for unformatted segments
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

    return segments.join(this.joinStr);
  }

  toSymbols(): string[] {
    const symbols: string[] = [];

    this.forEach((segment, index) => {
      const segmentSymbols = segment.toSymbols();

      symbols.push(...segmentSymbols);

      if (index != this.length - 1) {
        symbols.push(this.joinStr);
      }
    }, this);

    return symbols;
  }
}
