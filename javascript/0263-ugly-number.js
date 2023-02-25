var isUgly = function(n) {
    if(n <= 0)
        return false;
    
    for(const p of [2, 3, 5])
        while(n % p == 0)
            n = n / p;
    return n == 1;
};
