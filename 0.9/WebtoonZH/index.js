"use strict";
var source = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_buffer();
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end2) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end2; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      init_buffer();
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      init_buffer();
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b)
          return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf))
                buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end2) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end2 === void 0 || end2 > this.length) {
          end2 = this.length;
        }
        if (end2 <= 0) {
          return "";
        }
        end2 >>>= 0;
        start >>>= 0;
        if (end2 <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end2);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end2);
            case "ascii":
              return asciiSlice(this, start, end2);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end2);
            case "base64":
              return base64Slice(this, start, end2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end2);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString2() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end2, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end2 === void 0) {
          end2 = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end2 > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end2) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end2) {
          return 1;
        }
        start >>>= 0;
        end2 >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x = thisEnd - thisStart;
        let y = end2 - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end2);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val2, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val2 === "string") {
          val2 = Buffer3.from(val2, encoding);
        }
        if (Buffer3.isBuffer(val2)) {
          if (val2.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val2, byteOffset, encoding, dir);
        } else if (typeof val2 === "number") {
          val2 = val2 & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val2, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val2, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val2], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val2, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val2.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val2.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val2, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val2, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val2, byteOffset, encoding) {
        return this.indexOf(val2, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val2, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val2, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val2, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val2, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end2) {
        if (start === 0 && end2 === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end2));
        }
      }
      function utf8Slice(buf, start, end2) {
        end2 = Math.min(buf.length, end2);
        const res = [];
        let i = start;
        while (i < end2) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end2) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end2) {
        let ret = "";
        end2 = Math.min(buf.length, end2);
        for (let i = start; i < end2; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end2) {
        let ret = "";
        end2 = Math.min(buf.length, end2);
        for (let i = start; i < end2; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end2) {
        const len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end2 || end2 < 0 || end2 > len)
          end2 = len;
        let out = "";
        for (let i = start; i < end2; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end2) {
        const bytes = buf.slice(start, end2);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice2(start, end2) {
        const len = this.length;
        start = ~~start;
        end2 = end2 === void 0 ? len : ~~end2;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end2 < 0) {
          end2 += len;
          if (end2 < 0)
            end2 = 0;
        } else if (end2 > len) {
          end2 = len;
        }
        if (end2 < start)
          end2 = start;
        const newBuf = this.subarray(start, end2);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val2 = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val2 += this[offset + i] * mul;
        }
        return val2;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val2 = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val2 += this[offset + --byteLength2] * mul;
        }
        return val2;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first2 = this[offset];
        const last2 = this[offset + 7];
        if (first2 === void 0 || last2 === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first2 + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last2 * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first2 = this[offset];
        const last2 = this[offset + 7];
        if (first2 === void 0 || last2 === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first2 * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last2;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val2 = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val2 += this[offset + i] * mul;
        }
        mul *= 128;
        if (val2 >= mul)
          val2 -= Math.pow(2, 8 * byteLength2);
        return val2;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val2 = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val2 += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val2 >= mul)
          val2 -= Math.pow(2, 8 * byteLength2);
        return val2;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val2 = this[offset] | this[offset + 1] << 8;
        return val2 & 32768 ? val2 | 4294901760 : val2;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val2 = this[offset + 1] | this[offset] << 8;
        return val2 & 32768 ? val2 | 4294901760 : val2;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first2 = this[offset];
        const last2 = this[offset + 7];
        if (first2 === void 0 || last2 === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val2 = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last2 << 24);
        return (BigInt(val2) << BigInt(32)) + BigInt(first2 + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first2 = this[offset];
        const last2 = this[offset + 7];
        if (first2 === void 0 || last2 === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val2 = (first2 << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val2) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last2);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end2) {
        if (!Buffer3.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end2 && end2 !== 0)
          end2 = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end2 > 0 && end2 < start)
          end2 = start;
        if (end2 === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end2 < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end2 > this.length)
          end2 = this.length;
        if (target.length - targetStart < end2 - start) {
          end2 = target.length - targetStart + start;
        }
        const len = end2 - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end2);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end2),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val2, start, end2, encoding) {
        if (typeof val2 === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end2 = this.length;
          } else if (typeof end2 === "string") {
            encoding = end2;
            end2 = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val2.length === 1) {
            const code = val2.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val2 = code;
            }
          }
        } else if (typeof val2 === "number") {
          val2 = val2 & 255;
        } else if (typeof val2 === "boolean") {
          val2 = Number(val2);
        }
        if (start < 0 || this.length < start || this.length < end2) {
          throw new RangeError("Out of range index");
        }
        if (end2 <= start) {
          return this;
        }
        start = start >>> 0;
        end2 = end2 === void 0 ? this.length : end2 >>> 0;
        if (!val2)
          val2 = 0;
        let i;
        if (typeof val2 === "number") {
          for (i = start; i < end2; ++i) {
            this[i] = val2;
          }
        } else {
          const bytes = Buffer3.isBuffer(val2) ? val2 : Buffer3.from(val2, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val2 + '" is invalid for argument "value"');
          }
          for (i = 0; i < end2 - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val2) {
        let res = "";
        let i = val2.length;
        const start = val2[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val2.slice(i - 3, i)}${res}`;
        }
        return `${val2.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/@paperback/toolchain/dist/shims/buffer.js
  var Buffer2;
  var init_buffer = __esm({
    "node_modules/@paperback/toolchain/dist/shims/buffer.js"() {
      Buffer2 = require_buffer().Buffer;
    }
  });

  // node_modules/@paperback/types/lib/impl/SettingsUI/Form.js
  var require_Form = __commonJS({
    "node_modules/@paperback/types/lib/impl/SettingsUI/Form.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Form = void 0;
      var Form2 = class {
        reloadForm() {
          const formId = this["__underlying_formId"];
          if (!formId)
            return;
          Application.formDidChange(formId);
        }
      };
      exports.Form = Form2;
    }
  });

  // node_modules/@paperback/types/lib/impl/SettingsUI/FormItemElement.js
  var require_FormItemElement = __commonJS({
    "node_modules/@paperback/types/lib/impl/SettingsUI/FormItemElement.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LabelRow = LabelRow;
      exports.InputRow = InputRow;
      exports.ToggleRow = ToggleRow2;
      exports.SelectRow = SelectRow;
      exports.ButtonRow = ButtonRow;
      exports.NavigationRow = NavigationRow;
      exports.OAuthButtonRow = OAuthButtonRow;
      exports.DeferredItem = DeferredItem;
      function LabelRow(id, props) {
        return { ...props, id, type: "labelRow", isHidden: props.isHidden ?? false };
      }
      function InputRow(id, props) {
        return { ...props, id, type: "inputRow", isHidden: props.isHidden ?? false };
      }
      function ToggleRow2(id, props) {
        return { ...props, id, type: "toggleRow", isHidden: props.isHidden ?? false };
      }
      function SelectRow(id, props) {
        return { ...props, id, type: "selectRow", isHidden: props.isHidden ?? false };
      }
      function ButtonRow(id, props) {
        return { ...props, id, type: "buttonRow", isHidden: props.isHidden ?? false };
      }
      function NavigationRow(id, props) {
        return {
          ...props,
          id,
          type: "navigationRow",
          isHidden: props.isHidden ?? false
        };
      }
      function OAuthButtonRow(id, props) {
        return {
          ...props,
          id,
          type: "oauthButtonRow",
          isHidden: props.isHidden ?? false
        };
      }
      function DeferredItem(work) {
        return work();
      }
    }
  });

  // node_modules/@paperback/types/lib/impl/SettingsUI/FormSection.js
  var require_FormSection = __commonJS({
    "node_modules/@paperback/types/lib/impl/SettingsUI/FormSection.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Section = Section2;
      function Section2(params, items) {
        let info;
        if (typeof params === "string") {
          info = { id: params };
        } else {
          info = params;
        }
        return {
          ...info,
          items: items.filter((x) => x)
        };
      }
    }
  });

  // node_modules/@paperback/types/lib/impl/SettingsUI/index.js
  var require_SettingsUI = __commonJS({
    "node_modules/@paperback/types/lib/impl/SettingsUI/index.js"(exports) {
      "use strict";
      init_buffer();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Form(), exports);
      __exportStar(require_FormItemElement(), exports);
      __exportStar(require_FormSection(), exports);
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/ChapterProviding.js
  var require_ChapterProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/ChapterProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/CloudflareBypassRequestProviding.js
  var require_CloudflareBypassRequestProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/CloudflareBypassRequestProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/DiscoverSectionProviding.js
  var require_DiscoverSectionProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/DiscoverSectionProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/ManagedCollectionProviding.js
  var require_ManagedCollectionProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/ManagedCollectionProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/MangaProgressProviding.js
  var require_MangaProgressProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/MangaProgressProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/MangaProviding.js
  var require_MangaProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/MangaProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/SearchResultsProviding.js
  var require_SearchResultsProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/SearchResultsProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/SettingsFormProviding.js
  var require_SettingsFormProviding = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/SettingsFormProviding.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/interfaces/index.js
  var require_interfaces = __commonJS({
    "node_modules/@paperback/types/lib/impl/interfaces/index.js"(exports) {
      "use strict";
      init_buffer();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_ChapterProviding(), exports);
      __exportStar(require_CloudflareBypassRequestProviding(), exports);
      __exportStar(require_DiscoverSectionProviding(), exports);
      __exportStar(require_ManagedCollectionProviding(), exports);
      __exportStar(require_MangaProgressProviding(), exports);
      __exportStar(require_MangaProviding(), exports);
      __exportStar(require_SearchResultsProviding(), exports);
      __exportStar(require_SettingsFormProviding(), exports);
    }
  });

  // node_modules/@paperback/types/lib/impl/Application.js
  var require_Application = __commonJS({
    "node_modules/@paperback/types/lib/impl/Application.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/PaperbackInterceptor.js
  var require_PaperbackInterceptor = __commonJS({
    "node_modules/@paperback/types/lib/impl/PaperbackInterceptor.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PaperbackInterceptor = void 0;
      var PaperbackInterceptor = class {
        id;
        constructor(id) {
          this.id = id;
        }
        registerInterceptor() {
          Application.registerInterceptor(this.id, Application.Selector(this, "interceptRequest"), Application.Selector(this, "interceptResponse"));
        }
        unregisterInterceptor() {
          Application.unregisterInterceptor(this.id);
        }
      };
      exports.PaperbackInterceptor = PaperbackInterceptor;
    }
  });

  // node_modules/@paperback/types/lib/impl/Selector.js
  var require_Selector = __commonJS({
    "node_modules/@paperback/types/lib/impl/Selector.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/Extension.js
  var require_Extension = __commonJS({
    "node_modules/@paperback/types/lib/impl/Extension.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/impl/Lock.js
  var require_Lock = __commonJS({
    "node_modules/@paperback/types/lib/impl/Lock.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unlock = exports.lock = void 0;
      var promises = {};
      var resolvers = {};
      var lock = async (uid) => {
        if (promises[uid]) {
          await promises[uid];
          await (0, exports.lock)(uid);
          return;
        }
        promises[uid] = new Promise((resolve) => resolvers[uid] = () => {
          delete promises[uid];
          resolve();
        });
      };
      exports.lock = lock;
      var unlock = (uid) => {
        if (resolvers[uid]) {
          resolvers[uid]();
        }
      };
      exports.unlock = unlock;
    }
  });

  // node_modules/@paperback/types/lib/impl/BasicRateLimiter.js
  var require_BasicRateLimiter = __commonJS({
    "node_modules/@paperback/types/lib/impl/BasicRateLimiter.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BasicRateLimiter = void 0;
      var Lock_1 = require_Lock();
      var PaperbackInterceptor_1 = require_PaperbackInterceptor();
      var BasicRateLimiter2 = class extends PaperbackInterceptor_1.PaperbackInterceptor {
        options;
        promise;
        currentRequestsMade = 0;
        lastReset = Date.now();
        imageRegex = new RegExp(/\.(png|gif|jpeg|jpg|webp)(\?|$)/gi);
        constructor(id, options) {
          super(id);
          this.options = options;
        }
        async interceptRequest(request) {
          if (this.options.ignoreImages && this.imageRegex.test(request.url)) {
            return request;
          }
          await (0, Lock_1.lock)(this.id);
          await this.incrementRequestCount();
          (0, Lock_1.unlock)(this.id);
          return request;
        }
        async interceptResponse(request, response, data2) {
          return data2;
        }
        async incrementRequestCount() {
          await this.promise;
          const secondsSinceLastReset = (Date.now() - this.lastReset) / 1e3;
          if (secondsSinceLastReset > this.options.bufferInterval) {
            this.currentRequestsMade = 0;
            this.lastReset = Date.now();
          }
          this.currentRequestsMade += 1;
          if (this.currentRequestsMade >= this.options.numberOfRequests) {
            if (secondsSinceLastReset <= this.options.bufferInterval) {
              const sleepTime = this.options.bufferInterval - secondsSinceLastReset;
              console.log(`[BasicRateLimiter] rate limit hit, sleeping for ${sleepTime}`);
              this.promise = Application.sleep(sleepTime);
              await this.promise;
            }
          }
        }
      };
      exports.BasicRateLimiter = BasicRateLimiter2;
    }
  });

  // node_modules/@paperback/types/lib/impl/CloudflareError.js
  var require_CloudflareError = __commonJS({
    "node_modules/@paperback/types/lib/impl/CloudflareError.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CloudflareError = void 0;
      var CloudflareError = class extends Error {
        resolutionRequest;
        type = "cloudflareError";
        constructor(resolutionRequest, message = "Cloudflare bypass is required") {
          super(message);
          this.resolutionRequest = resolutionRequest;
        }
      };
      exports.CloudflareError = CloudflareError;
    }
  });

  // node_modules/@paperback/types/lib/impl/CookieStorageInterceptor.js
  var require_CookieStorageInterceptor = __commonJS({
    "node_modules/@paperback/types/lib/impl/CookieStorageInterceptor.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CookieStorageInterceptor = void 0;
      var PaperbackInterceptor_1 = require_PaperbackInterceptor();
      var cookieStateKey = "cookie_store_cookies";
      var CookieStorageInterceptor = class extends PaperbackInterceptor_1.PaperbackInterceptor {
        options;
        _cookies = {};
        get cookies() {
          return Object.freeze(Object.values(this._cookies));
        }
        set cookies(newValue) {
          const cookies = {};
          for (const cookie of newValue) {
            if (cookie.expires && cookie.expires.getUTCMilliseconds() <= Date.now()) {
              continue;
            }
            cookies[this.cookieIdentifier(cookie)] = cookie;
          }
          this._cookies = cookies;
          this.saveCookiesToStorage();
        }
        constructor(options) {
          super("cookie_store");
          this.options = options;
          this.loadCookiesFromStorage();
        }
        async interceptRequest(request) {
          request.cookies = {
            // Already set cookies
            ...request.cookies ?? {},
            // Inject all the cookies as { name: value }
            ...this.cookiesForUrl(request.url).reduce((v, c) => {
              v[c.name] = c.value;
              return v;
            }, {})
          };
          return request;
        }
        async interceptResponse(request, response, data2) {
          const cookies = this._cookies;
          for (const cookie of response.cookies) {
            const identifier = this.cookieIdentifier(cookie);
            if (this.isCookieExpired(cookie)) {
              delete cookies[identifier];
              continue;
            }
            cookies[identifier] = cookie;
          }
          this._cookies = cookies;
          this.saveCookiesToStorage();
          return data2;
        }
        setCookie(cookie) {
          if (this.isCookieExpired(cookie)) {
            return;
          }
          this._cookies[this.cookieIdentifier(cookie)] = cookie;
          this.saveCookiesToStorage();
        }
        deleteCookie(cookie) {
          delete this._cookies[this.cookieIdentifier(cookie)];
        }
        cookiesForUrl(urlString) {
          console.log("[COMPAT] COOKIES FOR URL");
          const urlRegex = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/gm;
          const urlParsed = urlRegex.exec(urlString);
          if (!urlParsed) {
            return [];
          }
          const hostname = urlParsed[3];
          const pathname = urlParsed[5];
          const matchedCookies = {};
          const splitUrlPath = pathname.split("/");
          const cookies = this.cookies;
          for (const cookie of cookies) {
            if (this.isCookieExpired(cookie)) {
              delete this._cookies[this.cookieIdentifier(cookie)];
              continue;
            }
            const cookieDomain = this.cookieSanitizedDomain(cookie);
            if (cookieDomain != hostname) {
              continue;
            }
            const cookiePath = this.cookieSanitizedPath(cookie);
            const splitCookiePath = cookiePath.split("/");
            let pathMatches = 0;
            if (pathname === cookiePath) {
              pathMatches = Number.MAX_SAFE_INTEGER;
            } else if (splitUrlPath.length === 0) {
              pathMatches = 1;
            } else if (cookiePath.startsWith(pathname) && splitUrlPath.length >= splitCookiePath.length) {
              for (let i = 0; i < splitUrlPath.length; i++) {
                if (splitCookiePath[i] === splitUrlPath[i]) {
                  pathMatches += 1;
                } else {
                  break;
                }
              }
            }
            if (pathMatches <= 0) {
              continue;
            }
            if ((matchedCookies[cookie.name]?.pathMatches ?? 0) < pathMatches) {
              matchedCookies[cookie.name] = { cookie, pathMatches };
            }
          }
          return Object.values(matchedCookies).map((x) => x.cookie);
        }
        cookieIdentifier(cookie) {
          return `${cookie.name}-${this.cookieSanitizedDomain(cookie)}-${this.cookieSanitizedPath(cookie)}`;
        }
        cookieSanitizedPath(cookie) {
          return cookie.path?.startsWith("/") ? cookie.path : "/" + (cookie.path ?? "");
        }
        cookieSanitizedDomain(cookie) {
          return cookie.domain.startsWith(".") ? cookie.domain.slice(1) : cookie.domain;
        }
        isCookieExpired(cookie) {
          if (cookie.expires && cookie.expires.getUTCMilliseconds() <= Date.now()) {
            return true;
          } else {
            return false;
          }
        }
        loadCookiesFromStorage() {
          if (this.options.storage == "memory")
            return;
          const cookieData = Application.getState(cookieStateKey);
          if (!cookieData) {
            this._cookies = {};
            return;
          }
          const cookies = {};
          for (const cookie of cookieData) {
            if (!cookie.expires || this.isCookieExpired(cookie))
              continue;
            cookies[this.cookieIdentifier(cookie)] = cookie;
          }
          this._cookies = cookies;
        }
        saveCookiesToStorage() {
          if (this.options.storage == "memory")
            return;
          Application.setState(this.cookies.filter((x) => x.expires), cookieStateKey);
        }
      };
      exports.CookieStorageInterceptor = CookieStorageInterceptor;
    }
  });

  // node_modules/@paperback/types/lib/impl/index.js
  var require_impl = __commonJS({
    "node_modules/@paperback/types/lib/impl/index.js"(exports) {
      "use strict";
      init_buffer();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_SettingsUI(), exports);
      __exportStar(require_interfaces(), exports);
      __exportStar(require_Application(), exports);
      __exportStar(require_PaperbackInterceptor(), exports);
      __exportStar(require_Selector(), exports);
      __exportStar(require_Extension(), exports);
      __exportStar(require_BasicRateLimiter(), exports);
      __exportStar(require_CloudflareError(), exports);
      __exportStar(require_CookieStorageInterceptor(), exports);
    }
  });

  // node_modules/@paperback/types/lib/Chapter.js
  var require_Chapter = __commonJS({
    "node_modules/@paperback/types/lib/Chapter.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/ChapterDetails.js
  var require_ChapterDetails = __commonJS({
    "node_modules/@paperback/types/lib/ChapterDetails.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/Cookie.js
  var require_Cookie = __commonJS({
    "node_modules/@paperback/types/lib/Cookie.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/DiscoverSectionItem.js
  var require_DiscoverSectionItem = __commonJS({
    "node_modules/@paperback/types/lib/DiscoverSectionItem.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/DiscoverSectionType.js
  var require_DiscoverSectionType = __commonJS({
    "node_modules/@paperback/types/lib/DiscoverSectionType.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiscoverSectionType = void 0;
      var DiscoverSectionType2;
      (function(DiscoverSectionType3) {
        DiscoverSectionType3[DiscoverSectionType3["featured"] = 0] = "featured";
        DiscoverSectionType3[DiscoverSectionType3["simpleCarousel"] = 1] = "simpleCarousel";
        DiscoverSectionType3[DiscoverSectionType3["prominentCarousel"] = 2] = "prominentCarousel";
        DiscoverSectionType3[DiscoverSectionType3["chapterUpdates"] = 3] = "chapterUpdates";
        DiscoverSectionType3[DiscoverSectionType3["genres"] = 4] = "genres";
      })(DiscoverSectionType2 || (exports.DiscoverSectionType = DiscoverSectionType2 = {}));
    }
  });

  // node_modules/@paperback/types/lib/HomeSection.js
  var require_HomeSection = __commonJS({
    "node_modules/@paperback/types/lib/HomeSection.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/MangaInfo.js
  var require_MangaInfo = __commonJS({
    "node_modules/@paperback/types/lib/MangaInfo.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/MangaProgress.js
  var require_MangaProgress = __commonJS({
    "node_modules/@paperback/types/lib/MangaProgress.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/PagedResults.js
  var require_PagedResults = __commonJS({
    "node_modules/@paperback/types/lib/PagedResults.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EndOfPageResults = void 0;
      exports.EndOfPageResults = Object.freeze({
        items: [],
        metadata: void 0
      });
    }
  });

  // node_modules/@paperback/types/lib/PBCanvas.js
  var require_PBCanvas = __commonJS({
    "node_modules/@paperback/types/lib/PBCanvas.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/PBImage.js
  var require_PBImage = __commonJS({
    "node_modules/@paperback/types/lib/PBImage.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/Request.js
  var require_Request = __commonJS({
    "node_modules/@paperback/types/lib/Request.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/Response.js
  var require_Response = __commonJS({
    "node_modules/@paperback/types/lib/Response.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/SearchFilter.js
  var require_SearchFilter = __commonJS({
    "node_modules/@paperback/types/lib/SearchFilter.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/SearchQuery.js
  var require_SearchQuery = __commonJS({
    "node_modules/@paperback/types/lib/SearchQuery.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/SearchResultItem.js
  var require_SearchResultItem = __commonJS({
    "node_modules/@paperback/types/lib/SearchResultItem.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/SourceInfo.js
  var require_SourceInfo = __commonJS({
    "node_modules/@paperback/types/lib/SourceInfo.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ContentRating = exports.SourceIntents = void 0;
      var SourceIntents;
      (function(SourceIntents2) {
        SourceIntents2[SourceIntents2["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
        SourceIntents2[SourceIntents2["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
        SourceIntents2[SourceIntents2["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
        SourceIntents2[SourceIntents2["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
        SourceIntents2[SourceIntents2["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
        SourceIntents2[SourceIntents2["SETTINGS_UI"] = 32] = "SETTINGS_UI";
        SourceIntents2[SourceIntents2["MANGA_SEARCH"] = 64] = "MANGA_SEARCH";
      })(SourceIntents || (exports.SourceIntents = SourceIntents = {}));
      var ContentRating2;
      (function(ContentRating3) {
        ContentRating3["EVERYONE"] = "SAFE";
        ContentRating3["MATURE"] = "MATURE";
        ContentRating3["ADULT"] = "ADULT";
      })(ContentRating2 || (exports.ContentRating = ContentRating2 = {}));
    }
  });

  // node_modules/@paperback/types/lib/SourceManga.js
  var require_SourceManga = __commonJS({
    "node_modules/@paperback/types/lib/SourceManga.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/Tag.js
  var require_Tag = __commonJS({
    "node_modules/@paperback/types/lib/Tag.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/TagSection.js
  var require_TagSection = __commonJS({
    "node_modules/@paperback/types/lib/TagSection.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/TrackedMangaChapterReadAction.js
  var require_TrackedMangaChapterReadAction = __commonJS({
    "node_modules/@paperback/types/lib/TrackedMangaChapterReadAction.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/TrackerActionQueue.js
  var require_TrackerActionQueue = __commonJS({
    "node_modules/@paperback/types/lib/TrackerActionQueue.js"(exports) {
      "use strict";
      init_buffer();
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@paperback/types/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@paperback/types/lib/index.js"(exports) {
      "use strict";
      init_buffer();
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_impl(), exports);
      __exportStar(require_Chapter(), exports);
      __exportStar(require_ChapterDetails(), exports);
      __exportStar(require_Cookie(), exports);
      __exportStar(require_DiscoverSectionItem(), exports);
      __exportStar(require_DiscoverSectionType(), exports);
      __exportStar(require_HomeSection(), exports);
      __exportStar(require_lib(), exports);
      __exportStar(require_MangaInfo(), exports);
      __exportStar(require_MangaProgress(), exports);
      __exportStar(require_PagedResults(), exports);
      __exportStar(require_PBCanvas(), exports);
      __exportStar(require_PBImage(), exports);
      __exportStar(require_Request(), exports);
      __exportStar(require_Response(), exports);
      __exportStar(require_SearchFilter(), exports);
      __exportStar(require_SearchQuery(), exports);
      __exportStar(require_SearchResultItem(), exports);
      __exportStar(require_SourceInfo(), exports);
      __exportStar(require_SourceManga(), exports);
      __exportStar(require_Tag(), exports);
      __exportStar(require_TagSection(), exports);
      __exportStar(require_TrackedMangaChapterReadAction(), exports);
      __exportStar(require_TrackerActionQueue(), exports);
    }
  });

  // node_modules/boolbase/index.js
  var require_boolbase = __commonJS({
    "node_modules/boolbase/index.js"(exports, module) {
      init_buffer();
      module.exports = {
        trueFunc: function trueFunc2() {
          return true;
        },
        falseFunc: function falseFunc() {
          return false;
        }
      };
    }
  });

  // node_modules/moment/moment.js
  var require_moment = __commonJS({
    "node_modules/moment/moment.js"(exports, module) {
      init_buffer();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory();
      })(exports, function() {
        "use strict";
        var hookCallback;
        function hooks() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray(input) {
          return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
        }
        function isObject(input) {
          return input != null && Object.prototype.toString.call(input) === "[object Object]";
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
          } else {
            var k;
            for (k in obj) {
              if (hasOwnProp(obj, k)) {
                return false;
              }
            }
            return true;
          }
        }
        function isUndefined(input) {
          return input === void 0;
        }
        function isNumber2(input) {
          return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
        }
        function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
        }
        function map2(arr, fn) {
          var res = [], i, arrLen = arr.length;
          for (i = 0; i < arrLen; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function extend(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function createUTC(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some2;
        if (Array.prototype.some) {
          some2 = Array.prototype.some;
        } else {
          some2 = function(fun) {
            var t = Object(this), len = t.length >>> 0, i;
            for (i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function isValid(m) {
          var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
          if (isNowValid) {
            flags = getParsingFlags(m);
            parsedParts = some2.call(flags.parsedDateParts, function(i) {
              return i != null;
            });
            isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) {
              isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
            }
          }
          if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
          } else {
            return isNowValid;
          }
          return m._isValid;
        }
        function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
            extend(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        var momentProperties = hooks.momentProperties = [], updateInProgress = false;
        function copyConfig(to2, from2) {
          var i, prop2, val2, momentPropertiesLen = momentProperties.length;
          if (!isUndefined(from2._isAMomentObject)) {
            to2._isAMomentObject = from2._isAMomentObject;
          }
          if (!isUndefined(from2._i)) {
            to2._i = from2._i;
          }
          if (!isUndefined(from2._f)) {
            to2._f = from2._f;
          }
          if (!isUndefined(from2._l)) {
            to2._l = from2._l;
          }
          if (!isUndefined(from2._strict)) {
            to2._strict = from2._strict;
          }
          if (!isUndefined(from2._tzm)) {
            to2._tzm = from2._tzm;
          }
          if (!isUndefined(from2._isUTC)) {
            to2._isUTC = from2._isUTC;
          }
          if (!isUndefined(from2._offset)) {
            to2._offset = from2._offset;
          }
          if (!isUndefined(from2._pf)) {
            to2._pf = getParsingFlags(from2);
          }
          if (!isUndefined(from2._locale)) {
            to2._locale = from2._locale;
          }
          if (momentPropertiesLen > 0) {
            for (i = 0; i < momentPropertiesLen; i++) {
              prop2 = momentProperties[i];
              val2 = from2[prop2];
              if (!isUndefined(val2)) {
                to2[prop2] = val2;
              }
            }
          }
          return to2;
        }
        function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
            this._d = /* @__PURE__ */ new Date(NaN);
          }
          if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
        }
        function warn(msg) {
          if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function() {
            if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
              var args = [], arg, i, key, argLen = arguments.length;
              for (i = 0; i < argLen; i++) {
                arg = "";
                if (typeof arguments[i] === "object") {
                  arg += "\n[" + i + "] ";
                  for (key in arguments[0]) {
                    if (hasOwnProp(arguments[0], key)) {
                      arg += key + ": " + arguments[0][key] + ", ";
                    }
                  }
                  arg = arg.slice(0, -2);
                } else {
                  arg = arguments[i];
                }
                args.push(arg);
              }
              warn(
                msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
              );
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
          }
        }
        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;
        function isFunction(input) {
          return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
        }
        function set(config) {
          var prop2, i;
          for (i in config) {
            if (hasOwnProp(config, i)) {
              prop2 = config[i];
              if (isFunction(prop2)) {
                this[i] = prop2;
              } else {
                this["_" + i] = prop2;
              }
            }
          }
          this._config = config;
          this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
          );
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig), prop2;
          for (prop2 in childConfig) {
            if (hasOwnProp(childConfig, prop2)) {
              if (isObject(parentConfig[prop2]) && isObject(childConfig[prop2])) {
                res[prop2] = {};
                extend(res[prop2], parentConfig[prop2]);
                extend(res[prop2], childConfig[prop2]);
              } else if (childConfig[prop2] != null) {
                res[prop2] = childConfig[prop2];
              } else {
                delete res[prop2];
              }
            }
          }
          for (prop2 in parentConfig) {
            if (hasOwnProp(parentConfig, prop2) && !hasOwnProp(childConfig, prop2) && isObject(parentConfig[prop2])) {
              res[prop2] = extend({}, res[prop2]);
            }
          }
          return res;
        }
        function Locale(config) {
          if (config != null) {
            this.set(config);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function(obj) {
            var i, res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var defaultCalendar = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L"
        };
        function calendar(key, mom, now2) {
          var output = this._calendar[key] || this._calendar["sameElse"];
          return isFunction(output) ? output.call(mom, now2) : output;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
          return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
        function addFormatToken(token2, padded, ordinal2, callback) {
          var func = callback;
          if (typeof callback === "string") {
            func = function() {
              return this[callback]();
            };
          }
          if (token2) {
            formatTokenFunctions[token2] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function() {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
          }
          if (ordinal2) {
            formatTokenFunctions[ordinal2] = function() {
              return this.localeData().ordinal(
                func.apply(this, arguments),
                token2
              );
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format2) {
          var array = format2.match(formattingTokens), i, length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function(mom) {
            var output = "", i2;
            for (i2 = 0; i2 < length; i2++) {
              output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
            }
            return output;
          };
        }
        function formatMoment(m, format2) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format2 = expandFormat(format2, m.localeData());
          formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
          return formatFunctions[format2](m);
        }
        function expandFormat(format2, locale2) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale2.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format2)) {
            format2 = format2.replace(
              localFormattingTokens,
              replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format2;
        }
        var defaultLongDateFormat = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A"
        };
        function longDateFormat(key) {
          var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format2 || !formatUpper) {
            return format2;
          }
          this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
              return tok.slice(1);
            }
            return tok;
          }).join("");
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = "Invalid date";
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace("%d", number);
        }
        var defaultRelativeTime = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        };
        function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        }
        function pastFuture(diff2, output) {
          var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
          return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
        }
        var aliases2 = {
          D: "date",
          dates: "date",
          date: "date",
          d: "day",
          days: "day",
          day: "day",
          e: "weekday",
          weekdays: "weekday",
          weekday: "weekday",
          E: "isoWeekday",
          isoweekdays: "isoWeekday",
          isoweekday: "isoWeekday",
          DDD: "dayOfYear",
          dayofyears: "dayOfYear",
          dayofyear: "dayOfYear",
          h: "hour",
          hours: "hour",
          hour: "hour",
          ms: "millisecond",
          milliseconds: "millisecond",
          millisecond: "millisecond",
          m: "minute",
          minutes: "minute",
          minute: "minute",
          M: "month",
          months: "month",
          month: "month",
          Q: "quarter",
          quarters: "quarter",
          quarter: "quarter",
          s: "second",
          seconds: "second",
          second: "second",
          gg: "weekYear",
          weekyears: "weekYear",
          weekyear: "weekYear",
          GG: "isoWeekYear",
          isoweekyears: "isoWeekYear",
          isoweekyear: "isoWeekYear",
          w: "week",
          weeks: "week",
          week: "week",
          W: "isoWeek",
          isoweeks: "isoWeek",
          isoweek: "isoWeek",
          y: "year",
          years: "year",
          year: "year"
        };
        function normalizeUnits(units) {
          return typeof units === "string" ? aliases2[units] || aliases2[units.toLowerCase()] : void 0;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {}, normalizedProp, prop2;
          for (prop2 in inputObject) {
            if (hasOwnProp(inputObject, prop2)) {
              normalizedProp = normalizeUnits(prop2);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop2];
              }
            }
          }
          return normalizedInput;
        }
        var priorities = {
          date: 9,
          day: 11,
          weekday: 11,
          isoWeekday: 11,
          dayOfYear: 4,
          hour: 13,
          millisecond: 16,
          minute: 14,
          month: 8,
          quarter: 7,
          second: 15,
          weekYear: 1,
          isoWeekYear: 1,
          week: 5,
          isoWeek: 5,
          year: 1
        };
        function getPrioritizedUnits(unitsObj) {
          var units = [], u;
          for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
            }
          }
          units.sort(function(a, b) {
            return a.priority - b.priority;
          });
          return units;
        }
        var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
        regexes = {};
        function addRegexToken(token2, regex, strictRegex) {
          regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
            return isStrict && strictRegex ? strictRegex : regex;
          };
        }
        function getParseRegexForToken(token2, config) {
          if (!hasOwnProp(regexes, token2)) {
            return new RegExp(unescapeFormat(token2));
          }
          return regexes[token2](config._strict, config._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(
            s.replace("\\", "").replace(
              /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
              function(matched, p1, p2, p3, p4) {
                return p1 || p2 || p3 || p4;
              }
            )
          );
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number) || 0;
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion, value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        var tokens = {};
        function addParseToken(token2, callback) {
          var i, func = callback, tokenLen;
          if (typeof token2 === "string") {
            token2 = [token2];
          }
          if (isNumber2(callback)) {
            func = function(input, array) {
              array[callback] = toInt(input);
            };
          }
          tokenLen = token2.length;
          for (i = 0; i < tokenLen; i++) {
            tokens[token2[i]] = func;
          }
        }
        function addWeekParseToken(token2, callback) {
          addParseToken(token2, function(input, array, config, token3) {
            config._w = config._w || {};
            callback(input, config._w, config, token3);
          });
        }
        function addTimeToArrayFromToken(token2, input, config) {
          if (input != null && hasOwnProp(tokens, token2)) {
            tokens[token2](input, config._a, config, token2);
          }
        }
        function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
        addFormatToken("Y", 0, 0, function() {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : "+" + y;
        });
        addFormatToken(0, ["YY", 2], 0, function() {
          return this.year() % 100;
        });
        addFormatToken(0, ["YYYY", 4], 0, "year");
        addFormatToken(0, ["YYYYY", 5], 0, "year");
        addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
        addRegexToken("Y", matchSigned);
        addRegexToken("YY", match1to2, match2);
        addRegexToken("YYYY", match1to4, match4);
        addRegexToken("YYYYY", match1to6, match6);
        addRegexToken("YYYYYY", match1to6, match6);
        addParseToken(["YYYYY", "YYYYYY"], YEAR);
        addParseToken("YYYY", function(input, array) {
          array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken("YY", function(input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken("Y", function(input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        hooks.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        var getSetYear = makeGetSet("FullYear", true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function makeGetSet(unit, keepTime) {
          return function(value) {
            if (value != null) {
              set$1(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
            } else {
              return get2(this, unit);
            }
          };
        }
        function get2(mom, unit) {
          if (!mom.isValid()) {
            return NaN;
          }
          var d = mom._d, isUTC = mom._isUTC;
          switch (unit) {
            case "Milliseconds":
              return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
            case "Seconds":
              return isUTC ? d.getUTCSeconds() : d.getSeconds();
            case "Minutes":
              return isUTC ? d.getUTCMinutes() : d.getMinutes();
            case "Hours":
              return isUTC ? d.getUTCHours() : d.getHours();
            case "Date":
              return isUTC ? d.getUTCDate() : d.getDate();
            case "Day":
              return isUTC ? d.getUTCDay() : d.getDay();
            case "Month":
              return isUTC ? d.getUTCMonth() : d.getMonth();
            case "FullYear":
              return isUTC ? d.getUTCFullYear() : d.getFullYear();
            default:
              return NaN;
          }
        }
        function set$1(mom, unit, value) {
          var d, isUTC, year, month, date;
          if (!mom.isValid() || isNaN(value)) {
            return;
          }
          d = mom._d;
          isUTC = mom._isUTC;
          switch (unit) {
            case "Milliseconds":
              return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
            case "Seconds":
              return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
            case "Minutes":
              return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
            case "Hours":
              return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
            case "Date":
              return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
            case "FullYear":
              break;
            default:
              return;
          }
          year = value;
          month = mom.month();
          date = mom.date();
          date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
          void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
        }
        function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units]();
          }
          return this;
        }
        function stringSet(units, value) {
          if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
            for (i = 0; i < prioritizedLen; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        function mod(n, x) {
          return (n % x + x) % x;
        }
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
            return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
        }
        addFormatToken("M", ["MM", 2], "Mo", function() {
          return this.month() + 1;
        });
        addFormatToken("MMM", 0, 0, function(format2) {
          return this.localeData().monthsShort(this, format2);
        });
        addFormatToken("MMMM", 0, 0, function(format2) {
          return this.localeData().months(this, format2);
        });
        addRegexToken("M", match1to2, match1to2NoLeadingZero);
        addRegexToken("MM", match1to2, match2);
        addRegexToken("MMM", function(isStrict, locale2) {
          return locale2.monthsShortRegex(isStrict);
        });
        addRegexToken("MMMM", function(isStrict, locale2) {
          return locale2.monthsRegex(isStrict);
        });
        addParseToken(["M", "MM"], function(input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
          var month = config._locale.monthsParse(input, token2, config._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config).invalidMonth = input;
          }
        });
        var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
        function localeMonths(m, format2) {
          if (!m) {
            return isArray(this._months) ? this._months : this._months["standalone"];
          }
          return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
        }
        function localeMonthsShort(m, format2) {
          if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
          }
          return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
        }
        function handleStrictParse(monthName, format2, strict) {
          var i, ii, mom, llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = createUTC([2e3, i]);
              this._shortMonthsParse[i] = this.monthsShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format2, strict) {
          var i, mom, regex;
          if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format2, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp(
                "^" + this.months(mom, "").replace(".", "") + "$",
                "i"
              );
              this._shortMonthsParse[i] = new RegExp(
                "^" + this.monthsShort(mom, "").replace(".", "") + "$",
                "i"
              );
            }
            if (!strict && !this._monthsParse[i]) {
              regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
              this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
              return i;
            } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === "string") {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (!isNumber2(value)) {
                return mom;
              }
            }
          }
          var month = value, date = mom.date();
          date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
          void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
          } else {
            return get2(this, "Month");
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) {
              this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
          }
        }
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsRegex")) {
              this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            shortP = regexEscape(this.monthsShort(mom, ""));
            longP = regexEscape(this.months(mom, ""));
            shortPieces.push(shortP);
            longPieces.push(longP);
            mixedPieces.push(longP);
            mixedPieces.push(shortP);
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._monthsShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
        }
        function createDate(y, m, d, h, M, s, ms) {
          var date;
          if (y < 100 && y >= 0) {
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
            }
          } else {
            date = new Date(y, m, d, h, M, s, ms);
          }
          return date;
        }
        function createUTCDate(y) {
          var date, args;
          if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
            }
          } else {
            date = new Date(Date.UTC.apply(null, arguments));
          }
          return date;
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return {
            year: resYear,
            dayOfYear: resDayOfYear
          };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return {
            week: resWeek,
            year: resYear
          };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        addFormatToken("w", ["ww", 2], "wo", "week");
        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
        addRegexToken("w", match1to2, match1to2NoLeadingZero);
        addRegexToken("ww", match1to2, match2);
        addRegexToken("W", match1to2, match1to2NoLeadingZero);
        addRegexToken("WW", match1to2, match2);
        addWeekParseToken(
          ["w", "ww", "W", "WW"],
          function(input, week, config, token2) {
            week[token2.substr(0, 1)] = toInt(input);
          }
        );
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = {
          dow: 0,
          // Sunday is the first day of the week.
          doy: 6
          // The week that contains Jan 6th is the first week of the year.
        };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        addFormatToken("d", 0, "do", "day");
        addFormatToken("dd", 0, 0, function(format2) {
          return this.localeData().weekdaysMin(this, format2);
        });
        addFormatToken("ddd", 0, 0, function(format2) {
          return this.localeData().weekdaysShort(this, format2);
        });
        addFormatToken("dddd", 0, 0, function(format2) {
          return this.localeData().weekdays(this, format2);
        });
        addFormatToken("e", 0, 0, "weekday");
        addFormatToken("E", 0, 0, "isoWeekday");
        addRegexToken("d", match1to2);
        addRegexToken("e", match1to2);
        addRegexToken("E", match1to2);
        addRegexToken("dd", function(isStrict, locale2) {
          return locale2.weekdaysMinRegex(isStrict);
        });
        addRegexToken("ddd", function(isStrict, locale2) {
          return locale2.weekdaysShortRegex(isStrict);
        });
        addRegexToken("dddd", function(isStrict, locale2) {
          return locale2.weekdaysRegex(isStrict);
        });
        addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
          var weekday = config._locale.weekdaysParse(input, token2, config._strict);
          if (weekday != null) {
            week.d = weekday;
          } else {
            getParsingFlags(config).invalidWeekday = input;
          }
        });
        addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
          week[token2] = toInt(input);
        });
        function parseWeekday(input, locale2) {
          if (typeof input !== "string") {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale2.weekdaysParse(input);
          if (typeof input === "number") {
            return input;
          }
          return null;
        }
        function parseIsoWeekday(input, locale2) {
          if (typeof input === "string") {
            return locale2.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
        }
        function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
        }
        var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
        function localeWeekdays(m, format2) {
          var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
          return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
        }
        function localeWeekdaysShort(m) {
          return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
        }
        function localeWeekdaysMin(m) {
          return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
        }
        function handleStrictParse$1(weekdayName, format2, strict) {
          var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = createUTC([2e3, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(
                mom,
                ""
              ).toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format2, strict) {
          var i, mom, regex;
          if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format2, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp(
                "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._shortWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._minWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
            }
            if (!this._weekdaysParse[i]) {
              regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
              this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = get2(this, "Day");
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, "d");
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
            return this.day() || 7;
          }
        }
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
          }
        }
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
          }
        }
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._weekdaysShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
          this._weekdaysMinStrictRegex = new RegExp(
            "^(" + minPieces.join("|") + ")",
            "i"
          );
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken("H", ["HH", 2], 0, "hour");
        addFormatToken("h", ["hh", 2], 0, hFormat);
        addFormatToken("k", ["kk", 2], 0, kFormat);
        addFormatToken("hmm", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken("hmmss", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        addFormatToken("Hmm", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken("Hmmss", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        function meridiem(token2, lowercase) {
          addFormatToken(token2, 0, 0, function() {
            return this.localeData().meridiem(
              this.hours(),
              this.minutes(),
              lowercase
            );
          });
        }
        meridiem("a", true);
        meridiem("A", false);
        function matchMeridiem(isStrict, locale2) {
          return locale2._meridiemParse;
        }
        addRegexToken("a", matchMeridiem);
        addRegexToken("A", matchMeridiem);
        addRegexToken("H", match1to2, match1to2HasZero);
        addRegexToken("h", match1to2, match1to2NoLeadingZero);
        addRegexToken("k", match1to2, match1to2NoLeadingZero);
        addRegexToken("HH", match1to2, match2);
        addRegexToken("hh", match1to2, match2);
        addRegexToken("kk", match1to2, match2);
        addRegexToken("hmm", match3to4);
        addRegexToken("hmmss", match5to6);
        addRegexToken("Hmm", match3to4);
        addRegexToken("Hmmss", match5to6);
        addParseToken(["H", "HH"], HOUR);
        addParseToken(["k", "kk"], function(input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(["a", "A"], function(input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
        });
        addParseToken(["h", "hh"], function(input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("Hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken("Hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return (input + "").toLowerCase().charAt(0) === "p";
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
        function localeMeridiem(hours2, minutes2, isLower) {
          if (hours2 > 11) {
            return isLower ? "pm" : "PM";
          } else {
            return isLower ? "am" : "AM";
          }
        }
        var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
          week: defaultLocaleWeek,
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
          meridiemParse: defaultLocaleMeridiemParse
        };
        var locales = {}, localeFamilies = {}, globalLocale;
        function commonPrefix(arr1, arr2) {
          var i, minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
              return i;
            }
          }
          return minl;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i = 0, j, next2, locale2, split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next2 = normalizeLocale(names[i + 1]);
            next2 = next2 ? next2.split("-") : null;
            while (j > 0) {
              locale2 = loadLocale(split.slice(0, j).join("-"));
              if (locale2) {
                return locale2;
              }
              if (next2 && next2.length >= j && commonPrefix(split, next2) >= j - 1) {
                break;
              }
              j--;
            }
            i++;
          }
          return globalLocale;
        }
        function isLocaleNameSane(name) {
          return !!(name && name.match("^[^/\\\\]*$"));
        }
        function loadLocale(name) {
          var oldLocale = null, aliasedRequire;
          if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
            try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = __require;
              aliasedRequire("./locale/" + name);
              getSetGlobalLocale(oldLocale);
            } catch (e) {
              locales[name] = null;
            }
          }
          return locales[name];
        }
        function getSetGlobalLocale(key, values) {
          var data2;
          if (key) {
            if (isUndefined(values)) {
              data2 = getLocale(key);
            } else {
              data2 = defineLocale(key, values);
            }
            if (data2) {
              globalLocale = data2;
            } else {
              if (typeof console !== "undefined" && console.warn) {
                console.warn(
                  "Locale " + key + " not found. Did you forget to load it?"
                );
              }
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config) {
          if (config !== null) {
            var locale2, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
              deprecateSimple(
                "defineLocaleOverride",
                "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
              );
              parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
              } else {
                locale2 = loadLocale(config.parentLocale);
                if (locale2 != null) {
                  parentConfig = locale2._config;
                } else {
                  if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                  }
                  localeFamilies[config.parentLocale].push({
                    name,
                    config
                  });
                  return null;
                }
              }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) {
              localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
              });
            }
            getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config) {
          if (config != null) {
            var locale2, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) {
              locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
              }
              config = mergeConfigs(parentConfig, config);
              if (tmpLocale == null) {
                config.abbr = name;
              }
              locale2 = new Locale(config);
              locale2.parentLocale = locales[name];
              locales[name] = locale2;
            }
            getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) {
                  getSetGlobalLocale(name);
                }
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function getLocale(key) {
          var locale2;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray(key)) {
            locale2 = loadLocale(key);
            if (locale2) {
              return locale2;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function listLocales() {
          return keys(locales);
        }
        function checkOverflow(m) {
          var overflow, a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, false],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, false],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, false],
          ["YYYY", /\d{4}/, false]
        ], isoTimes = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
        ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
          UT: 0,
          GMT: 0,
          EDT: -4 * 60,
          EST: -5 * 60,
          CDT: -5 * 60,
          CST: -6 * 60,
          MDT: -6 * 60,
          MST: -7 * 60,
          PDT: -7 * 60,
          PST: -8 * 60
        };
        function configFromISO(config) {
          var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
          if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDatesLen; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimesLen; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || " ") + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = "Z";
              } else {
                config._isValid = false;
                return;
              }
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
          var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
          ];
          if (secondStr) {
            result.push(parseInt(secondStr, 10));
          }
          return result;
        }
        function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
            return 2e3 + year;
          } else if (year <= 999) {
            return 1900 + year;
          }
          return year;
        }
        function preprocessRFC2822(s) {
          return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }
        function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
              parsedInput[0],
              parsedInput[1],
              parsedInput[2]
            ).getDay();
            if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
            }
          }
          return true;
        }
        function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
            return obsOffsets[obsOffset];
          } else if (militaryOffset) {
            return 0;
          } else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
          }
        }
        function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
          if (match) {
            parsedArray = extractFromRFC2822Strings(
              match[4],
              match[3],
              match[2],
              match[5],
              match[6],
              match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
              return;
            }
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
          } else {
            config._isValid = false;
          }
        }
        function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
            config._d = /* @__PURE__ */ new Date(+matched[1]);
            return;
          }
          configFromISO(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          configFromRFC2822(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          if (config._strict) {
            config._isValid = false;
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        hooks.createFromInputFallback = deprecate(
          "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
          function(config) {
            config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
          }
        );
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config) {
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
            return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate()
            ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }
        function configFromArray(config) {
          var i, date, input = [], currentDate, expectedWeekday, yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
              getParsingFlags(config)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
          }
          if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
          );
          expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
          if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(
              w.GG,
              config._a[YEAR],
              weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
          }
        }
        hooks.ISO_8601 = function() {
        };
        hooks.RFC_2822 = function() {
        };
        function configFromStringAndFormat(config) {
          if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
          }
          if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
          var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
          tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
          tokenLen = tokens2.length;
          for (i = 0; i < tokenLen; i++) {
            token2 = tokens2[i];
            parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(
                string.indexOf(parsedInput) + parsedInput.length
              );
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token2]) {
              if (parsedInput) {
                getParsingFlags(config).empty = false;
              } else {
                getParsingFlags(config).unusedTokens.push(token2);
              }
              addTimeToArrayFromToken(token2, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token2);
            }
          }
          getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
          }
          if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = void 0;
          }
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
          );
          era = getParsingFlags(config).era;
          if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
          }
          configFromArray(config);
          checkOverflow(config);
        }
        function meridiemFixWrap(locale2, hour, meridiem2) {
          var isPm;
          if (meridiem2 == null) {
            return hour;
          }
          if (locale2.meridiemHour != null) {
            return locale2.meridiemHour(hour, meridiem2);
          } else if (locale2.isPM != null) {
            isPm = locale2.isPM(meridiem2);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config) {
          var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
          if (configfLen === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = /* @__PURE__ */ new Date(NaN);
            return;
          }
          for (i = 0; i < configfLen; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) {
              validFormatFound = true;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
              if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
                if (validFormatFound) {
                  bestFormatIsValid = true;
                }
              }
            } else {
              if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
              }
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function configFromObject(config) {
          if (config._d) {
            return;
          }
          var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
          config._a = map2(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function(obj) {
              return obj && parseInt(obj, 10);
            }
          );
          configFromArray(config);
        }
        function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = void 0;
          }
          return res;
        }
        function prepareConfig(config) {
          var input = config._i, format2 = config._f;
          config._locale = config._locale || getLocale(config._l);
          if (input === null || format2 === void 0 && input === "") {
            return createInvalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
            config._d = input;
          } else if (isArray(format2)) {
            configFromStringAndArray(config);
          } else if (format2) {
            configFromStringAndFormat(config);
          } else {
            configFromInput(config);
          }
          if (!isValid(config)) {
            config._d = null;
          }
          return config;
        }
        function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
            config._d = new Date(hooks.now());
          } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
          } else if (typeof input === "string") {
            configFromString(config);
          } else if (isArray(input)) {
            config._a = map2(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else if (isObject(input)) {
            configFromObject(config);
          } else if (isNumber2(input)) {
            config._d = new Date(input);
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
          var c = {};
          if (format2 === true || format2 === false) {
            strict = format2;
            format2 = void 0;
          }
          if (locale2 === true || locale2 === false) {
            strict = locale2;
            locale2 = void 0;
          }
          if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = void 0;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale2;
          c._i = input;
          c._f = format2;
          c._strict = strict;
          return createFromConfig(c);
        }
        function createLocal(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, false);
        }
        var prototypeMin = deprecate(
          "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
          function() {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
              return other < this ? this : other;
            } else {
              return createInvalid();
            }
          }
        ), prototypeMax = deprecate(
          "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
          function() {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
              return other > this ? this : other;
            } else {
              return createInvalid();
            }
          }
        );
        function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        }
        var now = function() {
          return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
        };
        var ordering = [
          "year",
          "quarter",
          "month",
          "week",
          "day",
          "hour",
          "minute",
          "second",
          "millisecond"
        ];
        function isDurationValid(m) {
          var key, unitHasDecimal = false, i, orderLen = ordering.length;
          for (key in m) {
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
              return false;
            }
          }
          for (i = 0; i < orderLen; ++i) {
            if (m[ordering[i]]) {
              if (unitHasDecimal) {
                return false;
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
              }
            }
          }
          return true;
        }
        function isValid$1() {
          return this._isValid;
        }
        function createInvalid$1() {
          return createDuration(NaN);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
          this._isValid = isDurationValid(normalizedInput);
          this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
          minutes2 * 6e4 + // 1000 * 60
          hours2 * 1e3 * 60 * 60;
          this._days = +days2 + weeks2 * 7;
          this._months = +months2 + quarters * 3 + years2 * 12;
          this._data = {};
          this._locale = getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
          for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function offset(token2, separator) {
          addFormatToken(token2, 0, 0, function() {
            var offset2 = this.utcOffset(), sign2 = "+";
            if (offset2 < 0) {
              offset2 = -offset2;
              sign2 = "-";
            }
            return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
          });
        }
        offset("Z", ":");
        offset("ZZ", "");
        addRegexToken("Z", matchShortOffset);
        addRegexToken("ZZ", matchShortOffset);
        addParseToken(["Z", "ZZ"], function(input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches = (string || "").match(matcher), chunk, parts, minutes2;
          if (matches === null) {
            return null;
          }
          chunk = matches[matches.length - 1] || [];
          parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
          minutes2 = +(parts[1] * 60) + toInt(parts[2]);
          return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
        }
        function cloneWithOffset(input, model) {
          var res, diff2;
          if (model._isUTC) {
            res = model.clone();
            diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff2);
            hooks.updateOffset(res, false);
            return res;
          } else {
            return createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset());
        }
        hooks.updateOffset = function() {
        };
        function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset2 = this._offset || 0, localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === "string") {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                return this;
              }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, "m");
            }
            if (offset2 !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                addSubtract(
                  this,
                  createDuration(input - offset2, "m"),
                  1,
                  false
                );
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset2 : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== "string") {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), "m");
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
              this.utcOffset(tZone);
            } else {
              this.utcOffset(0, true);
            }
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {}, other;
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function createDuration(input, key) {
          var duration = input, match = null, sign2, ret, diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (isNumber2(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
              duration[key] = +input;
            } else {
              duration.milliseconds = +input;
            }
          } else if (match = aspNetRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign2,
              h: toInt(match[HOUR]) * sign2,
              m: toInt(match[MINUTE]) * sign2,
              s: toInt(match[SECOND]) * sign2,
              ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
              // the millisecond decimal point is included in the match
            };
          } else if (match = isoRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign2),
              M: parseIso(match[3], sign2),
              w: parseIso(match[4], sign2),
              d: parseIso(match[5], sign2),
              h: parseIso(match[6], sign2),
              m: parseIso(match[7], sign2),
              s: parseIso(match[8], sign2)
            };
          } else if (duration == null) {
            duration = {};
          } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(
              createLocal(duration.from),
              createLocal(duration.to)
            );
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          if (isDuration(input) && hasOwnProp(input, "_isValid")) {
            ret._isValid = input._isValid;
          }
          return ret;
        }
        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;
        function parseIso(inp, sign2) {
          var res = inp && parseFloat(inp.replace(",", "."));
          return (isNaN(res) ? 0 : res) * sign2;
        }
        function positiveMomentsDifference(base, other) {
          var res = {};
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function(val2, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(
                name,
                "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
              );
              tmp = val2;
              val2 = period;
              period = tmp;
            }
            dur = createDuration(val2, period);
            addSubtract(this, dur, direction);
            return this;
          };
        }
        function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (months2) {
            setMonth(mom, get2(mom, "Month") + months2 * isAdding);
          }
          if (days2) {
            set$1(mom, "Date", get2(mom, "Date") + days2 * isAdding);
          }
          if (milliseconds2) {
            mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
          }
          if (updateOffset) {
            hooks.updateOffset(mom, days2 || months2);
          }
        }
        var add2 = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
        function isString(input) {
          return typeof input === "string" || input instanceof String;
        }
        function isMomentInput(input) {
          return isMoment(input) || isDate(input) || isString(input) || isNumber2(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
        }
        function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms"
          ], i, property, propertyLen = properties.length;
          for (i = 0; i < propertyLen; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function isNumberOrStringArray(input) {
          var arrayTest = isArray(input), dataTypeTest = false;
          if (arrayTest) {
            dataTypeTest = input.filter(function(item) {
              return !isNumber2(item) && isString(input);
            }).length === 0;
          }
          return arrayTest && dataTypeTest;
        }
        function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "sameDay",
            "nextDay",
            "lastDay",
            "nextWeek",
            "lastWeek",
            "sameElse"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function getCalendarFormat(myMoment, now2) {
          var diff2 = myMoment.diff(now2, "days", true);
          return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
        }
        function calendar$1(time, formats) {
          if (arguments.length === 1) {
            if (!arguments[0]) {
              time = void 0;
              formats = void 0;
            } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = void 0;
            } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = void 0;
            }
          }
          var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
          return this.format(
            output || this.localeData().calendar(format2, this, createLocal(now2))
          );
        }
        function clone2() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from2, to2, units, inclusivity) {
          var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
          }
          inclusivity = inclusivity || "()";
          return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input), inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that, zoneDelta, output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          switch (units) {
            case "year":
              output = monthDiff(this, that) / 12;
              break;
            case "month":
              output = monthDiff(this, that);
              break;
            case "quarter":
              output = monthDiff(this, that) / 3;
              break;
            case "second":
              output = (this - that) / 1e3;
              break;
            case "minute":
              output = (this - that) / 6e4;
              break;
            case "hour":
              output = (this - that) / 36e5;
              break;
            case "day":
              output = (this - that - zoneDelta) / 864e5;
              break;
            case "week":
              output = (this - that - zoneDelta) / 6048e5;
              break;
            default:
              output = this - that;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          if (a.date() < b.date()) {
            return -monthDiff(b, a);
          }
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        function toString2() {
          return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function toISOString(keepOffset) {
          if (!this.isValid()) {
            return null;
          }
          var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
              m,
              utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
            );
          }
          if (isFunction(Date.prototype.toISOString)) {
            if (utc) {
              return this.toDate().toISOString();
            } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
            }
          }
          return formatMoment(
            m,
            utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        function inspect() {
          if (!this.isValid()) {
            return "moment.invalid(/* " + this._i + " */)";
          }
          var func = "moment", zone = "", prefix, year, datetime, suffix;
          if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
          }
          prefix = "[" + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
          datetime = "-MM-DD[T]HH:mm:ss.SSS";
          suffix = zone + '[")]';
          return this.format(prefix + year + datetime + suffix);
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === void 0) {
            return this._locale._abbr;
          } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate(
          "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
          function(key) {
            if (key === void 0) {
              return this.localeData();
            } else {
              return this.locale(key);
            }
          }
        );
        function localeData() {
          return this._locale;
        }
        var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
        function mod$1(dividend, divisor) {
          return (dividend % divisor + divisor) % divisor;
        }
        function localStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return new Date(y, m, d).valueOf();
          }
        }
        function utcStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return Date.UTC(y, m, d);
          }
        }
        function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year(), 0, 1);
              break;
            case "quarter":
              time = startOfDate(
                this.year(),
                this.month() - this.month() % 3,
                1
              );
              break;
            case "month":
              time = startOfDate(this.year(), this.month(), 1);
              break;
            case "week":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - this.weekday()
              );
              break;
            case "isoWeek":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1)
              );
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date());
              break;
            case "hour":
              time = this._d.valueOf();
              time -= mod$1(
                time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                MS_PER_HOUR
              );
              break;
            case "minute":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
            case "second":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
            case "quarter":
              time = startOfDate(
                this.year(),
                this.month() - this.month() % 3 + 3,
                1
              ) - 1;
              break;
            case "month":
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
            case "week":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - this.weekday() + 7
              ) - 1;
              break;
            case "isoWeek":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1) + 7
              ) - 1;
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
            case "hour":
              time = this._d.valueOf();
              time += MS_PER_HOUR - mod$1(
                time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                MS_PER_HOUR
              ) - 1;
              break;
            case "minute":
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
            case "second":
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 6e4;
        }
        function unix() {
          return Math.floor(this.valueOf() / 1e3);
        }
        function toDate() {
          return new Date(this.valueOf());
        }
        function toArray2() {
          var m = this;
          return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond()
          ];
        }
        function toObject() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function isValid$2() {
          return isValid(this);
        }
        function parsingFlags() {
          return extend({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
          };
        }
        addFormatToken("N", 0, 0, "eraAbbr");
        addFormatToken("NN", 0, 0, "eraAbbr");
        addFormatToken("NNN", 0, 0, "eraAbbr");
        addFormatToken("NNNN", 0, 0, "eraName");
        addFormatToken("NNNNN", 0, 0, "eraNarrow");
        addFormatToken("y", ["y", 1], "yo", "eraYear");
        addFormatToken("y", ["yy", 2], 0, "eraYear");
        addFormatToken("y", ["yyy", 3], 0, "eraYear");
        addFormatToken("y", ["yyyy", 4], 0, "eraYear");
        addRegexToken("N", matchEraAbbr);
        addRegexToken("NN", matchEraAbbr);
        addRegexToken("NNN", matchEraAbbr);
        addRegexToken("NNNN", matchEraName);
        addRegexToken("NNNNN", matchEraNarrow);
        addParseToken(
          ["N", "NN", "NNN", "NNNN", "NNNNN"],
          function(input, array, config, token2) {
            var era = config._locale.erasParse(input, token2, config._strict);
            if (era) {
              getParsingFlags(config).era = era;
            } else {
              getParsingFlags(config).invalidEra = input;
            }
          }
        );
        addRegexToken("y", matchUnsigned);
        addRegexToken("yy", matchUnsigned);
        addRegexToken("yyy", matchUnsigned);
        addRegexToken("yyyy", matchUnsigned);
        addRegexToken("yo", matchEraYearOrdinal);
        addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
        addParseToken(["yo"], function(input, array, config, token2) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
          }
          if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
            array[YEAR] = parseInt(input, 10);
          }
        });
        function localeEras(m, format2) {
          var i, l, date, eras = this._eras || getLocale("en")._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
              case "string":
                date = hooks(eras[i].since).startOf("day");
                eras[i].since = date.valueOf();
                break;
            }
            switch (typeof eras[i].until) {
              case "undefined":
                eras[i].until = Infinity;
                break;
              case "string":
                date = hooks(eras[i].until).startOf("day").valueOf();
                eras[i].until = date.valueOf();
                break;
            }
          }
          return eras;
        }
        function localeErasParse(eraName, format2, strict) {
          var i, l, eras = this.eras(), name, abbr, narrow;
          eraName = eraName.toUpperCase();
          for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) {
              switch (format2) {
                case "N":
                case "NN":
                case "NNN":
                  if (abbr === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNN":
                  if (name === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNNN":
                  if (narrow === eraName) {
                    return eras[i];
                  }
                  break;
              }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
            }
          }
        }
        function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? 1 : -1;
          if (year === void 0) {
            return hooks(era.since).year();
          } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
          }
        }
        function getEraName() {
          var i, l, val2, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val2 = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val2 && val2 <= eras[i].until) {
              return eras[i].name;
            }
            if (eras[i].until <= val2 && val2 <= eras[i].since) {
              return eras[i].name;
            }
          }
          return "";
        }
        function getEraNarrow() {
          var i, l, val2, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val2 = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val2 && val2 <= eras[i].until) {
              return eras[i].narrow;
            }
            if (eras[i].until <= val2 && val2 <= eras[i].since) {
              return eras[i].narrow;
            }
          }
          return "";
        }
        function getEraAbbr() {
          var i, l, val2, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val2 = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val2 && val2 <= eras[i].until) {
              return eras[i].abbr;
            }
            if (eras[i].until <= val2 && val2 <= eras[i].since) {
              return eras[i].abbr;
            }
          }
          return "";
        }
        function getEraYear() {
          var i, l, dir, val2, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            val2 = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val2 && val2 <= eras[i].until || eras[i].until <= val2 && val2 <= eras[i].since) {
              return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
            }
          }
          return this.year();
        }
        function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNameRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
        }
        function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, "_erasAbbrRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }
        function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNarrowRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }
        function matchEraAbbr(isStrict, locale2) {
          return locale2.erasAbbrRegex(isStrict);
        }
        function matchEraName(isStrict, locale2) {
          return locale2.erasNameRegex(isStrict);
        }
        function matchEraNarrow(isStrict, locale2) {
          return locale2.erasNarrowRegex(isStrict);
        }
        function matchEraYearOrdinal(isStrict, locale2) {
          return locale2._eraYearOrdinalRegex || matchUnsigned;
        }
        function computeErasParse() {
          var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            erasName = regexEscape(eras[i].name);
            erasAbbr = regexEscape(eras[i].abbr);
            erasNarrow = regexEscape(eras[i].narrow);
            namePieces.push(erasName);
            abbrPieces.push(erasAbbr);
            narrowPieces.push(erasNarrow);
            mixedPieces.push(erasName);
            mixedPieces.push(erasAbbr);
            mixedPieces.push(erasNarrow);
          }
          this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
          this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
          this._erasNarrowRegex = new RegExp(
            "^(" + narrowPieces.join("|") + ")",
            "i"
          );
        }
        addFormatToken(0, ["gg", 2], 0, function() {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ["GG", 2], 0, function() {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token2, getter) {
          addFormatToken(0, [token2, token2.length], 0, getter);
        }
        addWeekYearFormatToken("gggg", "weekYear");
        addWeekYearFormatToken("ggggg", "weekYear");
        addWeekYearFormatToken("GGGG", "isoWeekYear");
        addWeekYearFormatToken("GGGGG", "isoWeekYear");
        addRegexToken("G", matchSigned);
        addRegexToken("g", matchSigned);
        addRegexToken("GG", match1to2, match2);
        addRegexToken("gg", match1to2, match2);
        addRegexToken("GGGG", match1to4, match4);
        addRegexToken("gggg", match1to4, match4);
        addRegexToken("GGGGG", match1to6, match6);
        addRegexToken("ggggg", match1to6, match6);
        addWeekParseToken(
          ["gggg", "ggggg", "GGGG", "GGGGG"],
          function(input, week, config, token2) {
            week[token2.substr(0, 2)] = toInt(input);
          }
        );
        addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
          week[token2] = hooks.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday() + this.localeData()._week.dow,
            this.localeData()._week.dow,
            this.localeData()._week.doy
          );
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
          );
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken("Q", 0, "Qo", "quarter");
        addRegexToken("Q", match1);
        addParseToken("Q", function(input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        }
        addFormatToken("D", ["DD", 2], "Do", "date");
        addRegexToken("D", match1to2, match1to2NoLeadingZero);
        addRegexToken("DD", match1to2, match2);
        addRegexToken("Do", function(isStrict, locale2) {
          return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
        });
        addParseToken(["D", "DD"], DATE);
        addParseToken("Do", function(input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
        });
        var getSetDayOfMonth = makeGetSet("Date", true);
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        addRegexToken("DDD", match1to3);
        addRegexToken("DDDD", match3);
        addParseToken(["DDD", "DDDD"], function(input, array, config) {
          config._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear = Math.round(
            (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
          ) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        }
        addFormatToken("m", ["mm", 2], 0, "minute");
        addRegexToken("m", match1to2, match1to2HasZero);
        addRegexToken("mm", match1to2, match2);
        addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", false);
        addFormatToken("s", ["ss", 2], 0, "second");
        addRegexToken("s", match1to2, match1to2HasZero);
        addRegexToken("ss", match1to2, match2);
        addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", false);
        addFormatToken("S", 0, 0, function() {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ["SS", 2], 0, function() {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ["SSS", 3], 0, "millisecond");
        addFormatToken(0, ["SSSS", 4], 0, function() {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ["SSSSS", 5], 0, function() {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ["SSSSSS", 6], 0, function() {
          return this.millisecond() * 1e3;
        });
        addFormatToken(0, ["SSSSSSS", 7], 0, function() {
          return this.millisecond() * 1e4;
        });
        addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
          return this.millisecond() * 1e5;
        });
        addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
          return this.millisecond() * 1e6;
        });
        addRegexToken("S", match1to3, match1);
        addRegexToken("SS", match1to3, match2);
        addRegexToken("SSS", match1to3, match3);
        var token, getSetMillisecond;
        for (token = "SSSS"; token.length <= 9; token += "S") {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(("0." + input) * 1e3);
        }
        for (token = "S"; token.length <= 9; token += "S") {
          addParseToken(token, parseMs);
        }
        getSetMillisecond = makeGetSet("Milliseconds", false);
        addFormatToken("z", 0, 0, "zoneAbbr");
        addFormatToken("zz", 0, 0, "zoneName");
        function getZoneAbbr() {
          return this._isUTC ? "UTC" : "";
        }
        function getZoneName() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }
        var proto = Moment.prototype;
        proto.add = add2;
        proto.calendar = calendar$1;
        proto.clone = clone2;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray2;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== "undefined" && Symbol.for != null) {
          proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
            return "Moment<" + this.format() + ">";
          };
        }
        proto.toJSON = toJSON;
        proto.toString = toString2;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate(
          "dates accessor is deprecated. Use date instead.",
          getSetDayOfMonth
        );
        proto.months = deprecate(
          "months accessor is deprecated. Use month instead",
          getSetMonth
        );
        proto.years = deprecate(
          "years accessor is deprecated. Use year instead",
          getSetYear
        );
        proto.zone = deprecate(
          "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
          getSetZone
        );
        proto.isDSTShifted = deprecate(
          "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
          isDaylightSavingTimeShifted
        );
        function createUnix(input) {
          return createLocal(input * 1e3);
        }
        function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
        }
        function preParsePostFormat(string) {
          return string;
        }
        var proto$1 = Locale.prototype;
        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;
        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;
        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;
        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;
        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;
        function get$1(format2, index2, field, setter) {
          var locale2 = getLocale(), utc = createUTC().set(setter, index2);
          return locale2[field](utc, format2);
        }
        function listMonthsImpl(format2, index2, field) {
          if (isNumber2(format2)) {
            index2 = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
          if (index2 != null) {
            return get$1(format2, index2, field, "month");
          }
          var i, out = [];
          for (i = 0; i < 12; i++) {
            out[i] = get$1(format2, i, field, "month");
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format2, index2, field) {
          if (typeof localeSorted === "boolean") {
            if (isNumber2(format2)) {
              index2 = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          } else {
            format2 = localeSorted;
            index2 = format2;
            localeSorted = false;
            if (isNumber2(format2)) {
              index2 = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          }
          var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
          if (index2 != null) {
            return get$1(format2, (index2 + shift) % 7, field, "day");
          }
          for (i = 0; i < 7; i++) {
            out[i] = get$1(format2, (i + shift) % 7, field, "day");
          }
          return out;
        }
        function listMonths(format2, index2) {
          return listMonthsImpl(format2, index2, "months");
        }
        function listMonthsShort(format2, index2) {
          return listMonthsImpl(format2, index2, "monthsShort");
        }
        function listWeekdays(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
        }
        function listWeekdaysShort(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
        }
        function listWeekdaysMin(localeSorted, format2, index2) {
          return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
        }
        getSetGlobalLocale("en", {
          eras: [
            {
              since: "0001-01-01",
              until: Infinity,
              offset: 1,
              name: "Anno Domini",
              narrow: "AD",
              abbr: "AD"
            },
            {
              since: "0000-12-31",
              until: -Infinity,
              offset: 1,
              name: "Before Christ",
              narrow: "BC",
              abbr: "BC"
            }
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
          }
        });
        hooks.lang = deprecate(
          "moment.lang is deprecated. Use moment.locale instead.",
          getSetGlobalLocale
        );
        hooks.langData = deprecate(
          "moment.langData is deprecated. Use moment.localeData instead.",
          getLocale
        );
        var mathAbs = Math.abs;
        function abs() {
          var data2 = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data2.milliseconds = mathAbs(data2.milliseconds);
          data2.seconds = mathAbs(data2.seconds);
          data2.minutes = mathAbs(data2.minutes);
          data2.hours = mathAbs(data2.hours);
          data2.months = mathAbs(data2.months);
          data2.years = mathAbs(data2.years);
          return this;
        }
        function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
        }
        function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data2 = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
          if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
            milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
            days2 = 0;
            months2 = 0;
          }
          data2.milliseconds = milliseconds2 % 1e3;
          seconds2 = absFloor(milliseconds2 / 1e3);
          data2.seconds = seconds2 % 60;
          minutes2 = absFloor(seconds2 / 60);
          data2.minutes = minutes2 % 60;
          hours2 = absFloor(minutes2 / 60);
          data2.hours = hours2 % 24;
          days2 += absFloor(hours2 / 24);
          monthsFromDays = absFloor(daysToMonths(days2));
          months2 += monthsFromDays;
          days2 -= absCeil(monthsToDays(monthsFromDays));
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          data2.days = days2;
          data2.months = months2;
          data2.years = years2;
          return this;
        }
        function daysToMonths(days2) {
          return days2 * 4800 / 146097;
        }
        function monthsToDays(months2) {
          return months2 * 146097 / 4800;
        }
        function as(units) {
          if (!this.isValid()) {
            return NaN;
          }
          var days2, months2, milliseconds2 = this._milliseconds;
          units = normalizeUnits(units);
          if (units === "month" || units === "quarter" || units === "year") {
            days2 = this._days + milliseconds2 / 864e5;
            months2 = this._months + daysToMonths(days2);
            switch (units) {
              case "month":
                return months2;
              case "quarter":
                return months2 / 3;
              case "year":
                return months2 / 12;
            }
          } else {
            days2 = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case "week":
                return days2 / 7 + milliseconds2 / 6048e5;
              case "day":
                return days2 + milliseconds2 / 864e5;
              case "hour":
                return days2 * 24 + milliseconds2 / 36e5;
              case "minute":
                return days2 * 1440 + milliseconds2 / 6e4;
              case "second":
                return days2 * 86400 + milliseconds2 / 1e3;
              case "millisecond":
                return Math.floor(days2 * 864e5) + milliseconds2;
              default:
                throw new Error("Unknown unit " + units);
            }
          }
        }
        function makeAs(alias) {
          return function() {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
        function clone$1() {
          return createDuration(this);
        }
        function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + "s"]() : NaN;
        }
        function makeGetter(name) {
          return function() {
            return this.isValid() ? this._data[name] : NaN;
          };
        }
        var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round, thresholds = {
          ss: 44,
          // a few seconds to seconds
          s: 45,
          // seconds to minute
          m: 45,
          // minutes to hour
          h: 22,
          // hours to day
          d: 26,
          // days to month/week
          w: null,
          // weeks to month
          M: 11
          // months to year
        };
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
          return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
          var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
          if (thresholds2.w != null) {
            a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
          }
          a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale2;
          return substituteTimeAgo.apply(null, a);
        }
        function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === void 0) {
            return round;
          }
          if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
          }
          return false;
        }
        function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === void 0) {
            return false;
          }
          if (limit === void 0) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === "s") {
            thresholds.ss = limit - 1;
          }
          return true;
        }
        function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var withSuffix = false, th = thresholds, locale2, output;
          if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
          }
          if (typeof argWithSuffix === "boolean") {
            withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
            }
          }
          locale2 = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale2);
          if (withSuffix) {
            output = locale2.pastFuture(+this, output);
          }
          return locale2.postformat(output);
        }
        var abs$1 = Math.abs;
        function sign(x) {
          return (x > 0) - (x < 0) || +x;
        }
        function toISOString$1() {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
          if (!total) {
            return "P0D";
          }
          minutes2 = absFloor(seconds2 / 60);
          hours2 = absFloor(minutes2 / 60);
          seconds2 %= 60;
          minutes2 %= 60;
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
          totalSign = total < 0 ? "-" : "";
          ymSign = sign(this._months) !== sign(total) ? "-" : "";
          daysSign = sign(this._days) !== sign(total) ? "-" : "";
          hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
          return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
        }
        var proto$2 = Duration.prototype;
        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;
        proto$2.toIsoString = deprecate(
          "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
          toISOString$1
        );
        proto$2.lang = lang;
        addFormatToken("X", 0, 0, "unix");
        addFormatToken("x", 0, 0, "valueOf");
        addRegexToken("x", matchSigned);
        addRegexToken("X", matchTimestamp);
        addParseToken("X", function(input, array, config) {
          config._d = new Date(parseFloat(input) * 1e3);
        });
        addParseToken("x", function(input, array, config) {
          config._d = new Date(toInt(input));
        });
        hooks.version = "2.30.1";
        setHookCallback(createLocal);
        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;
        hooks.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          // <input type="datetime-local" />
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          // <input type="datetime-local" step="1" />
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          // <input type="datetime-local" step="0.001" />
          DATE: "YYYY-MM-DD",
          // <input type="date" />
          TIME: "HH:mm",
          // <input type="time" />
          TIME_SECONDS: "HH:mm:ss",
          // <input type="time" step="1" />
          TIME_MS: "HH:mm:ss.SSS",
          // <input type="time" step="0.001" />
          WEEK: "GGGG-[W]WW",
          // <input type="week" />
          MONTH: "YYYY-MM"
          // <input type="month" />
        };
        return hooks;
      });
    }
  });

  // node_modules/moment/locale/zh-tw.js
  var require_zh_tw = __commonJS({
    "node_modules/moment/locale/zh-tw.js"(exports, module) {
      init_buffer();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" && typeof __require === "function" ? factory(require_moment()) : typeof define === "function" && define.amd ? define(["../moment"], factory) : factory(global.moment);
      })(exports, function(moment2) {
        "use strict";
        var zhTw = moment2.defineLocale("zh-tw", {
          months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split(
            "_"
          ),
          monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split(
            "_"
          ),
          weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
          weekdaysShort: "\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D".split("_"),
          weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
          longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY\u5E74M\u6708D\u65E5",
            LLL: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
            LLLL: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm",
            l: "YYYY/M/D",
            ll: "YYYY\u5E74M\u6708D\u65E5",
            lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
            llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
          },
          meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
          meridiemHour: function(hour, meridiem) {
            if (hour === 12) {
              hour = 0;
            }
            if (meridiem === "\u51CC\u6668" || meridiem === "\u65E9\u4E0A" || meridiem === "\u4E0A\u5348") {
              return hour;
            } else if (meridiem === "\u4E2D\u5348") {
              return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === "\u4E0B\u5348" || meridiem === "\u665A\u4E0A") {
              return hour + 12;
            }
          },
          meridiem: function(hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
              return "\u51CC\u6668";
            } else if (hm < 900) {
              return "\u65E9\u4E0A";
            } else if (hm < 1130) {
              return "\u4E0A\u5348";
            } else if (hm < 1230) {
              return "\u4E2D\u5348";
            } else if (hm < 1800) {
              return "\u4E0B\u5348";
            } else {
              return "\u665A\u4E0A";
            }
          },
          calendar: {
            sameDay: "[\u4ECA\u5929] LT",
            nextDay: "[\u660E\u5929] LT",
            nextWeek: "[\u4E0B]dddd LT",
            lastDay: "[\u6628\u5929] LT",
            lastWeek: "[\u4E0A]dddd LT",
            sameElse: "L"
          },
          dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
          ordinal: function(number, period) {
            switch (period) {
              case "d":
              case "D":
              case "DDD":
                return number + "\u65E5";
              case "M":
                return number + "\u6708";
              case "w":
              case "W":
                return number + "\u9031";
              default:
                return number;
            }
          },
          relativeTime: {
            future: "%s\u5F8C",
            past: "%s\u524D",
            s: "\u5E7E\u79D2",
            ss: "%d \u79D2",
            m: "1 \u5206\u9418",
            mm: "%d \u5206\u9418",
            h: "1 \u5C0F\u6642",
            hh: "%d \u5C0F\u6642",
            d: "1 \u5929",
            dd: "%d \u5929",
            M: "1 \u500B\u6708",
            MM: "%d \u500B\u6708",
            y: "1 \u5E74",
            yy: "%d \u5E74"
          }
        });
        return zhTw;
      });
    }
  });

  // src/WebtoonZH/main.ts
  var main_exports = {};
  __export(main_exports, {
    WebtoonZH: () => WebtoonZH
  });
  init_buffer();

  // src/Webtoons.ts
  init_buffer();
  var import_types5 = __toESM(require_lib());

  // src/WebtoonsInfra.ts
  init_buffer();
  var import_types4 = __toESM(require_lib());

  // node_modules/cheerio/dist/browser/index.js
  var browser_exports = {};
  __export(browser_exports, {
    contains: () => contains,
    load: () => load,
    merge: () => merge
  });
  init_buffer();

  // node_modules/cheerio/dist/browser/static.js
  var static_exports = {};
  __export(static_exports, {
    contains: () => contains,
    extract: () => extract,
    html: () => html,
    merge: () => merge,
    parseHTML: () => parseHTML,
    root: () => root,
    text: () => text,
    xml: () => xml
  });
  init_buffer();

  // node_modules/domutils/lib/esm/index.js
  var esm_exports2 = {};
  __export(esm_exports2, {
    DocumentPosition: () => DocumentPosition,
    append: () => append,
    appendChild: () => appendChild,
    compareDocumentPosition: () => compareDocumentPosition,
    existsOne: () => existsOne,
    filter: () => filter,
    find: () => find,
    findAll: () => findAll,
    findOne: () => findOne,
    findOneChild: () => findOneChild,
    getAttributeValue: () => getAttributeValue,
    getChildren: () => getChildren,
    getElementById: () => getElementById,
    getElements: () => getElements,
    getElementsByTagName: () => getElementsByTagName,
    getElementsByTagType: () => getElementsByTagType,
    getFeed: () => getFeed,
    getInnerHTML: () => getInnerHTML,
    getName: () => getName,
    getOuterHTML: () => getOuterHTML,
    getParent: () => getParent,
    getSiblings: () => getSiblings,
    getText: () => getText,
    hasAttrib: () => hasAttrib,
    hasChildren: () => hasChildren,
    innerText: () => innerText,
    isCDATA: () => isCDATA,
    isComment: () => isComment,
    isDocument: () => isDocument,
    isTag: () => isTag2,
    isText: () => isText,
    nextElementSibling: () => nextElementSibling,
    prepend: () => prepend,
    prependChild: () => prependChild,
    prevElementSibling: () => prevElementSibling,
    removeElement: () => removeElement,
    removeSubsets: () => removeSubsets,
    replaceElement: () => replaceElement,
    testElement: () => testElement,
    textContent: () => textContent,
    uniqueSort: () => uniqueSort
  });
  init_buffer();

  // node_modules/domutils/lib/esm/stringify.js
  init_buffer();

  // node_modules/domhandler/lib/esm/index.js
  init_buffer();

  // node_modules/domelementtype/lib/esm/index.js
  init_buffer();
  var ElementType;
  (function(ElementType2) {
    ElementType2["Root"] = "root";
    ElementType2["Text"] = "text";
    ElementType2["Directive"] = "directive";
    ElementType2["Comment"] = "comment";
    ElementType2["Script"] = "script";
    ElementType2["Style"] = "style";
    ElementType2["Tag"] = "tag";
    ElementType2["CDATA"] = "cdata";
    ElementType2["Doctype"] = "doctype";
  })(ElementType || (ElementType = {}));
  function isTag(elem) {
    return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
  }
  var Root = ElementType.Root;
  var Text = ElementType.Text;
  var Directive = ElementType.Directive;
  var Comment = ElementType.Comment;
  var Script = ElementType.Script;
  var Style = ElementType.Style;
  var Tag = ElementType.Tag;
  var CDATA = ElementType.CDATA;
  var Doctype = ElementType.Doctype;

  // node_modules/domhandler/lib/esm/node.js
  init_buffer();
  var Node = class {
    constructor() {
      this.parent = null;
      this.prev = null;
      this.next = null;
      this.startIndex = null;
      this.endIndex = null;
    }
    // Read-write aliases for properties
    /**
     * Same as {@link parent}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get parentNode() {
      return this.parent;
    }
    set parentNode(parent2) {
      this.parent = parent2;
    }
    /**
     * Same as {@link prev}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get previousSibling() {
      return this.prev;
    }
    set previousSibling(prev2) {
      this.prev = prev2;
    }
    /**
     * Same as {@link next}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nextSibling() {
      return this.next;
    }
    set nextSibling(next2) {
      this.next = next2;
    }
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    cloneNode(recursive = false) {
      return cloneNode(this, recursive);
    }
  };
  var DataNode = class extends Node {
    /**
     * @param data The content of the data node
     */
    constructor(data2) {
      super();
      this.data = data2;
    }
    /**
     * Same as {@link data}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get nodeValue() {
      return this.data;
    }
    set nodeValue(data2) {
      this.data = data2;
    }
  };
  var Text2 = class extends DataNode {
    constructor() {
      super(...arguments);
      this.type = ElementType.Text;
    }
    get nodeType() {
      return 3;
    }
  };
  var Comment2 = class extends DataNode {
    constructor() {
      super(...arguments);
      this.type = ElementType.Comment;
    }
    get nodeType() {
      return 8;
    }
  };
  var ProcessingInstruction = class extends DataNode {
    constructor(name, data2) {
      super(data2);
      this.name = name;
      this.type = ElementType.Directive;
    }
    get nodeType() {
      return 1;
    }
  };
  var NodeWithChildren = class extends Node {
    /**
     * @param children Children of the node. Only certain node types can have children.
     */
    constructor(children2) {
      super();
      this.children = children2;
    }
    // Aliases
    /** First child of the node. */
    get firstChild() {
      var _a2;
      return (_a2 = this.children[0]) !== null && _a2 !== void 0 ? _a2 : null;
    }
    /** Last child of the node. */
    get lastChild() {
      return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }
    /**
     * Same as {@link children}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get childNodes() {
      return this.children;
    }
    set childNodes(children2) {
      this.children = children2;
    }
  };
  var CDATA2 = class extends NodeWithChildren {
    constructor() {
      super(...arguments);
      this.type = ElementType.CDATA;
    }
    get nodeType() {
      return 4;
    }
  };
  var Document = class extends NodeWithChildren {
    constructor() {
      super(...arguments);
      this.type = ElementType.Root;
    }
    get nodeType() {
      return 9;
    }
  };
  var Element = class extends NodeWithChildren {
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    constructor(name, attribs, children2 = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
      super(children2);
      this.name = name;
      this.attribs = attribs;
      this.type = type;
    }
    get nodeType() {
      return 1;
    }
    // DOM Level 1 aliases
    /**
     * Same as {@link name}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */
    get tagName() {
      return this.name;
    }
    set tagName(name) {
      this.name = name;
    }
    get attributes() {
      return Object.keys(this.attribs).map((name) => {
        var _a2, _b;
        return {
          name,
          value: this.attribs[name],
          namespace: (_a2 = this["x-attribsNamespace"]) === null || _a2 === void 0 ? void 0 : _a2[name],
          prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
        };
      });
    }
  };
  function isTag2(node) {
    return isTag(node);
  }
  function isCDATA(node) {
    return node.type === ElementType.CDATA;
  }
  function isText(node) {
    return node.type === ElementType.Text;
  }
  function isComment(node) {
    return node.type === ElementType.Comment;
  }
  function isDirective(node) {
    return node.type === ElementType.Directive;
  }
  function isDocument(node) {
    return node.type === ElementType.Root;
  }
  function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
  }
  function cloneNode(node, recursive = false) {
    let result;
    if (isText(node)) {
      result = new Text2(node.data);
    } else if (isComment(node)) {
      result = new Comment2(node.data);
    } else if (isTag2(node)) {
      const children2 = recursive ? cloneChildren(node.children) : [];
      const clone2 = new Element(node.name, { ...node.attribs }, children2);
      children2.forEach((child) => child.parent = clone2);
      if (node.namespace != null) {
        clone2.namespace = node.namespace;
      }
      if (node["x-attribsNamespace"]) {
        clone2["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
      }
      if (node["x-attribsPrefix"]) {
        clone2["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
      }
      result = clone2;
    } else if (isCDATA(node)) {
      const children2 = recursive ? cloneChildren(node.children) : [];
      const clone2 = new CDATA2(children2);
      children2.forEach((child) => child.parent = clone2);
      result = clone2;
    } else if (isDocument(node)) {
      const children2 = recursive ? cloneChildren(node.children) : [];
      const clone2 = new Document(children2);
      children2.forEach((child) => child.parent = clone2);
      if (node["x-mode"]) {
        clone2["x-mode"] = node["x-mode"];
      }
      result = clone2;
    } else if (isDirective(node)) {
      const instruction = new ProcessingInstruction(node.name, node.data);
      if (node["x-name"] != null) {
        instruction["x-name"] = node["x-name"];
        instruction["x-publicId"] = node["x-publicId"];
        instruction["x-systemId"] = node["x-systemId"];
      }
      result = instruction;
    } else {
      throw new Error(`Not implemented yet: ${node.type}`);
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
      result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
  }
  function cloneChildren(childs) {
    const children2 = childs.map((child) => cloneNode(child, true));
    for (let i = 1; i < children2.length; i++) {
      children2[i].prev = children2[i - 1];
      children2[i - 1].next = children2[i];
    }
    return children2;
  }

  // node_modules/domhandler/lib/esm/index.js
  var defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false
  };
  var DomHandler = class {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    constructor(callback, options, elementCB) {
      this.dom = [];
      this.root = new Document(this.dom);
      this.done = false;
      this.tagStack = [this.root];
      this.lastNode = null;
      this.parser = null;
      if (typeof options === "function") {
        elementCB = options;
        options = defaultOpts;
      }
      if (typeof callback === "object") {
        options = callback;
        callback = void 0;
      }
      this.callback = callback !== null && callback !== void 0 ? callback : null;
      this.options = options !== null && options !== void 0 ? options : defaultOpts;
      this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    onparserinit(parser) {
      this.parser = parser;
    }
    // Resets the handler back to starting state
    onreset() {
      this.dom = [];
      this.root = new Document(this.dom);
      this.done = false;
      this.tagStack = [this.root];
      this.lastNode = null;
      this.parser = null;
    }
    // Signals the handler that parsing is done
    onend() {
      if (this.done)
        return;
      this.done = true;
      this.parser = null;
      this.handleCallback(null);
    }
    onerror(error) {
      this.handleCallback(error);
    }
    onclosetag() {
      this.lastNode = null;
      const elem = this.tagStack.pop();
      if (this.options.withEndIndices) {
        elem.endIndex = this.parser.endIndex;
      }
      if (this.elementCB)
        this.elementCB(elem);
    }
    onopentag(name, attribs) {
      const type = this.options.xmlMode ? ElementType.Tag : void 0;
      const element = new Element(name, attribs, void 0, type);
      this.addNode(element);
      this.tagStack.push(element);
    }
    ontext(data2) {
      const { lastNode } = this;
      if (lastNode && lastNode.type === ElementType.Text) {
        lastNode.data += data2;
        if (this.options.withEndIndices) {
          lastNode.endIndex = this.parser.endIndex;
        }
      } else {
        const node = new Text2(data2);
        this.addNode(node);
        this.lastNode = node;
      }
    }
    oncomment(data2) {
      if (this.lastNode && this.lastNode.type === ElementType.Comment) {
        this.lastNode.data += data2;
        return;
      }
      const node = new Comment2(data2);
      this.addNode(node);
      this.lastNode = node;
    }
    oncommentend() {
      this.lastNode = null;
    }
    oncdatastart() {
      const text3 = new Text2("");
      const node = new CDATA2([text3]);
      this.addNode(node);
      text3.parent = node;
      this.lastNode = text3;
    }
    oncdataend() {
      this.lastNode = null;
    }
    onprocessinginstruction(name, data2) {
      const node = new ProcessingInstruction(name, data2);
      this.addNode(node);
    }
    handleCallback(error) {
      if (typeof this.callback === "function") {
        this.callback(error, this.dom);
      } else if (error) {
        throw error;
      }
    }
    addNode(node) {
      const parent2 = this.tagStack[this.tagStack.length - 1];
      const previousSibling = parent2.children[parent2.children.length - 1];
      if (this.options.withStartIndices) {
        node.startIndex = this.parser.startIndex;
      }
      if (this.options.withEndIndices) {
        node.endIndex = this.parser.endIndex;
      }
      parent2.children.push(node);
      if (previousSibling) {
        node.prev = previousSibling;
        previousSibling.next = node;
      }
      node.parent = parent2;
      this.lastNode = null;
    }
  };

  // node_modules/dom-serializer/lib/esm/index.js
  init_buffer();

  // node_modules/entities/lib/esm/index.js
  init_buffer();

  // node_modules/entities/lib/esm/decode.js
  init_buffer();

  // node_modules/entities/lib/esm/generated/decode-data-html.js
  init_buffer();
  var decode_data_html_default = new Uint16Array(
    // prettier-ignore
    '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c) => c.charCodeAt(0))
  );

  // node_modules/entities/lib/esm/generated/decode-data-xml.js
  init_buffer();
  var decode_data_xml_default = new Uint16Array(
    // prettier-ignore
    "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c) => c.charCodeAt(0))
  );

  // node_modules/entities/lib/esm/decode_codepoint.js
  init_buffer();
  var _a;
  var decodeMap = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  var fromCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
      let output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    }
  );
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
  }

  // node_modules/entities/lib/esm/decode.js
  var CharCodes;
  (function(CharCodes3) {
    CharCodes3[CharCodes3["NUM"] = 35] = "NUM";
    CharCodes3[CharCodes3["SEMI"] = 59] = "SEMI";
    CharCodes3[CharCodes3["EQUALS"] = 61] = "EQUALS";
    CharCodes3[CharCodes3["ZERO"] = 48] = "ZERO";
    CharCodes3[CharCodes3["NINE"] = 57] = "NINE";
    CharCodes3[CharCodes3["LOWER_A"] = 97] = "LOWER_A";
    CharCodes3[CharCodes3["LOWER_F"] = 102] = "LOWER_F";
    CharCodes3[CharCodes3["LOWER_X"] = 120] = "LOWER_X";
    CharCodes3[CharCodes3["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes3[CharCodes3["UPPER_A"] = 65] = "UPPER_A";
    CharCodes3[CharCodes3["UPPER_F"] = 70] = "UPPER_F";
    CharCodes3[CharCodes3["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  var TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags || (BinTrieFlags = {}));
  function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
  }
  function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  var EntityDecoder = class {
    constructor(decodeTree, emitCodePoint, errors) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end2, base) {
      if (start !== end2) {
        const digitCount = end2 - start;
        this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
        this.consumed += digitCount;
      }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
      var _a2;
      if (this.consumed <= expectedLength) {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
      const { decodeTree } = this;
      let current = decodeTree[this.treeIndex];
      let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (; offset < str.length; offset++, this.excess++) {
        const char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || // If we are parsing an attribute
          this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
          (valueLength === 0 || // And there should be no invalid characters.
          isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
      var _a2;
      const { result, decodeTree } = this;
      const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
      return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
      const { decodeTree } = this;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
      var _a2;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    }
  };
  function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
    return function decodeWithTrie(str, decodeMode) {
      let lastIndex = 0;
      let offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        const len = decoder.write(
          str,
          // Skip the "&"
          offset + 1
        );
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      const result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      const value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
      const mid = lo + hi >>> 1;
      const midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  var htmlDecoder = getDecoder(decode_data_html_default);
  var xmlDecoder = getDecoder(decode_data_xml_default);

  // node_modules/entities/lib/esm/encode.js
  init_buffer();

  // node_modules/entities/lib/esm/generated/encode-html.js
  init_buffer();
  function restoreDiff(arr) {
    for (let i = 1; i < arr.length; i++) {
      arr[i][0] += arr[i - 1][0] + 1;
    }
    return arr;
  }
  var encode_html_default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

  // node_modules/entities/lib/esm/escape.js
  init_buffer();
  var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var xmlCodeMap = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  var getCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (str, index2) => str.codePointAt(index2) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      (c, index2) => (c.charCodeAt(index2) & 64512) === 55296 ? (c.charCodeAt(index2) - 55296) * 1024 + c.charCodeAt(index2 + 1) - 56320 + 65536 : c.charCodeAt(index2)
    )
  );
  function encodeXML(str) {
    let ret = "";
    let lastIdx = 0;
    let match;
    while ((match = xmlReplacer.exec(str)) !== null) {
      const i = match.index;
      const char = str.charCodeAt(i);
      const next2 = xmlCodeMap.get(char);
      if (next2 !== void 0) {
        ret += str.substring(lastIdx, i) + next2;
        lastIdx = i + 1;
      } else {
        ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
        lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
      }
    }
    return ret + str.substr(lastIdx);
  }
  function getEscaper(regex, map2) {
    return function escape2(data2) {
      let match;
      let lastIdx = 0;
      let result = "";
      while (match = regex.exec(data2)) {
        if (lastIdx !== match.index) {
          result += data2.substring(lastIdx, match.index);
        }
        result += map2.get(match[0].charCodeAt(0));
        lastIdx = match.index + 1;
      }
      return result + data2.substring(lastIdx);
    };
  }
  var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
  var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ]));
  var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));

  // node_modules/entities/lib/esm/index.js
  var EntityLevel;
  (function(EntityLevel2) {
    EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
    EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
  })(EntityLevel || (EntityLevel = {}));
  var EncodingMode;
  (function(EncodingMode2) {
    EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
    EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
    EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
    EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
    EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
  })(EncodingMode || (EncodingMode = {}));

  // node_modules/dom-serializer/lib/esm/foreignNames.js
  init_buffer();
  var elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map((val2) => [val2.toLowerCase(), val2]));
  var attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((val2) => [val2.toLowerCase(), val2]));

  // node_modules/dom-serializer/lib/esm/index.js
  var unencodedElements = /* @__PURE__ */ new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);
  function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
  }
  function formatAttributes(attributes2, opts) {
    var _a2;
    if (!attributes2)
      return;
    const encode = ((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
    return Object.keys(attributes2).map((key) => {
      var _a3, _b;
      const value = (_a3 = attributes2[key]) !== null && _a3 !== void 0 ? _a3 : "";
      if (opts.xmlMode === "foreign") {
        key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
      }
      if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
        return key;
      }
      return `${key}="${encode(value)}"`;
    }).join(" ");
  }
  var singleTag = /* @__PURE__ */ new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  function render(node, options = {}) {
    const nodes = "length" in node ? node : [node];
    let output = "";
    for (let i = 0; i < nodes.length; i++) {
      output += renderNode(nodes[i], options);
    }
    return output;
  }
  var esm_default = render;
  function renderNode(node, options) {
    switch (node.type) {
      case Root:
        return render(node.children, options);
      case Doctype:
      case Directive:
        return renderDirective(node);
      case Comment:
        return renderComment(node);
      case CDATA:
        return renderCdata(node);
      case Script:
      case Style:
      case Tag:
        return renderTag(node, options);
      case Text:
        return renderText(node, options);
    }
  }
  var foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]);
  var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
  function renderTag(elem, opts) {
    var _a2;
    if (opts.xmlMode === "foreign") {
      elem.name = (_a2 = elementNames.get(elem.name)) !== null && _a2 !== void 0 ? _a2 : elem.name;
      if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
        opts = { ...opts, xmlMode: false };
      }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
      opts = { ...opts, xmlMode: "foreign" };
    }
    let tag = `<${elem.name}`;
    const attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
      tag += ` ${attribs}`;
    }
    if (elem.children.length === 0 && (opts.xmlMode ? (
      // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
      opts.selfClosingTags !== false
    ) : (
      // User explicitly asked for self-closing tags, even in HTML mode
      opts.selfClosingTags && singleTag.has(elem.name)
    ))) {
      if (!opts.xmlMode)
        tag += " ";
      tag += "/>";
    } else {
      tag += ">";
      if (elem.children.length > 0) {
        tag += render(elem.children, opts);
      }
      if (opts.xmlMode || !singleTag.has(elem.name)) {
        tag += `</${elem.name}>`;
      }
    }
    return tag;
  }
  function renderDirective(elem) {
    return `<${elem.data}>`;
  }
  function renderText(elem, opts) {
    var _a2;
    let data2 = elem.data || "";
    if (((_a2 = opts.encodeEntities) !== null && _a2 !== void 0 ? _a2 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
      data2 = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data2) : escapeText(data2);
    }
    return data2;
  }
  function renderCdata(elem) {
    return `<![CDATA[${elem.children[0].data}]]>`;
  }
  function renderComment(elem) {
    return `<!--${elem.data}-->`;
  }

  // node_modules/domutils/lib/esm/stringify.js
  function getOuterHTML(node, options) {
    return esm_default(node, options);
  }
  function getInnerHTML(node, options) {
    return hasChildren(node) ? node.children.map((node2) => getOuterHTML(node2, options)).join("") : "";
  }
  function getText(node) {
    if (Array.isArray(node))
      return node.map(getText).join("");
    if (isTag2(node))
      return node.name === "br" ? "\n" : getText(node.children);
    if (isCDATA(node))
      return getText(node.children);
    if (isText(node))
      return node.data;
    return "";
  }
  function textContent(node) {
    if (Array.isArray(node))
      return node.map(textContent).join("");
    if (hasChildren(node) && !isComment(node)) {
      return textContent(node.children);
    }
    if (isText(node))
      return node.data;
    return "";
  }
  function innerText(node) {
    if (Array.isArray(node))
      return node.map(innerText).join("");
    if (hasChildren(node) && (node.type === ElementType.Tag || isCDATA(node))) {
      return innerText(node.children);
    }
    if (isText(node))
      return node.data;
    return "";
  }

  // node_modules/domutils/lib/esm/traversal.js
  init_buffer();
  function getChildren(elem) {
    return hasChildren(elem) ? elem.children : [];
  }
  function getParent(elem) {
    return elem.parent || null;
  }
  function getSiblings(elem) {
    const parent2 = getParent(elem);
    if (parent2 != null)
      return getChildren(parent2);
    const siblings2 = [elem];
    let { prev: prev2, next: next2 } = elem;
    while (prev2 != null) {
      siblings2.unshift(prev2);
      ({ prev: prev2 } = prev2);
    }
    while (next2 != null) {
      siblings2.push(next2);
      ({ next: next2 } = next2);
    }
    return siblings2;
  }
  function getAttributeValue(elem, name) {
    var _a2;
    return (_a2 = elem.attribs) === null || _a2 === void 0 ? void 0 : _a2[name];
  }
  function hasAttrib(elem, name) {
    return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
  }
  function getName(elem) {
    return elem.name;
  }
  function nextElementSibling(elem) {
    let { next: next2 } = elem;
    while (next2 !== null && !isTag2(next2))
      ({ next: next2 } = next2);
    return next2;
  }
  function prevElementSibling(elem) {
    let { prev: prev2 } = elem;
    while (prev2 !== null && !isTag2(prev2))
      ({ prev: prev2 } = prev2);
    return prev2;
  }

  // node_modules/domutils/lib/esm/manipulation.js
  init_buffer();
  function removeElement(elem) {
    if (elem.prev)
      elem.prev.next = elem.next;
    if (elem.next)
      elem.next.prev = elem.prev;
    if (elem.parent) {
      const childs = elem.parent.children;
      const childsIndex = childs.lastIndexOf(elem);
      if (childsIndex >= 0) {
        childs.splice(childsIndex, 1);
      }
    }
    elem.next = null;
    elem.prev = null;
    elem.parent = null;
  }
  function replaceElement(elem, replacement) {
    const prev2 = replacement.prev = elem.prev;
    if (prev2) {
      prev2.next = replacement;
    }
    const next2 = replacement.next = elem.next;
    if (next2) {
      next2.prev = replacement;
    }
    const parent2 = replacement.parent = elem.parent;
    if (parent2) {
      const childs = parent2.children;
      childs[childs.lastIndexOf(elem)] = replacement;
      elem.parent = null;
    }
  }
  function appendChild(parent2, child) {
    removeElement(child);
    child.next = null;
    child.parent = parent2;
    if (parent2.children.push(child) > 1) {
      const sibling = parent2.children[parent2.children.length - 2];
      sibling.next = child;
      child.prev = sibling;
    } else {
      child.prev = null;
    }
  }
  function append(elem, next2) {
    removeElement(next2);
    const { parent: parent2 } = elem;
    const currNext = elem.next;
    next2.next = currNext;
    next2.prev = elem;
    elem.next = next2;
    next2.parent = parent2;
    if (currNext) {
      currNext.prev = next2;
      if (parent2) {
        const childs = parent2.children;
        childs.splice(childs.lastIndexOf(currNext), 0, next2);
      }
    } else if (parent2) {
      parent2.children.push(next2);
    }
  }
  function prependChild(parent2, child) {
    removeElement(child);
    child.parent = parent2;
    child.prev = null;
    if (parent2.children.unshift(child) !== 1) {
      const sibling = parent2.children[1];
      sibling.prev = child;
      child.next = sibling;
    } else {
      child.next = null;
    }
  }
  function prepend(elem, prev2) {
    removeElement(prev2);
    const { parent: parent2 } = elem;
    if (parent2) {
      const childs = parent2.children;
      childs.splice(childs.indexOf(elem), 0, prev2);
    }
    if (elem.prev) {
      elem.prev.next = prev2;
    }
    prev2.parent = parent2;
    prev2.prev = elem.prev;
    prev2.next = elem;
    elem.prev = prev2;
  }

  // node_modules/domutils/lib/esm/querying.js
  init_buffer();
  function filter(test, node, recurse = true, limit = Infinity) {
    return find(test, Array.isArray(node) ? node : [node], recurse, limit);
  }
  function find(test, nodes, recurse, limit) {
    const result = [];
    const nodeStack = [nodes];
    const indexStack = [0];
    for (; ; ) {
      if (indexStack[0] >= nodeStack[0].length) {
        if (indexStack.length === 1) {
          return result;
        }
        nodeStack.shift();
        indexStack.shift();
        continue;
      }
      const elem = nodeStack[0][indexStack[0]++];
      if (test(elem)) {
        result.push(elem);
        if (--limit <= 0)
          return result;
      }
      if (recurse && hasChildren(elem) && elem.children.length > 0) {
        indexStack.unshift(0);
        nodeStack.unshift(elem.children);
      }
    }
  }
  function findOneChild(test, nodes) {
    return nodes.find(test);
  }
  function findOne(test, nodes, recurse = true) {
    let elem = null;
    for (let i = 0; i < nodes.length && !elem; i++) {
      const node = nodes[i];
      if (!isTag2(node)) {
        continue;
      } else if (test(node)) {
        elem = node;
      } else if (recurse && node.children.length > 0) {
        elem = findOne(test, node.children, true);
      }
    }
    return elem;
  }
  function existsOne(test, nodes) {
    return nodes.some((checked) => isTag2(checked) && (test(checked) || existsOne(test, checked.children)));
  }
  function findAll(test, nodes) {
    const result = [];
    const nodeStack = [nodes];
    const indexStack = [0];
    for (; ; ) {
      if (indexStack[0] >= nodeStack[0].length) {
        if (nodeStack.length === 1) {
          return result;
        }
        nodeStack.shift();
        indexStack.shift();
        continue;
      }
      const elem = nodeStack[0][indexStack[0]++];
      if (!isTag2(elem))
        continue;
      if (test(elem))
        result.push(elem);
      if (elem.children.length > 0) {
        indexStack.unshift(0);
        nodeStack.unshift(elem.children);
      }
    }
  }

  // node_modules/domutils/lib/esm/legacy.js
  init_buffer();
  var Checks = {
    tag_name(name) {
      if (typeof name === "function") {
        return (elem) => isTag2(elem) && name(elem.name);
      } else if (name === "*") {
        return isTag2;
      }
      return (elem) => isTag2(elem) && elem.name === name;
    },
    tag_type(type) {
      if (typeof type === "function") {
        return (elem) => type(elem.type);
      }
      return (elem) => elem.type === type;
    },
    tag_contains(data2) {
      if (typeof data2 === "function") {
        return (elem) => isText(elem) && data2(elem.data);
      }
      return (elem) => isText(elem) && elem.data === data2;
    }
  };
  function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
      return (elem) => isTag2(elem) && value(elem.attribs[attrib]);
    }
    return (elem) => isTag2(elem) && elem.attribs[attrib] === value;
  }
  function combineFuncs(a, b) {
    return (elem) => a(elem) || b(elem);
  }
  function compileTest(options) {
    const funcs = Object.keys(options).map((key) => {
      const value = options[key];
      return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
  }
  function testElement(options, node) {
    const test = compileTest(options);
    return test ? test(node) : true;
  }
  function getElements(options, nodes, recurse, limit = Infinity) {
    const test = compileTest(options);
    return test ? filter(test, nodes, recurse, limit) : [];
  }
  function getElementById(id, nodes, recurse = true) {
    if (!Array.isArray(nodes))
      nodes = [nodes];
    return findOne(getAttribCheck("id", id), nodes, recurse);
  }
  function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
    return filter(Checks["tag_name"](tagName), nodes, recurse, limit);
  }
  function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
    return filter(Checks["tag_type"](type), nodes, recurse, limit);
  }

  // node_modules/domutils/lib/esm/helpers.js
  init_buffer();
  function removeSubsets(nodes) {
    let idx = nodes.length;
    while (--idx >= 0) {
      const node = nodes[idx];
      if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
        nodes.splice(idx, 1);
        continue;
      }
      for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
        if (nodes.includes(ancestor)) {
          nodes.splice(idx, 1);
          break;
        }
      }
    }
    return nodes;
  }
  var DocumentPosition;
  (function(DocumentPosition2) {
    DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
    DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
    DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
    DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
    DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
  })(DocumentPosition || (DocumentPosition = {}));
  function compareDocumentPosition(nodeA, nodeB) {
    const aParents = [];
    const bParents = [];
    if (nodeA === nodeB) {
      return 0;
    }
    let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
    while (current) {
      aParents.unshift(current);
      current = current.parent;
    }
    current = hasChildren(nodeB) ? nodeB : nodeB.parent;
    while (current) {
      bParents.unshift(current);
      current = current.parent;
    }
    const maxIdx = Math.min(aParents.length, bParents.length);
    let idx = 0;
    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
      idx++;
    }
    if (idx === 0) {
      return DocumentPosition.DISCONNECTED;
    }
    const sharedParent = aParents[idx - 1];
    const siblings2 = sharedParent.children;
    const aSibling = aParents[idx];
    const bSibling = bParents[idx];
    if (siblings2.indexOf(aSibling) > siblings2.indexOf(bSibling)) {
      if (sharedParent === nodeB) {
        return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
      }
      return DocumentPosition.FOLLOWING;
    }
    if (sharedParent === nodeA) {
      return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
    }
    return DocumentPosition.PRECEDING;
  }
  function uniqueSort(nodes) {
    nodes = nodes.filter((node, i, arr) => !arr.includes(node, i + 1));
    nodes.sort((a, b) => {
      const relative = compareDocumentPosition(a, b);
      if (relative & DocumentPosition.PRECEDING) {
        return -1;
      } else if (relative & DocumentPosition.FOLLOWING) {
        return 1;
      }
      return 0;
    });
    return nodes;
  }

  // node_modules/domutils/lib/esm/feeds.js
  init_buffer();
  function getFeed(doc) {
    const feedRoot = getOneElement(isValidFeed, doc);
    return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
  }
  function getAtomFeed(feedRoot) {
    var _a2;
    const childs = feedRoot.children;
    const feed = {
      type: "atom",
      items: getElementsByTagName("entry", childs).map((item) => {
        var _a3;
        const { children: children2 } = item;
        const entry = { media: getMediaElements(children2) };
        addConditionally(entry, "id", "id", children2);
        addConditionally(entry, "title", "title", children2);
        const href2 = (_a3 = getOneElement("link", children2)) === null || _a3 === void 0 ? void 0 : _a3.attribs["href"];
        if (href2) {
          entry.link = href2;
        }
        const description = fetch("summary", children2) || fetch("content", children2);
        if (description) {
          entry.description = description;
        }
        const pubDate = fetch("updated", children2);
        if (pubDate) {
          entry.pubDate = new Date(pubDate);
        }
        return entry;
      })
    };
    addConditionally(feed, "id", "id", childs);
    addConditionally(feed, "title", "title", childs);
    const href = (_a2 = getOneElement("link", childs)) === null || _a2 === void 0 ? void 0 : _a2.attribs["href"];
    if (href) {
      feed.link = href;
    }
    addConditionally(feed, "description", "subtitle", childs);
    const updated = fetch("updated", childs);
    if (updated) {
      feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "email", childs, true);
    return feed;
  }
  function getRssFeed(feedRoot) {
    var _a2, _b;
    const childs = (_b = (_a2 = getOneElement("channel", feedRoot.children)) === null || _a2 === void 0 ? void 0 : _a2.children) !== null && _b !== void 0 ? _b : [];
    const feed = {
      type: feedRoot.name.substr(0, 3),
      id: "",
      items: getElementsByTagName("item", feedRoot.children).map((item) => {
        const { children: children2 } = item;
        const entry = { media: getMediaElements(children2) };
        addConditionally(entry, "id", "guid", children2);
        addConditionally(entry, "title", "title", children2);
        addConditionally(entry, "link", "link", children2);
        addConditionally(entry, "description", "description", children2);
        const pubDate = fetch("pubDate", children2) || fetch("dc:date", children2);
        if (pubDate)
          entry.pubDate = new Date(pubDate);
        return entry;
      })
    };
    addConditionally(feed, "title", "title", childs);
    addConditionally(feed, "link", "link", childs);
    addConditionally(feed, "description", "description", childs);
    const updated = fetch("lastBuildDate", childs);
    if (updated) {
      feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "managingEditor", childs, true);
    return feed;
  }
  var MEDIA_KEYS_STRING = ["url", "type", "lang"];
  var MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
  ];
  function getMediaElements(where) {
    return getElementsByTagName("media:content", where).map((elem) => {
      const { attribs } = elem;
      const media = {
        medium: attribs["medium"],
        isDefault: !!attribs["isDefault"]
      };
      for (const attrib of MEDIA_KEYS_STRING) {
        if (attribs[attrib]) {
          media[attrib] = attribs[attrib];
        }
      }
      for (const attrib of MEDIA_KEYS_INT) {
        if (attribs[attrib]) {
          media[attrib] = parseInt(attribs[attrib], 10);
        }
      }
      if (attribs["expression"]) {
        media.expression = attribs["expression"];
      }
      return media;
    });
  }
  function getOneElement(tagName, node) {
    return getElementsByTagName(tagName, node, true, 1)[0];
  }
  function fetch(tagName, where, recurse = false) {
    return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
  }
  function addConditionally(obj, prop2, tagName, where, recurse = false) {
    const val2 = fetch(tagName, where, recurse);
    if (val2)
      obj[prop2] = val2;
  }
  function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
  }

  // node_modules/cheerio/dist/browser/options.js
  init_buffer();
  var defaultOpts2 = {
    _useHtmlParser2: false
  };
  function flattenOptions(options, baseOptions) {
    if (!options) {
      return baseOptions !== null && baseOptions !== void 0 ? baseOptions : defaultOpts2;
    }
    const opts = {
      _useHtmlParser2: !!options.xmlMode,
      ...baseOptions,
      ...options
    };
    if (options.xml) {
      opts._useHtmlParser2 = true;
      opts.xmlMode = true;
      if (options.xml !== true) {
        Object.assign(opts, options.xml);
      }
    } else if (options.xmlMode) {
      opts._useHtmlParser2 = true;
    }
    return opts;
  }

  // node_modules/cheerio/dist/browser/static.js
  function render2(that, dom, options) {
    if (!that)
      return "";
    return that(dom !== null && dom !== void 0 ? dom : that._root.children, null, void 0, options).toString();
  }
  function isOptions(dom, options) {
    return !options && typeof dom === "object" && dom != null && !("length" in dom) && !("type" in dom);
  }
  function html(dom, options) {
    const toRender = isOptions(dom) ? (options = dom, void 0) : dom;
    const opts = {
      ...this === null || this === void 0 ? void 0 : this._options,
      ...flattenOptions(options)
    };
    return render2(this, toRender, opts);
  }
  function xml(dom) {
    const options = { ...this._options, xmlMode: true };
    return render2(this, dom, options);
  }
  function text(elements) {
    const elems = elements !== null && elements !== void 0 ? elements : this ? this.root() : [];
    let ret = "";
    for (let i = 0; i < elems.length; i++) {
      ret += textContent(elems[i]);
    }
    return ret;
  }
  function parseHTML(data2, context, keepScripts = typeof context === "boolean" ? context : false) {
    if (!data2 || typeof data2 !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
    }
    const parsed = this.load(data2, this._options, false);
    if (!keepScripts) {
      parsed("script").remove();
    }
    return [...parsed.root()[0].children];
  }
  function root() {
    return this(this._root);
  }
  function contains(container, contained) {
    if (contained === container) {
      return false;
    }
    let next2 = contained;
    while (next2 && next2 !== next2.parent) {
      next2 = next2.parent;
      if (next2 === container) {
        return true;
      }
    }
    return false;
  }
  function extract(map2) {
    return this.root().extract(map2);
  }
  function merge(arr1, arr2) {
    if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
      return;
    }
    let newLength = arr1.length;
    const len = +arr2.length;
    for (let i = 0; i < len; i++) {
      arr1[newLength++] = arr2[i];
    }
    arr1.length = newLength;
    return arr1;
  }
  function isArrayLike(item) {
    if (Array.isArray(item)) {
      return true;
    }
    if (typeof item !== "object" || item === null || !("length" in item) || typeof item.length !== "number" || item.length < 0) {
      return false;
    }
    for (let i = 0; i < item.length; i++) {
      if (!(i in item)) {
        return false;
      }
    }
    return true;
  }

  // node_modules/cheerio/dist/browser/load-parse.js
  init_buffer();

  // node_modules/cheerio/dist/browser/load.js
  init_buffer();

  // node_modules/cheerio/dist/browser/cheerio.js
  init_buffer();

  // node_modules/cheerio/dist/browser/api/attributes.js
  var attributes_exports = {};
  __export(attributes_exports, {
    addClass: () => addClass,
    attr: () => attr,
    data: () => data,
    hasClass: () => hasClass,
    prop: () => prop,
    removeAttr: () => removeAttr,
    removeClass: () => removeClass,
    toggleClass: () => toggleClass,
    val: () => val
  });
  init_buffer();

  // node_modules/cheerio/dist/browser/utils.js
  init_buffer();
  function isCheerio(maybeCheerio) {
    return maybeCheerio.cheerio != null;
  }
  function camelCase(str) {
    return str.replace(/[._-](\w|$)/g, (_, x) => x.toUpperCase());
  }
  function cssCase(str) {
    return str.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  function domEach(array, fn) {
    const len = array.length;
    for (let i = 0; i < len; i++)
      fn(array[i], i);
    return array;
  }
  var CharacterCodes;
  (function(CharacterCodes2) {
    CharacterCodes2[CharacterCodes2["LowerA"] = 97] = "LowerA";
    CharacterCodes2[CharacterCodes2["LowerZ"] = 122] = "LowerZ";
    CharacterCodes2[CharacterCodes2["UpperA"] = 65] = "UpperA";
    CharacterCodes2[CharacterCodes2["UpperZ"] = 90] = "UpperZ";
    CharacterCodes2[CharacterCodes2["Exclamation"] = 33] = "Exclamation";
  })(CharacterCodes || (CharacterCodes = {}));
  function isHtml(str) {
    const tagStart = str.indexOf("<");
    if (tagStart < 0 || tagStart > str.length - 3)
      return false;
    const tagChar = str.charCodeAt(tagStart + 1);
    return (tagChar >= CharacterCodes.LowerA && tagChar <= CharacterCodes.LowerZ || tagChar >= CharacterCodes.UpperA && tagChar <= CharacterCodes.UpperZ || tagChar === CharacterCodes.Exclamation) && str.includes(">", tagStart + 2);
  }

  // node_modules/cheerio/dist/browser/api/attributes.js
  var hasOwn = Object.prototype.hasOwnProperty;
  var rspace = /\s+/;
  var dataAttrPrefix = "data-";
  var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
  var rbrace = /^{[^]*}$|^\[[^]*]$/;
  function getAttr(elem, name, xmlMode) {
    var _a2;
    if (!elem || !isTag2(elem))
      return void 0;
    (_a2 = elem.attribs) !== null && _a2 !== void 0 ? _a2 : elem.attribs = {};
    if (!name) {
      return elem.attribs;
    }
    if (hasOwn.call(elem.attribs, name)) {
      return !xmlMode && rboolean.test(name) ? name : elem.attribs[name];
    }
    if (elem.name === "option" && name === "value") {
      return text(elem.children);
    }
    if (elem.name === "input" && (elem.attribs["type"] === "radio" || elem.attribs["type"] === "checkbox") && name === "value") {
      return "on";
    }
    return void 0;
  }
  function setAttr(el, name, value) {
    if (value === null) {
      removeAttribute(el, name);
    } else {
      el.attribs[name] = `${value}`;
    }
  }
  function attr(name, value) {
    if (typeof name === "object" || value !== void 0) {
      if (typeof value === "function") {
        if (typeof name !== "string") {
          {
            throw new Error("Bad combination of arguments.");
          }
        }
        return domEach(this, (el, i) => {
          if (isTag2(el))
            setAttr(el, name, value.call(el, i, el.attribs[name]));
        });
      }
      return domEach(this, (el) => {
        if (!isTag2(el))
          return;
        if (typeof name === "object") {
          for (const objName of Object.keys(name)) {
            const objValue = name[objName];
            setAttr(el, objName, objValue);
          }
        } else {
          setAttr(el, name, value);
        }
      });
    }
    return arguments.length > 1 ? this : getAttr(this[0], name, this.options.xmlMode);
  }
  function getProp(el, name, xmlMode) {
    return name in el ? (
      // @ts-expect-error TS doesn't like us accessing the value directly here.
      el[name]
    ) : !xmlMode && rboolean.test(name) ? getAttr(el, name, false) !== void 0 : getAttr(el, name, xmlMode);
  }
  function setProp(el, name, value, xmlMode) {
    if (name in el) {
      el[name] = value;
    } else {
      setAttr(el, name, !xmlMode && rboolean.test(name) ? value ? "" : null : `${value}`);
    }
  }
  function prop(name, value) {
    var _a2;
    if (typeof name === "string" && value === void 0) {
      const el = this[0];
      if (!el || !isTag2(el))
        return void 0;
      switch (name) {
        case "style": {
          const property = this.css();
          const keys = Object.keys(property);
          for (let i = 0; i < keys.length; i++) {
            property[i] = keys[i];
          }
          property.length = keys.length;
          return property;
        }
        case "tagName":
        case "nodeName": {
          return el.name.toUpperCase();
        }
        case "href":
        case "src": {
          const prop2 = (_a2 = el.attribs) === null || _a2 === void 0 ? void 0 : _a2[name];
          if (typeof URL !== "undefined" && (name === "href" && (el.tagName === "a" || el.tagName === "link") || name === "src" && (el.tagName === "img" || el.tagName === "iframe" || el.tagName === "audio" || el.tagName === "video" || el.tagName === "source")) && prop2 !== void 0 && this.options.baseURI) {
            return new URL(prop2, this.options.baseURI).href;
          }
          return prop2;
        }
        case "innerText": {
          return innerText(el);
        }
        case "textContent": {
          return textContent(el);
        }
        case "outerHTML": {
          return this.clone().wrap("<container />").parent().html();
        }
        case "innerHTML": {
          return this.html();
        }
        default: {
          return getProp(el, name, this.options.xmlMode);
        }
      }
    }
    if (typeof name === "object" || value !== void 0) {
      if (typeof value === "function") {
        if (typeof name === "object") {
          throw new TypeError("Bad combination of arguments.");
        }
        return domEach(this, (el, i) => {
          if (isTag2(el)) {
            setProp(el, name, value.call(el, i, getProp(el, name, this.options.xmlMode)), this.options.xmlMode);
          }
        });
      }
      return domEach(this, (el) => {
        if (!isTag2(el))
          return;
        if (typeof name === "object") {
          for (const key of Object.keys(name)) {
            const val2 = name[key];
            setProp(el, key, val2, this.options.xmlMode);
          }
        } else {
          setProp(el, name, value, this.options.xmlMode);
        }
      });
    }
    return void 0;
  }
  function setData(elem, name, value) {
    var _a2;
    (_a2 = elem.data) !== null && _a2 !== void 0 ? _a2 : elem.data = {};
    if (typeof name === "object")
      Object.assign(elem.data, name);
    else if (typeof name === "string" && value !== void 0) {
      elem.data[name] = value;
    }
  }
  function readAllData(el) {
    for (const domName of Object.keys(el.attribs)) {
      if (!domName.startsWith(dataAttrPrefix)) {
        continue;
      }
      const jsName = camelCase(domName.slice(dataAttrPrefix.length));
      if (!hasOwn.call(el.data, jsName)) {
        el.data[jsName] = parseDataValue(el.attribs[domName]);
      }
    }
    return el.data;
  }
  function readData(el, name) {
    const domName = dataAttrPrefix + cssCase(name);
    const data2 = el.data;
    if (hasOwn.call(data2, name)) {
      return data2[name];
    }
    if (hasOwn.call(el.attribs, domName)) {
      return data2[name] = parseDataValue(el.attribs[domName]);
    }
    return void 0;
  }
  function parseDataValue(value) {
    if (value === "null")
      return null;
    if (value === "true")
      return true;
    if (value === "false")
      return false;
    const num = Number(value);
    if (value === String(num))
      return num;
    if (rbrace.test(value)) {
      try {
        return JSON.parse(value);
      } catch {
      }
    }
    return value;
  }
  function data(name, value) {
    var _a2;
    const elem = this[0];
    if (!elem || !isTag2(elem))
      return;
    const dataEl = elem;
    (_a2 = dataEl.data) !== null && _a2 !== void 0 ? _a2 : dataEl.data = {};
    if (name == null) {
      return readAllData(dataEl);
    }
    if (typeof name === "object" || value !== void 0) {
      domEach(this, (el) => {
        if (isTag2(el)) {
          if (typeof name === "object")
            setData(el, name);
          else
            setData(el, name, value);
        }
      });
      return this;
    }
    return readData(dataEl, name);
  }
  function val(value) {
    const querying = arguments.length === 0;
    const element = this[0];
    if (!element || !isTag2(element))
      return querying ? void 0 : this;
    switch (element.name) {
      case "textarea": {
        return this.text(value);
      }
      case "select": {
        const option = this.find("option:selected");
        if (!querying) {
          if (this.attr("multiple") == null && typeof value === "object") {
            return this;
          }
          this.find("option").removeAttr("selected");
          const values = typeof value === "object" ? value : [value];
          for (const val2 of values) {
            this.find(`option[value="${val2}"]`).attr("selected", "");
          }
          return this;
        }
        return this.attr("multiple") ? option.toArray().map((el) => text(el.children)) : option.attr("value");
      }
      case "input":
      case "option": {
        return querying ? this.attr("value") : this.attr("value", value);
      }
    }
    return void 0;
  }
  function removeAttribute(elem, name) {
    if (!elem.attribs || !hasOwn.call(elem.attribs, name))
      return;
    delete elem.attribs[name];
  }
  function splitNames(names) {
    return names ? names.trim().split(rspace) : [];
  }
  function removeAttr(name) {
    const attrNames = splitNames(name);
    for (const attrName of attrNames) {
      domEach(this, (elem) => {
        if (isTag2(elem))
          removeAttribute(elem, attrName);
      });
    }
    return this;
  }
  function hasClass(className) {
    return this.toArray().some((elem) => {
      const clazz = isTag2(elem) && elem.attribs["class"];
      let idx = -1;
      if (clazz && className.length > 0) {
        while ((idx = clazz.indexOf(className, idx + 1)) > -1) {
          const end2 = idx + className.length;
          if ((idx === 0 || rspace.test(clazz[idx - 1])) && (end2 === clazz.length || rspace.test(clazz[end2]))) {
            return true;
          }
        }
      }
      return false;
    });
  }
  function addClass(value) {
    if (typeof value === "function") {
      return domEach(this, (el, i) => {
        if (isTag2(el)) {
          const className = el.attribs["class"] || "";
          addClass.call([el], value.call(el, i, className));
        }
      });
    }
    if (!value || typeof value !== "string")
      return this;
    const classNames = value.split(rspace);
    const numElements = this.length;
    for (let i = 0; i < numElements; i++) {
      const el = this[i];
      if (!isTag2(el))
        continue;
      const className = getAttr(el, "class", false);
      if (className) {
        let setClass = ` ${className} `;
        for (const cn of classNames) {
          const appendClass = `${cn} `;
          if (!setClass.includes(` ${appendClass}`))
            setClass += appendClass;
        }
        setAttr(el, "class", setClass.trim());
      } else {
        setAttr(el, "class", classNames.join(" ").trim());
      }
    }
    return this;
  }
  function removeClass(name) {
    if (typeof name === "function") {
      return domEach(this, (el, i) => {
        if (isTag2(el)) {
          removeClass.call([el], name.call(el, i, el.attribs["class"] || ""));
        }
      });
    }
    const classes = splitNames(name);
    const numClasses = classes.length;
    const removeAll = arguments.length === 0;
    return domEach(this, (el) => {
      if (!isTag2(el))
        return;
      if (removeAll) {
        el.attribs["class"] = "";
      } else {
        const elClasses = splitNames(el.attribs["class"]);
        let changed = false;
        for (let j = 0; j < numClasses; j++) {
          const index2 = elClasses.indexOf(classes[j]);
          if (index2 >= 0) {
            elClasses.splice(index2, 1);
            changed = true;
            j--;
          }
        }
        if (changed) {
          el.attribs["class"] = elClasses.join(" ");
        }
      }
    });
  }
  function toggleClass(value, stateVal) {
    if (typeof value === "function") {
      return domEach(this, (el, i) => {
        if (isTag2(el)) {
          toggleClass.call([el], value.call(el, i, el.attribs["class"] || "", stateVal), stateVal);
        }
      });
    }
    if (!value || typeof value !== "string")
      return this;
    const classNames = value.split(rspace);
    const numClasses = classNames.length;
    const state = typeof stateVal === "boolean" ? stateVal ? 1 : -1 : 0;
    const numElements = this.length;
    for (let i = 0; i < numElements; i++) {
      const el = this[i];
      if (!isTag2(el))
        continue;
      const elementClasses = splitNames(el.attribs["class"]);
      for (let j = 0; j < numClasses; j++) {
        const index2 = elementClasses.indexOf(classNames[j]);
        if (state >= 0 && index2 < 0) {
          elementClasses.push(classNames[j]);
        } else if (state <= 0 && index2 >= 0) {
          elementClasses.splice(index2, 1);
        }
      }
      el.attribs["class"] = elementClasses.join(" ");
    }
    return this;
  }

  // node_modules/cheerio/dist/browser/api/traversing.js
  var traversing_exports = {};
  __export(traversing_exports, {
    _findBySelector: () => _findBySelector,
    add: () => add,
    addBack: () => addBack,
    children: () => children,
    closest: () => closest,
    contents: () => contents,
    each: () => each,
    end: () => end,
    eq: () => eq,
    filter: () => filter3,
    filterArray: () => filterArray,
    find: () => find3,
    first: () => first,
    get: () => get,
    has: () => has,
    index: () => index,
    is: () => is3,
    last: () => last,
    map: () => map,
    next: () => next,
    nextAll: () => nextAll,
    nextUntil: () => nextUntil,
    not: () => not,
    parent: () => parent,
    parents: () => parents,
    parentsUntil: () => parentsUntil,
    prev: () => prev,
    prevAll: () => prevAll,
    prevUntil: () => prevUntil,
    siblings: () => siblings,
    slice: () => slice,
    toArray: () => toArray
  });
  init_buffer();

  // node_modules/cheerio-select/lib/esm/index.js
  init_buffer();

  // node_modules/css-what/lib/es/index.js
  init_buffer();

  // node_modules/css-what/lib/es/types.js
  init_buffer();
  var SelectorType;
  (function(SelectorType2) {
    SelectorType2["Attribute"] = "attribute";
    SelectorType2["Pseudo"] = "pseudo";
    SelectorType2["PseudoElement"] = "pseudo-element";
    SelectorType2["Tag"] = "tag";
    SelectorType2["Universal"] = "universal";
    SelectorType2["Adjacent"] = "adjacent";
    SelectorType2["Child"] = "child";
    SelectorType2["Descendant"] = "descendant";
    SelectorType2["Parent"] = "parent";
    SelectorType2["Sibling"] = "sibling";
    SelectorType2["ColumnCombinator"] = "column-combinator";
  })(SelectorType || (SelectorType = {}));
  var AttributeAction;
  (function(AttributeAction2) {
    AttributeAction2["Any"] = "any";
    AttributeAction2["Element"] = "element";
    AttributeAction2["End"] = "end";
    AttributeAction2["Equals"] = "equals";
    AttributeAction2["Exists"] = "exists";
    AttributeAction2["Hyphen"] = "hyphen";
    AttributeAction2["Not"] = "not";
    AttributeAction2["Start"] = "start";
  })(AttributeAction || (AttributeAction = {}));

  // node_modules/css-what/lib/es/parse.js
  init_buffer();
  var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
  var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
  var actionTypes = /* @__PURE__ */ new Map([
    [126, AttributeAction.Element],
    [94, AttributeAction.Start],
    [36, AttributeAction.End],
    [42, AttributeAction.Any],
    [33, AttributeAction.Not],
    [124, AttributeAction.Hyphen]
  ]);
  var unpackPseudos = /* @__PURE__ */ new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]);
  function isTraversal(selector) {
    switch (selector.type) {
      case SelectorType.Adjacent:
      case SelectorType.Child:
      case SelectorType.Descendant:
      case SelectorType.Parent:
      case SelectorType.Sibling:
      case SelectorType.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
  function funescape(_, escaped, escapedWhitespace) {
    const high = parseInt(escaped, 16) - 65536;
    return high !== high || escapedWhitespace ? escaped : high < 0 ? (
      // BMP codepoint
      String.fromCharCode(high + 65536)
    ) : (
      // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
    );
  }
  function unescapeCSS(str) {
    return str.replace(reEscape, funescape);
  }
  function isQuote(c) {
    return c === 39 || c === 34;
  }
  function isWhitespace(c) {
    return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
  }
  function parse(selector) {
    const subselects2 = [];
    const endIndex = parseSelector(subselects2, `${selector}`, 0);
    if (endIndex < selector.length) {
      throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
    }
    return subselects2;
  }
  function parseSelector(subselects2, selector, selectorIndex) {
    let tokens = [];
    function getName2(offset) {
      const match = selector.slice(selectorIndex + offset).match(reName);
      if (!match) {
        throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
      }
      const [name] = match;
      selectorIndex += offset + name.length;
      return unescapeCSS(name);
    }
    function stripWhitespace(offset) {
      selectorIndex += offset;
      while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) {
        selectorIndex++;
      }
    }
    function readValueWithParenthesis() {
      selectorIndex += 1;
      const start = selectorIndex;
      let counter = 1;
      for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
        if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
          counter++;
        } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
          counter--;
        }
      }
      if (counter) {
        throw new Error("Parenthesis not matched");
      }
      return unescapeCSS(selector.slice(start, selectorIndex - 1));
    }
    function isEscaped(pos) {
      let slashCount = 0;
      while (selector.charCodeAt(--pos) === 92)
        slashCount++;
      return (slashCount & 1) === 1;
    }
    function ensureNotTraversal() {
      if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
        throw new Error("Did not expect successive traversals.");
      }
    }
    function addTraversal(type) {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
        tokens[tokens.length - 1].type = type;
        return;
      }
      ensureNotTraversal();
      tokens.push({ type });
    }
    function addSpecialAttribute(name, action) {
      tokens.push({
        type: SelectorType.Attribute,
        name,
        action,
        value: getName2(1),
        namespace: null,
        ignoreCase: "quirks"
      });
    }
    function finalizeSubselector() {
      if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) {
        tokens.pop();
      }
      if (tokens.length === 0) {
        throw new Error("Empty sub-selector");
      }
      subselects2.push(tokens);
    }
    stripWhitespace(0);
    if (selector.length === selectorIndex) {
      return selectorIndex;
    }
    loop:
      while (selectorIndex < selector.length) {
        const firstChar = selector.charCodeAt(selectorIndex);
        switch (firstChar) {
          case 32:
          case 9:
          case 10:
          case 12:
          case 13: {
            if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
              ensureNotTraversal();
              tokens.push({ type: SelectorType.Descendant });
            }
            stripWhitespace(1);
            break;
          }
          case 62: {
            addTraversal(SelectorType.Child);
            stripWhitespace(1);
            break;
          }
          case 60: {
            addTraversal(SelectorType.Parent);
            stripWhitespace(1);
            break;
          }
          case 126: {
            addTraversal(SelectorType.Sibling);
            stripWhitespace(1);
            break;
          }
          case 43: {
            addTraversal(SelectorType.Adjacent);
            stripWhitespace(1);
            break;
          }
          case 46: {
            addSpecialAttribute("class", AttributeAction.Element);
            break;
          }
          case 35: {
            addSpecialAttribute("id", AttributeAction.Equals);
            break;
          }
          case 91: {
            stripWhitespace(1);
            let name;
            let namespace = null;
            if (selector.charCodeAt(selectorIndex) === 124) {
              name = getName2(1);
            } else if (selector.startsWith("*|", selectorIndex)) {
              namespace = "*";
              name = getName2(2);
            } else {
              name = getName2(0);
              if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
                namespace = name;
                name = getName2(1);
              }
            }
            stripWhitespace(0);
            let action = AttributeAction.Exists;
            const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
            if (possibleAction) {
              action = possibleAction;
              if (selector.charCodeAt(selectorIndex + 1) !== 61) {
                throw new Error("Expected `=`");
              }
              stripWhitespace(2);
            } else if (selector.charCodeAt(selectorIndex) === 61) {
              action = AttributeAction.Equals;
              stripWhitespace(1);
            }
            let value = "";
            let ignoreCase = null;
            if (action !== "exists") {
              if (isQuote(selector.charCodeAt(selectorIndex))) {
                const quote = selector.charCodeAt(selectorIndex);
                let sectionEnd = selectorIndex + 1;
                while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                  sectionEnd += 1;
                }
                if (selector.charCodeAt(sectionEnd) !== quote) {
                  throw new Error("Attribute value didn't end");
                }
                value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
                selectorIndex = sectionEnd + 1;
              } else {
                const valueStart = selectorIndex;
                while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
                  selectorIndex += 1;
                }
                value = unescapeCSS(selector.slice(valueStart, selectorIndex));
              }
              stripWhitespace(0);
              const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
              if (forceIgnore === 115) {
                ignoreCase = false;
                stripWhitespace(1);
              } else if (forceIgnore === 105) {
                ignoreCase = true;
                stripWhitespace(1);
              }
            }
            if (selector.charCodeAt(selectorIndex) !== 93) {
              throw new Error("Attribute selector didn't terminate");
            }
            selectorIndex += 1;
            const attributeSelector = {
              type: SelectorType.Attribute,
              name,
              action,
              value,
              namespace,
              ignoreCase
            };
            tokens.push(attributeSelector);
            break;
          }
          case 58: {
            if (selector.charCodeAt(selectorIndex + 1) === 58) {
              tokens.push({
                type: SelectorType.PseudoElement,
                name: getName2(2).toLowerCase(),
                data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
              });
              continue;
            }
            const name = getName2(1).toLowerCase();
            let data2 = null;
            if (selector.charCodeAt(selectorIndex) === 40) {
              if (unpackPseudos.has(name)) {
                if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
                  throw new Error(`Pseudo-selector ${name} cannot be quoted`);
                }
                data2 = [];
                selectorIndex = parseSelector(data2, selector, selectorIndex + 1);
                if (selector.charCodeAt(selectorIndex) !== 41) {
                  throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
                }
                selectorIndex += 1;
              } else {
                data2 = readValueWithParenthesis();
                if (stripQuotesFromPseudos.has(name)) {
                  const quot = data2.charCodeAt(0);
                  if (quot === data2.charCodeAt(data2.length - 1) && isQuote(quot)) {
                    data2 = data2.slice(1, -1);
                  }
                }
                data2 = unescapeCSS(data2);
              }
            }
            tokens.push({ type: SelectorType.Pseudo, name, data: data2 });
            break;
          }
          case 44: {
            finalizeSubselector();
            tokens = [];
            stripWhitespace(1);
            break;
          }
          default: {
            if (selector.startsWith("/*", selectorIndex)) {
              const endIndex = selector.indexOf("*/", selectorIndex + 2);
              if (endIndex < 0) {
                throw new Error("Comment was not terminated");
              }
              selectorIndex = endIndex + 2;
              if (tokens.length === 0) {
                stripWhitespace(0);
              }
              break;
            }
            let namespace = null;
            let name;
            if (firstChar === 42) {
              selectorIndex += 1;
              name = "*";
            } else if (firstChar === 124) {
              name = "";
              if (selector.charCodeAt(selectorIndex + 1) === 124) {
                addTraversal(SelectorType.ColumnCombinator);
                stripWhitespace(2);
                break;
              }
            } else if (reName.test(selector.slice(selectorIndex))) {
              name = getName2(0);
            } else {
              break loop;
            }
            if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
              namespace = name;
              if (selector.charCodeAt(selectorIndex + 1) === 42) {
                name = "*";
                selectorIndex += 2;
              } else {
                name = getName2(1);
              }
            }
            tokens.push(name === "*" ? { type: SelectorType.Universal, namespace } : { type: SelectorType.Tag, name, namespace });
          }
        }
      }
    finalizeSubselector();
    return selectorIndex;
  }

  // node_modules/css-select/lib/esm/index.js
  init_buffer();
  var import_boolbase6 = __toESM(require_boolbase(), 1);

  // node_modules/css-select/lib/esm/compile.js
  init_buffer();
  var import_boolbase5 = __toESM(require_boolbase(), 1);

  // node_modules/css-select/lib/esm/sort.js
  init_buffer();
  var procedure = /* @__PURE__ */ new Map([
    [SelectorType.Universal, 50],
    [SelectorType.Tag, 30],
    [SelectorType.Attribute, 1],
    [SelectorType.Pseudo, 0]
  ]);
  function isTraversal2(token) {
    return !procedure.has(token.type);
  }
  var attributes = /* @__PURE__ */ new Map([
    [AttributeAction.Exists, 10],
    [AttributeAction.Equals, 8],
    [AttributeAction.Not, 7],
    [AttributeAction.Start, 6],
    [AttributeAction.End, 6],
    [AttributeAction.Any, 5]
  ]);
  function sortByProcedure(arr) {
    const procs = arr.map(getProcedure);
    for (let i = 1; i < arr.length; i++) {
      const procNew = procs[i];
      if (procNew < 0)
        continue;
      for (let j = i - 1; j >= 0 && procNew < procs[j]; j--) {
        const token = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = token;
        procs[j + 1] = procs[j];
        procs[j] = procNew;
      }
    }
  }
  function getProcedure(token) {
    var _a2, _b;
    let proc = (_a2 = procedure.get(token.type)) !== null && _a2 !== void 0 ? _a2 : -1;
    if (token.type === SelectorType.Attribute) {
      proc = (_b = attributes.get(token.action)) !== null && _b !== void 0 ? _b : 4;
      if (token.action === AttributeAction.Equals && token.name === "id") {
        proc = 9;
      }
      if (token.ignoreCase) {
        proc >>= 1;
      }
    } else if (token.type === SelectorType.Pseudo) {
      if (!token.data) {
        proc = 3;
      } else if (token.name === "has" || token.name === "contains") {
        proc = 0;
      } else if (Array.isArray(token.data)) {
        proc = Math.min(...token.data.map((d) => Math.min(...d.map(getProcedure))));
        if (proc < 0) {
          proc = 0;
        }
      } else {
        proc = 2;
      }
    }
    return proc;
  }

  // node_modules/css-select/lib/esm/general.js
  init_buffer();

  // node_modules/css-select/lib/esm/attributes.js
  init_buffer();
  var import_boolbase = __toESM(require_boolbase(), 1);
  var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
  function escapeRegex(value) {
    return value.replace(reChars, "\\$&");
  }
  var caseInsensitiveAttributes = /* @__PURE__ */ new Set([
    "accept",
    "accept-charset",
    "align",
    "alink",
    "axis",
    "bgcolor",
    "charset",
    "checked",
    "clear",
    "codetype",
    "color",
    "compact",
    "declare",
    "defer",
    "dir",
    "direction",
    "disabled",
    "enctype",
    "face",
    "frame",
    "hreflang",
    "http-equiv",
    "lang",
    "language",
    "link",
    "media",
    "method",
    "multiple",
    "nohref",
    "noresize",
    "noshade",
    "nowrap",
    "readonly",
    "rel",
    "rev",
    "rules",
    "scope",
    "scrolling",
    "selected",
    "shape",
    "target",
    "text",
    "type",
    "valign",
    "valuetype",
    "vlink"
  ]);
  function shouldIgnoreCase(selector, options) {
    return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
  }
  var attributeRules = {
    equals(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name } = data2;
      let { value } = data2;
      if (shouldIgnoreCase(data2, options)) {
        value = value.toLowerCase();
        return (elem) => {
          const attr2 = adapter2.getAttributeValue(elem, name);
          return attr2 != null && attr2.length === value.length && attr2.toLowerCase() === value && next2(elem);
        };
      }
      return (elem) => adapter2.getAttributeValue(elem, name) === value && next2(elem);
    },
    hyphen(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name } = data2;
      let { value } = data2;
      const len = value.length;
      if (shouldIgnoreCase(data2, options)) {
        value = value.toLowerCase();
        return function hyphenIC(elem) {
          const attr2 = adapter2.getAttributeValue(elem, name);
          return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len).toLowerCase() === value && next2(elem);
        };
      }
      return function hyphen(elem) {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len) === value && next2(elem);
      };
    },
    element(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name, value } = data2;
      if (/\s/.test(value)) {
        return import_boolbase.default.falseFunc;
      }
      const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:$|\\s)`, shouldIgnoreCase(data2, options) ? "i" : "");
      return function element(elem) {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next2(elem);
      };
    },
    exists(next2, { name }, { adapter: adapter2 }) {
      return (elem) => adapter2.hasAttrib(elem, name) && next2(elem);
    },
    start(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name } = data2;
      let { value } = data2;
      const len = value.length;
      if (len === 0) {
        return import_boolbase.default.falseFunc;
      }
      if (shouldIgnoreCase(data2, options)) {
        value = value.toLowerCase();
        return (elem) => {
          const attr2 = adapter2.getAttributeValue(elem, name);
          return attr2 != null && attr2.length >= len && attr2.substr(0, len).toLowerCase() === value && next2(elem);
        };
      }
      return (elem) => {
        var _a2;
        return !!((_a2 = adapter2.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.startsWith(value)) && next2(elem);
      };
    },
    end(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name } = data2;
      let { value } = data2;
      const len = -value.length;
      if (len === 0) {
        return import_boolbase.default.falseFunc;
      }
      if (shouldIgnoreCase(data2, options)) {
        value = value.toLowerCase();
        return (elem) => {
          var _a2;
          return ((_a2 = adapter2.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.substr(len).toLowerCase()) === value && next2(elem);
        };
      }
      return (elem) => {
        var _a2;
        return !!((_a2 = adapter2.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.endsWith(value)) && next2(elem);
      };
    },
    any(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name, value } = data2;
      if (value === "") {
        return import_boolbase.default.falseFunc;
      }
      if (shouldIgnoreCase(data2, options)) {
        const regex = new RegExp(escapeRegex(value), "i");
        return function anyIC(elem) {
          const attr2 = adapter2.getAttributeValue(elem, name);
          return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next2(elem);
        };
      }
      return (elem) => {
        var _a2;
        return !!((_a2 = adapter2.getAttributeValue(elem, name)) === null || _a2 === void 0 ? void 0 : _a2.includes(value)) && next2(elem);
      };
    },
    not(next2, data2, options) {
      const { adapter: adapter2 } = options;
      const { name } = data2;
      let { value } = data2;
      if (value === "") {
        return (elem) => !!adapter2.getAttributeValue(elem, name) && next2(elem);
      } else if (shouldIgnoreCase(data2, options)) {
        value = value.toLowerCase();
        return (elem) => {
          const attr2 = adapter2.getAttributeValue(elem, name);
          return (attr2 == null || attr2.length !== value.length || attr2.toLowerCase() !== value) && next2(elem);
        };
      }
      return (elem) => adapter2.getAttributeValue(elem, name) !== value && next2(elem);
    }
  };

  // node_modules/css-select/lib/esm/pseudo-selectors/index.js
  init_buffer();

  // node_modules/css-select/lib/esm/pseudo-selectors/filters.js
  init_buffer();

  // node_modules/nth-check/lib/esm/index.js
  init_buffer();

  // node_modules/nth-check/lib/esm/parse.js
  init_buffer();
  var whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
  var ZERO = "0".charCodeAt(0);
  var NINE = "9".charCodeAt(0);
  function parse2(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
      return [2, 0];
    } else if (formula === "odd") {
      return [2, 1];
    }
    let idx = 0;
    let a = 0;
    let sign = readSign();
    let number = readNumber();
    if (idx < formula.length && formula.charAt(idx) === "n") {
      idx++;
      a = sign * (number !== null && number !== void 0 ? number : 1);
      skipWhitespace();
      if (idx < formula.length) {
        sign = readSign();
        skipWhitespace();
        number = readNumber();
      } else {
        sign = number = 0;
      }
    }
    if (number === null || idx < formula.length) {
      throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
    }
    return [a, sign * number];
    function readSign() {
      if (formula.charAt(idx) === "-") {
        idx++;
        return -1;
      }
      if (formula.charAt(idx) === "+") {
        idx++;
      }
      return 1;
    }
    function readNumber() {
      const start = idx;
      let value = 0;
      while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
        value = value * 10 + (formula.charCodeAt(idx) - ZERO);
        idx++;
      }
      return idx === start ? null : value;
    }
    function skipWhitespace() {
      while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
        idx++;
      }
    }
  }

  // node_modules/nth-check/lib/esm/compile.js
  init_buffer();
  var import_boolbase2 = __toESM(require_boolbase(), 1);
  function compile(parsed) {
    const a = parsed[0];
    const b = parsed[1] - 1;
    if (b < 0 && a <= 0)
      return import_boolbase2.default.falseFunc;
    if (a === -1)
      return (index2) => index2 <= b;
    if (a === 0)
      return (index2) => index2 === b;
    if (a === 1)
      return b < 0 ? import_boolbase2.default.trueFunc : (index2) => index2 >= b;
    const absA = Math.abs(a);
    const bMod = (b % absA + absA) % absA;
    return a > 1 ? (index2) => index2 >= b && index2 % absA === bMod : (index2) => index2 <= b && index2 % absA === bMod;
  }

  // node_modules/nth-check/lib/esm/index.js
  function nthCheck(formula) {
    return compile(parse2(formula));
  }

  // node_modules/css-select/lib/esm/pseudo-selectors/filters.js
  var import_boolbase3 = __toESM(require_boolbase(), 1);
  function getChildFunc(next2, adapter2) {
    return (elem) => {
      const parent2 = adapter2.getParent(elem);
      return parent2 != null && adapter2.isTag(parent2) && next2(elem);
    };
  }
  var filters = {
    contains(next2, text3, { adapter: adapter2 }) {
      return function contains2(elem) {
        return next2(elem) && adapter2.getText(elem).includes(text3);
      };
    },
    icontains(next2, text3, { adapter: adapter2 }) {
      const itext = text3.toLowerCase();
      return function icontains(elem) {
        return next2(elem) && adapter2.getText(elem).toLowerCase().includes(itext);
      };
    },
    // Location specific methods
    "nth-child"(next2, rule, { adapter: adapter2, equals }) {
      const func = nthCheck(rule);
      if (func === import_boolbase3.default.falseFunc)
        return import_boolbase3.default.falseFunc;
      if (func === import_boolbase3.default.trueFunc)
        return getChildFunc(next2, adapter2);
      return function nthChild(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        let pos = 0;
        for (let i = 0; i < siblings2.length; i++) {
          if (equals(elem, siblings2[i]))
            break;
          if (adapter2.isTag(siblings2[i])) {
            pos++;
          }
        }
        return func(pos) && next2(elem);
      };
    },
    "nth-last-child"(next2, rule, { adapter: adapter2, equals }) {
      const func = nthCheck(rule);
      if (func === import_boolbase3.default.falseFunc)
        return import_boolbase3.default.falseFunc;
      if (func === import_boolbase3.default.trueFunc)
        return getChildFunc(next2, adapter2);
      return function nthLastChild(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        let pos = 0;
        for (let i = siblings2.length - 1; i >= 0; i--) {
          if (equals(elem, siblings2[i]))
            break;
          if (adapter2.isTag(siblings2[i])) {
            pos++;
          }
        }
        return func(pos) && next2(elem);
      };
    },
    "nth-of-type"(next2, rule, { adapter: adapter2, equals }) {
      const func = nthCheck(rule);
      if (func === import_boolbase3.default.falseFunc)
        return import_boolbase3.default.falseFunc;
      if (func === import_boolbase3.default.trueFunc)
        return getChildFunc(next2, adapter2);
      return function nthOfType(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        let pos = 0;
        for (let i = 0; i < siblings2.length; i++) {
          const currentSibling = siblings2[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === adapter2.getName(elem)) {
            pos++;
          }
        }
        return func(pos) && next2(elem);
      };
    },
    "nth-last-of-type"(next2, rule, { adapter: adapter2, equals }) {
      const func = nthCheck(rule);
      if (func === import_boolbase3.default.falseFunc)
        return import_boolbase3.default.falseFunc;
      if (func === import_boolbase3.default.trueFunc)
        return getChildFunc(next2, adapter2);
      return function nthLastOfType(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        let pos = 0;
        for (let i = siblings2.length - 1; i >= 0; i--) {
          const currentSibling = siblings2[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === adapter2.getName(elem)) {
            pos++;
          }
        }
        return func(pos) && next2(elem);
      };
    },
    // TODO determine the actual root element
    root(next2, _rule, { adapter: adapter2 }) {
      return (elem) => {
        const parent2 = adapter2.getParent(elem);
        return (parent2 == null || !adapter2.isTag(parent2)) && next2(elem);
      };
    },
    scope(next2, rule, options, context) {
      const { equals } = options;
      if (!context || context.length === 0) {
        return filters["root"](next2, rule, options);
      }
      if (context.length === 1) {
        return (elem) => equals(context[0], elem) && next2(elem);
      }
      return (elem) => context.includes(elem) && next2(elem);
    },
    hover: dynamicStatePseudo("isHovered"),
    visited: dynamicStatePseudo("isVisited"),
    active: dynamicStatePseudo("isActive")
  };
  function dynamicStatePseudo(name) {
    return function dynamicPseudo(next2, _rule, { adapter: adapter2 }) {
      const func = adapter2[name];
      if (typeof func !== "function") {
        return import_boolbase3.default.falseFunc;
      }
      return function active(elem) {
        return func(elem) && next2(elem);
      };
    };
  }

  // node_modules/css-select/lib/esm/pseudo-selectors/pseudos.js
  init_buffer();
  var pseudos = {
    empty(elem, { adapter: adapter2 }) {
      return !adapter2.getChildren(elem).some((elem2) => (
        // FIXME: `getText` call is potentially expensive.
        adapter2.isTag(elem2) || adapter2.getText(elem2) !== ""
      ));
    },
    "first-child"(elem, { adapter: adapter2, equals }) {
      if (adapter2.prevElementSibling) {
        return adapter2.prevElementSibling(elem) == null;
      }
      const firstChild = adapter2.getSiblings(elem).find((elem2) => adapter2.isTag(elem2));
      return firstChild != null && equals(elem, firstChild);
    },
    "last-child"(elem, { adapter: adapter2, equals }) {
      const siblings2 = adapter2.getSiblings(elem);
      for (let i = siblings2.length - 1; i >= 0; i--) {
        if (equals(elem, siblings2[i]))
          return true;
        if (adapter2.isTag(siblings2[i]))
          break;
      }
      return false;
    },
    "first-of-type"(elem, { adapter: adapter2, equals }) {
      const siblings2 = adapter2.getSiblings(elem);
      const elemName = adapter2.getName(elem);
      for (let i = 0; i < siblings2.length; i++) {
        const currentSibling = siblings2[i];
        if (equals(elem, currentSibling))
          return true;
        if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === elemName) {
          break;
        }
      }
      return false;
    },
    "last-of-type"(elem, { adapter: adapter2, equals }) {
      const siblings2 = adapter2.getSiblings(elem);
      const elemName = adapter2.getName(elem);
      for (let i = siblings2.length - 1; i >= 0; i--) {
        const currentSibling = siblings2[i];
        if (equals(elem, currentSibling))
          return true;
        if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === elemName) {
          break;
        }
      }
      return false;
    },
    "only-of-type"(elem, { adapter: adapter2, equals }) {
      const elemName = adapter2.getName(elem);
      return adapter2.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter2.isTag(sibling) || adapter2.getName(sibling) !== elemName);
    },
    "only-child"(elem, { adapter: adapter2, equals }) {
      return adapter2.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter2.isTag(sibling));
    }
  };
  function verifyPseudoArgs(func, name, subselect, argIndex) {
    if (subselect === null) {
      if (func.length > argIndex) {
        throw new Error(`Pseudo-class :${name} requires an argument`);
      }
    } else if (func.length === argIndex) {
      throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
    }
  }

  // node_modules/css-select/lib/esm/pseudo-selectors/aliases.js
  init_buffer();
  var aliases = {
    // Links
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    // Forms
    // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ":not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    // JQuery extensions
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
  };

  // node_modules/css-select/lib/esm/pseudo-selectors/subselects.js
  init_buffer();
  var import_boolbase4 = __toESM(require_boolbase(), 1);
  var PLACEHOLDER_ELEMENT = {};
  function ensureIsTag(next2, adapter2) {
    if (next2 === import_boolbase4.default.falseFunc)
      return import_boolbase4.default.falseFunc;
    return (elem) => adapter2.isTag(elem) && next2(elem);
  }
  function getNextSiblings(elem, adapter2) {
    const siblings2 = adapter2.getSiblings(elem);
    if (siblings2.length <= 1)
      return [];
    const elemIndex = siblings2.indexOf(elem);
    if (elemIndex < 0 || elemIndex === siblings2.length - 1)
      return [];
    return siblings2.slice(elemIndex + 1).filter(adapter2.isTag);
  }
  function copyOptions(options) {
    return {
      xmlMode: !!options.xmlMode,
      lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
      lowerCaseTags: !!options.lowerCaseTags,
      quirksMode: !!options.quirksMode,
      cacheResults: !!options.cacheResults,
      pseudos: options.pseudos,
      adapter: options.adapter,
      equals: options.equals
    };
  }
  var is = (next2, token, options, context, compileToken2) => {
    const func = compileToken2(token, copyOptions(options), context);
    return func === import_boolbase4.default.trueFunc ? next2 : func === import_boolbase4.default.falseFunc ? import_boolbase4.default.falseFunc : (elem) => func(elem) && next2(elem);
  };
  var subselects = {
    is,
    /**
     * `:matches` and `:where` are aliases for `:is`.
     */
    matches: is,
    where: is,
    not(next2, token, options, context, compileToken2) {
      const func = compileToken2(token, copyOptions(options), context);
      return func === import_boolbase4.default.falseFunc ? next2 : func === import_boolbase4.default.trueFunc ? import_boolbase4.default.falseFunc : (elem) => !func(elem) && next2(elem);
    },
    has(next2, subselect, options, _context, compileToken2) {
      const { adapter: adapter2 } = options;
      const opts = copyOptions(options);
      opts.relativeSelector = true;
      const context = subselect.some((s) => s.some(isTraversal2)) ? (
        // Used as a placeholder. Will be replaced with the actual element.
        [PLACEHOLDER_ELEMENT]
      ) : void 0;
      const compiled = compileToken2(subselect, opts, context);
      if (compiled === import_boolbase4.default.falseFunc)
        return import_boolbase4.default.falseFunc;
      const hasElement = ensureIsTag(compiled, adapter2);
      if (context && compiled !== import_boolbase4.default.trueFunc) {
        const { shouldTestNextSiblings = false } = compiled;
        return (elem) => {
          if (!next2(elem))
            return false;
          context[0] = elem;
          const childs = adapter2.getChildren(elem);
          const nextElements = shouldTestNextSiblings ? [...childs, ...getNextSiblings(elem, adapter2)] : childs;
          return adapter2.existsOne(hasElement, nextElements);
        };
      }
      return (elem) => next2(elem) && adapter2.existsOne(hasElement, adapter2.getChildren(elem));
    }
  };

  // node_modules/css-select/lib/esm/pseudo-selectors/index.js
  function compilePseudoSelector(next2, selector, options, context, compileToken2) {
    var _a2;
    const { name, data: data2 } = selector;
    if (Array.isArray(data2)) {
      if (!(name in subselects)) {
        throw new Error(`Unknown pseudo-class :${name}(${data2})`);
      }
      return subselects[name](next2, data2, options, context, compileToken2);
    }
    const userPseudo = (_a2 = options.pseudos) === null || _a2 === void 0 ? void 0 : _a2[name];
    const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
    if (typeof stringPseudo === "string") {
      if (data2 != null) {
        throw new Error(`Pseudo ${name} doesn't have any arguments`);
      }
      const alias = parse(stringPseudo);
      return subselects["is"](next2, alias, options, context, compileToken2);
    }
    if (typeof userPseudo === "function") {
      verifyPseudoArgs(userPseudo, name, data2, 1);
      return (elem) => userPseudo(elem, data2) && next2(elem);
    }
    if (name in filters) {
      return filters[name](next2, data2, options, context);
    }
    if (name in pseudos) {
      const pseudo = pseudos[name];
      verifyPseudoArgs(pseudo, name, data2, 2);
      return (elem) => pseudo(elem, options, data2) && next2(elem);
    }
    throw new Error(`Unknown pseudo-class :${name}`);
  }

  // node_modules/css-select/lib/esm/general.js
  function getElementParent(node, adapter2) {
    const parent2 = adapter2.getParent(node);
    if (parent2 && adapter2.isTag(parent2)) {
      return parent2;
    }
    return null;
  }
  function compileGeneralSelector(next2, selector, options, context, compileToken2) {
    const { adapter: adapter2, equals } = options;
    switch (selector.type) {
      case SelectorType.PseudoElement: {
        throw new Error("Pseudo-elements are not supported by css-select");
      }
      case SelectorType.ColumnCombinator: {
        throw new Error("Column combinators are not yet supported by css-select");
      }
      case SelectorType.Attribute: {
        if (selector.namespace != null) {
          throw new Error("Namespaced attributes are not yet supported by css-select");
        }
        if (!options.xmlMode || options.lowerCaseAttributeNames) {
          selector.name = selector.name.toLowerCase();
        }
        return attributeRules[selector.action](next2, selector, options);
      }
      case SelectorType.Pseudo: {
        return compilePseudoSelector(next2, selector, options, context, compileToken2);
      }
      case SelectorType.Tag: {
        if (selector.namespace != null) {
          throw new Error("Namespaced tag names are not yet supported by css-select");
        }
        let { name } = selector;
        if (!options.xmlMode || options.lowerCaseTags) {
          name = name.toLowerCase();
        }
        return function tag(elem) {
          return adapter2.getName(elem) === name && next2(elem);
        };
      }
      case SelectorType.Descendant: {
        if (options.cacheResults === false || typeof WeakSet === "undefined") {
          return function descendant(elem) {
            let current = elem;
            while (current = getElementParent(current, adapter2)) {
              if (next2(current)) {
                return true;
              }
            }
            return false;
          };
        }
        const isFalseCache = /* @__PURE__ */ new WeakSet();
        return function cachedDescendant(elem) {
          let current = elem;
          while (current = getElementParent(current, adapter2)) {
            if (!isFalseCache.has(current)) {
              if (adapter2.isTag(current) && next2(current)) {
                return true;
              }
              isFalseCache.add(current);
            }
          }
          return false;
        };
      }
      case "_flexibleDescendant": {
        return function flexibleDescendant(elem) {
          let current = elem;
          do {
            if (next2(current))
              return true;
          } while (current = getElementParent(current, adapter2));
          return false;
        };
      }
      case SelectorType.Parent: {
        return function parent2(elem) {
          return adapter2.getChildren(elem).some((elem2) => adapter2.isTag(elem2) && next2(elem2));
        };
      }
      case SelectorType.Child: {
        return function child(elem) {
          const parent2 = adapter2.getParent(elem);
          return parent2 != null && adapter2.isTag(parent2) && next2(parent2);
        };
      }
      case SelectorType.Sibling: {
        return function sibling(elem) {
          const siblings2 = adapter2.getSiblings(elem);
          for (let i = 0; i < siblings2.length; i++) {
            const currentSibling = siblings2[i];
            if (equals(elem, currentSibling))
              break;
            if (adapter2.isTag(currentSibling) && next2(currentSibling)) {
              return true;
            }
          }
          return false;
        };
      }
      case SelectorType.Adjacent: {
        if (adapter2.prevElementSibling) {
          return function adjacent(elem) {
            const previous = adapter2.prevElementSibling(elem);
            return previous != null && next2(previous);
          };
        }
        return function adjacent(elem) {
          const siblings2 = adapter2.getSiblings(elem);
          let lastElement;
          for (let i = 0; i < siblings2.length; i++) {
            const currentSibling = siblings2[i];
            if (equals(elem, currentSibling))
              break;
            if (adapter2.isTag(currentSibling)) {
              lastElement = currentSibling;
            }
          }
          return !!lastElement && next2(lastElement);
        };
      }
      case SelectorType.Universal: {
        if (selector.namespace != null && selector.namespace !== "*") {
          throw new Error("Namespaced universal selectors are not yet supported by css-select");
        }
        return next2;
      }
    }
  }

  // node_modules/css-select/lib/esm/compile.js
  function compile2(selector, options, context) {
    const next2 = compileUnsafe(selector, options, context);
    return ensureIsTag(next2, options.adapter);
  }
  function compileUnsafe(selector, options, context) {
    const token = typeof selector === "string" ? parse(selector) : selector;
    return compileToken(token, options, context);
  }
  function includesScopePseudo(t) {
    return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data2) => data2.some(includesScopePseudo)));
  }
  var DESCENDANT_TOKEN = { type: SelectorType.Descendant };
  var FLEXIBLE_DESCENDANT_TOKEN = {
    type: "_flexibleDescendant"
  };
  var SCOPE_TOKEN = {
    type: SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function absolutize(token, { adapter: adapter2 }, context) {
    const hasContext = !!(context === null || context === void 0 ? void 0 : context.every((e) => {
      const parent2 = adapter2.isTag(e) && adapter2.getParent(e);
      return e === PLACEHOLDER_ELEMENT || parent2 && adapter2.isTag(parent2);
    }));
    for (const t of token) {
      if (t.length > 0 && isTraversal2(t[0]) && t[0].type !== SelectorType.Descendant) {
      } else if (hasContext && !t.some(includesScopePseudo)) {
        t.unshift(DESCENDANT_TOKEN);
      } else {
        continue;
      }
      t.unshift(SCOPE_TOKEN);
    }
  }
  function compileToken(token, options, context) {
    var _a2;
    token.forEach(sortByProcedure);
    context = (_a2 = options.context) !== null && _a2 !== void 0 ? _a2 : context;
    const isArrayContext = Array.isArray(context);
    const finalContext = context && (Array.isArray(context) ? context : [context]);
    if (options.relativeSelector !== false) {
      absolutize(token, options, finalContext);
    } else if (token.some((t) => t.length > 0 && isTraversal2(t[0]))) {
      throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    }
    let shouldTestNextSiblings = false;
    const query = token.map((rules) => {
      if (rules.length >= 2) {
        const [first2, second] = rules;
        if (first2.type !== SelectorType.Pseudo || first2.name !== "scope") {
        } else if (isArrayContext && second.type === SelectorType.Descendant) {
          rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
        } else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) {
          shouldTestNextSiblings = true;
        }
      }
      return compileRules(rules, options, finalContext);
    }).reduce(reduceRules, import_boolbase5.default.falseFunc);
    query.shouldTestNextSiblings = shouldTestNextSiblings;
    return query;
  }
  function compileRules(rules, options, context) {
    var _a2;
    return rules.reduce((previous, rule) => previous === import_boolbase5.default.falseFunc ? import_boolbase5.default.falseFunc : compileGeneralSelector(previous, rule, options, context, compileToken), (_a2 = options.rootFunc) !== null && _a2 !== void 0 ? _a2 : import_boolbase5.default.trueFunc);
  }
  function reduceRules(a, b) {
    if (b === import_boolbase5.default.falseFunc || a === import_boolbase5.default.trueFunc) {
      return a;
    }
    if (a === import_boolbase5.default.falseFunc || b === import_boolbase5.default.trueFunc) {
      return b;
    }
    return function combine(elem) {
      return a(elem) || b(elem);
    };
  }

  // node_modules/css-select/lib/esm/index.js
  var defaultEquals = (a, b) => a === b;
  var defaultOptions = {
    adapter: esm_exports2,
    equals: defaultEquals
  };
  function convertOptionFormats(options) {
    var _a2, _b, _c, _d;
    const opts = options !== null && options !== void 0 ? options : defaultOptions;
    (_a2 = opts.adapter) !== null && _a2 !== void 0 ? _a2 : opts.adapter = esm_exports2;
    (_b = opts.equals) !== null && _b !== void 0 ? _b : opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals;
    return opts;
  }
  function wrapCompile(func) {
    return function addAdapter(selector, options, context) {
      const opts = convertOptionFormats(options);
      return func(selector, opts, context);
    };
  }
  var compile3 = wrapCompile(compile2);
  var _compileUnsafe = wrapCompile(compileUnsafe);
  var _compileToken = wrapCompile(compileToken);
  function getSelectorFunc(searchFunc) {
    return function select2(query, elements, options) {
      const opts = convertOptionFormats(options);
      if (typeof query !== "function") {
        query = compileUnsafe(query, opts, elements);
      }
      const filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
      return searchFunc(query, filteredElements, opts);
    };
  }
  function prepareContext(elems, adapter2, shouldTestNextSiblings = false) {
    if (shouldTestNextSiblings) {
      elems = appendNextSiblings(elems, adapter2);
    }
    return Array.isArray(elems) ? adapter2.removeSubsets(elems) : adapter2.getChildren(elems);
  }
  function appendNextSiblings(elem, adapter2) {
    const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
    const elemsLength = elems.length;
    for (let i = 0; i < elemsLength; i++) {
      const nextSiblings = getNextSiblings(elems[i], adapter2);
      elems.push(...nextSiblings);
    }
    return elems;
  }
  var selectAll = getSelectorFunc((query, elems, options) => query === import_boolbase6.default.falseFunc || !elems || elems.length === 0 ? [] : options.adapter.findAll(query, elems));
  var selectOne = getSelectorFunc((query, elems, options) => query === import_boolbase6.default.falseFunc || !elems || elems.length === 0 ? null : options.adapter.findOne(query, elems));

  // node_modules/cheerio-select/lib/esm/index.js
  var boolbase7 = __toESM(require_boolbase(), 1);

  // node_modules/cheerio-select/lib/esm/helpers.js
  init_buffer();

  // node_modules/cheerio-select/lib/esm/positionals.js
  init_buffer();
  var filterNames = /* @__PURE__ */ new Set([
    "first",
    "last",
    "eq",
    "gt",
    "nth",
    "lt",
    "even",
    "odd"
  ]);
  function isFilter(s) {
    if (s.type !== "pseudo")
      return false;
    if (filterNames.has(s.name))
      return true;
    if (s.name === "not" && Array.isArray(s.data)) {
      return s.data.some((s2) => s2.some(isFilter));
    }
    return false;
  }
  function getLimit(filter4, data2, partLimit) {
    const num = data2 != null ? parseInt(data2, 10) : NaN;
    switch (filter4) {
      case "first":
        return 1;
      case "nth":
      case "eq":
        return isFinite(num) ? num >= 0 ? num + 1 : Infinity : 0;
      case "lt":
        return isFinite(num) ? num >= 0 ? Math.min(num, partLimit) : Infinity : 0;
      case "gt":
        return isFinite(num) ? Infinity : 0;
      case "odd":
        return 2 * partLimit;
      case "even":
        return 2 * partLimit - 1;
      case "last":
      case "not":
        return Infinity;
    }
  }

  // node_modules/cheerio-select/lib/esm/helpers.js
  function getDocumentRoot(node) {
    while (node.parent)
      node = node.parent;
    return node;
  }
  function groupSelectors(selectors) {
    const filteredSelectors = [];
    const plainSelectors = [];
    for (const selector of selectors) {
      if (selector.some(isFilter)) {
        filteredSelectors.push(selector);
      } else {
        plainSelectors.push(selector);
      }
    }
    return [plainSelectors, filteredSelectors];
  }

  // node_modules/cheerio-select/lib/esm/index.js
  var UNIVERSAL_SELECTOR = {
    type: SelectorType.Universal,
    namespace: null
  };
  var SCOPE_PSEUDO = {
    type: SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function is2(element, selector, options = {}) {
    return some([element], selector, options);
  }
  function some(elements, selector, options = {}) {
    if (typeof selector === "function")
      return elements.some(selector);
    const [plain, filtered] = groupSelectors(parse(selector));
    return plain.length > 0 && elements.some(_compileToken(plain, options)) || filtered.some((sel) => filterBySelector(sel, elements, options).length > 0);
  }
  function filterByPosition(filter4, elems, data2, options) {
    const num = typeof data2 === "string" ? parseInt(data2, 10) : NaN;
    switch (filter4) {
      case "first":
      case "lt":
        return elems;
      case "last":
        return elems.length > 0 ? [elems[elems.length - 1]] : elems;
      case "nth":
      case "eq":
        return isFinite(num) && Math.abs(num) < elems.length ? [num < 0 ? elems[elems.length + num] : elems[num]] : [];
      case "gt":
        return isFinite(num) ? elems.slice(num + 1) : [];
      case "even":
        return elems.filter((_, i) => i % 2 === 0);
      case "odd":
        return elems.filter((_, i) => i % 2 === 1);
      case "not": {
        const filtered = new Set(filterParsed(data2, elems, options));
        return elems.filter((e) => !filtered.has(e));
      }
    }
  }
  function filter2(selector, elements, options = {}) {
    return filterParsed(parse(selector), elements, options);
  }
  function filterParsed(selector, elements, options) {
    if (elements.length === 0)
      return [];
    const [plainSelectors, filteredSelectors] = groupSelectors(selector);
    let found;
    if (plainSelectors.length) {
      const filtered = filterElements(elements, plainSelectors, options);
      if (filteredSelectors.length === 0) {
        return filtered;
      }
      if (filtered.length) {
        found = new Set(filtered);
      }
    }
    for (let i = 0; i < filteredSelectors.length && (found === null || found === void 0 ? void 0 : found.size) !== elements.length; i++) {
      const filteredSelector = filteredSelectors[i];
      const missing = found ? elements.filter((e) => isTag2(e) && !found.has(e)) : elements;
      if (missing.length === 0)
        break;
      const filtered = filterBySelector(filteredSelector, elements, options);
      if (filtered.length) {
        if (!found) {
          if (i === filteredSelectors.length - 1) {
            return filtered;
          }
          found = new Set(filtered);
        } else {
          filtered.forEach((el) => found.add(el));
        }
      }
    }
    return typeof found !== "undefined" ? found.size === elements.length ? elements : (
      // Filter elements to preserve order
      elements.filter((el) => found.has(el))
    ) : [];
  }
  function filterBySelector(selector, elements, options) {
    var _a2;
    if (selector.some(isTraversal)) {
      const root2 = (_a2 = options.root) !== null && _a2 !== void 0 ? _a2 : getDocumentRoot(elements[0]);
      const opts = { ...options, context: elements, relativeSelector: false };
      selector.push(SCOPE_PSEUDO);
      return findFilterElements(root2, selector, opts, true, elements.length);
    }
    return findFilterElements(elements, selector, options, false, elements.length);
  }
  function select(selector, root2, options = {}, limit = Infinity) {
    if (typeof selector === "function") {
      return find2(root2, selector);
    }
    const [plain, filtered] = groupSelectors(parse(selector));
    const results = filtered.map((sel) => findFilterElements(root2, sel, options, true, limit));
    if (plain.length) {
      results.push(findElements(root2, plain, options, limit));
    }
    if (results.length === 0) {
      return [];
    }
    if (results.length === 1) {
      return results[0];
    }
    return uniqueSort(results.reduce((a, b) => [...a, ...b]));
  }
  function findFilterElements(root2, selector, options, queryForSelector, totalLimit) {
    const filterIndex = selector.findIndex(isFilter);
    const sub = selector.slice(0, filterIndex);
    const filter4 = selector[filterIndex];
    const partLimit = selector.length - 1 === filterIndex ? totalLimit : Infinity;
    const limit = getLimit(filter4.name, filter4.data, partLimit);
    if (limit === 0)
      return [];
    const elemsNoLimit = sub.length === 0 && !Array.isArray(root2) ? getChildren(root2).filter(isTag2) : sub.length === 0 ? (Array.isArray(root2) ? root2 : [root2]).filter(isTag2) : queryForSelector || sub.some(isTraversal) ? findElements(root2, [sub], options, limit) : filterElements(root2, [sub], options);
    const elems = elemsNoLimit.slice(0, limit);
    let result = filterByPosition(filter4.name, elems, filter4.data, options);
    if (result.length === 0 || selector.length === filterIndex + 1) {
      return result;
    }
    const remainingSelector = selector.slice(filterIndex + 1);
    const remainingHasTraversal = remainingSelector.some(isTraversal);
    if (remainingHasTraversal) {
      if (isTraversal(remainingSelector[0])) {
        const { type } = remainingSelector[0];
        if (type === SelectorType.Sibling || type === SelectorType.Adjacent) {
          result = prepareContext(result, esm_exports2, true);
        }
        remainingSelector.unshift(UNIVERSAL_SELECTOR);
      }
      options = {
        ...options,
        // Avoid absolutizing the selector
        relativeSelector: false,
        /*
         * Add a custom root func, to make sure traversals don't match elements
         * that aren't a part of the considered tree.
         */
        rootFunc: (el) => result.includes(el)
      };
    } else if (options.rootFunc && options.rootFunc !== boolbase7.trueFunc) {
      options = { ...options, rootFunc: boolbase7.trueFunc };
    }
    return remainingSelector.some(isFilter) ? findFilterElements(result, remainingSelector, options, false, totalLimit) : remainingHasTraversal ? (
      // Query existing elements to resolve traversal.
      findElements(result, [remainingSelector], options, totalLimit)
    ) : (
      // If we don't have any more traversals, simply filter elements.
      filterElements(result, [remainingSelector], options)
    );
  }
  function findElements(root2, sel, options, limit) {
    const query = _compileToken(sel, options, root2);
    return find2(root2, query, limit);
  }
  function find2(root2, query, limit = Infinity) {
    const elems = prepareContext(root2, esm_exports2, query.shouldTestNextSiblings);
    return find((node) => isTag2(node) && query(node), elems, true, limit);
  }
  function filterElements(elements, sel, options) {
    const els = (Array.isArray(elements) ? elements : [elements]).filter(isTag2);
    if (els.length === 0)
      return els;
    const query = _compileToken(sel, options);
    return query === boolbase7.trueFunc ? els : els.filter(query);
  }

  // node_modules/cheerio/dist/browser/api/traversing.js
  var reSiblingSelector = /^\s*[+~]/;
  function find3(selectorOrHaystack) {
    if (!selectorOrHaystack) {
      return this._make([]);
    }
    if (typeof selectorOrHaystack !== "string") {
      const haystack = isCheerio(selectorOrHaystack) ? selectorOrHaystack.toArray() : [selectorOrHaystack];
      const context = this.toArray();
      return this._make(haystack.filter((elem) => context.some((node) => contains(node, elem))));
    }
    return this._findBySelector(selectorOrHaystack, Number.POSITIVE_INFINITY);
  }
  function _findBySelector(selector, limit) {
    var _a2;
    const context = this.toArray();
    const elems = reSiblingSelector.test(selector) ? context : this.children().toArray();
    const options = {
      context,
      root: (_a2 = this._root) === null || _a2 === void 0 ? void 0 : _a2[0],
      // Pass options that are recognized by `cheerio-select`
      xmlMode: this.options.xmlMode,
      lowerCaseTags: this.options.lowerCaseTags,
      lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
      pseudos: this.options.pseudos,
      quirksMode: this.options.quirksMode
    };
    return this._make(select(selector, elems, options, limit));
  }
  function _getMatcher(matchMap) {
    return function(fn, ...postFns) {
      return function(selector) {
        var _a2;
        let matched = matchMap(fn, this);
        if (selector) {
          matched = filterArray(matched, selector, this.options.xmlMode, (_a2 = this._root) === null || _a2 === void 0 ? void 0 : _a2[0]);
        }
        return this._make(
          // Post processing is only necessary if there is more than one element.
          this.length > 1 && matched.length > 1 ? postFns.reduce((elems, fn2) => fn2(elems), matched) : matched
        );
      };
    };
  }
  var _matcher = _getMatcher((fn, elems) => {
    let ret = [];
    for (let i = 0; i < elems.length; i++) {
      const value = fn(elems[i]);
      if (value.length > 0)
        ret = ret.concat(value);
    }
    return ret;
  });
  var _singleMatcher = _getMatcher((fn, elems) => {
    const ret = [];
    for (let i = 0; i < elems.length; i++) {
      const value = fn(elems[i]);
      if (value !== null) {
        ret.push(value);
      }
    }
    return ret;
  });
  function _matchUntil(nextElem, ...postFns) {
    let matches = null;
    const innerMatcher = _getMatcher((nextElem2, elems) => {
      const matched = [];
      domEach(elems, (elem) => {
        for (let next2; next2 = nextElem2(elem); elem = next2) {
          if (matches === null || matches === void 0 ? void 0 : matches(next2, matched.length))
            break;
          matched.push(next2);
        }
      });
      return matched;
    })(nextElem, ...postFns);
    return function(selector, filterSelector) {
      matches = typeof selector === "string" ? (elem) => is2(elem, selector, this.options) : selector ? getFilterFn(selector) : null;
      const ret = innerMatcher.call(this, filterSelector);
      matches = null;
      return ret;
    };
  }
  function _removeDuplicates(elems) {
    return elems.length > 1 ? Array.from(new Set(elems)) : elems;
  }
  var parent = _singleMatcher(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, _removeDuplicates);
  var parents = _matcher((elem) => {
    const matched = [];
    while (elem.parent && !isDocument(elem.parent)) {
      matched.push(elem.parent);
      elem = elem.parent;
    }
    return matched;
  }, uniqueSort, (elems) => elems.reverse());
  var parentsUntil = _matchUntil(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, uniqueSort, (elems) => elems.reverse());
  function closest(selector) {
    var _a2;
    const set = [];
    if (!selector) {
      return this._make(set);
    }
    const selectOpts = {
      xmlMode: this.options.xmlMode,
      root: (_a2 = this._root) === null || _a2 === void 0 ? void 0 : _a2[0]
    };
    const selectFn = typeof selector === "string" ? (elem) => is2(elem, selector, selectOpts) : getFilterFn(selector);
    domEach(this, (elem) => {
      if (elem && !isDocument(elem) && !isTag2(elem)) {
        elem = elem.parent;
      }
      while (elem && isTag2(elem)) {
        if (selectFn(elem, 0)) {
          if (!set.includes(elem)) {
            set.push(elem);
          }
          break;
        }
        elem = elem.parent;
      }
    });
    return this._make(set);
  }
  var next = _singleMatcher((elem) => nextElementSibling(elem));
  var nextAll = _matcher((elem) => {
    const matched = [];
    while (elem.next) {
      elem = elem.next;
      if (isTag2(elem))
        matched.push(elem);
    }
    return matched;
  }, _removeDuplicates);
  var nextUntil = _matchUntil((el) => nextElementSibling(el), _removeDuplicates);
  var prev = _singleMatcher((elem) => prevElementSibling(elem));
  var prevAll = _matcher((elem) => {
    const matched = [];
    while (elem.prev) {
      elem = elem.prev;
      if (isTag2(elem))
        matched.push(elem);
    }
    return matched;
  }, _removeDuplicates);
  var prevUntil = _matchUntil((el) => prevElementSibling(el), _removeDuplicates);
  var siblings = _matcher((elem) => getSiblings(elem).filter((el) => isTag2(el) && el !== elem), uniqueSort);
  var children = _matcher((elem) => getChildren(elem).filter(isTag2), _removeDuplicates);
  function contents() {
    const elems = this.toArray().reduce((newElems, elem) => hasChildren(elem) ? newElems.concat(elem.children) : newElems, []);
    return this._make(elems);
  }
  function each(fn) {
    let i = 0;
    const len = this.length;
    while (i < len && fn.call(this[i], i, this[i]) !== false)
      ++i;
    return this;
  }
  function map(fn) {
    let elems = [];
    for (let i = 0; i < this.length; i++) {
      const el = this[i];
      const val2 = fn.call(el, i, el);
      if (val2 != null) {
        elems = elems.concat(val2);
      }
    }
    return this._make(elems);
  }
  function getFilterFn(match) {
    if (typeof match === "function") {
      return (el, i) => match.call(el, i, el);
    }
    if (isCheerio(match)) {
      return (el) => Array.prototype.includes.call(match, el);
    }
    return function(el) {
      return match === el;
    };
  }
  function filter3(match) {
    var _a2;
    return this._make(filterArray(this.toArray(), match, this.options.xmlMode, (_a2 = this._root) === null || _a2 === void 0 ? void 0 : _a2[0]));
  }
  function filterArray(nodes, match, xmlMode, root2) {
    return typeof match === "string" ? filter2(match, nodes, { xmlMode, root: root2 }) : nodes.filter(getFilterFn(match));
  }
  function is3(selector) {
    const nodes = this.toArray();
    return typeof selector === "string" ? some(nodes.filter(isTag2), selector, this.options) : selector ? nodes.some(getFilterFn(selector)) : false;
  }
  function not(match) {
    let nodes = this.toArray();
    if (typeof match === "string") {
      const matches = new Set(filter2(match, nodes, this.options));
      nodes = nodes.filter((el) => !matches.has(el));
    } else {
      const filterFn = getFilterFn(match);
      nodes = nodes.filter((el, i) => !filterFn(el, i));
    }
    return this._make(nodes);
  }
  function has(selectorOrHaystack) {
    return this.filter(typeof selectorOrHaystack === "string" ? (
      // Using the `:has` selector here short-circuits searches.
      `:has(${selectorOrHaystack})`
    ) : (_, el) => this._make(el).find(selectorOrHaystack).length > 0);
  }
  function first() {
    return this.length > 1 ? this._make(this[0]) : this;
  }
  function last() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
  }
  function eq(i) {
    var _a2;
    i = +i;
    if (i === 0 && this.length <= 1)
      return this;
    if (i < 0)
      i = this.length + i;
    return this._make((_a2 = this[i]) !== null && _a2 !== void 0 ? _a2 : []);
  }
  function get(i) {
    if (i == null) {
      return this.toArray();
    }
    return this[i < 0 ? this.length + i : i];
  }
  function toArray() {
    return Array.prototype.slice.call(this);
  }
  function index(selectorOrNeedle) {
    let $haystack;
    let needle;
    if (selectorOrNeedle == null) {
      $haystack = this.parent().children();
      needle = this[0];
    } else if (typeof selectorOrNeedle === "string") {
      $haystack = this._make(selectorOrNeedle);
      needle = this[0];
    } else {
      $haystack = this;
      needle = isCheerio(selectorOrNeedle) ? selectorOrNeedle[0] : selectorOrNeedle;
    }
    return Array.prototype.indexOf.call($haystack, needle);
  }
  function slice(start, end2) {
    return this._make(Array.prototype.slice.call(this, start, end2));
  }
  function end() {
    var _a2;
    return (_a2 = this.prevObject) !== null && _a2 !== void 0 ? _a2 : this._make([]);
  }
  function add(other, context) {
    const selection = this._make(other, context);
    const contents2 = uniqueSort([...this.get(), ...selection.get()]);
    return this._make(contents2);
  }
  function addBack(selector) {
    return this.prevObject ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject) : this;
  }

  // node_modules/cheerio/dist/browser/api/manipulation.js
  var manipulation_exports = {};
  __export(manipulation_exports, {
    _makeDomArray: () => _makeDomArray,
    after: () => after,
    append: () => append2,
    appendTo: () => appendTo,
    before: () => before,
    clone: () => clone,
    empty: () => empty,
    html: () => html2,
    insertAfter: () => insertAfter,
    insertBefore: () => insertBefore,
    prepend: () => prepend2,
    prependTo: () => prependTo,
    remove: () => remove,
    replaceWith: () => replaceWith,
    text: () => text2,
    toString: () => toString,
    unwrap: () => unwrap,
    wrap: () => wrap,
    wrapAll: () => wrapAll,
    wrapInner: () => wrapInner
  });
  init_buffer();

  // node_modules/cheerio/dist/browser/parse.js
  init_buffer();
  function getParse(parser) {
    return function parse6(content, options, isDocument2, context) {
      if (typeof Buffer2 !== "undefined" && Buffer2.isBuffer(content)) {
        content = content.toString();
      }
      if (typeof content === "string") {
        return parser(content, options, isDocument2, context);
      }
      const doc = content;
      if (!Array.isArray(doc) && isDocument(doc)) {
        return doc;
      }
      const root2 = new Document([]);
      update(doc, root2);
      return root2;
    };
  }
  function update(newChilds, parent2) {
    const arr = Array.isArray(newChilds) ? newChilds : [newChilds];
    if (parent2) {
      parent2.children = arr;
    } else {
      parent2 = null;
    }
    for (let i = 0; i < arr.length; i++) {
      const node = arr[i];
      if (node.parent && node.parent.children !== arr) {
        removeElement(node);
      }
      if (parent2) {
        node.prev = arr[i - 1] || null;
        node.next = arr[i + 1] || null;
      } else {
        node.prev = node.next = null;
      }
      node.parent = parent2;
    }
    return parent2;
  }

  // node_modules/cheerio/dist/browser/api/manipulation.js
  function _makeDomArray(elem, clone2) {
    if (elem == null) {
      return [];
    }
    if (typeof elem === "string") {
      return this._parse(elem, this.options, false, null).children.slice(0);
    }
    if ("length" in elem) {
      if (elem.length === 1) {
        return this._makeDomArray(elem[0], clone2);
      }
      const result = [];
      for (let i = 0; i < elem.length; i++) {
        const el = elem[i];
        if (typeof el === "object") {
          if (el == null) {
            continue;
          }
          if (!("length" in el)) {
            result.push(clone2 ? cloneNode(el, true) : el);
            continue;
          }
        }
        result.push(...this._makeDomArray(el, clone2));
      }
      return result;
    }
    return [clone2 ? cloneNode(elem, true) : elem];
  }
  function _insert(concatenator) {
    return function(...elems) {
      const lastIdx = this.length - 1;
      return domEach(this, (el, i) => {
        if (!hasChildren(el))
          return;
        const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
        const dom = this._makeDomArray(domSrc, i < lastIdx);
        concatenator(dom, el.children, el);
      });
    };
  }
  function uniqueSplice(array, spliceIdx, spliceCount, newElems, parent2) {
    var _a2, _b;
    const spliceArgs = [
      spliceIdx,
      spliceCount,
      ...newElems
    ];
    const prev2 = spliceIdx === 0 ? null : array[spliceIdx - 1];
    const next2 = spliceIdx + spliceCount >= array.length ? null : array[spliceIdx + spliceCount];
    for (let idx = 0; idx < newElems.length; ++idx) {
      const node = newElems[idx];
      const oldParent = node.parent;
      if (oldParent) {
        const oldSiblings = oldParent.children;
        const prevIdx = oldSiblings.indexOf(node);
        if (prevIdx > -1) {
          oldParent.children.splice(prevIdx, 1);
          if (parent2 === oldParent && spliceIdx > prevIdx) {
            spliceArgs[0]--;
          }
        }
      }
      node.parent = parent2;
      if (node.prev) {
        node.prev.next = (_a2 = node.next) !== null && _a2 !== void 0 ? _a2 : null;
      }
      if (node.next) {
        node.next.prev = (_b = node.prev) !== null && _b !== void 0 ? _b : null;
      }
      node.prev = idx === 0 ? prev2 : newElems[idx - 1];
      node.next = idx === newElems.length - 1 ? next2 : newElems[idx + 1];
    }
    if (prev2) {
      prev2.next = newElems[0];
    }
    if (next2) {
      next2.prev = newElems[newElems.length - 1];
    }
    return array.splice(...spliceArgs);
  }
  function appendTo(target) {
    const appendTarget = isCheerio(target) ? target : this._make(target);
    appendTarget.append(this);
    return this;
  }
  function prependTo(target) {
    const prependTarget = isCheerio(target) ? target : this._make(target);
    prependTarget.prepend(this);
    return this;
  }
  var append2 = _insert((dom, children2, parent2) => {
    uniqueSplice(children2, children2.length, 0, dom, parent2);
  });
  var prepend2 = _insert((dom, children2, parent2) => {
    uniqueSplice(children2, 0, 0, dom, parent2);
  });
  function _wrap(insert) {
    return function(wrapper) {
      const lastIdx = this.length - 1;
      const lastParent = this.parents().last();
      for (let i = 0; i < this.length; i++) {
        const el = this[i];
        const wrap2 = typeof wrapper === "function" ? wrapper.call(el, i, el) : typeof wrapper === "string" && !isHtml(wrapper) ? lastParent.find(wrapper).clone() : wrapper;
        const [wrapperDom] = this._makeDomArray(wrap2, i < lastIdx);
        if (!wrapperDom || !hasChildren(wrapperDom))
          continue;
        let elInsertLocation = wrapperDom;
        let j = 0;
        while (j < elInsertLocation.children.length) {
          const child = elInsertLocation.children[j];
          if (isTag2(child)) {
            elInsertLocation = child;
            j = 0;
          } else {
            j++;
          }
        }
        insert(el, elInsertLocation, [wrapperDom]);
      }
      return this;
    };
  }
  var wrap = _wrap((el, elInsertLocation, wrapperDom) => {
    const { parent: parent2 } = el;
    if (!parent2)
      return;
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    update([el], elInsertLocation);
    uniqueSplice(siblings2, index2, 0, wrapperDom, parent2);
  });
  var wrapInner = _wrap((el, elInsertLocation, wrapperDom) => {
    if (!hasChildren(el))
      return;
    update(el.children, elInsertLocation);
    update(wrapperDom, el);
  });
  function unwrap(selector) {
    this.parent(selector).not("body").each((_, el) => {
      this._make(el).replaceWith(el.children);
    });
    return this;
  }
  function wrapAll(wrapper) {
    const el = this[0];
    if (el) {
      const wrap2 = this._make(typeof wrapper === "function" ? wrapper.call(el, 0, el) : wrapper).insertBefore(el);
      let elInsertLocation;
      for (let i = 0; i < wrap2.length; i++) {
        if (wrap2[i].type === "tag")
          elInsertLocation = wrap2[i];
      }
      let j = 0;
      while (elInsertLocation && j < elInsertLocation.children.length) {
        const child = elInsertLocation.children[j];
        if (child.type === "tag") {
          elInsertLocation = child;
          j = 0;
        } else {
          j++;
        }
      }
      if (elInsertLocation)
        this._make(elInsertLocation).append(this);
    }
    return this;
  }
  function after(...elems) {
    const lastIdx = this.length - 1;
    return domEach(this, (el, i) => {
      if (!hasChildren(el) || !el.parent) {
        return;
      }
      const siblings2 = el.parent.children;
      const index2 = siblings2.indexOf(el);
      if (index2 < 0)
        return;
      const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
      const dom = this._makeDomArray(domSrc, i < lastIdx);
      uniqueSplice(siblings2, index2 + 1, 0, dom, el.parent);
    });
  }
  function insertAfter(target) {
    if (typeof target === "string") {
      target = this._make(target);
    }
    this.remove();
    const clones = [];
    for (const el of this._makeDomArray(target)) {
      const clonedSelf = this.clone().toArray();
      const { parent: parent2 } = el;
      if (!parent2) {
        continue;
      }
      const siblings2 = parent2.children;
      const index2 = siblings2.indexOf(el);
      if (index2 < 0)
        continue;
      uniqueSplice(siblings2, index2 + 1, 0, clonedSelf, parent2);
      clones.push(...clonedSelf);
    }
    return this._make(clones);
  }
  function before(...elems) {
    const lastIdx = this.length - 1;
    return domEach(this, (el, i) => {
      if (!hasChildren(el) || !el.parent) {
        return;
      }
      const siblings2 = el.parent.children;
      const index2 = siblings2.indexOf(el);
      if (index2 < 0)
        return;
      const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
      const dom = this._makeDomArray(domSrc, i < lastIdx);
      uniqueSplice(siblings2, index2, 0, dom, el.parent);
    });
  }
  function insertBefore(target) {
    const targetArr = this._make(target);
    this.remove();
    const clones = [];
    domEach(targetArr, (el) => {
      const clonedSelf = this.clone().toArray();
      const { parent: parent2 } = el;
      if (!parent2) {
        return;
      }
      const siblings2 = parent2.children;
      const index2 = siblings2.indexOf(el);
      if (index2 < 0)
        return;
      uniqueSplice(siblings2, index2, 0, clonedSelf, parent2);
      clones.push(...clonedSelf);
    });
    return this._make(clones);
  }
  function remove(selector) {
    const elems = selector ? this.filter(selector) : this;
    domEach(elems, (el) => {
      removeElement(el);
      el.prev = el.next = el.parent = null;
    });
    return this;
  }
  function replaceWith(content) {
    return domEach(this, (el, i) => {
      const { parent: parent2 } = el;
      if (!parent2) {
        return;
      }
      const siblings2 = parent2.children;
      const cont = typeof content === "function" ? content.call(el, i, el) : content;
      const dom = this._makeDomArray(cont);
      update(dom, null);
      const index2 = siblings2.indexOf(el);
      uniqueSplice(siblings2, index2, 1, dom, parent2);
      if (!dom.includes(el)) {
        el.parent = el.prev = el.next = null;
      }
    });
  }
  function empty() {
    return domEach(this, (el) => {
      if (!hasChildren(el))
        return;
      for (const child of el.children) {
        child.next = child.prev = child.parent = null;
      }
      el.children.length = 0;
    });
  }
  function html2(str) {
    if (str === void 0) {
      const el = this[0];
      if (!el || !hasChildren(el))
        return null;
      return this._render(el.children);
    }
    return domEach(this, (el) => {
      if (!hasChildren(el))
        return;
      for (const child of el.children) {
        child.next = child.prev = child.parent = null;
      }
      const content = isCheerio(str) ? str.toArray() : this._parse(`${str}`, this.options, false, el).children;
      update(content, el);
    });
  }
  function toString() {
    return this._render(this);
  }
  function text2(str) {
    if (str === void 0) {
      return text(this);
    }
    if (typeof str === "function") {
      return domEach(this, (el, i) => this._make(el).text(str.call(el, i, text([el]))));
    }
    return domEach(this, (el) => {
      if (!hasChildren(el))
        return;
      for (const child of el.children) {
        child.next = child.prev = child.parent = null;
      }
      const textNode = new Text2(`${str}`);
      update(textNode, el);
    });
  }
  function clone() {
    const clone2 = Array.prototype.map.call(this.get(), (el) => cloneNode(el, true));
    const root2 = new Document(clone2);
    for (const node of clone2) {
      node.parent = root2;
    }
    return this._make(clone2);
  }

  // node_modules/cheerio/dist/browser/api/css.js
  var css_exports = {};
  __export(css_exports, {
    css: () => css
  });
  init_buffer();
  function css(prop2, val2) {
    if (prop2 != null && val2 != null || // When `prop` is a "plain" object
    typeof prop2 === "object" && !Array.isArray(prop2)) {
      return domEach(this, (el, i) => {
        if (isTag2(el)) {
          setCss(el, prop2, val2, i);
        }
      });
    }
    if (this.length === 0) {
      return void 0;
    }
    return getCss(this[0], prop2);
  }
  function setCss(el, prop2, value, idx) {
    if (typeof prop2 === "string") {
      const styles = getCss(el);
      const val2 = typeof value === "function" ? value.call(el, idx, styles[prop2]) : value;
      if (val2 === "") {
        delete styles[prop2];
      } else if (val2 != null) {
        styles[prop2] = val2;
      }
      el.attribs["style"] = stringify(styles);
    } else if (typeof prop2 === "object") {
      const keys = Object.keys(prop2);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        setCss(el, k, prop2[k], i);
      }
    }
  }
  function getCss(el, prop2) {
    if (!el || !isTag2(el))
      return;
    const styles = parse3(el.attribs["style"]);
    if (typeof prop2 === "string") {
      return styles[prop2];
    }
    if (Array.isArray(prop2)) {
      const newStyles = {};
      for (const item of prop2) {
        if (styles[item] != null) {
          newStyles[item] = styles[item];
        }
      }
      return newStyles;
    }
    return styles;
  }
  function stringify(obj) {
    return Object.keys(obj).reduce((str, prop2) => `${str}${str ? " " : ""}${prop2}: ${obj[prop2]};`, "");
  }
  function parse3(styles) {
    styles = (styles || "").trim();
    if (!styles)
      return {};
    const obj = {};
    let key;
    for (const str of styles.split(";")) {
      const n = str.indexOf(":");
      if (n < 1 || n === str.length - 1) {
        const trimmed = str.trimEnd();
        if (trimmed.length > 0 && key !== void 0) {
          obj[key] += `;${trimmed}`;
        }
      } else {
        key = str.slice(0, n).trim();
        obj[key] = str.slice(n + 1).trim();
      }
    }
    return obj;
  }

  // node_modules/cheerio/dist/browser/api/forms.js
  var forms_exports = {};
  __export(forms_exports, {
    serialize: () => serialize,
    serializeArray: () => serializeArray
  });
  init_buffer();
  var submittableSelector = "input,select,textarea,keygen";
  var r20 = /%20/g;
  var rCRLF = /\r?\n/g;
  function serialize() {
    const arr = this.serializeArray();
    const retArr = arr.map((data2) => `${encodeURIComponent(data2.name)}=${encodeURIComponent(data2.value)}`);
    return retArr.join("&").replace(r20, "+");
  }
  function serializeArray() {
    return this.map((_, elem) => {
      const $elem = this._make(elem);
      if (isTag2(elem) && elem.name === "form") {
        return $elem.find(submittableSelector).toArray();
      }
      return $elem.filter(submittableSelector).toArray();
    }).filter(
      // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
      '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    ).map((_, elem) => {
      var _a2;
      const $elem = this._make(elem);
      const name = $elem.attr("name");
      const value = (_a2 = $elem.val()) !== null && _a2 !== void 0 ? _a2 : "";
      if (Array.isArray(value)) {
        return value.map((val2) => (
          /*
           * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
           * These can occur inside of `<textarea>'s`
           */
          { name, value: val2.replace(rCRLF, "\r\n") }
        ));
      }
      return { name, value: value.replace(rCRLF, "\r\n") };
    }).toArray();
  }

  // node_modules/cheerio/dist/browser/api/extract.js
  var extract_exports = {};
  __export(extract_exports, {
    extract: () => extract2
  });
  init_buffer();
  function getExtractDescr(descr) {
    var _a2;
    if (typeof descr === "string") {
      return { selector: descr, value: "textContent" };
    }
    return {
      selector: descr.selector,
      value: (_a2 = descr.value) !== null && _a2 !== void 0 ? _a2 : "textContent"
    };
  }
  function extract2(map2) {
    const ret = {};
    for (const key in map2) {
      const descr = map2[key];
      const isArray = Array.isArray(descr);
      const { selector, value } = getExtractDescr(isArray ? descr[0] : descr);
      const fn = typeof value === "function" ? value : typeof value === "string" ? (el) => this._make(el).prop(value) : (el) => this._make(el).extract(value);
      if (isArray) {
        ret[key] = this._findBySelector(selector, Number.POSITIVE_INFINITY).map((_, el) => fn(el, key, ret)).get();
      } else {
        const $2 = this._findBySelector(selector, 1);
        ret[key] = $2.length > 0 ? fn($2[0], key, ret) : void 0;
      }
    }
    return ret;
  }

  // node_modules/cheerio/dist/browser/cheerio.js
  var Cheerio = class {
    /**
     * Instance of cheerio. Methods are specified in the modules. Usage of this
     * constructor is not recommended. Please use `$.load` instead.
     *
     * @private
     * @param elements - The new selection.
     * @param root - Sets the root node.
     * @param options - Options for the instance.
     */
    constructor(elements, root2, options) {
      this.length = 0;
      this.options = options;
      this._root = root2;
      if (elements) {
        for (let idx = 0; idx < elements.length; idx++) {
          this[idx] = elements[idx];
        }
        this.length = elements.length;
      }
    }
  };
  Cheerio.prototype.cheerio = "[cheerio object]";
  Cheerio.prototype.splice = Array.prototype.splice;
  Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  Object.assign(Cheerio.prototype, attributes_exports, traversing_exports, manipulation_exports, css_exports, forms_exports, extract_exports);

  // node_modules/cheerio/dist/browser/load.js
  function getLoad(parse6, render3) {
    return function load2(content, options, isDocument2 = true) {
      if (content == null) {
        throw new Error("cheerio.load() expects a string");
      }
      const internalOpts = flattenOptions(options);
      const initialRoot = parse6(content, internalOpts, isDocument2, null);
      class LoadedCheerio extends Cheerio {
        _make(selector, context) {
          const cheerio = initialize(selector, context);
          cheerio.prevObject = this;
          return cheerio;
        }
        _parse(content2, options2, isDocument3, context) {
          return parse6(content2, options2, isDocument3, context);
        }
        _render(dom) {
          return render3(dom, this.options);
        }
      }
      function initialize(selector, context, root2 = initialRoot, opts) {
        if (selector && isCheerio(selector))
          return selector;
        const options2 = flattenOptions(opts, internalOpts);
        const r = typeof root2 === "string" ? [parse6(root2, options2, false, null)] : "length" in root2 ? root2 : [root2];
        const rootInstance = isCheerio(r) ? r : new LoadedCheerio(r, null, options2);
        rootInstance._root = rootInstance;
        if (!selector) {
          return new LoadedCheerio(void 0, rootInstance, options2);
        }
        const elements = typeof selector === "string" && isHtml(selector) ? (
          // $(<html>)
          parse6(selector, options2, false, null).children
        ) : isNode(selector) ? (
          // $(dom)
          [selector]
        ) : Array.isArray(selector) ? (
          // $([dom])
          selector
        ) : void 0;
        const instance = new LoadedCheerio(elements, rootInstance, options2);
        if (elements) {
          return instance;
        }
        if (typeof selector !== "string") {
          throw new TypeError("Unexpected type of selector");
        }
        let search = selector;
        const searchContext = context ? (
          // If we don't have a context, maybe we have a root, from loading
          typeof context === "string" ? isHtml(context) ? (
            // $('li', '<ul>...</ul>')
            new LoadedCheerio([parse6(context, options2, false, null)], rootInstance, options2)
          ) : (
            // $('li', 'ul')
            (search = `${context} ${search}`, rootInstance)
          ) : isCheerio(context) ? (
            // $('li', $)
            context
          ) : (
            // $('li', node), $('li', [nodes])
            new LoadedCheerio(Array.isArray(context) ? context : [context], rootInstance, options2)
          )
        ) : rootInstance;
        if (!searchContext)
          return instance;
        return searchContext.find(search);
      }
      Object.assign(initialize, static_exports, {
        load: load2,
        // `_root` and `_options` are used in static methods.
        _root: initialRoot,
        _options: internalOpts,
        // Add `fn` for plugins
        fn: LoadedCheerio.prototype,
        // Add the prototype here to maintain `instanceof` behavior.
        prototype: LoadedCheerio.prototype
      });
      return initialize;
    };
  }
  function isNode(obj) {
    return !!obj.name || obj.type === "root" || obj.type === "text" || obj.type === "comment";
  }

  // node_modules/cheerio/dist/browser/parsers/parse5-adapter.js
  init_buffer();

  // node_modules/parse5/dist/index.js
  init_buffer();

  // node_modules/parse5/dist/parser/index.js
  init_buffer();

  // node_modules/parse5/dist/tokenizer/index.js
  init_buffer();

  // node_modules/parse5/dist/tokenizer/preprocessor.js
  init_buffer();

  // node_modules/parse5/dist/common/unicode.js
  init_buffer();
  var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
    65534,
    65535,
    131070,
    131071,
    196606,
    196607,
    262142,
    262143,
    327678,
    327679,
    393214,
    393215,
    458750,
    458751,
    524286,
    524287,
    589822,
    589823,
    655358,
    655359,
    720894,
    720895,
    786430,
    786431,
    851966,
    851967,
    917502,
    917503,
    983038,
    983039,
    1048574,
    1048575,
    1114110,
    1114111
  ]);
  var REPLACEMENT_CHARACTER = "\uFFFD";
  var CODE_POINTS;
  (function(CODE_POINTS2) {
    CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
    CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
    CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
    CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
    CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
    CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
    CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
    CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
    CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
    CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
    CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
    CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
    CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
    CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
    CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
    CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
    CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
    CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
    CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
    CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
    CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  })(CODE_POINTS || (CODE_POINTS = {}));
  var SEQUENCES = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system"
  };
  function isSurrogate(cp) {
    return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
    return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
    return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  function isControlCodePoint(cp) {
    return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
  }
  function isUndefinedCodePoint(cp) {
    return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
  }

  // node_modules/parse5/dist/common/error-codes.js
  init_buffer();
  var ERR;
  (function(ERR2) {
    ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
    ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
    ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
    ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
    ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
    ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
    ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
    ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
    ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
    ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
    ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
    ERR2["missingEndTagName"] = "missing-end-tag-name";
    ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
    ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
    ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
    ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
    ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
    ERR2["eofBeforeTagName"] = "eof-before-tag-name";
    ERR2["eofInTag"] = "eof-in-tag";
    ERR2["missingAttributeValue"] = "missing-attribute-value";
    ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
    ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
    ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
    ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
    ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
    ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
    ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
    ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
    ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
    ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
    ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
    ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
    ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
    ERR2["eofInDoctype"] = "eof-in-doctype";
    ERR2["nestedComment"] = "nested-comment";
    ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
    ERR2["eofInComment"] = "eof-in-comment";
    ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
    ERR2["eofInCdata"] = "eof-in-cdata";
    ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
    ERR2["nullCharacterReference"] = "null-character-reference";
    ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
    ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
    ERR2["controlCharacterReference"] = "control-character-reference";
    ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
    ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
    ERR2["missingDoctypeName"] = "missing-doctype-name";
    ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
    ERR2["duplicateAttribute"] = "duplicate-attribute";
    ERR2["nonConformingDoctype"] = "non-conforming-doctype";
    ERR2["missingDoctype"] = "missing-doctype";
    ERR2["misplacedDoctype"] = "misplaced-doctype";
    ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
    ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
    ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
    ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
    ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
    ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
    ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
    ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
  })(ERR || (ERR = {}));

  // node_modules/parse5/dist/tokenizer/preprocessor.js
  var DEFAULT_BUFFER_WATERLINE = 1 << 16;
  var Preprocessor = class {
    constructor(handler) {
      this.handler = handler;
      this.html = "";
      this.pos = -1;
      this.lastGapPos = -2;
      this.gapStack = [];
      this.skipNextNewLine = false;
      this.lastChunkWritten = false;
      this.endOfChunkHit = false;
      this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
      this.isEol = false;
      this.lineStartPos = 0;
      this.droppedBufferSize = 0;
      this.line = 1;
      this.lastErrOffset = -1;
    }
    /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
    get col() {
      return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(code, cpOffset) {
      const { line, col, offset } = this;
      const startCol = col + cpOffset;
      const startOffset = offset + cpOffset;
      return {
        code,
        startLine: line,
        endLine: line,
        startCol,
        endCol: startCol,
        startOffset,
        endOffset: startOffset
      };
    }
    _err(code) {
      if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
        this.lastErrOffset = this.offset;
        this.handler.onParseError(this.getError(code, 0));
      }
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos);
      this.lastGapPos = this.pos;
    }
    _processSurrogate(cp) {
      if (this.pos !== this.html.length - 1) {
        const nextCp = this.html.charCodeAt(this.pos + 1);
        if (isSurrogatePair(nextCp)) {
          this.pos++;
          this._addGap();
          return getSurrogatePairCodePoint(cp, nextCp);
        }
      } else if (!this.lastChunkWritten) {
        this.endOfChunkHit = true;
        return CODE_POINTS.EOF;
      }
      this._err(ERR.surrogateInInputStream);
      return cp;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      if (this.willDropParsedChunk()) {
        this.html = this.html.substring(this.pos);
        this.lineStartPos -= this.pos;
        this.droppedBufferSize += this.pos;
        this.pos = 0;
        this.lastGapPos = -2;
        this.gapStack.length = 0;
      }
    }
    write(chunk, isLastChunk) {
      if (this.html.length > 0) {
        this.html += chunk;
      } else {
        this.html = chunk;
      }
      this.endOfChunkHit = false;
      this.lastChunkWritten = isLastChunk;
    }
    insertHtmlAtCurrentPos(chunk) {
      this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
      this.endOfChunkHit = false;
    }
    startsWith(pattern, caseSensitive) {
      if (this.pos + pattern.length > this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return false;
      }
      if (caseSensitive) {
        return this.html.startsWith(pattern, this.pos);
      }
      for (let i = 0; i < pattern.length; i++) {
        const cp = this.html.charCodeAt(this.pos + i) | 32;
        if (cp !== pattern.charCodeAt(i)) {
          return false;
        }
      }
      return true;
    }
    peek(offset) {
      const pos = this.pos + offset;
      if (pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return CODE_POINTS.EOF;
      }
      const code = this.html.charCodeAt(pos);
      return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
    }
    advance() {
      this.pos++;
      if (this.isEol) {
        this.isEol = false;
        this.line++;
        this.lineStartPos = this.pos;
      }
      if (this.pos >= this.html.length) {
        this.endOfChunkHit = !this.lastChunkWritten;
        return CODE_POINTS.EOF;
      }
      let cp = this.html.charCodeAt(this.pos);
      if (cp === CODE_POINTS.CARRIAGE_RETURN) {
        this.isEol = true;
        this.skipNextNewLine = true;
        return CODE_POINTS.LINE_FEED;
      }
      if (cp === CODE_POINTS.LINE_FEED) {
        this.isEol = true;
        if (this.skipNextNewLine) {
          this.line--;
          this.skipNextNewLine = false;
          this._addGap();
          return this.advance();
        }
      }
      this.skipNextNewLine = false;
      if (isSurrogate(cp)) {
        cp = this._processSurrogate(cp);
      }
      const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
      if (!isCommonValidRange) {
        this._checkForProblematicCharacters(cp);
      }
      return cp;
    }
    _checkForProblematicCharacters(cp) {
      if (isControlCodePoint(cp)) {
        this._err(ERR.controlCharacterInInputStream);
      } else if (isUndefinedCodePoint(cp)) {
        this._err(ERR.noncharacterInInputStream);
      }
    }
    retreat(count) {
      this.pos -= count;
      while (this.pos < this.lastGapPos) {
        this.lastGapPos = this.gapStack.pop();
        this.pos--;
      }
      this.isEol = false;
    }
  };

  // node_modules/parse5/dist/common/token.js
  init_buffer();
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
    TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
    TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
    TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
    TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
    TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
    TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
    TokenType2[TokenType2["EOF"] = 7] = "EOF";
    TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
  })(TokenType || (TokenType = {}));
  function getTokenAttr(token, attrName) {
    for (let i = token.attrs.length - 1; i >= 0; i--) {
      if (token.attrs[i].name === attrName) {
        return token.attrs[i].value;
      }
    }
    return null;
  }

  // node_modules/parse5/dist/common/html.js
  var html_exports = {};
  __export(html_exports, {
    ATTRS: () => ATTRS,
    DOCUMENT_MODE: () => DOCUMENT_MODE,
    NS: () => NS,
    NUMBERED_HEADERS: () => NUMBERED_HEADERS,
    SPECIAL_ELEMENTS: () => SPECIAL_ELEMENTS,
    TAG_ID: () => TAG_ID,
    TAG_NAMES: () => TAG_NAMES,
    getTagID: () => getTagID,
    hasUnescapedText: () => hasUnescapedText
  });
  init_buffer();
  var NS;
  (function(NS2) {
    NS2["HTML"] = "http://www.w3.org/1999/xhtml";
    NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
    NS2["SVG"] = "http://www.w3.org/2000/svg";
    NS2["XLINK"] = "http://www.w3.org/1999/xlink";
    NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
    NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
  })(NS || (NS = {}));
  var ATTRS;
  (function(ATTRS2) {
    ATTRS2["TYPE"] = "type";
    ATTRS2["ACTION"] = "action";
    ATTRS2["ENCODING"] = "encoding";
    ATTRS2["PROMPT"] = "prompt";
    ATTRS2["NAME"] = "name";
    ATTRS2["COLOR"] = "color";
    ATTRS2["FACE"] = "face";
    ATTRS2["SIZE"] = "size";
  })(ATTRS || (ATTRS = {}));
  var DOCUMENT_MODE;
  (function(DOCUMENT_MODE2) {
    DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
    DOCUMENT_MODE2["QUIRKS"] = "quirks";
    DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
  })(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
  var TAG_NAMES;
  (function(TAG_NAMES2) {
    TAG_NAMES2["A"] = "a";
    TAG_NAMES2["ADDRESS"] = "address";
    TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
    TAG_NAMES2["APPLET"] = "applet";
    TAG_NAMES2["AREA"] = "area";
    TAG_NAMES2["ARTICLE"] = "article";
    TAG_NAMES2["ASIDE"] = "aside";
    TAG_NAMES2["B"] = "b";
    TAG_NAMES2["BASE"] = "base";
    TAG_NAMES2["BASEFONT"] = "basefont";
    TAG_NAMES2["BGSOUND"] = "bgsound";
    TAG_NAMES2["BIG"] = "big";
    TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
    TAG_NAMES2["BODY"] = "body";
    TAG_NAMES2["BR"] = "br";
    TAG_NAMES2["BUTTON"] = "button";
    TAG_NAMES2["CAPTION"] = "caption";
    TAG_NAMES2["CENTER"] = "center";
    TAG_NAMES2["CODE"] = "code";
    TAG_NAMES2["COL"] = "col";
    TAG_NAMES2["COLGROUP"] = "colgroup";
    TAG_NAMES2["DD"] = "dd";
    TAG_NAMES2["DESC"] = "desc";
    TAG_NAMES2["DETAILS"] = "details";
    TAG_NAMES2["DIALOG"] = "dialog";
    TAG_NAMES2["DIR"] = "dir";
    TAG_NAMES2["DIV"] = "div";
    TAG_NAMES2["DL"] = "dl";
    TAG_NAMES2["DT"] = "dt";
    TAG_NAMES2["EM"] = "em";
    TAG_NAMES2["EMBED"] = "embed";
    TAG_NAMES2["FIELDSET"] = "fieldset";
    TAG_NAMES2["FIGCAPTION"] = "figcaption";
    TAG_NAMES2["FIGURE"] = "figure";
    TAG_NAMES2["FONT"] = "font";
    TAG_NAMES2["FOOTER"] = "footer";
    TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
    TAG_NAMES2["FORM"] = "form";
    TAG_NAMES2["FRAME"] = "frame";
    TAG_NAMES2["FRAMESET"] = "frameset";
    TAG_NAMES2["H1"] = "h1";
    TAG_NAMES2["H2"] = "h2";
    TAG_NAMES2["H3"] = "h3";
    TAG_NAMES2["H4"] = "h4";
    TAG_NAMES2["H5"] = "h5";
    TAG_NAMES2["H6"] = "h6";
    TAG_NAMES2["HEAD"] = "head";
    TAG_NAMES2["HEADER"] = "header";
    TAG_NAMES2["HGROUP"] = "hgroup";
    TAG_NAMES2["HR"] = "hr";
    TAG_NAMES2["HTML"] = "html";
    TAG_NAMES2["I"] = "i";
    TAG_NAMES2["IMG"] = "img";
    TAG_NAMES2["IMAGE"] = "image";
    TAG_NAMES2["INPUT"] = "input";
    TAG_NAMES2["IFRAME"] = "iframe";
    TAG_NAMES2["KEYGEN"] = "keygen";
    TAG_NAMES2["LABEL"] = "label";
    TAG_NAMES2["LI"] = "li";
    TAG_NAMES2["LINK"] = "link";
    TAG_NAMES2["LISTING"] = "listing";
    TAG_NAMES2["MAIN"] = "main";
    TAG_NAMES2["MALIGNMARK"] = "malignmark";
    TAG_NAMES2["MARQUEE"] = "marquee";
    TAG_NAMES2["MATH"] = "math";
    TAG_NAMES2["MENU"] = "menu";
    TAG_NAMES2["META"] = "meta";
    TAG_NAMES2["MGLYPH"] = "mglyph";
    TAG_NAMES2["MI"] = "mi";
    TAG_NAMES2["MO"] = "mo";
    TAG_NAMES2["MN"] = "mn";
    TAG_NAMES2["MS"] = "ms";
    TAG_NAMES2["MTEXT"] = "mtext";
    TAG_NAMES2["NAV"] = "nav";
    TAG_NAMES2["NOBR"] = "nobr";
    TAG_NAMES2["NOFRAMES"] = "noframes";
    TAG_NAMES2["NOEMBED"] = "noembed";
    TAG_NAMES2["NOSCRIPT"] = "noscript";
    TAG_NAMES2["OBJECT"] = "object";
    TAG_NAMES2["OL"] = "ol";
    TAG_NAMES2["OPTGROUP"] = "optgroup";
    TAG_NAMES2["OPTION"] = "option";
    TAG_NAMES2["P"] = "p";
    TAG_NAMES2["PARAM"] = "param";
    TAG_NAMES2["PLAINTEXT"] = "plaintext";
    TAG_NAMES2["PRE"] = "pre";
    TAG_NAMES2["RB"] = "rb";
    TAG_NAMES2["RP"] = "rp";
    TAG_NAMES2["RT"] = "rt";
    TAG_NAMES2["RTC"] = "rtc";
    TAG_NAMES2["RUBY"] = "ruby";
    TAG_NAMES2["S"] = "s";
    TAG_NAMES2["SCRIPT"] = "script";
    TAG_NAMES2["SEARCH"] = "search";
    TAG_NAMES2["SECTION"] = "section";
    TAG_NAMES2["SELECT"] = "select";
    TAG_NAMES2["SOURCE"] = "source";
    TAG_NAMES2["SMALL"] = "small";
    TAG_NAMES2["SPAN"] = "span";
    TAG_NAMES2["STRIKE"] = "strike";
    TAG_NAMES2["STRONG"] = "strong";
    TAG_NAMES2["STYLE"] = "style";
    TAG_NAMES2["SUB"] = "sub";
    TAG_NAMES2["SUMMARY"] = "summary";
    TAG_NAMES2["SUP"] = "sup";
    TAG_NAMES2["TABLE"] = "table";
    TAG_NAMES2["TBODY"] = "tbody";
    TAG_NAMES2["TEMPLATE"] = "template";
    TAG_NAMES2["TEXTAREA"] = "textarea";
    TAG_NAMES2["TFOOT"] = "tfoot";
    TAG_NAMES2["TD"] = "td";
    TAG_NAMES2["TH"] = "th";
    TAG_NAMES2["THEAD"] = "thead";
    TAG_NAMES2["TITLE"] = "title";
    TAG_NAMES2["TR"] = "tr";
    TAG_NAMES2["TRACK"] = "track";
    TAG_NAMES2["TT"] = "tt";
    TAG_NAMES2["U"] = "u";
    TAG_NAMES2["UL"] = "ul";
    TAG_NAMES2["SVG"] = "svg";
    TAG_NAMES2["VAR"] = "var";
    TAG_NAMES2["WBR"] = "wbr";
    TAG_NAMES2["XMP"] = "xmp";
  })(TAG_NAMES || (TAG_NAMES = {}));
  var TAG_ID;
  (function(TAG_ID2) {
    TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
    TAG_ID2[TAG_ID2["A"] = 1] = "A";
    TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
    TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
    TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
    TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
    TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
    TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
    TAG_ID2[TAG_ID2["B"] = 8] = "B";
    TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
    TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
    TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
    TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
    TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
    TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
    TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
    TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
    TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
    TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
    TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
    TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
    TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
    TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
    TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
    TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
    TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
    TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
    TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
    TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
    TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
    TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
    TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
    TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
    TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
    TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
    TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
    TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
    TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
    TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
    TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
    TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
    TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
    TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
    TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
    TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
    TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
    TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
    TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
    TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
    TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
    TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
    TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
    TAG_ID2[TAG_ID2["I"] = 52] = "I";
    TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
    TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
    TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
    TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
    TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
    TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
    TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
    TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
    TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
    TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
    TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
    TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
    TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
    TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
    TAG_ID2[TAG_ID2["META"] = 67] = "META";
    TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
    TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
    TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
    TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
    TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
    TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
    TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
    TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
    TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
    TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
    TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
    TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
    TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
    TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
    TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
    TAG_ID2[TAG_ID2["P"] = 83] = "P";
    TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
    TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
    TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
    TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
    TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
    TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
    TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
    TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
    TAG_ID2[TAG_ID2["S"] = 92] = "S";
    TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
    TAG_ID2[TAG_ID2["SEARCH"] = 94] = "SEARCH";
    TAG_ID2[TAG_ID2["SECTION"] = 95] = "SECTION";
    TAG_ID2[TAG_ID2["SELECT"] = 96] = "SELECT";
    TAG_ID2[TAG_ID2["SOURCE"] = 97] = "SOURCE";
    TAG_ID2[TAG_ID2["SMALL"] = 98] = "SMALL";
    TAG_ID2[TAG_ID2["SPAN"] = 99] = "SPAN";
    TAG_ID2[TAG_ID2["STRIKE"] = 100] = "STRIKE";
    TAG_ID2[TAG_ID2["STRONG"] = 101] = "STRONG";
    TAG_ID2[TAG_ID2["STYLE"] = 102] = "STYLE";
    TAG_ID2[TAG_ID2["SUB"] = 103] = "SUB";
    TAG_ID2[TAG_ID2["SUMMARY"] = 104] = "SUMMARY";
    TAG_ID2[TAG_ID2["SUP"] = 105] = "SUP";
    TAG_ID2[TAG_ID2["TABLE"] = 106] = "TABLE";
    TAG_ID2[TAG_ID2["TBODY"] = 107] = "TBODY";
    TAG_ID2[TAG_ID2["TEMPLATE"] = 108] = "TEMPLATE";
    TAG_ID2[TAG_ID2["TEXTAREA"] = 109] = "TEXTAREA";
    TAG_ID2[TAG_ID2["TFOOT"] = 110] = "TFOOT";
    TAG_ID2[TAG_ID2["TD"] = 111] = "TD";
    TAG_ID2[TAG_ID2["TH"] = 112] = "TH";
    TAG_ID2[TAG_ID2["THEAD"] = 113] = "THEAD";
    TAG_ID2[TAG_ID2["TITLE"] = 114] = "TITLE";
    TAG_ID2[TAG_ID2["TR"] = 115] = "TR";
    TAG_ID2[TAG_ID2["TRACK"] = 116] = "TRACK";
    TAG_ID2[TAG_ID2["TT"] = 117] = "TT";
    TAG_ID2[TAG_ID2["U"] = 118] = "U";
    TAG_ID2[TAG_ID2["UL"] = 119] = "UL";
    TAG_ID2[TAG_ID2["SVG"] = 120] = "SVG";
    TAG_ID2[TAG_ID2["VAR"] = 121] = "VAR";
    TAG_ID2[TAG_ID2["WBR"] = 122] = "WBR";
    TAG_ID2[TAG_ID2["XMP"] = 123] = "XMP";
  })(TAG_ID || (TAG_ID = {}));
  var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
    [TAG_NAMES.A, TAG_ID.A],
    [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
    [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
    [TAG_NAMES.APPLET, TAG_ID.APPLET],
    [TAG_NAMES.AREA, TAG_ID.AREA],
    [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
    [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
    [TAG_NAMES.B, TAG_ID.B],
    [TAG_NAMES.BASE, TAG_ID.BASE],
    [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
    [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
    [TAG_NAMES.BIG, TAG_ID.BIG],
    [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
    [TAG_NAMES.BODY, TAG_ID.BODY],
    [TAG_NAMES.BR, TAG_ID.BR],
    [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
    [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
    [TAG_NAMES.CENTER, TAG_ID.CENTER],
    [TAG_NAMES.CODE, TAG_ID.CODE],
    [TAG_NAMES.COL, TAG_ID.COL],
    [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
    [TAG_NAMES.DD, TAG_ID.DD],
    [TAG_NAMES.DESC, TAG_ID.DESC],
    [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
    [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
    [TAG_NAMES.DIR, TAG_ID.DIR],
    [TAG_NAMES.DIV, TAG_ID.DIV],
    [TAG_NAMES.DL, TAG_ID.DL],
    [TAG_NAMES.DT, TAG_ID.DT],
    [TAG_NAMES.EM, TAG_ID.EM],
    [TAG_NAMES.EMBED, TAG_ID.EMBED],
    [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
    [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
    [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
    [TAG_NAMES.FONT, TAG_ID.FONT],
    [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
    [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
    [TAG_NAMES.FORM, TAG_ID.FORM],
    [TAG_NAMES.FRAME, TAG_ID.FRAME],
    [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
    [TAG_NAMES.H1, TAG_ID.H1],
    [TAG_NAMES.H2, TAG_ID.H2],
    [TAG_NAMES.H3, TAG_ID.H3],
    [TAG_NAMES.H4, TAG_ID.H4],
    [TAG_NAMES.H5, TAG_ID.H5],
    [TAG_NAMES.H6, TAG_ID.H6],
    [TAG_NAMES.HEAD, TAG_ID.HEAD],
    [TAG_NAMES.HEADER, TAG_ID.HEADER],
    [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
    [TAG_NAMES.HR, TAG_ID.HR],
    [TAG_NAMES.HTML, TAG_ID.HTML],
    [TAG_NAMES.I, TAG_ID.I],
    [TAG_NAMES.IMG, TAG_ID.IMG],
    [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
    [TAG_NAMES.INPUT, TAG_ID.INPUT],
    [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
    [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
    [TAG_NAMES.LABEL, TAG_ID.LABEL],
    [TAG_NAMES.LI, TAG_ID.LI],
    [TAG_NAMES.LINK, TAG_ID.LINK],
    [TAG_NAMES.LISTING, TAG_ID.LISTING],
    [TAG_NAMES.MAIN, TAG_ID.MAIN],
    [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
    [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
    [TAG_NAMES.MATH, TAG_ID.MATH],
    [TAG_NAMES.MENU, TAG_ID.MENU],
    [TAG_NAMES.META, TAG_ID.META],
    [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
    [TAG_NAMES.MI, TAG_ID.MI],
    [TAG_NAMES.MO, TAG_ID.MO],
    [TAG_NAMES.MN, TAG_ID.MN],
    [TAG_NAMES.MS, TAG_ID.MS],
    [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
    [TAG_NAMES.NAV, TAG_ID.NAV],
    [TAG_NAMES.NOBR, TAG_ID.NOBR],
    [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
    [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
    [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
    [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
    [TAG_NAMES.OL, TAG_ID.OL],
    [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
    [TAG_NAMES.OPTION, TAG_ID.OPTION],
    [TAG_NAMES.P, TAG_ID.P],
    [TAG_NAMES.PARAM, TAG_ID.PARAM],
    [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
    [TAG_NAMES.PRE, TAG_ID.PRE],
    [TAG_NAMES.RB, TAG_ID.RB],
    [TAG_NAMES.RP, TAG_ID.RP],
    [TAG_NAMES.RT, TAG_ID.RT],
    [TAG_NAMES.RTC, TAG_ID.RTC],
    [TAG_NAMES.RUBY, TAG_ID.RUBY],
    [TAG_NAMES.S, TAG_ID.S],
    [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
    [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
    [TAG_NAMES.SECTION, TAG_ID.SECTION],
    [TAG_NAMES.SELECT, TAG_ID.SELECT],
    [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
    [TAG_NAMES.SMALL, TAG_ID.SMALL],
    [TAG_NAMES.SPAN, TAG_ID.SPAN],
    [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
    [TAG_NAMES.STRONG, TAG_ID.STRONG],
    [TAG_NAMES.STYLE, TAG_ID.STYLE],
    [TAG_NAMES.SUB, TAG_ID.SUB],
    [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
    [TAG_NAMES.SUP, TAG_ID.SUP],
    [TAG_NAMES.TABLE, TAG_ID.TABLE],
    [TAG_NAMES.TBODY, TAG_ID.TBODY],
    [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
    [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
    [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
    [TAG_NAMES.TD, TAG_ID.TD],
    [TAG_NAMES.TH, TAG_ID.TH],
    [TAG_NAMES.THEAD, TAG_ID.THEAD],
    [TAG_NAMES.TITLE, TAG_ID.TITLE],
    [TAG_NAMES.TR, TAG_ID.TR],
    [TAG_NAMES.TRACK, TAG_ID.TRACK],
    [TAG_NAMES.TT, TAG_ID.TT],
    [TAG_NAMES.U, TAG_ID.U],
    [TAG_NAMES.UL, TAG_ID.UL],
    [TAG_NAMES.SVG, TAG_ID.SVG],
    [TAG_NAMES.VAR, TAG_ID.VAR],
    [TAG_NAMES.WBR, TAG_ID.WBR],
    [TAG_NAMES.XMP, TAG_ID.XMP]
  ]);
  function getTagID(tagName) {
    var _a2;
    return (_a2 = TAG_NAME_TO_ID.get(tagName)) !== null && _a2 !== void 0 ? _a2 : TAG_ID.UNKNOWN;
  }
  var $ = TAG_ID;
  var SPECIAL_ELEMENTS = {
    [NS.HTML]: /* @__PURE__ */ new Set([
      $.ADDRESS,
      $.APPLET,
      $.AREA,
      $.ARTICLE,
      $.ASIDE,
      $.BASE,
      $.BASEFONT,
      $.BGSOUND,
      $.BLOCKQUOTE,
      $.BODY,
      $.BR,
      $.BUTTON,
      $.CAPTION,
      $.CENTER,
      $.COL,
      $.COLGROUP,
      $.DD,
      $.DETAILS,
      $.DIR,
      $.DIV,
      $.DL,
      $.DT,
      $.EMBED,
      $.FIELDSET,
      $.FIGCAPTION,
      $.FIGURE,
      $.FOOTER,
      $.FORM,
      $.FRAME,
      $.FRAMESET,
      $.H1,
      $.H2,
      $.H3,
      $.H4,
      $.H5,
      $.H6,
      $.HEAD,
      $.HEADER,
      $.HGROUP,
      $.HR,
      $.HTML,
      $.IFRAME,
      $.IMG,
      $.INPUT,
      $.LI,
      $.LINK,
      $.LISTING,
      $.MAIN,
      $.MARQUEE,
      $.MENU,
      $.META,
      $.NAV,
      $.NOEMBED,
      $.NOFRAMES,
      $.NOSCRIPT,
      $.OBJECT,
      $.OL,
      $.P,
      $.PARAM,
      $.PLAINTEXT,
      $.PRE,
      $.SCRIPT,
      $.SECTION,
      $.SELECT,
      $.SOURCE,
      $.STYLE,
      $.SUMMARY,
      $.TABLE,
      $.TBODY,
      $.TD,
      $.TEMPLATE,
      $.TEXTAREA,
      $.TFOOT,
      $.TH,
      $.THEAD,
      $.TITLE,
      $.TR,
      $.TRACK,
      $.UL,
      $.WBR,
      $.XMP
    ]),
    [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
    [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
    [NS.XLINK]: /* @__PURE__ */ new Set(),
    [NS.XML]: /* @__PURE__ */ new Set(),
    [NS.XMLNS]: /* @__PURE__ */ new Set()
  };
  var NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
  var UNESCAPED_TEXT = /* @__PURE__ */ new Set([
    TAG_NAMES.STYLE,
    TAG_NAMES.SCRIPT,
    TAG_NAMES.XMP,
    TAG_NAMES.IFRAME,
    TAG_NAMES.NOEMBED,
    TAG_NAMES.NOFRAMES,
    TAG_NAMES.PLAINTEXT
  ]);
  function hasUnescapedText(tn, scriptingEnabled) {
    return UNESCAPED_TEXT.has(tn) || scriptingEnabled && tn === TAG_NAMES.NOSCRIPT;
  }

  // node_modules/parse5/dist/tokenizer/index.js
  var State;
  (function(State3) {
    State3[State3["DATA"] = 0] = "DATA";
    State3[State3["RCDATA"] = 1] = "RCDATA";
    State3[State3["RAWTEXT"] = 2] = "RAWTEXT";
    State3[State3["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
    State3[State3["PLAINTEXT"] = 4] = "PLAINTEXT";
    State3[State3["TAG_OPEN"] = 5] = "TAG_OPEN";
    State3[State3["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
    State3[State3["TAG_NAME"] = 7] = "TAG_NAME";
    State3[State3["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
    State3[State3["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
    State3[State3["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
    State3[State3["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
    State3[State3["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
    State3[State3["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
    State3[State3["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
    State3[State3["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
    State3[State3["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
    State3[State3["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
    State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
    State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
    State3[State3["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
    State3[State3["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
    State3[State3["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
    State3[State3["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
    State3[State3["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
    State3[State3["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
    State3[State3["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
    State3[State3["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
    State3[State3["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
    State3[State3["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
    State3[State3["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
    State3[State3["COMMENT_START"] = 42] = "COMMENT_START";
    State3[State3["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
    State3[State3["COMMENT"] = 44] = "COMMENT";
    State3[State3["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
    State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
    State3[State3["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
    State3[State3["COMMENT_END"] = 50] = "COMMENT_END";
    State3[State3["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
    State3[State3["DOCTYPE"] = 52] = "DOCTYPE";
    State3[State3["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
    State3[State3["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
    State3[State3["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
    State3[State3["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
    State3[State3["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
    State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
    State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
    State3[State3["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
    State3[State3["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
    State3[State3["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
    State3[State3["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
    State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
    State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
    State3[State3["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
    State3[State3["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
    State3[State3["CDATA_SECTION"] = 68] = "CDATA_SECTION";
    State3[State3["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
    State3[State3["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
    State3[State3["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
    State3[State3["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
  })(State || (State = {}));
  var TokenizerMode = {
    DATA: State.DATA,
    RCDATA: State.RCDATA,
    RAWTEXT: State.RAWTEXT,
    SCRIPT_DATA: State.SCRIPT_DATA,
    PLAINTEXT: State.PLAINTEXT,
    CDATA_SECTION: State.CDATA_SECTION
  };
  function isAsciiDigit(cp) {
    return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
    return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
    return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
    return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric2(cp) {
    return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
    return cp + 32;
  }
  function isWhitespace2(cp) {
    return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
    return isWhitespace2(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code) {
    if (code === CODE_POINTS.NULL) {
      return ERR.nullCharacterReference;
    } else if (code > 1114111) {
      return ERR.characterReferenceOutsideUnicodeRange;
    } else if (isSurrogate(code)) {
      return ERR.surrogateCharacterReference;
    } else if (isUndefinedCodePoint(code)) {
      return ERR.noncharacterCharacterReference;
    } else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) {
      return ERR.controlCharacterReference;
    }
    return null;
  }
  var Tokenizer = class {
    constructor(options, handler) {
      this.options = options;
      this.handler = handler;
      this.paused = false;
      this.inLoop = false;
      this.inForeignNode = false;
      this.lastStartTagName = "";
      this.active = false;
      this.state = State.DATA;
      this.returnState = State.DATA;
      this.entityStartPos = 0;
      this.consumedAfterSnapshot = -1;
      this.currentCharacterToken = null;
      this.currentToken = null;
      this.currentAttr = { name: "", value: "" };
      this.preprocessor = new Preprocessor(handler);
      this.currentLocation = this.getCurrentLocation(-1);
      this.entityDecoder = new EntityDecoder(decode_data_html_default, (cp, consumed) => {
        this.preprocessor.pos = this.entityStartPos + consumed - 1;
        this._flushCodePointConsumedAsCharacterReference(cp);
      }, handler.onParseError ? {
        missingSemicolonAfterCharacterReference: () => {
          this._err(ERR.missingSemicolonAfterCharacterReference, 1);
        },
        absenceOfDigitsInNumericCharacterReference: (consumed) => {
          this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
        },
        validateNumericCharacterReference: (code) => {
          const error = getErrorForNumericCharacterReference(code);
          if (error)
            this._err(error, 1);
        }
      } : void 0);
    }
    //Errors
    _err(code, cpOffset = 0) {
      var _a2, _b;
      (_b = (_a2 = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a2, this.preprocessor.getError(code, cpOffset));
    }
    // NOTE: `offset` may never run across line boundaries.
    getCurrentLocation(offset) {
      if (!this.options.sourceCodeLocationInfo) {
        return null;
      }
      return {
        startLine: this.preprocessor.line,
        startCol: this.preprocessor.col - offset,
        startOffset: this.preprocessor.offset - offset,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
    }
    _runParsingLoop() {
      if (this.inLoop)
        return;
      this.inLoop = true;
      while (this.active && !this.paused) {
        this.consumedAfterSnapshot = 0;
        const cp = this._consume();
        if (!this._ensureHibernation()) {
          this._callState(cp);
        }
      }
      this.inLoop = false;
    }
    //API
    pause() {
      this.paused = true;
    }
    resume(writeCallback) {
      if (!this.paused) {
        throw new Error("Parser was already resumed");
      }
      this.paused = false;
      if (this.inLoop)
        return;
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    write(chunk, isLastChunk, writeCallback) {
      this.active = true;
      this.preprocessor.write(chunk, isLastChunk);
      this._runParsingLoop();
      if (!this.paused) {
        writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
      }
    }
    insertHtmlAtCurrentPos(chunk) {
      this.active = true;
      this.preprocessor.insertHtmlAtCurrentPos(chunk);
      this._runParsingLoop();
    }
    //Hibernation
    _ensureHibernation() {
      if (this.preprocessor.endOfChunkHit) {
        this.preprocessor.retreat(this.consumedAfterSnapshot);
        this.consumedAfterSnapshot = 0;
        this.active = false;
        return true;
      }
      return false;
    }
    //Consumption
    _consume() {
      this.consumedAfterSnapshot++;
      return this.preprocessor.advance();
    }
    _advanceBy(count) {
      this.consumedAfterSnapshot += count;
      for (let i = 0; i < count; i++) {
        this.preprocessor.advance();
      }
    }
    _consumeSequenceIfMatch(pattern, caseSensitive) {
      if (this.preprocessor.startsWith(pattern, caseSensitive)) {
        this._advanceBy(pattern.length - 1);
        return true;
      }
      return false;
    }
    //Token creation
    _createStartTagToken() {
      this.currentToken = {
        type: TokenType.START_TAG,
        tagName: "",
        tagID: TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(1)
      };
    }
    _createEndTagToken() {
      this.currentToken = {
        type: TokenType.END_TAG,
        tagName: "",
        tagID: TAG_ID.UNKNOWN,
        selfClosing: false,
        ackSelfClosing: false,
        attrs: [],
        location: this.getCurrentLocation(2)
      };
    }
    _createCommentToken(offset) {
      this.currentToken = {
        type: TokenType.COMMENT,
        data: "",
        location: this.getCurrentLocation(offset)
      };
    }
    _createDoctypeToken(initialName) {
      this.currentToken = {
        type: TokenType.DOCTYPE,
        name: initialName,
        forceQuirks: false,
        publicId: null,
        systemId: null,
        location: this.currentLocation
      };
    }
    _createCharacterToken(type, chars) {
      this.currentCharacterToken = {
        type,
        chars,
        location: this.currentLocation
      };
    }
    //Tag attributes
    _createAttr(attrNameFirstCh) {
      this.currentAttr = {
        name: attrNameFirstCh,
        value: ""
      };
      this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
      var _a2;
      var _b;
      const token = this.currentToken;
      if (getTokenAttr(token, this.currentAttr.name) === null) {
        token.attrs.push(this.currentAttr);
        if (token.location && this.currentLocation) {
          const attrLocations = (_a2 = (_b = token.location).attrs) !== null && _a2 !== void 0 ? _a2 : _b.attrs = /* @__PURE__ */ Object.create(null);
          attrLocations[this.currentAttr.name] = this.currentLocation;
          this._leaveAttrValue();
        }
      } else {
        this._err(ERR.duplicateAttribute);
      }
    }
    _leaveAttrValue() {
      if (this.currentLocation) {
        this.currentLocation.endLine = this.preprocessor.line;
        this.currentLocation.endCol = this.preprocessor.col;
        this.currentLocation.endOffset = this.preprocessor.offset;
      }
    }
    //Token emission
    prepareToken(ct) {
      this._emitCurrentCharacterToken(ct.location);
      this.currentToken = null;
      if (ct.location) {
        ct.location.endLine = this.preprocessor.line;
        ct.location.endCol = this.preprocessor.col + 1;
        ct.location.endOffset = this.preprocessor.offset + 1;
      }
      this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
      const ct = this.currentToken;
      this.prepareToken(ct);
      ct.tagID = getTagID(ct.tagName);
      if (ct.type === TokenType.START_TAG) {
        this.lastStartTagName = ct.tagName;
        this.handler.onStartTag(ct);
      } else {
        if (ct.attrs.length > 0) {
          this._err(ERR.endTagWithAttributes);
        }
        if (ct.selfClosing) {
          this._err(ERR.endTagWithTrailingSolidus);
        }
        this.handler.onEndTag(ct);
      }
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(ct) {
      this.prepareToken(ct);
      this.handler.onComment(ct);
      this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(ct) {
      this.prepareToken(ct);
      this.handler.onDoctype(ct);
      this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(nextLocation) {
      if (this.currentCharacterToken) {
        if (nextLocation && this.currentCharacterToken.location) {
          this.currentCharacterToken.location.endLine = nextLocation.startLine;
          this.currentCharacterToken.location.endCol = nextLocation.startCol;
          this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
        }
        switch (this.currentCharacterToken.type) {
          case TokenType.CHARACTER: {
            this.handler.onCharacter(this.currentCharacterToken);
            break;
          }
          case TokenType.NULL_CHARACTER: {
            this.handler.onNullCharacter(this.currentCharacterToken);
            break;
          }
          case TokenType.WHITESPACE_CHARACTER: {
            this.handler.onWhitespaceCharacter(this.currentCharacterToken);
            break;
          }
        }
        this.currentCharacterToken = null;
      }
    }
    _emitEOFToken() {
      const location = this.getCurrentLocation(0);
      if (location) {
        location.endLine = location.startLine;
        location.endCol = location.startCol;
        location.endOffset = location.startOffset;
      }
      this._emitCurrentCharacterToken(location);
      this.handler.onEof({ type: TokenType.EOF, location });
      this.active = false;
    }
    //Characters emission
    //OPTIMIZATION: The specification uses only one type of character token (one token per character).
    //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
    //If we have a sequence of characters that belong to the same group, the parser can process it
    //as a single solid character token.
    //So, there are 3 types of character tokens in parse5:
    //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
    //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
    //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
    _appendCharToCurrentCharacterToken(type, ch) {
      if (this.currentCharacterToken) {
        if (this.currentCharacterToken.type === type) {
          this.currentCharacterToken.chars += ch;
          return;
        } else {
          this.currentLocation = this.getCurrentLocation(0);
          this._emitCurrentCharacterToken(this.currentLocation);
          this.preprocessor.dropParsedChunk();
        }
      }
      this._createCharacterToken(type, ch);
    }
    _emitCodePoint(cp) {
      const type = isWhitespace2(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
      this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
    }
    //NOTE: used when we emit characters explicitly.
    //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
    _emitChars(ch) {
      this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
    }
    // Character reference helpers
    _startCharacterReference() {
      this.returnState = this.state;
      this.state = State.CHARACTER_REFERENCE;
      this.entityStartPos = this.preprocessor.pos;
      this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
    }
    _flushCodePointConsumedAsCharacterReference(cp) {
      if (this._isCharacterReferenceInAttribute()) {
        this.currentAttr.value += String.fromCodePoint(cp);
      } else {
        this._emitCodePoint(cp);
      }
    }
    // Calling states this way turns out to be much faster than any other approach.
    _callState(cp) {
      switch (this.state) {
        case State.DATA: {
          this._stateData(cp);
          break;
        }
        case State.RCDATA: {
          this._stateRcdata(cp);
          break;
        }
        case State.RAWTEXT: {
          this._stateRawtext(cp);
          break;
        }
        case State.SCRIPT_DATA: {
          this._stateScriptData(cp);
          break;
        }
        case State.PLAINTEXT: {
          this._statePlaintext(cp);
          break;
        }
        case State.TAG_OPEN: {
          this._stateTagOpen(cp);
          break;
        }
        case State.END_TAG_OPEN: {
          this._stateEndTagOpen(cp);
          break;
        }
        case State.TAG_NAME: {
          this._stateTagName(cp);
          break;
        }
        case State.RCDATA_LESS_THAN_SIGN: {
          this._stateRcdataLessThanSign(cp);
          break;
        }
        case State.RCDATA_END_TAG_OPEN: {
          this._stateRcdataEndTagOpen(cp);
          break;
        }
        case State.RCDATA_END_TAG_NAME: {
          this._stateRcdataEndTagName(cp);
          break;
        }
        case State.RAWTEXT_LESS_THAN_SIGN: {
          this._stateRawtextLessThanSign(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_OPEN: {
          this._stateRawtextEndTagOpen(cp);
          break;
        }
        case State.RAWTEXT_END_TAG_NAME: {
          this._stateRawtextEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_LESS_THAN_SIGN: {
          this._stateScriptDataLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_OPEN: {
          this._stateScriptDataEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_END_TAG_NAME: {
          this._stateScriptDataEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START: {
          this._stateScriptDataEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPE_START_DASH: {
          this._stateScriptDataEscapeStartDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED: {
          this._stateScriptDataEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH: {
          this._stateScriptDataEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
          this._stateScriptDataEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
          this._stateScriptDataEscapedEndTagOpen(cp);
          break;
        }
        case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
          this._stateScriptDataEscapedEndTagName(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
          this._stateScriptDataDoubleEscapeStart(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
          this._stateScriptDataDoubleEscaped(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
          this._stateScriptDataDoubleEscapedDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
          this._stateScriptDataDoubleEscapedDashDash(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataDoubleEscapedLessThanSign(cp);
          break;
        }
        case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
          this._stateScriptDataDoubleEscapeEnd(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_NAME: {
          this._stateBeforeAttributeName(cp);
          break;
        }
        case State.ATTRIBUTE_NAME: {
          this._stateAttributeName(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_NAME: {
          this._stateAfterAttributeName(cp);
          break;
        }
        case State.BEFORE_ATTRIBUTE_VALUE: {
          this._stateBeforeAttributeValue(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
          this._stateAttributeValueDoubleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
          this._stateAttributeValueSingleQuoted(cp);
          break;
        }
        case State.ATTRIBUTE_VALUE_UNQUOTED: {
          this._stateAttributeValueUnquoted(cp);
          break;
        }
        case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
          this._stateAfterAttributeValueQuoted(cp);
          break;
        }
        case State.SELF_CLOSING_START_TAG: {
          this._stateSelfClosingStartTag(cp);
          break;
        }
        case State.BOGUS_COMMENT: {
          this._stateBogusComment(cp);
          break;
        }
        case State.MARKUP_DECLARATION_OPEN: {
          this._stateMarkupDeclarationOpen(cp);
          break;
        }
        case State.COMMENT_START: {
          this._stateCommentStart(cp);
          break;
        }
        case State.COMMENT_START_DASH: {
          this._stateCommentStartDash(cp);
          break;
        }
        case State.COMMENT: {
          this._stateComment(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN: {
          this._stateCommentLessThanSign(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG: {
          this._stateCommentLessThanSignBang(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
          this._stateCommentLessThanSignBangDash(cp);
          break;
        }
        case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
          this._stateCommentLessThanSignBangDashDash(cp);
          break;
        }
        case State.COMMENT_END_DASH: {
          this._stateCommentEndDash(cp);
          break;
        }
        case State.COMMENT_END: {
          this._stateCommentEnd(cp);
          break;
        }
        case State.COMMENT_END_BANG: {
          this._stateCommentEndBang(cp);
          break;
        }
        case State.DOCTYPE: {
          this._stateDoctype(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_NAME: {
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case State.DOCTYPE_NAME: {
          this._stateDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_NAME: {
          this._stateAfterDoctypeName(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
          this._stateAfterDoctypePublicKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateBeforeDoctypePublicIdentifier(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypePublicIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypePublicIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateAfterDoctypePublicIdentifier(cp);
          break;
        }
        case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
          this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
          this._stateAfterDoctypeSystemKeyword(cp);
          break;
        }
        case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateBeforeDoctypeSystemIdentifier(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
          break;
        }
        case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypeSystemIdentifierSingleQuoted(cp);
          break;
        }
        case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateAfterDoctypeSystemIdentifier(cp);
          break;
        }
        case State.BOGUS_DOCTYPE: {
          this._stateBogusDoctype(cp);
          break;
        }
        case State.CDATA_SECTION: {
          this._stateCdataSection(cp);
          break;
        }
        case State.CDATA_SECTION_BRACKET: {
          this._stateCdataSectionBracket(cp);
          break;
        }
        case State.CDATA_SECTION_END: {
          this._stateCdataSectionEnd(cp);
          break;
        }
        case State.CHARACTER_REFERENCE: {
          this._stateCharacterReference();
          break;
        }
        case State.AMBIGUOUS_AMPERSAND: {
          this._stateAmbiguousAmpersand(cp);
          break;
        }
        default: {
          throw new Error("Unknown state");
        }
      }
    }
    // State machine
    // Data state
    //------------------------------------------------------------------
    _stateData(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.TAG_OPEN;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitCodePoint(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    //  RCDATA state
    //------------------------------------------------------------------
    _stateRcdata(cp) {
      switch (cp) {
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RCDATA_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // RAWTEXT state
    //------------------------------------------------------------------
    _stateRawtext(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.RAWTEXT_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data state
    //------------------------------------------------------------------
    _stateScriptData(cp) {
      switch (cp) {
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // PLAINTEXT state
    //------------------------------------------------------------------
    _statePlaintext(cp) {
      switch (cp) {
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Tag open state
    //------------------------------------------------------------------
    _stateTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createStartTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case CODE_POINTS.EXCLAMATION_MARK: {
            this.state = State.MARKUP_DECLARATION_OPEN;
            break;
          }
          case CODE_POINTS.SOLIDUS: {
            this.state = State.END_TAG_OPEN;
            break;
          }
          case CODE_POINTS.QUESTION_MARK: {
            this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
            this._createCommentToken(1);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofBeforeTagName);
            this._emitChars("<");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(ERR.invalidFirstCharacterOfTagName);
            this._emitChars("<");
            this.state = State.DATA;
            this._stateData(cp);
          }
        }
    }
    // End tag open state
    //------------------------------------------------------------------
    _stateEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this.state = State.TAG_NAME;
        this._stateTagName(cp);
      } else
        switch (cp) {
          case CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(ERR.missingEndTagName);
            this.state = State.DATA;
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofBeforeTagName);
            this._emitChars("</");
            this._emitEOFToken();
            break;
          }
          default: {
            this._err(ERR.invalidFirstCharacterOfTagName);
            this._createCommentToken(2);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
          }
        }
    }
    // Tag name state
    //------------------------------------------------------------------
    _stateTagName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.tagName += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // RCDATA less-than sign state
    //------------------------------------------------------------------
    _stateRcdataLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.RCDATA_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RCDATA end tag open state
    //------------------------------------------------------------------
    _stateRcdataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RCDATA_END_TAG_NAME;
        this._stateRcdataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    handleSpecialEndTag(_cp) {
      if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
        return !this._ensureHibernation();
      }
      this._createEndTagToken();
      const token = this.currentToken;
      token.tagName = this.lastStartTagName;
      const cp = this.preprocessor.peek(this.lastStartTagName.length);
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          return false;
        }
        case CODE_POINTS.SOLIDUS: {
          this._advanceBy(this.lastStartTagName.length);
          this.state = State.SELF_CLOSING_START_TAG;
          return false;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._advanceBy(this.lastStartTagName.length);
          this.emitCurrentTagToken();
          this.state = State.DATA;
          return false;
        }
        default: {
          return !this._ensureHibernation();
        }
      }
    }
    // RCDATA end tag name state
    //------------------------------------------------------------------
    _stateRcdataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RCDATA;
        this._stateRcdata(cp);
      }
    }
    // RAWTEXT less-than sign state
    //------------------------------------------------------------------
    _stateRawtextLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.RAWTEXT_END_TAG_OPEN;
      } else {
        this._emitChars("<");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag open state
    //------------------------------------------------------------------
    _stateRawtextEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.RAWTEXT_END_TAG_NAME;
        this._stateRawtextEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // RAWTEXT end tag name state
    //------------------------------------------------------------------
    _stateRawtextEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.RAWTEXT;
        this._stateRawtext(cp);
      }
    }
    // Script data less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataLessThanSign(cp) {
      switch (cp) {
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SCRIPT_DATA_END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.SCRIPT_DATA_ESCAPE_START;
          this._emitChars("<!");
          break;
        }
        default: {
          this._emitChars("<");
          this.state = State.SCRIPT_DATA;
          this._stateScriptData(cp);
        }
      }
    }
    // Script data end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_END_TAG_NAME;
        this._stateScriptDataEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStart(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escape start dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapeStartDash(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
      } else {
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
    // Script data escaped state
    //------------------------------------------------------------------
    _stateScriptDataEscaped(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataEscapedDashDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataEscapedLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
      } else if (isAsciiLetter(cp)) {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
        this._stateScriptDataDoubleEscapeStart(cp);
      } else {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag open state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagOpen(cp) {
      if (isAsciiLetter(cp)) {
        this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
        this._stateScriptDataEscapedEndTagName(cp);
      } else {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data escaped end tag name state
    //------------------------------------------------------------------
    _stateScriptDataEscapedEndTagName(cp) {
      if (this.handleSpecialEndTag(cp)) {
        this._emitChars("</");
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escape start state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeStart(cp) {
      if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._stateScriptDataEscaped(cp);
      }
    }
    // Script data double escaped state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscaped(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped dash dash state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedDashDash(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
          this._emitChars("<");
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.SCRIPT_DATA;
          this._emitChars(">");
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitChars(REPLACEMENT_CHARACTER);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
          break;
        }
        default: {
          this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          this._emitCodePoint(cp);
        }
      }
    }
    // Script data double escaped less-than sign state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapedLessThanSign(cp) {
      if (cp === CODE_POINTS.SOLIDUS) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
        this._emitChars("/");
      } else {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Script data double escape end state
    //------------------------------------------------------------------
    _stateScriptDataDoubleEscapeEnd(cp) {
      if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
        this._emitCodePoint(cp);
        for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
          this._emitCodePoint(this._consume());
        }
        this.state = State.SCRIPT_DATA_ESCAPED;
      } else if (!this._ensureHibernation()) {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._stateScriptDataDoubleEscaped(cp);
      }
    }
    // Before attribute name state
    //------------------------------------------------------------------
    _stateBeforeAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.SOLIDUS:
        case CODE_POINTS.GREATER_THAN_SIGN:
        case CODE_POINTS.EOF: {
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
          this._createAttr("=");
          this.state = State.ATTRIBUTE_NAME;
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Attribute name state
    //------------------------------------------------------------------
    _stateAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED:
        case CODE_POINTS.SOLIDUS:
        case CODE_POINTS.GREATER_THAN_SIGN:
        case CODE_POINTS.EOF: {
          this._leaveAttrName();
          this.state = State.AFTER_ATTRIBUTE_NAME;
          this._stateAfterAttributeName(cp);
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this._leaveAttrName();
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK:
        case CODE_POINTS.APOSTROPHE:
        case CODE_POINTS.LESS_THAN_SIGN: {
          this._err(ERR.unexpectedCharacterInAttributeName);
          this.currentAttr.name += String.fromCodePoint(cp);
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.name += REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After attribute name state
    //------------------------------------------------------------------
    _stateAfterAttributeName(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.EQUALS_SIGN: {
          this.state = State.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createAttr("");
          this.state = State.ATTRIBUTE_NAME;
          this._stateAttributeName(cp);
        }
      }
    }
    // Before attribute value state
    //------------------------------------------------------------------
    _stateBeforeAttributeValue(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingAttributeValue);
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        default: {
          this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
          this._stateAttributeValueUnquoted(cp);
        }
      }
    }
    // Attribute value (double-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueDoubleQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (single-quoted) state
    //------------------------------------------------------------------
    _stateAttributeValueSingleQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // Attribute value (unquoted) state
    //------------------------------------------------------------------
    _stateAttributeValueUnquoted(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK:
        case CODE_POINTS.APOSTROPHE:
        case CODE_POINTS.LESS_THAN_SIGN:
        case CODE_POINTS.EQUALS_SIGN:
        case CODE_POINTS.GRAVE_ACCENT: {
          this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
          this.currentAttr.value += String.fromCodePoint(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this.currentAttr.value += String.fromCodePoint(cp);
        }
      }
    }
    // After attribute value (quoted) state
    //------------------------------------------------------------------
    _stateAfterAttributeValueQuoted(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this._leaveAttrValue();
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this._leaveAttrValue();
          this.state = State.SELF_CLOSING_START_TAG;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._leaveAttrValue();
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingWhitespaceBetweenAttributes);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Self-closing start tag state
    //------------------------------------------------------------------
    _stateSelfClosingStartTag(cp) {
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          const token = this.currentToken;
          token.selfClosing = true;
          this.state = State.DATA;
          this.emitCurrentTagToken();
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.unexpectedSolidusInTag);
          this.state = State.BEFORE_ATTRIBUTE_NAME;
          this._stateBeforeAttributeName(cp);
        }
      }
    }
    // Bogus comment state
    //------------------------------------------------------------------
    _stateBogusComment(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.data += REPLACEMENT_CHARACTER;
          break;
        }
        default: {
          token.data += String.fromCodePoint(cp);
        }
      }
    }
    // Markup declaration open state
    //------------------------------------------------------------------
    _stateMarkupDeclarationOpen(cp) {
      if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
        this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
        this.state = State.COMMENT_START;
      } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
        this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
        this.state = State.DOCTYPE;
      } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
        if (this.inForeignNode) {
          this.state = State.CDATA_SECTION;
        } else {
          this._err(ERR.cdataInHtmlContent);
          this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
          this.currentToken.data = "[CDATA[";
          this.state = State.BOGUS_COMMENT;
        }
      } else if (!this._ensureHibernation()) {
        this._err(ERR.incorrectlyOpenedComment);
        this._createCommentToken(2);
        this.state = State.BOGUS_COMMENT;
        this._stateBogusComment(cp);
      }
    }
    // Comment start state
    //------------------------------------------------------------------
    _stateCommentStart(cp) {
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_START_DASH;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          const token = this.currentToken;
          this.emitCurrentComment(token);
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment start dash state
    //------------------------------------------------------------------
    _stateCommentStartDash(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment state
    //------------------------------------------------------------------
    _stateComment(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          token.data += "<";
          this.state = State.COMMENT_LESS_THAN_SIGN;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.data += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += String.fromCodePoint(cp);
        }
      }
    }
    // Comment less-than sign state
    //------------------------------------------------------------------
    _stateCommentLessThanSign(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          token.data += "!";
          this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
          break;
        }
        case CODE_POINTS.LESS_THAN_SIGN: {
          token.data += "<";
          break;
        }
        default: {
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment less-than sign bang state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBang(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
      } else {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
    // Comment less-than sign bang dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDash(cp) {
      if (cp === CODE_POINTS.HYPHEN_MINUS) {
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
      } else {
        this.state = State.COMMENT_END_DASH;
        this._stateCommentEndDash(cp);
      }
    }
    // Comment less-than sign bang dash dash state
    //------------------------------------------------------------------
    _stateCommentLessThanSignBangDashDash(cp) {
      if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
        this._err(ERR.nestedComment);
      }
      this.state = State.COMMENT_END;
      this._stateCommentEnd(cp);
    }
    // Comment end dash state
    //------------------------------------------------------------------
    _stateCommentEndDash(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          this.state = State.COMMENT_END;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "-";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end state
    //------------------------------------------------------------------
    _stateCommentEnd(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.COMMENT_END_BANG;
          break;
        }
        case CODE_POINTS.HYPHEN_MINUS: {
          token.data += "-";
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "--";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // Comment end bang state
    //------------------------------------------------------------------
    _stateCommentEndBang(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.HYPHEN_MINUS: {
          token.data += "--!";
          this.state = State.COMMENT_END_DASH;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.incorrectlyClosedComment);
          this.state = State.DATA;
          this.emitCurrentComment(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInComment);
          this.emitCurrentComment(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.data += "--!";
          this.state = State.COMMENT;
          this._stateComment(cp);
        }
      }
    }
    // DOCTYPE state
    //------------------------------------------------------------------
    _stateDoctype(cp) {
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingWhitespaceBeforeDoctypeName);
          this.state = State.BEFORE_DOCTYPE_NAME;
          this._stateBeforeDoctypeName(cp);
        }
      }
    }
    // Before DOCTYPE name state
    //------------------------------------------------------------------
    _stateBeforeDoctypeName(cp) {
      if (isAsciiUpper(cp)) {
        this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
        this.state = State.DOCTYPE_NAME;
      } else
        switch (cp) {
          case CODE_POINTS.SPACE:
          case CODE_POINTS.LINE_FEED:
          case CODE_POINTS.TABULATION:
          case CODE_POINTS.FORM_FEED: {
            break;
          }
          case CODE_POINTS.NULL: {
            this._err(ERR.unexpectedNullCharacter);
            this._createDoctypeToken(REPLACEMENT_CHARACTER);
            this.state = State.DOCTYPE_NAME;
            break;
          }
          case CODE_POINTS.GREATER_THAN_SIGN: {
            this._err(ERR.missingDoctypeName);
            this._createDoctypeToken(null);
            const token = this.currentToken;
            token.forceQuirks = true;
            this.emitCurrentDoctype(token);
            this.state = State.DATA;
            break;
          }
          case CODE_POINTS.EOF: {
            this._err(ERR.eofInDoctype);
            this._createDoctypeToken(null);
            const token = this.currentToken;
            token.forceQuirks = true;
            this.emitCurrentDoctype(token);
            this._emitEOFToken();
            break;
          }
          default: {
            this._createDoctypeToken(String.fromCodePoint(cp));
            this.state = State.DOCTYPE_NAME;
          }
        }
    }
    // DOCTYPE name state
    //------------------------------------------------------------------
    _stateDoctypeName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.AFTER_DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.name += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
        }
      }
    }
    // After DOCTYPE name state
    //------------------------------------------------------------------
    _stateAfterDoctypeName(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
            this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
          } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
            this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
          } else if (!this._ensureHibernation()) {
            this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
            token.forceQuirks = true;
            this.state = State.BOGUS_DOCTYPE;
            this._stateBogusDoctype(cp);
          }
        }
      }
    }
    // After DOCTYPE public keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicKeyword(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypePublicIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.publicId = "";
          this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE public identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierDoubleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.publicId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE public identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypePublicIdentifierSingleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.publicId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypePublicIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.publicId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE public identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypePublicIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Between DOCTYPE public and system identifiers state
    //------------------------------------------------------------------
    _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // After DOCTYPE system keyword state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemKeyword(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Before DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateBeforeDoctypeSystemIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.QUOTATION_MARK: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case CODE_POINTS.APOSTROPHE: {
          token.systemId = "";
          this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.DATA;
          this.emitCurrentDoctype(token);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // DOCTYPE system identifier (double-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.QUOTATION_MARK: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.systemId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // DOCTYPE system identifier (single-quoted) state
    //------------------------------------------------------------------
    _stateDoctypeSystemIdentifierSingleQuoted(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.APOSTROPHE: {
          this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          token.systemId += REPLACEMENT_CHARACTER;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          token.systemId += String.fromCodePoint(cp);
        }
      }
    }
    // After DOCTYPE system identifier state
    //------------------------------------------------------------------
    _stateAfterDoctypeSystemIdentifier(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
    // Bogus DOCTYPE state
    //------------------------------------------------------------------
    _stateBogusDoctype(cp) {
      const token = this.currentToken;
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          break;
        }
        case CODE_POINTS.EOF: {
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default:
      }
    }
    // CDATA section state
    //------------------------------------------------------------------
    _stateCdataSection(cp) {
      switch (cp) {
        case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this.state = State.CDATA_SECTION_BRACKET;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInCdata);
          this._emitEOFToken();
          break;
        }
        default: {
          this._emitCodePoint(cp);
        }
      }
    }
    // CDATA section bracket state
    //------------------------------------------------------------------
    _stateCdataSectionBracket(cp) {
      if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
        this.state = State.CDATA_SECTION_END;
      } else {
        this._emitChars("]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
    // CDATA section end state
    //------------------------------------------------------------------
    _stateCdataSectionEnd(cp) {
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
          this._emitChars("]");
          break;
        }
        default: {
          this._emitChars("]]");
          this.state = State.CDATA_SECTION;
          this._stateCdataSection(cp);
        }
      }
    }
    // Character reference state
    //------------------------------------------------------------------
    _stateCharacterReference() {
      let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
      if (length < 0) {
        if (this.preprocessor.lastChunkWritten) {
          length = this.entityDecoder.end();
        } else {
          this.active = false;
          this.preprocessor.pos = this.preprocessor.html.length - 1;
          this.consumedAfterSnapshot = 0;
          this.preprocessor.endOfChunkHit = true;
          return;
        }
      }
      if (length === 0) {
        this.preprocessor.pos = this.entityStartPos;
        this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
        this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
      } else {
        this.state = this.returnState;
      }
    }
    // Ambiguos ampersand state
    //------------------------------------------------------------------
    _stateAmbiguousAmpersand(cp) {
      if (isAsciiAlphaNumeric2(cp)) {
        this._flushCodePointConsumedAsCharacterReference(cp);
      } else {
        if (cp === CODE_POINTS.SEMICOLON) {
          this._err(ERR.unknownNamedCharacterReference);
        }
        this.state = this.returnState;
        this._callState(cp);
      }
    }
  };

  // node_modules/parse5/dist/parser/open-element-stack.js
  init_buffer();
  var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
  var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
    ...IMPLICIT_END_TAG_REQUIRED,
    TAG_ID.CAPTION,
    TAG_ID.COLGROUP,
    TAG_ID.TBODY,
    TAG_ID.TD,
    TAG_ID.TFOOT,
    TAG_ID.TH,
    TAG_ID.THEAD,
    TAG_ID.TR
  ]);
  var SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
    TAG_ID.APPLET,
    TAG_ID.CAPTION,
    TAG_ID.HTML,
    TAG_ID.MARQUEE,
    TAG_ID.OBJECT,
    TAG_ID.TABLE,
    TAG_ID.TD,
    TAG_ID.TEMPLATE,
    TAG_ID.TH
  ]);
  var SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
  var SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
  var SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
  var SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
  var TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
  var TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
  var OpenElementStack = class {
    get currentTmplContentOrNode() {
      return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    constructor(document, treeAdapter, handler) {
      this.treeAdapter = treeAdapter;
      this.handler = handler;
      this.items = [];
      this.tagIDs = [];
      this.stackTop = -1;
      this.tmplCount = 0;
      this.currentTagId = TAG_ID.UNKNOWN;
      this.current = document;
    }
    //Index of element
    _indexOf(element) {
      return this.items.lastIndexOf(element, this.stackTop);
    }
    //Update current element
    _isInTemplate() {
      return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop];
      this.currentTagId = this.tagIDs[this.stackTop];
    }
    //Mutations
    push(element, tagID) {
      this.stackTop++;
      this.items[this.stackTop] = element;
      this.current = element;
      this.tagIDs[this.stackTop] = tagID;
      this.currentTagId = tagID;
      if (this._isInTemplate()) {
        this.tmplCount++;
      }
      this.handler.onItemPush(element, tagID, true);
    }
    pop() {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount--;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, true);
    }
    replace(oldElement, newElement) {
      const idx = this._indexOf(oldElement);
      this.items[idx] = newElement;
      if (idx === this.stackTop) {
        this.current = newElement;
      }
    }
    insertAfter(referenceElement, newElement, newElementID) {
      const insertionIdx = this._indexOf(referenceElement) + 1;
      this.items.splice(insertionIdx, 0, newElement);
      this.tagIDs.splice(insertionIdx, 0, newElementID);
      this.stackTop++;
      if (insertionIdx === this.stackTop) {
        this._updateCurrentElement();
      }
      this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
    }
    popUntilTagNamePopped(tagName) {
      let targetIdx = this.stackTop + 1;
      do {
        targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
      } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
      this.shortenToLength(targetIdx < 0 ? 0 : targetIdx);
    }
    shortenToLength(idx) {
      while (this.stackTop >= idx) {
        const popped = this.current;
        if (this.tmplCount > 0 && this._isInTemplate()) {
          this.tmplCount -= 1;
        }
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(popped, this.stackTop < idx);
      }
    }
    popUntilElementPopped(element) {
      const idx = this._indexOf(element);
      this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilPopped(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(idx < 0 ? 0 : idx);
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(TABLE_CELLS, NS.HTML);
    }
    popAllUpToHtmlElement() {
      this.tmplCount = 0;
      this.shortenToLength(1);
    }
    _indexOfTagNames(tagNames, namespace) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
          return i;
        }
      }
      return -1;
    }
    clearBackTo(tagNames, targetNS) {
      const idx = this._indexOfTagNames(tagNames, targetNS);
      this.shortenToLength(idx + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(TABLE_CONTEXT, NS.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
    }
    remove(element) {
      const idx = this._indexOf(element);
      if (idx >= 0) {
        if (idx === this.stackTop) {
          this.pop();
        } else {
          this.items.splice(idx, 1);
          this.tagIDs.splice(idx, 1);
          this.stackTop--;
          this._updateCurrentElement();
          this.handler.onItemPop(element, false);
        }
      }
    }
    //Search
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
    }
    contains(element) {
      return this._indexOf(element) > -1;
    }
    getCommonAncestor(element) {
      const elementIdx = this._indexOf(element) - 1;
      return elementIdx >= 0 ? this.items[elementIdx] : null;
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
    }
    //Element in scope
    hasInDynamicScope(tagName, htmlScope) {
      for (let i = this.stackTop; i >= 0; i--) {
        const tn = this.tagIDs[i];
        switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
          case NS.HTML: {
            if (tn === tagName)
              return true;
            if (htmlScope.has(tn))
              return false;
            break;
          }
          case NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn))
              return false;
            break;
          }
          case NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
    }
    hasInListItemScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
    }
    hasInButtonScope(tagName) {
      return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
    }
    hasNumberedHeaderInScope() {
      for (let i = this.stackTop; i >= 0; i--) {
        const tn = this.tagIDs[i];
        switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
          case NS.HTML: {
            if (NUMBERED_HEADERS.has(tn))
              return true;
            if (SCOPING_ELEMENTS_HTML.has(tn))
              return false;
            break;
          }
          case NS.SVG: {
            if (SCOPING_ELEMENTS_SVG.has(tn))
              return false;
            break;
          }
          case NS.MATHML: {
            if (SCOPING_ELEMENTS_MATHML.has(tn))
              return false;
            break;
          }
        }
      }
      return true;
    }
    hasInTableScope(tagName) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case tagName: {
            return true;
          }
          case TAG_ID.TABLE:
          case TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasTableBodyContextInTableScope() {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case TAG_ID.TBODY:
          case TAG_ID.THEAD:
          case TAG_ID.TFOOT: {
            return true;
          }
          case TAG_ID.TABLE:
          case TAG_ID.HTML: {
            return false;
          }
        }
      }
      return true;
    }
    hasInSelectScope(tagName) {
      for (let i = this.stackTop; i >= 0; i--) {
        if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
          continue;
        }
        switch (this.tagIDs[i]) {
          case tagName: {
            return true;
          }
          case TAG_ID.OPTION:
          case TAG_ID.OPTGROUP: {
            break;
          }
          default: {
            return false;
          }
        }
      }
      return true;
    }
    //Implied end tags
    generateImpliedEndTags() {
      while (IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsThoroughly() {
      while (IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
    generateImpliedEndTagsWithExclusion(exclusionId) {
      while (this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
        this.pop();
      }
    }
  };

  // node_modules/parse5/dist/parser/formatting-element-list.js
  init_buffer();
  var NOAH_ARK_CAPACITY = 3;
  var EntryType;
  (function(EntryType2) {
    EntryType2[EntryType2["Marker"] = 0] = "Marker";
    EntryType2[EntryType2["Element"] = 1] = "Element";
  })(EntryType || (EntryType = {}));
  var MARKER = { type: EntryType.Marker };
  var FormattingElementList = class {
    constructor(treeAdapter) {
      this.treeAdapter = treeAdapter;
      this.entries = [];
      this.bookmark = null;
    }
    //Noah Ark's condition
    //OPTIMIZATION: at first we try to find possible candidates for exclusion using
    //lightweight heuristics without thorough attributes check.
    _getNoahArkConditionCandidates(newElement, neAttrs) {
      const candidates = [];
      const neAttrsLength = neAttrs.length;
      const neTagName = this.treeAdapter.getTagName(newElement);
      const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        if (entry.type === EntryType.Marker) {
          break;
        }
        const { element } = entry;
        if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
          const elementAttrs = this.treeAdapter.getAttrList(element);
          if (elementAttrs.length === neAttrsLength) {
            candidates.push({ idx: i, attrs: elementAttrs });
          }
        }
      }
      return candidates;
    }
    _ensureNoahArkCondition(newElement) {
      if (this.entries.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrs = this.treeAdapter.getAttrList(newElement);
      const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
      if (candidates.length < NOAH_ARK_CAPACITY)
        return;
      const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
      let validCandidates = 0;
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
          validCandidates += 1;
          if (validCandidates >= NOAH_ARK_CAPACITY) {
            this.entries.splice(candidate.idx, 1);
          }
        }
      }
    }
    //Mutations
    insertMarker() {
      this.entries.unshift(MARKER);
    }
    pushElement(element, token) {
      this._ensureNoahArkCondition(element);
      this.entries.unshift({
        type: EntryType.Element,
        element,
        token
      });
    }
    insertElementAfterBookmark(element, token) {
      const bookmarkIdx = this.entries.indexOf(this.bookmark);
      this.entries.splice(bookmarkIdx, 0, {
        type: EntryType.Element,
        element,
        token
      });
    }
    removeEntry(entry) {
      const entryIndex = this.entries.indexOf(entry);
      if (entryIndex >= 0) {
        this.entries.splice(entryIndex, 1);
      }
    }
    /**
     * Clears the list of formatting elements up to the last marker.
     *
     * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
     */
    clearToLastMarker() {
      const markerIdx = this.entries.indexOf(MARKER);
      if (markerIdx >= 0) {
        this.entries.splice(0, markerIdx + 1);
      } else {
        this.entries.length = 0;
      }
    }
    //Search
    getElementEntryInScopeWithTagName(tagName) {
      const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
      return entry && entry.type === EntryType.Element ? entry : null;
    }
    getElementEntry(element) {
      return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
    }
  };

  // node_modules/parse5/dist/tree-adapters/default.js
  init_buffer();
  var defaultTreeAdapter = {
    //Node construction
    createDocument() {
      return {
        nodeName: "#document",
        mode: DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    },
    createDocumentFragment() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    },
    createElement(tagName, namespaceURI, attrs) {
      return {
        nodeName: tagName,
        tagName,
        attrs,
        namespaceURI,
        childNodes: [],
        parentNode: null
      };
    },
    createCommentNode(data2) {
      return {
        nodeName: "#comment",
        data: data2,
        parentNode: null
      };
    },
    createTextNode(value) {
      return {
        nodeName: "#text",
        value,
        parentNode: null
      };
    },
    //Tree mutation
    appendChild(parentNode, newNode) {
      parentNode.childNodes.push(newNode);
      newNode.parentNode = parentNode;
    },
    insertBefore(parentNode, newNode, referenceNode) {
      const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
      parentNode.childNodes.splice(insertionIdx, 0, newNode);
      newNode.parentNode = parentNode;
    },
    setTemplateContent(templateElement, contentElement) {
      templateElement.content = contentElement;
    },
    getTemplateContent(templateElement) {
      return templateElement.content;
    },
    setDocumentType(document, name, publicId, systemId) {
      const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
      if (doctypeNode) {
        doctypeNode.name = name;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
      } else {
        const node = {
          nodeName: "#documentType",
          name,
          publicId,
          systemId,
          parentNode: null
        };
        defaultTreeAdapter.appendChild(document, node);
      }
    },
    setDocumentMode(document, mode) {
      document.mode = mode;
    },
    getDocumentMode(document) {
      return document.mode;
    },
    detachNode(node) {
      if (node.parentNode) {
        const idx = node.parentNode.childNodes.indexOf(node);
        node.parentNode.childNodes.splice(idx, 1);
        node.parentNode = null;
      }
    },
    insertText(parentNode, text3) {
      if (parentNode.childNodes.length > 0) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
        if (defaultTreeAdapter.isTextNode(prevNode)) {
          prevNode.value += text3;
          return;
        }
      }
      defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text3));
    },
    insertTextBefore(parentNode, text3, referenceNode) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text3;
      } else {
        defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text3), referenceNode);
      }
    },
    adoptAttributes(recipient, attrs) {
      const recipientAttrsMap = new Set(recipient.attrs.map((attr2) => attr2.name));
      for (let j = 0; j < attrs.length; j++) {
        if (!recipientAttrsMap.has(attrs[j].name)) {
          recipient.attrs.push(attrs[j]);
        }
      }
    },
    //Tree traversing
    getFirstChild(node) {
      return node.childNodes[0];
    },
    getChildNodes(node) {
      return node.childNodes;
    },
    getParentNode(node) {
      return node.parentNode;
    },
    getAttrList(element) {
      return element.attrs;
    },
    //Node data
    getTagName(element) {
      return element.tagName;
    },
    getNamespaceURI(element) {
      return element.namespaceURI;
    },
    getTextNodeContent(textNode) {
      return textNode.value;
    },
    getCommentNodeContent(commentNode) {
      return commentNode.data;
    },
    getDocumentTypeNodeName(doctypeNode) {
      return doctypeNode.name;
    },
    getDocumentTypeNodePublicId(doctypeNode) {
      return doctypeNode.publicId;
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
      return doctypeNode.systemId;
    },
    //Node types
    isTextNode(node) {
      return node.nodeName === "#text";
    },
    isCommentNode(node) {
      return node.nodeName === "#comment";
    },
    isDocumentTypeNode(node) {
      return node.nodeName === "#documentType";
    },
    isElementNode(node) {
      return Object.prototype.hasOwnProperty.call(node, "tagName");
    },
    // Source code location
    setNodeSourceCodeLocation(node, location) {
      node.sourceCodeLocation = location;
    },
    getNodeSourceCodeLocation(node) {
      return node.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(node, endLocation) {
      node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
    }
  };

  // node_modules/parse5/dist/common/doctype.js
  init_buffer();
  var VALID_DOCTYPE_NAME = "html";
  var VALID_SYSTEM_ID = "about:legacy-compat";
  var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
  var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
    "+//silmaril//dtd html pro v0r11 19970101//",
    "-//as//dtd html 3.0 aswedit + extensions//",
    "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
    "-//ietf//dtd html 2.0 level 1//",
    "-//ietf//dtd html 2.0 level 2//",
    "-//ietf//dtd html 2.0 strict level 1//",
    "-//ietf//dtd html 2.0 strict level 2//",
    "-//ietf//dtd html 2.0 strict//",
    "-//ietf//dtd html 2.0//",
    "-//ietf//dtd html 2.1e//",
    "-//ietf//dtd html 3.0//",
    "-//ietf//dtd html 3.2 final//",
    "-//ietf//dtd html 3.2//",
    "-//ietf//dtd html 3//",
    "-//ietf//dtd html level 0//",
    "-//ietf//dtd html level 1//",
    "-//ietf//dtd html level 2//",
    "-//ietf//dtd html level 3//",
    "-//ietf//dtd html strict level 0//",
    "-//ietf//dtd html strict level 1//",
    "-//ietf//dtd html strict level 2//",
    "-//ietf//dtd html strict level 3//",
    "-//ietf//dtd html strict//",
    "-//ietf//dtd html//",
    "-//metrius//dtd metrius presentational//",
    "-//microsoft//dtd internet explorer 2.0 html strict//",
    "-//microsoft//dtd internet explorer 2.0 html//",
    "-//microsoft//dtd internet explorer 2.0 tables//",
    "-//microsoft//dtd internet explorer 3.0 html strict//",
    "-//microsoft//dtd internet explorer 3.0 html//",
    "-//microsoft//dtd internet explorer 3.0 tables//",
    "-//netscape comm. corp.//dtd html//",
    "-//netscape comm. corp.//dtd strict html//",
    "-//o'reilly and associates//dtd html 2.0//",
    "-//o'reilly and associates//dtd html extended 1.0//",
    "-//o'reilly and associates//dtd html extended relaxed 1.0//",
    "-//sq//dtd html 2.0 hotmetal + extensions//",
    "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
    "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
    "-//spyglass//dtd html 2.0 extended//",
    "-//sun microsystems corp.//dtd hotjava html//",
    "-//sun microsystems corp.//dtd hotjava strict html//",
    "-//w3c//dtd html 3 1995-03-24//",
    "-//w3c//dtd html 3.2 draft//",
    "-//w3c//dtd html 3.2 final//",
    "-//w3c//dtd html 3.2//",
    "-//w3c//dtd html 3.2s draft//",
    "-//w3c//dtd html 4.0 frameset//",
    "-//w3c//dtd html 4.0 transitional//",
    "-//w3c//dtd html experimental 19960712//",
    "-//w3c//dtd html experimental 970421//",
    "-//w3c//dtd w3 html//",
    "-//w3o//dtd w3 html 3.0//",
    "-//webtechs//dtd mozilla html 2.0//",
    "-//webtechs//dtd mozilla html//"
  ];
  var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  var QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
    "-//w3o//dtd w3 html strict 3.0//en//",
    "-/w3c/dtd html 4.0 transitional/en",
    "html"
  ]);
  var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
  var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
    ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//"
  ];
  function hasPrefix(publicId, prefixes) {
    return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  function isConforming(token) {
    return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
  }
  function getDocumentMode(token) {
    if (token.name !== VALID_DOCTYPE_NAME) {
      return DOCUMENT_MODE.QUIRKS;
    }
    const { systemId } = token;
    if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let { publicId } = token;
    if (publicId !== null) {
      publicId = publicId.toLowerCase();
      if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.LIMITED_QUIRKS;
      }
    }
    return DOCUMENT_MODE.NO_QUIRKS;
  }

  // node_modules/parse5/dist/common/foreign-content.js
  init_buffer();
  var MIME_TYPES = {
    TEXT_HTML: "text/html",
    APPLICATION_XML: "application/xhtml+xml"
  };
  var DEFINITION_URL_ATTR = "definitionurl";
  var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
  var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((attr2) => [attr2.toLowerCase(), attr2]));
  var XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
    ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
    ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
    ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
    ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
    ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
    ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
    ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
    ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
    ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
    ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
    ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
  ]);
  var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map((tn) => [tn.toLowerCase(), tn]));
  var EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
    TAG_ID.B,
    TAG_ID.BIG,
    TAG_ID.BLOCKQUOTE,
    TAG_ID.BODY,
    TAG_ID.BR,
    TAG_ID.CENTER,
    TAG_ID.CODE,
    TAG_ID.DD,
    TAG_ID.DIV,
    TAG_ID.DL,
    TAG_ID.DT,
    TAG_ID.EM,
    TAG_ID.EMBED,
    TAG_ID.H1,
    TAG_ID.H2,
    TAG_ID.H3,
    TAG_ID.H4,
    TAG_ID.H5,
    TAG_ID.H6,
    TAG_ID.HEAD,
    TAG_ID.HR,
    TAG_ID.I,
    TAG_ID.IMG,
    TAG_ID.LI,
    TAG_ID.LISTING,
    TAG_ID.MENU,
    TAG_ID.META,
    TAG_ID.NOBR,
    TAG_ID.OL,
    TAG_ID.P,
    TAG_ID.PRE,
    TAG_ID.RUBY,
    TAG_ID.S,
    TAG_ID.SMALL,
    TAG_ID.SPAN,
    TAG_ID.STRONG,
    TAG_ID.STRIKE,
    TAG_ID.SUB,
    TAG_ID.SUP,
    TAG_ID.TABLE,
    TAG_ID.TT,
    TAG_ID.U,
    TAG_ID.UL,
    TAG_ID.VAR
  ]);
  function causesExit(startTagToken) {
    const tn = startTagToken.tagID;
    const isFontWithAttrs = tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
    return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
  }
  function adjustTokenMathMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      if (token.attrs[i].name === DEFINITION_URL_ATTR) {
        token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
        break;
      }
    }
  }
  function adjustTokenSVGAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
      if (adjustedAttrName != null) {
        token.attrs[i].name = adjustedAttrName;
      }
    }
  }
  function adjustTokenXMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
      if (adjustedAttrEntry) {
        token.attrs[i].prefix = adjustedAttrEntry.prefix;
        token.attrs[i].name = adjustedAttrEntry.name;
        token.attrs[i].namespace = adjustedAttrEntry.namespace;
      }
    }
  }
  function adjustTokenSVGTagName(token) {
    const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
    if (adjustedTagName != null) {
      token.tagName = adjustedTagName;
      token.tagID = getTagID(token.tagName);
    }
  }
  function isMathMLTextIntegrationPoint(tn, ns) {
    return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
  }
  function isHtmlIntegrationPoint(tn, ns, attrs) {
    if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
      for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].name === ATTRS.ENCODING) {
          const value = attrs[i].value.toLowerCase();
          return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
        }
      }
    }
    return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
  }
  function isIntegrationPoint(tn, ns, attrs, foreignNS) {
    return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
  }

  // node_modules/parse5/dist/parser/index.js
  var HIDDEN_INPUT_TYPE = "hidden";
  var AA_OUTER_LOOP_ITER = 8;
  var AA_INNER_LOOP_ITER = 3;
  var InsertionMode;
  (function(InsertionMode2) {
    InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
    InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
    InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
    InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
    InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
    InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
    InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
    InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
    InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
    InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
    InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
    InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
    InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
    InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
    InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
    InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
    InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
    InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
    InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
    InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
  })(InsertionMode || (InsertionMode = {}));
  var BASE_LOC = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1
  };
  var TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
  var defaultParserOptions = {
    scriptingEnabled: true,
    sourceCodeLocationInfo: false,
    treeAdapter: defaultTreeAdapter,
    onParseError: null
  };
  var Parser = class {
    constructor(options, document, fragmentContext = null, scriptHandler = null) {
      this.fragmentContext = fragmentContext;
      this.scriptHandler = scriptHandler;
      this.currentToken = null;
      this.stopped = false;
      this.insertionMode = InsertionMode.INITIAL;
      this.originalInsertionMode = InsertionMode.INITIAL;
      this.headElement = null;
      this.formElement = null;
      this.currentNotInHTML = false;
      this.tmplInsertionModeStack = [];
      this.pendingCharacterTokens = [];
      this.hasNonWhitespacePendingCharacterToken = false;
      this.framesetOk = true;
      this.skipNextNewLine = false;
      this.fosterParentingEnabled = false;
      this.options = {
        ...defaultParserOptions,
        ...options
      };
      this.treeAdapter = this.options.treeAdapter;
      this.onParseError = this.options.onParseError;
      if (this.onParseError) {
        this.options.sourceCodeLocationInfo = true;
      }
      this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
      this.tokenizer = new Tokenizer(this.options, this);
      this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
      this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
      this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
      this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
    }
    // API
    static parse(html3, options) {
      const parser = new this(options);
      parser.tokenizer.write(html3, true);
      return parser.document;
    }
    static getFragmentParser(fragmentContext, options) {
      const opts = {
        ...defaultParserOptions,
        ...options
      };
      fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
      const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
      const parser = new this(opts, documentMock, fragmentContext);
      if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
        parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      }
      parser._initTokenizerForFragmentParsing();
      parser._insertFakeRootElement();
      parser._resetInsertionMode();
      parser._findFormInFragmentContext();
      return parser;
    }
    getFragment() {
      const rootElement = this.treeAdapter.getFirstChild(this.document);
      const fragment = this.treeAdapter.createDocumentFragment();
      this._adoptNodes(rootElement, fragment);
      return fragment;
    }
    //Errors
    /** @internal */
    _err(token, code, beforeToken) {
      var _a2;
      if (!this.onParseError)
        return;
      const loc = (_a2 = token.location) !== null && _a2 !== void 0 ? _a2 : BASE_LOC;
      const err = {
        code,
        startLine: loc.startLine,
        startCol: loc.startCol,
        startOffset: loc.startOffset,
        endLine: beforeToken ? loc.startLine : loc.endLine,
        endCol: beforeToken ? loc.startCol : loc.endCol,
        endOffset: beforeToken ? loc.startOffset : loc.endOffset
      };
      this.onParseError(err);
    }
    //Stack events
    /** @internal */
    onItemPush(node, tid, isTop) {
      var _a2, _b;
      (_b = (_a2 = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a2, node);
      if (isTop && this.openElements.stackTop > 0)
        this._setContextModes(node, tid);
    }
    /** @internal */
    onItemPop(node, isTop) {
      var _a2, _b;
      if (this.options.sourceCodeLocationInfo) {
        this._setEndLocation(node, this.currentToken);
      }
      (_b = (_a2 = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a2, node, this.openElements.current);
      if (isTop) {
        let current;
        let currentTagId;
        if (this.openElements.stackTop === 0 && this.fragmentContext) {
          current = this.fragmentContext;
          currentTagId = this.fragmentContextID;
        } else {
          ({ current, currentTagId } = this.openElements);
        }
        this._setContextModes(current, currentTagId);
      }
    }
    _setContextModes(current, tid) {
      const isHTML = current === this.document || this.treeAdapter.getNamespaceURI(current) === NS.HTML;
      this.currentNotInHTML = !isHTML;
      this.tokenizer.inForeignNode = !isHTML && !this._isIntegrationPoint(tid, current);
    }
    /** @protected */
    _switchToTextParsing(currentToken, nextTokenizerState) {
      this._insertElement(currentToken, NS.HTML);
      this.tokenizer.state = nextTokenizerState;
      this.originalInsertionMode = this.insertionMode;
      this.insertionMode = InsertionMode.TEXT;
    }
    switchToPlaintextParsing() {
      this.insertionMode = InsertionMode.TEXT;
      this.originalInsertionMode = InsertionMode.IN_BODY;
      this.tokenizer.state = TokenizerMode.PLAINTEXT;
    }
    //Fragment parsing
    /** @protected */
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    }
    /** @protected */
    _findFormInFragmentContext() {
      let node = this.fragmentContext;
      while (node) {
        if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
          this.formElement = node;
          break;
        }
        node = this.treeAdapter.getParentNode(node);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
        return;
      }
      switch (this.fragmentContextID) {
        case TAG_ID.TITLE:
        case TAG_ID.TEXTAREA: {
          this.tokenizer.state = TokenizerMode.RCDATA;
          break;
        }
        case TAG_ID.STYLE:
        case TAG_ID.XMP:
        case TAG_ID.IFRAME:
        case TAG_ID.NOEMBED:
        case TAG_ID.NOFRAMES:
        case TAG_ID.NOSCRIPT: {
          this.tokenizer.state = TokenizerMode.RAWTEXT;
          break;
        }
        case TAG_ID.SCRIPT: {
          this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
          break;
        }
        case TAG_ID.PLAINTEXT: {
          this.tokenizer.state = TokenizerMode.PLAINTEXT;
          break;
        }
        default:
      }
    }
    //Tree mutation
    /** @protected */
    _setDocumentType(token) {
      const name = token.name || "";
      const publicId = token.publicId || "";
      const systemId = token.systemId || "";
      this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
      if (token.location) {
        const documentChildren = this.treeAdapter.getChildNodes(this.document);
        const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
        if (docTypeNode) {
          this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
        }
      }
    }
    /** @protected */
    _attachElementToTree(element, location) {
      if (this.options.sourceCodeLocationInfo) {
        const loc = location && {
          ...location,
          startTag: location
        };
        this.treeAdapter.setNodeSourceCodeLocation(element, loc);
      }
      if (this._shouldFosterParentOnInsertion()) {
        this._fosterParentElement(element);
      } else {
        const parent2 = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(parent2, element);
      }
    }
    /**
     * For self-closing tags. Add an element to the tree, but skip adding it
     * to the stack.
     */
    /** @protected */
    _appendElement(token, namespaceURI) {
      const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element, token.location);
    }
    /** @protected */
    _insertElement(token, namespaceURI) {
      const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element, token.location);
      this.openElements.push(element, token.tagID);
    }
    /** @protected */
    _insertFakeElement(tagName, tagID) {
      const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
      this._attachElementToTree(element, null);
      this.openElements.push(element, tagID);
    }
    /** @protected */
    _insertTemplate(token) {
      const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
      const content = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(tmpl, content);
      this._attachElementToTree(tmpl, token.location);
      this.openElements.push(tmpl, token.tagID);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(content, null);
    }
    /** @protected */
    _insertFakeRootElement() {
      const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
      if (this.options.sourceCodeLocationInfo)
        this.treeAdapter.setNodeSourceCodeLocation(element, null);
      this.treeAdapter.appendChild(this.openElements.current, element);
      this.openElements.push(element, TAG_ID.HTML);
    }
    /** @protected */
    _appendCommentNode(token, parent2) {
      const commentNode = this.treeAdapter.createCommentNode(token.data);
      this.treeAdapter.appendChild(parent2, commentNode);
      if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
      }
    }
    /** @protected */
    _insertCharacters(token) {
      let parent2;
      let beforeElement;
      if (this._shouldFosterParentOnInsertion()) {
        ({ parent: parent2, beforeElement } = this._findFosterParentingLocation());
        if (beforeElement) {
          this.treeAdapter.insertTextBefore(parent2, token.chars, beforeElement);
        } else {
          this.treeAdapter.insertText(parent2, token.chars);
        }
      } else {
        parent2 = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.insertText(parent2, token.chars);
      }
      if (!token.location)
        return;
      const siblings2 = this.treeAdapter.getChildNodes(parent2);
      const textNodeIdx = beforeElement ? siblings2.lastIndexOf(beforeElement) : siblings2.length;
      const textNode = siblings2[textNodeIdx - 1];
      const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
      if (tnLoc) {
        const { endLine, endCol, endOffset } = token.location;
        this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
      } else if (this.options.sourceCodeLocationInfo) {
        this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
      }
    }
    /** @protected */
    _adoptNodes(donor, recipient) {
      for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
        this.treeAdapter.detachNode(child);
        this.treeAdapter.appendChild(recipient, child);
      }
    }
    /** @protected */
    _setEndLocation(element, closingToken) {
      if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
        const ctLoc = closingToken.location;
        const tn = this.treeAdapter.getTagName(element);
        const endLoc = (
          // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
          // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
          closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
            endTag: { ...ctLoc },
            endLine: ctLoc.endLine,
            endCol: ctLoc.endCol,
            endOffset: ctLoc.endOffset
          } : {
            endLine: ctLoc.startLine,
            endCol: ctLoc.startCol,
            endOffset: ctLoc.startOffset
          }
        );
        this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
      }
    }
    //Token processing
    shouldProcessStartTagTokenInForeignContent(token) {
      if (!this.currentNotInHTML)
        return false;
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
        return false;
      }
      return (
        // Check that `current` is not an integration point for HTML or MathML elements.
        this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
        // integration point.
        (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
      );
    }
    /** @protected */
    _processToken(token) {
      switch (token.type) {
        case TokenType.CHARACTER: {
          this.onCharacter(token);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.onNullCharacter(token);
          break;
        }
        case TokenType.COMMENT: {
          this.onComment(token);
          break;
        }
        case TokenType.DOCTYPE: {
          this.onDoctype(token);
          break;
        }
        case TokenType.START_TAG: {
          this._processStartTag(token);
          break;
        }
        case TokenType.END_TAG: {
          this.onEndTag(token);
          break;
        }
        case TokenType.EOF: {
          this.onEof(token);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.onWhitespaceCharacter(token);
          break;
        }
      }
    }
    //Integration points
    /** @protected */
    _isIntegrationPoint(tid, element, foreignNS) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      const attrs = this.treeAdapter.getAttrList(element);
      return isIntegrationPoint(tid, ns, attrs, foreignNS);
    }
    //Active formatting elements reconstruction
    /** @protected */
    _reconstructActiveFormattingElements() {
      const listLength = this.activeFormattingElements.entries.length;
      if (listLength) {
        const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
        const unopenIdx = endIndex < 0 ? listLength - 1 : endIndex - 1;
        for (let i = unopenIdx; i >= 0; i--) {
          const entry = this.activeFormattingElements.entries[i];
          this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
          entry.element = this.openElements.current;
        }
      }
    }
    //Close elements
    /** @protected */
    _closeTableCell() {
      this.openElements.generateImpliedEndTags();
      this.openElements.popUntilTableCellPopped();
      this.activeFormattingElements.clearToLastMarker();
      this.insertionMode = InsertionMode.IN_ROW;
    }
    /** @protected */
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
      this.openElements.popUntilTagNamePopped(TAG_ID.P);
    }
    //Insertion modes
    /** @protected */
    _resetInsertionMode() {
      for (let i = this.openElements.stackTop; i >= 0; i--) {
        switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
          case TAG_ID.TR: {
            this.insertionMode = InsertionMode.IN_ROW;
            return;
          }
          case TAG_ID.TBODY:
          case TAG_ID.THEAD:
          case TAG_ID.TFOOT: {
            this.insertionMode = InsertionMode.IN_TABLE_BODY;
            return;
          }
          case TAG_ID.CAPTION: {
            this.insertionMode = InsertionMode.IN_CAPTION;
            return;
          }
          case TAG_ID.COLGROUP: {
            this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
            return;
          }
          case TAG_ID.TABLE: {
            this.insertionMode = InsertionMode.IN_TABLE;
            return;
          }
          case TAG_ID.BODY: {
            this.insertionMode = InsertionMode.IN_BODY;
            return;
          }
          case TAG_ID.FRAMESET: {
            this.insertionMode = InsertionMode.IN_FRAMESET;
            return;
          }
          case TAG_ID.SELECT: {
            this._resetInsertionModeForSelect(i);
            return;
          }
          case TAG_ID.TEMPLATE: {
            this.insertionMode = this.tmplInsertionModeStack[0];
            return;
          }
          case TAG_ID.HTML: {
            this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
            return;
          }
          case TAG_ID.TD:
          case TAG_ID.TH: {
            if (i > 0) {
              this.insertionMode = InsertionMode.IN_CELL;
              return;
            }
            break;
          }
          case TAG_ID.HEAD: {
            if (i > 0) {
              this.insertionMode = InsertionMode.IN_HEAD;
              return;
            }
            break;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_BODY;
    }
    /** @protected */
    _resetInsertionModeForSelect(selectIdx) {
      if (selectIdx > 0) {
        for (let i = selectIdx - 1; i > 0; i--) {
          const tn = this.openElements.tagIDs[i];
          if (tn === TAG_ID.TEMPLATE) {
            break;
          } else if (tn === TAG_ID.TABLE) {
            this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
            return;
          }
        }
      }
      this.insertionMode = InsertionMode.IN_SELECT;
    }
    //Foster parenting
    /** @protected */
    _isElementCausesFosterParenting(tn) {
      return TABLE_STRUCTURE_TAGS.has(tn);
    }
    /** @protected */
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    /** @protected */
    _findFosterParentingLocation() {
      for (let i = this.openElements.stackTop; i >= 0; i--) {
        const openElement = this.openElements.items[i];
        switch (this.openElements.tagIDs[i]) {
          case TAG_ID.TEMPLATE: {
            if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
              return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
            }
            break;
          }
          case TAG_ID.TABLE: {
            const parent2 = this.treeAdapter.getParentNode(openElement);
            if (parent2) {
              return { parent: parent2, beforeElement: openElement };
            }
            return { parent: this.openElements.items[i - 1], beforeElement: null };
          }
          default:
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    /** @protected */
    _fosterParentElement(element) {
      const location = this._findFosterParentingLocation();
      if (location.beforeElement) {
        this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
      } else {
        this.treeAdapter.appendChild(location.parent, element);
      }
    }
    //Special elements
    /** @protected */
    _isSpecialElement(element, id) {
      const ns = this.treeAdapter.getNamespaceURI(element);
      return SPECIAL_ELEMENTS[ns].has(id);
    }
    /** @internal */
    onCharacter(token) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        characterInForeignContent(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE: {
          characterInBody(this, token);
          break;
        }
        case InsertionMode.TEXT:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          characterInTableText(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onNullCharacter(token) {
      this.skipNextNewLine = false;
      if (this.tokenizer.inForeignNode) {
        nullCharacterInForeignContent(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          tokenInColumnGroup(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          tokenAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onComment(token) {
      this.skipNextNewLine = false;
      if (this.currentNotInHTML) {
        appendComment(this, token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.INITIAL:
        case InsertionMode.BEFORE_HTML:
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          appendComment(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          appendCommentToRootHtmlElement(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          appendCommentToDocument(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onDoctype(token) {
      this.skipNextNewLine = false;
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          doctypeInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD:
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD: {
          this._err(token, ERR.misplacedDoctype);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onStartTag(token) {
      this.skipNextNewLine = false;
      this.currentToken = token;
      this._processStartTag(token);
      if (token.selfClosing && !token.ackSelfClosing) {
        this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
      }
    }
    /**
     * Processes a given start tag.
     *
     * `onStartTag` checks if a self-closing tag was recognized. When a token
     * is moved inbetween multiple insertion modes, this check for self-closing
     * could lead to false positives. To avoid this, `_processStartTag` is used
     * for nested calls.
     *
     * @param token The token to process.
     * @protected
     */
    _processStartTag(token) {
      if (this.shouldProcessStartTagTokenInForeignContent(token)) {
        startTagInForeignContent(this, token);
      } else {
        this._startTagOutsideForeignContent(token);
      }
    }
    /** @protected */
    _startTagOutsideForeignContent(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          startTagBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          startTagBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          startTagInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          startTagInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          startTagAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY: {
          startTagInBody(this, token);
          break;
        }
        case InsertionMode.IN_TABLE: {
          startTagInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          startTagInCaption(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          startTagInColumnGroup(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          startTagInTableBody(this, token);
          break;
        }
        case InsertionMode.IN_ROW: {
          startTagInRow(this, token);
          break;
        }
        case InsertionMode.IN_CELL: {
          startTagInCell(this, token);
          break;
        }
        case InsertionMode.IN_SELECT: {
          startTagInSelect(this, token);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          startTagInSelectInTable(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          startTagInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          startTagAfterBody(this, token);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          startTagInFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          startTagAfterFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          startTagAfterAfterBody(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          startTagAfterAfterFrameset(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onEndTag(token) {
      this.skipNextNewLine = false;
      this.currentToken = token;
      if (this.currentNotInHTML) {
        endTagInForeignContent(this, token);
      } else {
        this._endTagOutsideForeignContent(token);
      }
    }
    /** @protected */
    _endTagOutsideForeignContent(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          endTagBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          endTagBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          endTagInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          endTagInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          endTagAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY: {
          endTagInBody(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          endTagInText(this, token);
          break;
        }
        case InsertionMode.IN_TABLE: {
          endTagInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_CAPTION: {
          endTagInCaption(this, token);
          break;
        }
        case InsertionMode.IN_COLUMN_GROUP: {
          endTagInColumnGroup(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_BODY: {
          endTagInTableBody(this, token);
          break;
        }
        case InsertionMode.IN_ROW: {
          endTagInRow(this, token);
          break;
        }
        case InsertionMode.IN_CELL: {
          endTagInCell(this, token);
          break;
        }
        case InsertionMode.IN_SELECT: {
          endTagInSelect(this, token);
          break;
        }
        case InsertionMode.IN_SELECT_IN_TABLE: {
          endTagInSelectInTable(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          endTagInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY: {
          endTagAfterBody(this, token);
          break;
        }
        case InsertionMode.IN_FRAMESET: {
          endTagInFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_FRAMESET: {
          endTagAfterFrameset(this, token);
          break;
        }
        case InsertionMode.AFTER_AFTER_BODY: {
          tokenAfterAfterBody(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onEof(token) {
      switch (this.insertionMode) {
        case InsertionMode.INITIAL: {
          tokenInInitialMode(this, token);
          break;
        }
        case InsertionMode.BEFORE_HTML: {
          tokenBeforeHtml(this, token);
          break;
        }
        case InsertionMode.BEFORE_HEAD: {
          tokenBeforeHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD: {
          tokenInHead(this, token);
          break;
        }
        case InsertionMode.IN_HEAD_NO_SCRIPT: {
          tokenInHeadNoScript(this, token);
          break;
        }
        case InsertionMode.AFTER_HEAD: {
          tokenAfterHead(this, token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE: {
          eofInBody(this, token);
          break;
        }
        case InsertionMode.TEXT: {
          eofInText(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          tokenInTableText(this, token);
          break;
        }
        case InsertionMode.IN_TEMPLATE: {
          eofInTemplate(this, token);
          break;
        }
        case InsertionMode.AFTER_BODY:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          stopParsing(this, token);
          break;
        }
        default:
      }
    }
    /** @internal */
    onWhitespaceCharacter(token) {
      if (this.skipNextNewLine) {
        this.skipNextNewLine = false;
        if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
          if (token.chars.length === 1) {
            return;
          }
          token.chars = token.chars.substr(1);
        }
      }
      if (this.tokenizer.inForeignNode) {
        this._insertCharacters(token);
        return;
      }
      switch (this.insertionMode) {
        case InsertionMode.IN_HEAD:
        case InsertionMode.IN_HEAD_NO_SCRIPT:
        case InsertionMode.AFTER_HEAD:
        case InsertionMode.TEXT:
        case InsertionMode.IN_COLUMN_GROUP:
        case InsertionMode.IN_SELECT:
        case InsertionMode.IN_SELECT_IN_TABLE:
        case InsertionMode.IN_FRAMESET:
        case InsertionMode.AFTER_FRAMESET: {
          this._insertCharacters(token);
          break;
        }
        case InsertionMode.IN_BODY:
        case InsertionMode.IN_CAPTION:
        case InsertionMode.IN_CELL:
        case InsertionMode.IN_TEMPLATE:
        case InsertionMode.AFTER_BODY:
        case InsertionMode.AFTER_AFTER_BODY:
        case InsertionMode.AFTER_AFTER_FRAMESET: {
          whitespaceCharacterInBody(this, token);
          break;
        }
        case InsertionMode.IN_TABLE:
        case InsertionMode.IN_TABLE_BODY:
        case InsertionMode.IN_ROW: {
          characterInTable(this, token);
          break;
        }
        case InsertionMode.IN_TABLE_TEXT: {
          whitespaceCharacterInTableText(this, token);
          break;
        }
        default:
      }
    }
  };
  function aaObtainFormattingElementEntry(p, token) {
    let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
    if (formattingElementEntry) {
      if (!p.openElements.contains(formattingElementEntry.element)) {
        p.activeFormattingElements.removeEntry(formattingElementEntry);
        formattingElementEntry = null;
      } else if (!p.openElements.hasInScope(token.tagID)) {
        formattingElementEntry = null;
      }
    } else {
      genericEndTagInBody(p, token);
    }
    return formattingElementEntry;
  }
  function aaObtainFurthestBlock(p, formattingElementEntry) {
    let furthestBlock = null;
    let idx = p.openElements.stackTop;
    for (; idx >= 0; idx--) {
      const element = p.openElements.items[idx];
      if (element === formattingElementEntry.element) {
        break;
      }
      if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
        furthestBlock = element;
      }
    }
    if (!furthestBlock) {
      p.openElements.shortenToLength(idx < 0 ? 0 : idx);
      p.activeFormattingElements.removeEntry(formattingElementEntry);
    }
    return furthestBlock;
  }
  function aaInnerLoop(p, furthestBlock, formattingElement) {
    let lastElement = furthestBlock;
    let nextElement = p.openElements.getCommonAncestor(furthestBlock);
    for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
      nextElement = p.openElements.getCommonAncestor(element);
      const elementEntry = p.activeFormattingElements.getElementEntry(element);
      const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
      const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
      if (shouldRemoveFromOpenElements) {
        if (counterOverflow) {
          p.activeFormattingElements.removeEntry(elementEntry);
        }
        p.openElements.remove(element);
      } else {
        element = aaRecreateElementFromEntry(p, elementEntry);
        if (lastElement === furthestBlock) {
          p.activeFormattingElements.bookmark = elementEntry;
        }
        p.treeAdapter.detachNode(lastElement);
        p.treeAdapter.appendChild(element, lastElement);
        lastElement = element;
      }
    }
    return lastElement;
  }
  function aaRecreateElementFromEntry(p, elementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
    const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
    p.openElements.replace(elementEntry.element, newElement);
    elementEntry.element = newElement;
    return newElement;
  }
  function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
    const tn = p.treeAdapter.getTagName(commonAncestor);
    const tid = getTagID(tn);
    if (p._isElementCausesFosterParenting(tid)) {
      p._fosterParentElement(lastElement);
    } else {
      const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
      if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
        commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
      }
      p.treeAdapter.appendChild(commonAncestor, lastElement);
    }
  }
  function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
    const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
    const { token } = formattingElementEntry;
    const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
    p._adoptNodes(furthestBlock, newElement);
    p.treeAdapter.appendChild(furthestBlock, newElement);
    p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
    p.openElements.remove(formattingElementEntry.element);
    p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
  }
  function callAdoptionAgency(p, token) {
    for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
      const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
      if (!formattingElementEntry) {
        break;
      }
      const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
      if (!furthestBlock) {
        break;
      }
      p.activeFormattingElements.bookmark = formattingElementEntry;
      const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
      const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
      p.treeAdapter.detachNode(lastElement);
      if (commonAncestor)
        aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
      aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
    }
  }
  function appendComment(p, token) {
    p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p, token) {
    p._appendCommentNode(token, p.openElements.items[0]);
  }
  function appendCommentToDocument(p, token) {
    p._appendCommentNode(token, p.document);
  }
  function stopParsing(p, token) {
    p.stopped = true;
    if (token.location) {
      const target = p.fragmentContext ? 0 : 2;
      for (let i = p.openElements.stackTop; i >= target; i--) {
        p._setEndLocation(p.openElements.items[i], token);
      }
      if (!p.fragmentContext && p.openElements.stackTop >= 0) {
        const htmlElement = p.openElements.items[0];
        const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
        if (htmlLocation && !htmlLocation.endTag) {
          p._setEndLocation(htmlElement, token);
          if (p.openElements.stackTop >= 1) {
            const bodyElement = p.openElements.items[1];
            const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
            if (bodyLocation && !bodyLocation.endTag) {
              p._setEndLocation(bodyElement, token);
            }
          }
        }
      }
    }
  }
  function doctypeInInitialMode(p, token) {
    p._setDocumentType(token);
    const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
    if (!isConforming(token)) {
      p._err(token, ERR.nonConformingDoctype);
    }
    p.treeAdapter.setDocumentMode(p.document, mode);
    p.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p, token) {
    p._err(token, ERR.missingDoctype, true);
    p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
    p.insertionMode = InsertionMode.BEFORE_HTML;
    p._processToken(token);
  }
  function startTagBeforeHtml(p, token) {
    if (token.tagID === TAG_ID.HTML) {
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.BEFORE_HEAD;
    } else {
      tokenBeforeHtml(p, token);
    }
  }
  function endTagBeforeHtml(p, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
      tokenBeforeHtml(p, token);
    }
  }
  function tokenBeforeHtml(p, token) {
    p._insertFakeRootElement();
    p.insertionMode = InsertionMode.BEFORE_HEAD;
    p._processToken(token);
  }
  function startTagBeforeHead(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.HEAD: {
        p._insertElement(token, NS.HTML);
        p.headElement = p.openElements.current;
        p.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      default: {
        tokenBeforeHead(p, token);
      }
    }
  }
  function endTagBeforeHead(p, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
      tokenBeforeHead(p, token);
    } else {
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenBeforeHead(p, token) {
    p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
    p.headElement = p.openElements.current;
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token);
  }
  function startTagInHead(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META: {
        p._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TITLE: {
        p._switchToTextParsing(token, TokenizerMode.RCDATA);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p.options.scriptingEnabled) {
          p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        } else {
          p._insertElement(token, NS.HTML);
          p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
        }
        break;
      }
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        break;
      }
      case TAG_ID.SCRIPT: {
        p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
        break;
      }
      case TAG_ID.TEMPLATE: {
        p._insertTemplate(token);
        p.activeFormattingElements.insertMarker();
        p.framesetOk = false;
        p.insertionMode = InsertionMode.IN_TEMPLATE;
        p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
        break;
      }
      case TAG_ID.HEAD: {
        p._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenInHead(p, token);
      }
    }
  }
  function endTagInHead(p, token) {
    switch (token.tagID) {
      case TAG_ID.HEAD: {
        p.openElements.pop();
        p.insertionMode = InsertionMode.AFTER_HEAD;
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.BR:
      case TAG_ID.HTML: {
        tokenInHead(p, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      default: {
        p._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function templateEndTagInHead(p, token) {
    if (p.openElements.tmplCount > 0) {
      p.openElements.generateImpliedEndTagsThoroughly();
      if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) {
        p._err(token, ERR.closingOfElementWithOpenChildElements);
      }
      p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p.activeFormattingElements.clearToLastMarker();
      p.tmplInsertionModeStack.shift();
      p._resetInsertionMode();
    } else {
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenInHead(p, token) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.AFTER_HEAD;
    p._processToken(token);
  }
  function startTagInHeadNoScript(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.HEAD:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        startTagInHead(p, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        p._err(token, ERR.nestedNoscriptInHead);
        break;
      }
      default: {
        tokenInHeadNoScript(p, token);
      }
    }
  }
  function endTagInHeadNoScript(p, token) {
    switch (token.tagID) {
      case TAG_ID.NOSCRIPT: {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      case TAG_ID.BR: {
        tokenInHeadNoScript(p, token);
        break;
      }
      default: {
        p._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenInHeadNoScript(p, token) {
    const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
    p._err(token, errCode);
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_HEAD;
    p._processToken(token);
  }
  function startTagAfterHead(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.BODY: {
        p._insertElement(token, NS.HTML);
        p.framesetOk = false;
        p.insertionMode = InsertionMode.IN_BODY;
        break;
      }
      case TAG_ID.FRAMESET: {
        p._insertElement(token, NS.HTML);
        p.insertionMode = InsertionMode.IN_FRAMESET;
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        p._err(token, ERR.abandonedHeadElementChild);
        p.openElements.push(p.headElement, TAG_ID.HEAD);
        startTagInHead(p, token);
        p.openElements.remove(p.headElement);
        break;
      }
      case TAG_ID.HEAD: {
        p._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenAfterHead(p, token);
      }
    }
  }
  function endTagAfterHead(p, token) {
    switch (token.tagID) {
      case TAG_ID.BODY:
      case TAG_ID.HTML:
      case TAG_ID.BR: {
        tokenAfterHead(p, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      default: {
        p._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenAfterHead(p, token) {
    p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
  }
  function modeInBody(p, token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInBody(p, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInBody(p, token);
        break;
      }
      case TokenType.COMMENT: {
        appendComment(p, token);
        break;
      }
      case TokenType.START_TAG: {
        startTagInBody(p, token);
        break;
      }
      case TokenType.END_TAG: {
        endTagInBody(p, token);
        break;
      }
      case TokenType.EOF: {
        eofInBody(p, token);
        break;
      }
      default:
    }
  }
  function whitespaceCharacterInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token);
  }
  function characterInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertCharacters(token);
    p.framesetOk = false;
  }
  function htmlStartTagInBody(p, token) {
    if (p.openElements.tmplCount === 0) {
      p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
    }
  }
  function bodyStartTagInBody(p, token) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (bodyElement && p.openElements.tmplCount === 0) {
      p.framesetOk = false;
      p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
    }
  }
  function framesetStartTagInBody(p, token) {
    const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
    if (p.framesetOk && bodyElement) {
      p.treeAdapter.detachNode(bodyElement);
      p.openElements.popAllUpToHtmlElement();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_FRAMESET;
    }
  }
  function addressStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
  }
  function numberedHeaderStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    if (NUMBERED_HEADERS.has(p.openElements.currentTagId)) {
      p.openElements.pop();
    }
    p._insertElement(token, NS.HTML);
  }
  function preStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
    p.skipNextNewLine = true;
    p.framesetOk = false;
  }
  function formStartTagInBody(p, token) {
    const inTemplate = p.openElements.tmplCount > 0;
    if (!p.formElement || inTemplate) {
      if (p.openElements.hasInButtonScope(TAG_ID.P)) {
        p._closePElement();
      }
      p._insertElement(token, NS.HTML);
      if (!inTemplate) {
        p.formElement = p.openElements.current;
      }
    }
  }
  function listItemStartTagInBody(p, token) {
    p.framesetOk = false;
    const tn = token.tagID;
    for (let i = p.openElements.stackTop; i >= 0; i--) {
      const elementId = p.openElements.tagIDs[i];
      if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
        p.openElements.generateImpliedEndTagsWithExclusion(elementId);
        p.openElements.popUntilTagNamePopped(elementId);
        break;
      }
      if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) {
        break;
      }
    }
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
  }
  function plaintextStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
    p.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p, token) {
    if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
    p.framesetOk = false;
  }
  function aStartTagInBody(p, token) {
    const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
    if (activeElementEntry) {
      callAdoptionAgency(p, token);
      p.openElements.remove(activeElementEntry.element);
      p.activeFormattingElements.removeEntry(activeElementEntry);
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function bStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function nobrStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    if (p.openElements.hasInScope(TAG_ID.NOBR)) {
      callAdoptionAgency(p, token);
      p._reconstructActiveFormattingElements();
    }
    p._insertElement(token, NS.HTML);
    p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function appletStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
    p.activeFormattingElements.insertMarker();
    p.framesetOk = false;
  }
  function tableStartTagInBody(p, token) {
    if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
    p.framesetOk = false;
    p.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token, NS.HTML);
    p.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function isHiddenInput(token) {
    const inputType = getTokenAttr(token, ATTRS.TYPE);
    return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._appendElement(token, NS.HTML);
    if (!isHiddenInput(token)) {
      p.framesetOk = false;
    }
    token.ackSelfClosing = true;
  }
  function paramStartTagInBody(p, token) {
    p._appendElement(token, NS.HTML);
    token.ackSelfClosing = true;
  }
  function hrStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._appendElement(token, NS.HTML);
    p.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function imageStartTagInBody(p, token) {
    token.tagName = TAG_NAMES.IMG;
    token.tagID = TAG_ID.IMG;
    areaStartTagInBody(p, token);
  }
  function textareaStartTagInBody(p, token) {
    p._insertElement(token, NS.HTML);
    p.skipNextNewLine = true;
    p.tokenizer.state = TokenizerMode.RCDATA;
    p.originalInsertionMode = p.insertionMode;
    p.framesetOk = false;
    p.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p, token) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._reconstructActiveFormattingElements();
    p.framesetOk = false;
    p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p, token) {
    p.framesetOk = false;
    p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function rawTextStartTagInBody(p, token) {
    p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
    p.framesetOk = false;
    p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p, token) {
    if (p.openElements.currentTagId === TAG_ID.OPTION) {
      p.openElements.pop();
    }
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
  }
  function rbStartTagInBody(p, token) {
    if (p.openElements.hasInScope(TAG_ID.RUBY)) {
      p.openElements.generateImpliedEndTags();
    }
    p._insertElement(token, NS.HTML);
  }
  function rtStartTagInBody(p, token) {
    if (p.openElements.hasInScope(TAG_ID.RUBY)) {
      p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
    }
    p._insertElement(token, NS.HTML);
  }
  function mathStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    adjustTokenMathMLAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p._appendElement(token, NS.MATHML);
    } else {
      p._insertElement(token, NS.MATHML);
    }
    token.ackSelfClosing = true;
  }
  function svgStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    adjustTokenSVGAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p._appendElement(token, NS.SVG);
    } else {
      p._insertElement(token, NS.SVG);
    }
    token.ackSelfClosing = true;
  }
  function genericStartTagInBody(p, token) {
    p._reconstructActiveFormattingElements();
    p._insertElement(token, NS.HTML);
  }
  function startTagInBody(p, token) {
    switch (token.tagID) {
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.B:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        bStartTagInBody(p, token);
        break;
      }
      case TAG_ID.A: {
        aStartTagInBody(p, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderStartTagInBody(p, token);
        break;
      }
      case TAG_ID.P:
      case TAG_ID.DL:
      case TAG_ID.OL:
      case TAG_ID.UL:
      case TAG_ID.DIV:
      case TAG_ID.DIR:
      case TAG_ID.NAV:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.DETAILS:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressStartTagInBody(p, token);
        break;
      }
      case TAG_ID.LI:
      case TAG_ID.DD:
      case TAG_ID.DT: {
        listItemStartTagInBody(p, token);
        break;
      }
      case TAG_ID.BR:
      case TAG_ID.IMG:
      case TAG_ID.WBR:
      case TAG_ID.AREA:
      case TAG_ID.EMBED:
      case TAG_ID.KEYGEN: {
        areaStartTagInBody(p, token);
        break;
      }
      case TAG_ID.HR: {
        hrStartTagInBody(p, token);
        break;
      }
      case TAG_ID.RB:
      case TAG_ID.RTC: {
        rbStartTagInBody(p, token);
        break;
      }
      case TAG_ID.RT:
      case TAG_ID.RP: {
        rtStartTagInBody(p, token);
        break;
      }
      case TAG_ID.PRE:
      case TAG_ID.LISTING: {
        preStartTagInBody(p, token);
        break;
      }
      case TAG_ID.XMP: {
        xmpStartTagInBody(p, token);
        break;
      }
      case TAG_ID.SVG: {
        svgStartTagInBody(p, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlStartTagInBody(p, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.STYLE:
      case TAG_ID.TITLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.BGSOUND:
      case TAG_ID.BASEFONT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p, token);
        break;
      }
      case TAG_ID.BODY: {
        bodyStartTagInBody(p, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInBody(p, token);
        break;
      }
      case TAG_ID.NOBR: {
        nobrStartTagInBody(p, token);
        break;
      }
      case TAG_ID.MATH: {
        mathStartTagInBody(p, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInBody(p, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInBody(p, token);
        break;
      }
      case TAG_ID.PARAM:
      case TAG_ID.TRACK:
      case TAG_ID.SOURCE: {
        paramStartTagInBody(p, token);
        break;
      }
      case TAG_ID.IMAGE: {
        imageStartTagInBody(p, token);
        break;
      }
      case TAG_ID.BUTTON: {
        buttonStartTagInBody(p, token);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletStartTagInBody(p, token);
        break;
      }
      case TAG_ID.IFRAME: {
        iframeStartTagInBody(p, token);
        break;
      }
      case TAG_ID.SELECT: {
        selectStartTagInBody(p, token);
        break;
      }
      case TAG_ID.OPTION:
      case TAG_ID.OPTGROUP: {
        optgroupStartTagInBody(p, token);
        break;
      }
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES: {
        rawTextStartTagInBody(p, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        framesetStartTagInBody(p, token);
        break;
      }
      case TAG_ID.TEXTAREA: {
        textareaStartTagInBody(p, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p.options.scriptingEnabled) {
          rawTextStartTagInBody(p, token);
        } else {
          genericStartTagInBody(p, token);
        }
        break;
      }
      case TAG_ID.PLAINTEXT: {
        plaintextStartTagInBody(p, token);
        break;
      }
      case TAG_ID.COL:
      case TAG_ID.TH:
      case TAG_ID.TD:
      case TAG_ID.TR:
      case TAG_ID.HEAD:
      case TAG_ID.FRAME:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP: {
        break;
      }
      default: {
        genericStartTagInBody(p, token);
      }
    }
  }
  function bodyEndTagInBody(p, token) {
    if (p.openElements.hasInScope(TAG_ID.BODY)) {
      p.insertionMode = InsertionMode.AFTER_BODY;
      if (p.options.sourceCodeLocationInfo) {
        const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
        if (bodyElement) {
          p._setEndLocation(bodyElement, token);
        }
      }
    }
  }
  function htmlEndTagInBody(p, token) {
    if (p.openElements.hasInScope(TAG_ID.BODY)) {
      p.insertionMode = InsertionMode.AFTER_BODY;
      endTagAfterBody(p, token);
    }
  }
  function addressEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(tn);
    }
  }
  function formEndTagInBody(p) {
    const inTemplate = p.openElements.tmplCount > 0;
    const { formElement } = p;
    if (!inTemplate) {
      p.formElement = null;
    }
    if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
      p.openElements.generateImpliedEndTags();
      if (inTemplate) {
        p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
      } else if (formElement) {
        p.openElements.remove(formElement);
      }
    }
  }
  function pEndTagInBody(p) {
    if (!p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
    }
    p._closePElement();
  }
  function liEndTagInBody(p) {
    if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
      p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
      p.openElements.popUntilTagNamePopped(TAG_ID.LI);
    }
  }
  function ddEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tn);
      p.openElements.popUntilTagNamePopped(tn);
    }
  }
  function numberedHeaderEndTagInBody(p) {
    if (p.openElements.hasNumberedHeaderInScope()) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilNumberedHeaderPopped();
    }
  }
  function appletEndTagInBody(p, token) {
    const tn = token.tagID;
    if (p.openElements.hasInScope(tn)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(tn);
      p.activeFormattingElements.clearToLastMarker();
    }
  }
  function brEndTagInBody(p) {
    p._reconstructActiveFormattingElements();
    p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
    p.openElements.pop();
    p.framesetOk = false;
  }
  function genericEndTagInBody(p, token) {
    const tn = token.tagName;
    const tid = token.tagID;
    for (let i = p.openElements.stackTop; i > 0; i--) {
      const element = p.openElements.items[i];
      const elementId = p.openElements.tagIDs[i];
      if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
        p.openElements.generateImpliedEndTagsWithExclusion(tid);
        if (p.openElements.stackTop >= i)
          p.openElements.shortenToLength(i);
        break;
      }
      if (p._isSpecialElement(element, elementId)) {
        break;
      }
    }
  }
  function endTagInBody(p, token) {
    switch (token.tagID) {
      case TAG_ID.A:
      case TAG_ID.B:
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.NOBR:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        callAdoptionAgency(p, token);
        break;
      }
      case TAG_ID.P: {
        pEndTagInBody(p);
        break;
      }
      case TAG_ID.DL:
      case TAG_ID.UL:
      case TAG_ID.OL:
      case TAG_ID.DIR:
      case TAG_ID.DIV:
      case TAG_ID.NAV:
      case TAG_ID.PRE:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.BUTTON:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.DETAILS:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.LISTING:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressEndTagInBody(p, token);
        break;
      }
      case TAG_ID.LI: {
        liEndTagInBody(p);
        break;
      }
      case TAG_ID.DD:
      case TAG_ID.DT: {
        ddEndTagInBody(p, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderEndTagInBody(p);
        break;
      }
      case TAG_ID.BR: {
        brEndTagInBody(p);
        break;
      }
      case TAG_ID.BODY: {
        bodyEndTagInBody(p, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlEndTagInBody(p, token);
        break;
      }
      case TAG_ID.FORM: {
        formEndTagInBody(p);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletEndTagInBody(p, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      default: {
        genericEndTagInBody(p, token);
      }
    }
  }
  function eofInBody(p, token) {
    if (p.tmplInsertionModeStack.length > 0) {
      eofInTemplate(p, token);
    } else {
      stopParsing(p, token);
    }
  }
  function endTagInText(p, token) {
    var _a2;
    if (token.tagID === TAG_ID.SCRIPT) {
      (_a2 = p.scriptHandler) === null || _a2 === void 0 ? void 0 : _a2.call(p, p.openElements.current);
    }
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
  }
  function eofInText(p, token) {
    p._err(token, ERR.eofInElementThatCanContainOnlyText);
    p.openElements.pop();
    p.insertionMode = p.originalInsertionMode;
    p.onEof(token);
  }
  function characterInTable(p, token) {
    if (TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
      p.pendingCharacterTokens.length = 0;
      p.hasNonWhitespacePendingCharacterToken = false;
      p.originalInsertionMode = p.insertionMode;
      p.insertionMode = InsertionMode.IN_TABLE_TEXT;
      switch (token.type) {
        case TokenType.CHARACTER: {
          characterInTableText(p, token);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          whitespaceCharacterInTableText(p, token);
          break;
        }
      }
    } else {
      tokenInTable(p, token);
    }
  }
  function captionStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p.activeFormattingElements.insertMarker();
    p._insertElement(token, NS.HTML);
    p.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token, NS.HTML);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
    p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
    startTagInColumnGroup(p, token);
  }
  function tbodyStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertElement(token, NS.HTML);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p, token) {
    p.openElements.clearBackToTableContext();
    p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
    p.insertionMode = InsertionMode.IN_TABLE_BODY;
    startTagInTableBody(p, token);
  }
  function tableStartTagInTable(p, token) {
    if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
      p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
      p._resetInsertionMode();
      p._processStartTag(token);
    }
  }
  function inputStartTagInTable(p, token) {
    if (isHiddenInput(token)) {
      p._appendElement(token, NS.HTML);
    } else {
      tokenInTable(p, token);
    }
    token.ackSelfClosing = true;
  }
  function formStartTagInTable(p, token) {
    if (!p.formElement && p.openElements.tmplCount === 0) {
      p._insertElement(token, NS.HTML);
      p.formElement = p.openElements.current;
      p.openElements.pop();
    }
  }
  function startTagInTable(p, token) {
    switch (token.tagID) {
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        tdStartTagInTable(p, token);
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p, token);
        break;
      }
      case TAG_ID.COL: {
        colStartTagInTable(p, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInTable(p, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInTable(p, token);
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        tbodyStartTagInTable(p, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInTable(p, token);
        break;
      }
      case TAG_ID.CAPTION: {
        captionStartTagInTable(p, token);
        break;
      }
      case TAG_ID.COLGROUP: {
        colgroupStartTagInTable(p, token);
        break;
      }
      default: {
        tokenInTable(p, token);
      }
    }
  }
  function endTagInTable(p, token) {
    switch (token.tagID) {
      case TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
          p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
          p._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        tokenInTable(p, token);
      }
    }
  }
  function tokenInTable(p, token) {
    const savedFosterParentingState = p.fosterParentingEnabled;
    p.fosterParentingEnabled = true;
    modeInBody(p, token);
    p.fosterParentingEnabled = savedFosterParentingState;
  }
  function whitespaceCharacterInTableText(p, token) {
    p.pendingCharacterTokens.push(token);
  }
  function characterInTableText(p, token) {
    p.pendingCharacterTokens.push(token);
    p.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p, token) {
    let i = 0;
    if (p.hasNonWhitespacePendingCharacterToken) {
      for (; i < p.pendingCharacterTokens.length; i++) {
        tokenInTable(p, p.pendingCharacterTokens[i]);
      }
    } else {
      for (; i < p.pendingCharacterTokens.length; i++) {
        p._insertCharacters(p.pendingCharacterTokens[i]);
      }
    }
    p.insertionMode = p.originalInsertionMode;
    p._processToken(token);
  }
  var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
  function startTagInCaption(p, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token);
      }
    } else {
      startTagInBody(p, token);
    }
  }
  function endTagInCaption(p, token) {
    const tn = token.tagID;
    switch (tn) {
      case TAG_ID.CAPTION:
      case TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = InsertionMode.IN_TABLE;
          if (tn === TAG_ID.TABLE) {
            endTagInTable(p, token);
          }
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInBody(p, token);
      }
    }
  }
  function startTagInColumnGroup(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.COL: {
        p._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TEMPLATE: {
        startTagInHead(p, token);
        break;
      }
      default: {
        tokenInColumnGroup(p, token);
      }
    }
  }
  function endTagInColumnGroup(p, token) {
    switch (token.tagID) {
      case TAG_ID.COLGROUP: {
        if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      case TAG_ID.COL: {
        break;
      }
      default: {
        tokenInColumnGroup(p, token);
      }
    }
  }
  function tokenInColumnGroup(p, token) {
    if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_TABLE;
      p._processToken(token);
    }
  }
  function startTagInTableBody(p, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        p.openElements.clearBackToTableBodyContext();
        p._insertElement(token, NS.HTML);
        p.insertionMode = InsertionMode.IN_ROW;
        break;
      }
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p.openElements.clearBackToTableBodyContext();
        p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
        p.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p, token);
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
          startTagInTable(p, token);
        }
        break;
      }
      default: {
        startTagInTable(p, token);
      }
    }
  }
  function endTagInTableBody(p, token) {
    const tn = token.tagID;
    switch (token.tagID) {
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE;
          endTagInTable(p, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInTable(p, token);
      }
    }
  }
  function startTagInRow(p, token) {
    switch (token.tagID) {
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p.openElements.clearBackToTableRowContext();
        p._insertElement(token, NS.HTML);
        p.insertionMode = InsertionMode.IN_CELL;
        p.activeFormattingElements.insertMarker();
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p.openElements.hasInTableScope(TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          startTagInTableBody(p, token);
        }
        break;
      }
      default: {
        startTagInTable(p, token);
      }
    }
  }
  function endTagInRow(p, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        if (p.openElements.hasInTableScope(TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p.openElements.hasInTableScope(TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p, token);
        }
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH: {
        break;
      }
      default: {
        endTagInTable(p, token);
      }
    }
  }
  function startTagInCell(p, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
        p._closeTableCell();
        startTagInRow(p, token);
      }
    } else {
      startTagInBody(p, token);
    }
  }
  function endTagInCell(p, token) {
    const tn = token.tagID;
    switch (tn) {
      case TAG_ID.TD:
      case TAG_ID.TH: {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(tn);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = InsertionMode.IN_ROW;
        }
        break;
      }
      case TAG_ID.TABLE:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p.openElements.hasInTableScope(tn)) {
          p._closeTableCell();
          endTagInRow(p, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML: {
        break;
      }
      default: {
        endTagInBody(p, token);
      }
    }
  }
  function startTagInSelect(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.OPTION: {
        if (p.openElements.currentTagId === TAG_ID.OPTION) {
          p.openElements.pop();
        }
        p._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.OPTGROUP: {
        if (p.openElements.currentTagId === TAG_ID.OPTION) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        p._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.HR: {
        if (p.openElements.currentTagId === TAG_ID.OPTION) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        p._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.INPUT:
      case TAG_ID.KEYGEN:
      case TAG_ID.TEXTAREA:
      case TAG_ID.SELECT: {
        if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p._resetInsertionMode();
          if (token.tagID !== TAG_ID.SELECT) {
            p._processStartTag(token);
          }
        }
        break;
      }
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p, token);
        break;
      }
      default:
    }
  }
  function endTagInSelect(p, token) {
    switch (token.tagID) {
      case TAG_ID.OPTGROUP: {
        if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p.openElements.pop();
        }
        break;
      }
      case TAG_ID.OPTION: {
        if (p.openElements.currentTagId === TAG_ID.OPTION) {
          p.openElements.pop();
        }
        break;
      }
      case TAG_ID.SELECT: {
        if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p, token);
        break;
      }
      default:
    }
  }
  function startTagInSelectInTable(p, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
      p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p._resetInsertionMode();
      p._processStartTag(token);
    } else {
      startTagInSelect(p, token);
    }
  }
  function endTagInSelectInTable(p, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p._resetInsertionMode();
        p.onEndTag(token);
      }
    } else {
      endTagInSelect(p, token);
    }
  }
  function startTagInTemplate(p, token) {
    switch (token.tagID) {
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        startTagInHead(p, token);
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token);
        break;
      }
      case TAG_ID.COL: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
        p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
        startTagInColumnGroup(p, token);
        break;
      }
      case TAG_ID.TR: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p, token);
        break;
      }
      case TAG_ID.TD:
      case TAG_ID.TH: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
        p.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p, token);
        break;
      }
      default: {
        p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
        p.insertionMode = InsertionMode.IN_BODY;
        startTagInBody(p, token);
      }
    }
  }
  function endTagInTemplate(p, token) {
    if (token.tagID === TAG_ID.TEMPLATE) {
      templateEndTagInHead(p, token);
    }
  }
  function eofInTemplate(p, token) {
    if (p.openElements.tmplCount > 0) {
      p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p.activeFormattingElements.clearToLastMarker();
      p.tmplInsertionModeStack.shift();
      p._resetInsertionMode();
      p.onEof(token);
    } else {
      stopParsing(p, token);
    }
  }
  function startTagAfterBody(p, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p, token);
    } else {
      tokenAfterBody(p, token);
    }
  }
  function endTagAfterBody(p, token) {
    var _a2;
    if (token.tagID === TAG_ID.HTML) {
      if (!p.fragmentContext) {
        p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
      }
      if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
        p._setEndLocation(p.openElements.items[0], token);
        const bodyElement = p.openElements.items[1];
        if (bodyElement && !((_a2 = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a2 === void 0 ? void 0 : _a2.endTag)) {
          p._setEndLocation(bodyElement, token);
        }
      }
    } else {
      tokenAfterBody(p, token);
    }
  }
  function tokenAfterBody(p, token) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
  }
  function startTagInFrameset(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        p._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.FRAME: {
        p._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p, token);
        break;
      }
      default:
    }
  }
  function endTagInFrameset(p, token) {
    if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
      p.openElements.pop();
      if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) {
        p.insertionMode = InsertionMode.AFTER_FRAMESET;
      }
    }
  }
  function startTagAfterFrameset(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p, token);
        break;
      }
      default:
    }
  }
  function endTagAfterFrameset(p, token) {
    if (token.tagID === TAG_ID.HTML) {
      p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
    }
  }
  function startTagAfterAfterBody(p, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p, token);
    } else {
      tokenAfterAfterBody(p, token);
    }
  }
  function tokenAfterAfterBody(p, token) {
    p.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p, token);
  }
  function startTagAfterAfterFrameset(p, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p, token);
        break;
      }
      default:
    }
  }
  function nullCharacterInForeignContent(p, token) {
    token.chars = REPLACEMENT_CHARACTER;
    p._insertCharacters(token);
  }
  function characterInForeignContent(p, token) {
    p._insertCharacters(token);
    p.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p) {
    while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
      p.openElements.pop();
    }
  }
  function startTagInForeignContent(p, token) {
    if (causesExit(token)) {
      popUntilHtmlOrIntegrationPoint(p);
      p._startTagOutsideForeignContent(token);
    } else {
      const current = p._getAdjustedCurrentElement();
      const currentNs = p.treeAdapter.getNamespaceURI(current);
      if (currentNs === NS.MATHML) {
        adjustTokenMathMLAttrs(token);
      } else if (currentNs === NS.SVG) {
        adjustTokenSVGTagName(token);
        adjustTokenSVGAttrs(token);
      }
      adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
        p._appendElement(token, currentNs);
      } else {
        p._insertElement(token, currentNs);
      }
      token.ackSelfClosing = true;
    }
  }
  function endTagInForeignContent(p, token) {
    if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
      popUntilHtmlOrIntegrationPoint(p);
      p._endTagOutsideForeignContent(token);
      return;
    }
    for (let i = p.openElements.stackTop; i > 0; i--) {
      const element = p.openElements.items[i];
      if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
        p._endTagOutsideForeignContent(token);
        break;
      }
      const tagName = p.treeAdapter.getTagName(element);
      if (tagName.toLowerCase() === token.tagName) {
        token.tagName = tagName;
        p.openElements.shortenToLength(i);
        break;
      }
    }
  }

  // node_modules/parse5/dist/serializer/index.js
  init_buffer();
  var VOID_ELEMENTS = /* @__PURE__ */ new Set([
    TAG_NAMES.AREA,
    TAG_NAMES.BASE,
    TAG_NAMES.BASEFONT,
    TAG_NAMES.BGSOUND,
    TAG_NAMES.BR,
    TAG_NAMES.COL,
    TAG_NAMES.EMBED,
    TAG_NAMES.FRAME,
    TAG_NAMES.HR,
    TAG_NAMES.IMG,
    TAG_NAMES.INPUT,
    TAG_NAMES.KEYGEN,
    TAG_NAMES.LINK,
    TAG_NAMES.META,
    TAG_NAMES.PARAM,
    TAG_NAMES.SOURCE,
    TAG_NAMES.TRACK,
    TAG_NAMES.WBR
  ]);
  function isVoidElement(node, options) {
    return options.treeAdapter.isElementNode(node) && options.treeAdapter.getNamespaceURI(node) === NS.HTML && VOID_ELEMENTS.has(options.treeAdapter.getTagName(node));
  }
  var defaultOpts3 = { treeAdapter: defaultTreeAdapter, scriptingEnabled: true };
  function serializeOuter(node, options) {
    const opts = { ...defaultOpts3, ...options };
    return serializeNode(node, opts);
  }
  function serializeChildNodes(parentNode, options) {
    let html3 = "";
    const container = options.treeAdapter.isElementNode(parentNode) && options.treeAdapter.getTagName(parentNode) === TAG_NAMES.TEMPLATE && options.treeAdapter.getNamespaceURI(parentNode) === NS.HTML ? options.treeAdapter.getTemplateContent(parentNode) : parentNode;
    const childNodes = options.treeAdapter.getChildNodes(container);
    if (childNodes) {
      for (const currentNode of childNodes) {
        html3 += serializeNode(currentNode, options);
      }
    }
    return html3;
  }
  function serializeNode(node, options) {
    if (options.treeAdapter.isElementNode(node)) {
      return serializeElement(node, options);
    }
    if (options.treeAdapter.isTextNode(node)) {
      return serializeTextNode(node, options);
    }
    if (options.treeAdapter.isCommentNode(node)) {
      return serializeCommentNode(node, options);
    }
    if (options.treeAdapter.isDocumentTypeNode(node)) {
      return serializeDocumentTypeNode(node, options);
    }
    return "";
  }
  function serializeElement(node, options) {
    const tn = options.treeAdapter.getTagName(node);
    return `<${tn}${serializeAttributes(node, options)}>${isVoidElement(node, options) ? "" : `${serializeChildNodes(node, options)}</${tn}>`}`;
  }
  function serializeAttributes(node, { treeAdapter }) {
    let html3 = "";
    for (const attr2 of treeAdapter.getAttrList(node)) {
      html3 += " ";
      if (attr2.namespace) {
        switch (attr2.namespace) {
          case NS.XML: {
            html3 += `xml:${attr2.name}`;
            break;
          }
          case NS.XMLNS: {
            if (attr2.name !== "xmlns") {
              html3 += "xmlns:";
            }
            html3 += attr2.name;
            break;
          }
          case NS.XLINK: {
            html3 += `xlink:${attr2.name}`;
            break;
          }
          default: {
            html3 += `${attr2.prefix}:${attr2.name}`;
          }
        }
      } else {
        html3 += attr2.name;
      }
      html3 += `="${escapeAttribute(attr2.value)}"`;
    }
    return html3;
  }
  function serializeTextNode(node, options) {
    const { treeAdapter } = options;
    const content = treeAdapter.getTextNodeContent(node);
    const parent2 = treeAdapter.getParentNode(node);
    const parentTn = parent2 && treeAdapter.isElementNode(parent2) && treeAdapter.getTagName(parent2);
    return parentTn && treeAdapter.getNamespaceURI(parent2) === NS.HTML && hasUnescapedText(parentTn, options.scriptingEnabled) ? content : escapeText(content);
  }
  function serializeCommentNode(node, { treeAdapter }) {
    return `<!--${treeAdapter.getCommentNodeContent(node)}-->`;
  }
  function serializeDocumentTypeNode(node, { treeAdapter }) {
    return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node)}>`;
  }

  // node_modules/parse5/dist/index.js
  function parse4(html3, options) {
    return Parser.parse(html3, options);
  }
  function parseFragment(fragmentContext, html3, options) {
    if (typeof fragmentContext === "string") {
      options = html3;
      html3 = fragmentContext;
      fragmentContext = null;
    }
    const parser = Parser.getFragmentParser(fragmentContext, options);
    parser.tokenizer.write(html3, true);
    return parser.getFragment();
  }

  // node_modules/parse5-htmlparser2-tree-adapter/dist/index.js
  init_buffer();
  function enquoteDoctypeId(id) {
    const quote = id.includes('"') ? "'" : '"';
    return quote + id + quote;
  }
  function serializeDoctypeContent(name, publicId, systemId) {
    let str = "!DOCTYPE ";
    if (name) {
      str += name;
    }
    if (publicId) {
      str += ` PUBLIC ${enquoteDoctypeId(publicId)}`;
    } else if (systemId) {
      str += " SYSTEM";
    }
    if (systemId) {
      str += ` ${enquoteDoctypeId(systemId)}`;
    }
    return str;
  }
  var adapter = {
    // Re-exports from domhandler
    isCommentNode: isComment,
    isElementNode: isTag2,
    isTextNode: isText,
    //Node construction
    createDocument() {
      const node = new Document([]);
      node["x-mode"] = html_exports.DOCUMENT_MODE.NO_QUIRKS;
      return node;
    },
    createDocumentFragment() {
      return new Document([]);
    },
    createElement(tagName, namespaceURI, attrs) {
      const attribs = /* @__PURE__ */ Object.create(null);
      const attribsNamespace = /* @__PURE__ */ Object.create(null);
      const attribsPrefix = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < attrs.length; i++) {
        const attrName = attrs[i].name;
        attribs[attrName] = attrs[i].value;
        attribsNamespace[attrName] = attrs[i].namespace;
        attribsPrefix[attrName] = attrs[i].prefix;
      }
      const node = new Element(tagName, attribs, []);
      node.namespace = namespaceURI;
      node["x-attribsNamespace"] = attribsNamespace;
      node["x-attribsPrefix"] = attribsPrefix;
      return node;
    },
    createCommentNode(data2) {
      return new Comment2(data2);
    },
    createTextNode(value) {
      return new Text2(value);
    },
    //Tree mutation
    appendChild(parentNode, newNode) {
      const prev2 = parentNode.children[parentNode.children.length - 1];
      if (prev2) {
        prev2.next = newNode;
        newNode.prev = prev2;
      }
      parentNode.children.push(newNode);
      newNode.parent = parentNode;
    },
    insertBefore(parentNode, newNode, referenceNode) {
      const insertionIdx = parentNode.children.indexOf(referenceNode);
      const { prev: prev2 } = referenceNode;
      if (prev2) {
        prev2.next = newNode;
        newNode.prev = prev2;
      }
      referenceNode.prev = newNode;
      newNode.next = referenceNode;
      parentNode.children.splice(insertionIdx, 0, newNode);
      newNode.parent = parentNode;
    },
    setTemplateContent(templateElement, contentElement) {
      adapter.appendChild(templateElement, contentElement);
    },
    getTemplateContent(templateElement) {
      return templateElement.children[0];
    },
    setDocumentType(document, name, publicId, systemId) {
      const data2 = serializeDoctypeContent(name, publicId, systemId);
      let doctypeNode = document.children.find((node) => isDirective(node) && node.name === "!doctype");
      if (doctypeNode) {
        doctypeNode.data = data2 !== null && data2 !== void 0 ? data2 : null;
      } else {
        doctypeNode = new ProcessingInstruction("!doctype", data2);
        adapter.appendChild(document, doctypeNode);
      }
      doctypeNode["x-name"] = name;
      doctypeNode["x-publicId"] = publicId;
      doctypeNode["x-systemId"] = systemId;
    },
    setDocumentMode(document, mode) {
      document["x-mode"] = mode;
    },
    getDocumentMode(document) {
      return document["x-mode"];
    },
    detachNode(node) {
      if (node.parent) {
        const idx = node.parent.children.indexOf(node);
        const { prev: prev2, next: next2 } = node;
        node.prev = null;
        node.next = null;
        if (prev2) {
          prev2.next = next2;
        }
        if (next2) {
          next2.prev = prev2;
        }
        node.parent.children.splice(idx, 1);
        node.parent = null;
      }
    },
    insertText(parentNode, text3) {
      const lastChild = parentNode.children[parentNode.children.length - 1];
      if (lastChild && isText(lastChild)) {
        lastChild.data += text3;
      } else {
        adapter.appendChild(parentNode, adapter.createTextNode(text3));
      }
    },
    insertTextBefore(parentNode, text3, referenceNode) {
      const prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];
      if (prevNode && isText(prevNode)) {
        prevNode.data += text3;
      } else {
        adapter.insertBefore(parentNode, adapter.createTextNode(text3), referenceNode);
      }
    },
    adoptAttributes(recipient, attrs) {
      for (let i = 0; i < attrs.length; i++) {
        const attrName = attrs[i].name;
        if (recipient.attribs[attrName] === void 0) {
          recipient.attribs[attrName] = attrs[i].value;
          recipient["x-attribsNamespace"][attrName] = attrs[i].namespace;
          recipient["x-attribsPrefix"][attrName] = attrs[i].prefix;
        }
      }
    },
    //Tree traversing
    getFirstChild(node) {
      return node.children[0];
    },
    getChildNodes(node) {
      return node.children;
    },
    getParentNode(node) {
      return node.parent;
    },
    getAttrList(element) {
      return element.attributes;
    },
    //Node data
    getTagName(element) {
      return element.name;
    },
    getNamespaceURI(element) {
      return element.namespace;
    },
    getTextNodeContent(textNode) {
      return textNode.data;
    },
    getCommentNodeContent(commentNode) {
      return commentNode.data;
    },
    getDocumentTypeNodeName(doctypeNode) {
      var _a2;
      return (_a2 = doctypeNode["x-name"]) !== null && _a2 !== void 0 ? _a2 : "";
    },
    getDocumentTypeNodePublicId(doctypeNode) {
      var _a2;
      return (_a2 = doctypeNode["x-publicId"]) !== null && _a2 !== void 0 ? _a2 : "";
    },
    getDocumentTypeNodeSystemId(doctypeNode) {
      var _a2;
      return (_a2 = doctypeNode["x-systemId"]) !== null && _a2 !== void 0 ? _a2 : "";
    },
    //Node types
    isDocumentTypeNode(node) {
      return isDirective(node) && node.name === "!doctype";
    },
    // Source code location
    setNodeSourceCodeLocation(node, location) {
      if (location) {
        node.startIndex = location.startOffset;
        node.endIndex = location.endOffset;
      }
      node.sourceCodeLocation = location;
    },
    getNodeSourceCodeLocation(node) {
      return node.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(node, endLocation) {
      if (endLocation.endOffset != null)
        node.endIndex = endLocation.endOffset;
      node.sourceCodeLocation = {
        ...node.sourceCodeLocation,
        ...endLocation
      };
    }
  };

  // node_modules/cheerio/dist/browser/parsers/parse5-adapter.js
  function parseWithParse5(content, options, isDocument2, context) {
    var _a2;
    (_a2 = options.treeAdapter) !== null && _a2 !== void 0 ? _a2 : options.treeAdapter = adapter;
    if (options.scriptingEnabled !== false) {
      options.scriptingEnabled = true;
    }
    return isDocument2 ? parse4(content, options) : parseFragment(context, content, options);
  }
  var renderOpts = { treeAdapter: adapter };
  function renderWithParse5(dom) {
    const nodes = "length" in dom ? dom : [dom];
    for (let index2 = 0; index2 < nodes.length; index2 += 1) {
      const node = nodes[index2];
      if (isDocument(node)) {
        Array.prototype.splice.call(nodes, index2, 1, ...node.children);
      }
    }
    let result = "";
    for (let index2 = 0; index2 < nodes.length; index2 += 1) {
      const node = nodes[index2];
      result += serializeOuter(node, renderOpts);
    }
    return result;
  }

  // node_modules/htmlparser2/lib/esm/index.js
  init_buffer();

  // node_modules/htmlparser2/lib/esm/Parser.js
  init_buffer();

  // node_modules/htmlparser2/lib/esm/Tokenizer.js
  init_buffer();
  var CharCodes2;
  (function(CharCodes3) {
    CharCodes3[CharCodes3["Tab"] = 9] = "Tab";
    CharCodes3[CharCodes3["NewLine"] = 10] = "NewLine";
    CharCodes3[CharCodes3["FormFeed"] = 12] = "FormFeed";
    CharCodes3[CharCodes3["CarriageReturn"] = 13] = "CarriageReturn";
    CharCodes3[CharCodes3["Space"] = 32] = "Space";
    CharCodes3[CharCodes3["ExclamationMark"] = 33] = "ExclamationMark";
    CharCodes3[CharCodes3["Number"] = 35] = "Number";
    CharCodes3[CharCodes3["Amp"] = 38] = "Amp";
    CharCodes3[CharCodes3["SingleQuote"] = 39] = "SingleQuote";
    CharCodes3[CharCodes3["DoubleQuote"] = 34] = "DoubleQuote";
    CharCodes3[CharCodes3["Dash"] = 45] = "Dash";
    CharCodes3[CharCodes3["Slash"] = 47] = "Slash";
    CharCodes3[CharCodes3["Zero"] = 48] = "Zero";
    CharCodes3[CharCodes3["Nine"] = 57] = "Nine";
    CharCodes3[CharCodes3["Semi"] = 59] = "Semi";
    CharCodes3[CharCodes3["Lt"] = 60] = "Lt";
    CharCodes3[CharCodes3["Eq"] = 61] = "Eq";
    CharCodes3[CharCodes3["Gt"] = 62] = "Gt";
    CharCodes3[CharCodes3["Questionmark"] = 63] = "Questionmark";
    CharCodes3[CharCodes3["UpperA"] = 65] = "UpperA";
    CharCodes3[CharCodes3["LowerA"] = 97] = "LowerA";
    CharCodes3[CharCodes3["UpperF"] = 70] = "UpperF";
    CharCodes3[CharCodes3["LowerF"] = 102] = "LowerF";
    CharCodes3[CharCodes3["UpperZ"] = 90] = "UpperZ";
    CharCodes3[CharCodes3["LowerZ"] = 122] = "LowerZ";
    CharCodes3[CharCodes3["LowerX"] = 120] = "LowerX";
    CharCodes3[CharCodes3["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
  })(CharCodes2 || (CharCodes2 = {}));
  var State2;
  (function(State3) {
    State3[State3["Text"] = 1] = "Text";
    State3[State3["BeforeTagName"] = 2] = "BeforeTagName";
    State3[State3["InTagName"] = 3] = "InTagName";
    State3[State3["InSelfClosingTag"] = 4] = "InSelfClosingTag";
    State3[State3["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
    State3[State3["InClosingTagName"] = 6] = "InClosingTagName";
    State3[State3["AfterClosingTagName"] = 7] = "AfterClosingTagName";
    State3[State3["BeforeAttributeName"] = 8] = "BeforeAttributeName";
    State3[State3["InAttributeName"] = 9] = "InAttributeName";
    State3[State3["AfterAttributeName"] = 10] = "AfterAttributeName";
    State3[State3["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
    State3[State3["InAttributeValueDq"] = 12] = "InAttributeValueDq";
    State3[State3["InAttributeValueSq"] = 13] = "InAttributeValueSq";
    State3[State3["InAttributeValueNq"] = 14] = "InAttributeValueNq";
    State3[State3["BeforeDeclaration"] = 15] = "BeforeDeclaration";
    State3[State3["InDeclaration"] = 16] = "InDeclaration";
    State3[State3["InProcessingInstruction"] = 17] = "InProcessingInstruction";
    State3[State3["BeforeComment"] = 18] = "BeforeComment";
    State3[State3["CDATASequence"] = 19] = "CDATASequence";
    State3[State3["InSpecialComment"] = 20] = "InSpecialComment";
    State3[State3["InCommentLike"] = 21] = "InCommentLike";
    State3[State3["BeforeSpecialS"] = 22] = "BeforeSpecialS";
    State3[State3["BeforeSpecialT"] = 23] = "BeforeSpecialT";
    State3[State3["SpecialStartSequence"] = 24] = "SpecialStartSequence";
    State3[State3["InSpecialTag"] = 25] = "InSpecialTag";
    State3[State3["InEntity"] = 26] = "InEntity";
  })(State2 || (State2 = {}));
  function isWhitespace3(c) {
    return c === CharCodes2.Space || c === CharCodes2.NewLine || c === CharCodes2.Tab || c === CharCodes2.FormFeed || c === CharCodes2.CarriageReturn;
  }
  function isEndOfTagSection(c) {
    return c === CharCodes2.Slash || c === CharCodes2.Gt || isWhitespace3(c);
  }
  function isASCIIAlpha(c) {
    return c >= CharCodes2.LowerA && c <= CharCodes2.LowerZ || c >= CharCodes2.UpperA && c <= CharCodes2.UpperZ;
  }
  var QuoteType;
  (function(QuoteType2) {
    QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
    QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
    QuoteType2[QuoteType2["Single"] = 2] = "Single";
    QuoteType2[QuoteType2["Double"] = 3] = "Double";
  })(QuoteType || (QuoteType = {}));
  var Sequences = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    // CDATA[
    CdataEnd: new Uint8Array([93, 93, 62]),
    // ]]>
    CommentEnd: new Uint8Array([45, 45, 62]),
    // `-->`
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    // `<\/script`
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    // `</style`
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
    // `</title`
    TextareaEnd: new Uint8Array([
      60,
      47,
      116,
      101,
      120,
      116,
      97,
      114,
      101,
      97
    ])
    // `</textarea`
  };
  var Tokenizer2 = class {
    constructor({ xmlMode = false, decodeEntities = true }, cbs) {
      this.cbs = cbs;
      this.state = State2.Text;
      this.buffer = "";
      this.sectionStart = 0;
      this.index = 0;
      this.entityStart = 0;
      this.baseState = State2.Text;
      this.isSpecial = false;
      this.running = true;
      this.offset = 0;
      this.currentSequence = void 0;
      this.sequenceIndex = 0;
      this.xmlMode = xmlMode;
      this.decodeEntities = decodeEntities;
      this.entityDecoder = new EntityDecoder(xmlMode ? decode_data_xml_default : decode_data_html_default, (cp, consumed) => this.emitCodePoint(cp, consumed));
    }
    reset() {
      this.state = State2.Text;
      this.buffer = "";
      this.sectionStart = 0;
      this.index = 0;
      this.baseState = State2.Text;
      this.currentSequence = void 0;
      this.running = true;
      this.offset = 0;
    }
    write(chunk) {
      this.offset += this.buffer.length;
      this.buffer = chunk;
      this.parse();
    }
    end() {
      if (this.running)
        this.finish();
    }
    pause() {
      this.running = false;
    }
    resume() {
      this.running = true;
      if (this.index < this.buffer.length + this.offset) {
        this.parse();
      }
    }
    stateText(c) {
      if (c === CharCodes2.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes2.Lt)) {
        if (this.index > this.sectionStart) {
          this.cbs.ontext(this.sectionStart, this.index);
        }
        this.state = State2.BeforeTagName;
        this.sectionStart = this.index;
      } else if (this.decodeEntities && c === CharCodes2.Amp) {
        this.startEntity();
      }
    }
    stateSpecialStartSequence(c) {
      const isEnd = this.sequenceIndex === this.currentSequence.length;
      const isMatch = isEnd ? (
        // If we are at the end of the sequence, make sure the tag name has ended
        isEndOfTagSection(c)
      ) : (
        // Otherwise, do a case-insensitive comparison
        (c | 32) === this.currentSequence[this.sequenceIndex]
      );
      if (!isMatch) {
        this.isSpecial = false;
      } else if (!isEnd) {
        this.sequenceIndex++;
        return;
      }
      this.sequenceIndex = 0;
      this.state = State2.InTagName;
      this.stateInTagName(c);
    }
    /** Look for an end tag. For <title> tags, also decode entities. */
    stateInSpecialTag(c) {
      if (this.sequenceIndex === this.currentSequence.length) {
        if (c === CharCodes2.Gt || isWhitespace3(c)) {
          const endOfText = this.index - this.currentSequence.length;
          if (this.sectionStart < endOfText) {
            const actualIndex = this.index;
            this.index = endOfText;
            this.cbs.ontext(this.sectionStart, endOfText);
            this.index = actualIndex;
          }
          this.isSpecial = false;
          this.sectionStart = endOfText + 2;
          this.stateInClosingTagName(c);
          return;
        }
        this.sequenceIndex = 0;
      }
      if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
        this.sequenceIndex += 1;
      } else if (this.sequenceIndex === 0) {
        if (this.currentSequence === Sequences.TitleEnd) {
          if (this.decodeEntities && c === CharCodes2.Amp) {
            this.startEntity();
          }
        } else if (this.fastForwardTo(CharCodes2.Lt)) {
          this.sequenceIndex = 1;
        }
      } else {
        this.sequenceIndex = Number(c === CharCodes2.Lt);
      }
    }
    stateCDATASequence(c) {
      if (c === Sequences.Cdata[this.sequenceIndex]) {
        if (++this.sequenceIndex === Sequences.Cdata.length) {
          this.state = State2.InCommentLike;
          this.currentSequence = Sequences.CdataEnd;
          this.sequenceIndex = 0;
          this.sectionStart = this.index + 1;
        }
      } else {
        this.sequenceIndex = 0;
        this.state = State2.InDeclaration;
        this.stateInDeclaration(c);
      }
    }
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */
    fastForwardTo(c) {
      while (++this.index < this.buffer.length + this.offset) {
        if (this.buffer.charCodeAt(this.index - this.offset) === c) {
          return true;
        }
      }
      this.index = this.buffer.length + this.offset - 1;
      return false;
    }
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */
    stateInCommentLike(c) {
      if (c === this.currentSequence[this.sequenceIndex]) {
        if (++this.sequenceIndex === this.currentSequence.length) {
          if (this.currentSequence === Sequences.CdataEnd) {
            this.cbs.oncdata(this.sectionStart, this.index, 2);
          } else {
            this.cbs.oncomment(this.sectionStart, this.index, 2);
          }
          this.sequenceIndex = 0;
          this.sectionStart = this.index + 1;
          this.state = State2.Text;
        }
      } else if (this.sequenceIndex === 0) {
        if (this.fastForwardTo(this.currentSequence[0])) {
          this.sequenceIndex = 1;
        }
      } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
        this.sequenceIndex = 0;
      }
    }
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    isTagStartChar(c) {
      return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
    }
    startSpecial(sequence, offset) {
      this.isSpecial = true;
      this.currentSequence = sequence;
      this.sequenceIndex = offset;
      this.state = State2.SpecialStartSequence;
    }
    stateBeforeTagName(c) {
      if (c === CharCodes2.ExclamationMark) {
        this.state = State2.BeforeDeclaration;
        this.sectionStart = this.index + 1;
      } else if (c === CharCodes2.Questionmark) {
        this.state = State2.InProcessingInstruction;
        this.sectionStart = this.index + 1;
      } else if (this.isTagStartChar(c)) {
        const lower = c | 32;
        this.sectionStart = this.index;
        if (this.xmlMode) {
          this.state = State2.InTagName;
        } else if (lower === Sequences.ScriptEnd[2]) {
          this.state = State2.BeforeSpecialS;
        } else if (lower === Sequences.TitleEnd[2]) {
          this.state = State2.BeforeSpecialT;
        } else {
          this.state = State2.InTagName;
        }
      } else if (c === CharCodes2.Slash) {
        this.state = State2.BeforeClosingTagName;
      } else {
        this.state = State2.Text;
        this.stateText(c);
      }
    }
    stateInTagName(c) {
      if (isEndOfTagSection(c)) {
        this.cbs.onopentagname(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.state = State2.BeforeAttributeName;
        this.stateBeforeAttributeName(c);
      }
    }
    stateBeforeClosingTagName(c) {
      if (isWhitespace3(c)) {
      } else if (c === CharCodes2.Gt) {
        this.state = State2.Text;
      } else {
        this.state = this.isTagStartChar(c) ? State2.InClosingTagName : State2.InSpecialComment;
        this.sectionStart = this.index;
      }
    }
    stateInClosingTagName(c) {
      if (c === CharCodes2.Gt || isWhitespace3(c)) {
        this.cbs.onclosetag(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.state = State2.AfterClosingTagName;
        this.stateAfterClosingTagName(c);
      }
    }
    stateAfterClosingTagName(c) {
      if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
        this.state = State2.Text;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeAttributeName(c) {
      if (c === CharCodes2.Gt) {
        this.cbs.onopentagend(this.index);
        if (this.isSpecial) {
          this.state = State2.InSpecialTag;
          this.sequenceIndex = 0;
        } else {
          this.state = State2.Text;
        }
        this.sectionStart = this.index + 1;
      } else if (c === CharCodes2.Slash) {
        this.state = State2.InSelfClosingTag;
      } else if (!isWhitespace3(c)) {
        this.state = State2.InAttributeName;
        this.sectionStart = this.index;
      }
    }
    stateInSelfClosingTag(c) {
      if (c === CharCodes2.Gt) {
        this.cbs.onselfclosingtag(this.index);
        this.state = State2.Text;
        this.sectionStart = this.index + 1;
        this.isSpecial = false;
      } else if (!isWhitespace3(c)) {
        this.state = State2.BeforeAttributeName;
        this.stateBeforeAttributeName(c);
      }
    }
    stateInAttributeName(c) {
      if (c === CharCodes2.Eq || isEndOfTagSection(c)) {
        this.cbs.onattribname(this.sectionStart, this.index);
        this.sectionStart = this.index;
        this.state = State2.AfterAttributeName;
        this.stateAfterAttributeName(c);
      }
    }
    stateAfterAttributeName(c) {
      if (c === CharCodes2.Eq) {
        this.state = State2.BeforeAttributeValue;
      } else if (c === CharCodes2.Slash || c === CharCodes2.Gt) {
        this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
        this.sectionStart = -1;
        this.state = State2.BeforeAttributeName;
        this.stateBeforeAttributeName(c);
      } else if (!isWhitespace3(c)) {
        this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
        this.state = State2.InAttributeName;
        this.sectionStart = this.index;
      }
    }
    stateBeforeAttributeValue(c) {
      if (c === CharCodes2.DoubleQuote) {
        this.state = State2.InAttributeValueDq;
        this.sectionStart = this.index + 1;
      } else if (c === CharCodes2.SingleQuote) {
        this.state = State2.InAttributeValueSq;
        this.sectionStart = this.index + 1;
      } else if (!isWhitespace3(c)) {
        this.sectionStart = this.index;
        this.state = State2.InAttributeValueNq;
        this.stateInAttributeValueNoQuotes(c);
      }
    }
    handleInAttributeValue(c, quote) {
      if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.cbs.onattribend(quote === CharCodes2.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
        this.state = State2.BeforeAttributeName;
      } else if (this.decodeEntities && c === CharCodes2.Amp) {
        this.startEntity();
      }
    }
    stateInAttributeValueDoubleQuotes(c) {
      this.handleInAttributeValue(c, CharCodes2.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(c) {
      this.handleInAttributeValue(c, CharCodes2.SingleQuote);
    }
    stateInAttributeValueNoQuotes(c) {
      if (isWhitespace3(c) || c === CharCodes2.Gt) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.cbs.onattribend(QuoteType.Unquoted, this.index);
        this.state = State2.BeforeAttributeName;
        this.stateBeforeAttributeName(c);
      } else if (this.decodeEntities && c === CharCodes2.Amp) {
        this.startEntity();
      }
    }
    stateBeforeDeclaration(c) {
      if (c === CharCodes2.OpeningSquareBracket) {
        this.state = State2.CDATASequence;
        this.sequenceIndex = 0;
      } else {
        this.state = c === CharCodes2.Dash ? State2.BeforeComment : State2.InDeclaration;
      }
    }
    stateInDeclaration(c) {
      if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
        this.cbs.ondeclaration(this.sectionStart, this.index);
        this.state = State2.Text;
        this.sectionStart = this.index + 1;
      }
    }
    stateInProcessingInstruction(c) {
      if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
        this.cbs.onprocessinginstruction(this.sectionStart, this.index);
        this.state = State2.Text;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeComment(c) {
      if (c === CharCodes2.Dash) {
        this.state = State2.InCommentLike;
        this.currentSequence = Sequences.CommentEnd;
        this.sequenceIndex = 2;
        this.sectionStart = this.index + 1;
      } else {
        this.state = State2.InDeclaration;
      }
    }
    stateInSpecialComment(c) {
      if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
        this.cbs.oncomment(this.sectionStart, this.index, 0);
        this.state = State2.Text;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeSpecialS(c) {
      const lower = c | 32;
      if (lower === Sequences.ScriptEnd[3]) {
        this.startSpecial(Sequences.ScriptEnd, 4);
      } else if (lower === Sequences.StyleEnd[3]) {
        this.startSpecial(Sequences.StyleEnd, 4);
      } else {
        this.state = State2.InTagName;
        this.stateInTagName(c);
      }
    }
    stateBeforeSpecialT(c) {
      const lower = c | 32;
      if (lower === Sequences.TitleEnd[3]) {
        this.startSpecial(Sequences.TitleEnd, 4);
      } else if (lower === Sequences.TextareaEnd[3]) {
        this.startSpecial(Sequences.TextareaEnd, 4);
      } else {
        this.state = State2.InTagName;
        this.stateInTagName(c);
      }
    }
    startEntity() {
      this.baseState = this.state;
      this.state = State2.InEntity;
      this.entityStart = this.index;
      this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State2.Text || this.baseState === State2.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
    }
    stateInEntity() {
      const length = this.entityDecoder.write(this.buffer, this.index - this.offset);
      if (length >= 0) {
        this.state = this.baseState;
        if (length === 0) {
          this.index = this.entityStart;
        }
      } else {
        this.index = this.offset + this.buffer.length - 1;
      }
    }
    /**
     * Remove data that has already been consumed from the buffer.
     */
    cleanup() {
      if (this.running && this.sectionStart !== this.index) {
        if (this.state === State2.Text || this.state === State2.InSpecialTag && this.sequenceIndex === 0) {
          this.cbs.ontext(this.sectionStart, this.index);
          this.sectionStart = this.index;
        } else if (this.state === State2.InAttributeValueDq || this.state === State2.InAttributeValueSq || this.state === State2.InAttributeValueNq) {
          this.cbs.onattribdata(this.sectionStart, this.index);
          this.sectionStart = this.index;
        }
      }
    }
    shouldContinue() {
      return this.index < this.buffer.length + this.offset && this.running;
    }
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    parse() {
      while (this.shouldContinue()) {
        const c = this.buffer.charCodeAt(this.index - this.offset);
        switch (this.state) {
          case State2.Text: {
            this.stateText(c);
            break;
          }
          case State2.SpecialStartSequence: {
            this.stateSpecialStartSequence(c);
            break;
          }
          case State2.InSpecialTag: {
            this.stateInSpecialTag(c);
            break;
          }
          case State2.CDATASequence: {
            this.stateCDATASequence(c);
            break;
          }
          case State2.InAttributeValueDq: {
            this.stateInAttributeValueDoubleQuotes(c);
            break;
          }
          case State2.InAttributeName: {
            this.stateInAttributeName(c);
            break;
          }
          case State2.InCommentLike: {
            this.stateInCommentLike(c);
            break;
          }
          case State2.InSpecialComment: {
            this.stateInSpecialComment(c);
            break;
          }
          case State2.BeforeAttributeName: {
            this.stateBeforeAttributeName(c);
            break;
          }
          case State2.InTagName: {
            this.stateInTagName(c);
            break;
          }
          case State2.InClosingTagName: {
            this.stateInClosingTagName(c);
            break;
          }
          case State2.BeforeTagName: {
            this.stateBeforeTagName(c);
            break;
          }
          case State2.AfterAttributeName: {
            this.stateAfterAttributeName(c);
            break;
          }
          case State2.InAttributeValueSq: {
            this.stateInAttributeValueSingleQuotes(c);
            break;
          }
          case State2.BeforeAttributeValue: {
            this.stateBeforeAttributeValue(c);
            break;
          }
          case State2.BeforeClosingTagName: {
            this.stateBeforeClosingTagName(c);
            break;
          }
          case State2.AfterClosingTagName: {
            this.stateAfterClosingTagName(c);
            break;
          }
          case State2.BeforeSpecialS: {
            this.stateBeforeSpecialS(c);
            break;
          }
          case State2.BeforeSpecialT: {
            this.stateBeforeSpecialT(c);
            break;
          }
          case State2.InAttributeValueNq: {
            this.stateInAttributeValueNoQuotes(c);
            break;
          }
          case State2.InSelfClosingTag: {
            this.stateInSelfClosingTag(c);
            break;
          }
          case State2.InDeclaration: {
            this.stateInDeclaration(c);
            break;
          }
          case State2.BeforeDeclaration: {
            this.stateBeforeDeclaration(c);
            break;
          }
          case State2.BeforeComment: {
            this.stateBeforeComment(c);
            break;
          }
          case State2.InProcessingInstruction: {
            this.stateInProcessingInstruction(c);
            break;
          }
          case State2.InEntity: {
            this.stateInEntity();
            break;
          }
        }
        this.index++;
      }
      this.cleanup();
    }
    finish() {
      if (this.state === State2.InEntity) {
        this.entityDecoder.end();
        this.state = this.baseState;
      }
      this.handleTrailingData();
      this.cbs.onend();
    }
    /** Handle any trailing data. */
    handleTrailingData() {
      const endIndex = this.buffer.length + this.offset;
      if (this.sectionStart >= endIndex) {
        return;
      }
      if (this.state === State2.InCommentLike) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, endIndex, 0);
        } else {
          this.cbs.oncomment(this.sectionStart, endIndex, 0);
        }
      } else if (this.state === State2.InTagName || this.state === State2.BeforeAttributeName || this.state === State2.BeforeAttributeValue || this.state === State2.AfterAttributeName || this.state === State2.InAttributeName || this.state === State2.InAttributeValueSq || this.state === State2.InAttributeValueDq || this.state === State2.InAttributeValueNq || this.state === State2.InClosingTagName) {
      } else {
        this.cbs.ontext(this.sectionStart, endIndex);
      }
    }
    emitCodePoint(cp, consumed) {
      if (this.baseState !== State2.Text && this.baseState !== State2.InSpecialTag) {
        if (this.sectionStart < this.entityStart) {
          this.cbs.onattribdata(this.sectionStart, this.entityStart);
        }
        this.sectionStart = this.entityStart + consumed;
        this.index = this.sectionStart - 1;
        this.cbs.onattribentity(cp);
      } else {
        if (this.sectionStart < this.entityStart) {
          this.cbs.ontext(this.sectionStart, this.entityStart);
        }
        this.sectionStart = this.entityStart + consumed;
        this.index = this.sectionStart - 1;
        this.cbs.ontextentity(cp, this.sectionStart);
      }
    }
  };

  // node_modules/htmlparser2/lib/esm/Parser.js
  var formTags = /* @__PURE__ */ new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
  ]);
  var pTag = /* @__PURE__ */ new Set(["p"]);
  var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
  var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
  var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
  var openImpliesClose = /* @__PURE__ */ new Map([
    ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
    ["th", /* @__PURE__ */ new Set(["th"])],
    ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
    ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
    ["li", /* @__PURE__ */ new Set(["li"])],
    ["p", pTag],
    ["h1", pTag],
    ["h2", pTag],
    ["h3", pTag],
    ["h4", pTag],
    ["h5", pTag],
    ["h6", pTag],
    ["select", formTags],
    ["input", formTags],
    ["output", formTags],
    ["button", formTags],
    ["datalist", formTags],
    ["textarea", formTags],
    ["option", /* @__PURE__ */ new Set(["option"])],
    ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
    ["dd", ddtTags],
    ["dt", ddtTags],
    ["address", pTag],
    ["article", pTag],
    ["aside", pTag],
    ["blockquote", pTag],
    ["details", pTag],
    ["div", pTag],
    ["dl", pTag],
    ["fieldset", pTag],
    ["figcaption", pTag],
    ["figure", pTag],
    ["footer", pTag],
    ["form", pTag],
    ["header", pTag],
    ["hr", pTag],
    ["main", pTag],
    ["nav", pTag],
    ["ol", pTag],
    ["pre", pTag],
    ["section", pTag],
    ["table", pTag],
    ["ul", pTag],
    ["rt", rtpTags],
    ["rp", rtpTags],
    ["tbody", tableSectionTags],
    ["tfoot", tableSectionTags]
  ]);
  var voidElements = /* @__PURE__ */ new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
  var htmlIntegrationElements = /* @__PURE__ */ new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title"
  ]);
  var reNameEnd = /\s|\//;
  var Parser2 = class {
    constructor(cbs, options = {}) {
      var _a2, _b, _c, _d, _e, _f;
      this.options = options;
      this.startIndex = 0;
      this.endIndex = 0;
      this.openTagStart = 0;
      this.tagname = "";
      this.attribname = "";
      this.attribvalue = "";
      this.attribs = null;
      this.stack = [];
      this.buffers = [];
      this.bufferOffset = 0;
      this.writeIndex = 0;
      this.ended = false;
      this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
      this.htmlMode = !this.options.xmlMode;
      this.lowerCaseTagNames = (_a2 = options.lowerCaseTags) !== null && _a2 !== void 0 ? _a2 : this.htmlMode;
      this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : this.htmlMode;
      this.recognizeSelfClosing = (_c = options.recognizeSelfClosing) !== null && _c !== void 0 ? _c : !this.htmlMode;
      this.tokenizer = new ((_d = options.Tokenizer) !== null && _d !== void 0 ? _d : Tokenizer2)(this.options, this);
      this.foreignContext = [!this.htmlMode];
      (_f = (_e = this.cbs).onparserinit) === null || _f === void 0 ? void 0 : _f.call(_e, this);
    }
    // Tokenizer event handlers
    /** @internal */
    ontext(start, endIndex) {
      var _a2, _b;
      const data2 = this.getSlice(start, endIndex);
      this.endIndex = endIndex - 1;
      (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, data2);
      this.startIndex = endIndex;
    }
    /** @internal */
    ontextentity(cp, endIndex) {
      var _a2, _b;
      this.endIndex = endIndex - 1;
      (_b = (_a2 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a2, fromCodePoint(cp));
      this.startIndex = endIndex;
    }
    /**
     * Checks if the current tag is a void element. Override this if you want
     * to specify your own additional void elements.
     */
    isVoidElement(name) {
      return this.htmlMode && voidElements.has(name);
    }
    /** @internal */
    onopentagname(start, endIndex) {
      this.endIndex = endIndex;
      let name = this.getSlice(start, endIndex);
      if (this.lowerCaseTagNames) {
        name = name.toLowerCase();
      }
      this.emitOpenTag(name);
    }
    emitOpenTag(name) {
      var _a2, _b, _c, _d;
      this.openTagStart = this.startIndex;
      this.tagname = name;
      const impliesClose = this.htmlMode && openImpliesClose.get(name);
      if (impliesClose) {
        while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
          const element = this.stack.shift();
          (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, true);
        }
      }
      if (!this.isVoidElement(name)) {
        this.stack.unshift(name);
        if (this.htmlMode) {
          if (foreignContextElements.has(name)) {
            this.foreignContext.unshift(true);
          } else if (htmlIntegrationElements.has(name)) {
            this.foreignContext.unshift(false);
          }
        }
      }
      (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
      if (this.cbs.onopentag)
        this.attribs = {};
    }
    endOpenTag(isImplied) {
      var _a2, _b;
      this.startIndex = this.openTagStart;
      if (this.attribs) {
        (_b = (_a2 = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a2, this.tagname, this.attribs, isImplied);
        this.attribs = null;
      }
      if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
        this.cbs.onclosetag(this.tagname, true);
      }
      this.tagname = "";
    }
    /** @internal */
    onopentagend(endIndex) {
      this.endIndex = endIndex;
      this.endOpenTag(false);
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    onclosetag(start, endIndex) {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      this.endIndex = endIndex;
      let name = this.getSlice(start, endIndex);
      if (this.lowerCaseTagNames) {
        name = name.toLowerCase();
      }
      if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) {
        this.foreignContext.shift();
      }
      if (!this.isVoidElement(name)) {
        const pos = this.stack.indexOf(name);
        if (pos !== -1) {
          for (let index2 = 0; index2 <= pos; index2++) {
            const element = this.stack.shift();
            (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, element, index2 !== pos);
          }
        } else if (this.htmlMode && name === "p") {
          this.emitOpenTag("p");
          this.closeCurrentTag(true);
        }
      } else if (this.htmlMode && name === "br") {
        (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, "br");
        (_f = (_e = this.cbs).onopentag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", {}, true);
        (_h = (_g = this.cbs).onclosetag) === null || _h === void 0 ? void 0 : _h.call(_g, "br", false);
      }
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    onselfclosingtag(endIndex) {
      this.endIndex = endIndex;
      if (this.recognizeSelfClosing || this.foreignContext[0]) {
        this.closeCurrentTag(false);
        this.startIndex = endIndex + 1;
      } else {
        this.onopentagend(endIndex);
      }
    }
    closeCurrentTag(isOpenImplied) {
      var _a2, _b;
      const name = this.tagname;
      this.endOpenTag(isOpenImplied);
      if (this.stack[0] === name) {
        (_b = (_a2 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a2, name, !isOpenImplied);
        this.stack.shift();
      }
    }
    /** @internal */
    onattribname(start, endIndex) {
      this.startIndex = start;
      const name = this.getSlice(start, endIndex);
      this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
    }
    /** @internal */
    onattribdata(start, endIndex) {
      this.attribvalue += this.getSlice(start, endIndex);
    }
    /** @internal */
    onattribentity(cp) {
      this.attribvalue += fromCodePoint(cp);
    }
    /** @internal */
    onattribend(quote, endIndex) {
      var _a2, _b;
      this.endIndex = endIndex;
      (_b = (_a2 = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a2, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
      if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
        this.attribs[this.attribname] = this.attribvalue;
      }
      this.attribvalue = "";
    }
    getInstructionName(value) {
      const index2 = value.search(reNameEnd);
      let name = index2 < 0 ? value : value.substr(0, index2);
      if (this.lowerCaseTagNames) {
        name = name.toLowerCase();
      }
      return name;
    }
    /** @internal */
    ondeclaration(start, endIndex) {
      this.endIndex = endIndex;
      const value = this.getSlice(start, endIndex);
      if (this.cbs.onprocessinginstruction) {
        const name = this.getInstructionName(value);
        this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
      }
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    onprocessinginstruction(start, endIndex) {
      this.endIndex = endIndex;
      const value = this.getSlice(start, endIndex);
      if (this.cbs.onprocessinginstruction) {
        const name = this.getInstructionName(value);
        this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
      }
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    oncomment(start, endIndex, offset) {
      var _a2, _b, _c, _d;
      this.endIndex = endIndex;
      (_b = (_a2 = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a2, this.getSlice(start, endIndex - offset));
      (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    oncdata(start, endIndex, offset) {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      this.endIndex = endIndex;
      const value = this.getSlice(start, endIndex - offset);
      if (!this.htmlMode || this.options.recognizeCDATA) {
        (_b = (_a2 = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a2);
        (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
        (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
      } else {
        (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
        (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
      }
      this.startIndex = endIndex + 1;
    }
    /** @internal */
    onend() {
      var _a2, _b;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (let index2 = 0; index2 < this.stack.length; index2++) {
          this.cbs.onclosetag(this.stack[index2], true);
        }
      }
      (_b = (_a2 = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a2);
    }
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    reset() {
      var _a2, _b, _c, _d;
      (_b = (_a2 = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a2);
      this.tokenizer.reset();
      this.tagname = "";
      this.attribname = "";
      this.attribs = null;
      this.stack.length = 0;
      this.startIndex = 0;
      this.endIndex = 0;
      (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
      this.buffers.length = 0;
      this.foreignContext.length = 0;
      this.foreignContext.unshift(!this.htmlMode);
      this.bufferOffset = 0;
      this.writeIndex = 0;
      this.ended = false;
    }
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    parseComplete(data2) {
      this.reset();
      this.end(data2);
    }
    getSlice(start, end2) {
      while (start - this.bufferOffset >= this.buffers[0].length) {
        this.shiftBuffer();
      }
      let slice2 = this.buffers[0].slice(start - this.bufferOffset, end2 - this.bufferOffset);
      while (end2 - this.bufferOffset > this.buffers[0].length) {
        this.shiftBuffer();
        slice2 += this.buffers[0].slice(0, end2 - this.bufferOffset);
      }
      return slice2;
    }
    shiftBuffer() {
      this.bufferOffset += this.buffers[0].length;
      this.writeIndex--;
      this.buffers.shift();
    }
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    write(chunk) {
      var _a2, _b;
      if (this.ended) {
        (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(chunk);
      if (this.tokenizer.running) {
        this.tokenizer.write(chunk);
        this.writeIndex++;
      }
    }
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    end(chunk) {
      var _a2, _b;
      if (this.ended) {
        (_b = (_a2 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a2, new Error(".end() after done!"));
        return;
      }
      if (chunk)
        this.write(chunk);
      this.ended = true;
      this.tokenizer.end();
    }
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    pause() {
      this.tokenizer.pause();
    }
    /**
     * Resumes parsing after `pause` was called.
     */
    resume() {
      this.tokenizer.resume();
      while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
        this.tokenizer.write(this.buffers[this.writeIndex++]);
      }
      if (this.ended)
        this.tokenizer.end();
    }
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    parseChunk(chunk) {
      this.write(chunk);
    }
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    done(chunk) {
      this.end(chunk);
    }
  };

  // node_modules/htmlparser2/lib/esm/index.js
  function parseDocument(data2, options) {
    const handler = new DomHandler(void 0, options);
    new Parser2(handler, options).end(data2);
    return handler.root;
  }

  // node_modules/cheerio/dist/browser/load-parse.js
  var parse5 = getParse((content, options, isDocument2, context) => options._useHtmlParser2 ? parseDocument(content, options) : parseWithParse5(content, options, isDocument2, context));
  var load = getLoad(parse5, (dom, options) => options._useHtmlParser2 ? esm_default(dom, options) : renderWithParse5(dom));

  // src/WebtoonsParser.ts
  init_buffer();
  var import_types3 = __toESM(require_lib());
  var import_moment = __toESM(require_moment());

  // src/WebtoonsSettings.ts
  init_buffer();
  var import_types2 = __toESM(require_lib());
  var CANVAS_WANTED = "canvas_wanted";
  function toBoolean(value) {
    return (value ?? false) === "true";
  }
  var WebtoonsSettings = class {
    get canvasWanted() {
      return toBoolean(Application.getState(CANVAS_WANTED));
    }
    set canvasWanted(value) {
      Application.setState(value.toString(), CANVAS_WANTED);
    }
    async getSettingsForm() {
      return new WebtoonSettingForm(this);
    }
  };
  var WebtoonSettingForm = class extends import_types2.Form {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    getSections() {
      return [
        (0, import_types2.Section)("hideStuff", [
          (0, import_types2.ToggleRow)("toggle", {
            title: "Show Canvas",
            value: this.settings.canvasWanted,
            onValueChange: Application.Selector(this, "setCanvasWanted")
          })
        ])
      ];
    }
    async setCanvasWanted(value) {
      this.settings.canvasWanted = value;
    }
  };

  // src/WebtoonsParser.ts
  var WebtoonsParser = class extends WebtoonsSettings {
    constructor(dateFormat, locale, language, BASE_URL2, MOBILE_URL2) {
      super();
      this.dateFormat = dateFormat;
      this.locale = locale;
      this.language = language;
      this.BASE_URL = BASE_URL2;
      this.MOBILE_URL = MOBILE_URL2;
    }
    parseDetails($2, mangaId) {
      const detailElement = $2("#content > div.cont_box > div.detail_header > div.info");
      const infoElement = $2("#_asideDetail");
      const [image, title] = mangaId.startsWith("canvas") ? [this.parseCanvasDetailsThumbnail($2), detailElement.find("h3").text().trim()] : [this.parseDetailsThumbnail($2), detailElement.find("h1").text().trim()];
      return {
        mangaId,
        mangaInfo: {
          thumbnailUrl: image,
          synopsis: infoElement.find("p.summary").text(),
          primaryTitle: title,
          secondaryTitles: [],
          contentRating: import_types3.ContentRating.MATURE,
          status: this.parseStatus(infoElement),
          artist: "",
          author: detailElement.find(".author_area").text().trim(),
          tagGroups: [
            {
              id: "0",
              title: "genres",
              tags: detailElement.find(".genre").toArray().map((genre) => ({ id: $2(genre).text(), title: $2(genre).text() }))
            }
          ]
        }
      };
    }
    parseStatus(infoElement) {
      const statusElement = infoElement.find("p.day_info");
      const bubbleTest = statusElement.find("span").text() ?? "";
      return statusElement.text()?.replace(bubbleTest, "");
    }
    parseDetailsThumbnail($2) {
      return $2("#content > div.cont_box > div.detail_body").attr("style")?.match(/url\((.*?)\)/)?.[1] ?? "";
    }
    parseCanvasDetailsThumbnail($2) {
      return $2("#content > div.cont_box span.thmb > img").attr("src") ?? "";
    }
    parseChaptersList($2, sourceManga) {
      return $2("ul#_episodeList > li[id*=episode]").toArray().map((elem) => this.parseChapter($2(elem), sourceManga));
    }
    parseChapter(elem, sourceManga) {
      return {
        chapterId: elem.find("a").attr("href")?.replace(this.MOBILE_URL + "/", "") ?? "",
        sourceManga,
        langCode: this.locale,
        title: elem.find("a > div.row > div.info > p.sub_title > span.ellipsis").text(),
        chapNum: Number(elem.find("a > div.row > div.num").text()?.substring(1)),
        publishDate: this.parseDate(elem.find("a > div.row > div.info > div.sub_info > span.date").text())
      };
    }
    parseDate(date) {
      return new Date((0, import_moment.default)(date, this.dateFormat, this.language).toDate());
    }
    parseChapterDetails($2, chapter) {
      return {
        id: chapter.chapterId,
        mangaId: chapter.sourceManga.mangaId,
        pages: $2("div#_imageList img").toArray().map((elem) => $2(elem).attr("data-url") ?? "")
      };
    }
    parsePopularTitles($2) {
      return {
        items: $2("div#content div.NE\\=a\\:tnt li a").toArray().filter((elem) => $2(elem).find("p.subj")).map((elem) => this.parseMangaFromElement($2(elem)))
      };
    }
    parseTodayTitles($2, allTitles) {
      const mangas = [];
      const date = (0, import_moment.default)().locale("en").format("dddd").toUpperCase();
      const list = $2(`div#dailyList div.daily_section._list_${date} li a.daily_card_item`);
      for (let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++) {
        if ($2(list[i]).find("p.subj"))
          mangas.push(this.parseMangaFromElement($2(list[i])));
      }
      return { items: mangas };
    }
    parseOngoingTitles($2, allTitles) {
      const mangas = [];
      let maxChild = 0;
      $2("div#dailyList > div").each((_, elem) => {
        if ($2(elem).find("li").length > maxChild)
          maxChild = $2(elem).find("li").length;
      });
      for (let i = 1; i <= maxChild; i++) {
        if (!allTitles && mangas.length >= 14)
          return { items: mangas };
        $2("div#dailyList > div li:nth-child(" + i + ") a.daily_card_item").each((_, elem) => {
          if ($2(elem).find("p.subj"))
            mangas.push(this.parseMangaFromElement($2(elem)));
        });
      }
      return { items: mangas };
    }
    parseCompletedTitles($2, allTitles) {
      const mangas = [];
      const list = $2("div.daily_lst.comp li a");
      for (let i = 0; i <= list.length && (allTitles || mangas.length < 10); i++) {
        if ($2(list[i]).find("p.subj"))
          mangas.push(this.parseMangaFromElement($2(list[i])));
      }
      return { items: mangas };
    }
    parseCanvasRecommendedTitles($2) {
      return {
        items: $2("#recommendArea li.rolling-item").toArray().map((elem) => this.parseCanvasFromRecommendedElement($2(elem)))
      };
    }
    parseCanvasFromRecommendedElement(elem) {
      return {
        mangaId: elem.find("a").attr("href")?.replace(this.BASE_URL + "/", "") ?? "",
        title: elem.find("p.subj").text(),
        imageUrl: elem.find("img").attr("src") ?? "",
        subtitle: "Canvas"
      };
    }
    parseCanvasPopularTitles($2) {
      return {
        items: $2("div.challenge_lst li a").toArray().map((elem) => this.parseCanvasFromElement($2(elem)))
      };
    }
    parseMangaFromElement(elem) {
      return {
        mangaId: elem.attr("href")?.replace(this.BASE_URL + "/", "") ?? "",
        title: elem.find("p.subj").text(),
        imageUrl: elem.find("img").attr("src") ?? ""
      };
    }
    parseCanvasFromElement(elem) {
      return {
        mangaId: elem.attr("href")?.replace(this.BASE_URL + "/", "") ?? "",
        title: elem.find("p.subj").text(),
        imageUrl: elem.find("img").attr("src") ?? "",
        subtitle: "Canvas"
      };
    }
    parseSearchResults($2) {
      return {
        items: [
          ...$2("#content > div.card_wrap.search li a.card_item").toArray().map((elem) => this.parseMangaFromElement($2(elem))),
          ...this.canvasWanted ? $2("#content > div.card_wrap.search li a.challenge_item").toArray().map((elem) => this.parseCanvasFromElement($2(elem))) : []
        ]
      };
    }
    parseGenres($2) {
      return $2("#content ul._genre li").toArray().map((elem) => this.parseTagFromElement($2(elem)));
    }
    parseCanvasGenres($2) {
      return $2("#content ul.challenge li").toArray().filter((elem) => $2(elem).attr("data-genre") && $2(elem).attr("data-genre") !== "ALL").map((elem) => this.parseCanvasTagFromElement($2(elem)));
    }
    parseTagFromElement(elem) {
      return {
        id: elem.attr("data-genre") ?? "",
        title: elem.find("a").text().trim()
      };
    }
    parseCanvasTagFromElement(elem) {
      return {
        id: "CANVAS$$" + (elem.attr("data-genre") ?? ""),
        title: "Canvas - " + elem.find("a").text().trim()
      };
    }
    parseTagResults($2) {
      return {
        items: $2("#content > div.card_wrap ul.card_lst li a").toArray().map((elem) => this.parseMangaFromElement($2(elem)))
      };
    }
  };

  // src/WebtoonsInfra.ts
  var WebtoonsInfra = class extends WebtoonsParser {
    constructor(dateFormat, locale, language, BASE_URL2, MOBILE_URL2) {
      super(dateFormat, locale, language, BASE_URL2, MOBILE_URL2);
      this.cheerio = browser_exports;
      this.globalRateLimiter = new import_types4.BasicRateLimiter("rateLimiter", { numberOfRequests: 10, bufferInterval: 1, ignoreImages: false });
      this.cookies = {
        "ageGatePass": "true",
        "locale": locale
      };
    }
    async initialise() {
      this.registerInterceptors();
      await this.registerSearchFilters();
    }
    registerInterceptors() {
      this.globalRateLimiter.registerInterceptor();
      Application.registerInterceptor(
        "requestInterceptor",
        Application.Selector(this, "interceptRequest"),
        Application.Selector(this, "interceptResponse")
      );
    }
    async interceptRequest(request) {
      request.headers = {
        ...request.headers ?? {},
        ...{
          referer: request.headers?.referer ?? `${this.BASE_URL}/`,
          "user-agent": await Application.getDefaultUserAgent()
        }
      };
      request.cookies = { ...request.cookies, ...this.cookies };
      return request;
    }
    async interceptResponse(_request, _response, data2) {
      return data2;
    }
    async ExecRequest(infos, parseMethods) {
      if (infos.params)
        infos.url += `?${Object.entries(infos.params).map(([key, value]) => `${key}=${value}`).join("&")}`;
      const request = { ...infos, method: "GET" };
      const data2 = (await Application.scheduleRequest(request))[1];
      const $2 = this.cheerio.load(Application.arrayBufferToUTF8String(data2));
      return parseMethods.call(this, $2);
    }
    async ExecPagedResultsRequest(infos, metadata, parseMethods) {
      infos.params ??= {};
      const page = infos.params.page = metadata.page + 1;
      if (metadata?.maxPages && page > metadata.maxPages)
        return { items: [], metadata };
      return {
        items: (await this.ExecRequest(infos, parseMethods)).items,
        metadata: { ...metadata, page }
      };
    }
  };

  // src/Webtoons.ts
  var BASE_URL_XX = "https://www.webtoons.com";
  var MOBILE_URL_XX = "https://m.webtoons.com";
  var Webtoons = class extends WebtoonsInfra {
    constructor(LOCALE2, DATE_FORMAT2, LANGUAGE2, BASE_URL2, MOBILE_URL2, HAVE_TRENDING2) {
      super(DATE_FORMAT2, LOCALE2, LANGUAGE2, BASE_URL2, MOBILE_URL2);
      this.HAVE_TRENDING = HAVE_TRENDING2;
    }
    getMangaDetails(mangaId) {
      return this.ExecRequest(
        { url: `${this.BASE_URL}/${mangaId}` },
        ($2) => this.parseDetails($2, mangaId)
      );
    }
    getChapters(sourceManga) {
      return this.ExecRequest(
        {
          url: `${this.MOBILE_URL}/${sourceManga.mangaId}`,
          headers: { "referer": this.MOBILE_URL }
        },
        ($2) => this.parseChaptersList($2, sourceManga)
      );
    }
    getChapterDetails(chapter) {
      return this.ExecRequest(
        { url: `${this.BASE_URL}/${chapter.chapterId}` },
        ($2) => this.parseChapterDetails($2, chapter)
      );
    }
    getPopularTitles() {
      return this.ExecPagedResultsRequest(
        { url: `${this.BASE_URL}/popular` },
        { page: 0, maxPages: 1 },
        this.parsePopularTitles
      );
    }
    getTodayTitles(metadata) {
      return this.ExecPagedResultsRequest(
        { url: `${this.BASE_URL}/originals` },
        { page: metadata?.page ?? 0, maxPages: 2 },
        ($2) => this.parseTodayTitles($2, metadata?.page ? true : false)
      );
    }
    getOngoingTitles(metadata) {
      return this.ExecPagedResultsRequest(
        { url: `${this.BASE_URL}/originals` },
        { page: metadata?.page ?? 0, maxPages: 2 },
        ($2) => this.parseOngoingTitles($2, metadata?.page ? true : false)
      );
    }
    getCompletedTitles(metadata) {
      return this.ExecPagedResultsRequest(
        { url: `${this.BASE_URL}/originals` },
        { page: metadata?.page ?? 0, maxPages: 2 },
        ($2) => this.parseCompletedTitles($2, metadata?.page ? true : false)
      );
    }
    getCanvasRecommendedTitles() {
      return this.ExecRequest(
        { url: `${this.BASE_URL}/canvas` },
        this.parseCanvasRecommendedTitles
      );
    }
    getCanvasPopularTitles(metadata, genre) {
      return this.ExecPagedResultsRequest(
        {
          url: `${this.BASE_URL}/canvas/list`,
          params: { genreTab: genre ?? "ALL", sortOrder: "READ_COUNT" }
        },
        { page: metadata?.page ?? 0 },
        this.parseCanvasPopularTitles
      );
    }
    getTitlesByGenre(genre) {
      return this.ExecRequest(
        {
          url: `${this.BASE_URL}/genres/${genre}`,
          params: { sortOrder: "READ_COUNT" }
        },
        this.parseTagResults
      );
    }
    getTitlesByKeyword(keyword, metadata) {
      return this.ExecPagedResultsRequest(
        {
          url: `${this.BASE_URL}/search`,
          params: { keyword, ...this.canvasWanted ? {} : { searchType: "WEBTOON" } }
        },
        { page: metadata?.page ?? 0 },
        this.parseSearchResults
      );
    }
    getSearchResults(query, metadata) {
      const genre = query.filters[0]?.value ?? "ALL";
      return genre !== "ALL" ? genre.startsWith("CANVAS$$") ? this.getCanvasPopularTitles(metadata, genre.split("$$")[1]) : this.getTitlesByGenre(genre) : query.title ? this.getTitlesByKeyword(query.title, metadata) : Promise.resolve({ items: [] });
    }
    async getDiscoverSectionItems(section, metadata) {
      let result = { items: [] };
      switch (section.id) {
        case "popular":
          result = await this.getPopularTitles();
          break;
        case "today":
          result = await this.getTodayTitles(metadata);
          break;
        case "ongoing":
          result = await this.getOngoingTitles(metadata);
          break;
        case "completed":
          result = await this.getCompletedTitles(metadata);
          break;
        case "canvas_recommended":
          result = await this.getCanvasRecommendedTitles();
          break;
        case "canvas_popular":
          result = await this.getCanvasPopularTitles(metadata);
          break;
      }
      return {
        items: result.items.map((item) => ({ type: "simpleCarouselItem", ...item })),
        metadata: result.metadata
      };
    }
    getDiscoverSections() {
      return Promise.resolve([
        ...this.HAVE_TRENDING ? [{
          id: "popular",
          title: "New & Trending",
          type: import_types5.DiscoverSectionType.simpleCarousel
        }] : [],
        {
          id: "today",
          title: "Today release",
          type: import_types5.DiscoverSectionType.simpleCarousel
        },
        {
          id: "ongoing",
          title: "Ongoing",
          type: import_types5.DiscoverSectionType.simpleCarousel
        },
        {
          id: "completed",
          title: "Completed",
          type: import_types5.DiscoverSectionType.simpleCarousel
        },
        ...this.canvasWanted ? [
          {
            id: "canvas_recommended",
            title: "Canvas Recommended",
            type: import_types5.DiscoverSectionType.simpleCarousel
          },
          {
            id: "canvas_popular",
            title: "Canvas Popular",
            type: import_types5.DiscoverSectionType.simpleCarousel
          }
        ] : []
      ]);
    }
    async registerSearchFilters() {
      const genres = await this.getSearchTags();
      Application.registerSearchFilter({
        id: "0",
        title: "Genres",
        type: "dropdown",
        options: genres.map((genre) => ({ id: genre.id, value: genre.title })),
        value: "ALL"
      });
    }
    async getSearchTags() {
      return [
        { id: "ALL", title: "All" },
        ...await this.ExecRequest({ url: `${this.BASE_URL}/genres` }, ($2) => this.parseGenres($2)),
        ...this.canvasWanted ? await this.ExecRequest({ url: `${this.BASE_URL}/canvas` }, ($2) => this.parseCanvasGenres($2)) : []
      ];
    }
  };

  // src/WebtoonZH/main.ts
  var import_zh_tw = __toESM(require_zh_tw());
  var LOCALE = "zh-hant";
  var DATE_FORMAT = "l";
  var LANGUAGE = "zh-tw";
  var BASE_URL = `${BASE_URL_XX}/${LOCALE}`;
  var MOBILE_URL = `${MOBILE_URL_XX}/${LOCALE}`;
  var HAVE_TRENDING = true;
  var WebtoonZH = new Webtoons(LOCALE, DATE_FORMAT, LANGUAGE, BASE_URL, MOBILE_URL, HAVE_TRENDING);
  return __toCommonJS(main_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

moment/moment.js:
  (*! moment.js *)
  (*! version : 2.30.1 *)
  (*! authors : Tim Wood, Iskren Chernev, Moment.js contributors *)
  (*! license : MIT *)
  (*! momentjs.com *)

moment/locale/zh-tw.js:
  (*! moment.js locale configuration *)
  (*! locale : Chinese (Taiwan) [zh-tw] *)
  (*! author : Ben : https://github.com/ben-lin *)
  (*! author : Chris Lam : https://github.com/hehachris *)
*/