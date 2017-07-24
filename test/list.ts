import { List } from '..';

import { assert } from "chai";
import { suite, test, slow, timeout } from "mocha-typescript";

@suite class ListTest {
  @test test() {
    let list = new List<string>();
    list.push("A");

    assert.equal(list[0], "A");

    list.clear();

    assert.equal(list.length, 0);
  }
}