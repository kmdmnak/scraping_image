var MMDropDown;
(function() {
    function u(t, r, u) {
        u = u || "*";
        var e = t.getElementsByTagName(u),
            f = [];
        return i(e, function(t) { n(t, r) && f.push(t) }), f
    }

    function l(n) {
        return s[n] || (s[n] = new RegExp("\\b" + n + "\\b")), s[n]
    }

    function n(n, t) {
        var i = n.className || "";
        return l(t).test(i)
    }

    function h(t, i) {
        t.className = t.className || "";
        n(t, i) || (t.className += " " + i)
    }

    function e(n, t) {
        var i = n.className || "",
            r = l(t);
        n && i && t && (n.className = n.className.replace(r, "").replace(/\s+/, " "))
    }

    function t(n) {
        return sj_sp(n), sj_pd(n), !1
    }

    function nt(n) {
        return (n = n || _w.event, n.pageX || n.pageY) ? { x: n.pageX, y: n.pageY } : { x: n.clientX + _d.body.scrollLeft - _d.body.clientLeft, y: n.clientY + _d.body.scrollTop - _d.body.clientTop }
    }

    function r(n) { return n.clientHeight || n.innerHeight }

    function a(n) { return n.offsetY || n.layerY }

    function i(n, t, i) { i = i || this; for (var r = 0; r < n.length; r++) t.call(i, n[r], r) }

    function v(n, t) {
        var i = function() {};
        i.prototype = t.prototype;
        n.prototype = new i;
        n.prototype.constructor = n
    }

    function o() {
        var n = {};
        this.emit = function(t) {
            if (n[t]) {
                var r = Array.prototype.slice.call(arguments, 1);
                i(n[t], function(n) { n.apply(this, r) }, this)
            }
        };
        this.addL = function(t, i) {
            n[t] || (n[t] = []);
            n[t].push(i)
        }
    }

    function y(n) { return n.keyCode || n.charCode || n.which }

    function p(r, u) {
        function v() {
            l = null;
            i(f, function(t) {
                if (n(t, "ftrCP")) {
                    var r = t.childNodes;
                    i(r, function(n) { e(n, "ftrVS") })
                } else e(t, "ftrVS")
            })
        }

        function w(n) {
            var i, r;
            if (a && n) {
                i = a;
                switch (y(n)) {
                    case d:
                        s.up();
                        break;
                    case g:
                        s.down();
                        break;
                    case b:
                        r = sj_et(n);
                        s.setSelected(r);
                        i = !1;
                        break;
                    case c:
                        l ? s.emit("enter", l) : i = !1;
                        break;
                    case k:
                        s.hide();
                        break;
                    default:
                        i = !1
                }
                i && t(n)
            }
        }

        function nt() {
            sj_ue(_d, "keydown", w);
            sj_evt.unbind("ajax.unload", nt)
        }

        function it(n) {
            var t = null,
                i;
            if (ut(n)) t = f[0], t.tagName !== "A" && (t = f[1]);
            else if (t = tt(f, n), t || this.colorSelections && (t = tt(this.colorSelections, n)), t && t.tagName !== "A") {
                if (t.nextSibling && t.nextSibling.tagName === "A") return t.nextSibling;
                i = rt();
                i.length > 0 && (this.colorSelections = i, t = i[0])
            }
            return t
        }

        function rt() { var n = f[f.length - 1]; return n.getElementsByTagName("A") }

        function ut(n) { var t = n.getAttribute("delid"); return t ? !0 : p(f, n) >= 0 ? !1 : this.colorSelections && p(this.colorSelections, n) >= 0 ? !1 : !0 }

        function tt(n, t) { var i = p(n, t); return i >= 0 && i + 1 < n.length ? n[i + 1] : null }

        function p(n, t) {
            for (var i = 0; i < n.length; i++)
                if (n[i] == t) return i;
            return -1
        }
        o.call(this);
        var s = this,
            a = !1,
            l = null,
            f = u.childNodes[0].childNodes;
        f.length != 0 && (sj_be(r, "click", function(n) {
            t(n);
            a ? s.hide() : s.show()
        }), sj_be(r, "keyup", function(n) {
            t(n);
            y(n) === c && (a ? s.hide() : s.show())
        }), i(f, function(t) {
            sj_be(t, "mouseover", function() {
                v();
                n(t, "ftrNR") || n(t, "ftrCP") || s.sel(t)
            })
        }), sj_be(_d, "keydown", w), sj_evt.bind("ajax.unload", nt), this.hide = function() {
            h(u, "hidden");
            r.setAttribute("aria-expanded", "false");
            a = !1;
            v();
            sj_evt.fire("focusDrop", u);
            this.emit("close", this)
        }, sj_evt.bind("focusChange", function(n) { n[1] != u && s.hide() }), this.show = function() {
            sj_evt.fire("focusChange", u);
            e(u, "hidden");
            r.setAttribute("aria-expanded", "true");
            a = !0;
            this.emit("open", this)
        }, this.up = function() {
            var t = l ? l.previousSibling : f[f.length - 1];
            !t && n(l, "ftrCPS") && (t = l.parentNode.previousSibling);
            t && (n(t, "ftrCP") && (t = t.childNodes[t.childNodes.length - 1]), this.sel(t), this.emit("up", t), t.focus())
        }, this.down = function() {
            var t = l ? l.nextSibling : f[0];
            t && (n(t, "ftrCP") && (t = t.childNodes[0]), this.sel(t), this.emit("down", t), t.focus())
        }, this.setSelected = function(n) { l = it(n) }, this.sel = function(n) {
            v();
            l = n;
            h(n, "ftrVS")
        })
    }

    function w(n) {
        function y(n) { return t(n), f -= n.wheelDelta ? n.wheelDelta / 5 : -n.detail * 10, s.update(), !1 }

        function p() { h && (h = !1, s.emit("dragend")) }

        function w(n) {
            if (h) {
                var t = nt(n).y,
                    r = sj_go(i, "Top");
                f -= r + v - t;
                s.update()
            }
        }

        function b(n) { return h && t(n), !1 }

        function k() {
            sj_ue(_d, "mouseup", p);
            sj_ue(_d, "mousemove", w);
            sj_ue(_d, "selectstart", b);
            sj_evt.unbind("ajax.unload", k)
        }
        o.call(this);
        var s = this,
            u = n.childNodes[0],
            e = sj_ce("div"),
            i = sj_ce("div");
        e.className = "ftrSbR";
        i.className = "ftrSb";
        e.appendChild(i);
        n.appendChild(e);
        var f = 0,
            c = 0,
            l = 0,
            h = !1,
            v = 0;
        this.update = function() {
            var n = r(u);
            c = Math.max(n * n / u.scrollHeight, 10);
            i.style.height = c + "px";
            u.scrollTop = f;
            f = u.scrollTop;
            e.style.height = n - 10 + "px";
            l = f / (u.scrollHeight - n) * (r(e) - r(i));
            i.style.top = l + "px"
        };
        this.scrollTo = function(n) {
            f = n;
            this.update()
        };
        this.ctr = function(n) {
            var t = sj_go(n, "Top"),
                i = sj_go(u, "Top"),
                e = t - i - f,
                o = t - i;
            e < 0 ? f = o : e - r(u) + r(n) > 0 && (f = o - r(u) + r(n));
            this.update()
        };
        sj_be(e, "mousedown",
            function(n) {
                t(n);
                var f = a(n) / r(e) * u.scrollHeight - r(i);
                s.scrollTo(f)
            });
        sj_be(i, "mousedown", t);
        sj_be(i, "click", t);
        sj_be(e, "click", t);
        sj_be(n, "mousewheel", y, !0);
        sj_be(n, "DOMMouseScroll", y, !0);
        sj_be(i, "mousedown", function(n) { return t(n), h = !0, v = a(n), s.emit("dragstart"), !1 });
        sj_be(_d, "mouseup", p);
        sj_be(_d, "mousemove", w);
        sj_be(_d, "selectstart", b);
        sj_evt.bind("ajax.unload", k)
    }

    function tt() {
        function c(n) { i(l, function(t) { n !== t && t.hide() }) }

        function y() {
            sb_ie && s || c();
            s = !1
        }

        function b() {
            sj_ue(_d, "click", y);
            sj_evt.unbind("ajax.unload", b)
        }
        var r = u(f, "ftrDC", "div"),
            k = u(f, "ftrH_MmVert", "span"),
            l = [],
            a = [],
            o = !1,
            v, s;
        i(k, function(t, i) {
            var f = new p(t, r[i]),
                s = n(r[i], "ftrS") ? new w(r[i]) : null;
            l.push(f),
                function(i, r, f) {
                    r.addL("open", function() {
                        var n, e;
                        c(r);
                        h(t, "ftrHh");
                        n = u(f, "ftrSe");
                        n.length > 0 && (r.sel(n[0]), i && i.ctr(n[0].parentNode));
                        e = f.childNodes[0];
                        t.offsetWidth > e.offsetWidth && (e.style.width = t.offsetWidth + "px");
                        o = !0
                    });
                    sj_be(t, "mouseover", function() { o && r.show() });
                    sj_be(t, "focus", function() { o && c(r) });
                    r.addL("close", function() {
                        e(t, "ftrHh");
                        o = !1
                    });
                    r.addL("enter", function(t) {
                        if ((!n(t.parentNode.parentNode, "ftrDC") || !n(t.parentNode.parentNode.previousSibling, "ftrHR")) && (n(t, "ftrCPS") && (t = t.childNodes[0]), t && t.tagName === "A")) {
                            var i = !1;
                            t.onmousedown ? (i = t.onmousedown(), i && (_w.location.href = t.href)) : t.click()
                        }
                    });
                    i && (r.addL("open", function() { i.update() }), a.push(i), r.addL("up", function(n) { i.ctr(n) }), r.addL("down", function(n) { i.ctr(n) }))
                }(s, f, r[i])
        });
        v = u(f, "ftrNR");
        i(v, function(n) { sj_be(n, "click", t) });
        s = !1;
        i(a, function(n) { n.addL("dragend", function() { s = !0 }) });
        sj_be(_d, "click", y);
        sj_evt.bind("ajax.unload", b)
    }

    function it() {
        var n = u(_d.body, "ftrDC", "div"),
            t = u(f, "ans", "div");
        i(t, function(t, i) { t.appendChild(n[i]) })
    }
    var b = 9,
        c = 13,
        k = 27,
        d = 38,
        g = 40,
        f = _ge("ftrB"),
        s = {};
    v(p, o);
    v(w, o);
    it();
    tt()
})(MMDropDown || (MMDropDown = {}))