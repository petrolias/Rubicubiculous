var Algs = Algs || {
    GetAlgs : function (){
        var olls = [
            {"name":"21","inner":[[0,1],[1,0],[1,2],[2,1]],"t":[0,2],"b":[2,0],"l":[2,0],"r":[0,2],"sol":[""],"d":[]},
            {
            name: "OCLL26",
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
            r : [2],
            sol :[" R U2 R' U R U' R "]
        },
        {
            name: "OCLL27",
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
            r : [0],
            sol :[" R U R' U R U2 R' "]
        }
    ];

        return olls;
    }
}