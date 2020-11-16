var Algs = Algs || {
    GetAlgs : function (){
        var olls = [];
        olls["OCLL6"] = {
            inner: [
                [1, 0],
                [2, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [1, 2]
            ],
            t : [],
            b : [0],
            l : [0],
            r : [2]
        };
        olls["OCLL7"] = {
            inner: [
                [1, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [0, 2],
                [1, 2]
            ],
            t : [0],
            b : [2],
            l : [],
            r : []
        };

        return olls;
    }
}