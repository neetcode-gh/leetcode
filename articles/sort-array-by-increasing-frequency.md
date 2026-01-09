## 1. Custom Sort

### Intuition

We need to sort elements by how often they appear, with less frequent elements coming first. When two elements have the same frequency, the larger one should come first. A custom comparator lets us define this two-level sorting logic: primary sort by frequency (ascending), secondary sort by value (descending).

### Algorithm

1. Count the frequency of each number using a hash map.
2. Sort the array using a custom comparator that:
   - Compares by frequency first (lower frequency comes first).
   - If frequencies are equal, compares by `value` (larger `value` comes first).
3. Return the sorted array.

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

```csharp
public class Solution {
    public int[] FrequencySort(int[] nums) {
        var count = new Dictionary<int, int>();
        foreach (int n in nums) {
            if (!count.ContainsKey(n)) count[n] = 0;
            count[n]++;
        }

        return nums.OrderBy(n => count[n]).ThenByDescending(n => n).ToArray();
    }
}
```

```go
func frequencySort(nums []int) []int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    sort.Slice(nums, func(i, j int) bool {
        if count[nums[i]] != count[nums[j]] {
            return count[nums[i]] < count[nums[j]]
        }
        return nums[i] > nums[j]
    })

    return nums
}
```

```kotlin
class Solution {
    fun frequencySort(nums: IntArray): IntArray {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        return nums.sortedWith(compareBy({ count[it] }, { -it })).toIntArray()
    }
}
```

```swift
class Solution {
    func frequencySort(_ nums: [Int]) -> [Int] {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        return nums.sorted { a, b in
            if count[a]! != count[b]! {
                return count[a]! < count[b]!
            }
            return a > b
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
