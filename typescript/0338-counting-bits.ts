function countBits(n: number): number[] {
    const ans: number[] = [];

    for (let i = 0; i < n + 1; i++) {
        ans.push(hammingWeight(i));
    }

    return ans;
}

function hammingWeight(n: number): number {
    let base2 = n.toString(2).split('');
    let count = 0;

    base2.forEach((item) => {
        if (item === '1') {
            count += 1;
        }
    });

    return count;
}
