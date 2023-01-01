function findClosestElements(arr: number[], k: number, x: number): number[] {
    let l = 0;
    let r = arr.length - k;

    while (l < r) {
        let m = Math.floor((l + r) / 2);
        if (x - arr[m] > arr[m + k] - x) {
            l = m + 1;
        } else {
            r = m;
        }
    }

    return arr.slice(l, l + k);
}
