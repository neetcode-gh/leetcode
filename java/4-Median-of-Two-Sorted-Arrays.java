class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] fnl=new int[nums1.length+nums2.length];
        int i=0,j=0,k=0;
        while(i<nums1.length && j<nums2.length){
            if(nums1[i]<nums2[j]){
                fnl[k]=nums1[i];
                k++;
                i++;
            }else{
                fnl[k]=nums2[j];
                k++;
                j++;
            }
        }
        while(i<nums1.length){
            fnl[k]=nums1[i];
                k++;
                i++;
        }
        while(j<nums2.length){
            fnl[k]=nums2[j];
                k++;
                j++;
        }
        if(fnl.length%2==0){
            return (fnl[fnl.length/2]+fnl[(fnl.length/2)-1])/2.0;
        }else{
            return fnl[fnl.length/2]*1.0;
        }
    }
}
