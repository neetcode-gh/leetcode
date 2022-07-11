let insert = function(intervals, newInterval) {
    let res = [];
    let isAdded = false;

    intervals.forEach(int => {
        if (int[0] > newInterval[1]) {
            if (!isAdded) {
                res.push(newInterval);
                isAdded = true;
            }

            res.push(int);
        } else if (int[1] < newInterval[0]) {
            res.push(int);
        } else {
            newInterval[0] = Math.min(newInterval[0], int[0]);
            newInterval[1] = Math.max(newInterval[1], int[1]);
        }
    });

    if (!isAdded) {
        res.push(newInterval);
    }

    return res;
};
