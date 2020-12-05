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
        { w: 100, smallCubeAnalogy: 0.2, offset: 5, padding: 1, startPositionOffeset: 0 },
        { w: 30, smallCubeAnalogy: 0.2, offset: 1, padding: 1, startPositionOffeset: 0 },
    ],
    _getDefaultCubeTheme: function () {
        return this._cubeThemes[0];
    },
    _getThumbnailCubeTheme: function () {
        return this._cubeThemes[1];
    },
    _getCube3x3: function (cube) {
        var c = cube;
        var cb = {
            size: 3,
            w: c.w,
            h: c.w,
            padding: c.padding,
            offset: c.offset,
            startPositionX: c.w * c.smallCubeAnalogy + c.offset + c.padding * 2 + c.startPositionOffeset,
            startPositionY: c.w * c.smallCubeAnalogy + c.offset + c.padding * 2 + c.startPositionOffeset,
            sqh: c.w * c.smallCubeAnalogy,
            getWidth: function () {
                return this.startPositionX * 2 + this.w * this.size;
            }
        };
        return cb;
    },
    getDefaultCube: function () {
        return this._getCube3x3(this._getDefaultCubeTheme());
    },
    getThumbnailCube: function () {
        return this._getCube3x3(this._getThumbnailCubeTheme());
    },
}