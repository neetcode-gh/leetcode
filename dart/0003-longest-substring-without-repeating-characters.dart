class Solution {
  int lengthOfLongestSubstring(String s) {
    int max = 0;
    Map<String, int> map = {};

    List<String> list = s.split('');
    List<String> result = [];

    for (int i = 0; i < list.length; i++) {
      if (!result.contains(list[i])) {
        result.add(list[i]);
      } else {
        map.putIfAbsent(result.join(), () => result.length);
        while (result.contains(list[i])) {
          result.removeAt(0);
        }
        result.add(list[i]);
      }
    }

    map.putIfAbsent(result.join(), () => result.length);
    map.forEach((key, value) {
      max = max > value ? max : value;
    });
    return max;
  }
}