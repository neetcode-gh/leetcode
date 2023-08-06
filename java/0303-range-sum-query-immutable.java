class NumArray {

    public int[] arr;
    public NumArray(int[] nums) {
        arr=nums;
        for(int i=1;i<arr.length;i++){
            arr[i]+=arr[i-1];
        }
    }
    
    public int sumRange(int left, int right) {
        if(left==0){
            return arr[right];
        }
        return arr[right]-arr[left-1];
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * int param_1 = obj.sumRange(left,right);
 */
