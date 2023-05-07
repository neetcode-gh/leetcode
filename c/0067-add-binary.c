char *addBinary(const char *a, const char *b) {
    int maxLen = strlen(a) > strlen(b) ? strlen(a) : strlen(b);
    char *res = (char *)malloc((maxLen + 2) * sizeof(char));
    memset(res, 0, (maxLen + 2) * sizeof(char));
    unsigned int carry = 0;

    for(int i = 0; i < maxLen; i++) {
        unsigned int bitA = i < strlen(a) ? a[strlen(a) - i - 1] - '0' : 0;
        unsigned int bitB = i < strlen(b) ? b[strlen(b) - i - 1] - '0' : 0;

        unsigned int total = bitA + bitB + carry;
        char sum = '0' + total % 2;
        carry = total / 2;

        // Add to the beginning of the string
        memmove(res + 1, res, strlen(res));
        res[0] = sum;
    }
    if(carry) {
        memmove(res + 1, res, strlen(res));
        res[0] = '1';
    }
    return res;
}
