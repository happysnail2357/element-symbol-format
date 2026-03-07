// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

import * as types from "./types";
import { isLetter } from "./helpers";
import { elementLookup } from "./elements";

enum FormatMarker {
  Unmarked,
  Start,
  OneLetter,
  TwoLetter,
  OneOrTwoLetter,
  Skip,
  FirstHalf,
}

// The marker array and input string are offset by one
// since the marker array contains a "start" symbol in
// its first index. The SmartIndex will handle the conversion.
class SmartIndex {
  private _index: number = 1;

  get mark(): number {
    return this._index;
  }

  get char(): number {
    return this._index - 1;
  }

  set mark(i: number) {
    this._index = i;
  }

  set char(i: number) {
    this._index = i + 1;
  }
}

export function format(input: string, preferSingleSymbols: boolean): types.ResultSegment {
  input = input.toLowerCase();

  // Analyze the input string
  const markers: FormatMarker[] = findFormatMarkers(input);

  let firstMiss: number;

  // "firstMiss" is guaranteed to be set by this next loop
  // because the first value in "markers" is always FormatMarker.Start

  for (let i = input.length; i >= 0; i--) {
    if (markers[i] !== FormatMarker.Unmarked) {
      firstMiss = i;
      break;
    }
  }

  // Apply formatting to the input string
  const output = applyFormatMarkers(input, markers, preferSingleSymbols);

  return new types.ResultSegment(output, firstMiss);
}

function findFormatMarkers(input: string): FormatMarker[] {
  const markers: FormatMarker[] = new Array(input.length + 1).fill(FormatMarker.Unmarked);
  markers[0] = FormatMarker.Start;

  const i = new SmartIndex();

  for (i.char = 0; i.char < input.length; i.char++) {
    // Check the previous marker; skip if this letter is not reachable
    if (markers[i.mark - 1] === FormatMarker.Unmarked) continue;
    if (markers[i.mark - 1] === FormatMarker.FirstHalf) continue;

    // Skip non-letters
    if (!isLetter(input[i.char])) {
      markers[i.mark] = FormatMarker.Skip;
      continue;
    }

    // Check for single letter symbol
    if (elementLookup(input[i.char])) {
      if (markers[i.mark] === FormatMarker.TwoLetter) {
        markers[i.mark] = FormatMarker.OneOrTwoLetter;
      } else {
        markers[i.mark] = FormatMarker.OneLetter;
      }
    }

    // Check for two letter symbol
    let offset = 1;
    while (i.char + offset < input.length) {
      // Skip if this is not a letter
      if (!isLetter(input[i.char + offset])) {
        offset += 1;
        continue;
      }

      const digram = input[i.char] + input[i.char + offset];

      if (elementLookup(digram)) {
        markers[i.mark + offset] = FormatMarker.TwoLetter;

        // Mark the current letter if it isn't marked
        // already, so it can be found when formatting.
        if (markers[i.mark] === FormatMarker.Unmarked) {
          markers[i.mark] = FormatMarker.FirstHalf;
        }
      }

      break;
    }
  }

  return markers;
}

function applyFormatMarkers(
  input: string,
  markers: FormatMarker[],
  preferSingleSymbols: boolean,
): string {
  const array = input.split("");

  const i = new SmartIndex();

  i.mark = input.length;

  while (i.mark > 0) {
    if (markers[i.mark] === FormatMarker.Unmarked || markers[i.mark] === FormatMarker.Skip) {
      i.mark -= 1;
      continue;
    }

    // Choose between OneLetter or TwoLetter
    if (markers[i.mark] === FormatMarker.OneOrTwoLetter) {
      if (preferSingleSymbols) {
        markers[i.mark] = FormatMarker.OneLetter;
      } else {
        markers[i.mark] = FormatMarker.TwoLetter;
      }
    }

    // Case OneLetter
    if (markers[i.mark] === FormatMarker.OneLetter) {
      array[i.char] = array[i.char].toUpperCase();
    }
    // Case TwoLetter
    else if (markers[i.mark] === FormatMarker.TwoLetter) {
      let offset = 1;
      while (
        markers[i.mark - offset] === FormatMarker.Skip ||
        markers[i.mark - offset] === FormatMarker.Unmarked
      ) {
        offset += 1;
      }
      array[i.char - offset] = array[i.char - offset].toUpperCase();
      i.mark -= offset;
    }

    i.mark -= 1;
  }

  return array.join("");
}
