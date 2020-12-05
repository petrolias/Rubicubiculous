Kyvos = Kyvos || {}
Kyvos.Theme = {
    _themes: [
        {
            background: "lightGray",
            topPhase: "yellow",
            border: "black",
            outerCubeInner: "white",
            outerCubeBorder: "lightGray"
        }
    ],
    getDeafaultTheme: function () {
        return this._themes[0];
    }
}
Kyvos.Cube = {
    _cubeThemes: [
        { w: 100, smallQubeAnalogy: 0.2, offset: 5, padding: 1, startPositionOffeset: 0 },
        { w: 30, smallQubeAnalogy: 0.2, offset: 1, padding: 1, startPositionOffeset: 0 },
    ],
    _getDefaultCubeTheme: function () {
        return this._cubeThemes[0];
    },
    _getThumbnailCubeTheme: function () {
        return this._cubeThemes[1];
    },
    _getQube3x3: function (cubeTheme) {  
        var nq = this.getDefaultCube();
        var q = { 
            size: 3, 
            w: nq.w, 
            h: nq.w, 
            padding: nq.padding, 
            offset : nq.offset,
            startPositionX: nq.w * nq.smallQubeAnalogy + nq.offset + nq.padding * 2 + nq.startPositionOffeset,
            startPositionY: nq.w * nq.smallQubeAnalogy + nq.offset + nq.padding * 2 + nq.startPositionOffeset,
            sqh: nq.w * nq.smallQubeAnalogy,
            getWidth : function(){
                return this.startPositionX * 2 + this.w * this.size;
            }
        } ;
        return q;
    },
    getDefaultCube: function () {
        return _getQube3x3(this._getDefaultCubeTheme());
    },
    getThumbnailCube: function () {
        return _getQube3x3(this._getThumbnailCubeTheme());
    },
}