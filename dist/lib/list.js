'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.List = exports.ChainableIterator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require('moment');

var moment = _interopRequireWildcard(_moment);

var _decimal = require('decimal.js');

var _decimal2 = _interopRequireDefault(_decimal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function compare(x, y) {
    if (typeof x == "number" && typeof y == "number") return x - y;
    if (x instanceof Date && y instanceof Date) return x.getDate() - y.getDate();
    if (typeof x == "string" && typeof y == "string") return x < y ? -1 : x > y ? 1 : 0;
    if (moment.isMoment(x) && moment.isMoment(y)) return x.valueOf() - y.valueOf();
    throw new Error('invalid types for comparison, x: ' + (typeof x === 'undefined' ? 'undefined' : _typeof(x)) + ', y: ' + (typeof y === 'undefined' ? 'undefined' : _typeof(y)));
}

var ChainableIterator = exports.ChainableIterator = function () {
    function ChainableIterator(baseIterator) {
        _classCallCheck(this, ChainableIterator);

        this.baseIterator = baseIterator;
    }

    _createClass(ChainableIterator, [{
        key: 'next',
        value: function next() {
            return this.baseIterator.next();
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            return this;
        }
    }, {
        key: 'kfilter',
        value: function kfilter(callbackfn) {
            var self = this;
            var it = /*#__PURE__*/regeneratorRuntime.mark(function it() {
                var index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

                return regeneratorRuntime.wrap(function it$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                index = 0;
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 4;
                                _iterator = self[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 15;
                                    break;
                                }

                                item = _step.value;

                                if (!callbackfn(item, index)) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 11;
                                return item;

                            case 11:
                                index += 1;

                            case 12:
                                _iteratorNormalCompletion = true;
                                _context.next = 6;
                                break;

                            case 15:
                                _context.next = 21;
                                break;

                            case 17:
                                _context.prev = 17;
                                _context.t0 = _context['catch'](4);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 21:
                                _context.prev = 21;
                                _context.prev = 22;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 24:
                                _context.prev = 24;

                                if (!_didIteratorError) {
                                    _context.next = 27;
                                    break;
                                }

                                throw _iteratorError;

                            case 27:
                                return _context.finish(24);

                            case 28:
                                return _context.finish(21);

                            case 29:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, it, this, [[4, 17, 21, 29], [22,, 24, 28]]);
            });
            return new ChainableIterator(it());
        }
    }, {
        key: 'kmap',
        value: function kmap(callbackfn) {
            var self = this;
            var it = /*#__PURE__*/regeneratorRuntime.mark(function it() {
                var index, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

                return regeneratorRuntime.wrap(function it$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                index = 0;
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context2.prev = 4;
                                _iterator2 = self[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context2.next = 14;
                                    break;
                                }

                                item = _step2.value;
                                _context2.next = 10;
                                return callbackfn(item, index);

                            case 10:
                                index += 1;

                            case 11:
                                _iteratorNormalCompletion2 = true;
                                _context2.next = 6;
                                break;

                            case 14:
                                _context2.next = 20;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t0 = _context2['catch'](4);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context2.t0;

                            case 20:
                                _context2.prev = 20;
                                _context2.prev = 21;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 23:
                                _context2.prev = 23;

                                if (!_didIteratorError2) {
                                    _context2.next = 26;
                                    break;
                                }

                                throw _iteratorError2;

                            case 26:
                                return _context2.finish(23);

                            case 27:
                                return _context2.finish(20);

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, it, this, [[4, 16, 20, 28], [21,, 23, 27]]);
            });
            return new ChainableIterator(it());
        }
    }, {
        key: 'ksum',
        value: function ksum() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return x;
            };

            var val = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val += itemVal;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return val;
        }
    }, {
        key: 'ksumDecimal',
        value: function ksumDecimal() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return x;
            };

            var val = new _decimal2.default(0);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val = val.add(itemVal);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return val;
        }
    }]);

    return ChainableIterator;
}();

