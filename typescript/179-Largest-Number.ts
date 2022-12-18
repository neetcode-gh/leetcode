function largestNumber(nums: number[]): string {
    const strings = nums.map((num) => String(num));

    function compare(s1: string, s2: string) {
        if (s1 + s2 > s2 + s1) {
            return -1;
        } else {
            return 1;
        }
    }

    const res = strings.sort(compare).join('');
    return res.charAt(0) === '0' ? '0' : res;
}
