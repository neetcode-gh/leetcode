function leastBricks(wall: number[][]): number {
    let countGap = { 0: 0 };

    for (const r of wall) {
        let total = 0;
        for (const b of r.slice(0, -1)) {
            total += b;
            if (countGap[total]) {
                countGap[total] += 1;
            } else {
                countGap[total] = 1;
            }
        }
    }

    return wall.length - Math.max(...Object.values(countGap));
}
