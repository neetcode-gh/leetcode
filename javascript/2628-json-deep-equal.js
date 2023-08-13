/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function(o1, o2) {
    if (o1 === null || o2 === null) {
        return o1 === o2;
    }
    if (typeof o1 !== typeof o2) { 
        return false;
    }
    if (typeof o1 !== 'object') {   // primitives
        return o1 === o2;
    }

    if (Array.isArray(o1) && Array.isArray(o2)) {        // Arrays
        if (o1.length !== o2.length) {
            return false;
        }
        for (let i = 0; i < o1.length; i++) {
            if (!areDeeplyEqual(o1[i], o2[i])) {
                return false;
            }
        }
    } else if (!Array.isArray(o1) && !Array.isArray(o2)) { // Objects
        if (Object.keys(o1).length !== Object.keys(o2).length) {
            return false;
        }
        for (const key in o1) {
            if (!areDeeplyEqual(o1[key], o2[key])) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
};
