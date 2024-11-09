class Solution {

    public int maximumRemovals(String s, String p, int[] removable) {
        int left =0;
        int right = removable.length -1;
        int result =0;
        while(left <= right){
            HashSet<Integer> removed = new HashSet<>();
            int mid = (left+right)/2;
            for(int i =0; i <= mid; i++){ // populate the hashset
                removed.add(removable[i]);
            }
            if(isSubseq(s,p,removed)){
                result = Math.max(result,mid+1);
                left = mid+1; // greedy try to find even a higher value
            }else{
                right = mid -1;
            }
        }
        return result;
    }

    private boolean isSubseq(String s , String subseq,HashSet<Integer> removed){
        int i1 =0;
        int i2 =0;
        while(i1 < s.length() && i2 < subseq.length()){
            if( s.charAt(i1) != subseq.charAt(i2) || removed.contains(i1) ){
                i1++;
            }else{
                i1++;
                i2++;
            }
        }
        return i2 == subseq.length();
    }
}