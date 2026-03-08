// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

export function doSplit(input: string, split: string): string[] {
  if (input === "") return [];

  if (split === "") return [input];

  return input.split(split);
}

export function doStrictSplit(input: string): string[] {
  const output: string[] = [];

  if (input.length === 0) return output;

  let iStart = 0;
  let wasLetter: boolean = isLetter(input[iStart]);

  for (let iEnd = 1; iEnd < input.length; iEnd++) {
    const nowLetter: boolean = isLetter(input[iEnd]);

    if (nowLetter !== wasLetter) {
      output.push(input.slice(iStart, iEnd));

      wasLetter = nowLetter;
      iStart = iEnd;
    }
  }

  // Add the remaining bit to the output
  output.push(input.slice(iStart));

  return output;
}

export function doStripNonLetters(input: string[]): string[] {
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i]
      .split("")
      .filter((char) => isLetter(char))
      .join("");
  }

  return input.filter((s) => s.length !== 0);
}

export function isLetter(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

export function isLowerCase(ch: string): boolean {
  return ch >= "a" && ch <= "z";
}

export function isUpperCase(ch: string): boolean {
  return ch >= "A" && ch <= "Z";
}
