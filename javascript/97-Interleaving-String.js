//////////////////////////////////////////////////////////////////////////////
// 1D Dynamic Programming
// Time: O(n*m)
// Space: O(m)
//////////////////////////////////////////////////////////////////////////////

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
        return (!s1 && !s2 && !s3) || (s1 ? s1 === s3 : s2 === s3);
    }

    const seen = new Array(l2 + 1);
    seen[l2] = true;

    for (let i = l2 - 1; i >= 0; --i) {
        seen[i] = seen[i + 1] && s2[i] === s3[l1 + i];
    }
    for (let i = l1 - 1; i >= 0; --i) {
        for (let j = l2; j >= 0; --j) {
            seen[j] =
                (seen[j] && s1[i] === s3[i + j]) ||
                (j !== l2 && seen[j + 1] && s2[j] === s3[i + j]);
        }
    }
    return seen[0];
}

//////////////////////////////////////////////////////////////////////////////
// 2D Dynamic Programming
// Time: O(n*m)
// Space: O(n*m)
//////////////////////////////////////////////////////////////////////////////

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
        return (!s1 && !s2 && !s3) || (s1 ? s1 === s3 : s2 === s3);
    }

    const seen = new Array(l1 + 1).fill().map(() => new Array(l2 + 1));
    seen[l1][l2] = true;

    for (let i = l1 - 1; i >= 0; --i) {
        seen[i][l2] = seen[i + 1][l2] && s1[i] === s3[i + l2];
    }
    for (let j = l2 - 1; j >= 0; --j) {
        seen[l1][j] = seen[l1][j + 1] && s2[j] === s3[l1 + j];
    }
    for (let i = l1 - 1; i >= 0; --i) {
        for (let j = l2 - 1; j >= 0; --j) {
            seen[i][j] =
                (seen[i + 1][j] && s1[i] === s3[i + j]) ||
                (seen[i][j + 1] && s2[j] === s3[i + j]);
        }
    }
    return seen[0][0];
}

//////////////////////////////////////////////////////////////////////////////
// Depth First Search Recursion With Memoization
// Time: O(n*m)
// Space: O(n*m)
//////////////////////////////////////////////////////////////////////////////

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
        return (!s1 && !s2 && !s3) || (s1 ? s1 === s3 : s2 === s3);
    }

    const seen = new Array(l1 + 1).fill().map(() => new Array(l2 + 1));
    return checkStrings();

    /**
     * @param {number=} i = `0`
     * @param {number=} j = `0`
     * @param {number=} k = `0`
     * @return {boolean}
     */
    function checkStrings(i = 0, j = 0, k = 0) {
        return (
            k === l3 ||
            (seen[i][j] !== undefined
                ? seen[i][j]
                : (seen[i][j] =
                      (i < l1 &&
                          s1[i] === s3[k] &&
                          checkStrings(i + 1, j, k + 1)) ||
                      (j < l2 &&
                          s2[j] === s3[k] &&
                          checkStrings(i, j + 1, k + 1))))
        );
    }
}
