//////////////////////////////////////////////////////////////////////////////
// Single Binary Search
// Time: O(log(mn))  Space: O(1)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    
    const width = matrix[0].length;
    const height = matrix.length;
    let i = 0;
    let j = height * width - 1;
    
    while (i <= j) {
        const m = Math.floor((i + j) / 2);
        const r = Math.floor(m / width);
        const c = m % width;
        
        if (matrix[r][c] === target) {
            return true;
        }
        
        if (matrix[r][c] < target) {
            i = m + 1;
        } else {
            j = m - 1;
        }
    }
    
    return false;
}

//////////////////////////////////////////////////////////////////////////////
// Double Binary Search
// Time: O(log(mn))  Space: O(1)
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    
    let row = -1;
    let i = 0;
    let j = matrix.length - 1;
    
    while (i <= j) {
        let m = Math.floor((i + j) / 2);
        if (target < matrix[m][0]) {
            j = m - 1;
        } else if (target === matrix[m][0] || target === top(matrix[m])) {
            return true;
        } else if (target < top(matrix[m])) {
            row = m;
            break;
        } else {
            i = m + 1;
        }
    }
    
    if (row < 0) {
        return false;
    }
    
    const vals = matrix[row];
    i = 1;
    j = vals.length - 2;
    
    while (i <= j) {
        let m = Math.floor((i + j) / 2);
        if (target < vals[m]) {
            j = m - 1;
        } else if (target > vals[m]) {
            i = m + 1;
        } else {
            return true;
        }
    }
    return false;
}

/**
 * @param {!Array<*>} arr
 * @return {*}
 */
function top(arr) {
    return arr[arr.length - 1];
}
