import * as moment from 'moment';
import { Moment } from 'moment';
import Decimal from 'decimal.js';

function compare(x: number | Date | Moment | string, y: number | Date | Moment | string) {
  if (typeof x == "number" && typeof y == "number")
    return x - y;

  if (x instanceof Date && y instanceof Date)
    return x.getDate() - y.getDate();

  if (typeof x == "string" && typeof y == "string")
    return x < y ? -1 : (x > y ? 1 : 0);

  if (moment.isMoment(x) && moment.isMoment(y))
    return (x as Moment).valueOf() - (y as Moment).valueOf();

  throw new Error(`invalid types for comparison, x: ${typeof(x)}, y: ${typeof(y)}`);
}

export class ChainableIterator<T> implements IterableIterator<T> {
  constructor(private baseIterator: IterableIterator<T>) {
  }

  public next(): IteratorResult<T> {
    return this.baseIterator.next();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  public kfilter(callbackfn: (value: T, index: number) => any): ChainableIterator<T> {
    let self = this;

    let it = function* () {
      let index = 0;
      for (let item of self) {
        if (callbackfn(item, index))
          yield item;
        index += 1;
      }
    };

    return new ChainableIterator(it());
  }

  public kmap<U>(callbackfn: (value: T, index: number) => any): ChainableIterator<U> {
    let self = this;

    let it = function* () {
      let index = 0;
      for (let item of self) {
        yield callbackfn(item, index);
        index += 1;
      }
    };

    return new ChainableIterator(it());
  }

  public ksum(key: (x: T) => number = (x) => (x as any as number)): number {
    let val = 0;
    for (let item of this) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val += itemVal;
    }
    return val;
  }

  public ksumDecimal(key: (x: T) => Decimal | number = (x) => (x as any as number)): Decimal {
    let val = new Decimal(0);
    for (let item of this) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val = val.add(itemVal);
    }
    return val;
  }
}

function isArray(value: any) {
  return value && typeof value === 'object' && value.constructor === Array;
}

export class List<T> extends Array<T> {

  constructor(arrayLength?: number)
  constructor(items?: T[])
  constructor(arrayLengthOrItems: any = null) {
    if (arrayLengthOrItems === null) {
      super();
      return;
    }

    if (typeof arrayLengthOrItems == 'number') {
      super(arrayLengthOrItems);
      return;
    }

    if (isArray(arrayLengthOrItems)) {
      super();
      this.copyFrom(arrayLengthOrItems);
      return;
    }
  }

  public removeAll(elements: T[]) {
    for (let item of elements)
      while (this.contains(item))
        this.remove(item);
  }

  public insert(index: number, obj: T) {
    this.splice(index, 0, obj);
  }

  public insertAfter(ref: T, obj: T) {
    let idx = this.indexOf(ref);
    if (idx === -1)
      throw new Error("element not in list");
    this.splice(idx + 1, 0, obj);
  }

  public insertBefore(ref: T, obj: T) {
    let idx = this.indexOf(ref);
    if (idx === -1)
      throw new Error("element not in list");
    this.splice(idx, 0, obj);
  }

  public remove(element: T) {
    this.splice(this.indexOf(element), 1);
  }

  public clear() {
    this.length = 0;
  }

  public contains(element: T) {
    return this.indexOf(element) != -1;
  }

  public at(index: number): T {
    return this[index];
  }

  public copyFrom(array: Array<T> | List<T> | T[]) {
    this.length = 0;
    for (let obj of array)
      this.push(obj);
  }

  public sortKey(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void
  public sortKey(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void
  public sortKey(key?: (x: T) => any, reverse?: any): void {
    return this.ksort(key, reverse);
  }

  public ksort(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void
  public ksort(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void
  public ksort(key?: (x: T) => any, reverse?: any) {
    if (key === undefined || key === null)
      key = (x) => x;

    function cmp(a: T, b: T): number {
      let keyValA = key(a);
      let keyValB = key(b);

      if (Array.isArray(keyValA)) {
        for (let i = 0; i < keyValA.length; i++) {
          let rev = reverse ? (i >= reverse.length ? false : reverse[i]) : false;

          let cmp = compare(keyValA[i], keyValB[i]);
          cmp = rev ? -cmp : cmp;
          if (cmp != 0)
            return cmp;
        }
        return 0;
      }
      else {
        let cmp = compare(keyValA, keyValB);
        return reverse ? -cmp : cmp;
      }
    }

    this.sort((a, b) => cmp(a, b));
  }

  public ksorted(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void
  public ksorted(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void
  public ksorted(key?: (x: T) => any, reverse?: any): List<T> {
    let newList = new List<T>();
    newList.copyFrom(this);
    newList.ksort(key, reverse);
    return newList;
  }

  public sorted(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void
  public sorted(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void
  public sorted(key?: (x: T) => any, reverse?: any): List<T> {
    let newList = new List<T>();
    newList.copyFrom(this);
    newList.ksort(key, reverse);
    return newList;
  }

  public replaceItem(element: T, newElement: T) {
    let idx = this.indexOf(element);
    this[idx] = newElement;
  }

  public append(array: T[] | List<T> | Array<T>) {
    for (let obj of array)
      this.push(obj);
  }

  public kconcat(...items: (T[] | List<T> | Array<T>)[]): List<T> {
    let newList = new List<T>();
    newList.append(this);
    for (let list of items)
      newList.append(list);
    return newList;
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

  public it(): ChainableIterator<T> {
    let self = this;

    let it = function* () {
      let index = 0;
      for (let item of self)
        yield item;
    };

    return new ChainableIterator(it());
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

  public ksum(key: (x: T) => number = (x) => (x as any as number)): number {
    let val = 0;
    for (let item of this) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val += itemVal;
    }
    return val;
  }

  public ksumDecimal(key: (x: T) => Decimal | number = (x) => (x as any as number)): Decimal {
    let val = new Decimal(0);
    for (let item of this) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val = val.add(itemVal);
    }
    return val;
  }

  public kjoinString(separator: string): string {
    let output = "";
    for (let item of this) {
      if (output.length > 0)
        output += separator;
      output += item;
    }
    return output;
  }

  public static create<T>(iterable: Iterable<T> | Array<T> | T[]): List<T> {
    const list = new List<T>();
    list.copyFrom(Array.from(iterable));
    return list;
  }

  public static ksumIterator<T>(it: IterableIterator<T>, key: (x: T) => number = (x) => (x as any as number)): number {
    let val = 0;
    for (let item of it) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val += itemVal;
    }
    return val;
  }

  public static sum<T>(arr: Array<T>, key: (x: T) => number): number {
    return List.ksum(arr, key);
  }

  public static ksum<T>(arr: Array<T>, key: (x: T) => number = (x) => (x as any as number)): number {
    let val = 0;
    for (let item of arr) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val += itemVal;
    }
    return val;
  }

  public static ksumDecimal<T>(arr: Array<T>, key: (x: T) => Decimal | number = (x) => (x as any as Decimal)): Decimal {
    let val = new Decimal(0);
    for (let item of arr) {
      let itemVal = key(item);
      if (itemVal !== null && itemVal !== undefined)
        val = val.add(key(item));
    }
    return val;
  }

  public static kjoinString<T>(arr: Array<T>, separator: string): string {
    let output = "";
    for (let item of arr) {
      if (output.length > 0)
        output += separator;
      output += item;
    }
    return output;
  }
}
