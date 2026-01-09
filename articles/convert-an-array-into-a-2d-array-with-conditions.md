## 1. Brute Force

### Intuition
We need to distribute numbers into rows such that each row contains only distinct elements. For each number, we find the first row where it doesn't already exist and place it there. If no such row exists, we create a new row. This greedy placement ensures we use the minimum number of rows needed.

### Algorithm
1. Initialize an empty result list to hold the 2D array.
2. For each number in the input array:
   - Start from row `0` and search for a row that doesn't contain this number.
   - Check each existing row sequentially until we find one where the number is absent.
   - If all existing rows already contain this number, create a new empty row.
   - Add the number to the found or newly created row.
3. Return the result containing all rows.

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        res = []

        for num in nums:
            r = 0
            while r < len(res):
                if num not in res[r]:
                    break
                r += 1
            if r == len(res):
                res.append([])
            res[r].append(num)

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();

        for (int num : nums) {
            int r = 0;
            while (r < res.size()) {
                if (!res.get(r).contains(num)) {
                    break;
                }
                r++;
            }
            if (r == res.size()) {
                res.add(new ArrayList<>());
            }
            res.get(r).add(num);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        vector<vector<int>> res;

        for (int num : nums) {
            int r = 0;
            while (r < res.size()) {
                if (find(res[r].begin(), res[r].end(), num) == res[r].end()) {
                    break;
                }
                r++;
            }
            if (r == res.size()) {
                res.push_back({});
            }
            res[r].push_back(num);
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
    findMatrix(nums) {
        const res = [];

        for (const num of nums) {
            let r = 0;
            while (r < res.length) {
                if (!res[r].includes(num)) {
                    break;
                }
                r++;
            }
            if (r === res.length) {
                res.push([]);
            }
            res[r].push(num);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> FindMatrix(int[] nums) {
        IList<IList<int>> res = new List<IList<int>>();

        foreach (int num in nums) {
            int r = 0;
            while (r < res.Count) {
                if (!res[r].Contains(num)) {
                    break;
                }
                r++;
            }
            if (r == res.Count) {
                res.Add(new List<int>());
            }
            res[r].Add(num);
        }

        return res;
    }
}
```

```go
func findMatrix(nums []int) [][]int {
    res := [][]int{}

    for _, num := range nums {
        r := 0
        for r < len(res) {
            found := false
            for _, v := range res[r] {
                if v == num {
                    found = true
                    break
                }
            }
            if !found {
                break
            }
            r++
        }
        if r == len(res) {
            res = append(res, []int{})
        }
        res[r] = append(res[r], num)
    }

    return res
}
```

```kotlin
class Solution {
    fun findMatrix(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<MutableList<Int>>()

        for (num in nums) {
            var r = 0
            while (r < res.size) {
                if (num !in res[r]) {
                    break
                }
                r++
            }
            if (r == res.size) {
                res.add(mutableListOf())
            }
            res[r].add(num)
        }

        return res
    }
}
```

```swift
class Solution {
    func findMatrix(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()

        for num in nums {
            var r = 0
            while r < res.count {
                if !res[r].contains(num) {
                    break
                }
                r += 1
            }
            if r == res.count {
                res.append([])
            }
            res[r].append(num)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$ for the output array.

> Where $n$ is the size of the array $nums$ and $m$ is the frequency of the most frequent element in the given array.

---

## 2. Sorting

### Intuition
By sorting the array first, all identical numbers become adjacent. This allows us to process each group of duplicates together. The number of rows needed equals the maximum frequency of any element, and by distributing each group of identical elements across consecutive rows starting from row `0`, we ensure each row has distinct values.

### Algorithm
1. Sort the input array.
2. Initialize an empty result list for the 2D array.
3. Iterate through the sorted array:
   - For each group of identical consecutive numbers, distribute them one per row starting from row `0`.
   - Create new rows as needed when we encounter more duplicates than existing rows.
   - Use two pointers: one to track the start of a group, another to iterate through duplicates.
4. Move to the next distinct number and repeat.
5. Return the result.

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []

        i = 0
        while i < len(nums):
            j = i
            r = 0
            while j < len(nums) and nums[i] == nums[j]:
                if r == len(res):
                    res.append([])
                res[r].append(nums[i])
                r += 1
                j += 1
            i = j

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();

        int i = 0;
        while (i < nums.length) {
            int j = i;
            int r = 0;
            while (j < nums.length && nums[i] == nums[j]) {
                if (r == res.size()) {
                    res.add(new ArrayList<>());
                }
                res.get(r).add(nums[i]);
                r++;
                j++;
            }
            i = j;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;

        int i = 0;
        while (i < nums.size()) {
            int j = i, r = 0;
            while (j < nums.size() && nums[i] == nums[j]) {
                if (r == res.size()) {
                    res.push_back({});
                }
                res[r].push_back(nums[i]);
                r++;
                j++;
            }
            i = j;
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
    findMatrix(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        let i = 0;
        while (i < nums.length) {
            let j = i;
            let r = 0;
            while (j < nums.length && nums[i] === nums[j]) {
                if (r === res.length) {
                    res.push([]);
                }
                res[r].push(nums[i]);
                r++;
                j++;
            }
            i = j;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> FindMatrix(int[] nums) {
        Array.Sort(nums);
        IList<IList<int>> res = new List<IList<int>>();

        int i = 0;
        while (i < nums.Length) {
            int j = i;
            int r = 0;
            while (j < nums.Length && nums[i] == nums[j]) {
                if (r == res.Count) {
                    res.Add(new List<int>());
                }
                res[r].Add(nums[i]);
                r++;
                j++;
            }
            i = j;
        }

        return res;
    }
}
```

```go
func findMatrix(nums []int) [][]int {
    sort.Ints(nums)
    res := [][]int{}

    i := 0
    for i < len(nums) {
        j := i
        r := 0
        for j < len(nums) && nums[i] == nums[j] {
            if r == len(res) {
                res = append(res, []int{})
            }
            res[r] = append(res[r], nums[i])
            r++
            j++
        }
        i = j
    }

    return res
}
```

```kotlin
class Solution {
    fun findMatrix(nums: IntArray): List<List<Int>> {
        nums.sort()
        val res = mutableListOf<MutableList<Int>>()

        var i = 0
        while (i < nums.size) {
            var j = i
            var r = 0
            while (j < nums.size && nums[i] == nums[j]) {
                if (r == res.size) {
                    res.add(mutableListOf())
                }
                res[r].add(nums[i])
                r++
                j++
            }
            i = j
        }

        return res
    }
}
```

```swift
class Solution {
    func findMatrix(_ nums: [Int]) -> [[Int]] {
        let nums = nums.sorted()
        var res = [[Int]]()

        var i = 0
        while i < nums.count {
            var j = i
            var r = 0
            while j < nums.count && nums[i] == nums[j] {
                if r == res.count {
                    res.append([])
                }
                res[r].append(nums[i])
                r += 1
                j += 1
            }
            i = j
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$ for the output array.

---

## 3. Frequency Count

### Intuition
The frequency of each number tells us exactly which row it should go into. The first occurrence goes to row `0`, the second occurrence to row `1`, and so on. By tracking how many times we've seen each number, we can directly place it in the correct row without searching. This eliminates the need for both sorting and linear searching.

### Algorithm
1. Create a hash map to count how many times each number has been placed (initially `0` for all).
2. Initialize an empty result list.
3. For each number in the array:
   - Look up its current count in the hash map. This count indicates which row it belongs to.
   - If this row doesn't exist yet, create a new empty row.
   - Add the number to the row indicated by its count.
   - Increment the count for this number in the hash map.
4. Return the result.

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        count = defaultdict(int)
        res = []

        for num in nums:
            row = count[num]
            if len(res) == row:
                res.append([])
            res[row].append(num)
            count[num] += 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<List<Integer>> res = new ArrayList<>();

        for (int num : nums) {
            int row = count.getOrDefault(num, 0);
            if (res.size() == row) {
                res.add(new ArrayList<>());
            }
            res.get(row).add(num);
            count.put(num, row + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<vector<int>> res;

        for (int num : nums) {
            int row = count[num];
            if (res.size() == row) {
                res.push_back({});
            }
            res[row].push_back(num);
            count[num]++;
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
    findMatrix(nums) {
        const count = new Map();
        const res = [];

        for (const num of nums) {
            const row = count.get(num) || 0;
            if (res.length === row) {
                res.push([]);
            }
            res[row].push(num);
            count.set(num, row + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<IList<int>> FindMatrix(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        IList<IList<int>> res = new List<IList<int>>();

        foreach (int num in nums) {
            int row = count.GetValueOrDefault(num, 0);
            if (res.Count == row) {
                res.Add(new List<int>());
            }
            res[row].Add(num);
            count[num] = row + 1;
        }

        return res;
    }
}
```

```go
func findMatrix(nums []int) [][]int {
    count := make(map[int]int)
    res := [][]int{}

    for _, num := range nums {
        row := count[num]
        if len(res) == row {
            res = append(res, []int{})
        }
        res[row] = append(res[row], num)
        count[num]++
    }

    return res
}
```

```kotlin
class Solution {
    fun findMatrix(nums: IntArray): List<List<Int>> {
        val count = mutableMapOf<Int, Int>()
        val res = mutableListOf<MutableList<Int>>()

        for (num in nums) {
            val row = count.getOrDefault(num, 0)
            if (res.size == row) {
                res.add(mutableListOf())
            }
            res[row].add(num)
            count[num] = row + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func findMatrix(_ nums: [Int]) -> [[Int]] {
        var count = [Int: Int]()
        var res = [[Int]]()

        for num in nums {
            let row = count[num, default: 0]
            if res.count == row {
                res.append([])
            }
            res[row].append(num)
            count[num] = row + 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
