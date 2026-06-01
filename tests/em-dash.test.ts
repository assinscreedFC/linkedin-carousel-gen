import { test, expect } from "bun:test";
import { scanText } from "../scripts/check-no-em-dash";

test("clean text returns no violations", () => {
  expect(scanText("Bonjour, le monde.")).toEqual([]);
});

test("em-dash U+2014 caught", () => {
  const v = scanText("Bonjour — le monde.");
  expect(v.length).toBe(1);
  expect(v[0].line).toBe(1);
});

test("en-dash U+2013 caught", () => {
  const v = scanText("Bonjour – le monde.");
  expect(v.length).toBe(1);
});

test("figure dash U+2012 caught", () => {
  const v = scanText("range 1‒5");
  expect(v.length).toBe(1);
});

test("horizontal bar U+2015 caught", () => {
  const v = scanText("a―b");
  expect(v.length).toBe(1);
});

test("multi-line counts violations per line", () => {
  const v = scanText("ligne 1\nbonjour — monde\nligne 3");
  expect(v.length).toBe(1);
  expect(v[0].line).toBe(2);
});
