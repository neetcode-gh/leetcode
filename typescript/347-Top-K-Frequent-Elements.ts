function topKFrequent(nums: number[], k: number): number[] | undefined {
    const hash: {
        [key: number]: number;
    } = {};

    const freq: number[][] = Array.apply(null, Array(nums.length + 1)).map(
        () => []
    );

    nums.forEach((item) => {
        if (hash[item]) {
            hash[item]++;
        } else {
            hash[item] = 1;
        }
    });

    Object.keys(hash).forEach((item) => {
        const key = Number(item);
        const value = hash[item];
        freq[value].push(key);
    });

    const res: number[] = [];

    for (let i = freq.length - 1; i >= 0; i--) {
        const element = freq[i];
        for (let j = 0; j < element.length; j++) {
            const second = element[j];
            res.push(Number(second));
            if (res.length == k) {
                return res;
            }
        }
    }
}

function topKFrequentNLogN(nums: number[], k: number): number[] {
    const map = nums.reduce((acc, num) => {
        const currentNumber = acc[String(num)];
        acc[num] = currentNumber ? currentNumber + 1 : 1;
        return acc;
    }, {});

    return Object.entries(map)
        .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
        .slice(0, k)
        .map(([num]) => +num);
};
