function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);

    let res = 0;
    let l = 0;
    let r = people.length - 1;

    while (l <= r) {
        let remain = limit - people[r];
        r -= 1;
        res += 1;
        if (l <= r && remain >= people[l]) {
            l += 1;
        }
    }
    return res;
}
