const createTestTable = require("./tagsInferenceTable");


test("InferSortClassesOnTH - FILE SIZE", () => {
  expect(
    createTestTable({
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
        // add in space and make some undercase
        col1: {
          td: [
            "10 mB",
            "10 GB",
            "10 Tb",
            "10 B",
            "10 mib",
            "10 tib",
            "10 kib",
            "10 kB",
            "10 giB",
          ],
        },
    })
  ).toStrictEqual(["file-size-sort", "file-size-sort"]);
});


test("InferSortClassesOnTH - DATES", () => {
  expect(
    createTestTable({
      col0: {
        td: ["1979/9/6", "2008/4/9", "1879/12/16", "1978/4/6", "1978/4/16"],
      },
      col1: {
        td: [
          "1-14-1992",
          "1.13.1992",
          "4.30.2008",
          "1/20/1992",
          "10-12-2017",
          "2/14/1992",
        ],
      },
      col2: {
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
    })
    // two dates-dmy-sort as mdy is not an inferred class but explicit override.
  ).toStrictEqual(["dates-ymd-sort","dates-dmy-sort","dates-dmy-sort"]);
});



test("InferSortClassesOnTH - RUNTIME", () => {
  expect(
    createTestTable({
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
    })
  ).toStrictEqual(["runtime-sort"]);
});

test("InferSortClassesOnTH - NUMERIC", () => {
  expect(
    createTestTable({
        // commas
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
        // negative numbers
        col1: { td: ["1.05", "-2.3", "-3", "1", "-6", "(1.4)", "14"] },
        // decimals
        col2: { td: ["0.1", "0.2", "0.3", "0.11", "0.13", "0.13", "0.14"] },
        col3: {
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
        // TODO HANDLE CURRENCY $ / pounds, etc....
    })
  ).toStrictEqual(["numeric-sort","numeric-sort","numeric-sort","numeric-sort"]);
});


// TODO no-class-infer
// test("InferSortClassesOnTH - no-class-infer", () => {
//   expect(
//     createTestTable(
//       {
//         col0: {
//           td: [
//             "2m 52s",
//             "1h 20m 10s",
//             "3s",
//             "11h 10m 10s",
//             "7s",
//             "11m 40s",
//             "36s",
//             "1h 10m 10s",
//             "9m 44s",
//             "1m 36s",
//             "41s",
//           ],
//         },
//     },
//     // props={ tableTags: "no-class-infer"},
//     )
//   ).toStrictEqual(["runtime-sort"]);
// });
