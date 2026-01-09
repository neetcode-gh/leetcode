## 1. Brute Force

### Intuition

We process the array position by position. At each index, we check if the current element has the correct sign (positive at even indices, negative at odd indices). If not, we search forward for an element with the correct sign and shift all elements in between to make room for it.

### Algorithm

1. Iterate through each index `i`:
   - If index is even and `nums[i] > 0`, or index is odd and `nums[i] < 0`, continue.
   - Otherwise, find the next element with the opposite sign at position `j`.
   - Save `nums[j]`, then shift all elements from `i` to `j-1` one position right.
   - Place the saved element at position `i`.
2. Return the modified array.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        n = len(nums)
        for i in range(n):
            if ((i % 2 == 0 and nums[i] > 0) or
                (i % 2 == 1 and nums[i] < 0)):
                continue

            j = i + 1
            while j < n and ((nums[j] > 0) == (nums[i] > 0)):
                j += 1

            tmp = nums[j]
            while j > i:
                nums[j] = nums[j - 1]
                j -= 1
            nums[i] = tmp
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue;
            }

            int j = i + 1;
            while (j < n && ((nums[j] > 0) == (nums[i] > 0))) {
                j++;
            }

            int temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue;
            }

            int j = i + 1;
            while (j < n && ((nums[j] > 0) == (nums[i] > 0))) {
                j++;
            }

            int temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
        }
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
    rearrangeArray(nums) {
        let n = nums.length;
        for (let i = 0; i < n; i++) {
            if ((i % 2 === 0 && nums[i] > 0) || (i % 2 === 1 && nums[i] < 0)) {
                continue;
            }

            let j = i + 1;
            while (j < n && nums[j] > 0 === nums[i] > 0) {
                j++;
            }

            let temp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = temp;
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue;
            }

            int j = i + 1;
            while (j < n && ((nums[j] > 0) == (nums[i] > 0))) {
                j++;
            }

            int tmp = nums[j];
            while (j > i) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[i] = tmp;
        }

        return nums;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    n := len(nums)
    for i := 0; i < n; i++ {
        if (i%2 == 0 && nums[i] > 0) || (i%2 == 1 && nums[i] < 0) {
            continue
        }

        j := i + 1
        for j < n && ((nums[j] > 0) == (nums[i] > 0)) {
            j++
        }

        tmp := nums[j]
        for j > i {
            nums[j] = nums[j-1]
            j--
        }
        nums[i] = tmp
    }
    return nums
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        val n = nums.size
        for (i in 0 until n) {
            if ((i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0)) {
                continue
            }

            var j = i + 1
            while (j < n && (nums[j] > 0) == (nums[i] > 0)) {
                j++
            }

            val tmp = nums[j]
            while (j > i) {
                nums[j] = nums[j - 1]
                j--
            }
            nums[i] = tmp
        }
        return nums
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count
        for i in 0..<n {
            if (i % 2 == 0 && nums[i] > 0) || (i % 2 == 1 && nums[i] < 0) {
                continue
            }

            var j = i + 1
            while j < n && (nums[j] > 0) == (nums[i] > 0) {
                j += 1
            }

            let tmp = nums[j]
            while j > i {
                nums[j] = nums[j - 1]
                j -= 1
            }
            nums[i] = tmp
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Group Numbers Into Two Arrays

### Intuition

Since we need to alternate positive and negative numbers while preserving their relative order, we can first separate them into two lists. Then we interleave them back into the original array: positive numbers go to even indices, negative numbers go to odd indices.

### Algorithm

1. Create two separate lists: `pos` for positive numbers and `neg` for negative numbers.
2. Iterate through the input array and add each number to the appropriate list.
3. Rebuild the array by interleaving:
   - Place `pos[i]` at index `2 * i`.
   - Place `neg[i]` at index `2 * i + 1`.
4. Return the result.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        pos, neg = [], []
        for num in nums:
            if num > 0:
                pos.append(num)
            else:
                neg.append(num)

        i = 0
        while 2 * i < len(nums):
            nums[2 * i] = pos[i]
            nums[2 * i + 1] = neg[i]
            i += 1
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        List<Integer> pos = new ArrayList<>();
        List<Integer> neg = new ArrayList<>();
        for (int num : nums) {
            if (num > 0) {
                pos.add(num);
            } else {
                neg.add(num);
            }
        }

        int i = 0;
        while (2 * i < nums.length) {
            nums[2 * i] = pos.get(i);
            nums[2 * i + 1] = neg.get(i);
            i++;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        vector<int> pos, neg;
        for (int num : nums) {
            if (num > 0) {
                pos.push_back(num);
            } else {
                neg.push_back(num);
            }
        }

        int i = 0;
        while (2 * i < nums.size()) {
            nums[2 * i] = pos[i];
            nums[2 * i + 1] = neg[i];
            i++;
        }
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
    rearrangeArray(nums) {
        const pos = [],
            neg = [];
        for (const num of nums) {
            if (num > 0) {
                pos.push(num);
            } else {
                neg.push(num);
            }
        }

        let i = 0;
        while (2 * i < nums.length) {
            nums[2 * i] = pos[i];
            nums[2 * i + 1] = neg[i];
            i++;
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        List<int> pos = new List<int>();
        List<int> neg = new List<int>();

        foreach (int num in nums) {
            if (num > 0) pos.Add(num);
            else neg.Add(num);
        }

        int i = 0;
        while (2 * i < nums.Length) {
            nums[2 * i] = pos[i];
            nums[2 * i + 1] = neg[i];
            i++;
        }

        return nums;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    var pos, neg []int
    for _, num := range nums {
        if num > 0 {
            pos = append(pos, num)
        } else {
            neg = append(neg, num)
        }
    }

    i := 0
    for 2*i < len(nums) {
        nums[2*i] = pos[i]
        nums[2*i+1] = neg[i]
        i++
    }
    return nums
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        val pos = mutableListOf<Int>()
        val neg = mutableListOf<Int>()

        for (num in nums) {
            if (num > 0) pos.add(num)
            else neg.add(num)
        }

        var i = 0
        while (2 * i < nums.size) {
            nums[2 * i] = pos[i]
            nums[2 * i + 1] = neg[i]
            i++
        }
        return nums
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums
        var pos = [Int]()
        var neg = [Int]()

        for num in nums {
            if num > 0 {
                pos.append(num)
            } else {
                neg.append(num)
            }
        }

        var i = 0
        while 2 * i < nums.count {
            nums[2 * i] = pos[i]
            nums[2 * i + 1] = neg[i]
            i += 1
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers

### Intuition

We can build the result in a single pass using two pointers. One pointer tracks the next even index (for positive numbers), and the other tracks the next odd index (for negative numbers). As we scan through the input, we place each number at the appropriate position and advance the corresponding pointer by 2.

### Algorithm

1. Initialize `i = 0` (for positive numbers at even indices) and `j = 1` (for negative numbers at odd indices).
2. Create a result array of the same size.
3. For each number in the input:
   - If positive, place it at `res[i]` and increment `i` by 2.
   - If negative, place it at `res[j]` and increment `j` by 2.
4. Return `res`.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        i, j = 0, 1
        res = [0] * len(nums)
        for k in range(len(nums)):
            if nums[k] > 0:
                res[i] = nums[k]
                i += 2
            else:
                res[j] = nums[k]
                j += 2
        return res
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int i = 0, j = 1;
        int[] res = new int[nums.length];
        for (int k = 0; k < nums.length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int i = 0, j = 1;
        vector<int> res(nums.size());
        for (int k = 0; k < nums.size(); k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
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
     * @return {number[]}
     */
    rearrangeArray(nums) {
        let i = 0,
            j = 1;
        const res = new Array(nums.length);
        for (let k = 0; k < nums.length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        int i = 0, j = 1;
        int[] res = new int[nums.Length];

        for (int k = 0; k < nums.Length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
            }
        }

        return res;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    i, j := 0, 1
    res := make([]int, len(nums))
    for k := 0; k < len(nums); k++ {
        if nums[k] > 0 {
            res[i] = nums[k]
            i += 2
        } else {
            res[j] = nums[k]
            j += 2
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        var i = 0
        var j = 1
        val res = IntArray(nums.size)
        for (k in nums.indices) {
            if (nums[k] > 0) {
                res[i] = nums[k]
                i += 2
            } else {
                res[j] = nums[k]
                j += 2
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var i = 0, j = 1
        var res = [Int](repeating: 0, count: nums.count)
        for k in 0..<nums.count {
            if nums[k] > 0 {
                res[i] = nums[k]
                i += 2
            } else {
                res[j] = nums[k]
                j += 2
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.
