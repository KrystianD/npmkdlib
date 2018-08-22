import { Comparer } from '../src';

import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import * as moment from 'moment';
import Decimal from 'decimal.js';

class CustomTypeValid {
  constructor(public uuid: string) {
  }

  public valueOf() { return this.uuid; }
}

class CustomTypeInvalid {
  constructor(public uuid: string) {
  }
}

@suite
class CompareTest {
  @test
  testToScalarSimple() {
    assert.strictEqual(Comparer.toScalar(2), 2);
    assert.strictEqual(Comparer.toScalar(2.5), 2.5);
    assert.strictEqual(Comparer.toScalar("A"), "A");
    assert.strictEqual(Comparer.toScalar(true), 1);
    assert.strictEqual(Comparer.toScalar(false), 0);
  }

  @test
  testToScalarObject() {
    assert.throw(() => Comparer.toScalar({ a: 2 }));

    assert.strictEqual(Comparer.toScalar({ a: 2, valueOf: function () {return 2;} }), 2);
  }

  @test
  testToScalarDate() {
    assert.strictEqual(Comparer.toScalar(new Date(2000, 0, 1, 0, 0, 0)), 946681200000);
  }

  @test
  testToScalarMoment() {
    assert.strictEqual(Comparer.toScalar(moment("2000-01-01 00:00:00")), 946681200000);
  }

  @test
  testToScalarDecimal() {
    assert.strictEqual(Comparer.toScalar(new Decimal("1.23")), 1.23);
  }

  @test
  testToScalarCustomType() {
    assert.strictEqual(Comparer.toScalar(new CustomTypeValid("abc")), "abc");

    assert.throws(() => Comparer.toScalar(new CustomTypeInvalid("abc")));
  }

  @test
  testCompare() {
    assert.strictEqual(Comparer.compare(1, 2), -1);
    assert.strictEqual(Comparer.compare(2, 1), 1);
    assert.strictEqual(Comparer.compare(1, 3), -2);
    assert.strictEqual(Comparer.compare(3, 1), 2);
    assert.strictEqual(Comparer.compare(true, false), 1);
    assert.strictEqual(Comparer.compare(false, true), -1);
    assert.strictEqual(Comparer.compare(false, false), 0);
    assert.strictEqual(Comparer.compare(true, true), 0);

    assert.strictEqual(Comparer.compare(new Decimal("5.5"), new Decimal("2.2")), 3.3);

    assert.strictEqual(Comparer.compare(
      new Date(2000, 0, 1, 0, 0, 0),
      new Date(2000, 0, 1, 0, 0, 5)),
      -5000);

    assert.strictEqual(Comparer.compare(
      new Date(2000, 0, 1, 0, 0, 10),
      new Date(2000, 0, 1, 0, 0, 5)),
      5000);

    assert.strictEqual(Comparer.compare(
      moment("2000-01-01 00:00:00"),
      moment("2000-01-01 00:00:05")),
      -5000);

    assert.strictEqual(Comparer.compare(
      moment("2000-01-01 00:00:10"),
      moment("2000-01-01 00:00:05")),
      5000);

    assert.throw(() => Comparer.compare("a", <any>2));
  }

  @test
  testEquals() {
    assert.isTrue(Comparer.equals(1, 1));
    assert.isTrue(Comparer.equals(-2, -2));
    assert.isFalse(Comparer.equals(1, 3));
    assert.isFalse(Comparer.equals(3, 1));

    assert.isTrue(Comparer.equals(true, true));
    assert.isFalse(Comparer.equals(true, false));
    assert.isFalse(Comparer.equals(false, true));
    assert.isTrue(Comparer.equals(false, false));

    assert.isTrue(Comparer.equals("A", "A"));
    assert.isFalse(Comparer.equals("A", "B"));

    assert.isFalse(Comparer.equals(null, 2));
    assert.isFalse(Comparer.equals(2, null));
    assert.isTrue(Comparer.equals(null, null));

    assert.isTrue(Comparer.equals(new Decimal("5.5"), new Decimal("5.5")));

    assert.isTrue(Comparer.equals(
      new Date(2000, 0, 1, 0, 0, 0),
      new Date(2000, 0, 1, 0, 0, 0)));

    assert.isTrue(Comparer.equals(
      moment("2000-01-01 00:00:00"),
      moment("2000-01-01 00:00:00")));

    assert.isFalse(Comparer.equals(
      moment("2000-01-01 00:00:00"),
      moment("2000-01-01 00:00:05")));

    assert.throw(() => Comparer.equals("a", <any>2));

    assert.isTrue(Comparer.equals(new CustomTypeValid("abc"), new CustomTypeValid("abc")));
    assert.isFalse(Comparer.equals(new CustomTypeValid("abcd"), new CustomTypeValid("abc")));

    const customType = new CustomTypeInvalid("abc");

    Comparer.equals(customType, customType);
  }

  @test
  testInconvertible() {
    assert.throw(() => Comparer.equals("a", <any>2));

    assert.isTrue(Comparer.equals(2, 2, true));

    assert.isFalse(Comparer.equals({}, {}, true));

    assert.isFalse(Comparer.equals("a", <any>2, true));
  }
}
