## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Sets** - The optimal solution uses sets for O(1) lookup and set difference operations
- **Set Operations** - Understanding union, intersection, and difference of sets
- **Two Pointers** - Used in the sorting-based approach to efficiently compare sorted arrays

---

## 1. Brute Force

### Intuition

The most straightforward approach is to check each element in one array against every element in the other array. For each number in `nums1`, we scan through all of `nums2` to see if it exists there. If not found, it belongs in our result. We repeat the same process for `nums2`. Using sets ensures we only include each distinct value once.

### Algorithm

1. Initialize two empty sets to store unique elements that don't appear in the other array.
2. For each element in `nums1`, iterate through `nums2` to check if it exists. If not found, add it to the first result set.
3. For each element in `nums2`, iterate through `nums1` to check if it exists. If not found, add it to the second result set.
4. Convert both sets to lists and return them.

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: list[int], nums2: list[int]) -> list[list[int]]:
        res = [set(), set()]

        for num1 in nums1:
            found = False
            for num2 in nums2:
                if num1 == num2:
                    found = True
                    break
            if not found:
                res[0].add(num1)

        for num2 in nums2:
            found = False
            for num1 in nums1:
                if num1 == num2:
                    found = True
                    break
            if not found:
                res[1].add(num2)

        return [list(res[0]), list(res[1])]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> res1 = new HashSet<>();
        Set<Integer> res2 = new HashSet<>();

        for (int num1 : nums1) {
            boolean found = false;
            for (int num2 : nums2) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.add(num1);
            }
        }

        for (int num2 : nums2) {
            boolean found = false;
            for (int num1 : nums1) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.add(num2);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>(res1));
        result.add(new ArrayList<>(res2));
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        set<int> res1, res2;

        for (int num1 : nums1) {
            bool found = false;
            for (int num2 : nums2) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.insert(num1);
            }
        }

        for (int num2 : nums2) {
            bool found = false;
            for (int num1 : nums1) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.insert(num2);
            }
        }

        return {vector<int>(res1.begin(), res1.end()),
                vector<int>(res2.begin(), res2.end())};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const res1 = new Set();
        const res2 = new Set();

        for (const num1 of nums1) {
            let found = false;
            for (const num2 of nums2) {
                if (num1 === num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res1.add(num1);
            }
        }

        for (const num2 of nums2) {
            let found = false;
            for (const num1 of nums1) {
                if (num1 === num2) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                res2.add(num2);
            }
        }

        return [Array.from(res1), Array.from(res2)];
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FindDifference(int[] nums1, int[] nums2) {
        var res = new List<HashSet<int>> { new HashSet<int>(), new HashSet<int>() };

        foreach (int num1 in nums1) {
            bool found = false;
            foreach (int num2 in nums2) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) res[0].Add(num1);
        }

        foreach (int num2 in nums2) {
            bool found = false;
            foreach (int num1 in nums1) {
                if (num1 == num2) {
                    found = true;
                    break;
                }
            }
            if (!found) res[1].Add(num2);
        }

        return new List<List<int>> {
            res[0].ToList(),
            res[1].ToList()
        };
    }
}
```

```go
func findDifference(nums1 []int, nums2 []int) [][]int {
    res1 := make(map[int]struct{})
    res2 := make(map[int]struct{})

    for _, num1 := range nums1 {
        found := false
        for _, num2 := range nums2 {
            if num1 == num2 {
                found = true
                break
            }
        }
        if !found {
            res1[num1] = struct{}{}
        }
    }

    for _, num2 := range nums2 {
        found := false
        for _, num1 := range nums1 {
            if num1 == num2 {
                found = true
                break
            }
        }
        if !found {
            res2[num2] = struct{}{}
        }
    }

    result1, result2 := []int{}, []int{}
    for k := range res1 {
        result1 = append(result1, k)
    }
    for k := range res2 {
        result2 = append(result2, k)
    }
    return [][]int{result1, result2}
}
```

```kotlin
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray): List<List<Int>> {
        val res1 = mutableSetOf<Int>()
        val res2 = mutableSetOf<Int>()

        for (num1 in nums1) {
            var found = false
            for (num2 in nums2) {
                if (num1 == num2) {
                    found = true
                    break
                }
            }
            if (!found) res1.add(num1)
        }

        for (num2 in nums2) {
            var found = false
            for (num1 in nums1) {
                if (num1 == num2) {
                    found = true
                    break
                }
            }
            if (!found) res2.add(num2)
        }

        return listOf(res1.toList(), res2.toList())
    }
}
```

```swift
class Solution {
    func findDifference(_ nums1: [Int], _ nums2: [Int]) -> [[Int]] {
        var res1 = Set<Int>()
        var res2 = Set<Int>()

        for num1 in nums1 {
            var found = false
            for num2 in nums2 {
                if num1 == num2 {
                    found = true
                    break
                }
            }
            if !found {
                res1.insert(num1)
            }
        }

        for num2 in nums2 {
            var found = false
            for num1 in nums1 {
                if num1 == num2 {
                    found = true
                    break
                }
            }
            if !found {
                res2.insert(num2)
            }
        }

        return [Array(res1), Array(res2)]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 2. Sorting

### Intuition

By sorting both arrays, we can efficiently compare elements using a two-pointer technique. After sorting, elements are ordered, so we can walk through both arrays simultaneously. When we find an element in one array that doesn't have a match at the current position in the other, we know it's unique without needing to scan the entire array.

### Algorithm

1. Sort both input arrays.
2. Define a helper function that finds elements in array `A` that don't exist in array `B`:
   - Use a pointer `j` to track position in `B`.
   - For each unique element in `A`, advance `j` in `B` until we reach an element greater than or equal to the current element.
   - If `B` is exhausted or `B[j]` doesn't match, the element is unique to `A`.
3. Call the helper function twice: once to find elements unique to `nums1`, and once for `nums2`.
4. Return both result lists.

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: list[int], nums2: list[int]) -> list[list[int]]:
        nums1.sort()
        nums2.sort()

