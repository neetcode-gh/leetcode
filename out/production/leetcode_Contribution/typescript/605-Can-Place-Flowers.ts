function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    flowerbed = [0, ...flowerbed, 0];

    for (let i = 1; i < flowerbed.length - 1; i++) {
        if (
            flowerbed[i - 1] == 0 &&
            flowerbed[i + 1] === 0 &&
            flowerbed[i] === 0
        ) {
            flowerbed[i] = 1;
            n -= 1;
        }
    }

    return n <= 0;
}
