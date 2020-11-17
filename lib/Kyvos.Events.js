var Kyvos = Kyvos || {}
Kyvos.Events = {
    _agl: {
        name: "OCLL26",
        inner: [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [1, 2]
        ],
        t: [],
        b: [0],
        l: [0],
        r: [2],
        sol: [" R U2 R' U R U' R "]
    },
    _selectedRects: [],
    ClearSolution: function () {
        this._selectedRects = [];
    },
    _addRect: function (rect) {
        this._selectedRects.push(rect)
    },
    RemoveLastRect: function () {
        this._selectedRects.pop();
    },
    SetSolution: function (solution) {
        this._agl.sol = solution;
    },
    SetName: function (name) {
        this._agl.name = name;
    },
    GenerateAlgorithm: function () {
        this._agl.inner = [];
        this._agl.t = [];
        this._agl.b = [];
        this._agl.l = [];
        this._agl.r = [];

        this._selectedRects.forEach(rect => {
            if (rect["d"] != undefined) {
                var d = rect["d"];
                this._agl[d].push(rect.i);
            }
        });
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
            if (rect) {
                if (rect["d"] != undefined) {
                    console.log('collision: ' + rect["d"] + ' [' + rect.i + "]");
                } else {
                    console.log('collision: [' + rect.i + ',' + rect.j + "]");
                }
            } else {
                console.log('no collision');
            }
        }, false);
    },
}