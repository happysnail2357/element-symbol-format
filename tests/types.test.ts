import { ResultArray, ResultSegment, SegmentSymbols } from "../src/types";

describe("SegmentSymbols", () => {
  it("can hold element symbols", () => {
    const obj = new SegmentSymbols("WOW");

    expect(obj.toString()).toBe("WOW");
    expect(obj.toSymbols()).toEqual(["W", "O", "W"]);
  });

  it("can hold element symbols with non-letters", () => {
    const obj = new SegmentSymbols("NiCe... CaTs?");

    expect(obj.toString()).toBe("NiCe... CaTs?");
    expect(obj.toSymbols()).toEqual(["Ni", "Ce", "Ca", "Ts"]);
  });

  it("can hold no symbols (empty string)", () => {
    const obj = new SegmentSymbols("");

    expect(obj.toString()).toBe("");
    expect(obj.toSymbols()).toEqual([]);
  });
});

describe("ResultSegment", () => {
  it("splits a fully formatted segment", () => {
    const obj = new ResultSegment("CHoCoLaTeCHIPS", 14);

    expect(obj.isFormatted).toBeTruthy();
    expect(obj.toString()).toBe("CHoCoLaTeCHIPS");
    expect(obj.toSymbols()).toEqual(["C", "Ho", "Co", "La", "Te", "C", "H", "I", "P", "S"]);
    expect(obj.formatted().toString()).toBe("CHoCoLaTeCHIPS");
    expect(obj.unformatted()).toBe("");
  });

  it("splits a fully unformatted segment", () => {
    const obj = new ResultSegment("microchips", 0);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("microchips");
    expect(obj.toSymbols()).toEqual(["microchips"]);
    expect(obj.formatted().toString()).toBe("");
    expect(obj.unformatted()).toBe("microchips");
  });

  it("splits a partially formatted segment", () => {
    const obj = new ResultSegment("HoUSedivided", 5);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("HoUSedivided");
    expect(obj.toSymbols()).toEqual(["Ho", "U", "Se", "divided"]);
    expect(obj.formatted().toString()).toBe("HoUSe");
    expect(obj.unformatted()).toBe("divided");
  });

  it("splits a fully formatted segment with non-letters", () => {
    const obj = new ResultSegment("C5H5N5", 6);

    expect(obj.isFormatted).toBeTruthy();
    expect(obj.toString()).toBe("C5H5N5");
    expect(obj.toSymbols()).toEqual(["C", "H", "N"]);
    expect(obj.formatted().toString()).toBe("C5H5N5");
    expect(obj.unformatted()).toBe("");
  });

  it("splits a fully unformatted segment with non-letters", () => {
    const obj = new ResultSegment("may the 4th be with you!", 0);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("may the 4th be with you!");
    expect(obj.toSymbols()).toEqual(["maythethbewithyou"]);
    expect(obj.formatted().toString()).toBe("");
    expect(obj.unformatted()).toBe("may the 4th be with you!");
  });

  it("splits a partially formatted segment with non-letters", () => {
    const obj = new ResultSegment("WHErE's The beef?", 10);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("WHErE's The beef?");
    expect(obj.toSymbols()).toEqual(["W", "H", "Er", "Es", "Th", "ebeef"]);
    expect(obj.formatted().toString()).toBe("WHErE's Th");
    expect(obj.unformatted()).toBe("e beef?");
  });
});

describe("ResultArray", () => {
  const wowSegment = new ResultSegment("WOW!", 4);
  const thatSegment = new ResultSegment("ThAt", 4);
  const chocolateSegment = new ResultSegment("CHoCoLaTe", 9);
  const dogSegment = new ResultSegment("dog", 0);
  const isSegement = new ResultSegment("IS", 2);
  const goodSegement = new ResultSegment("good", 0);
  const coolSegement = new ResultSegment("COOl", 3);

  it("can hold no segments", () => {
    const obj = new ResultArray("");

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("");
    expect(obj.toSymbols()).toEqual([]);
  });

  it("can hold formatted segments", () => {
    const obj = new ResultArray(" ", wowSegment, thatSegment, isSegement, chocolateSegment);

    expect(obj.isFormatted).toBeTruthy();
    expect(obj.toString()).toBe("WOW! ThAt IS CHoCoLaTe");
    expect(obj.toSymbols()).toEqual([
      "W",
      "O",
      "W",
      " ",
      "Th",
      "At",
      " ",
      "I",
      "S",
      " ",
      "C",
      "Ho",
      "Co",
      "La",
      "Te",
    ]);
  });

  it("can hold unformatted segments", () => {
    const obj = new ResultArray(" ", goodSegement, dogSegment);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("good dog");
    expect(obj.toSymbols()).toEqual(["good", " ", "dog"]);
  });

  it("can hold both formatted and unformatted segments", () => {
    const obj = new ResultArray(" ", thatSegment, dogSegment, isSegement, coolSegement);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("ThAt dog IS COOl");
    expect(obj.toSymbols()).toEqual([
      "Th",
      "At",
      " ",
      "dog",
      " ",
      "I",
      "S",
      " ",
      "C",
      "O",
      "O",
      "l",
    ]);
  });

  it("can join segments using a string", () => {
    const obj = new ResultArray(" *** ", coolSegement, chocolateSegment);

    expect(obj.isFormatted).toBeFalsy();
    expect(obj.toString()).toBe("COOl *** CHoCoLaTe");
    expect(obj.toSymbols()).toEqual(["C", "O", "O", "l", " *** ", "C", "Ho", "Co", "La", "Te"]);
  });

  it("can join segments using an empty string", () => {
    const obj = new ResultArray("", wowSegment, thatSegment);

    expect(obj.isFormatted).toBeTruthy();
    expect(obj.toString()).toBe("WOW!ThAt");
    expect(obj.toSymbols()).toEqual(["W", "O", "W", "", "Th", "At"]);
  });
});
