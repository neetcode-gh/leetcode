function minEatingSpeed(piles: number[], h: number): number {
    let l = 1;
    let r = Math.max(...piles);
    let res = r;

    while (l <= r) {
        let k = Math.floor((l + r) / 2);
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / k);
        }
        if (hours <= h) {
            res = Math.min(res, k);
            r = k - 1;
        } else {
            l = k + 1;
        }
    }

    return res;
}
