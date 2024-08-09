var ExportDoc = (function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var regeneratorRuntime$1 = {exports: {}};

  var _typeof = {exports: {}};

  (function (module) {
  	function _typeof(o) {
  	  "@babel/helpers - typeof";

  	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
  	    return typeof o;
  	  } : function (o) {
  	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
  	}
  	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (_typeof));

  var _typeofExports = _typeof.exports;

  (function (module) {
  	var _typeof = _typeofExports["default"];
  	function _regeneratorRuntime() {
  	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
  	    return e;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  	  var t,
  	    e = {},
  	    r = Object.prototype,
  	    n = r.hasOwnProperty,
  	    o = Object.defineProperty || function (t, e, r) {
  	      t[e] = r.value;
  	    },
  	    i = "function" == typeof Symbol ? Symbol : {},
  	    a = i.iterator || "@@iterator",
  	    c = i.asyncIterator || "@@asyncIterator",
  	    u = i.toStringTag || "@@toStringTag";
  	  function define(t, e, r) {
  	    return Object.defineProperty(t, e, {
  	      value: r,
  	      enumerable: !0,
  	      configurable: !0,
  	      writable: !0
  	    }), t[e];
  	  }
  	  try {
  	    define({}, "");
  	  } catch (t) {
  	    define = function define(t, e, r) {
  	      return t[e] = r;
  	    };
  	  }
  	  function wrap(t, e, r, n) {
  	    var i = e && e.prototype instanceof Generator ? e : Generator,
  	      a = Object.create(i.prototype),
  	      c = new Context(n || []);
  	    return o(a, "_invoke", {
  	      value: makeInvokeMethod(t, r, c)
  	    }), a;
  	  }
  	  function tryCatch(t, e, r) {
  	    try {
  	      return {
  	        type: "normal",
  	        arg: t.call(e, r)
  	      };
  	    } catch (t) {
  	      return {
  	        type: "throw",
  	        arg: t
  	      };
  	    }
  	  }
  	  e.wrap = wrap;
  	  var h = "suspendedStart",
  	    l = "suspendedYield",
  	    f = "executing",
  	    s = "completed",
  	    y = {};
  	  function Generator() {}
  	  function GeneratorFunction() {}
  	  function GeneratorFunctionPrototype() {}
  	  var p = {};
  	  define(p, a, function () {
  	    return this;
  	  });
  	  var d = Object.getPrototypeOf,
  	    v = d && d(d(values([])));
  	  v && v !== r && n.call(v, a) && (p = v);
  	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  	  function defineIteratorMethods(t) {
  	    ["next", "throw", "return"].forEach(function (e) {
  	      define(t, e, function (t) {
  	        return this._invoke(e, t);
  	      });
  	    });
  	  }
  	  function AsyncIterator(t, e) {
  	    function invoke(r, o, i, a) {
  	      var c = tryCatch(t[r], t, o);
  	      if ("throw" !== c.type) {
  	        var u = c.arg,
  	          h = u.value;
  	        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
  	          invoke("next", t, i, a);
  	        }, function (t) {
  	          invoke("throw", t, i, a);
  	        }) : e.resolve(h).then(function (t) {
  	          u.value = t, i(u);
  	        }, function (t) {
  	          return invoke("throw", t, i, a);
  	        });
  	      }
  	      a(c.arg);
  	    }
  	    var r;
  	    o(this, "_invoke", {
  	      value: function value(t, n) {
  	        function callInvokeWithMethodAndArg() {
  	          return new e(function (e, r) {
  	            invoke(t, n, e, r);
  	          });
  	        }
  	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
  	      }
  	    });
  	  }
  	  function makeInvokeMethod(e, r, n) {
  	    var o = h;
  	    return function (i, a) {
  	      if (o === f) throw new Error("Generator is already running");
  	      if (o === s) {
  	        if ("throw" === i) throw a;
  	        return {
  	          value: t,
  	          done: !0
  	        };
  	      }
  	      for (n.method = i, n.arg = a;;) {
  	        var c = n.delegate;
  	        if (c) {
  	          var u = maybeInvokeDelegate(c, n);
  	          if (u) {
  	            if (u === y) continue;
  	            return u;
  	          }
  	        }
  	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
  	          if (o === h) throw o = s, n.arg;
  	          n.dispatchException(n.arg);
  	        } else "return" === n.method && n.abrupt("return", n.arg);
  	        o = f;
  	        var p = tryCatch(e, r, n);
  	        if ("normal" === p.type) {
  	          if (o = n.done ? s : l, p.arg === y) continue;
  	          return {
  	            value: p.arg,
  	            done: n.done
  	          };
  	        }
  	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
  	      }
  	    };
  	  }
  	  function maybeInvokeDelegate(e, r) {
  	    var n = r.method,
  	      o = e.iterator[n];
  	    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
  	    var i = tryCatch(o, e.iterator, r.arg);
  	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
  	    var a = i.arg;
  	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  	  }
  	  function pushTryEntry(t) {
  	    var e = {
  	      tryLoc: t[0]
  	    };
  	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  	  }
  	  function resetTryEntry(t) {
  	    var e = t.completion || {};
  	    e.type = "normal", delete e.arg, t.completion = e;
  	  }
  	  function Context(t) {
  	    this.tryEntries = [{
  	      tryLoc: "root"
  	    }], t.forEach(pushTryEntry, this), this.reset(!0);
  	  }
  	  function values(e) {
  	    if (e || "" === e) {
  	      var r = e[a];
  	      if (r) return r.call(e);
  	      if ("function" == typeof e.next) return e;
  	      if (!isNaN(e.length)) {
  	        var o = -1,
  	          i = function next() {
  	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
  	            return next.value = t, next.done = !0, next;
  	          };
  	        return i.next = i;
  	      }
  	    }
  	    throw new TypeError(_typeof(e) + " is not iterable");
  	  }
  	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
  	    value: GeneratorFunctionPrototype,
  	    configurable: !0
  	  }), o(GeneratorFunctionPrototype, "constructor", {
  	    value: GeneratorFunction,
  	    configurable: !0
  	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
  	    var e = "function" == typeof t && t.constructor;
  	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  	  }, e.mark = function (t) {
  	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  	  }, e.awrap = function (t) {
  	    return {
  	      __await: t
  	    };
  	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
  	    return this;
  	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
  	    void 0 === i && (i = Promise);
  	    var a = new AsyncIterator(wrap(t, r, n, o), i);
  	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
  	      return t.done ? t.value : a.next();
  	    });
  	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
  	    return this;
  	  }), define(g, "toString", function () {
  	    return "[object Generator]";
  	  }), e.keys = function (t) {
  	    var e = Object(t),
  	      r = [];
  	    for (var n in e) r.push(n);
  	    return r.reverse(), function next() {
  	      for (; r.length;) {
  	        var t = r.pop();
  	        if (t in e) return next.value = t, next.done = !1, next;
  	      }
  	      return next.done = !0, next;
  	    };
  	  }, e.values = values, Context.prototype = {
  	    constructor: Context,
  	    reset: function reset(e) {
  	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
  	    },
  	    stop: function stop() {
  	      this.done = !0;
  	      var t = this.tryEntries[0].completion;
  	      if ("throw" === t.type) throw t.arg;
  	      return this.rval;
  	    },
  	    dispatchException: function dispatchException(e) {
  	      if (this.done) throw e;
  	      var r = this;
  	      function handle(n, o) {
  	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
  	      }
  	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
  	        var i = this.tryEntries[o],
  	          a = i.completion;
  	        if ("root" === i.tryLoc) return handle("end");
  	        if (i.tryLoc <= this.prev) {
  	          var c = n.call(i, "catchLoc"),
  	            u = n.call(i, "finallyLoc");
  	          if (c && u) {
  	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
  	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
  	          } else if (c) {
  	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
  	          } else {
  	            if (!u) throw new Error("try statement without catch or finally");
  	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
  	          }
  	        }
  	      }
  	    },
  	    abrupt: function abrupt(t, e) {
  	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
  	        var o = this.tryEntries[r];
  	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
  	          var i = o;
  	          break;
  	        }
  	      }
  	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
  	      var a = i ? i.completion : {};
  	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
  	    },
  	    complete: function complete(t, e) {
  	      if ("throw" === t.type) throw t.arg;
  	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
  	    },
  	    finish: function finish(t) {
  	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
  	        var r = this.tryEntries[e];
  	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
  	      }
  	    },
  	    "catch": function _catch(t) {
  	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
  	        var r = this.tryEntries[e];
  	        if (r.tryLoc === t) {
  	          var n = r.completion;
  	          if ("throw" === n.type) {
  	            var o = n.arg;
  	            resetTryEntry(r);
  	          }
  	          return o;
  	        }
  	      }
  	      throw new Error("illegal catch attempt");
  	    },
  	    delegateYield: function delegateYield(e, r, n) {
  	      return this.delegate = {
  	        iterator: values(e),
  	        resultName: r,
  	        nextLoc: n
  	      }, "next" === this.method && (this.arg = t), y;
  	    }
  	  }, e;
  	}
  	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (regeneratorRuntime$1));

  var regeneratorRuntimeExports = regeneratorRuntime$1.exports;

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntimeExports();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

  function formatDate(fmt, date) {
    if (!date) date = new Date();
    if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (var k in o) {
      if (new RegExp("(".concat(k, ")")).test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  }
  function setStyle(ele, sty) {
    if (ele.nodeName.toLowerCase() != 'img') {
      // let sty = getComputedStyle(ele)
      ele.setAttribute('style', (ele.getAttribute('style') || '') + ";font-size: ".concat(sty.fontSize, ";color: ").concat(sty.color, ";font-style: ").concat(sty.fontStyle, ";line-height: ").concat(sty.lineHeight, ";font-weight: ").concat(sty.fontWeight, ";\n      font-family: ").concat(sty.fontFamily, ";text-align: ").concat(sty.textAlign, ";text-indent: ").concat(sty.textIndent, "; margin: ").concat(sty.margin, "; padding: ").concat(sty.padding, ";width: ").concat(sty.width, "; height: ").concat(sty.height, ";"));
    }
  }
  function saveAs(blob, fileName) {
    var URL = window.URL || window.webkitURL;
    var a = document.createElement('a');
    fileName = fileName || blob.name || 'download';
    a.download = fileName;
    a.rel = 'noopener';
    a.target = '_blank';
    if (typeof blob === 'string') {
      a.href = blob;
      a.click();
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        return a.click();
      }, 0);
      setTimeout(function () {
        return URL.revokeObjectURL(a.href);
      }, 2E4); // 20s
    }
  }

  // maxWidth?: number, title?: string, fileName?: string, time?: string, proxyHost?: string, exclude?: array
  function toWord(_x, _x2) {
    return _toWord.apply(this, arguments);
  }
  function _toWord() {
    _toWord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(contEl, option) {
      var options, cloneEl, domWrap, imgList, canvasList, topstr, headstr, mhtml, exthtml, styles, fileContent, blob;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            options = Object.assign({
              fileName: "word_".concat(formatDate('yyyyMMddhhmmss')),
              // 导出文件名
              maxWidth: 550,
              // 图片最大宽度,
              title: '',
              // 导出添加一级标题
              time: '',
              // 导出添加文章时间
              blob: false,
              // 返回结果为blob
              exclude: [] // 排除元素选择器
            }, option || {});
            if (contEl) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", console.warn('未传入导出元素'));
          case 3:
            if (typeof contEl === 'string') contEl = document.getElementById(contEl) || document.querySelector(contEl);

            // 设置标记, 方便复制样式
            Array.from(contEl.querySelectorAll('*')).forEach(function (item) {
              item.setAttribute('data-toword', Math.random().toString(32).slice(-5));
            });
            if (!window.contIframe) {
              window.contIframe = document.createElement('iframe');
              window.contIframe.style = 'display: none; width:100%;';
              document.body.appendChild(window.contIframe);
            }
            cloneEl = contEl.cloneNode(true);
            cloneEl.style.width = getComputedStyle(contEl).width;
            window.contIframe.contentDocument.body.appendChild(cloneEl);
            domWrap = cloneEl; // .cloneNode(true)
            // 1. 删除隐藏的元素, 并且将元素样式设置为行内样式, 方便word识别
            Array.from(domWrap.querySelectorAll('*')).forEach(function (item) {
              var attr = item.getAttribute('data-toword');
              var originItem = contEl.querySelector('[data-toword="' + attr + '"]');
              if (originItem) {
                var sty = getComputedStyle(originItem);
                if (sty.display == 'none ') return item.remove();
                setStyle(item, sty);
              }
            });
            // 1.1 删除排除的元素
            if (Array.isArray(options.exclude) && options.exclude.length) {
              options.exclude.forEach(function (ext) {
                Array.from(domWrap.querySelectorAll(ext)).forEach(function (item) {
                  return item.remove();
                });
              });
            }

            // 2. 将图片转为Base64编码, 方便word保存
            imgList = domWrap.querySelectorAll('img');
            console.log('加载图片数量: ', imgList.length);
            _context.next = 16;
            return Promise.all(Array.from(imgList).filter(function (x) {
              return !x.src.startsWith('data');
            }).map(function (tempimg) {
              var img = new Image();
              img.setAttribute('crossOrigin', 'anonymous');
              img.src = options.proxyHost ? tempimg.src.replace(location.host, options.proxyHost) : tempimg.src;
              return new Promise(function (resolve, reject) {
                try {
                  img.onload = function () {
                    img.onload = null;
                    var cw = Math.min(img.width, options.maxWidth);
                    var ch = img.height * (cw / img.width);
                    var canvas = document.createElement("CANVAS");
                    canvas.width = cw;
                    canvas.height = ch;
                    var context = canvas.getContext('2d');
                    context === null || context === void 0 || context.drawImage(img, 0, 0, cw, ch);
                    var uri = canvas.toDataURL("image/jpg", 0.8);
                    tempimg.src = uri;
                    var w = Math.min(img.width, 550, options.maxWidth); // word图片最大宽度
                    tempimg.width = w;
                    tempimg.height = img.height * (w / img.width);
                    console.log('img onload...', options.fileName, img.src, img.width, img.height, cw, ch, w, tempimg.height);
                    canvas.remove();
                    resolve(img.src);
                  };
                  img.onerror = function () {
                    console.log('img load error, ', img.src);
                    resolve('');
                  };
                } catch (e) {
                  console.log(e);
                  resolve('');
                }
              });
            }));
          case 16:
            // 3. 将canvas转为Base64编码, 方便word保存
            canvasList = domWrap.querySelectorAll('canvas');
            console.log('加载canvas数量: ', canvasList.length);
            _context.next = 20;
            return Promise.all(Array.from(canvasList).map(function (tempCanvas) {
              var img = new Image();
              img.setAttribute('crossOrigin', 'anonymous');
              return new Promise(function (resolve, reject) {
                try {
                  var attr = tempCanvas.getAttribute('data-toword');
                  var cvs = contEl.querySelector('[data-toword="' + attr + '"]');
                  console.log(cvs, attr);
                  if (!cvs) return resolve();
                  img.src = cvs.toDataURL("image/jpg", 0.8);
                  var w = Math.min(cvs.width, options.maxWidth);
                  var h = cvs.height * (w / cvs.width);
                  img.width = w;
                  img.height = h;
                  var parent = tempCanvas.parentNode;
                  if (tempCanvas.nextSibling) {
                    parent.insertBefore(img, tempCanvas.nextSibling);
                  } else {
                    parent.appendChild(img);
                  }
                  tempCanvas.remove();
                  resolve('');
                } catch (e) {
                  console.log(e);
                  resolve('');
                }
              });
            }));
          case 20:
            Array.from(contEl.querySelectorAll('*')).forEach(function (item) {
              item.removeAttribute('data-toword');
            });

            // 4. 将html内容写入word模版中
            topstr = 'xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"';
            headstr = '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val=\"Cambria Math\"/><m:brkBin m:val=\"before\"/><m:brkBinSub m:val=\"--\"/><m:smallFrac m:val=\"off\"/><m:dispDef/><m:lMargin m:val=\"0\"/> <m:rMargin m:val=\"0\"/><m:defJc m:val=\"centerGroup\"/><m:wrapIndent m:val=\"1440\"/><m:intLim m:val=\"subSup\"/><m:naryLim m:val=\"undOvr\"/></m:mathPr></w:WordDocument></xml><![endif]-->';
            mhtml = {
              top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html ".concat(topstr, ">\n_html_</html>"),
              head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n".concat(headstr, "\n<style>\n_styles_\n</style>\n</head>\n"),
              body: "<body>_body_</body>"
            };
            exthtml = (options.title ? "<h1 style=\"text-align:center\">".concat(options.title, "</h1>") : '') + (options.time ? "<p style=\"text-align:center\">".concat(options.time, "</p>") : '');
            styles = "";
            fileContent = mhtml.top.replace("_html_", mhtml.head.replace("_styles_", styles) + mhtml.body.replace("_body_", exthtml + domWrap.innerHTML));
            blob = new Blob([fileContent], {
              type: "application/msword;charset=utf-8"
            });
            console.log('即将生成文件大小: ', blob.size, (blob.size / 1024 / 1024).toFixed(2) + 'M');
            // 移除iframe内部元素, 方便下次导出
            if (!window.devs) domWrap.remove();
            if (!options.blob) {
              _context.next = 32;
              break;
            }
            return _context.abrupt("return", blob);
          case 32:
            saveAs(blob, options.fileName + ".doc");
          case 33:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _toWord.apply(this, arguments);
  }

  var ExportDoc = {
    toWord: toWord
  };

  return ExportDoc;

})();
