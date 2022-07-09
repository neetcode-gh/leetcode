var getSum = function(a, b) {
    let tb = b;
    let res = a;

    while(tb) {
        let temp = (res & tb) << 1;
        res = res ^ tb;
        tb = temp;
    }

    return res;
};
