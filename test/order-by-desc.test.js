
const createTestTable = require("./table");

test("Alpha - Capitalized: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["Echo", "Alpha", "Bravo", "Charlie", "Delta"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["Echo", "Delta", "Charlie", "Bravo", "Alpha"] });
});


test("Alpha - Lowercase: order-by-desc ", () => {
  expect(
    createTestTable(
      { col1: ["echo", "alpha", "bravo", "charlie", "delta"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["echo", "delta", "charlie", "bravo", "alpha"] });
});

test("Numerical: order-by-desc", () => {
  expect(
    createTestTable({ col1: [5, 3, 4, 1, 2] }, { classTags: "order-by-desc" })
  ).toStrictEqual({ col1: ["5", "4", "3", "2", "1"] });
});

test("Alphanumeric: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["Alpha1", "Echo5", "Bravo2", "Charlie3", "Delta4"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({
    col1: ["Echo5", "Delta4", "Charlie3", "Bravo2", "Alpha1"],
  });
});

test("Dates: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["1979/9/6", "2008/4/9", "1879/12/16", "1978/4/6", "1978/4/16"] },
      { classTags: "order-by-desc" }
    )
  ).toStrictEqual({
    col1: ["2008/4/9", "1979/9/6", "1978/4/16", "1978/4/6", "1879/12/16"],
  });
});

test("Money: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["$29", "$93", "$84", "$20", "$58"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["$93", "$84", "$58", "$29", "$20"] });
});

test("Empty cells sort at the end: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["Echo", "", "Bravo", "", "Alpha"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["", "", "Echo", "Bravo", "Alpha"] });
});

test("Order by file-size: file-size order-by-desc", () => {
  expect(
    createTestTable(
      {
        col1: [
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
      { classTags: "order-by-desc file-size" }
    )
  ).toStrictEqual({
    col1: [
      "10.00 TiB",
      "9.09 TiB",
      "10.00 GiB",
      "9.31 GiB",
      "10.00 MiB",
      "9.53 MiB",
      "10.00 KiB",
      "9.77 KiB",
      "10.00 B",
    ],
  });
});

test("Floating point numbers: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: [6.23, 0.25, 3.15, 9.09, 0.35] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["9.09", "6.23", "3.15", "0.35", "0.25"] });
});

test("Release Versions: order-by-desc", () => {
  expect(
    createTestTable(
      { col1: ["4.0.1", "3.0.2", "4.1.0", "3.0.4", "4.2.0"] },
      {
        classTags: "order-by-desc",
      }
    )
  ).toStrictEqual({ col1: ["4.2.0", "4.1.0", "4.0.1", "3.0.4", "3.0.2"] });
});

test("data-sort: example days of week  - reversed", () => {
  expect(
    createTestTable(
      {
        col1: [
          "Saturday",
          "Wednesday",
          "Sunday",
          "Friday",
          "Thursday",
          "Tuesday",
          "Monday",
        ],
      },
      { classTags: "data-sort order-by-desc" }
    )
  ).toStrictEqual({
    col1: [
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

test("visible-tr-sort: example sort only visible trs", () => {
  expect(
    createTestTable(
      {
        col1: [
          "row1", // invisible
          "row2",
          "row3", // invisible
          "row4",
          "row5",
        ],
      },
      { classTags: "order-by-desc" },
      [0, 2]
    )
  ).toStrictEqual({ col1: ["row5", "row4", "row2"] });
});
