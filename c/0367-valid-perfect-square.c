bool isPerfectSquare(int num) {
    int low = 0;
    int high = num;
    
    while(low <= high){
        long long int mid = low + (high - low)/2;
        
        if(mid * mid == num)
            return true;
        
        if(mid * mid < num)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return false;
}