/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    if (hand.length % groupSize) {
        return false;
    }
    
    var count = {};
    for (var n in hand) {
        if (!count.hasOwnProperty(hand[n])) {
            count[hand[n]] = 0;
        }
        
        count[hand[n]]++;
    }
    
    var sortUniqHand = [...new Set(hand)].sort((a, b) => b - a);
    while(sortUniqHand.length > 0) {
        var first = sortUniqHand[sortUniqHand.length - 1];
        for (var i = first; i < first + groupSize; i++) {
            if (!count.hasOwnProperty(i)) {
                return false;
            }
            
            count[i]--;
            if (count[i] === 0) {
                if (i !== sortUniqHand[sortUniqHand.length - 1]) {
                    return false;
                }
                
                sortUniqHand.pop();
            }
        }
    }
    
    return true;
};
