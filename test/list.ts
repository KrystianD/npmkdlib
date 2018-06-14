import { List } from '..';

import { assert } from "chai";
import { suite, test } from "mocha-typescript";

@suite
class ListTest {
  @test
  testConstructor() {
    let list1 = new List<string>(["A", "B"]);

    assert.equal(list1[0], "A");
    assert.equal(list1[1], "B");

    let list2 = new List<string>(5);

    assert.equal(list2.length, 5);

    let list3 = new List<string>();

    assert.equal(list3.length, 0);
  }

  @test
  testPush() {
    let list = new List<string>();
    list.push("A");

    assert.equal(list[0], "A");
    assert.equal(list.at(0), "A");

    list.clear();

    assert.equal(list.length, 0);
  }

  @test
  testRemove() {
    let list = new List<any>();
    list.push("A");
    list.push("A");
    list.push("B");

    assert.equal(list[0], "A");
    assert.equal(list[1], "A");
    assert.equal(list[2], "B");

    list.remove("A");

    assert.equal(list[0], "A");
    assert.equal(list[1], "B");
  }

  @test
  testRemoveAll() {
    let list = new List<any>();
    list.push("A");
    list.push("A");
    list.push("B");
    list.push("C");

    assert.equal(list[0], "A");
    assert.equal(list[1], "A");
    assert.equal(list[2], "B");
    assert.equal(list[3], "C");

    list.removeAll(["A", "B"]);

    assert.equal(list[0], "C");
  }

  @test
  testContains() {
    let list = new List<any>();
    list.push("A");
    list.push("B");

    assert.isTrue(list.contains("A"));
    assert.isFalse(list.contains("C"));
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

  @test
  testInsert() {
    let list = new List<any>();
    list.push("A");
    list.push("B");
    list.push("C");

    list.insert(1, "X");

    assert.equal(list[0], "A");
    assert.equal(list[1], "X");
    assert.equal(list[2], "B");
    assert.equal(list[3], "C");
  }

  @test
  testInsertBeforeAfter() {
    let list = new List<any>();
    list.push("A");
    list.push("B");
    list.push("C");

    list.insertBefore("B", "X");
    list.insertAfter("B", "Y");
    list.insertAfter("C", "Z");

    assert.equal(list[0], "A");
    assert.equal(list[1], "X");
    assert.equal(list[2], "B");
    assert.equal(list[3], "Y");
    assert.equal(list[4], "C");
    assert.equal(list[5], "Z");
  }

  @test
  testInsertBeforeNotExists() {
    let list = new List<any>();
    list.push("A");
    list.push("B");
    list.push("C");

    assert.throw(() => {
      list.insertBefore("E", "X");
    });

    assert.equal(list[0], "A");
    assert.equal(list[1], "B");
    assert.equal(list[2], "C");
  }

  @test
  testJoinString() {
    let list = new List<any>();
    list.push("A");
    list.push("B");
    list.push("C");

    assert.equal(list.kjoinString(""), "ABC");
    assert.equal(list.kjoinString(","), "A,B,C");
    assert.equal(list.kjoinString(", "), "A, B, C");

    let list2 = new List<any>();

    assert.equal(list2.kjoinString(","), "");
  }

  @test
  testCreate() {
    let q: string[] = ["A", "B", "C"];
    let list1 = List.create(q);

    let list2 = List.create<string>(["A", "B", "C"]);

    assert.equal(list1[0], "A");
    assert.equal(list1[1], "B");
    assert.equal(list1[2], "C");
    assert.equal(list2[0], "A");
    assert.equal(list2[1], "B");
    assert.equal(list2[2], "C");
  }
}
