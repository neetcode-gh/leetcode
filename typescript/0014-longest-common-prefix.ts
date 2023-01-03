function longestCommonPrefix(strs: string[]): string {
    let res = "";
    
    for (let i = 0; i < strs[0].length; i++) {
        for (const s of strs) {
            if (i == s.length || s[i] !== strs[0][i]) {
                return res;
            }
        }
        res += strs[0][i]
    }
    
    return res;
};