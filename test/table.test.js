const createTestTable = require("./table");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("Alpha - Capitalized ", () => {
  expect(
    createTestTable(
      { col0: ["Echo", "Alpha", "Bravo", "Charlie", "Delta"] },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["Alpha", "Bravo", "Charlie", "Delta", "Echo"] });
});

test("Alpha - Lowercase", () => {
  expect(
    createTestTable(
      { col0: ["echo", "alpha", "bravo", "charlie", "delta"] },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["alpha", "bravo", "charlie", "delta", "echo"] });
});

test("Numerical", () => {
  expect(
    createTestTable({ col0: [5, 3, 4, 1, 2] }, { classTags: "" })
  ).toStrictEqual({ col0: ["1", "2", "3", "4", "5"] });
});

test("Alphanumeric: natural sort", () => {
  expect(
    createTestTable(
      { col0: ["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"] },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({
    col0: ["Alpha1", "Bravo2", "Charlie3", "Delta4", "Echo5"],
  });
});

test("Dates", () => {
  expect(
    createTestTable(
      { col0: ["1979/9/6", "2008/4/9", "1879/12/16", "1978/4/6", "1978/4/16"] },
      { classTags: "" }
    )
  ).toStrictEqual({
    col0: ["1879/12/16", "1978/4/6", "1978/4/16", "1979/9/6", "2008/4/9"],
  });
});

test("Money", () => {
  expect(
    createTestTable(
      { col0: ["$29", "$93", "$84", "$20", "$58"] },
      { classTags: "" }
    )
  ).toStrictEqual({ col0: ["$20", "$29", "$58", "$84", "$93"] });
});

test("Empty cells sort at the end.", () => {
  expect(
    createTestTable(
      { col0: ["Echo", "", "Bravo", "", "Alpha"] },
      { classTags: "" }
    )
  ).toStrictEqual({ col0: ["Alpha", "Bravo", "Echo", "", ""] });
});

test("Order by file-size: file-size", () => {
  expect(
    createTestTable(
      {
        col0: [
          "10MB",
          "10GB",
          "10TB",
          "10B",
          "10MiB",
          "10TiB",
          "10Kib",
          "10KB",
          "10GiB",
        ],
      },
      { classTags: "file-size-sort" }
    )
  ).toStrictEqual({
    col0: [
      "10.00 B",
      "9.77 KiB",
      "10.00 KiB",
      "9.54 MiB",
      "10.00 MiB",
      "9.31 GiB",
      "10.00 GiB",
      "9.09 TiB",
      "10.00 TiB",
    ],
  });
});

//New tests

test("Alpha - lower & upper", () => {
  expect(
    createTestTable(
      { col0: ["AlPhA", "bRaVo", "EcHo", "ChArLiE", "dElTa"] },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["AlPhA", "bRaVo", "ChArLiE", "dElTa", "EcHo"] });
});

test("Floating point numbers", () => {
  expect(
    createTestTable({ col0: [6.23, 0.25, 3.15, 9.09, 0.35] }, { classTags: "" })
  ).toStrictEqual({ col0: ["0.25", "0.35", "3.15", "6.23", "9.09"] });
});

test("Release Versions", () => {
  expect(
    createTestTable(
      { col0: ["4.0.1", "3.0.2", "4.1.0", "3.0.4", "4.2.0"] },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["3.0.2", "3.0.4", "4.0.1", "4.1.0", "4.2.0"] });
});

test("data-sort: example days of week", () => {
  expect(
    createTestTable(
      {
        col0: [
          "Saturday",
          "Wednesday",
          "Sunday",
          "Friday",
          "Thursday",
          "Tuesday",
          "Monday",
        ],
      },
      { classTags: "data-sort" }
    )
  ).toStrictEqual({
    col0: [
      "Saturday",
      "Wednesday",
      "Sunday",
      "Friday",
      "Thursday",
      "Tuesday",
      "Monday",
    ],
  });
});

test("disable-sort: disable sorting on a column", () => {
  expect(
    createTestTable(
      { col0: ["row2", "row1", "row4", "row3"] },
      {
        classTags: "disable-sort",
      }
    )
  ).toStrictEqual({ col0: ["row2", "row1", "row4", "row3"] });
});

test("alpha-sort: sort alphabetically as opposed to natural sorting", () => {
  expect(
    createTestTable(
      { col0: ["z2", "z11", "z89", "z82", "z8"] },
      {
        classTags: "alpha-sort",
      }
    )
  ).toStrictEqual({ col0: ["z11", "z2", "z82", "z8", "z89"] });
});

test("punc-sort: sort involving punctuation - nat sort", () => {
  expect(
    createTestTable(
      { col0: ["row2", "*row1", "-row4", "-row3", "#row3"] },
      {
        classTags: "punct-sort",
      },
      {
        colsToClick: [0],
      }
    )
  ).toStrictEqual({ col0: ["-row3", "-row4", "*row1", "#row3", "row2"] });
});

test("testing that multiple columns works", () => {
  expect(
    createTestTable(
      {
        col0: ["charlie", "alpha", "beta"],
        col1: ["doris", "carrie", "fisher"],
      },
      {
        classTags: "",
      },
      {
        colsToClick: [0],
      }
    )
  ).toStrictEqual({
    col0: ["alpha", "beta", "charlie"],
    col1: ["carrie", "fisher", "doris"],
  });
});

test("onload-sort: testing that it sorts without a click from user", () => {
  expect(
    createTestTable(
      { col0: ["echo", "alpha", "bravo", "charlie", "delta"] },
      {
        classTags: "onload-sort",
      }
    )
  ).toStrictEqual({ col0: ["alpha", "bravo", "charlie", "delta", "echo"] });
});
