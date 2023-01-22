// Time Complexity: O(n * m)
// Space Complexity: O(n * m)

class Solution {
  List<List<String>> groupAnagrams(List<String> strs) {
    var map = Map<String, List<String>>();
    
    for (var str in strs) {
      var count = List.filled(26, 0);
      for (int i = 0; i < str.length; i++) {
        count[str[i].codeUnitAt(0) - 'a'.codeUnitAt(0)]++;
      }
      var key = count.join("#");
      if (map.containsKey(key)) {
        map[key]!.add(str);
        continue;
      }
      map[key] = [str];
    }

    return List.from(map.values);
  }
}
