/*
I pick a number from 1 to n. You have to guess which number I picked.

Space: O(1)
Time: O(log(n))
*/

long guess_bis(long min, long max){
    long m = (max+min)/2;
    int tmp = guess(m);
    if (tmp==0)
        return m;
    else if (tmp<0)
        return guess_bis(min,m-1);
    else
        return guess_bis(m+1,max);    
}

long guessNumber(long n){
	return guess_bis(0,n);
}
