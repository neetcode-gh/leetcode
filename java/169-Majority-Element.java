// Brute Force
// Time -> O(N*N)
// Space -> O(1)

class Solution1 {
    public int majorityElement(int[] arr) {
       int n = arr.length;        
       Arrays.sort(arr);
        
       for(int i=0; i<n; i++){
           if(i>0 && arr[i]==arr[i-1]) continue;    // skips same elements           
           int curr = arr[i];
           int count=0;
           for(int j=0; j<n; j++){
               if(curr==arr[j])
                   count++;               
           }
           if(count > n/2)
               return curr;
       }
        return 0;    
    }
}


// Voting algorithm
// Time -> O(N)
// Space -> O(1)

class Solution2 {
    public int majorityElement(int[] arr) {
        int n = arr.length;
        int ans = 0;
        int count=0;
        for(int val: arr){
            if(count == 0)  ans = val;
            if(val == ans)    count++;
            else    count--;                       
        }
        return ans;     
    }
}
