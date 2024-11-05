class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l =0;
        int r = arr.length -k;
        List<Integer> result = new ArrayList<>();
        while( l < r){
            int m = (l+r) /2;
            if(x - arr[m] > arr[m+k] -x ){ //right is closer
                l = m+1;
            }else{ //left is closer
                r =m;
            }
        }
        for(int i =l; i < l+k; i++){ //build the solution list
            result.add(arr[i]);
        }
        return result;
    }
}