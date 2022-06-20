package leetcode;

public class MajarityElement {
    public static void main(String[] args) {
       int [] arr = {3,3,4,2,4,4,2,4,4};

        System.out.println(majori(arr));

    }

    public static int majori(int[] arr){

           int count  = 0;
           int res = 0;
           for(int num: arr){
               if(count == 0 ){
                   res = num;
               }
               if(num != res){
                   count--;
               }else{
                   count++;
               }
           }
           return res;
                 }


}