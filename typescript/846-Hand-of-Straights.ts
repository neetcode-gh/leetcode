function isNStraightHand(hand: number[], groupSize: number): boolean {
    if (hand.length % groupSize) {
        return false;
    }
    
    let count = {};
    for (let n in hand) {
        if (!count.hasOwnProperty(hand[n])) {
            count[hand[n]] = 0;
        }
        
        count[hand[n]]++;
    }
    
    let sortUniqHand = [...new Set(hand)].sort((a, b) => b - a);
    while(sortUniqHand.length > 0) {
        let first = sortUniqHand[sortUniqHand.length - 1];
        for (let i = first; i < first + groupSize; i++) {
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