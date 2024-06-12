class Solution {
  List<int> topKFrequent(List<int> nums, int k) {
    Map<int, int> map = {};
    for (int n in nums) {
      map[n] = (map[n] ?? 0) + 1;
    }
    List<int> uniqueNums = map.keys.toList();
    uniqueNums.sort((a, b) => map[b]!.compareTo(map[a]!));
    return uniqueNums.sublist(0, k);
  }
}
