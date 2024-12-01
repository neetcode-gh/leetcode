class Solution {
  List<int> topKFrequent(List<int> nums, int k) {
    Map<int, int> frequencyMap = {};
    for (int num in nums) {
      frequencyMap[num] = (frequencyMap[num] ?? 0) + 1;
    }

    List<List<int>> frequencyList =
        List.filled(nums.length + 1, List<int>.empty(growable: true));

    frequencyMap.forEach((num, count) {
      frequencyList[count] = [...frequencyList[count], num];
    });

    List<int> res = [];

    for (var i = frequencyList.length - 1; i >= 0; i--) {
      res.addAll(frequencyList[i]);

      if (res.length == k) {
        break;
      }
    }

    return res;
  }
}

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
