## 1. Brute Force

### Intuition

For each valid starting position of a subarray of size `k`, we compute the sum of all elements in that window and check if the average meets the threshold. This approach recalculates the sum from scratch for every window.

### Algorithm

1. Iterate through all possible starting indices `l` from 0 to `n - k`.
2. For each window, compute the sum of elements from index `l` to `l + k - 1`.
3. If `sum / k >= threshold`, increment the result counter.
4. Return the total count.

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        res = 0
        l = 0

        for r in range(k - 1, len(arr)):
            sum_ = 0
            for i in range(l, r + 1):
                sum_ += arr[i]

            if sum_ / k >= threshold:
                res += 1
            l += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0, l = 0;

        for (int r = k - 1; r < arr.length; r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int res = 0, l = 0;

        for (int r = k - 1; r < arr.size(); r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        let res = 0,
            l = 0;

        for (let r = k - 1; r < arr.length; r++) {
            let sum = 0;
            for (let i = l; i <= r; i++) {
                sum += arr[i];
            }
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int l = 0;

        for (int r = k - 1; r < arr.Length; r++) {
            int sum = 0;
            for (int i = l; i <= r; i++) {
                sum += arr[i];
            }

            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }

        return res;
    }
}
```

```go
func numOfSubarrays(arr []int, k int, threshold int) int {
    res := 0
    l := 0

    for r := k - 1; r < len(arr); r++ {
        sum := 0
        for i := l; i <= r; i++ {
            sum += arr[i]
        }
        if sum/k >= threshold {
            res++
        }
        l++
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray, k: Int, threshold: Int): Int {
        var res = 0
        var l = 0

        for (r in k - 1 until arr.size) {
            var sum = 0
            for (i in l..r) {
                sum += arr[i]
            }
            if (sum / k >= threshold) {
                res++
            }
            l++
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int], _ k: Int, _ threshold: Int) -> Int {
        var res = 0
        var l = 0

        for r in (k - 1)..<arr.count {
            var sum = 0
            for i in l...r {
                sum += arr[i]
            }
            if sum / k >= threshold {
                res += 1
            }
            l += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 2. Prefix Sum

### Intuition

Instead of recalculating sums from scratch, we precompute prefix sums. The sum of any subarray from index `l` to `r` becomes a simple subtraction: `prefix[r+1] - prefix[l]`. This trades memory for faster subarray sum queries.

### Algorithm

1. Build a prefix sum array where `prefix[i]` holds the sum of elements from index 0 to `i-1`.
2. For each window of size `k`, compute the sum as `prefix[r+1] - prefix[l]`.
3. If the average meets the threshold, increment the count.
4. Return the total count.

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        prefix_sum = [0] * (len(arr) + 1)
        for i in range(len(arr)):
            prefix_sum[i + 1] += prefix_sum[i] + arr[i]

        res = l = 0
        for r in range(k - 1, len(arr)):
            sum_ = prefix_sum[r + 1] - prefix_sum[l]
            if sum_ / k >= threshold:
                res += 1
            l += 1

        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int[] prefixSum = new int[arr.length + 1];
        for (int i = 0; i < arr.length; i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.length; r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        vector<int> prefixSum(arr.size() + 1);
        for (int i = 0; i < arr.size(); i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.size(); r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        const prefixSum = new Int32Array(arr.length + 1);
        for (let i = 0; i < arr.length; i++) {
            prefixSum[i + 1] += prefixSum[i] + arr[i];
        }

        let res = 0,
            l = 0;
        for (let r = k - 1; r < arr.length; r++) {
            const sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int[] prefixSum = new int[arr.Length + 1];
        for (int i = 0; i < arr.Length; i++) {
            prefixSum[i + 1] = prefixSum[i] + arr[i];
        }

        int res = 0, l = 0;
        for (int r = k - 1; r < arr.Length; r++) {
            int sum = prefixSum[r + 1] - prefixSum[l];
            if (sum / k >= threshold) {
                res++;
            }
            l++;
        }

        return res;
    }
}
```

```go
func numOfSubarrays(arr []int, k int, threshold int) int {
    prefixSum := make([]int, len(arr)+1)
    for i := 0; i < len(arr); i++ {
        prefixSum[i+1] = prefixSum[i] + arr[i]
    }

    res, l := 0, 0
    for r := k - 1; r < len(arr); r++ {
        sum := prefixSum[r+1] - prefixSum[l]
        if sum/k >= threshold {
            res++
        }
        l++
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray, k: Int, threshold: Int): Int {
        val prefixSum = IntArray(arr.size + 1)
        for (i in arr.indices) {
            prefixSum[i + 1] = prefixSum[i] + arr[i]
        }

        var res = 0
        var l = 0
        for (r in k - 1 until arr.size) {
            val sum = prefixSum[r + 1] - prefixSum[l]
            if (sum / k >= threshold) {
                res++
            }
            l++
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int], _ k: Int, _ threshold: Int) -> Int {
        var prefixSum = [Int](repeating: 0, count: arr.count + 1)
        for i in 0..<arr.count {
            prefixSum[i + 1] = prefixSum[i] + arr[i]
        }

        var res = 0
        var l = 0
        for r in (k - 1)..<arr.count {
            let sum = prefixSum[r + 1] - prefixSum[l]
            if sum / k >= threshold {
                res += 1
            }
            l += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 3. Sliding Window - I

### Intuition

We maintain a running sum of the current window. When the window slides, we add the new element entering from the right and remove the element leaving from the left. This gives constant-time updates per window instead of recalculating from scratch.

### Algorithm

1. Initialize `curSum` with the sum of the first `k-1` elements.
2. For each starting position `L`:
   - Add the element at position `L + k - 1` to complete the window.
   - Check if the average meets the threshold.
   - Remove the element at position `L` before moving to the next window.
3. Return the count of valid subarrays.

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        res = 0
        curSum = sum(arr[:k - 1])

        for L in range(len(arr) - k + 1):
            curSum += arr[L + k - 1]
            if (curSum / k) >= threshold:
                res += 1
            curSum -= arr[L]
        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.length - k; L++) {
            curSum += arr[L + k - 1];
            if ((curSum / k) >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int res = 0, curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.size() - k; L++) {
            curSum += arr[L + k - 1];
            if ((curSum / k) >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        let res = 0;
        let curSum = 0;

        for (let i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (let L = 0; L <= arr.length - k; L++) {
            curSum += arr[L + k - 1];
            if (curSum / k >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        int res = 0;
        int curSum = 0;

        for (int i = 0; i < k - 1; i++) {
            curSum += arr[i];
        }

        for (int L = 0; L <= arr.Length - k; L++) {
            curSum += arr[L + k - 1];
            if (curSum / k >= threshold) {
                res++;
            }
            curSum -= arr[L];
        }

        return res;
    }
}
```

```go
func numOfSubarrays(arr []int, k int, threshold int) int {
    res := 0
    curSum := 0

    for i := 0; i < k-1; i++ {
        curSum += arr[i]
    }

    for L := 0; L <= len(arr)-k; L++ {
        curSum += arr[L+k-1]
        if curSum/k >= threshold {
            res++
        }
        curSum -= arr[L]
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray, k: Int, threshold: Int): Int {
        var res = 0
        var curSum = 0

        for (i in 0 until k - 1) {
            curSum += arr[i]
        }

        for (L in 0..arr.size - k) {
            curSum += arr[L + k - 1]
            if (curSum / k >= threshold) {
                res++
            }
            curSum -= arr[L]
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int], _ k: Int, _ threshold: Int) -> Int {
        var res = 0
        var curSum = 0

        for i in 0..<(k - 1) {
            curSum += arr[i]
        }

        for L in 0...(arr.count - k) {
            curSum += arr[L + k - 1]
            if curSum / k >= threshold {
                res += 1
            }
            curSum -= arr[L]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.

---

## 4. Sliding Window - II

### Intuition

A small optimization: instead of dividing the sum by `k` for each comparison, we multiply the threshold by `k` once upfront. This converts the average check into a simple sum comparison, avoiding repeated division.

### Algorithm

1. Multiply threshold by `k` to get the target sum.
2. Expand the window by adding elements from the right.
3. Once the window reaches size `k`:
   - Check if the current sum meets or exceeds the target.
   - Shrink the window from the left by removing the oldest element.
4. Return the count of valid subarrays.

::tabs-start

```python
class Solution:
    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:
        threshold *= k
        res = curSum = 0
        for R in range(len(arr)):
            curSum += arr[R]
            if R >= k - 1:
                res += curSum >= threshold
                curSum -= arr[R - k + 1]
        return res
```

```java
public class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int R = 0; R < arr.length; R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int R = 0; R < arr.size(); R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} threshold
     * @return {number}
     */
    numOfSubarrays(arr, k, threshold) {
        threshold *= k;
        let res = 0,
            curSum = 0;

        for (let R = 0; R < arr.length; R++) {
            curSum += arr[R];
            if (R >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[R - k + 1];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumOfSubarrays(int[] arr, int k, int threshold) {
        threshold *= k;
        int res = 0, curSum = 0;

        for (int r = 0; r < arr.Length; r++) {
            curSum += arr[r];
            if (r >= k - 1) {
                if (curSum >= threshold) {
                    res++;
                }
                curSum -= arr[r - k + 1];
            }
        }

        return res;
    }
}
```

```go
func numOfSubarrays(arr []int, k int, threshold int) int {
    threshold *= k
    res, curSum := 0, 0

    for r := 0; r < len(arr); r++ {
        curSum += arr[r]
        if r >= k-1 {
            if curSum >= threshold {
                res++
            }
            curSum -= arr[r-k+1]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfSubarrays(arr: IntArray, k: Int, threshold: Int): Int {
        val target = threshold * k
        var res = 0
        var curSum = 0

        for (r in arr.indices) {
            curSum += arr[r]
            if (r >= k - 1) {
                if (curSum >= target) {
                    res++
                }
                curSum -= arr[r - k + 1]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfSubarrays(_ arr: [Int], _ k: Int, _ threshold: Int) -> Int {
        let target = threshold * k
        var res = 0
        var curSum = 0

        for r in 0..<arr.count {
            curSum += arr[r]
            if r >= k - 1 {
                if curSum >= target {
                    res += 1
                }
                curSum -= arr[r - k + 1]
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the array $arr$ and $k$ is the size of the sub-array.
