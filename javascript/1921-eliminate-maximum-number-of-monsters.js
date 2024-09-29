/**
 * Greedy | Sorting
 * Time O(n*log(n)) | Space O(n)
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
var eliminateMaximum = function(dist, speed) {

    const time = dist.map((d, i) => {
        return d / speed[i];
    });

    let monsterSlyed = 1;
    time.sort((a, b) => a - b);
    for (let i = 1; i < time.length; i++) {
        if (time[i] <= monsterSlyed) return monsterSlyed;
        monsterSlyed++;
    }

    return monsterSlyed;
};
