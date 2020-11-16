var Kyvos = Kyvos || {
    _algs: [],
    Begin: function () {
        this._setAlgs();
        this._drawCubeSceleton();
        this.DrawAlg(
            this._algs["OCLL6"]
        );
    },
    _const: {
        normalQube: { size: 3, w: 100, h: 100, padding: 2, startPositionX: 50, startPositionY: 50 },
        smallQube: { w: 100, h: 20, padding: 2, startPosition: 3 },
        getCanvas: function () {
            return document.getElementById("myCanvas");
        },
        getContext: function () {
            return this.getCanvas().getContext("2d");
        },
        colors: { background: "white", topPhase: "yellow", border: "black" }
    },
    _setAlgs: function () {
        this._algs = Algs.GetAlgs();
    },
    _drawCubeSceleton: function () {
        var color = this._const.colors.background;
        var size = this._const.normalQube.size;
        var rects = [];
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                var rect = this._drawQube(i, j, color);
                rects.push(rect);
            }
            ["t", "b", "l", "r"].forEach(e => {
                var rect = this._drawSmallQube(i, e, color);
                rects.push(rect);
            });
            this.Events.onClick(rects);
        }
    },
    _drawQube: function (i, j, color) {
        var ctx = this._const.getContext();
        var w = this._const.normalQube.w;
        var h = this._const.normalQube.h;
        var pd = this._const.normalQube.padding;
        var spX = this._const.normalQube.startPositionX;
        var spY = this._const.normalQube.startPositionY;

        var x = spX + i * w;
        var y = spY + j * w;
        ctx.fillStyle = this._const.colors.border;
        ctx.fillRect(x, y, w + pd, h + pd);
        ctx.fillStyle = color;
        ctx.fillRect(x + pd, y + pd, w - pd, h - pd);
        return { i:i, j:j, x: x, y: y, w: w + pd, h: h + pd };
    },
    _drawSmallQube: function (i, direction, color) {
        var ctx = this._const.getContext();
        var nQ = this._const.normalQube;
        var w = this._const.smallQube.w;
        var h = this._const.smallQube.h;
        var pd = this._const.smallQube.padding;
        var sp = this._const.smallQube.startPosition;
        var spX = this._const.normalQube.startPositionX;
        var spY = this._const.normalQube.startPositionY;

        var defX = spX + i * w;
        var defY = w - spY - h - pd - sp;
        var defOuter = - h + nQ.startPositionY + (nQ.size) * nQ.h;
        
        var x = {};
        var y = {};
        var ww = {};
        var hh = {};
        var iww = {};
        var ihh = {};

        switch (direction) {
            case "t":
                 x = defX;
                 y = defY;
                 ww = w + pd;
                 hh = h + pd;
                 iww = w - pd;
                 ihh = h - pd;
                break;
            case "b":
                 x = defX;
                 y = defY + defOuter;
                 ww = w + pd;
                 hh = h + pd;
                 iww = w - pd;
                 ihh = h - pd;
                break;
            case "l":
                 x = defY;
                 y = defX;
                 ww = h + pd;
                 hh = w + pd;
                 iww = h - pd;
                 ihh = w - pd;
                break;
            case "r":
                 x = defY + defOuter;
                 y = defX;
                 ww = h + pd;
                 hh = w + pd;
                 iww = h - pd;
                 ihh = w - pd;
                break;
            default:
            // code block
        }

        ctx.fillStyle = this._const.colors.border;
        ctx.fillRect(x, y, ww, hh);
        ctx.fillStyle = color;
        ctx.fillRect(x + pd, y + pd, iww, ihh);
        var rect = { d : direction, i:i, x: x, y: y, w: ww, h: hh };
        return rect;
    },
    DrawAlg: function (alg) {
        var color = this._const.colors.topPhase;
        alg.inner.forEach(f => {
            var x = f[0];
            var y = f[1];
            this._drawQube(x, y, color);
        });
        ["t", "b", "l", "r"].forEach(e => {
            alg[e].forEach(i => { this._drawSmallQube(i, e, color); });
        });
    },
    Events: {
        _collides : function (rects, x, y) {
            var isCollision = false;
            for (var i = 0, len = rects.length; i < len; i++) {
                var left = rects[i].x, right = rects[i].x + rects[i].w;
                var top = rects[i].y, bottom = rects[i].y + rects[i].h;
                if (right >= x
                    && left <= x
                    && bottom >= y
                    && top <= y) {
                    isCollision = rects[i];
                }
            }
            return isCollision;
        },
        onClick: function (rects) {
            var elem = Kyvos._const.getCanvas();
            var self = this;
            elem.addEventListener('click', function (e) {
                var rect = self._collides(rects, e.offsetX, e.offsetY);
                if (rect) {
                    if (rect["d"] != undefined){
                        console.log('collision: ' + rect["d"]  + ' [' + rect.i + "]");
                    }else{
                        console.log('collision: [' + rect.i + ',' + rect.j + "]");
                    }
                } else {
                    console.log('no collision');
                }
            }, false);
        }
    }
}

$(document).ready(function () {
    Kyvos.Begin();
});