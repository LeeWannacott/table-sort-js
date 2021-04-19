const createTestTable = require('./table');

// toBe for primitives like strings, numbers or booleans for everything else use toEqual(object)

test('Alpha - Capitalized ', () => {
  expect(createTestTable(['Echo','Alpha','Bravo','Charlie','Delta'])).toStrictEqual(['Alpha','Bravo','Charlie','Delta','Echo']);
});

test('Alpha - Lowercase', () => {
  expect(createTestTable(['echo','alpha','bravo','charlie','delta'])).toStrictEqual(['alpha','bravo','charlie','delta','echo']);
});

test('Numerical', () => {
  expect(createTestTable([5,3,4,1,2])).toStrictEqual(["1","2","3","4","5"]);
});

test('Alphanumeric', () => {
  expect(createTestTable(['Alpha1','Echo5','Bravo2','Charlie3','Delta4'])).toStrictEqual(['Alpha1','Bravo2','Charlie3','Delta4','Echo5']);
});

test('Dates', () => {
  expect(createTestTable(['1979/9/6','2008/4/9','1879/12/16','1978/4/6','1978/4/16'])).toStrictEqual(['1879/12/16','1978/4/6','1978/4/16','1979/9/6','2008/4/9']);
});

test('Money', () => {
  expect(createTestTable(['$29','$93','$84','$20','$58'])).toStrictEqual(['$20','$29','$58','$84','$93']);
});

test('Empty cells sort at the end.', () => {
  expect(createTestTable(['Echo','','Bravo','','Alpha'])).toStrictEqual(['Alpha','Bravo','Echo','','']);
});

test('file-size', () => {
  expect(createTestTable(['20KB','20GB','20TB','20Kib','20MiB','file-size'])).toStrictEqual(['19.53KiB','20.00KiB','20.96MiB','18.62GiB','18.19TiB']);
});