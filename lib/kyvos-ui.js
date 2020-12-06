var Kyvos = Kyvos || {}
Kyvos.Ui = {
    GetCountdown: function () {
        return document.getElementById("countdown");
    },
    GetTimeIntervalContainer() {
        return document.getElementById("timeIntervalContainer");
    },
    GetTimeInterval() {
        return document.getElementById("timeInterval");
    },
    GetTimeIntervalValue() {
        return this.GetTimeInterval().value;
    },
    Random: {
        ShowRandomAlg: function () {
            var cases = Kyvos.Cases;
            var selectedCases = [];
            var list = $(".caseSelected").map(function () { return $(this).attr("data-id"); }).get();
            selectedCases = cases.filter(obj => {
                return list.includes(obj._id.toString());
            });
            if (selectedCases.length == 0) {
                selectedCases = cases;
            };

            var cs = selectedCases[Math.floor(Math.random() * selectedCases.length)];
            Kyvos.renderCase(cs);
        },
        _timeInterval: null,
        IntervalAction: function () {
            this.Countdown.StartInterval();
            this.ShowRandomAlg()
        },
        StartInterval: function () {
            this.StopInterval();
            this.IntervalAction();
            var interval = Kyvos.Ui.GetTimeIntervalValue();
            this._timeInterval = setInterval(function () { Kyvos.Ui.Random.IntervalAction(); }, interval * 1000);
        },
        StopInterval: function () {
            this.Countdown.StopInterval();
            try {
                clearInterval(this._timeInterval);
                this._timeInterval = null;
            } catch (e) { }
        },
        Countdown: {
            _timeInterval: null,
            StartInterval: function () {
                this.StopInterval();
                this._setCountDownValue(Kyvos.Ui.GetTimeIntervalValue());
                this._timeInterval = setInterval(function () { Kyvos.Ui.Random.Countdown._update() }, 1000);
            },
            StopInterval: function () {
                try {
                    clearInterval(this._timeInterval);
                    this._timeInterval = null;
                } catch (e) { }
            },
            _getCountDownValue() {
                var val = Kyvos.Ui.GetCountdown().innerHTML;
                return parseInt(val);
            },
            _setCountDownValue(value) {
                Kyvos.Ui.GetCountdown().innerHTML = value;
            },
            _update: function () {
                var currentValue = this._getCountDownValue();
                currentValue -= 1;
                this._setCountDownValue(currentValue);
            }
        }
    },
    SelectAll: function () {
        $('.canvasContainerItem').removeClass("caseSelected");
        $('.canvasContainerItem').addClass("caseSelected");
    },
    SelectId: function (id) {
        $('.canvasContainerItem[data-id=' + id + ']').removeClass("caseSelected");
        $('.canvasContainerItem[data-id=' + id + ']').addClass("caseSelected");
    },
    ClearAll: function () {
        $('.canvasContainerItem').removeClass("caseSelected");
    },
    ToggleSelectAll: function () {
        $('.canvasContainerItem').toggleClass("caseSelected");
        // $('.canvasContainerItem').toggleClass("caseSelected");
        // if ($('canvasContainerItem.caseSelected').length) {

        // }

        // <i class='fa fa-save'></i>
    },
    // ClearAllFavorites: function () {
    //     Kyvos.Favorites.Clear();
    // },
    SaveCaseSetAndRefresh: function () {
        var storeId = Kyvos.Store.SaveCaseSet();
        Kyvos.Store.RefreshSelectCasesElement();
        // var select = document.getElementById("selCases");
        // select.value = storeId;
    },
    OnClickBtnStartStop: function () {
        var btn = document.getElementById("btnStartStop");
        var input = this.GetTimeIntervalContainer();
        var countdown = this.GetCountdown();
        if (this.Random.Countdown._timeInterval == null) {
            this.Random.StartInterval();
            btn.innerText = "Stop";
            btn.innerHTML = "<i class='fa fa-pause'></i>"
            input.style.display = "none";
            countdown.style.display = "inline-block";
        } else {
            this.Random.StopInterval();
            btn.innerText = "Start";
            btn.innerHTML = "<i class='fa fa-play'></i>"
            input.style.display = "inline-block";
            countdown.style.display = "none";
        }
    }
}