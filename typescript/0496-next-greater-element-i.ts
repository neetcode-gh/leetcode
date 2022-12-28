function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const map = {};

    for (let i = 0; i < nums1.length; i++) {
        map[nums1[i]] = i;
    }

    let res = new Array(nums1.length).fill(-1);
    const stack: number[] = [];

    for (let i = 0; i < nums2.length; i++) {
        let cur = nums2[i];
        while (stack.length && cur > stack.at(-1)) {
            let val = stack.pop()!;
            let idx = map[val];
            res[idx] = cur;
        }
        if (map.hasOwnProperty(cur)) {
            stack.push(cur);
        }
    }

    return res;
}
