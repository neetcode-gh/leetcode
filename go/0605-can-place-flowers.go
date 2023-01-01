func canPlaceFlowers(flowerbed []int, n int) bool {
    f := append(append([]int{0}, flowerbed...), 0)
    
    for i := 1; i < len(f) - 1; i++ {
        if f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0 {
            f[i] = 1
            n -= 1
        }
    } 
    return n <= 0
}
