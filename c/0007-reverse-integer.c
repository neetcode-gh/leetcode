int reverse(int x){
    int res = 0;

    while (x) {
        int digit = x % 10;
        if ((res > INT_MAX / 10) || 
        (res < INT_MIN / 10) || 
        (res == INT_MAX / 10 && digit > INT_MAX  % 10) || 
        (res == INT_MIN && digit > INT_MIN % 10)) {
            return 0;
        } else {
            res *= 10;
        }
        res += digit;

        x = x / 10;
    }

    return res;
}