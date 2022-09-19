/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
    var good = new Set();

    for (var t in triplets) {
        var triplet = triplets[t];
        if (
            triplet[0] > target[0] ||
            triplet[1] > target[1] ||
            triplet[2] > target[2]
        ) {
            continue;
        }

        for (var i = 0; i < triplet.length; i++) {
            if (triplet[i] === target[i]) {
                good.add(i);
            }
        }
    }

    return good.size === 3;
};
