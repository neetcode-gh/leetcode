function isUgly(n: number): boolean {
    if (n < 1) {
        return false;
    }

    for (let prime of [2, 3, 5]) {
        while (n % prime == 0) {
            n /= prime;
        }
    }

    return n == 1;
}
