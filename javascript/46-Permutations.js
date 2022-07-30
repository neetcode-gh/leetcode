function permute(nums) {
    const res = [];

    if (nums.length === 1) {
        return [nums.slice()];
    }

    for (const i of nums) {
        let n = nums.shift();

        let perms = permute(nums);

        for (const perm of perms) {
            perm.push(n);
        }

        perms.forEach((perm) => {
            res.push(perm);
        });

        nums.push(n);
    }

    return res;
}
