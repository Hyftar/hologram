"use strict";

import {
  assert,
  assertBoxedError,
  defineGlobalErlangAndElixirModules,
} from "../support/helpers.mjs";

import Erlang_Math from "../../../assets/js/erlang/math.mjs";
import Interpreter from "../../../assets/js/interpreter.mjs";
import Type from "../../../assets/js/type.mjs";

defineGlobalErlangAndElixirModules();

// IMPORTANT!
// Each JavaScript test has a related Elixir consistency test in test/elixir/hologram/ex_js_consistency/erlang/math_test.exs
// Always update both together.

describe("Erlang_Math", () => {
  describe("ceil/1", () => {
    const ceil = Erlang_Math["ceil/1"];

    it("returns correct value", () => {
      const number = Type.float(2.5);

      const result = ceil(number);
      const expected = Type.float(3);

      assert.deepStrictEqual(result, expected);
    });

    it("returns correct value if passing negative value", () => {
      const number = Type.float(-2.5);

      const result = ceil(number);
      const expected = Type.float(-2);

      assert.deepStrictEqual(result, expected);
    });

    it("returns correct value if passing zero", () => {
      const number = Type.float(0);

      const result = ceil(number);
      const expected = Type.float(0);

      assert.deepStrictEqual(result, expected);
    });

    it("throws error if passing string", () => {
      const numberString = Type.string("123");

      assertBoxedError(() => ceil(numberString), "ArgumentError", Interpreter.buildArgumentErrorMsg(1, "not a number"));
    });

    it("throws error if passing array", () => {
      const list = Type.list([Type.integer(1), Type.integer(2), Type.integer(3)]);

      assertBoxedError(() => ceil(list), "ArgumentError", Interpreter.buildArgumentErrorMsg(1, "not a number"));
    });
  });

  it("exp/1", () => {
    const exp = Erlang_Math["exp/1"];

    describe("returns correct value", () => {
      const number = Type.float(2);

      const result = exp(number);
      const expected = Type.float(7.38905609893065);

      assert.deepStrictEqual(result, expected);
    });

    describe("returns correct value if passing negative value", () => {
      const number = Type.float(-2);

      const result = exp(number);
      const expected = Type.float(0.1353352832366127);

      assert.deepStrictEqual(result, expected);
    });

    describe("returns correct value if passing one", () => {
      const number = Type.float(1.0);

      const result = exp(number);
      const expected = Type.float(2.718281828459045);

      assert.deepStrictEqual(result, expected);
    });

    describe("returns correct value if passing zero", () => {
      const number = Type.float(0);

      const result = exp(number);
      const expected = Type.float(1.0);

      assert.deepStrictEqual(result, expected);
    });

    describe("raises ArgumentError if the argument is a string", () => {
      const integerString = Type.string("12345");

      assertBoxedError(() => exp(integerString), "ArgumentError", Interpreter.buildArgumentErrorMsg(1, "not a number"));
    });

    describe("raises ArgumentError if the argument is a list", () => {
      const list = Type.list([Type.integer(1), Type.integer(2)]);

      assertBoxedError(() => exp(list), "ArgumentError", Interpreter.buildArgumentErrorMsg(1, "not a number"));
    });
  });
});
