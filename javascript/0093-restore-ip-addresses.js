/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    if(s.length > 12) return [];
    const a = [];
    const bt = (i, d, ip) => {
        if(i === s.length && d === 4) {
            a.push(ip.slice(0, -1));
            return;
        }
        if(d > 4) return;
        for(let j = i; j < Math.min(i + 3, s.length); j++){
            let p = s.substring(i, j + 1)
            if(Number(p) > 255 || (p.length > 1 && p[0] === '0')) continue;
            bt(j + 1, d + 1, ip + p + '.');
        }
    }
    bt(0, 0, '');
    return a;
};