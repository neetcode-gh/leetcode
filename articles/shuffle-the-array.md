## 1. Iteration (Extra Space)

::tabs-start

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        res = []
        for i in range(n):
            res.append(nums[i])
            res.append(nums[i + n])
        return res
```

```java
public class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            res[idx++] = nums[i];
            res[idx++] = nums[i + n];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res;
        for (int i = 0; i < n; i++) {
            res.push_back(nums[i]);
            res.push_back(nums[i + n]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} n
     * @return {number[]}
     */
    shuffle(nums) {
        const res = [];
        for (let i = 0; i < n; i++) {
            res.push(nums[i]);
            res.push(nums[i + n]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] Shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            res[idx++] = nums[i];
            res[idx++] = nums[i + n];
        }
        return res;
    }
}
```

```go
func shuffle(nums []int, n int) []int {
    res := make([]int, 0, 2*n)
    for i := 0; i < n; i++ {
        res = append(res, nums[i])
        res = append(res, nums[i+n])
    }
    return res
}
```

```kotlin
class Solution {
    fun shuffle(nums: IntArray, n: Int): IntArray {
        val res = IntArray(2 * n)
        var idx = 0
        for (i in 0 until n) {
            res[idx++] = nums[i]
            res[idx++] = nums[i + n]
        }
        return res
    }
}
```

```swift
class Solution {
    func shuffle(_ nums: [Int], _ n: Int) -> [Int] {
        var res = [Int]()
        for i in 0..<n {
            res.append(nums[i])
            res.append(nums[i + n])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ extra space.

---

## 2. Multiplication And Modulo

::tabs-start

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        M = max(nums) + 1
        for i in range(2 * n):
            if i % 2 == 0:
                nums[i] += (nums[i // 2] % M) * M
            else:
                nums[i] += (nums[n + i // 2] % M) * M

        for i in range(2 * n):
            nums[i] //= M

        return nums
```

```java
public class Solution {
    public int[] shuffle(int[] nums, int n) {
        int M = 1001;
        for (int i = 0; i < 2 * n; i++) {
            if (i % 2 == 0) {
                nums[i] += (nums[i / 2] % M) * M;
            } else {
                nums[i] += (nums[n + i / 2] % M) * M;
            }
        }
        for (int i = 0; i < 2 * n; i++) {
            nums[i] /= M;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        int M = *max_element(nums.begin(), nums.end()) + 1;
        for (int i = 0; i < 2 * n; i++) {
            if (i % 2 == 0) {
                nums[i] += (nums[i / 2] % M) * M;
            } else {
                nums[i] += (nums[n + i / 2] % M) * M;
            }
        }
        for (int i = 0; i < 2 * n; i++) {
            nums[i] /= M;
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} n
     * @return {number[]}
     */
    shuffle(nums) {
        const M = Math.max(...nums) + 1;
        for (let i = 0; i < 2 * n; i++) {
            if (i % 2 === 0) {
                nums[i] += (nums[i >> 1] % M) * M;
            } else {
                nums[i] += (nums[n + (i >> 1)] % M) * M;
            }
        }
        for (let i = 0; i < 2 * n; i++) {
            nums[i] = Math.floor(nums[i] / M);
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] Shuffle(int[] nums, int n) {
        int M = 1001;
        for (int i = 0; i < 2 * n; i++) {
            if (i % 2 == 0) {
                nums[i] += (nums[i / 2] % M) * M;
            } else {
                nums[i] += (nums[n + i / 2] % M) * M;
            }
        }
        for (int i = 0; i < 2 * n; i++) {
            nums[i] /= M;
        }
        return nums;
    }
}
```

```go
func shuffle(nums []int, n int) []int {
    M := 1001
    for i := 0; i < 2*n; i++ {
        if i%2 == 0 {
            nums[i] += (nums[i/2] % M) * M
        } else {
            nums[i] += (nums[n+i/2] % M) * M
        }
    }
    for i := 0; i < 2*n; i++ {
        nums[i] /= M
    }
    return nums
}
```

```kotlin
class Solution {
    fun shuffle(nums: IntArray, n: Int): IntArray {
        val M = 1001
        for (i in 0 until 2 * n) {
            if (i % 2 == 0) {
                nums[i] += (nums[i / 2] % M) * M
            } else {
                nums[i] += (nums[n + i / 2] % M) * M
            }
        }
        for (i in 0 until 2 * n) {
            nums[i] /= M
        }
        return nums
    }
}
```

```swift
class Solution {
    func shuffle(_ nums: [Int], _ n: Int) -> [Int] {
        var nums = nums
        let M = (nums.max() ?? 0) + 1
        for i in 0..<(2 * n) {
            if i % 2 == 0 {
                nums[i] += (nums[i / 2] % M) * M
            } else {
                nums[i] += (nums[n + i / 2] % M) * M
            }
        }
        for i in 0..<(2 * n) {
            nums[i] /= M
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Bit Manipulation

::tabs-start

```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        for i in range(n):
            nums[i] = (nums[i] << 10) | nums[i + n]  # Store x, y in nums[i]

        j = 2 * n - 1
        for i in range(n - 1, -1, -1):
            y = nums[i] & ((1 << 10) - 1)
            x = nums[i] >> 10
            nums[j] = y
            nums[j - 1] = x
            j -= 2

        return nums
```

```java
public class Solution {
    public int[] shuffle(int[] nums, int n) {
        for (int i = 0; i < n; i++) {
            nums[i] = (nums[i] << 10) | nums[i + n]; // Store x, y in nums[i]
        }

        int j = 2 * n - 1;
        for (int i = n - 1; i >= 0; i--) {
            int y = nums[i] & ((1 << 10) - 1);
            int x = nums[i] >> 10;
            nums[j] = y;
            nums[j - 1] = x;
            j -= 2;
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        for (int i = 0; i < n; i++) {
            nums[i] = (nums[i] << 10) | nums[i + n]; // Store x, y in nums[i]
        }

        int j = 2 * n - 1;
        for (int i = n - 1; i >= 0; i--) {
            int y = nums[i] & ((1 << 10) - 1);
            int x = nums[i] >> 10;
            nums[j] = y;
            nums[j - 1] = x;
            j -= 2;
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} n
     * @return {number[]}
     */
    shuffle(nums) {
        for (let i = 0; i < n; i++) {
            nums[i] = (nums[i] << 10) | nums[i + n]; // Store x, y in nums[i]
        }

        let j = 2 * n - 1;
        for (let i = n - 1; i >= 0; i--) {
            let y = nums[i] & ((1 << 10) - 1);
            let x = nums[i] >> 10;
            nums[j] = y;
            nums[j - 1] = x;
            j -= 2;
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] Shuffle(int[] nums, int n) {
        for (int i = 0; i < n; i++) {
            nums[i] = (nums[i] << 10) | nums[i + n]; // Store x, y in nums[i]
        }

        int j = 2 * n - 1;
        for (int i = n - 1; i >= 0; i--) {
            int y = nums[i] & ((1 << 10) - 1);
            int x = nums[i] >> 10;
            nums[j] = y;
            nums[j - 1] = x;
            j -= 2;
        }

        return nums;
    }
}
```

```go
func shuffle(nums []int, n int) []int {
    for i := 0; i < n; i++ {
        nums[i] = (nums[i] << 10) | nums[i+n] // Store x, y in nums[i]
    }

    j := 2*n - 1
    for i := n - 1; i >= 0; i-- {
        y := nums[i] & ((1 << 10) - 1)
        x := nums[i] >> 10
        nums[j] = y
        nums[j-1] = x
        j -= 2
    }

    return nums
}
```

```kotlin
class Solution {
    fun shuffle(nums: IntArray, n: Int): IntArray {
        for (i in 0 until n) {
            nums[i] = (nums[i] shl 10) or nums[i + n] // Store x, y in nums[i]
        }

        var j = 2 * n - 1
        for (i in n - 1 downTo 0) {
            val y = nums[i] and ((1 shl 10) - 1)
            val x = nums[i] shr 10
            nums[j] = y
            nums[j - 1] = x
            j -= 2
        }

        return nums
    }
}
```

```swift
class Solution {
    func shuffle(_ nums: [Int], _ n: Int) -> [Int] {
        var nums = nums
        for i in 0..<n {
            nums[i] = (nums[i] << 10) | nums[i + n] // Store x, y in nums[i]
        }

        var j = 2 * n - 1
        for i in stride(from: n - 1, through: 0, by: -1) {
            let y = nums[i] & ((1 << 10) - 1)
            let x = nums[i] >> 10
            nums[j] = y
            nums[j - 1] = x
            j -= 2
        }

        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
