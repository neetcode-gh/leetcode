function getSum(a: number, b: number): number {
    let res = a;
    let secondInt = b;

    while (secondInt != 0) {
        let temp = (res & secondInt) << 1;
        res ^= secondInt;
        secondInt = temp;
    }
    return res;
}
