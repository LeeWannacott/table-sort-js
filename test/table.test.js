const createTestTable = require("./table");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("Alpha - Capitalized ", () => {
  expect(
    createTestTable(
      { col0: { td: ["Echo", "Alpha", "Bravo", "Charlie", "Delta"] } },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["Alpha", "Bravo", "Charlie", "Delta", "Echo"] });
});

test("Alpha - Lowercase", () => {
  expect(
    createTestTable(
      { col0: { td: ["echo", "alpha", "bravo", "charlie", "delta"] } },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["alpha", "bravo", "charlie", "delta", "echo"] });
});

test("Numerical", () => {
  expect(
    createTestTable({ col0: { td: [5, 3, 4, 1, 2] } }, { classTags: "" })
  ).toStrictEqual({ col0: ["1", "2", "3", "4", "5"] });
});

test("Alphanumeric: natural sort", () => {
  expect(
    createTestTable(
      { col0: { td: ["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"] } },
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
      {
        col0: {
          td: ["1979/9/6", "2008/4/9", "1879/12/16", "1978/4/6", "1978/4/16"],
        },
      },
      { classTags: "" }
    )
  ).toStrictEqual({
    col0: ["1879/12/16", "1978/4/6", "1978/4/16", "1979/9/6", "2008/4/9"],
  });
});

test("Money", () => {
  expect(
    createTestTable(
      { col0: { td: ["$29", "$93", "$84", "$20", "$58"] } },
      { classTags: "" }
    )
  ).toStrictEqual({ col0: ["$20", "$29", "$58", "$84", "$93"] });
});

test("Empty cells sort at the end.", () => {
  expect(
    createTestTable(
      { col0: { td: ["Echo", "", "Bravo", "", "Alpha"] } },
      { classTags: "" }
    )
  ).toStrictEqual({ col0: ["Alpha", "Bravo", "Echo", "", ""] });
});

test("Order by file-size: file-size", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
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
      { col0: { td: ["AlPhA", "bRaVo", "EcHo", "ChArLiE", "dElTa"] } },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({ col0: ["AlPhA", "bRaVo", "ChArLiE", "dElTa", "EcHo"] });
});

test("Floating point numbers", () => {
  expect(
    createTestTable(
      { col0: { td: [6.23, 0.25, 3.15, 9.09, 0.35] } },
      { classTags: "" }
    )
  ).toStrictEqual({ col0: ["0.25", "0.35", "3.15", "6.23", "9.09"] });
});

test("Release Versions", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["4.18.0", "3.0.2", "4.1.0", "3.0.18", "4.2.0", "4.17.1"] },
      },
      {
        classTags: "",
      }
    )
  ).toStrictEqual({
    col0: ["3.0.2", "3.0.18", "4.1.0", "4.2.0", "4.17.1", "4.18.0"],
  });
});

test("data-sort: example days of week", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "Saturday",
            "Wednesday",
            "Sunday",
            "Friday",
            "Thursday",
            "Tuesday",
            "Monday",
          ],
        },
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

test("data-sort clicked twice: example days of week", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "Saturday",
            "Wednesday",
            "Sunday",
            "Friday",
            "Thursday",
            "Tuesday",
            "Monday",
          ],
        },
      },
      { classTags: "data-sort" },
      {
        colsToClick: [0, 0],
      }
    )
  ).toStrictEqual({
    col0: [
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday",
      "Sunday",
      "Wednesday",
      "Saturday",
    ],
  });
});

test("disable-sort: disable sorting on a column", () => {
  expect(
    createTestTable(
      { col0: { td: ["row2", "row1", "row4", "row3"] } },
      {
        classTags: "disable-sort",
      }
    )
  ).toStrictEqual({ col0: ["row2", "row1", "row4", "row3"] });
});

test("alpha-sort: sort alphabetically as opposed to natural sorting", () => {
  expect(
    createTestTable(
      { col0: { td: ["z2", "z11", "z89", "z82", "z8"] } },
      {
        classTags: "alpha-sort",
      }
    )
  ).toStrictEqual({ col0: ["z11", "z2", "z82", "z8", "z89"] });
});

test("punc-sort: sort involving punctuation - nat sort", () => {
  expect(
    createTestTable(
      { col0: { td: ["row2", "*row1", "-row4", "-row3", "#row3"] } },
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
        col0: { td: ["charlie", "alpha", "beta"] },
        col1: { td: ["doris", "carrie", "fisher"] },
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
      { col0: { td: ["echo", "alpha", "bravo", "charlie", "delta"] } },
      {
        classTags: "onload-sort",
      }
    )
  ).toStrictEqual({ col0: ["alpha", "bravo", "charlie", "delta", "echo"] });
});

test("Clicking multiple times (>2) doesn't break sorting", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["charlie", "alpha", "beta"] },
        col1: { td: ["doris", "carrie", "fisher"] },
      },
      {
        classTags: "",
      },
      {
        colsToClick: [0, 0, 0, 0, 0],
      }
    )
  ).toStrictEqual({
    col0: ["alpha", "beta", "charlie"],
    col1: ["carrie", "fisher", "doris"],
  });
});

