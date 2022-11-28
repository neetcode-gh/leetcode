// problem link https://leetcode.com/problems/maximum-number-of-balloons
// time complexity O(n)

var maxNumberOfBalloons = function(text) {

    const  balloonCach = {};
    const ballonSet = new Set();
    for(let i = 0; i < text.length; i++) {
        ballonSet.add(text[i]);
    }

    for(let i = 0; i < text.length; i++) {
        if(ballonSet.has(text[i])) {
            if(balloonCach[text[i]]) {
                balloonCach[text[i]] += 1;
            } else {
                balloonCach[text[i]] =  1;
            }
        }
    }

    let min = Math.min(balloonCach['b'], 
                        balloonCach['a'], 
                        balloonCach['n'], 
                        Math.floor(balloonCach['l']/2), 
                        Math.floor(balloonCach['o']/2));
    
    return min ? min : 0;
};
