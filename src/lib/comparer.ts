import Decimal from 'decimal.js';
import { KnownType } from "./common";

export function toScalar(value: KnownType, allowIncomparable = false): string | number {
  if (value === null || value === undefined)
    return null;

  if (value === true)
    return 1;
  if (value === false)
    return 0;

  let valueOf;
  if (Decimal.isDecimal(value))
    valueOf = (<any>value).toNumber();
  else
    valueOf = (<any>value).valueOf();

  if (typeof valueOf === "number" || typeof valueOf === "string")
    return valueOf;
  else if (allowIncomparable)
    return undefined;
  else
    throw new Error(`/${typeof valueOf}/ is not convertible to scalar`);
}

export function compare<T extends KnownType>(x: T, y: T): number {
  const _x = toScalar(x);
  const _y = toScalar(y);

  if (typeof _x == "number" && typeof _y == "number")
    return _x - _y;
  if (typeof _x == "string" && typeof _y == "string")
    return _x < _y ? -1 : (_x > _y ? 1 : 0);

  throw new Error(`invalid types for comparison, x: /${typeof(x)}/, y: /${typeof(y)}/`);
}

export function equals<T extends KnownType>(x: T, y: T, allowIncomparable = false): boolean {
  if (x === undefined) x = null;
  if (y === undefined) y = null;

  if (x === null && y !== null)
    return false;
  if (x !== null && y === null)
    return false;
  if (x === null && y === null)
    return true;

  if (x === y)
    return true;

  const _x = toScalar(x, allowIncomparable);
  const _y = toScalar(y, allowIncomparable);

  if (_x === undefined || _y === undefined)
    return false;

  if ((typeof _x) === (typeof _y))
    return _x === _y;
  else if (allowIncomparable)
    return false;
  else
    throw new Error(`invalid types for comparison, x: /${typeof(x)}/, y: /${typeof(y)}/`);
}

