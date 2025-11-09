## 1. Brute Force

### Intuition

We can check every pair of different elements in the array and return the first pair that sums up to the target. This is the most intuitive approach but it's not the most efficient.

### Algorithm

1. Iterate through the array with two nested loops to check every pair of different elements.
2. If the sum of the pair equals the target, return the indices of the pair.
3. If no such pair is found, return an empty array.
4. There is guaranteed to be exactly one solution, so we will never return an empty array.

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                }
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}
```

```go
func twoSum(nums []int, target int) []int {
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] + nums[j] == target {
                return []int{i, j}
            }
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        for (i in nums.indices) {
            for (j in i + 1 until nums.size) {
                if (nums[i] + nums[j] == target) {
                    return intArrayOf(i, j)
                }
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        for i in 0..<nums.count {
            for j in (i + 1)..<nums.count {
                if nums[i] + nums[j] == target {
                    return [i, j]
                }
            }
        }
        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Sorting

### Intuition

We can sort the array and use two pointers to find the two numbers that sum up to the target. This is more efficient than the brute force approach. This approach is similar to the one used in <a href="https://neetcode.io/problems/two-integer-sum-ii" target="_blank">Two Sum II</a>.

### Algorithm

1. Create a copy of the array and sort it in ascending order.
2. Initialize two pointers, one at the beginning and one at the end of the array.
3. Iterate through the array with the two pointers and check if the sum of the two numbers is equal to the target.
4. If the sum is equal to the target, return the indices of the two numbers.
5. If the sum is less than the target, move the left pointer to the right, which will increase the sum.
6. If the sum is greater than the target, move the right pointer to the left, which will decrease the sum.
7. There is guaranteed to be exactly one solution, so we will never return an empty array.

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        A = []
        for i, num in enumerate(nums):
            A.append([num, i])

        A.sort()
        i, j = 0, len(nums) - 1
        while i < j:
            cur = A[i][0] + A[j][0]
            if cur == target:
                return [min(A[i][1], A[j][1]),
                        max(A[i][1], A[j][1])]
            elif cur < target:
                i += 1
            else:
                j -= 1
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[][] A = new int[nums.length][2];
        for (int i = 0; i < nums.length; i++) {
            A[i][0] = nums[i];
            A[i][1] = i;
        }

        Arrays.sort(A, Comparator.comparingInt(a -> a[0]));

        int i = 0, j = nums.length - 1;
        while (i < j) {
            int cur = A[i][0] + A[j][0];
            if (cur == target) {
                return new int[]{Math.min(A[i][1], A[j][1]),
                                 Math.max(A[i][1], A[j][1])};
            } else if (cur < target) {
                i++;
            } else {
                j--;
            }
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<pair<int, int>> A;
        for (int i = 0; i < nums.size(); i++) {
            A.push_back({nums[i], i});
        }

        sort(A.begin(), A.end());

        int i = 0, j = nums.size() - 1;
        while (i < j) {
            int cur = A[i].first + A[j].first;
            if (cur == target) {
                return {min(A[i].second, A[j].second),
                        max(A[i].second, A[j].second)};
            } else if (cur < target) {
                i++;
            } else {
                j--;
            }
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        let A = [];
        for (let i = 0; i < nums.length; i++) {
            A.push([nums[i], i]);
        }

        A.sort((a, b) => a[0] - b[0]);

        let i = 0,
            j = nums.length - 1;
        while (i < j) {
            let cur = A[i][0] + A[j][0];
            if (cur === target) {
                return [Math.min(A[i][1], A[j][1]), Math.max(A[i][1], A[j][1])];
            } else if (cur < target) {
                i++;
            } else {
                j--;
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        List<int[]> A = new List<int[]>();
        for (int idx = 0; idx < nums.Length; idx++) {
            A.Add(new int[]{nums[idx], idx});
        }

        A.Sort((a, b) => a[0].CompareTo(b[0]));

        int i = 0, j = nums.Length - 1;
        while (i < j) {
            int cur = A[i][0] + A[j][0];
            if (cur == target) {
                return new int[]{
                    Math.Min(A[i][1], A[j][1]),
                    Math.Max(A[i][1], A[j][1])
                };
            } else if (cur < target) {
                i++;
            } else {
                j--;
            }
        }
        return new int[0];
    }
}
```

```go
func twoSum(nums []int, target int) []int {
    A := make([][2]int, len(nums))
    for i, num := range nums {
        A[i] = [2]int{num, i}
    }

    sort.Slice(A, func(i, j int) bool {
        return A[i][0] < A[j][0]
    })

    i, j := 0, len(nums)-1
    for i < j {
        cur := A[i][0] + A[j][0]
        if cur == target {
            if A[i][1] < A[j][1] {
                return []int{A[i][1], A[j][1]}
            } else {
                return []int{A[j][1], A[i][1]}
            }
        } else if cur < target {
            i++
        } else {
            j--
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val A = nums.mapIndexed { index, num -> num to index }.toMutableList()
        A.sortBy { it.first }

        var i = 0
        var j = nums.size - 1
        while (i < j) {
            val cur = A[i].first + A[j].first
            if (cur == target) {
                return intArrayOf(
                    minOf(A[i].second, A[j].second),
                    maxOf(A[i].second, A[j].second)
                )
            } else if (cur < target) {
                i++
            } else {
                j--
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var A = [(Int, Int)]()
        for (i, num) in nums.enumerated() {
            A.append((num, i))
        }

        A.sort { $0.0 < $1.0 }
        var i = 0
        var j = nums.count - 1

        while i < j {
            let cur = A[i].0 + A[j].0
            if cur == target {
                return [min(A[i].1, A[j].1),
                        max(A[i].1, A[j].1)]
            } else if cur < target {
                i += 1
            } else {
                j -= 1
            }
        }
        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Hash Map (Two Pass)

### Intuition

We can use a hash map to store the value and index of each element in the array. Then, we can iterate through the array and check if the complement of the current element exists in the hash map. The complement must be at a different index, because we can't use the same element twice.

By using a hashmap, we can achieve a time complexity of $O(n)$ because the insertion and lookup time of a hashmap is $O(1)$.

### Algorithm

1. Create a hash map to store the value and index of each element in the array.
2. Iterate through the array and compute the complement of the current element, which is `target - nums[i]`.
3. Check if the complement exists in the hash map.
4. If it does, return the indices of the current element and its complement.
5. If no such pair is found, return an empty array.

::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        indices = {}  # val -> index

        for i, n in enumerate(nums):
            indices[n] = i

        for i, n in enumerate(nums):
            diff = target - n
            if diff in indices and indices[diff] != i:
                return [i, indices[diff]]
        return []
```

```java
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> indices = new HashMap<>();  // val -> index

        for (int i = 0; i < nums.length; i++) {
            indices.put(nums[i], i);
        }

        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (indices.containsKey(diff) && indices.get(diff) != i) {
                return new int[]{i, indices.get(diff)};
            }
        }

        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> indices;  // val -> index

        for (int i = 0; i < nums.size(); i++) {
            indices[nums[i]] = i;
        }

        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (indices.count(diff) && indices[diff] != i) {
                return {i, indices[diff]};
            }
        }

        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const indices = {}; // val -> index

        for (let i = 0; i < nums.length; i++) {
            indices[nums[i]] = i;
        }

        for (let i = 0; i < nums.length; i++) {
            let diff = target - nums[i];
            if (indices[diff] !== undefined && indices[diff] !== i) {
                return [i, indices[diff]];
            }
        }

        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // val -> index
        Dictionary<int, int> indices = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++) {
            indices[nums[i]] = i;
        }

        for (int i = 0; i < nums.Length; i++) {
            int diff = target - nums[i];
            if (indices.ContainsKey(diff) && indices[diff] != i) {
                return new int[]{i, indices[diff]};
            }
        }

        return new int[0];
    }
}
```

```go
func twoSum(nums []int, target int) []int {
    indices := make(map[int]int)

    for i, n := range nums {
        indices[n] = i
    }

    for i, n := range nums {
        diff := target - n
        if j, found := indices[diff]; found && j != i {
            return []int{i, j}
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val indices = HashMap<Int, Int>()

        for ((i, n) in nums.withIndex()) {
            indices[n] = i
        }

        for ((i, n) in nums.withIndex()) {
            val diff = target - n
            if (indices.containsKey(diff) && indices[diff] != i) {
                return intArrayOf(i, indices[diff]!!)
            }
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var indices = [Int: Int]() // val -> index

        for (i, n) in nums.enumerated() {
            indices[n] = i
        }

        for (i, n) in nums.enumerated() {
            let diff = target - n
            if let j = indices[diff], j != i {
                return [i, j]
            }
        }

        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Hash Map (One Pass)

### Intuition

We can solve the problem in a single pass by iterating through the array and checking if the complement of the current element exists in the hash map.

If it does, we return the indices of the current element and its complement. If not, we store the current element in the hash map. This guarantees that we will never use the same element twice, but we still check every element in the array.

### Algorithm

1. Create a hash map to store the value and index of each element in the array.
2. Iterate through the array and compute the complement of the current element, which is `target - nums[i]`.
3. Check if the complement exists in the hash map.
4. If it does, return the indices of the current element and its complement.
5. If no such pair is found, return an empty array.


::tabs-start

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
```

```java
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> prevMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            int diff = target - num;

            if (prevMap.containsKey(diff)) {
                return new int[] { prevMap.get(diff), i };
            }

            prevMap.put(num, i);
        }

        return new int[] {};
    }
}
```

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        unordered_map<int, int> prevMap;

        for (int i = 0; i < n; i++) {
            int diff = target - nums[i];
            if (prevMap.find(diff) != prevMap.end()) {
                return {prevMap[diff], i};
            }
            prevMap.insert({nums[i], i});
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const prevMap = new Map();

        for (let i = 0; i < nums.length; i++) {
            const diff = target - nums[i];
            if (prevMap.has(diff)) {
                return [prevMap.get(diff), i];
            }

            prevMap.set(nums[i], i);
        }

        return [];
    }
}
```

```csharp
public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        Dictionary<int, int> prevMap = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++) {
            var diff = target - nums[i];
            if (prevMap.ContainsKey(diff)) {
                return new int[] {prevMap[diff], i};
            }
            prevMap[nums[i]] = i;
        }
        return null;
    }
}
```

```go
func twoSum(nums []int, target int) []int {
    prevMap := make(map[int]int)

    for i, n := range nums {
        diff := target - n
        if j, found := prevMap[diff]; found {
            return []int{j, i}
        }
        prevMap[n] = i
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val prevMap = HashMap<Int, Int>()

        for ((i, n) in nums.withIndex()) {
            val diff = target - n
            if (prevMap.containsKey(diff)) {
                return intArrayOf(prevMap[diff]!!, i)
            }
            prevMap[n] = i
        }
        return intArrayOf()
    }
}
```

```swift
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var prevMap = [Int: Int]() // val -> index

        for (i, n) in nums.enumerated() {
            let diff = target - n
            if let index = prevMap[diff] {
                return [index, i]
            }
            prevMap[n] = i
        }

        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
