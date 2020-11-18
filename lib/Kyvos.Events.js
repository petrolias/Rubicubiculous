var Kyvos = Kyvos || {}
Kyvos.Events = {
    _agl: {
        name: "",
        inner: [],
        t: [],
        b: [0],
        l: [0],
        r: [2],
        sol: [" R U2 R' U R U' R "]
    },
    ClearSolution: function () {
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
        if (rect == null || rect == undefined) {return;}
        if (rect["d"] != undefined) {
            var d = rect["d"];
            var list = this._agl[d];
            var index = list.indexOf(d.i);
            if (index > -1){
                list.splice(index, 1);
            }else{
                list.push(i);
            }
            return;
        }

        this._alg.inner.forEach(rect => {
            var r = [rect.i, rect.j];
            var index = list.indexOf(r);
            if (index > -1) {
                list.splice(index, 1);
            } else {
                list.push(r);
            }
        });
    },
    GetAlg: function () {
        var a = this._alg;
        console.log(a);
        console.log(JSON.stringify(a));
        self.
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
        var self = this;
        canvas.addEventListener('click', function (e) {
            var rect = self._collides(rects, e.offsetX, e.offsetY);
            self._addRemoveRect(rect);
            self.M.RenderAlg(self._alg);
            // if (rect) {
            //     if (rect["d"] != undefined) {
            //         console.log('collision: ' + rect["d"] + ' [' + rect.i + "]");
            //     } else {
            //         console.log('collision: [' + rect.i + ',' + rect.j + "]");
            //     }
            // } else {
            //     console.log('no collision');
            // }
        }, false);
    },
}