test("Sorting columns without rememeber-sort ", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["charlie", "alpha", "beta"] },
        col1: { td: ["doris", "carrie", "fisher"] },
      },
      {
        classTags: "",
      },
      {
        colsToClick: [0, 1, 0],
        tableTags: "",
      }
    )
  ).toStrictEqual({
    col0: ["alpha", "beta", "charlie"],
    col1: ["carrie", "fisher", "doris"],
  });
});

test("Remember-sort: Sorting cols that have the rememeber-sort class.", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["charlie", "alpha", "beta"] },
        col1: { td: ["doris", "carrie", "fisher"] },
      },
      {
        classTags: "",
      },
      {
        colsToClick: [0, 1, 0],
        tableTags: "remember-sort",
      }
    )
  ).toStrictEqual({
    col0: ["charlie", "beta", "alpha"],
    col1: ["doris", "fisher", "carrie"],
  });
});

test("Checking ", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["charlie", "alpha", "beta"] },
        col1: { td: ["doris", "carrie", "fisher"] },
      },
      {
        classTags: "",
      },
      {
        colsToClick: [0, 1, 0],
        tableTags: "",
      }
    )
  ).toStrictEqual({
    col0: ["alpha", "beta", "charlie"],
    col1: ["carrie", "fisher", "doris"],
  });
});

test("runtime-sort", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "2m 52s",
            "1h 20m 10s",
            "3s",
            "11h 10m 10s",
            "7s",
            "11m 40s",
            "36s",
            "1h 10m 10s",
            "9m 44s",
            "1m 36s",
            "41s",
          ],
        },
      },
      {
        classTags: "runtime-sort",
      },
      {
        colsToClick: [0],
      }
    )
  ).toStrictEqual({
    col0: [
      "3s",
      "7s",
      "36s",
      "41s",
      "1m 36s",
      "2m 52s",
      "9m 44s",
      "11m 40s",
      "1h 10m 10s",
      "1h 20m 10s",
      "11h 10m 10s",
    ],
  });
});

test("dates-dmy-sort: UK style dd/mm/yyyy; delim . or / or -", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "17/6/1978",
            "18.10.2027",
            "10-12-2017",
            "13/12/2017",
            "4.9.2008",
            "2.3.1879",
            "22.3.1879",
            "8/6/1978",
            "4/6/1978",
          ],
        },
      },
      { classTags: "dates-dmy-sort" }
    )
  ).toStrictEqual({
    col0: [
      "2.3.1879",
      "22.3.1879",
      "4/6/1978",
      "8/6/1978",
      "17/6/1978",
      "4.9.2008",
      "10-12-2017",
      "13/12/2017",
      "18.10.2027",
    ],
  });
});

test("dates-mdy-sort: US style mm/dd/yyyy; delim . or / or -", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "1-14-1992",
            "1.13.1992",
            "4.30.2008",
            "1/20/1992",
            "10-12-2017",
            "2/14/1992",
          ],
        },
      },
      { classTags: "dates-mdy-sort" }
    )
  ).toStrictEqual({
    col0: [
      "1.13.1992",
      "1-14-1992",
      "1/20/1992",
      "2/14/1992",
      "4.30.2008",
      "10-12-2017",
    ],
  });
});

test("dates-mdy-sort US style overrides inferred class dates-dmy-sort:", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "1-14-1992",
            "1.13.1992",
            "4.30.2008",
            "1/20/1992",
            "10-12-2017",
            "2/14/1992",
          ],
        },
      },
      { classTags: "dates-mdy-sort dates-dmy-sort" }
    )
  ).toStrictEqual({
    col0: [
      "1.13.1992",
      "1-14-1992",
      "1/20/1992",
      "2/14/1992",
      "4.30.2008",
      "10-12-2017",
    ],
  });
});

test("dates-ymd-sort: ISO 8601 style yyyy/mm/dd; delim . or / or -", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: ["2023/09/6", "2023-03-9", "2023.12.16", "2023/4/6", "2023/4/32"],
        },
      },
      { classTags: "dates-ymd-sort" }
    )
  ).toStrictEqual({
    col0: ["2023-03-9", "2023/4/6", "2023/4/32", "2023/09/6", "2023.12.16"],
  });
});

test("Sort decimals with commas", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "20,000.89",
            "30,000.32",
            "1",
            "0.111",
            "21,000.92",
            "19845",
            "12000",
            "-90",
            "-10,000.39",
            "-10,000.10",
          ],
        },
      },
      { classTags: "numeric-sort" }
    )
  ).toStrictEqual({
    col0: [
      "-10,000.39",
      "-10,000.10",
      "-90",
      "0.111",
      "1",
      "12000",
      "19845",
      "20,000.89",
      "21,000.92",
      "30,000.32",
    ],
  });
});