        def helper(A, B):
            n, m = len(A), len(B)
            res = []

            j = 0
            prev = float('-inf')
            for num in A:
                if prev == num:
                    continue
                while j < m and B[j] < num:
                    j += 1
                if j == m or B[j] != num:
                    res.append(num)
                prev = num
            return res

        return [helper(nums1, nums2), helper(nums2, nums1)]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);

        List<Integer> diff1 = helper(nums1, nums2);
        List<Integer> diff2 = helper(nums2, nums1);

        List<List<Integer>> result = new ArrayList<>();
        result.add(diff1);
        result.add(diff2);

        return result;
    }

    private List<Integer> helper(int[] A, int[] B) {
        int n = A.length, m = B.length, j = 0;
        List<Integer> res = new ArrayList<>();
        int prev = Integer.MIN_VALUE;

        for (int num : A) {
            if (num == prev) continue;
            while (j < m && B[j] < num) j++;
            if (j == m || B[j] != num) res.add(num);
            prev = num;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());

        return {helper(nums1, nums2), helper(nums2, nums1)};
    }

private:
    vector<int> helper(vector<int>& A, vector<int>& B) {
        vector<int> res;
        int n = A.size(), m = B.size(), j = 0, prev = INT_MIN;

        for (int num : A) {
            if (num == prev) continue;
            while (j < m && B[j] < num) j++;
            if (j == m || B[j] != num) res.push_back(num);
            prev = num;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        nums1.sort((a, b) => a - b);
        nums2.sort((a, b) => a - b);

        const helper = (A, B) => {
            const res = [];
            let j = 0;
            let prev = -Infinity;

            for (const num of A) {
                if (num === prev) continue;
                while (j < B.length && B[j] < num) j++;
                if (j === B.length || B[j] !== num) res.push(num);
                prev = num;
            }

            return res;
        };

        return [helper(nums1, nums2), helper(nums2, nums1)];
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FindDifference(int[] nums1, int[] nums2) {
        var num1Set = new HashSet<int>(nums1);
        var num2Set = new HashSet<int>(nums2);
        var res1 = new List<int>();
        var res2 = new List<int>();

        foreach (int num in num1Set) {
            if (!num2Set.Contains(num)) res1.Add(num);
        }

        foreach (int num in num2Set) {
            if (!num1Set.Contains(num)) res2.Add(num);
        }

        return new List<List<int>> { res1, res2 };
    }
}
```

```go
func findDifference(nums1 []int, nums2 []int) [][]int {
    sort.Ints(nums1)
    sort.Ints(nums2)

    helper := func(A, B []int) []int {
        res := []int{}
        j := 0
        prev := math.MinInt32

        for _, num := range A {
            if num == prev {
                continue
            }
            for j < len(B) && B[j] < num {
                j++
            }
            if j == len(B) || B[j] != num {
                res = append(res, num)
            }
            prev = num
        }
        return res
    }

    return [][]int{helper(nums1, nums2), helper(nums2, nums1)}
}
```

```kotlin
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray): List<List<Int>> {
        nums1.sort()
        nums2.sort()

        fun helper(A: IntArray, B: IntArray): List<Int> {
            val res = mutableListOf<Int>()
            var j = 0
            var prev = Int.MIN_VALUE

            for (num in A) {
                if (num == prev) continue
                while (j < B.size && B[j] < num) j++
                if (j == B.size || B[j] != num) res.add(num)
                prev = num
            }
            return res
        }

        return listOf(helper(nums1, nums2), helper(nums2, nums1))
    }
}
```

```swift
class Solution {
    func findDifference(_ nums1: [Int], _ nums2: [Int]) -> [[Int]] {
        let sortedNums1 = nums1.sorted()
        let sortedNums2 = nums2.sorted()

        func helper(_ A: [Int], _ B: [Int]) -> [Int] {
            var res = [Int]()
            var j = 0
            var prev = Int.min

            for num in A {
                if num == prev { continue }
                while j < B.count && B[j] < num { j += 1 }
                if j == B.count || B[j] != num {
                    res.append(num)
                }
                prev = num
            }
            return res
        }

        return [helper(sortedNums1, sortedNums2), helper(sortedNums2, sortedNums1)]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 3. Hash Set

### Intuition

Hash sets provide O(1) average lookup time, making them ideal for membership testing. By converting both arrays to sets, we eliminate duplicates and can quickly check whether any element exists in the other array. This avoids the nested loops of the brute force approach.

### Algorithm

1. Convert `nums1` and `nums2` into hash sets to remove duplicates and enable fast lookups.
2. Create an empty list for elements in `nums1` that aren't in `nums2`.
3. Iterate through the first set and add elements not found in the second set.
4. Repeat for elements in the second set that aren't in the first set.
5. Return both result lists.

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        num1Set, num2Set = set(nums1), set(nums2)
        res1, res2 = [], []

        for num in num1Set:
            if num not in num2Set:
                res1.append(num)

        for num in num2Set:
            if num not in num1Set:
                res2.append(num)

        return [res1, res2]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> num1Set = new HashSet<>();
        Set<Integer> num2Set = new HashSet<>();
        for (int num : nums1) num1Set.add(num);
        for (int num : nums2) num2Set.add(num);

        List<Integer> res1 = new ArrayList<>();
        List<Integer> res2 = new ArrayList<>();

        for (int num : num1Set) {
            if (!num2Set.contains(num)) res1.add(num);
        }

        for (int num : num2Set) {
            if (!num1Set.contains(num)) res2.add(num);
        }

        return Arrays.asList(res1, res2);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> num1Set(nums1.begin(), nums1.end());
        unordered_set<int> num2Set(nums2.begin(), nums2.end());
        vector<int> res1, res2;

        for (int num : num1Set) {
            if (num2Set.find(num) == num2Set.end()) res1.push_back(num);
        }

        for (int num : num2Set) {
            if (num1Set.find(num) == num1Set.end()) res2.push_back(num);
        }

        return {res1, res2};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const num1Set = new Set(nums1);
        const num2Set = new Set(nums2);
        const res1 = [];
        const res2 = [];

        for (const num of num1Set) {
            if (!num2Set.has(num)) res1.push(num);
        }

        for (const num of num2Set) {
            if (!num1Set.has(num)) res2.push(num);
        }

        return [res1, res2];
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FindDifference(int[] nums1, int[] nums2) {
        var numSet1 = new HashSet<int>(nums1);
        var numSet2 = new HashSet<int>(nums2);

        var res1 = new List<int>(numSet1);
        res1.RemoveAll(num => numSet2.Contains(num));

        var res2 = new List<int>(numSet2);
        res2.RemoveAll(num => numSet1.Contains(num));

        return new List<List<int>> { res1, res2 };
    }
}
```

```go
func findDifference(nums1 []int, nums2 []int) [][]int {
    num1Set := make(map[int]struct{})
    num2Set := make(map[int]struct{})
    for _, num := range nums1 {
        num1Set[num] = struct{}{}
    }
    for _, num := range nums2 {
        num2Set[num] = struct{}{}
    }

    res1, res2 := []int{}, []int{}
    for num := range num1Set {
        if _, exists := num2Set[num]; !exists {
            res1 = append(res1, num)
        }
    }
    for num := range num2Set {
        if _, exists := num1Set[num]; !exists {
            res2 = append(res2, num)
        }
    }

    return [][]int{res1, res2}
}
```

```kotlin
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray): List<List<Int>> {
        val num1Set = nums1.toHashSet()
        val num2Set = nums2.toHashSet()

        val res1 = num1Set.filter { it !in num2Set }
        val res2 = num2Set.filter { it !in num1Set }

        return listOf(res1, res2)
    }
}
```

```swift
class Solution {
    func findDifference(_ nums1: [Int], _ nums2: [Int]) -> [[Int]] {
        let num1Set = Set(nums1)
        let num2Set = Set(nums2)

        let res1 = num1Set.filter { !num2Set.contains($0) }
        let res2 = num2Set.filter { !num1Set.contains($0) }

        return [Array(res1), Array(res2)]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## 4. Hash Set Difference

### Intuition

Many programming languages provide built-in set difference operations. The set difference A - B returns all elements in A that are not in B. This is exactly what the problem asks for, so we can leverage these optimized library functions for a clean, concise solution.

### Algorithm

1. Convert both arrays to sets.
2. Compute the set difference of set1 minus set2 to get elements unique to `nums1`.
3. Compute the set difference of set2 minus set1 to get elements unique to `nums2`.
4. Convert both results to lists and return them.

::tabs-start

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        numSet1, numSet2 = set(nums1), set(nums2)
        return [list(numSet1 - numSet2), list(numSet2 - numSet1)]
```

```java
public class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> numSet1 = new HashSet<>();
        Set<Integer> numSet2 = new HashSet<>();
        for (int num : nums1) numSet1.add(num);
        for (int num : nums2) numSet2.add(num);

        List<Integer> res1 = new ArrayList<>(numSet1);
        res1.removeAll(numSet2);

        List<Integer> res2 = new ArrayList<>(numSet2);
        res2.removeAll(numSet1);

        return Arrays.asList(res1, res2);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res1, res2;
        set<int> numSet1(begin(nums1), end(nums1)), numSet2(begin(nums2), end(nums2));

        set_difference(begin(numSet1), end(numSet1), begin(numSet2), end(numSet2), back_inserter(res1));
        set_difference(begin(numSet2), end(numSet2), begin(numSet1), end(numSet1), back_inserter(res2));

        return {res1, res2};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number[][]}
     */
    findDifference(nums1, nums2) {
        const numSet1 = new Set(nums1);
        const numSet2 = new Set(nums2);

        const res1 = Array.from(numSet1).filter((num) => !numSet2.has(num));
        const res2 = Array.from(numSet2).filter((num) => !numSet1.has(num));

        return [res1, res2];
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FindDifference(int[] nums1, int[] nums2) {
        Array.Sort(nums1);
        Array.Sort(nums2);

        var diff1 = Helper(nums1, nums2);
        var diff2 = Helper(nums2, nums1);

        return new List<List<int>> { diff1, diff2 };
    }

    private List<int> Helper(int[] A, int[] B) {
        int n = A.Length, m = B.Length, j = 0;
        var res = new List<int>();
        int prev = int.MinValue;

        foreach (int num in A) {
            if (num == prev) continue;
            while (j < m && B[j] < num) j++;
            if (j == m || B[j] != num) res.Add(num);
            prev = num;
        }

        return res;
    }
}
```

```go
func findDifference(nums1 []int, nums2 []int) [][]int {
    numSet1 := make(map[int]struct{})
    numSet2 := make(map[int]struct{})
    for _, num := range nums1 {
        numSet1[num] = struct{}{}
    }
    for _, num := range nums2 {
        numSet2[num] = struct{}{}
    }

    res1, res2 := []int{}, []int{}
    for num := range numSet1 {
        if _, exists := numSet2[num]; !exists {
            res1 = append(res1, num)
        }
    }
    for num := range numSet2 {
        if _, exists := numSet1[num]; !exists {
            res2 = append(res2, num)
        }
    }

    return [][]int{res1, res2}
}
```

```kotlin
class Solution {
    fun findDifference(nums1: IntArray, nums2: IntArray): List<List<Int>> {
        val numSet1 = nums1.toHashSet()
        val numSet2 = nums2.toHashSet()

        return listOf(
            (numSet1 - numSet2).toList(),
            (numSet2 - numSet1).toList()
        )
    }
}
```

```swift
class Solution {
    func findDifference(_ nums1: [Int], _ nums2: [Int]) -> [[Int]] {
        let numSet1 = Set(nums1)
        let numSet2 = Set(nums2)

        return [
            Array(numSet1.subtracting(numSet2)),
            Array(numSet2.subtracting(numSet1))
        ]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums1$ and $m$ is the size of the array $nums2$.

---

## Common Pitfalls

### Returning Duplicate Values in the Result

The problem asks for distinct integers. If you iterate through the original arrays instead of sets, you might add the same value multiple times to your result. Always use sets or track seen values to ensure each element appears only once in the output.

### Confusing Which Array Each Result Belongs To

The output is a list of two lists: the first contains elements in `nums1` but not in `nums2`, and the second contains elements in `nums2` but not in `nums1`. Swapping these leads to incorrect results. Double-check which difference operation corresponds to which result list.
