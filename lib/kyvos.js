var Kyvos = Kyvos || {};
Kyvos.M = {
    self : this,
    _currentAlg: null,
    _algs: [],
    _qubeRects : [],
    _timeInterval : null,
    Main: function () {
        this._qubeRects = this._drawCubeSceleton();
        Kyvos.Events.onClick(this._qubeRects, this._const.getCanvas());
        this._setAlgs();
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
        colors: { background: "whitesmoke", topPhase: "yellow", border: "black" }
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
        }
        return rects;
    },
    _drawQube: function (i, j, color) {
        var ctx = this._const.getContext();
        var w = this._const.normalQube.w;
        var h = this._const.normalQube.h;
        var pd = this._const.normalQube.padding;
        var spX = this._const.normalQube.startPositionX;
        var spY = this._const.normalQube.startPositionY;

        var x = spX + i * w;
        var y = spY + j * h;
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
    _drawAlg: function (alg) {
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
    _showAlgInfo: function (alg) {
        this._setName(alg.name);
        this._setSolution(alg.sol[0]);
    },
    _setName: function (name) { document.getElementById("AlgorithmName").innerHTML = name; },
    _setSolution: function (solution) { document.getElementById("AlgorithmSolution").innerHTML = solution; },
    _clearContext: function () {
        var cnt = this._const.getContext();
        var cnv = this._const.getCanvas();
        // Store the current transformation matrix
        cnt.save();
        // Use the identity matrix while clearing the canvas
        cnt.setTransform(1, 0, 0, 1, 0, 0);
        cnt.clearRect(0, 0, cnv.width, cnv.height);
        // Restore the transform
        cnt.restore();
    },
    ClearAlg: function () {
        this.RefreshContext();
        this.self.Kyvos.Events.ClearAlg();
    },
    RefreshContext(){
        this._clearContext();
        this._drawCubeSceleton();
    },
    RenderAlg: function (alg) {
        this.RefreshContext();
        this._drawAlg(alg);
        this._showAlgInfo(alg);
        this._currentAlg = JSON.parse(JSON.stringify(alg));        ;
    },
    ShowRandomAlg: function(){
        var alg = this._algs[Math.floor(Math.random() * this._algs.length)];
        this.RenderAlg(alg);
    },
    LogAlg: function (alg) {
        console.log(alg);
        // function JSONstringifyOrder(obj, space) {
        //     var allKeys = [];
        //     JSON.stringify(obj, function (key, value) { allKeys.push(key); return value; })
        //     allKeys.sort();
        //     return JSON.stringify(obj, allKeys, space);
        // }
        //var json = JSONstringifyOrder(alg);

        var json = JSON.stringify(alg,null);
        console.log(json);
        this._setAlgorithm(json);
    },
    LogCurrentAlg: function () {
        this.LogAlg(this._currentAlg);
    },
    _setAlgorithm: function (value) {
        document.getElementById("algorithm").value = value;
    },
    _getAlgorithm: function (value) {
        return document.getElementById("algorithm").value;
    },
    StartInterval: function (value){
       this.StopInterval();
       this.ShowRandomAlg(); 
       this._timeInterval = setInterval(function(){ Kyvos.M.ShowRandomAlg(); }, value);
    },
    StopInterval: function (){
        try{
            clearInterval(this._timeInterval);
        }catch(e){}
     }
}

$(document).ready(function () {
    Kyvos.M.Main();
});