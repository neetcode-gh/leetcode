/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    var lenS = s.length;
    var lenP = p.length;
    var map = {};

    return check(0, 0);

    function check(idxS, idxP) {
        if (map[idxS + ':' + idxP] !== undefined) {
            return map[idxS + ':' + idxP];
        }

        if (idxS > lenS) {
            return false;
        }

        if (idxS === lenS && idxP === lenP) {
            return true;
        }

        if (p[idxP] === '.' || p[idxP] === s[idxS]) {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
            check(idxS + 1, idxP) || check(idxS, idxP + 2) :
            check(idxS + 1, idxP + 1);
        } else {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
            check(idxS, idxP + 2) : false;
        }
      
        return map[idxS + ':' + idxP];
    }
};
