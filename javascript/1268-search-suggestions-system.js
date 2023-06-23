/**
 * Binary Search
 * 
 * Time O(n*log(n) + m*n) | Space O(m)
 * https://leetcode.com/problems/search-suggestions-system/description/
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {

    products.sort((product1, product2) => {
        if(product1 < product2) {
            return -1;
        }
        if(product2 < product1) {
            return 1;
        }
        if(product1 === product2) {
            return 0;
        }
    });

    const result = [];
    let left = 0;
    let right = products.length - 1;
    for(let i = 0;  i < searchWord.length; i++) {
        let char = searchWord[i];
        
        while(left <= right && (products[left].length - 1 < i || products[left][i] !== char)) {
            left++;
        }
        while(left <= right && (products[right].length - 1 < i || products[right][i] !== char)) {
            right--;
        }

        const subResult = [];
        const len = Math.min(right - left + 1, 3);
        for(let j = 0; j < len; j++) {
            subResult.push(products[left+j]);
        }
        result.push(subResult);
    }

    return result;
};
