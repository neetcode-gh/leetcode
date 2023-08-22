/**
 * @param {string} s
 * @return {number}
 * Time Complexity: O(2^N)
 * Space Complexity: O(2^N)
 */
var maxProduct = function (s) {
    const N = s.length;
    const first = new Array(1 << N).fill(0),
        last = new Array(1 << N).fill(0);
    for (let i = 0; i < N; i++) {
        for (let j = 1 << i; j < 1 << (i + 1); j++) {
            first[j] = i;
        }
    }
    for (let i = 0; i < N; i++) {
        for (let j = 1 << i; j < 1 << N; j += 1 << (i + 1)) {
            last[j] = i;
        }
    }
    const dp = Memo((m) => {
        if ((m & (m - 1)) === 0) {
            return m != 0;
        }
        const l = last[m],
            f = first[m];
        const lb = 1 << l,
            fb = 1 << f;
        return Math.max(
            dp(m - lb),
            dp(m - fb),
            dp(m - lb - fb) + (s[l] == s[f]) * 2
        );
    });
    let ans = 0;
    for (let m = 1; m < 1 << N; m++) {
        ans = Math.max(ans, dp(m) * dp((1 << N) - 1 - m));
    }
    return ans;
};

var Memo = (func) => {
    const map = new Map();
    var wrapper = (m) => {
        if (!map.get(m)) {
            map.set(m, func(m));
        }
        return map.get(m);
    };
    return wrapper;
};
