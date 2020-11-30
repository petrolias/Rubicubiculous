var Kyvos = Kyvos || {}
Kyvos.Ui = {
    Clear: function () {
        Kyvos.ClearAlg();
    },
    Random: {
        ShowRandomAlg: function () {        
            var list = $(".caseSelected").map(function(){return $(this).attr("data-id");}).get();
            if (list.length == 0) { return; }
            var algs = Kyvos.Algs;

            var filteredAlgs = algs.filter(obj => {
                return list.includes(obj._id.toString());
              });
            var algsToShow = filteredAlgs;
            //console.log(filteredAlgs);

            var alg = algsToShow[Math.floor(Math.random() * algsToShow.length)];
            Kyvos.RenderAlg(alg);
        },
        _timeInterval: null,
        _getTimeInterval() {
            return document.getElementById("randomInterval").value;
        },
        IntervalAction: function () {
            this.Countdown.StartInterval();
            this.ShowRandomAlg()
        },
        StartInterval: function () {
            this.StopInterval();
            this.IntervalAction();
            var interval = this._getTimeInterval();
            this._timeInterval = setInterval(function () { Kyvos.Ui.Random.IntervalAction(); }, interval * 1000);
        },
        StopInterval: function () {
            this.Countdown.StopInterval();
            try {
                clearInterval(this._timeInterval);
            } catch (e) { }
        },
        Countdown : {
            _timeInterval : null,
            StartInterval: function (){
                this.StopInterval();
                this._setCountDown(0);
                this._timeInterval = setInterval(function(){Kyvos.Ui.Random.Countdown._update()}, 1000);
             },
             StopInterval: function (){
                 try{
                     clearInterval(this._timeInterval);
                 }catch(e){}
              },
            _getCountDown() {
                var val = document.getElementById("countDown").innerHTML;
                return parseInt(val);
            },
            _setCountDown(value) {
                document.getElementById("countDown").innerHTML = value;
            },
            _update: function () {
                var currentValue = this._getCountDown();
                currentValue += 1;
                this._setCountDown(currentValue);
            }
        }
    },
    SelectAll : function(){
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
    ToggleSelectAll : function(){
        $('.canvasContainerItem').toggleClass("caseSelected");
    },
    // ClearAllFavorites: function () {
    //     Kyvos.Favorites.Clear();
    // },
    SaveCaseSetAndRefresh: function(){
        Kyvos.Store.SaveCaseSet();
        Kyvos.Store.RefreshSelectCasesElement();
    },
    DeleteSelectedCase: function(){
        Kyvos.Store.DeleteSelectedCase();
        Kyvos.Store.RefreshSelectCasesElement();
    }
}