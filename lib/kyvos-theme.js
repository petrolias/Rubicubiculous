Kyvos = Kyvos || {}
Kyvos.Theme = {
    _getModule: function () {
        return Kyvos
    },
    _themes: [
        { id: 1, title: "Yellow", background: "lightGray", topPhase: "yellow", border: "black", outerCubeInner: "white", outerCubeBorder: "lightGray" },
        { id: 2, title: "Blue", background: "lightGray", topPhase: "blue", border: "black", outerCubeInner: "white", outerCubeBorder: "lightGray" },
        { id: 3, title: "Red", background: "lightGray", topPhase: "red", border: "black", outerCubeInner: "white", outerCubeBorder: "lightGray" },
        { id: 4, title: "Green", background: "lightGray", topPhase: "green", border: "black", outerCubeInner: "white", outerCubeBorder: "lightGray" },
        { id: 5, title: "Orange", background: "lightGray", topPhase: "orange", border: "black", outerCubeInner: "white", outerCubeBorder: "lightGray" },
        { id: 6, title: "Intense Yellow", background: "black", topPhase: "yellow", border: "darkgray", outerCubeInner: "black", outerCubeBorder: "lightGray" },
        { id: 7, title: "Mono", background: "white", topPhase: "black", border: "darkgray", outerCubeInner: "white", outerCubeBorder: "lightGray" },
    ],
    getDefaultTheme: function () {
        return this._themes[0];
    },
    refreshSelectThemeElement: function () {
        var parent = document.getElementById("themeSelectContainer");
        function _removeElement(id) {
            var elem = document.getElementById(id);
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        }
       
        var themes = this._themes;
        var module = this._getModule();
        if (themes.length == 0) { return; }
        var select = document.createElement("select");
        select.id = "selThemes";
        for (var i = 0; i < themes.length; i++) {
            var option = document.createElement("option");
            option.value = themes[i].id;
            option.text = themes[i].title;
            select.appendChild(option);
        }

        select.addEventListener("change", function (s, e) {
            var theme = themes.find(obj => {
                return obj.id == s.target.value;
            });
            module.initByTheme(theme);
            module.refreshVisibleCase();
        });

        parent.appendChild(select);

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