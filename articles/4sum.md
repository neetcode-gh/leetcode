## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Two Pointers Technique** - Using two pointers moving inward on a sorted array to find pairs with a target sum
- **Sorting** - The two-pointer approach requires the array to be sorted first
- **Handling Duplicates** - Skipping duplicate elements to avoid producing duplicate results
- **Two Sum and Three Sum Problems** - 4Sum builds directly on the patterns from these simpler problems

---

## 1. Brute Force

### Intuition

The simplest approach is to try all possible combinations of four distinct elements and check if their sum equals the target. To avoid duplicate quadruplets, we first sort the array and use a set to store unique results. While this guarantees correctness, checking every combination of four elements is extremely slow for larger inputs.

### Algorithm

1. Sort the array.
2. Use four nested loops to iterate through all combinations of indices `a < b < c < d`.
3. For each combination, check if `nums[a] + nums[b] + nums[c] + nums[d] == target`.
4. If true, add the quadruplet to a set (to handle duplicates automatically).
5. Convert the set to a list and return.

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        res = set()

        for a in range(n):
            for b in range(a + 1, n):
                for c in range(b + 1, n):
                    for d in range(c + 1, n):
                        if nums[a] + nums[b] + nums[c] + nums[d] == target:
                            res.add((nums[a], nums[b], nums[c], nums[d]))
        return list(res)
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        int n = nums.length;
        Arrays.sort(nums);
        Set<List<Integer>> res = new HashSet<>();

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + 0L + nums[c] + nums[d] == target) {
                            res.add(Arrays.asList(nums[a], nums[b], nums[c], nums[d]));
                        }
                    }
                }
            }
        }

        return new ArrayList<>(res);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        set<vector<int>> res;

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + 0LL + nums[c] + nums[d] == target) {
                            res.insert({nums[a], nums[b], nums[c], nums[d]});
                        }
                    }
                }
            }
        }

        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        let n = nums.length;
        nums.sort((a, b) => a - b);
        let res = new Set();

        for (let a = 0; a < n; a++) {
            for (let b = a + 1; b < n; b++) {
                for (let c = b + 1; c < n; c++) {
                    for (let d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
                            res.add(
                                JSON.stringify([
                                    nums[a],
                                    nums[b],
                                    nums[c],
                                    nums[d],
                                ]),
                            );
                        }
                    }
                }
            }
        }

        return Array.from(res).map(JSON.parse);
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        int n = nums.Length;
        Array.Sort(nums);
        HashSet<(int, int, int, int)> res = new HashSet<(int, int, int, int)>();

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        long sum = (long)nums[a] + nums[b] + nums[c] + nums[d];
                        if (sum == target) {
                            res.Add((nums[a], nums[b], nums[c], nums[d]));
                        }
                    }
                }
            }
        }

        var result = new List<List<int>>();
        foreach (var quad in res) {
            result.Add(new List<int> { quad.Item1, quad.Item2, quad.Item3, quad.Item4 });
        }
        return result;
    }
}
```

```go
func fourSum(nums []int, target int) [][]int {
    n := len(nums)
    sort.Ints(nums)
    res := make(map[[4]int]bool)

    for a := 0; a < n; a++ {
        for b := a + 1; b < n; b++ {
            for c := b + 1; c < n; c++ {
                for d := c + 1; d < n; d++ {
                    if nums[a]+nums[b]+nums[c]+nums[d] == target {
                        res[[4]int{nums[a], nums[b], nums[c], nums[d]}] = true
                    }
                }
            }
        }
    }

    result := [][]int{}
    for quad := range res {
        result = append(result, []int{quad[0], quad[1], quad[2], quad[3]})
    }
    return result
}
```

```kotlin
class Solution {
    fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
        val n = nums.size
        nums.sort()
        val res = mutableSetOf<List<Int>>()

        for (a in 0 until n) {
            for (b in a + 1 until n) {
                for (c in b + 1 until n) {
                    for (d in c + 1 until n) {
                        val sum = nums[a].toLong() + nums[b] + nums[c] + nums[d]
                        if (sum == target.toLong()) {
                            res.add(listOf(nums[a], nums[b], nums[c], nums[d]))
                        }
                    }
                }
            }
        }

