const {
  createTestTableNoMissingTags,
  createTestTableMissingHeadTag,
  createTestTableMissingBodyAndHeadTag,
  createTestTableMissingBodyTag,
  createTestTableMultipleTBodies,
  createTestTableTDNoTHMissingHeadAndBody,
  createTestTableTDNoTHInsideBody,
  createTestTableTDNoTHInsideHead,
} = require("./missingTableTags");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("test no missing table tags - (user has put <tbody> and <thead>)", () => {
  expect(
    createTestTableNoMissingTags(["Echo", "Alpha", "Bravo", "Charlie", "Delta"])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("test with missing <tbody> tag - thead exist", () => {
  expect(
    createTestTableMissingBodyTag([
      "Echo",
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("test with missing <thead> tag)", () => {
  expect(
    createTestTableMissingHeadTag([
      "Echo",
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("test with missing <tbody> and <thead> tags", () => {
  expect(
    createTestTableMissingBodyAndHeadTag([
      "Echo",
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("Multiple <tbody> tags", () => {
  expect(
    createTestTableMultipleTBodies(
      ["Echo", "Alpha", "Bravo", "Charlie", "Delta"],
      [2, 1, 3, 5, 4],
      ["diddly", "Jeremy", "squat", "Clarksons", "farm"]
    )
  ).toStrictEqual([
    ["Alpha", "Bravo", "Charlie", "Delta", "Echo"],
    ["1", "2", "3", "4", "5"],
    ["Clarksons", "diddly", "farm", "Jeremy", "squat"],
  ]);
});

test("No <th> tags only <td> and missing <tbody> and <thead> tags", () => {
  expect(
    createTestTableTDNoTHMissingHeadAndBody([
      "Echo",
      "Bravo",
      "Alpha",
      "Delta",
      "Charlie",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("tNo <th> tags; use <td> inside tbody as <th>", () => {
  expect(
    createTestTableTDNoTHInsideBody([
      "Bravo",
      "Alpha",
      "Echo",
      "Delta",
      "Charlie",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("No <th> tags; use <td> inside thead as <th>", () => {
  expect(
    createTestTableTDNoTHInsideHead([
      "Delta",
      "Alpha",
      "Charlie",
      "Bravo",
      "Echo",
    ])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});
