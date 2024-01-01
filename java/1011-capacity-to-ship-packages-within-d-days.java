class Solution {
    public boolean canShip(int cap, int days, int[] weights){
        int ships=1, currCap=cap;
        for(int w: weights){
            if(currCap - w < 0){
                ships += 1;
                currCap = cap;
            }
            currCap -= w;
        }
        return ships <= days;
    }
    public int shipWithinDays(int[] weights, int days) {
        int l=0, r=0;

        for(int w: weights){
            l = Math.max(l, w);
            r += w;
        }
        //We can improve lower bound by taking max of the average capacity and max weight
        l = Math.max(l,r/days);

        int res = r;

        while(l <= r){
            int cap = (l+r)/2;
            if(canShip(cap, days, weights)){
                res = Math.min(res, cap);
                r = cap-1;
            }else{
                l = cap+1;
            }
        }
        return res;
    }
}
