// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

import * as interfaces from "./interfaces";
import * as types from "./types";
import * as helpers from "./helpers";
import { format } from "./formatter";

function valueOrDefault<T>(value: T | undefined, defaultValue: T): T {
  return value !== undefined ? value : defaultValue;
}

export function elementSymbolFormat(
  input: string,
  options?: interfaces.FormatOptions,
): interfaces.FormattedResult {
  const split = valueOrDefault(options?.split, " ");
  const strictSplit = valueOrDefault(options?.strictSplit, false);
  const preferSingleSymbols = valueOrDefault(options?.preferSingleSymbols, false);
  const stripNonLetters = valueOrDefault(options?.stripNonLetters, true);
  const join = valueOrDefault(options?.join, split);

  // Verify "split"

  const splitLetter = split.split("").find((char) => helpers.isLetter(char));

  if (splitLetter !== undefined) {
    throw new Error(
      `elementSymbolFormat() will not split on a string with a letter "${splitLetter}"`,
    );
  }

  // Split input

  let inputSegments: string[];

  if (strictSplit) {
    inputSegments = helpers.doStrictSplit(input);
  } else {
    inputSegments = helpers.doSplit(input, split);
  }

  // Strip input

  if (stripNonLetters) {
    inputSegments = helpers.doStripNonLetters(inputSegments);
  }

  // Format input

  const outputSegments: types.ResultSegment[] = [];

  for (const segment of inputSegments) {
    const result = format(segment, preferSingleSymbols);
    outputSegments.push(result);
  }

  // Return results

  return new types.ResultArray(join, ...outputSegments);
}
