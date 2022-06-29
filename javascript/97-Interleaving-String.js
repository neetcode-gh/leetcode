/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
function isInterleave(s1, s2, s3) {
    
    const l1 = s1.length;
    const l2 = s2.length;
    const l3 = s3.length;
    
    if (l1 + l2 !== l3) {
        return false;
    }
    if (!s1 || !s2 || !s3) {
        return (!s1 && !s2 && !s3) || (
            s1
                ? s1 === s3
                : s2 === s3
        );
    }
    
    const seen = new Array(l1 + 1).fill()
        .map(() => new Array(l2 + 1));
    return checkStrings();
    
    /**
     * @param {number=} i = `0`
     * @param {number=} j = `0`
     * @param {number=} k = `0`
     * @return {boolean}
     */
    function checkStrings(i = 0, j = 0, k = 0) {
        return k === l3 || (
            seen[i][j] !== undefined
                ? seen[i][j]
                : seen[i][j] = (
                    i < l1
                    && s1[i] === s3[k]
                    && checkStrings(i + 1, j, k + 1)
                ) || (
                    j < l2
                    && s2[j] === s3[k]
                    && checkStrings(i, j + 1, k + 1)
                )
        );
    }
}
