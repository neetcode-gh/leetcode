/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    var table = Array(amount + 1).fill(0);
    table[0] = 1;
    for (var coin of coins) {
        for (var i = 0; i < table.length; i++) {
            if (coin <= i) {
                table[i] += table[i - coin];
            }
        }
    }
    
    return table[amount];
};
