var Kyvos = {
    _getModule : function (){
        return this;
    },
    context : null,
    theme : null,
    cube : null,
    visibleCase : null,
    _getDefaultContext: function () {
        return document.getElementById("myCanvas").getContext("2d");
    },
    main: function () {
        var theme = this._getModule().Theme.getDefaultTheme();
        this.initByTheme(theme);
    },
    initByTheme: function(theme){
        this.context = this._getDefaultContext();
        this.theme = theme;
        this.cube = this._getModule().Cube.getDefaultCube();

        var context = this.context;
        var theme = this.theme;
        var cube = this.cube;
        var thumbnailCube = this._getModule().Cube.getThumbnailCube();

        this._adjustCubeCanvasSize(context, cube);
        var cubeRects = this._refreshContext(context, theme, cube);
        //this._getModule().Events.onClick(cubeRects, context.canvas);
        this._generateCases(theme, thumbnailCube);
        // //this.Favorites.ReadAndSetFavoriesFromStore();
        // this.Store.RefreshSelectCasesElement();
    },
    _adjustCubeCanvasSize: function (context, cube) {
        var canvas = context.canvas;
        canvas.width = cube.getWidth();
        canvas.height = canvas.width;
    },
    _drawCubeSceleton: function (context, theme, cube) {
        var size = cube.size;
        var rects = [];
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                var rect = this._drawQube(i, j, false, context, theme, cube);
                rects.push(rect);
            }
            ["t", "b", "l", "r"].forEach(e => {
                var rect = this._drawSmallQube(i, e, false, context, theme, cube);
                rects.push(rect);
            });
        }
        return rects;
    },
    _drawQube: function (i, j, isTopPhase, context, theme, cube) {
        var nq = cube;
        var w = nq.w;
        var h = nq.h;
        var pd = nq.padding;
        var spX = nq.startPositionX;
        var spY = nq.startPositionY;

        var x = spX + i * w;
        var y = spY + j * h;
        context.fillStyle = theme.border;
        context.fillRect(x, y, w + pd, h + pd);
        if (isTopPhase) {
            context.fillStyle = theme.topPhase;
        } else {
            context.fillStyle = theme.background;
        }
        context.fillRect(x + pd, y + pd, w - pd, h - pd);
        return { i: i, j: j, x: x, y: y, w: w + pd, h: h + pd };
    },
    _drawSmallQube: function (i, direction, isTopPhase, context, theme, cube) {
        var nq = cube;
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
        context.fillStyle = theme.outerCubeBorder;
        context.fillRect(x, y, ww, hh);
        if (isTopPhase) {
            context.fillStyle = theme.topPhase;
        } else {
            context.fillStyle = theme.outerCubeInner;
        }
        context.fillRect(x + pd, y + pd, iww, ihh);
        var rect = { d: direction, i: i, x: x, y: y, w: ww, h: hh };
        //console.log(rect);
        return rect;
    },
    _drawCase: function (context, theme, cube, sample) {
        sample.inner.forEach(f => {
            var x = f[0];
            var y = f[1];
            this._drawQube(x, y, true, context, theme, cube);
        });
        ["t", "b", "l", "r"].forEach(e => {
            sample[e].forEach(i => { this._drawSmallQube(i, e, true, context, theme, cube); });
        });
    },
    _showCaseInfo: function (value) {
        this._setName(value.name);
        this._setSolution(value.sol[0]);
    },
    _setName: function (name) { document.getElementById("AlgorithmName").innerHTML = name; },
    _setSolution: function (solution) { document.getElementById("AlgorithmSolution").innerHTML = solution; },
    _clearContext: function (context) {
        var cnt = context;
        // Store the current transformation matrix
        cnt.save();
        // Use the identity matrix while clearing the canvas
        cnt.setTransform(1, 0, 0, 1, 0, 0);
        cnt.clearRect(0, 0, cnt.canvas.width, cnt.canvas.height);
        // Restore the transform
        cnt.restore();
    },
    _refreshContext(context, theme, cube) {
        this._clearContext(context);
        return this._drawCubeSceleton(context, theme, cube);
    },
    _renderCase: function (context, theme, cube, value) {
        this.visibleCase = value;
        this._refreshContext(context, theme, cube);
        this._drawCase(context, theme, cube, value);
        this._showCaseInfo(value);
        this._logCase(value);
    },
    renderCase : function(value){
        var context = this.context;
        var theme = this.theme;
        var cube = this.cube;
        this._renderCase(context, theme, cube, value);
    },
    _logCase: function (value) {
        //console.log(alg);
        var json = JSON.stringify(value, null);
        //console.log(json);
        this._setAlgorithm(json);
    },
    _setAlgorithm: function (value) {
        document.getElementById("algorithm").value = value;
    },
    _getAlgorithm: function (value) {
        return document.getElementById("algorithm").value;
    },
    _cloneContext: function (sourceContext, destinationCanvasId) {
        var destinationCanvas = document.getElementById(destinationCanvasId);
        var ctx = destinationCanvas.getContext('2d');
        ctx.drawImage(sourceContext.canvas, 0, 0, destinationCanvas.width, destinationCanvas.height);
    },
    _generateCases: function (theme, cube) {        
        var container = document.getElementById("canvasContainer");
        var sortedElements = this._getModule().Cases.sort((a, b) => (a.gn > b.gn) ? 1 : -1);
        sortedElements.forEach(a => {
            var canvasContainerItem = document.createElement('div');
            container.appendChild(canvasContainerItem)
            canvasContainerItem.className = "canvasContainerItem";
            canvasContainerItem.setAttribute("data-id", a._id);           

            //this.Favorites.CreateElement(a, canvasContainerItem);

            var elTitle = document.createElement('span');
            canvasContainerItem.appendChild(elTitle);
            elTitle.innerHTML += a.g + " " + a._id;

            var elSolution = document.createElement('div');
            canvasContainerItem.appendChild(elSolution);
            elSolution.className = "canvasContainerItemTitle";     
            elSolution.innerHTML  = a.sol[0];
            var canvas = document.createElement('canvas');
            canvasContainerItem.appendChild(canvas);

            var width = cube.getWidth();
            canvas.id = 'canvas' + a._id;
            canvas.width = width;
            canvas.height = canvas.width;
            canvasContainerItem.onclick = function () {
                $(this).toggleClass("caseSelected")
            };
            this._renderCase(canvas.getContext("2d"), theme, cube, a)
        });
    },
    refreshVisibleCase: function () {
        this.renderCase(this.visibleCase);
    }
}