var Kyvos = Kyvos || {
    _algs: [],
    Begin: function () {
        this._setAlgs();
        this._drawCubeSceleton();
        this.DrawAlg(
            this._algs["OCLL6"]
            );
    },
    _setAlgs : function (){
        var olls = this._algs;
        olls["OCLL6"] = {
            inner: [
                [1, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [0, 2],
                [1, 2]
            ]
        };

    },
    _const: {
        normalQube: { w: 100, h: 100, size: 3 , padding : 2},
        smallQube: { w: 20, h: 20 },
        total: 3,
        startPositionX : 50,
        startPositionY : 50,
        linePixels: 1,
        getCanvas: function () {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            return ctx;
        }
    },
    _drawCubeSceleton: function () {
        var size = this._const.normalQube.size;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                this._drawQube(i, j, "white");
            }
        }
    },
    DrawOuterCubeSceleton: function () {
        var w = this._const.smallQube.w;
        var h = this._const.smallQube.h;
        var size = this._const.normalQube.size;
        var ctx = this._const.getCanvas();
        var pd = 1;

        for (i = 0; i < size + 1; i++) {
            for (j = 0; j < size + 1; j++) {
                ctx.fillStyle = "black";
                ctx.fillRect(w, h, w + 2 * pd, h + 2 * pd);
                ctx.fillStyle = "red";
                ctx.fillRect(w + pd, h + pd, w, h);

                // ctx.moveTo(0 + pd, w * j + pd);
                // ctx.lineTo(w * size + pd, w * j + pd);
                // ctx.moveTo(w * i + pd, 0 + pd);
                // ctx.lineTo(w * i + pd, w * size + pd);
                // ctx.stroke();
            }
        }
    },
    DrawAlg: function (alg) {
        var w = this._const.normalQube.w;
        var ctx = this._const.getCanvas();
        var lp = this._const.linePixels;
        var pd = this._const.padding;

        ctx.fillStyle = "gray";

        alg.inner.forEach(f => {
            var x = f[0];
            var y = f[1];
            this._drawQube(x,y,"yellow");
        });
    },
    _drawQube: function (i, j, color) {
        var ctx = this._const.getCanvas();
        var w = this._const.normalQube.w;
        var h = this._const.normalQube.h;
        var pd = this._const.normalQube.padding;
        var spX = this._const.startPositionX;
        var spY = this._const.startPositionY;

        ctx.fillStyle = "black";
        ctx.fillRect(
            spX + i * w,
            spY + j * w,
            w + pd,
            h + pd
        );
        ctx.fillStyle = color;
        ctx.fillRect(
            spX + pd + i * w,
            spY + pd + j * w,
            w - pd,
            h - pd
        );
    },
}

$(document).ready(function () {
    Kyvos.Begin();
});