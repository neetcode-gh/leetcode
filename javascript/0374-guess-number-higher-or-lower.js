var guessNumber = function(n) {
    let low = 1;
    let high = n;
    
    while(true) {
        let mid = low + Math.floor((high - low)/2);
        let myGuess = guess(mid);
        if(myGuess == 1)
            low = mid + 1;
        else if(myGuess == -1)
            high = mid - 1;
        else
            return mid;
    }
};
