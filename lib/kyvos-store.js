var Kyvos = Kyvos || {}
Kyvos.Store = {
    GetCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    Restore: function (cookieName) {
        var valueIfNotExist = [];
        var cookie = this.GetCookie(cookieName);
        if (cookie == undefined || cookie == "" || cookie == "undefined") { return valueIfNotExist; }
        var value = JSON.parse(cookie);
        return value;
    },
    Save: function (value) {
        self.document.cookie = this._cookieName + "=" + JSON.stringify(value);
    },
    _getCurrentSelected: function () {
        var list = $(".caseSelected").map(function () { return $(this).attr("data-id"); }).get();
        return list;
    },
    _cookieName: "store",
    SaveCaseSet: function () {
        var p = prompt("Cases name to store", "Case Oll Favorites");
        var value = this._getCurrentSelected();
        var maxValue = 0;
        var cases = this._getCaseSet();

        var existingCase = cases.find(obj => {
            return obj.title == p;
        });

        if (cases.length > 0) {
            maxValue = Math.max.apply(Math, cases.map(function (o) { return o.id; })) + 1;
        }

        if (existingCase != null) {
            existingCase.cases = value;
            this.Save(cases);
            return;
        }
        var alg = { title: p, cases: value };
        alg.id = maxValue;
        cases.push(alg);
        this.Save(cases);
        return alg.id;
    },
    _getCaseSet: function () {
        var val = this.Restore(this._cookieName);
        // return [
        //     {"title":"Case Oll Favorites","cases":["2","3","4","7","8","11","12","17","18","19"],"id":0},{"title":"all cases","cases":["1","2","3","4","7","8","11","12","17","18","19","20","21","22","23","24","25","26","27","31","48","49","61"],"id":1}
        // ];
        if (val == undefined || val == "" || val == "undefined") { return []; }
        return val;
    },
    RefreshSelectCasesElement: function () {
        var parent = document.getElementById("casesSelectContainer");
        function _removeElement(id) {
            var elem = document.getElementById(id);
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        }
        _removeElement("selCases");
        _removeElement("btnDeleteCases");

        var cases = this._getCaseSet();
        if (cases.length == 0) { return; }
        var select = document.createElement("select");
        parent.appendChild(select);
        select.id = "selCases";
        for (var i = 0; i < cases.length; i++) {
            var option = document.createElement("option");
            option.value = cases[i].id;
            option.text = cases[i].title;
            select.appendChild(option);
        }

        select.addEventListener("change", function (s, e) {
            var setSelected = cases.find(obj => {
                return obj.id == s.target.value;
            });
            Kyvos.Ui.ClearAll();
            setSelected.cases.forEach(_setSelected);
            function _setSelected(item, index) {
                Kyvos.Ui.SelectId(item);
            }
        });

        var deleteButton = document.createElement("Button");
        deleteButton.id = "btnDeleteCases";
        deleteButton.innerText = "X";
        deleteButton.onclick = function(){
            if (confirm('Delete the selected cases?')) {
                Kyvos.Store.DeleteSelectedCase();
                Kyvos.Store.RefreshSelectCasesElement();
            }
        }
        parent.appendChild(deleteButton);

    },
    DeleteSelectedCase: function () {
        var e = document.getElementById("selCases");
        var value = e.value;
        var cases = this._getCaseSet();
        cases = cases.filter(obj => {
            return value != obj.id;
        });
        this.Save(cases);
    }
};

Kyvos.Favorites = {
    CreateElement: function (algorithmItem, containerEl) {
        var starDiv = document.createElement('span');
        starDiv.className = "faStar";
        starDiv.setAttribute("data-id", algorithmItem._id);
        containerEl.appendChild(starDiv);
        var faStar = document.createElement('i');
        starDiv.appendChild(faStar);
        faStar.className = "fa fa-star fa-2x";
        starDiv.onclick = function () {
            $(this).toggleClass("starSelected");
            Kyvos.Favorites.StoreFavoritesToCookie();
        };
        starDiv.appendChild = faStar;
    },
    _getAllSelected: function () {
        var list = $(".faStar.starSelected").map(function () { return $(this).attr("data-id"); }).get();
        return list;
    },
    Clear: function () {
        $('.faStar.starSelected').removeClass("starSelected");
        this.StoreFavoritesToCookie();
    },
    _cookieName: "favoriteAlgs",
    StoreFavoritesToCookie: function () {
        self.document.cookie = this._cookieName + "=" + JSON.stringify(this._getAllSelected());
    },
    _readFavoriesFromStore: function () {
        var valueIfNotExist = [];
        var cookie = Kyvos.Store.GetCookie(this._cookieName);
        if (cookie == undefined || cookie == "") { return valueIfNotExist; }
        var value = JSON.parse(cookie);
        return value;
    },
    ReadAndSetFavoriesFromStore: function () {
        var favoritesList = this._readFavoriesFromStore();
        favoritesList.forEach(_setSelected);
        function _setSelected(item, index) {
            $('.faStar[data-id=' + item + ']').removeClass("starSelected");
            $('.faStar[data-id=' + item + ']').addClass("starSelected");
        }
    },
};