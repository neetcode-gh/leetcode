function myPow(x: number, n: number): number {
    function helper(x: number, n: number): number {
        if (x == 0) return 0;
        if (n == 0) return 1;

        let res = helper(x * x, Math.floor(n / 2));
        return n % 2 ? x * res : res;
    }

    let res = helper(x, Math.abs(n));
    return n >= 0 ? res : 1 / res;
}
