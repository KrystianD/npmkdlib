import { Moment } from 'moment';
import Decimal from 'decimal.js';

export function toScalar(value: number | string | object | Date | Moment | Decimal): string | number {
  if (value === null || value === undefined)
    return null;

  let valueOf;
  if (Decimal.isDecimal(value))
    valueOf = (<any>value).toNumber();
  else
    valueOf = (<any>value).valueOf();

  if (typeof valueOf === "number" || typeof valueOf === "string")
    return valueOf;
  else
    throw new Error(`${typeof valueOf} is not a scalar`);
}

export function compare<T extends number | string | object | Date | Moment | Decimal>(x: T, y: T): number {
  const _x = toScalar(x);
  const _y = toScalar(y);

  if (typeof _x == "number" && typeof _y == "number")
    return _x - _y;
  if (typeof _x == "string" && typeof _y == "string")
    return _x < _y ? -1 : (_x > _y ? 1 : 0);

  throw new Error(`invalid types for comparison, x: ${typeof(x)}, y: ${typeof(y)}`);
}

export function equals<T extends number | string | object | Date | Moment | Decimal>(x: T, y: T): boolean {
  const _x = toScalar(x);
  const _y = toScalar(y);

  if (_x === null && _y !== null)
    return false;
  if (_x !== null && _y === null)
    return false;
  if (_x === null && _y === null)
    return true;

  if ((typeof _x) === (typeof _y))
    return _x === _y;

  throw new Error(`invalid types for comparison, x: ${typeof(x)}, y: ${typeof(y)}`);
}

