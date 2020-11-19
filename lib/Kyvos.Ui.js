var Kyvos = Kyvos || {}
Kyvos.Ui = {
    self : this,
    Random: {
        self: this,
        _timeInterval: null,
        _getTimeInterval() {
            return document.getElementById("randomInterval").value;
        },
        IntervalAction : function(){
            Kyvos.Ui.Countdown.StartInterval();
            Kyvos.M.ShowRandomAlg()
        },
        StartInterval: function () {
            this.StopInterval();
            this.IntervalAction();
            var interval = this._getTimeInterval();
            this._timeInterval = setInterval(function(){ 
                Kyvos.Ui.Random.IntervalAction();
            }, interval * 1000);
         },
         StopInterval: function (){
            Kyvos.Ui.Countdown.StopInterval();
             try{
                 clearInterval(this._timeInterval);
             }catch(e){}
          }
    },
    Countdown : {
        self : this,
        _timeInterval : null,
        StartInterval: function (){
            this.StopInterval();
            this._setCountDown(0);
            this._timeInterval = setInterval(function(){Kyvos.Ui.Countdown._update()}, 1000);
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
}