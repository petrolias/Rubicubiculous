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
        normalQube: {size: 3, w: 100, h: 100, padding : 2, startPositionX : 50, startPositionY : 50},
        smallQube: { w: 100, h: 20, padding : 2, startPosition : 3},
        total: 3,
        getCanvas: function () {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            return ctx;
        }
    },
    _setAlgs : function (){
        this._algs = Algs.GetAlgs();
    },
    _drawCubeSceleton: function () {
        var size = this._const.normalQube.size;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                this._drawQube(i, j, "white");
            }
        }
    },
    _drawQube: function (i, j, color) {
        var ctx = this._const.getCanvas();
        var w = this._const.normalQube.w;
        var h = this._const.normalQube.h;
        var pd = this._const.normalQube.padding;
        var spX = this._const.normalQube.startPositionX;
        var spY = this._const.normalQube.startPositionY;

        var x = spX + i * w;
        var y = spY + j * w;
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, w + pd, h + pd);
        ctx.fillStyle = color;
        ctx.fillRect(x + pd, y + pd, w - pd, h - pd);
    },
    _drawSmallQube: function (i, direction, color) {
        var ctx = this._const.getCanvas();
        var nQ= this._const.normalQube;
        var w = this._const.smallQube.w;
        var h = this._const.smallQube.h;
        var pd = this._const.smallQube.padding;
        var sp = this._const.smallQube.startPosition;
        var spX = this._const.normalQube.startPositionX;
        var spY = this._const.normalQube.startPositionY;

        var defX = spX + i * w;
        var defY = w - spY - h - pd - sp;
        var defOuter = - h + nQ.startPositionY + (nQ.size) * nQ.h;
        switch (direction) {
            case "t":
                var x = defX;
                var y = defY;
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, w + pd, h + pd);
                ctx.fillStyle = color;
                ctx.fillRect(x + pd, y + pd, w - pd, h - pd);
                break;
            case "b":
                var x = defX;
                var y = defY + defOuter;
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, w + pd, h + pd);
                ctx.fillStyle = color;
                ctx.fillRect(x + pd, y + pd, w - pd, h - pd);
                break;
            case "l":
                var x = defY;
                var y = defX;
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, h + pd, w + pd);
                ctx.fillStyle = color;
                ctx.fillRect(x + pd, y + pd, h - pd, w - pd);
                break;
            case "r":
                var x = defY + defOuter;
                var y = defX;
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, h + pd, w + pd);
                ctx.fillStyle = color;
                ctx.fillRect(x + pd, y + pd, h - pd, w - pd);
                break;
            default:
            // code block
        }
    },
    DrawAlg: function (alg) {
        var w = this._const.normalQube.w;
        var ctx = this._const.getCanvas();
        var pd = this._const.padding;

        alg.inner.forEach(f => {
            var x = f[0];
            var y = f[1];
            this._drawQube(x,y,"yellow");
        });

        alg.t.forEach(i => { this._drawSmallQube(i, "t", "yellow"); });
        alg.b.forEach(i => { this._drawSmallQube(i, "b", "yellow"); });
        alg.l.forEach(i => { this._drawSmallQube(i, "l", "yellow"); });
        alg.r.forEach(i => { this._drawSmallQube(i, "r", "yellow"); });
    }
}

$(document).ready(function () {
    Kyvos.Begin();
});