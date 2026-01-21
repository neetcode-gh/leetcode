const maxVowels = (s, k) => {
    let winStartPointer = 0
    let winEndPointer = 0 + (k - 1)

    const sl = s.toLowerCase()

    let vowelCounter = 0
    let maxVowelCount = 0

    //
    let vowelsSet = new Set(['a', 'e', 'i', 'o', 'u'])

    for (let i = winStartPointer; i <= winEndPointer; i++) {
        if (vowelsSet.has(sl[i])) {
            vowelCounter++
        }
    }
    maxVowelCount = vowelCounter

    while (winEndPointer < sl.length) {

        if (vowelsSet.has(sl[winStartPointer])) {
            vowelCounter--
        }
        if (vowelsSet.has(sl[winEndPointer + 1])) {

            vowelCounter++
        }
        if (vowelCounter > maxVowelCount) {
            maxVowelCount = vowelCounter
        }

        winStartPointer++
        winEndPointer++
    }

    return maxVowelCount
}