var List = exports.List = function (_extendableBuiltin2) {
    _inherits(List, _extendableBuiltin2);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'removeAll',
        value: function removeAll(elements) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = elements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var item = _step5.value;

                    this.remove(item);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'remove',
        value: function remove(element) {
            this.splice(this.indexOf(element), 1);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.length = 0;
        }
    }, {
        key: 'copyFrom',
        value: function copyFrom(array) {
            this.length = 0;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = array[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var obj = _step6.value;

                    this.push(obj);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }, {
        key: 'sortKey',
        value: function sortKey(key, reverse) {
            return this.ksort(key, reverse);
        }
    }, {
        key: 'ksort',
        value: function ksort(key, reverse) {
            if (key === undefined || key === null) key = function key(x) {
                return x;
            };
            function cmp(a, b) {
                var keyValA = key(a);
                var keyValB = key(b);
                if (Array.isArray(keyValA)) {
                    for (var i = 0; i < keyValA.length; i++) {
                        var rev = reverse ? i >= reverse.length ? false : reverse[i] : false;
                        var _cmp = compare(keyValA[i], keyValB[i]);
                        _cmp = rev ? -_cmp : _cmp;
                        if (_cmp != 0) return _cmp;
                    }
                    return 0;
                } else {
                    var _cmp2 = compare(keyValA, keyValB);
                    return reverse ? -_cmp2 : _cmp2;
                }
            }
            this.sort(function (a, b) {
                return cmp(a, b);
            });
        }
    }, {
        key: 'replaceItem',
        value: function replaceItem(element, newElement) {
            var idx = this.indexOf(element);
            this[idx] = newElement;
        }
    }, {
        key: 'append',
        value: function append(array) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = array[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var obj = _step7.value;

                    this.push(obj);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }
    }, {
        key: 'kconcat',
        value: function kconcat() {
            var newList = new List();
            newList.append(this);

            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = items[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var list = _step8.value;

                    newList.append(list);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return newList;
        }
    }, {
        key: 'kfilter',
        value: function kfilter(callbackfn) {
            var newList = new List();
            var index = 0;
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var item = _step9.value;

                    if (callbackfn(item, index)) newList.push(item);
                    index += 1;
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return newList;
        }
    }, {
        key: 'it',
        value: function it() {
            var self = this;
            var it = /*#__PURE__*/regeneratorRuntime.mark(function it() {
                var index, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, item;

                return regeneratorRuntime.wrap(function it$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                index = 0;
                                _iteratorNormalCompletion10 = true;
                                _didIteratorError10 = false;
                                _iteratorError10 = undefined;
                                _context3.prev = 4;
                                _iterator10 = self[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                                    _context3.next = 13;
                                    break;
                                }

                                item = _step10.value;
                                _context3.next = 10;
                                return item;

                            case 10:
                                _iteratorNormalCompletion10 = true;
                                _context3.next = 6;
                                break;

                            case 13:
                                _context3.next = 19;
                                break;

                            case 15:
                                _context3.prev = 15;
                                _context3.t0 = _context3['catch'](4);
                                _didIteratorError10 = true;
                                _iteratorError10 = _context3.t0;

                            case 19:
                                _context3.prev = 19;
                                _context3.prev = 20;

                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }

                            case 22:
                                _context3.prev = 22;

                                if (!_didIteratorError10) {
                                    _context3.next = 25;
                                    break;
                                }

                                throw _iteratorError10;

                            case 25:
                                return _context3.finish(22);

                            case 26:
                                return _context3.finish(19);

                            case 27:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, it, this, [[4, 15, 19, 27], [20,, 22, 26]]);
            });
            return new ChainableIterator(it());
        }
    }, {
        key: 'kmap',
        value: function kmap(callbackfn) {
            var newList = new List();
            var index = 0;
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = this[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var item = _step11.value;

                    newList.push(callbackfn(item, index));
                    index += 1;
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return newList;
        }
    }, {
        key: 'kforEach',
        value: function kforEach(callbackfn) {
            var index = 0;
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = this[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var item = _step12.value;

                    callbackfn(item, index);
                    index += 1;
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }
        }
    }, {
        key: 'kunique',
        value: function kunique() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var newList = new List();
            var added = new Map();
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var item = _step13.value;

                    var itemKey = key ? key(item) : item;
                    if (!added.has(itemKey)) {
                        newList.push(item);
                        added.set(item, true);
                    }
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }

            return newList;
        }
    }, {
        key: 'ksum',
        value: function ksum() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return x;
            };

            var val = 0;
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = this[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var item = _step14.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val += itemVal;
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }

            return val;
        }
    }, {
        key: 'ksumDecimal',
        value: function ksumDecimal() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
                return x;
            };

            var val = new _decimal2.default(0);
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var item = _step15.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val = val.add(itemVal);
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return val;
        }
    }], [{
        key: 'ksumIterator',
        value: function ksumIterator(it) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
                return x;
            };

            var val = 0;
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = it[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var item = _step16.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val += itemVal;
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            return val;
        }
    }, {
        key: 'sum',
        value: function sum(arr, key) {
            return List.ksum(arr, key);
        }
    }, {
        key: 'ksum',
        value: function ksum(arr) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
                return x;
            };

            var val = 0;
            var _iteratorNormalCompletion17 = true;
            var _didIteratorError17 = false;
            var _iteratorError17 = undefined;

            try {
                for (var _iterator17 = arr[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                    var item = _step17.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val += itemVal;
                }
            } catch (err) {
                _didIteratorError17 = true;
                _iteratorError17 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
                        _iterator17.return();
                    }
                } finally {
                    if (_didIteratorError17) {
                        throw _iteratorError17;
                    }
                }
            }

            return val;
        }
    }, {
        key: 'ksumDecimal',
        value: function ksumDecimal(arr) {
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
                return x;
            };

            var val = new _decimal2.default(0);
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
                for (var _iterator18 = arr[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                    var item = _step18.value;

                    var itemVal = key(item);
                    if (itemVal !== null && itemVal !== undefined) val = val.add(key(item));
                }
            } catch (err) {
                _didIteratorError18 = true;
                _iteratorError18 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
                        _iterator18.return();
                    }
                } finally {
                    if (_didIteratorError18) {
                        throw _iteratorError18;
                    }
                }
            }

            return val;
        }
    }]);

    return List;
}(_extendableBuiltin(Array));