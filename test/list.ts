import { List } from '..';

import { assert } from "chai";
import { suite, test } from "mocha-typescript";

@suite
class ListTest {
  @test
  testPush() {
    let list = new List<string>();
    list.push("A");

    assert.equal(list[0], "A");

    list.clear();

    assert.equal(list.length, 0);
  }

  @test
  testSortSimple1() {
    let list = new List<any>();
    list.push("B");
    list.push("C");
    list.push("A");
    list.push("A");

    list.ksort();

    assert.equal(list[0], "A");
    assert.equal(list[1], "A");
    assert.equal(list[2], "B");
    assert.equal(list[3], "C");
  }

  @test
  testSortSimple2() {
    let list = new List<any>();
    list.push("B");
    list.push("C");
    list.push("A");
    list.push("A");

    list.ksort(x => x, false);

    assert.equal(list[0], "A");
    assert.equal(list[1], "A");
    assert.equal(list[2], "B");
    assert.equal(list[3], "C");
  }

  @test
  testSortSimpleReverse() {
    let list = new List<any>();
    list.push("B");
    list.push("C");
    list.push("A");
    list.push("A");

    list.ksort(x => x, true);

    assert.equal(list[0], "C");
    assert.equal(list[1], "B");
    assert.equal(list[2], "A");
    assert.equal(list[3], "A");
  }

  @test
  testSortComplex() {
    let list = new List<any>();
    list.push(["B", 3]);
    list.push(["C", 4]);
    list.push(["A", 2]);
    list.push(["A", 1]);

    list.ksort(x => x);

    assert.deepEqual(list[0], ["A", 1]);
    assert.deepEqual(list[1], ["A", 2]);
    assert.deepEqual(list[2], ["B", 3]);
    assert.deepEqual(list[3], ["C", 4]);
  }

  @test
  testSortComplexReverse1() {
    let list = new List<any>();
    list.push(["B", 3]);
    list.push(["C", 4]);
    list.push(["A", 2]);
    list.push(["A", 1]);

    list.ksort(x => x, [false, true]);

    assert.deepEqual(list[0], ["A", 2]);
    assert.deepEqual(list[1], ["A", 1]);
    assert.deepEqual(list[2], ["B", 3]);
    assert.deepEqual(list[3], ["C", 4]);
  }

  @test
  testSortComplexReverse2() {
    let list = new List<any>();
    list.push(["B", 3]);
    list.push(["C", 4]);
    list.push(["A", 2]);
    list.push(["A", 1]);

    list.ksort(x => x, [true, false]);

    assert.deepEqual(list[0], ["C", 4]);
    assert.deepEqual(list[1], ["B", 3]);
    assert.deepEqual(list[2], ["A", 1]);
    assert.deepEqual(list[3], ["A", 2]);
  }
}
