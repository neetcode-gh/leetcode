int reverse(int x) {
    long reversed_num = 0;
    while (x != 0) {
        reversed_num = reversed_num * 10 + x % 10;
        x /= 10;
    }
    
    if (reversed_num < INT_MIN || reversed_num > INT_MAX) 
        return 0;
    
    return reversed_num;
}