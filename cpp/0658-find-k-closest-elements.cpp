// Approach: Binary Search + Two‑Pointer Window Expansion (More Intuitive)
// Runtime: 0 ms (100%);  Memory: 35.7 MB (99%)
// Time Complexity: O(log(n) + k), Space Complexity: O(1)

class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {

        // Part 1: Binary Sarch to find x or element in arr closest to x
        int l=0;
        int r = arr.size()-1;
        int closestVal = arr[0];
        int closestIndex = 0;

        while(l<=r){
            int m = (l+r)/2;
            int currDiff = abs(arr[m] - x);
            int resDiff = abs(closestVal - x);

            if((currDiff< resDiff) || (currDiff == resDiff && arr[m]<closestVal)){
                closestVal = arr[m];
                closestIndex = m;
            }

            if (arr[m]<x){
                l=m+1;
            }
            else if(arr[m]>x){
                r= m-1;
            }
            else{
                break;
            }

        }

        //Part 2: Binary Search to find the window of k such elements
        l=closestIndex;
        r=closestIndex;

        for( int i=0; i<k-1;i++){ 
            if(l==0){
                r+=1;
            }
            else if(r== arr.size()-1 ){
                l-=1;
            }
            else if (x - arr[l - 1] <= arr[r + 1] - x){
                l-=1;
            }
            else{
                r+=1;

            }
                
            
        }
        return vector<int>(arr.begin() + l, arr.begin() + r + 1);

    }
};