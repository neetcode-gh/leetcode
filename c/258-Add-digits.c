int addDigits(int num) {
    if (num < 0)
        return (0);
    if (num >= 0 && num <= 9)
        return (num);
    int result = 0;
    while (1) {
    int nb1 = num / 10;
    int nb2 = num % 10;
    result = nb1 + nb2;
    if (result < 10)
        return (result);
    else
        num = result;
    }
    return (result);
}
