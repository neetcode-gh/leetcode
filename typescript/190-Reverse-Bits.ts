function reverseBits(n: number): number {
    let result = 0b0;

    for (let i = 0; i < 32; i++) {
        const bit = n & 0b1;
        result <<= 1;
        result |= bit;
        n >>= 1;
    }
    return result >>> 0;
}
