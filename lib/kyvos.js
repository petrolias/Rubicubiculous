var Kyvos = {
    Main: function () {
        this.Public.QubeRects = this._drawCubeSceleton();
        this.Events.onClick(this.Public.QubeRects, this._const.getCanvas());
        this.GenerateAlgsSelections();
        //this.Favorites.ReadAndSetFavoriesFromStore();
        this.Store.RefreshSelectCasesElement();
    },
    Public: {
        CurrentAlg: {
            _id: null,
            name: "Undefined",
            inner: [],
            t: [],
            b: [],
            l: [],
            r: [],
            sol: ["-"]
        },
        InitAlg: function () {
            this.CurrentAlg.inner = [];
            this.CurrentAlg.t = [];
            this.CurrentAlg.d = [];
            this.CurrentAlg.l = [];
            this.CurrentAlg.r = [];
        },
        QubeRects: [],
    },
    _const: {
        normalQube: { w : 90, smallQubeAnalogy:0.2, offset : 6 , padding: 2, startPositionOffeset: 2},
        // smallQube: { w: 100, h: 20, padding: 2, startPosition: 3 },
        GetNormalQube: function () {  
            var nq = this.normalQube;
            var q = { 
                size: 3, 
                w: nq.w, 
                h: nq.w, 
                padding: nq.padding, 
                offset : nq.offset,
                startPositionX: nq.w * nq.smallQubeAnalogy + nq.offset + nq.padding * 2 + nq.startPositionOffeset,
                startPositionY: nq.w * nq.smallQubeAnalogy + nq.offset + nq.padding * 2 + nq.startPositionOffeset,
                sqh: nq.w * nq.smallQubeAnalogy,
            } ;
            return q;
        },
        getCanvas: function () {
            return document.getElementById("myCanvas");
        },
        getContext: function () {
            return this.getCanvas().getContext("2d");
        },
        colors: { background: "lightGray", topPhase: "yellow", border: "black" }
    },
    _drawCubeSceleton: function () {
        var color = this._const.colors.background;
        var size = this._const.GetNormalQube().size;
        var rects = [];
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                var rect = this._drawQube(i, j, color);
                rects.push(rect);
            }
            ["t", "b", "l", "r"].forEach(e => {
                var rect = this._drawSmallQube(i, e, "white", "lightGray");
                rects.push(rect);
            });
        }
        return rects;
    },
    _drawQube: function (i, j, color) {
        var nq = this._const.GetNormalQube();
        var w = nq.w;
        var h = nq.h;
        var pd = nq.padding;
        var spX = nq.startPositionX;
        var spY = nq.startPositionY;

        var x = spX + i * w;
        var y = spY + j * h;
        var ctx = this._const.getContext();
        ctx.fillStyle = this._const.colors.border;
        ctx.fillRect(x, y, w + pd, h + pd);
        ctx.fillStyle = color;
        ctx.fillRect(x + pd, y + pd, w - pd, h - pd);
        return { i: i, j: j, x: x, y: y, w: w + pd, h: h + pd };
    },
    _drawSmallQube: function (i, direction, color, borderColor) {
        var nq = this._const.GetNormalQube();
        var w = nq.w;
        var h = nq.sqh;
        var pd = nq.padding;
        var spX = nq.startPositionX;
        var spY = nq.startPositionY;
        var offset = nq.offset;
       
        var x = {};
        var y = {};
        var ww = {};
        var hh = {};
        var iww = {};
        var ihh = {};

        switch (direction) {
            case "t":
                x = spX + i * w; //defX;
                y = spY - pd - offset - h;//defY;
                ww = w + pd;
                hh = h + pd;
                iww = w - pd;
                ihh = h - pd;
                break;
            case "b":
                x = spX + i * w; //defX;
                y = spY + pd + offset + (nq.size) * nq.h; //defY + defOuter;
                ww = w + pd;
                hh = h + pd;
                iww = w - pd;
                ihh = h - pd;
                break;
            case "l":
                x = spX - pd - offset - h; //defY;
                y = spY + i * w;//defX;
                ww = h + pd;
                hh = w + pd;
                iww = h - pd;
                ihh = w - pd;
                break;
            case "r":
                x = spX + pd + offset + (nq.size) * nq.h; //defY + defOuter;
                y = spY + i * w;//defX;
                ww = h + pd;
                hh = w + pd;
                iww = h - pd;
                ihh = w - pd;
                break;
            default:
            // code block
        }
        var ctx = this._const.getContext();
        ctx.fillStyle = borderColor;
        ctx.fillRect(x, y, ww, hh);
        ctx.fillStyle = color;
        ctx.fillRect(x + pd, y + pd, iww, ihh);
        var rect = { d: direction, i: i, x: x, y: y, w: ww, h: hh };
        //console.log(rect);
        return rect;
    },
    _drawAlg: function (alg) {
        var color = this._const.colors.topPhase;
        alg.inner.forEach(f => {
            var x = f[0];
            var y = f[1];
            this._drawQube(x, y, color);
        });
        var color = this._const.colors.topPhase;
        ["t", "b", "l", "r"].forEach(e => {
            alg[e].forEach(i => { this._drawSmallQube(i, e, color, this._const.colors.border); });
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
        this._refreshContext();
        this.Public.InitAlg();
    },
    _refreshContext() {
        this._clearContext();
        this._drawCubeSceleton();
    },
    RenderAlg: function (alg) {
        this.Public.CurrentAlg = alg;
        this._refreshContext();
        this._drawAlg(alg);
        this._showAlgInfo(alg);
        this._logCurrentAlg()
    },
    RefreshCurrentAlg: function () {
        this.RenderAlg(this.Public.CurrentAlg);
    },
    LogAlg: function (alg) {
        //console.log(alg);
        var json = JSON.stringify(alg, null);
        //console.log(json);
        this._setAlgorithm(json);
    },
    _logCurrentAlg: function () {
        this.LogAlg(this.Public.CurrentAlg);
    },
    _setAlgorithm: function (value) {
        document.getElementById("algorithm").value = value;
    },
    _getAlgorithm: function (value) {
        return document.getElementById("algorithm").value;
    },
    CloneContext: function (destinationCanvasId) {
        var sourceCanvas = this._const.getCanvas();
        var destinationCanvas = document.getElementById(destinationCanvasId);
        var ctx = destinationCanvas.getContext('2d');
        ctx.drawImage(sourceCanvas, 0, 0, destinationCanvas.width, destinationCanvas.height);
    },
    GenerateAlgsSelections: function () {        
        var container = document.getElementById("canvasContainer");
        this.Algs.forEach(a => {
            var canvasContainerItem = document.createElement('div');
            container.appendChild(canvasContainerItem)
            canvasContainerItem.className = "canvasContainerItem";
            canvasContainerItem.setAttribute("data-id", a._id);           

            //this.Favorites.CreateElement(a, canvasContainerItem);

            var algId = document.createElement('span');
            canvasContainerItem.appendChild(algId);
            algId.innerHTML += a.g + " " + a._id;

            var title = document.createElement('div');
            canvasContainerItem.appendChild(title);
            title.className = "canvasContainerItemTitle";     
            title.innerHTML  = a.sol[0];
            var canvas = document.createElement('canvas');
            canvasContainerItem.appendChild(canvas);

            var id = 'canvas' + a._id;
            var size = 115;
            canvas.id = id;
            canvas.width = size;
            canvas.height = size;
            canvas.color = 'red';
            canvasContainerItem.onclick = function () {
                $(this).toggleClass("caseSelected")
            };
            this.RenderAlg(a)
            this.CloneContext(id);           
        });
    }
}