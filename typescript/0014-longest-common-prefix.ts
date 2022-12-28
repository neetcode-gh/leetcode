function longestCommonPrefix(strs: string[]): string {
    let result = '';
    for (let charIndex = 0; charIndex < strs[0].length; charIndex++) {
        for (const s of strs) {
            if (charIndex == s.length || s[charIndex] != strs[0][charIndex]) {
                return result;
            }
        }
        result += strs[0][charIndex];
    }
    return result;
}