test("Sort decimal numbers", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["0.1", "0.2", "0.3", "0.11", "0.13", "0.13", "0.14"] },
      },
      { classTags: "numeric-sort" }
    )
  ).toStrictEqual({
    col0: ["0.1", "0.11", "0.13", "0.13", "0.14", "0.2", "0.3"],
  });
});
//
test("Sort all combination positive, negative numbers with parenthesis as well", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["1.05", "-2.3", "-3", "1", "-6", "(1.4)", "14"] },
      },
      { classTags: "numeric-sort" }
    )
  ).toStrictEqual({
    col0: ["-6", "-3", "-2.3", "(1.4)", "1", "1.05", "14"],
  });
});
//
test("Sort all combination of negative and positive integers and decimal numbers and even alphabetical random", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "1.05",
            "-2.3",
            "-3",
            "1",
            "-6",
            "",
            "(0.5)",
            "1a",
            "b",
            "(c)",
            "{1}",
          ],
        },
      },
      { classTags: "numeric-sort" }
    )
  ).toStrictEqual({
    col0: [
      "-6",
      "-3",
      "-2.3",
      "(0.5)",
      "1",
      "1.05",
      "{1}",
      "1a",
      "b",
      "(c)",
      "",
    ],
  });
});

test("numeric-sort - various currency", () => {
  expect(
    createTestTable(
      {
        col0: {
          td: [
            "-$4.01",
            "-¥2.02",
            "($5.03)",
            "$4.64",
            "-£29,675",
            "-$5.21",
            "-£50,854",
            "£2,038,720",
            "£283,838,720",
            "-£481,177",
            "$2.01",
            "$2.11",
            "$2.21",
            "-£1,976,799",
            "£2,265",
            "(£420,252)",
            "-€2,409,060",
            "-£755,905",
          ],
        },
      },
      { classTags: "numeric-sort" }
    )
  ).toStrictEqual({
    col0: [
      "-€2,409,060",
      "-£1,976,799",
      "-£755,905",
      "-£481,177",
      "(£420,252)",
      "-£50,854",
      "-£29,675",
      "-$5.21",
      "($5.03)",
      "-$4.01",
      "-¥2.02",
      "$2.01",
      "$2.11",
      "$2.21",
      "$4.64",
      "£2,265",
      "£2,038,720",
      "£283,838,720",
    ],
  });
});

test("default behavior without cells-sort (tr's move when sorted)", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["8", "2", "3", "4", "5", "6", "0", "1", "7"] },
      },
      { classTags: "" },
      // note this isn't an actual class just used for testing purposes
      { tableTags: "tr-sort", trClasses: "test" }
    )
  ).toStrictEqual({
    col0: [
      '<tr class="test-6"> <td>0</td></tr>',
      '<tr class="test-7"> <td>1</td></tr>',
      '<tr class="test-1"> <td>2</td></tr>',
      '<tr class="test-2"> <td>3</td></tr>',
      '<tr class="test-3"> <td>4</td></tr>',
      '<tr class="test-4"> <td>5</td></tr>',
      '<tr class="test-5"> <td>6</td></tr>',
      '<tr class="test-8"> <td>7</td></tr>',
      '<tr class="test-0"> <td>8</td></tr>',
    ],
  });
});

test("cells-sort table class (tr's stay in place, but td's are sorted)", () => {
  expect(
    createTestTable(
      {
        col0: { td: ["8", "2", "3", "4", "5", "6", "0", "1", "7"] },
      },
      { classTags: "" },
      { tableTags: "cells-sort", trClasses: "test" }
    )
  ).toStrictEqual({
    col0: [
      '<tr class="test-0"> <td>0</td></tr>',
      '<tr class="test-1"> <td>1</td></tr>',
      '<tr class="test-2"> <td>2</td></tr>',
      '<tr class="test-3"> <td>3</td></tr>',
      '<tr class="test-4"> <td>4</td></tr>',
      '<tr class="test-5"> <td>5</td></tr>',
      '<tr class="test-6"> <td>6</td></tr>',
      '<tr class="test-7"> <td>7</td></tr>',
      '<tr class="test-8"> <td>8</td></tr>',
    ],
  });
});

//
// test("colspan", () => {
// expect(
// createTestTable(
// {
// col0: {td:["8", "2", "3", "4", "5", "6", "0", "1", "7"]},
// col1: {td:["8", "2", "3", "4", "5", "6", "0", "1", "7"]},
// col2: {td:["8", "2", "3", "4", "5", "6", "0", "1", "7"]},
// },
// { classTags: "data-sort" },
// { tableTags: "tr-sort", trClasses: "test" }
// )
// ).toStrictEqual({
// col0: [
// '<tr class="test-0"> <td>0</td></tr>',
// '<tr class="test-1"> <td>1</td></tr>',
// '<tr class="test-2"> <td>2</td></tr>',
// '<tr class="test-3"> <td>3</td></tr>',
// '<tr class="test-4"> <td>4</td></tr>',
// '<tr class="test-5"> <td>5</td></tr>',
// '<tr class="test-6"> <td>6</td></tr>',
// '<tr class="test-7"> <td>7</td></tr>',
// '<tr class="test-8"> <td>8</td></tr>',
// ],
// });
// });
