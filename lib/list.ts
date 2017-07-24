import * as moment from 'moment';
import { Moment } from 'moment';

export class List<T> extends Array<T> {
  public static sum<T>(arr: Array<T>, key: (x: T) => number) {
    return arr.reduce((prev, cur, idx, x) => prev + key(cur), 0);
  }

  public remove(element: T) {
    this.splice(this.indexOf(element), 1);
  }

  public clear() {
    this.length = 0;
  }

  public copyFrom(array: Array<T>) {
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

  public append(array: T[]) {
    for (let obj of array)
      this.push(obj);
  }
}