        return res.toList()
    }
}
```

```swift
class Solution {
    func fourSum(_ nums: [Int], _ target: Int) -> [[Int]] {
        let n = nums.count
        let nums = nums.sorted()
        var res = Set<[Int]>()

        for a in 0..<n {
            for b in (a + 1)..<n {
                for c in (b + 1)..<n {
                    for d in (c + 1)..<n {
                        if nums[a] + nums[b] + nums[c] + nums[d] == target {
                            res.insert([nums[a], nums[b], nums[c], nums[d]])
                        }
                    }
                }
            }
        }

        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(m)$

> Where $n$ is the size of the array $nums$ and $m$ is the number of quadruplets.

---

## 2. Hash Map

### Intuition

We can reduce one loop by using a hash map. After sorting, we fix the first three elements with nested loops and use the hash map to check if the fourth element exists. The hash map stores the count of each number, and we decrement counts as we iterate to avoid using the same element twice. This reduces complexity from O(n^4) to O(n^3) while still handling duplicates by skipping consecutive equal elements.

### Algorithm

1. Sort the array and build a frequency map of all elements.
2. For each index `i`, decrement its count and skip duplicates.
3. For each index `j > i`, decrement its count and skip duplicates.
4. For each index `k > j`, decrement its count and skip duplicates.
5. Calculate `fourth = target - nums[i] - nums[j] - nums[k]`.
6. If `fourth` exists in the map with count > 0, add the quadruplet.
7. Restore counts after processing each loop level.

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        count = defaultdict(int)
        for num in nums:
            count[num] += 1

        res = []
        for i in range(len(nums)):
            count[nums[i]] -= 1
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            for j in range(i + 1, len(nums)):
                count[nums[j]] -= 1
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue

                for k in range(j + 1, len(nums)):
                    count[nums[k]] -= 1
                    if k > j + 1 and nums[k] == nums[k - 1]:
                        continue

                    fourth = target - (nums[i] + nums[j] + nums[k])
                    if count[fourth] > 0:
                        res.append([nums[i], nums[j], nums[k], fourth])

                for k in range(j + 1, len(nums)):
                    count[nums[k]] += 1

            for j in range(i + 1, len(nums)):
                count[nums[j]] += 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            count.put(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.length; j++) {
                count.put(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.length; k++) {
                    count.put(nums[k], count.get(nums[k]) - 1);
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long fourth = target - (nums[i] + nums[j] + 0L + nums[k]);
                    if (fourth > Integer.MAX_VALUE || fourth < Integer.MIN_VALUE) {
                        continue;
                    }
                    if (count.getOrDefault((int) fourth, 0) > 0) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[k], (int) fourth));
                    }
                }

                for (int k = j + 1; k < nums.length; k++) {
                    count.put(nums[k], count.get(nums[k]) + 1);
                }
            }

            for (int j = i + 1; j < nums.length; j++) {
                count.put(nums[j], count.get(nums[j]) + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }
        vector<vector<int>> res;

        for (int i = 0; i < nums.size(); i++) {
            count[nums[i]]--;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.size(); j++) {
                count[nums[j]]--;
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.size(); k++) {
                    count[nums[k]]--;
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long long fourth = target - (nums[i] + nums[j] + 0LL + nums[k]);
                    if (fourth < INT_MIN || fourth > INT_MAX) continue;
                    if (count[fourth] > 0) {
                        res.push_back({nums[i], nums[j], nums[k], int(fourth)});
                    }
                }

                for (int k = j + 1; k < nums.size(); k++) {
                    count[nums[k]]++;
                }
            }

            for (int j = i + 1; j < nums.size(); j++) {
                count[nums[j]]++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            count.set(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) - 1);
                    if (k > j + 1 && nums[k] === nums[k - 1]) continue;

                    const fourth = target - (nums[i] + nums[j] + nums[k]);
                    if ((count.get(fourth) || 0) > 0) {
                        res.push([nums[i], nums[j], nums[k], fourth]);
                    }
                }

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) + 1);
                }
            }

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) + 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        Dictionary<int, int> count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        List<List<int>> res = new List<List<int>>();

        for (int i = 0; i < nums.Length; i++) {
            count[nums[i]]--;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.Length; j++) {
                count[nums[j]]--;
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.Length; k++) {
                    count[nums[k]]--;
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long fourth = (long)target - (long)nums[i] - (long)nums[j] - (long)nums[k];
                    if (fourth > int.MaxValue || fourth < int.MinValue) {
                        continue;
                    }

                    if (count.ContainsKey((int)fourth) && count[(int)fourth] > 0) {
                        res.Add(new List<int> { nums[i], nums[j], nums[k], (int)fourth });
                    }
                }

                for (int k = j + 1; k < nums.Length; k++) {
                    count[nums[k]]++;
                }
            }

            for (int j = i + 1; j < nums.Length; j++) {
                count[nums[j]]++;
            }
        }

        return res;
    }
}
```

```go
func fourSum(nums []int, target int) [][]int {
    sort.Ints(nums)
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }
    res := [][]int{}

    for i := 0; i < len(nums); i++ {
        count[nums[i]]--
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }

        for j := i + 1; j < len(nums); j++ {
            count[nums[j]]--
            if j > i+1 && nums[j] == nums[j-1] {
                continue
            }

            for k := j + 1; k < len(nums); k++ {
                count[nums[k]]--
                if k > j+1 && nums[k] == nums[k-1] {
                    continue
                }

                fourth := target - nums[i] - nums[j] - nums[k]
                if count[fourth] > 0 {
                    res = append(res, []int{nums[i], nums[j], nums[k], fourth})
                }
            }

            for k := j + 1; k < len(nums); k++ {
                count[nums[k]]++
            }
        }

        for j := i + 1; j < len(nums); j++ {
            count[nums[j]]++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
        nums.sort()
        val count = mutableMapOf<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }
        val res = mutableListOf<List<Int>>()

        for (i in nums.indices) {
            count[nums[i]] = count[nums[i]]!! - 1
            if (i > 0 && nums[i] == nums[i - 1]) continue

            for (j in i + 1 until nums.size) {
                count[nums[j]] = count[nums[j]]!! - 1
                if (j > i + 1 && nums[j] == nums[j - 1]) continue

                for (k in j + 1 until nums.size) {
                    count[nums[k]] = count[nums[k]]!! - 1
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue

                    val fourth = target.toLong() - nums[i] - nums[j] - nums[k]
                    if (fourth in Int.MIN_VALUE.toLong()..Int.MAX_VALUE.toLong()) {
                        if (count.getOrDefault(fourth.toInt(), 0) > 0) {
                            res.add(listOf(nums[i], nums[j], nums[k], fourth.toInt()))
                        }
                    }
                }

                for (k in j + 1 until nums.size) {
                    count[nums[k]] = count[nums[k]]!! + 1
                }
            }

            for (j in i + 1 until nums.size) {
                count[nums[j]] = count[nums[j]]!! + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func fourSum(_ nums: [Int], _ target: Int) -> [[Int]] {
        var nums = nums.sorted()
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }
        var res = [[Int]]()

        for i in 0..<nums.count {
            count[nums[i]]! -= 1
            if i > 0 && nums[i] == nums[i - 1] { continue }

            for j in (i + 1)..<nums.count {
                count[nums[j]]! -= 1
                if j > i + 1 && nums[j] == nums[j - 1] { continue }

                for k in (j + 1)..<nums.count {
                    count[nums[k]]! -= 1
                    if k > j + 1 && nums[k] == nums[k - 1] { continue }

                    let fourth = target - nums[i] - nums[j] - nums[k]
                    if let cnt = count[fourth], cnt > 0 {
                        res.append([nums[i], nums[j], nums[k], fourth])
                    }
                }

                for k in (j + 1)..<nums.count {
                    count[nums[k]]! += 1
                }
            }

            for j in (i + 1)..<nums.count {
                count[nums[j]]! += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(n)$ space for the hash map.
    - $O(m)$ space for the output array.

> Where $n$ is the size of the array $nums$ and $m$ is the number of quadruplets.

---

## 3. Two Pointers

### Intuition

The two-pointer technique from 2Sum and 3Sum extends naturally to 4Sum. After sorting, we fix the first two elements with nested loops, then use two pointers to find pairs that complete the target sum. The left pointer starts just after the second fixed element, and the right pointer starts at the end. We move them inward based on whether the current sum is too small or too large. Skipping duplicates at each level ensures unique quadruplets.

### Algorithm

1. Sort the array.
2. Iterate `i` from 0 to `n`, skipping duplicates.
3. For each `i`, iterate `j` from `i + 1` to `n`, skipping duplicates.
4. Use two pointers: `left = j + 1` and `right = n - 1`.
5. While `left < right`:
   - If sum equals target, add quadruplet and move both pointers while skipping duplicates.
   - If sum is less than target, increment `left`.
   - If sum is greater than target, decrement `right`.
6. Return the result list.

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        res = []

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                left, right = j + 1, n - 1
                while left < right:
                    total = nums[i] + nums[j] + nums[left] + nums[right]
                    if total == target:
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        left += 1
                        right -= 1
                        while left < right and nums[left] == nums[left - 1]:
                            left += 1
                        while left < right and nums[right] == nums[right + 1]:
                            right -= 1
                    elif total < target:
                        left += 1
                    else:
                        right -= 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> res;
        int n = nums.size();
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long sum = (long long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[left], nums[right]});
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                let left = j + 1,
                    right = n - 1;
                while (left < right) {
                    const sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum === target) {
                        res.push([nums[i], nums[j], nums[left], nums[right]]);
                        left++;
                        right--;
                        while (left < right && nums[left] === nums[left - 1])
                            left++;
                        while (left < right && nums[right] === nums[right + 1])
                            right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        List<List<int>> res = new List<List<int>>();
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.Add(new List<int> { nums[i], nums[j], nums[left], nums[right] });
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func fourSum(nums []int, target int) [][]int {
    sort.Ints(nums)
    res := [][]int{}
    n := len(nums)

    for i := 0; i < n; i++ {
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }

        for j := i + 1; j < n; j++ {
            if j > i+1 && nums[j] == nums[j-1] {
                continue
            }

            left, right := j+1, n-1
            for left < right {
                sum := nums[i] + nums[j] + nums[left] + nums[right]
                if sum == target {
                    res = append(res, []int{nums[i], nums[j], nums[left], nums[right]})
                    left++
                    right--
                    for left < right && nums[left] == nums[left-1] {
                        left++
                    }
                    for left < right && nums[right] == nums[right+1] {
                        right--
                    }
                } else if sum < target {
                    left++
                } else {
                    right--
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
        nums.sort()
        val res = mutableListOf<List<Int>>()
        val n = nums.size

        for (i in 0 until n) {
            if (i > 0 && nums[i] == nums[i - 1]) continue

            for (j in i + 1 until n) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue

                var left = j + 1
                var right = n - 1
                while (left < right) {
                    val sum = nums[i].toLong() + nums[j] + nums[left] + nums[right]
                    when {
                        sum == target.toLong() -> {
                            res.add(listOf(nums[i], nums[j], nums[left], nums[right]))
                            left++
                            right--
                            while (left < right && nums[left] == nums[left - 1]) left++
                            while (left < right && nums[right] == nums[right + 1]) right--
                        }
                        sum < target -> left++
                        else -> right--
                    }
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func fourSum(_ nums: [Int], _ target: Int) -> [[Int]] {
        let nums = nums.sorted()
        var res = [[Int]]()
        let n = nums.count

        for i in 0..<n {
            if i > 0 && nums[i] == nums[i - 1] { continue }

            for j in (i + 1)..<n {
                if j > i + 1 && nums[j] == nums[j - 1] { continue }

                var left = j + 1
                var right = n - 1
                while left < right {
                    let sum = nums[i] + nums[j] + nums[left] + nums[right]
                    if sum == target {
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        left += 1
                        right -= 1
                        while left < right && nums[left] == nums[left - 1] { left += 1 }
                        while left < right && nums[right] == nums[right + 1] { right -= 1 }
                    } else if sum < target {
                        left += 1
                    } else {
                        right -= 1
                    }
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(m)$ space for the output array.

---

## 4. K-Sum + Two Pointers

### Intuition

We can generalize the approach to solve K-Sum for any K using recursion. The idea is to reduce the problem: for K > 2, we fix one element and recursively solve (K-1)-Sum. When K reaches 2, we use the two-pointer technique as the base case. This approach is flexible and can handle any value of K without changing the core logic.

### Algorithm

1. Sort the array.
2. Define a recursive function `kSum(k, start, target)`:
   - Base case (`k == 2`): Use two pointers from `start` to find pairs summing to target.
   - Recursive case: For each element at index `i` from `start`, recursively call `kSum(k - 1, i + 1, target - nums[i])`.
   - Skip duplicates at each recursion level.
   - Track the current partial solution in a list, adding/removing elements as we recurse.
3. Call `kSum(4, 0, target)` and return the collected results.

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        res, quad = [], []

        def kSum(k, start, target):
            if k == 2:
                l, r = start, len(nums) - 1
                while l < r:
                    if nums[l] + nums[r] < target:
                        l += 1
                    elif nums[l] + nums[r] > target:
                        r -= 1
                    else:
                        res.append(quad + [nums[l], nums[r]])
                        l += 1
                        r -= 1
                        while l < r and nums[l] == nums[l - 1]:
                            l += 1
                        while l < r and nums[r] == nums[r + 1]:
                            r -= 1
                return

            for i in range(start, len(nums) - k + 1):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                quad.append(nums[i])
                kSum(k - 1, i + 1, target - nums[i])
                quad.pop()

        kSum(4, 0, target)
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;
    private List<Integer> quad;

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        res = new ArrayList<>();
        quad = new ArrayList<>();
        kSum(nums, 4, 0, target);
        return res;
    }

    private void kSum(int[] nums, int k, int start, long target) {
        if (k == 2) {
            int l = start, r = nums.length - 1;
            while (l < r) {
                long sum = nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    res.add(new ArrayList<>(quad));
                    res.get(res.size() - 1).add(nums[l]);
                    res.get(res.size() - 1).add(nums[r]);
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.length - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.add(nums[i]);
            kSum(nums, k - 1, i + 1, target - nums[i]);
            quad.remove(quad.size() - 1);
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
    vector<int> quad;

public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        if (nums.size() < 4) return {};
        sort(nums.begin(), nums.end());
        kSum(nums, 4, 0, (long long) target);
        return res;
    }

private:
    void kSum(vector<int>& nums, int k, int start, long long target) {
        if (k == 2) {
            int l = start, r = nums.size() - 1;
            while (l < r) {
                long long sum = (long long) nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    quad.push_back(nums[l]);
                    quad.push_back(nums[r]);
                    res.push_back(quad);
                    quad.pop_back();
                    quad.pop_back();
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.size() - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.push_back(nums[i]);
            kSum(nums, k - 1, i + 1, target - nums[i]);
            quad.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const quad = [];

        const kSum = (k, start, target) => {
            if (k === 2) {
                let l = start,
                    r = nums.length - 1;
                while (l < r) {
                    const sum = nums[l] + nums[r];
                    if (sum < target) {
                        l++;
                    } else if (sum > target) {
                        r--;
                    } else {
                        res.push([...quad, nums[l], nums[r]]);
                        l++;
                        r--;
                        while (l < r && nums[l] === nums[l - 1]) l++;
                        while (l < r && nums[r] === nums[r + 1]) r--;
                    }
                }
                return;
            }

            for (let i = start; i < nums.length - k + 1; i++) {
                if (i > start && nums[i] === nums[i - 1]) continue;
                quad.push(nums[i]);
                kSum(k - 1, i + 1, target - nums[i]);
                quad.pop();
            }
        };

        kSum(4, 0, target);
        return res;
    }
}
```

```csharp
public class Solution {
    private List<List<int>> res;
    private List<int> quad;

    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        res = new List<List<int>>();
        quad = new List<int>();
        KSum(nums, 4, 0, target);
        return res;
    }

    private void KSum(int[] nums, int k, int start, long target) {
        if (k == 2) {
            int l = start, r = nums.Length - 1;
            while (l < r) {
                long sum = (long)nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    List<int> newQuad = new List<int>(quad);
                    newQuad.Add(nums[l]);
                    newQuad.Add(nums[r]);
                    res.Add(newQuad);
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.Length - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.Add(nums[i]);
            KSum(nums, k - 1, i + 1, target - nums[i]);
            quad.RemoveAt(quad.Count - 1);
        }
    }
}
```

```go
func fourSum(nums []int, target int) [][]int {
    sort.Ints(nums)
    res := [][]int{}
    quad := []int{}

    var kSum func(k, start, target int)
    kSum = func(k, start, target int) {
        if k == 2 {
            l, r := start, len(nums)-1
            for l < r {
                sum := nums[l] + nums[r]
                if sum < target {
                    l++
                } else if sum > target {
                    r--
                } else {
                    temp := make([]int, len(quad))
                    copy(temp, quad)
                    temp = append(temp, nums[l], nums[r])
                    res = append(res, temp)
                    l++
                    r--
                    for l < r && nums[l] == nums[l-1] {
                        l++
                    }
                    for l < r && nums[r] == nums[r+1] {
                        r--
                    }
                }
            }
            return
        }

        for i := start; i <= len(nums)-k; i++ {
            if i > start && nums[i] == nums[i-1] {
                continue
            }
            quad = append(quad, nums[i])
            kSum(k-1, i+1, target-nums[i])
            quad = quad[:len(quad)-1]
        }
    }

    kSum(4, 0, target)
    return res
}
```

```kotlin
class Solution {
    private val res = mutableListOf<List<Int>>()
    private val quad = mutableListOf<Int>()

    fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
        nums.sort()
        res.clear()
        quad.clear()
        kSum(nums, 4, 0, target.toLong())
        return res
    }

    private fun kSum(nums: IntArray, k: Int, start: Int, target: Long) {
        if (k == 2) {
            var l = start
            var r = nums.size - 1
            while (l < r) {
                val sum = nums[l].toLong() + nums[r]
                when {
                    sum < target -> l++
                    sum > target -> r--
                    else -> {
                        res.add(quad.toMutableList().apply { add(nums[l]); add(nums[r]) })
                        l++
                        r--
                        while (l < r && nums[l] == nums[l - 1]) l++
                        while (l < r && nums[r] == nums[r + 1]) r--
                    }
                }
            }
            return
        }

        for (i in start..nums.size - k) {
            if (i > start && nums[i] == nums[i - 1]) continue
            quad.add(nums[i])
            kSum(nums, k - 1, i + 1, target - nums[i])
            quad.removeAt(quad.size - 1)
        }
    }
}
```

```swift
class Solution {
    private var res = [[Int]]()
    private var quad = [Int]()

    func fourSum(_ nums: [Int], _ target: Int) -> [[Int]] {
        let nums = nums.sorted()
        res = []
        quad = []
        kSum(nums, 4, 0, target)
        return res
    }

    private func kSum(_ nums: [Int], _ k: Int, _ start: Int, _ target: Int) {
        if k == 2 {
            var l = start
            var r = nums.count - 1
            while l < r {
                let sum = nums[l] + nums[r]
                if sum < target {
                    l += 1
                } else if sum > target {
                    r -= 1
                } else {
                    res.append(quad + [nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while l < r && nums[l] == nums[l - 1] { l += 1 }
                    while l < r && nums[r] == nums[r + 1] { r -= 1 }
                }
            }
            return
        }

        for i in start...(nums.count - k) {
            if i > start && nums[i] == nums[i - 1] { continue }
            quad.append(nums[i])
            kSum(nums, k - 1, i + 1, target - nums[i])
            quad.removeLast()
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(m)$ space for the output array.

---

## Common Pitfalls

### Integer Overflow
When summing four integers, the result can exceed the 32-bit integer range. Always use a 64-bit type (like `long` in Java/C++) for the sum calculation to avoid overflow.
```java
// Wrong: may overflow
int sum = nums[i] + nums[j] + nums[left] + nums[right];
// Correct: use long to prevent overflow
long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];
```

### Incorrect Duplicate Skipping
When skipping duplicates, you must check against the previous element, not the next one. Also, the skip should only happen after processing the first occurrence, not before.
```python
# Wrong: skips before processing first occurrence
if i > 0 and nums[i] == nums[i - 1]:  # This is correct for outer loops
# Wrong for two-pointer: checking next instead of previous
while left < right and nums[left] == nums[left + 1]:
# Correct: skip after finding a match, check previous
while left < right and nums[left] == nums[left - 1]:
```

### Forgetting to Sort the Array
The two-pointer technique only works on a sorted array. Forgetting to sort first will cause the algorithm to miss valid quadruplets or produce incorrect results.