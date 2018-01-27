import { Moment } from 'moment';
import Decimal from 'decimal.js';
export declare class ChainableIterator<T> implements IterableIterator<T> {
    private baseIterator;
    constructor(baseIterator: IterableIterator<T>);
    next(): IteratorResult<T>;
    [Symbol.iterator](): IterableIterator<T>;
    kfilter(callbackfn: (value: T, index: number) => any): ChainableIterator<T>;
    kmap<U>(callbackfn: (value: T, index: number) => any): ChainableIterator<U>;
    ksum(key?: (x: T) => number): number;
    ksumDecimal(key?: (x: T) => Decimal | number): Decimal;
}
export declare class List<T> extends Array<T> {
    removeAll(elements: T[]): void;
    remove(element: T): void;
    clear(): void;
    copyFrom(array: Array<T> | List<T> | T[]): void;
    sortKey(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void;
    sortKey(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void;
    ksort(key?: (x: T) => number | Date | Moment | string, reverse?: boolean): void;
    ksort(key?: (x: T) => (number | Date | Moment | string)[], reverse?: boolean[]): void;
    replaceItem(element: T, newElement: T): void;
    append(array: T[] | List<T> | Array<T>): void;
    kconcat(...items: (T[] | List<T> | Array<T>)[]): List<T>;
    kfilter(callbackfn: (value: T, index: number) => any): List<T>;
    it(): ChainableIterator<T>;
    kmap<U>(callbackfn: (value: T, index: number) => U): List<U>;
    kforEach(callbackfn: (this: void, value: T, index: number) => void): void;
    kunique(key?: (x: T) => any): List<T>;
    ksum(key?: (x: T) => number): number;
    ksumDecimal(key?: (x: T) => Decimal | number): Decimal;
    static ksumIterator<T>(it: IterableIterator<T>, key?: (x: T) => number): number;
    static sum<T>(arr: Array<T>, key: (x: T) => number): number;
    static ksum<T>(arr: Array<T>, key?: (x: T) => number): number;
    static ksumDecimal<T>(arr: Array<T>, key?: (x: T) => Decimal | number): Decimal;
}
