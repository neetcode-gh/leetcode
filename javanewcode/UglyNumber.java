package leetcode;

public class UglyNumber {
    public static void main(String[] args) {
        int num = 6;
        System.out.println(ugly(num));
    }
    public static boolean ugly(int num){
        if(num==0) return false;
        while (num!=1){
            if(num%2==0) num/=2;
            else if (num%3==0) num = num / 3;
            else if (num%5==0) num/=5;
            else return false;
        }
         return true;
    }
}
