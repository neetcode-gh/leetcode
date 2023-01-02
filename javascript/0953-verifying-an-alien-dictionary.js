var isAlienSorted = function(words, order) {
    // first differing char
    // if word A is prefix of word B, word B must be AFTER word A
    orderInd = new Map(); {
        let ind = 0;
        for(const c of order)
            orderInd.set(c, ind++);
    }
    
    for(let i = 0; i < words.length - 1; i++) {
        let w1 = words[i], w2 = words[i + 1];
        
        for(let j = 0; j < w1.length; j++) {
            if(j == w2.length)
                return false;
            
            if(w1.charAt(j) != w2.charAt(j))
                if(orderInd.get(w2.charAt(j)) < orderInd.get(w1.charAt(j)))
                    return false;
                else
                    break;
        }
    }
    return true;
};
