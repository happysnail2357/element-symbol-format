import {
  doSplit,
  doStrictSplit,
  doStripNonLetters,
  isLetter,
  isLowerCase,
  isUpperCase,
} from "../src/helpers";

describe("doSplit", () => {
  it("splits on spaces", () => {
    const res = doSplit("One two three", " ");

    expect(res).toEqual(["One", "two", "three"]);
  });

  it("splits on commas", () => {
    const res = doSplit("One,two,three", ",");

    expect(res).toEqual(["One", "two", "three"]);
  });

  it("splits on a string sequence", () => {
    const res = doSplit("One - two - three", " - ");

    expect(res).toEqual(["One", "two", "three"]);
  });

  it("doesn't split anywhere", () => {
    const res = doSplit("One two three", ",");

    expect(res).toEqual(["One two three"]);
  });

  it("can pass the string through", () => {
    const res = doSplit("Don't split me!", "");

    expect(res).toEqual(["Don't split me!"]);
  });

  it("works with an empty string", () => {
    const res = doSplit("", " ");

    expect(res).toEqual([]);
  });
});

describe("doStrictSplit", () => {
  it("splits on spaces", () => {
    const res = doStrictSplit("One two three");

    expect(res).toEqual(["One", " ", "two", " ", "three"]);
  });

  it("splits on non-letter characters", () => {
    const res = doStrictSplit("shouldn't this_split?");

    expect(res).toEqual(["shouldn", "'", "t", " ", "this", "_", "split", "?"]);
  });

  it("splits on non-letter sequences", () => {
    const res = doStrictSplit("14th#)place$%!finish");

    expect(res).toEqual(["14", "th", "#)", "place", "$%!", "finish"]);
  });

  it("works with an empty string", () => {
    const res = doStrictSplit("");

    expect(res).toEqual([]);
  });
});

describe("doStripNonLetters", () => {
  it("strips out non letters", () => {
    const res = doStripNonLetters(["Isn't", "3rd", "hurray!"]);

    expect(res).toEqual(["Isnt", "rd", "hurray"]);
  });

  it("accepts no strings", () => {
    const res = doStripNonLetters([]);

    expect(res).toEqual([]);
  });

  it("removes empty strings", () => {
    const res = doStripNonLetters(["", "1+1", "=two?"]);

    expect(res).toEqual(["two"]);
  });
});

describe("isLetter", () => {
  it("returns true for letters", () => {
    expect(isLetter("a")).toBeTruthy();
    expect(isLetter("m")).toBeTruthy();
    expect(isLetter("z")).toBeTruthy();
    expect(isLetter("A")).toBeTruthy();
    expect(isLetter("M")).toBeTruthy();
    expect(isLetter("Z")).toBeTruthy();
  });

  it("returns false for non-letters", () => {
    expect(isLetter("@")).toBeFalsy();
    expect(isLetter("[")).toBeFalsy();
    expect(isLetter("`")).toBeFalsy();
    expect(isLetter("{")).toBeFalsy();
    expect(isLetter("🙂")).toBeFalsy();
    expect(isLetter("智")).toBeFalsy();
  });
});

describe("isLowerCase", () => {
  it("returns true for lowercase letters", () => {
    expect(isLowerCase("a")).toBeTruthy();
    expect(isLowerCase("m")).toBeTruthy();
    expect(isLowerCase("z")).toBeTruthy();
  });

  it("returns false for uppercase letters", () => {
    expect(isLowerCase("A")).toBeFalsy();
    expect(isLowerCase("M")).toBeFalsy();
    expect(isLowerCase("Z")).toBeFalsy();
  });

  it("returns false for non-letters", () => {
    expect(isLowerCase("@")).toBeFalsy();
    expect(isLowerCase("[")).toBeFalsy();
    expect(isLowerCase("`")).toBeFalsy();
    expect(isLowerCase("{")).toBeFalsy();
    expect(isLowerCase("🙂")).toBeFalsy();
    expect(isLowerCase("智")).toBeFalsy();
  });
});

describe("isUpperCase", () => {
  it("returns false for lowercase letters", () => {
    expect(isUpperCase("a")).toBeFalsy();
    expect(isUpperCase("m")).toBeFalsy();
    expect(isUpperCase("z")).toBeFalsy();
  });

  it("returns true for uppercase letters", () => {
    expect(isUpperCase("A")).toBeTruthy();
    expect(isUpperCase("M")).toBeTruthy();
    expect(isUpperCase("Z")).toBeTruthy();
  });

  it("returns false for non-letters", () => {
    expect(isUpperCase("@")).toBeFalsy();
    expect(isUpperCase("[")).toBeFalsy();
    expect(isUpperCase("`")).toBeFalsy();
    expect(isUpperCase("{")).toBeFalsy();
    expect(isUpperCase("🙂")).toBeFalsy();
    expect(isUpperCase("智")).toBeFalsy();
  });
});
