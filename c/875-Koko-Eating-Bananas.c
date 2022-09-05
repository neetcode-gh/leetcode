/*
    Given a array of bananas piles containing differing amounts of bananas and
    'h' hours to eat all of them.
    Determine the minimum speed (i.e. numberbananas per-hour) possible.

    Ex. piles = [3,6,7,11], h = 8 -> 4

    If all the bananas can be eaten with speed 'x' than the same holds true for 
    any speed more than 'x'. Similarly if bananas cannot be eated at speed 'y', 
    the same will be speeds less than 'y'. 
    
    Binary search can be performed on the possible values of speed till the 
    minimum speed is found with,
        left bound = ceil(total/h)
        right bound = maximum pile size

    Time: O(NlogM) where N is number of piles and M is maximum pile size
    Space: O(1)
*/

int hoursRequired(int* piles, int pilesSize, int h, int speed) {
    int hours = 0;
    for (int i = 0; i < pilesSize; ++i) {
        hours += (piles[i]+speed-1)/speed;
    }

    return hours;
}

long sumOfArray(int* piles, int pilesSize) {
    long total = 0l;
    
    for (int i = 0; i < pilesSize; ++i) {
        total += piles[i];
    }
    
    return total;
}

int maxElement(int* piles, int pilesSize) {
    int maxElem = piles[0];
    
    for (int i = 0; i < pilesSize; ++i) {
        maxElem = fmax(maxElem, piles[i]);
    }
    return maxElem;
}

int minEatingSpeed(int* piles, int pilesSize, int h){
    long total = sumOfArray(piles, pilesSize);
    
    int l = (total+h-1)/h;
    int r = maxElement(piles, pilesSize);
    
    while (l < r) {
        int mid = l + (r-l)/2;

        int hours = hoursRequired(piles, pilesSize, h, mid);
        if (hours <= h)
            r = mid;
        else if (hours > h)
            l = mid + 1;
    }

    return r;
}
