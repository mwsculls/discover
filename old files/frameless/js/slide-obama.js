(function (e, t, n) {
    "use strict";

    function W() {
        _.each(function (t) {
            var n = e(this);
            n.data(a, n.offset().top);
            n.data(f, n.data(a) + n.outerHeight(!0) - N.outerHeight())
        })
    }
    function X() {
        R = g.scrollTop();
        R = R ? R : 0;
        z = R + I;
        q = Math.round(I / 2);
        R > 10 && B.remove();
        _.each(function () {
            var t = e(this),
                n = t.find("ul > li"),
                s = t.find(".next"),
                u = t.data(a),
                l = t.data(f);
            n.length <= 1 && s.addClass("hide");
            if (l >= R && u <= z && R >= u - q) {
                M.removeClass(r);
                M.filter("a[href=#" + t.attr(o) + "]").addClass(r);
                t.addClass(i)
            }
            t.attr(o) !== c && (R >= l - q || R <= u - q) && t.removeClass(i).removeClass(r).find("a[href=#" + e(this).attr(o) + "]").addClass(r);
            if (z > F) {
                M.removeClass(r);
                M.filter("a[href=#volunteer]").addClass(r)
            }
        })
    }
    function V(e) {
        e < O ? A.removeClass(l) : A.addClass(l);
        ofa && ofa.LOE && ofa.LOE.bandwidth && ofa.LOE.bandwidth > 999 && b.addClass("high-bw")
    }
    function $(e) {
        var n = n,
            r = e.offset().top;
        w.animate({
            scrollTop: r
        }, 600);
        try {
            t._gaq.push([h, m, p, e.attr("id")])
        } catch (i) {
            S.log(i)
        }
    }
    function J(e) {
        var n = e.find(".slides > li"),
            r = e.find(".current"),
            i = r.index(),
            s = e.find(".next");
        if (n.eq(i + 1).length > 0) {
            r.addClass("past").removeClass("current");
            n.eq(i + 1).removeClass("past").addClass("current");
            e.addClass("fit")
        }
        n.eq(i + 2).length > 0 ? s.removeClass("hide") : s.addClass("hide");
        (e === "home" || e === "home-students") && s.addClass("hide");
        try {
            t._gaq.push([h, m, d, e.attr("id")])
        } catch (o) {
            S.log(o)
        }
        W();
        $(e, 600)
    }
    function K(e) {
        var n = e.find(".slides > li"),
            r = e.find(".current"),
            i = r.index(),
            s = e.attr("id"),
            o = e.find(".prev");
        if (i > 0) {
            n.eq(i - 1).removeClass("past").addClass("current");
            r.removeClass("current past");
            P.removeClass("hide");
            S.log(e);
            e.removeClass("fit")
        }
        try {
            t._gaq.push([h, m, v, e.attr("id")])
        } catch (u) {
            S.log(u)
        }
        W();
        $(e, 600)
    }
    var r = "active",
        i = "fade",
        s = "hide",
        o = "id",
        u = "keyup",
        a = "offset-top",
        f = "offset-bottom",
        l = "stay",
        c = "volunteer",
        h = "_trackEvent",
        p = "Scroll to section",
        d = "Next",
        v = "Previous",
        m = "Young Americans",
        g = e(t),
        y = e("html"),
        b = e("body"),
        w = y.add(b),
        E = function () {}, S = t.console || {
            log: E,
            warn: E,
            error: E
        }, x = e("#hdr"),
        T = x.find("h1 a"),
        N = x.find("nav"),
        C = N.find(".get-involved"),
        k = e("#home"),
        L = e("#volunteer"),
        A = e("#sub-nav"),
        O = A.outerHeight(),
        M = A.find("ul li a"),
        _ = e("#main").find("nav"),
        D = _.find(".prev"),
        P = _.find(".next"),
        H = e("#intro-cta"),
        B = e("#scroll"),
        j = B.find("a"),
        F = b.height(),
        I = e(t).height(),
        q = Math.round(I / 2),
        R = 0,
        U, z;
    M.click(function (t) {
        t.preventDefault();
        $(e(e(this).attr("href")));
        e(this).blur()
    });
    C.click(function (e) {
        e.preventDefault();
        $(L)
    });
    T.click(function (t) {
        t.preventDefault();
        $(e(e(this).attr("href")))
    });
    j.click(function (n) {
        n.preventDefault();
        $(e(e(this).attr("href")));
        try {
            t._gaq.push([h, m, "Scroll Bug", "Clicked"])
        } catch (n) {
            S.log(n)
        }
    });
    D.on("click", function (t) {
        t.preventDefault();
        K(e(this).closest("nav"))
    });
    P.on("click", function (t) {
        if (b.width() > 768) {
            t.preventDefault();
            B.remove();
            J(e(this).parent())
        }
    });
    H.on("click", function (t) {
        if (b.width() > 768) {
            t.preventDefault();
            B.remove();
            J(e(this).closest("nav"))
        }
    });
    V(I);
    W();
    e(t).resize(function () {
        I = e(this).outerHeight();
        V(I);
        W();
        g.scroll();
        F = b.height()
    });
    e(t).scroll(function () {
        clearTimeout(U);
        U = setTimeout(X, 100)
    })
})(jQuery, window, document);