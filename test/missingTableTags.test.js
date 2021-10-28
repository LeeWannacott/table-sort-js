const {
  createTestTableNoMissingTags,
  createTestTableMissingHeadTag,
  createTestTableMissingBodyAndHeadTag,
  createTestTableMissingBodyTag,
} = require("./missingTableTags");

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test("test no missing table tags - (user has put <tbody> and <thead>)", () => {
  expect(
    createTestTableNoMissingTags(["Echo", "Alpha", "Bravo", "Charlie", "Delta"])
  ).toStrictEqual(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
});

test("test with missing <tbody> tag - (tbody and thead exist)", () => {
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

test("test with missing <tbody> and <thead> tags - (tbody and thead exist)", () => {
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
