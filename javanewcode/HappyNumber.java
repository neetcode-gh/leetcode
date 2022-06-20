package leetcode;

import java.util.HashSet;

public class HappyNumber {
    public static void main(String[] args) {
        int n = 19;
        System.out.println(happy(n));
    }
    public static boolean happy(int n){
        HashSet <Integer> map = new HashSet<>();
      while (n!=1){
          int curr = n;
          int sum = 0;
          while (curr !=0){
              sum += (curr % 10) * (curr % 10);
              curr /=10;
          }
            if(map.contains(sum)) return false;
            map.add(sum);
            n=sum;
      }
          return true;
    }
}
