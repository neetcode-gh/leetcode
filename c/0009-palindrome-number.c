bool isPalindrome(int x){
    if (x < 0) {
        return false;
    }
    long div = 1;
    while (x >= 10 * div) {
        div *= 10;
    }

    while (x) {
        int right = x % 10;
        int left = x / div;

        if (left != right) {
            return false;
        }

        x = (x % div) / 10;
        div /= 100;
    }

    return true;
}