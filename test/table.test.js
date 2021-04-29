const createTestTable = require("./table");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("Alpha - Capitalized ", () => {
  expect(
    createTestTable(["Echo", "Alpha", "Bravo", "Charlie", "Delta"])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("Alpha - Lowercase", () => {
  expect(
    createTestTable(["echo", "alpha", "bravo", "charlie", "delta"])
  ).toStrictEqual(["alpha", "bravo", "charlie", "delta", "echo"]);
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

test("Alphanumeric", () => {
  expect(
    createTestTable(["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"])
  ).toStrictEqual(["Alpha1", "Bravo2", "Charlie3", "Delta4", "Echo5"]);
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

test("Money", () => {
  expect(createTestTable(["$29", "$93", "$84", "$20", "$58"])).toStrictEqual([
    "$20",
    "$29",
    "$58",
    "$84",
    "$93",
  ]);
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

// Disabled while implementing file-size
test("file-size", () => {
  expect(
    createTestTable(["20KB", "20GB", "20TB", "20Kib", "20MiB"],"file-size")
  ).toStrictEqual([
    "19.53 KiB",
    "20.00 KiB",
    "20.00 MiB",
    "18.62 GiB",
    "18.18 TiB",
  ])
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

test("Release Versions", () => {
  expect(
    createTestTable(["4.0.1", "3.0.2", "4.1.0", "3.0.4", "4.2.0"])
  ).toStrictEqual(["3.0.2", "3.0.4", "4.0.1", "4.1.0", "4.2.0"]);
});

// Tests For Sorting not yet implemented
// test("Sizes", () => {
//    expect(createTestTable(["xs", "lg", "sm", "md", "xlg"])).toStrictEqual([
//       "xs",
//       "sm",
//       "md",
//       "lg",
//       "xlg",
//    ]);
// });
// test("Months", () => {
//    expect(createTestTable(["March", "October", "December", "February", "January"])).toStrictEqual([
//       "January",
//       "February",
//       "March",
//       "October",
//       "December",
//    ]);
// });
// test("Weekdays (Expects week begins at Monday)", () => {
//    expect(createTestTable(["Wednesday", "Monday", "Friday", "Thursday", "Sunday"])).toStrictEqual([
//       "Monday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Sunday",
//    ]);
// });
