/*
An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
Given an integer n, return true if n is an ugly number.
*/

bool isUgly(int n){
    if (n<=0)
        return false;
    if (n==1)
        return true;
    if (n%3==0)
        return isUgly(n/3);
    if (n%2==0)
        return isUgly(n/2);
    if (n%5==0)
        return isUgly(n/5);
    return false;
}
