import { List } from '../src';

import { assert } from "chai";
import { suite, test } from "mocha-typescript";

@suite
class ListTest {
  @test
  testConstructor() {
    let list1 = new List<string>(["A", "B"]);

    assert.strictEqual(list1[0], "A");
    assert.strictEqual(list1[1], "B");

    let list2 = new List<string>(5);

    assert.strictEqual(list2.length, 5);

    let list3 = new List<string>();

    assert.strictEqual(list3.length, 0);
  }

  @test
  testPush() {
    let list = new List<string>();
    list.push("A");

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list.at(0), "A");

    list.clear();

    assert.strictEqual(list.length, 0);
  }

  @test
  testRemove() {
    let list = new List<any>();
    list.push("A");
    list.push("A");
    list.push("B");

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "A");
    assert.strictEqual(list[2], "B");

    list.remove("A");

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "B");
  }

  @test
  testRemoveAll() {
    let list = new List<any>();
    list.push("A");
    list.push("A");
    list.push("B");
    list.push("C");

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "A");
    assert.strictEqual(list[2], "B");
    assert.strictEqual(list[3], "C");

    list.removeAll(["A", "B"]);

    assert.strictEqual(list[0], "C");
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

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "A");
    assert.strictEqual(list[2], "B");
    assert.strictEqual(list[3], "C");
  }

  @test
  testSortSimple2() {
    let list = new List<any>();
    list.push("B");
    list.push("C");
    list.push("A");
    list.push("A");

    list.ksort(x => x, false);

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "A");
    assert.strictEqual(list[2], "B");
    assert.strictEqual(list[3], "C");
  }

  @test
  testSortSimpleReverse() {
    let list = new List<any>();
    list.push("B");
    list.push("C");
    list.push("A");
    list.push("A");

    list.ksort(x => x, true);

    assert.strictEqual(list[0], "C");
    assert.strictEqual(list[1], "B");
    assert.strictEqual(list[2], "A");
    assert.strictEqual(list[3], "A");
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

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "X");
    assert.strictEqual(list[2], "B");
    assert.strictEqual(list[3], "C");
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

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "X");
    assert.strictEqual(list[2], "B");
    assert.strictEqual(list[3], "Y");
    assert.strictEqual(list[4], "C");
    assert.strictEqual(list[5], "Z");
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

    assert.strictEqual(list[0], "A");
    assert.strictEqual(list[1], "B");
    assert.strictEqual(list[2], "C");
  }

  @test
  testJoinString() {
    let list = new List<any>();
    list.push("A");
    list.push("B");
    list.push("C");

    assert.strictEqual(list.kjoinString(""), "ABC");
    assert.strictEqual(list.kjoinString(","), "A,B,C");
    assert.strictEqual(list.kjoinString(", "), "A, B, C");

    let list2 = new List<any>();

    assert.strictEqual(list2.kjoinString(","), "");
  }

  @test
  testCreate() {
    let q: string[] = ["A", "B", "C"];
    let list1 = List.create(q);

    let list2 = List.create<string>(["A", "B", "C"]);

    assert.strictEqual(list1[0], "A");
    assert.strictEqual(list1[1], "B");
    assert.strictEqual(list1[2], "C");
    assert.strictEqual(list2[0], "A");
    assert.strictEqual(list2[1], "B");
    assert.strictEqual(list2[2], "C");
  }

  @test
  testToMap() {
    let list = new List<any>();
    list.push(["A", 1]);
    list.push(["B", 2]);

    const map = list.toMap(x => x[0]);

    assert.strictEqual(map.size, 2);
    assert.deepEqual(map.get("A"), ["A", 1]);
    assert.deepEqual(map.get("B"), ["B", 2]);
  }

  @test
  testToMapValue() {
    let list = new List<any>();
    list.push(["A", 1]);
    list.push(["B", 2]);

    const map = list.toMap(x => x[0], x => x[1]);

    assert.strictEqual(map.size, 2);
    assert.strictEqual(map.get("A"), 1);
    assert.strictEqual(map.get("B"), 2);
  }

  @test
  testToMapMultiple() {
    let list = new List<any>();
    list.push(["A", 1]);
    list.push(["B", 2]);
    list.push(["A", 3]);

    const map = list.toMap(x => x[0], x => x[1]);

    assert.strictEqual(map.size, 2);
    assert.strictEqual(map.get("A"), 3);
    assert.strictEqual(map.get("B"), 2);
  }

  @test
  testGroupBy() {
    let list = new List<any>();
    list.push(["A", 1]);
    list.push(["B", 2]);
    list.push(["A", 3]);

    const map = list.groupBy(x => x[0]);

    assert.strictEqual(map.size, 2);
    assert.deepEqual(map.get("A"), List.create([["A", 1], ["A", 3]]));
    assert.deepEqual(map.get("B"), List.create([["B", 2]]));
  }

  @test
  testGroupByValue() {
    let list = new List<any>();
    list.push(["A", 1]);
    list.push(["B", 2]);
    list.push(["A", 3]);

    const map = list.groupBy(x => x[0], x => x[1]);

    assert.strictEqual(map.size, 2);
    assert.deepEqual(map.get("A"), List.create([1, 3]));
    assert.deepEqual(map.get("B"), List.create([2]));
  }
}
