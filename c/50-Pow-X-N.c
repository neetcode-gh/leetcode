double calc(double x, int n) {
    long exponent = abs(n);
    
    if (x == 0.0) 
        return 0.0;
    if (n == 0) 
        return 1.0;
    
    double res = calc(x, n/2);
    res = res * res;
    
    if (n%2 == 0) 
        return res;
    else
        return x * res;
}

double myPow(double x, int n){
    double res = calc(x, n);
    
    if (n >= 0) 
        return res;
    else 
        return 1.0 / res;
}