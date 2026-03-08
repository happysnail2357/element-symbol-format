import { format } from "../src/formatter";

describe("format", () => {
  it("formats a segment", () => {
    const res = format("chocolate", false);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("CHoCoLaTe");
    expect(res.unformatted).toBe("");
  });

  it("Prefers single letter symbols while formatting", () => {
    const res = format("chocolate", true);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("CHOCOLaTe");
  });

  it("partially formats a segment", () => {
    const res = format("potatochip", false);

    expect(res.isFormatted).toBeFalsy();
    expect(res.toString()).toBe("PoTatochip");
    expect(res.unformatted).toBe("tochip");
  });

  it("formats a segment with non-letters", () => {
    const res = format("This is great!", false);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("ThIS iS gReAt!");
  });

  it("partially formats a segment with non-letters", () => {
    const res = format('"I think, therefore I am"', false);

    expect(res.isFormatted).toBeFalsy();
    expect(res.toString()).toBe('"I ThInK, ThErefore i am"');
    expect(res.unformatted).toBe('efore i am"');
  });

  it("formats letters seperated by non-letters", () => {
    const res = format("t  h", false);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("T  h");
  });

  it("formats letters seperated by non-letters (prefer single letters)", () => {
    const res = format("t  h", true);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("T  h");
  });

  it("partially formats letters seperated by non-letters", () => {
    const res = format("h  j", false);

    expect(res.isFormatted).toBeFalsy();
    expect(res.toString()).toBe("H  j");
    expect(res.unformatted).toBe("j");
  });

  it("formats letters followed by non-letters", () => {
    const res = format("h  ", false);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toBe("H  ");
    expect(res.unformatted).toBe("");
  });

  it("doesn't format letters followed by non-letters", () => {
    const res = format("x  ", false);

    expect(res.isFormatted).toBeFalsy();
    expect(res.toString()).toBe("x  ");
    expect(res.unformatted).toBe("x  ");
  });

  it("accepts an empty segment", () => {
    const res = format("", false);

    expect(res.isFormatted).toBeTruthy();
    expect(res.toString()).toEqual("");
  });
});
