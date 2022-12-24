bool isHappy(int n) {
    int slow = n;
    int fast = sumSquareDigits(n);
    
    while (slow != fast) {
        fast = sumSquareDigits(sumSquareDigits(fast));
        slow = sumSquareDigits(slow);
    }
    return fast == 1;
}

int sumSquareDigits(n) {
    int result = 0;
    while (n != 0) {
        int digit = n % 10;
        result += digit * digit;
        n /= 10;
    }
    return result;
}