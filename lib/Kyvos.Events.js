var Kyvos = Kyvos || {}
Kyvos.Events = {
    _alg: {
        _id: null,
        name: "Undefined",
        inner: [],
        t: [],
        b: [],
        l: [],
        r: [],
        sol: ["-"]
    },
    ClearAlg: function () {
        this._alg.inner = [];
        this._alg.t = [];
        this._alg.d = [];
        this._alg.l = [];
        this._alg.r = [];
    },
    SetSolution: function (solution) {
        this._agl.sol = solution;
    },
    SetName: function (name) {
        this._agl.name = name;
    },
    _addRemoveRect: function (rect) {
        var alg = this._alg;
        if (rect == null || rect == undefined) {return;}
        if (rect.d != undefined) {
            var d = rect.d;
            var list = alg[d];
            var index = list.indexOf(rect.i);
            if (index > -1){
                list.splice(index, 1);
            }else{
                list.push(rect.i);
            }
            return;
        }

        var list = alg.inner;
        var r = [rect.i, rect.j];
        if (list.length == 0){
            list.push(r);
            return;
        }
        
        var indx = -1;
        list.forEach(_addRemoveInner);
        if (indx > -1) {
            list.splice(indx, 1);
        } else {
            list.push(r);
        }
        
        function _addRemoveInner(item, index){
            if (item[0] == r[0] && item[1] == r[1]) {
                indx = index;
            }
        }
    },
    _collides: function (rects, x, y) {
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
    onClick: function (rects, canvas) {
        var obj = this;
        canvas.addEventListener('click', function (e) {
            var rect = obj._collides(rects, e.offsetX, e.offsetY);
            obj._addRemoveRect(rect);
            Kyvos.M.RenderAlg(obj._alg);
        }, false);
    },
    _setName: function (value) {
        document.getElementById("name").value = value;
    },
    _getName: function (value) {
        return document.getElementById("name").value;
    },
    _setSolution: function (value) {
        document.getElementById("solution").value = value;
    },
    _getSolution: function (value) {
        return document.getElementById("solution").value;
    },
}