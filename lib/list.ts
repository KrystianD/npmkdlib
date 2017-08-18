import * as moment from 'moment';
import { Moment } from 'moment';

export class List<T> extends Array<T> {
  public removeAll(elements: T[]) {
    for (let item of elements)
      this.remove(item);
  }

  public remove(element: T) {
    this.splice(this.indexOf(element), 1);
  }

  public clear() {
    this.length = 0;
  }

  public copyFrom(array: Array<T> | List<T> | T[]) {
    this.length = 0;
    for (let obj of array)
      this.push(obj);
  }

  public sortKey(key: (x: T) => number | Date | Moment, reverse = false) {
    function conv(x: T): number {
      let res = key(x);
      if (res instanceof Date)
        return res.getDate();
      if (moment.isMoment(x))
        return (res as Moment).valueOf();
      return res as number;
    }

    if (reverse)
      this.sort((a, b) => conv(b) - conv(a));
    else
      this.sort((a, b) => conv(a) - conv(b));
  }

  public replaceItem(element: T, newElement: T) {
    let idx = this.indexOf(element);
    this[idx] = newElement;
  }

  public append(array: T[] | List<T> | Array<T>) {
    for (let obj of array)
      this.push(obj);
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public kfilter(callbackfn: (value: T, index: number) => any): List<T> {
    let newList = new List<T>();
    let index = 0;
    for (let item of this) {
      if (callbackfn(item, index))
        newList.push(item);
      index += 1;
    }
    return newList;
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public kmap<U>(callbackfn: (value: T, index: number) => U): List<U> {
    let newList = new List<U>();
    let index = 0;
    for (let item of this) {
      newList.push(callbackfn(item, index));
      index += 1;
    }
    return newList;
  }

  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public kforEach(callbackfn: (this: void, value: T, index: number) => void): void {
    let index = 0;
    for (let item of this) {
      callbackfn(item, index);
      index += 1;
    }
  }

  public kunique(key: (x: T) => any = null): List<T> {
    let newList = new List<T>();
    let added = new Map<any, boolean>();
    for (let item of this) {
      let itemKey = key ? key(item) : item;
      if (!added.has(itemKey)) {
        newList.push(item);
        added.set(item, true);
      }
    }
    return newList;
  }

  public static sum<T>(arr: Array<T>, key: (x: T) => number = (x) => (x as any as number)) {
    return arr.reduce((prev, cur, idx, x) => prev + key(cur), 0);
  }
}
