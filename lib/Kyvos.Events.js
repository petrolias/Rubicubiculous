var Kyvos = Kyvos || {}
Kyvos.Events = {
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
    onClick: function (rects, canvas) {
        var self = this;
        canvas.addEventListener('click', function (e) {
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