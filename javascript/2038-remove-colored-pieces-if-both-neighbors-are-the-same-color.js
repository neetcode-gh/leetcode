/**
 * Counting
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color
 * @param {string} colors
 * @return {boolean}
 */
var winnerOfGame = function(colors) {
    
    let aScore = 0;
    let bScore = 0;
    
    const canRemove = (index) => {
        if (colors[index] === colors[index - 1] && colors[index] === colors[index + 1]) return colors[index];
        return false;
    }
    
    for (let i = 1; i < colors.length; i++) {
        if (canRemove(i) === 'A') aScore++;
        if (canRemove(i) === 'B') bScore++;
    }

    return aScore - bScore > 0;
};
