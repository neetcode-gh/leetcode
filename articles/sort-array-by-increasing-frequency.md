## 1. Custom Sort

::tabs-start

```python
class Solution:
    def frequencySort(self, nums: List[int]) -> List[int]:
        count = Counter(nums)
        nums.sort(key=lambda n: (count[n], -n))
        return nums
```

```java
public class Solution {
    public int[] frequencySort(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        Integer[] arr = Arrays.stream(nums).boxed().toArray(Integer[]::new);
        Arrays.sort(arr, (a, b) -> {
            int freqA = count.get(a), freqB = count.get(b);
            if (freqA != freqB) return Integer.compare(freqA, freqB);
            return Integer.compare(b, a);
        });

        return Arrays.stream(arr).mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> frequencySort(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        sort(nums.begin(), nums.end(), [&](int a, int b) {
            if (count[a] != count[b]) return count[a] < count[b];
            return a > b;
        });

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    frequencySort(nums) {
        const count = {};
        for (let num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        nums.sort((a, b) => {
            if (count[a] !== count[b]) return count[a] - count[b];
            return b - a;
        });

        return nums;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
