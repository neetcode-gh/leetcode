## 1. Brute Force

::tabs-start

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = set()
        nums.sort()
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                for k in range(j + 1, len(nums)):
                    if nums[i] + nums[j] + nums[k] == 0:
                        tmp = [nums[i], nums[j], nums[k]]
                        res.add(tuple(tmp))
        return [list(i) for i in res]
```

```java
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> res = new HashSet<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        List<Integer> tmp = Arrays.asList(nums[i], nums[j], nums[k]);
                        res.add(tmp);
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
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> res;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                for (int k = j + 1; k < nums.size(); k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        res.insert({nums[i], nums[j], nums[k]});
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
     * @return {number[][]}
     */
    threeSum(nums) {
        const res = new Set();
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                for (let k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] === 0) {
                        res.add(JSON.stringify([nums[i], nums[j], nums[k]]));
                    }
                }
            }
        }
        return Array.from(res).map(item => JSON.parse(item));
    }
}
```

```csharp
public class Solution {
    public List<List<int>> ThreeSum(int[] nums) {
        HashSet<Tuple<int, int, int>> uniqueTriplets = new HashSet<Tuple<int, int, int>>();
        List<List<int>> res = new List<List<int>>();
        Array.Sort(nums);

        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                for (int k = j + 1; k < nums.Length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        var triplet = Tuple.Create(nums[i], nums[j], nums[k]);
                        uniqueTriplets.Add(triplet);
                    }
                }
            }
        }

        foreach (var triplet in uniqueTriplets) {
            res.Add(new List<int> { triplet.Item1, triplet.Item2, triplet.Item3 });
        }
        return res;
    }
}
```

```go
func threeSum(nums []int) [][]int {
    res := map[[3]int]struct{}{}
    sort.Ints(nums)
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            for k := j + 1; k < len(nums); k++ {
                if nums[i]+nums[j]+nums[k] == 0 {
                    res[[3]int{nums[i], nums[j], nums[k]}] = struct{}{}
                }
            }
        }
    }
    var result [][]int
    for triplet := range res {
        result = append(result, []int{triplet[0], triplet[1], triplet[2]})
    }
    return result
}
```

```kotlin
class Solution {
    fun threeSum(nums: IntArray): List<List<Int>> {
        val res = HashSet<List<Int>>()
        nums.sort()
        for (i in nums.indices) {
            for (j in i + 1 until nums.size) {
                for (k in j + 1 until nums.size) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        res.add(listOf(nums[i], nums[j], nums[k]))
                    }
                }
            }
        }
        return res.map { it.toList() }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(m)$

> Where $m$ is the number of triplets and $n$ is the length of the given array.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        count = defaultdict(int)
        for num in nums:
            count[num] += 1

        res = []
        for i in range(len(nums)):
            count[nums[i]] -= 1
            if i and nums[i] == nums[i - 1]:
                continue
                
            for j in range(i + 1, len(nums)):
                count[nums[j]] -= 1
                if j - 1 > i and nums[j] == nums[j - 1]:
                    continue
                target = -(nums[i] + nums[j])
                if count[target] > 0:
                    res.append([nums[i], nums[j], target])

            for j in range(i + 1, len(nums)):
                count[nums[j]] += 1
        return res
```

```java
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
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

                int target = -(nums[i] + nums[j]);
                if (count.getOrDefault(target, 0) > 0) {
                    res.add(Arrays.asList(nums[i], nums[j], target));
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
    vector<vector<int>> threeSum(vector<int>& nums) {
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

                int target = -(nums[i] + nums[j]);
                if (count[target] > 0) {
                    res.push_back({nums[i], nums[j], target});
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
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);
        const count = new Map();
        for (let num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const res = [];
        for (let i = 0; i < nums.length; i++) {
            count.set(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                const target = -(nums[i] + nums[j]);
                if (count.get(target) > 0) {
                    res.push([nums[i], nums[j], target]);
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
    public List<List<int>> ThreeSum(int[] nums) {
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

                int target = -(nums[i] + nums[j]);
                if (count.ContainsKey(target) && count[target] > 0) {
                    res.Add(new List<int> { nums[i], nums[j], target });
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
func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    var res [][]int
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
            target := -(nums[i] + nums[j])
            if count[target] > 0 {
                res = append(res, []int{nums[i], nums[j], target})
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
    fun threeSum(nums: IntArray): List<List<Int>> {
        nums.sort()
        val count = HashMap<Int, Int>()
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

                val target = -(nums[i] + nums[j])
                if (count.getOrDefault(target, 0) > 0) {
                    res.add(listOf(nums[i], nums[j], target))
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()

        for i, a in enumerate(nums):
            if a > 0:
                break

            if i > 0 and a == nums[i - 1]:
                continue

            l, r = i + 1, len(nums) - 1
            while l < r:
                threeSum = a + nums[l] + nums[r]
                if threeSum > 0:
                    r -= 1
                elif threeSum < 0:
                    l += 1
                else:
                    res.append([a, nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while nums[l] == nums[l - 1] and l < r:
                        l += 1
                        
        return res
```

```java
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) {
                        l++;
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
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.push_back({nums[i], nums[l], nums[r]});
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) {
                        l++;
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
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            let l = i + 1;
            let r = nums.length - 1;
            while (l < r) {
                const sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;
                    while (l < r && nums[l] === nums[l - 1]) {
                        l++;
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
    public List<List<int>> ThreeSum(int[] nums) {
        Array.Sort(nums);
        List<List<int>> res = new List<List<int>>();

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int l = i + 1, r = nums.Length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) {
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    res.Add(new List<int> {nums[i], nums[l], nums[r]});
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) {
                        l++;
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func threeSum(nums []int) [][]int {
    res := [][]int{}
    sort.Ints(nums)

    for i := 0; i < len(nums); i++ {
        a := nums[i]
        if a > 0 {
            break
        }
        if i > 0 && a == nums[i-1] {
            continue
        }

        l, r := i+1, len(nums)-1
        for l < r {
            threeSum := a + nums[l] + nums[r]
            if threeSum > 0 {
                r--
            } else if threeSum < 0 {
                l++
            } else {
                res = append(res, []int{a, nums[l], nums[r]})
                l++
                r--
                for l < r && nums[l] == nums[l-1] {
                    l++
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun threeSum(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        nums.sort()

        for (i in nums.indices) {
            val a = nums[i]
            if (a > 0) break
            if (i > 0 && a == nums[i - 1]) continue

            var l = i + 1
            var r = nums.size - 1
            while (l < r) {
                val threeSum = a + nums[l] + nums[r]
                when {
                    threeSum > 0 -> r--
                    threeSum < 0 -> l++
                    else -> {
                        res.add(listOf(a, nums[l], nums[r]))
                        l++
                        r--
                        while (l < r && nums[l] == nums[l - 1]) {
                            l++
                        }
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

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.