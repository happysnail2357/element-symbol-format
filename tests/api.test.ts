import { elementSymbolFormat } from "../src/api";

const defaultOptions = {
  split: " ",
  strictSplit: false,
  preferSingleSymbols: false,
  stripNonLetters: true,
};

describe("elementSymbolFormat", () => {
  it("accepts a string without options", () => {
    elementSymbolFormat("string");
  });

  it("accepts an empty string", () => {
    const res = elementSymbolFormat("");

    expect(res).toHaveLength(0);
    expect(res.isFormatted).toBeTruthy();
  });

  // TEST: option "split"

  it("splits a string on spaces", () => {
    const res = elementSymbolFormat("Testcases can find issues", defaultOptions);

    expect(res).toHaveLength(4);
    expect(res.isFormatted).toBeTruthy();
    expect(res[0].toString()).toBe("TeSTcAsEs");
    expect(res[1].toString()).toBe("CaN");
    expect(res[2].toString()).toBe("FINd");
    expect(res[3].toString()).toBe("ISSUEs");
  });

  it("splits using a custom string", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.split = ", ";

    const res = elementSymbolFormat("Testcases, can, find, issues", customOptions);

    expect(res).toHaveLength(4);
    expect(res.isFormatted).toBeTruthy();
    expect(res[0].toString()).toBe("TeSTcAsEs");
    expect(res[1].toString()).toBe("CaN");
    expect(res[2].toString()).toBe("FINd");
    expect(res[3].toString()).toBe("ISSUEs");
  });

  it("won't split using a letter", () => {
    expect(() => elementSymbolFormat("string", { split: "a" })).toThrow(/letter "a"/);
    expect(() => elementSymbolFormat("string", { split: "X" })).toThrow(/letter "X"/);
    expect(() => elementSymbolFormat("string", { split: "0x" })).toThrow(/letter "x"/);
  });

  // TEST: option "strictSplit"

  it("splits at any non-letter character", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.strictSplit = true;

    const res = elementSymbolFormat("Testcases$can%find#issues", customOptions);

    expect(res).toHaveLength(4);
    expect(res.isFormatted).toBeTruthy();
    expect(res[0].toString()).toBe("TeSTcAsEs");
    expect(res[1].toString()).toBe("CaN");
    expect(res[2].toString()).toBe("FINd");
    expect(res[3].toString()).toBe("ISSUEs");
  });

  it("splits at any non-letter character and keeps non-letters", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.strictSplit = true;
    customOptions.stripNonLetters = false;

    const res = elementSymbolFormat("c12h22o11", customOptions);

    expect(res).toHaveLength(6);
    expect(res.isFormatted).toBeTruthy();
    expect(res[0].toString()).toBe("C");
    expect(res[1].toString()).toBe("12");
    expect(res[2].toString()).toBe("H");
    expect(res[3].toString()).toBe("22");
    expect(res[4].toString()).toBe("O");
    expect(res[5].toString()).toBe("11");
  });

  // TEST: option "preferSingleSymbols"

  it("prefers single letter symbols", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.preferSingleSymbols = true;

    const res = elementSymbolFormat("CoSiCuNi", customOptions);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("COSICUNI");
  });

  // TEST: option "stripNonLetters"

  it("does not strip non-letters", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.stripNonLetters = false;

    const res = elementSymbolFormat("Isn't this the api's 8th testcase?", customOptions);

    expect(res).toHaveLength(6);
    expect(res.isFormatted).toBeFalsy();
    expect(res.toString()).toBe("ISn't ThIS The api's 8Th TeSTcAse?");
  });

  // TEST: option "join"

  it("joins with a character different than 'split'", () => {
    const customOptions = structuredClone(defaultOptions);
    customOptions.split = ",";
    customOptions.join = " ";

    const res = elementSymbolFormat("Testcases,can,find,issues", customOptions);

    expect(res).toHaveLength(4);
    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("TeSTcAsEs CaN FINd ISSUEs");
  });
});
