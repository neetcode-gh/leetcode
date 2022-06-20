package leetcode;
//https://leetcode.com/problems/sqrtx/
public class sqrt {
    public static void main(String[] args) {
        int x = 22;
        System.out.println(root(x));
    }
     public static int root(int x){
        if(x<2){
            return x;
        }
        int start = 1;
        int end = x/2;
        while (start<=end){
            int mid = start + (end - start)/2;
            if(mid > x/mid){
                end = mid-1;
            }
            else if(mid < x/mid){
                start = mid + 1;
            }else {
                return mid;
            }
        }
            return end;
     }
}
