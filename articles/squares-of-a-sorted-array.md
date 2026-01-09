## 1. Sorting

### Intuition

The straightforward approach is to square each element first and then sort the result. While the original array is sorted, squaring can change the order since negative numbers become positive. For example, `[-4, -1, 0, 3]` becomes `[16, 1, 0, 9]` after squaring, which needs to be sorted to `[0, 1, 9, 16]`.

### Algorithm

1. Iterate through the array and square each element in place.
2. Sort the array using the built-in sort function.
3. Return the sorted array of squares.

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        for i in range(len(nums)):
            nums[i] *= nums[i]
        nums.sort()
        return nums
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            nums[i] *= nums[i];
        }
        Arrays.sort(nums);
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            nums[i] *= nums[i];
        }
        sort(nums.begin(), nums.end());
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
    sortedSquares(nums) {
        for (let i = 0; i < nums.length; i++) {
            nums[i] *= nums[i];
        }
        nums.sort((a, b) => a - b);
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        for (int i = 0; i < nums.Length; i++) {
            nums[i] = nums[i] * nums[i];
        }
        Array.Sort(nums);
        return nums;
    }
}
```

```go
func sortedSquares(nums []int) []int {
    for i := range nums {
        nums[i] *= nums[i]
    }
    sort.Ints(nums)
    return nums
}
```

```kotlin
class Solution {
    fun sortedSquares(nums: IntArray): IntArray {
        for (i in nums.indices) {
            nums[i] *= nums[i]
        }
        nums.sort()
        return nums
    }
}
```

```swift
class Solution {
    func sortedSquares(_ nums: [Int]) -> [Int] {
        var nums = nums
        for i in 0..<nums.count {
            nums[i] *= nums[i]
        }
        nums.sort()
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Two Pointers - I

### Intuition

Since the input array is sorted, the largest squares will be at either end (the most negative or most positive values). By using two pointers at both ends, we can compare absolute values and always pick the larger square. This builds the result in descending order, which we then reverse.

### Algorithm

1. Initialize two pointers: `l` at the start and `r` at the end of the array.
2. Create an empty `result` list.
3. While `l <= r`:
   - Compare the squares of `nums[l]` and `nums[r]`.
   - Append the larger square to the `result` and move the corresponding pointer inward.
4. Reverse the `result` array (since we collected largest to smallest).
5. Return the reversed `result`.

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        l, r, res = 0, len(nums) - 1, []

        while l <= r:
            if (nums[l] * nums[l]) > (nums[r] * nums[r]):
                res.append(nums[l] * nums[l])
                l += 1
            else:
                res.append(nums[r] * nums[r])
                r -= 1

        return res[::-1]
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        int l = 0, r = nums.length - 1;
        ArrayList<Integer> res = new ArrayList<>();

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.add(nums[l] * nums[l]);
                l++;
            } else {
                res.add(nums[r] * nums[r]);
                r--;
            }
        }

        Collections.reverse(res);
        return res.stream().mapToInt(i -> i).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        vector<int> res;

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.push_back(nums[l] * nums[l]);
                l++;
            } else {
                res.push_back(nums[r] * nums[r]);
                r--;
            }
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortedSquares(nums) {
        let l = 0,
            r = nums.length - 1;
        const res = [];

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.push(nums[l] * nums[l]);
                l++;
            } else {
                res.push(nums[r] * nums[r]);
                r--;
            }
        }

        return res.reverse();
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        int l = 0, r = nums.Length - 1;
        var res = new List<int>();

        while (l <= r) {
            int leftSq = nums[l] * nums[l];
            int rightSq = nums[r] * nums[r];
            if (leftSq > rightSq) {
                res.Add(leftSq);
                l++;
            } else {
                res.Add(rightSq);
                r--;
            }
        }

        res.Reverse();
        return res.ToArray();
    }
}
```

```go
func sortedSquares(nums []int) []int {
    l, r := 0, len(nums)-1
    res := []int{}

    for l <= r {
        if nums[l]*nums[l] > nums[r]*nums[r] {
            res = append(res, nums[l]*nums[l])
            l++
        } else {
            res = append(res, nums[r]*nums[r])
            r--
        }
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun sortedSquares(nums: IntArray): IntArray {
        var l = 0
        var r = nums.size - 1
        val res = mutableListOf<Int>()

        while (l <= r) {
            if (nums[l] * nums[l] > nums[r] * nums[r]) {
                res.add(nums[l] * nums[l])
                l++
            } else {
                res.add(nums[r] * nums[r])
                r--
            }
        }

        res.reverse()
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func sortedSquares(_ nums: [Int]) -> [Int] {
        var l = 0
        var r = nums.count - 1
        var res = [Int]()

        while l <= r {
            if nums[l] * nums[l] > nums[r] * nums[r] {
                res.append(nums[l] * nums[l])
                l += 1
            } else {
                res.append(nums[r] * nums[r])
                r -= 1
            }
        }

        return res.reversed()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.

---

## 3. Two Pointers - II

### Intuition

This is an optimization of the previous approach that avoids the final reversal step. Instead of building the result from smallest to largest and reversing, we fill the result array from the end to the beginning. We still use two pointers to compare the absolute values at both ends, but we place each square directly in its final position.

### Algorithm

1. Create a `result` array of the same size as the input.
2. Initialize `l = 0`, `r = n - 1`, and `resIndex = n - 1` (pointing to the last position).
3. While `l <= r`:
   - Compare the absolute values of `nums[l]` and `nums[r]`.
   - Place the larger square at `res[resIndex]` and move the corresponding pointer.
   - Decrement `resIndex`.
4. Return the `result` array (no reversal needed).

::tabs-start

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        l, r = 0, n - 1
        res_index = n - 1

        while l <= r:
            if abs(nums[l]) > abs(nums[r]):
                res[res_index] = nums[l] * nums[l]
                l += 1
            else:
                res[res_index] = nums[r] * nums[r]
                r -= 1
            res_index -= 1

        return res
```

```java
public class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (Math.abs(nums[l]) > Math.abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (abs(nums[l]) > abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortedSquares(nums) {
        const n = nums.length;
        const res = new Array(n);
        let l = 0,
            r = n - 1,
            resIndex = n - 1;

        while (l <= r) {
            if (Math.abs(nums[l]) > Math.abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SortedSquares(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        int l = 0, r = n - 1, resIndex = n - 1;

        while (l <= r) {
            if (Math.Abs(nums[l]) > Math.Abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l];
                l++;
            } else {
                res[resIndex] = nums[r] * nums[r];
                r--;
            }
            resIndex--;
        }

        return res;
    }
}
```

```go
func sortedSquares(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    l, r := 0, n-1
    resIndex := n - 1

    for l <= r {
        if abs(nums[l]) > abs(nums[r]) {
            res[resIndex] = nums[l] * nums[l]
            l++
        } else {
            res[resIndex] = nums[r] * nums[r]
            r--
        }
        resIndex--
    }

    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun sortedSquares(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        var l = 0
        var r = n - 1
        var resIndex = n - 1

        while (l <= r) {
            if (kotlin.math.abs(nums[l]) > kotlin.math.abs(nums[r])) {
                res[resIndex] = nums[l] * nums[l]
                l++
            } else {
                res[resIndex] = nums[r] * nums[r]
                r--
            }
            resIndex--
        }

        return res
    }
}
```

```swift
class Solution {
    func sortedSquares(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)
        var l = 0
        var r = n - 1
        var resIndex = n - 1

        while l <= r {
            if abs(nums[l]) > abs(nums[r]) {
                res[resIndex] = nums[l] * nums[l]
                l += 1
            } else {
                res[resIndex] = nums[r] * nums[r]
                r -= 1
            }
            resIndex -= 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.
