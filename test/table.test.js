const createTestTable = require("./table");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("Alpha - Capitalized ", () => {
  expect(
    createTestTable(["Echo", "Alpha", "Bravo", "Charlie", "Delta"])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("Alpha - Capitalized: order-by-desc", () => {
  expect(
    createTestTable(
      ["Echo", "Alpha", "Bravo", "Charlie", "Delta"],
      "order-by-desc"
    )
  ).toStrictEqual(["Echo", "Delta", "Charlie", "Bravo", "Alpha"]);
});

test("Alpha - Lowercase", () => {
  expect(
    createTestTable(["echo", "alpha", "bravo", "charlie", "delta"])
  ).toStrictEqual(["alpha", "bravo", "charlie", "delta", "echo"]);
});

test("Alpha - Lowercase: order-by-desc ", () => {
  expect(
    createTestTable(
      ["echo", "alpha", "bravo", "charlie", "delta"],
      "order-by-desc"
    )
  ).toStrictEqual(["echo", "delta", "charlie", "bravo", "alpha"]);
});

test("Numerical", () => {
  expect(createTestTable([5, 3, 4, 1, 2])).toStrictEqual([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
});

test("Numerical: order-by-desc", () => {
  expect(createTestTable([5, 3, 4, 1, 2], "order-by-desc")).toStrictEqual([
    "5",
    "4",
    "3",
    "2",
    "1",
  ]);
});

test("Alphanumeric", () => {
  expect(
    createTestTable(["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"])
  ).toStrictEqual(["Alpha1", "Bravo2", "Charlie3", "Delta4", "Echo5"]);
});

test("Alphanumeric: order-by-desc", () => {
  expect(
    createTestTable(
      ["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"],
      "order-by-desc"
    )
  ).toStrictEqual(["Echo5", "Delta4", "Charlie3", "Bravo2", "Alpha1"]);
});

test("Dates", () => {
  expect(
    createTestTable([
      "1979/9/6",
      "2008/4/9",
      "1879/12/16",
      "1978/4/6",
      "1978/4/16",
    ])
  ).toStrictEqual([
    "1879/12/16",
    "1978/4/6",
    "1978/4/16",
    "1979/9/6",
    "2008/4/9",
  ]);
});

test("Dates: order-by-desc", () => {
  expect(
    createTestTable(
      ["1979/9/6", "2008/4/9", "1879/12/16", "1978/4/6", "1978/4/16"],
      "order-by-desc"
    )
  ).toStrictEqual([
    "2008/4/9",
    "1979/9/6",
    "1978/4/16",
    "1978/4/6",
    "1879/12/16",
  ]);
});

test("Money", () => {
  expect(createTestTable(["$29", "$93", "$84", "$20", "$58"])).toStrictEqual([
    "$20",
    "$29",
    "$58",
    "$84",
    "$93",
  ]);
});

test("Money: order-by-desc", () => {
  expect(
    createTestTable(["$29", "$93", "$84", "$20", "$58"], "order-by-desc")
  ).toStrictEqual(["$93", "$84", "$58", "$29", "$20"]);
});

test("Empty cells sort at the end.", () => {
  expect(createTestTable(["Echo", "", "Bravo", "", "Alpha"])).toStrictEqual([
    "Alpha",
    "Bravo",
    "Echo",
    "",
    "",
  ]);
});

test("Empty cells sort at the end: order-by-desc", () => {
  expect(
    createTestTable(["Echo", "", "Bravo", "", "Alpha"], "order-by-desc")
  ).toStrictEqual(["", "", "Echo", "Bravo", "Alpha"]);
});

// Disabled while implementing file-size
test("Order by file-size: file-size", () => {
  expect(
    createTestTable(
      [
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
      ["file-size"]
    )
  ).toStrictEqual([
    "10.00 B",
    "9.77 KiB",
    "10.00 KiB",
    "9.53 MiB",
    "10.00 MiB",
    "9.31 GiB",
    "10.00 GiB",
    "9.09 TiB",
    "10.00 TiB",
  ]);
});

test("Order by file-size: file-size order-by-desc", () => {
  expect(
    createTestTable(
      [
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
      "file-size order-by-desc"
    )
  ).toStrictEqual([
    "10.00 TiB",
    "9.09 TiB",
    "10.00 GiB",
    "9.31 GiB",
    "10.00 MiB",
    "9.53 MiB",
    "10.00 KiB",
    "9.77 KiB",
    "10.00 B",
  ]);
});

//New tests

test("Alpha - lower & upper", () => {
  expect(
    createTestTable(["AlPhA", "bRaVo", "EcHo", "ChArLiE", "dElTa"])
  ).toStrictEqual(["AlPhA", "bRaVo", "ChArLiE", "dElTa", "EcHo"]);
});

test("Floating point numbers", () => {
  expect(createTestTable([6.23, 0.25, 3.15, 9.09, 0.35])).toStrictEqual([
    "0.25",
    "0.35",
    "3.15",
    "6.23",
    "9.09",
  ]);
});

test("Floating point numbers: order-by-desc", () => {
  expect(
    createTestTable([6.23, 0.25, 3.15, 9.09, 0.35], "order-by-desc")
  ).toStrictEqual(["9.09", "6.23", "3.15", "0.35", "0.25"]);
});

test("Release Versions", () => {
  expect(
    createTestTable(["4.0.1", "3.0.2", "4.1.0", "3.0.4", "4.2.0"])
  ).toStrictEqual(["3.0.2", "3.0.4", "4.0.1", "4.1.0", "4.2.0"]);
});

test("Release Versions: order-by-desc", () => {
  expect(
    createTestTable(
      ["4.0.1", "3.0.2", "4.1.0", "3.0.4", "4.2.0"],
      "order-by-desc"
    )
  ).toStrictEqual(["4.2.0", "4.1.0", "4.0.1", "3.0.4", "3.0.2"]);
});

test("data-sort: example days of week", () => {
  expect(
    createTestTable(
      [
        "Saturday",
        "Wednesday",
        "Sunday",
        "Friday",
        "Thursday",
        "Tuesday",
        "Monday",
      ],
      "data-sort"
    )
  ).toStrictEqual([
        "Saturday",
        "Wednesday",
        "Sunday",
        "Friday",
        "Thursday",
        "Tuesday",
        "Monday",
  ]);
});

test("data-sort: example days of week  - reversed", () => {
  expect(
    createTestTable(
      [
        "Saturday",
        "Wednesday",
        "Sunday",
        "Friday",
        "Thursday",
        "Tuesday",
        "Monday",
      ],
      "data-sort order-by-desc"
    )
  ).toStrictEqual([
        "Monday",
        "Tuesday",
        "Thursday",
        "Friday",
        "Sunday",
        "Wednesday",
        "Saturday",
  ]);
});
