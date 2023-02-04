function restoreIpAddresses(s: string): string[] {
    let result: string[] = [];

    if (s.length > 12) return result;

    function backtrack(i: number, dots: number, currentIP: string) {
        if (dots == 4 && i == s.length) {
            result.push(currentIP.slice(0, currentIP.length - 1));
            return;
        } else if (dots > 4) {
            return;
        }

        for (let j = i; j < Math.min(i + 3, s.length); j++) {
            if (parseInt(s.slice(i, j + 1)) < 256 && (i == j || s[i] != '0')) {
                backtrack(j + 1, dots + 1, currentIP + s.slice(i, j + 1) + '.');
            }
        }
    }

    backtrack(0, 0, '');

    return result;
}
