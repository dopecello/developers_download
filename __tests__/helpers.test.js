const { format_date, format_plural, format_url } = require("../utils/helpers");

test("format_date() returns a date string", () => {
  const date = new Date("2020-03-20 16:12:03");

  expect(format_date(date)).toBe("3/20/2020");
});

test("format_plural() returns plural words", () => {
  const tigers = format_plural("tiger", 2);
  const lion = format_plural("lion", 1);

  expect(tigers).toBe("tigers");
  expect(lion).toBe("lion");
});

