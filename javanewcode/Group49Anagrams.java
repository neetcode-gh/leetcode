package leetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Group49Anagrams {
    public static void main(String[] args) {
       String[] strs = {"eat","tea","tan","ate","nat","bat"};
        System.out.println(groupAnagrams(strs));
    }
      public static List<List<String>> groupAnagrams(String[] strgs){
           List<List<String>> result = new ArrayList<>();
          HashMap<String,List<String>> map = new HashMap<>();

          for(String curr : strgs){
              char[] characters = curr.toCharArray();
              Arrays.sort(characters);

              String sorted = new String(characters);
              if(!map.containsKey(sorted)){
                  map.put(sorted,new ArrayList<>());
              }
              map.get(sorted).add(curr);
          }

          result.addAll(map.values());
          return result;



      }
}
