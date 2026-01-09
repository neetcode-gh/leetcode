## 1. Brute Force

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        maxi = max(nums)

        for i in range(n):
            cnt = 0
            for j in range(i, n):
                if nums[j] == maxi:
                    cnt += 1

                if cnt >= k:
                    res += 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        long res = 0;
        int maxi = Integer.MIN_VALUE;

        for (int num : nums) {
            maxi = Math.max(maxi, num);
        }

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        long long res = 0;
        int maxi = *max_element(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        let n = nums.length,
            res = 0;
        let maxi = Math.max(...nums);

        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = i; j < n; j++) {
                if (nums[j] === maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int n = nums.Length;
        long res = 0;
        int maxi = nums.Max();

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    n := len(nums)
    var res int64 = 0
    maxi := nums[0]
    for _, num := range nums {
        if num > maxi {
            maxi = num
        }
    }

    for i := 0; i < n; i++ {
        cnt := 0
        for j := i; j < n; j++ {
            if nums[j] == maxi {
                cnt++
            }

            if cnt >= k {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val n = nums.size
        var res = 0L
        val maxi = nums.max()

        for (i in 0 until n) {
            var cnt = 0
            for (j in i until n) {
                if (nums[j] == maxi) {
                    cnt++
                }

                if (cnt >= k) {
                    res++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0
        let maxi = nums.max()!

        for i in 0..<n {
            var cnt = 0
            for j in i..<n {
                if nums[j] == maxi {
                    cnt += 1
                }

                if cnt >= k {
                    res += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Variable Size Sliding Window

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = 0
        res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1

            while max_cnt > k or (l <= r and max_cnt == k and nums[l] != max_n):
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1

            if max_cnt == k:
                res += l + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE, maxCnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        int maxCnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
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
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        let maxN = Math.max(...nums);
        let maxCnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt === k && nums[l] !== maxN)) {
                if (nums[l] === maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt === k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int maxN = nums.Max(), maxCnt = 0, l = 0;
        long res = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxCnt, l := 0, 0
    var res int64 = 0

    for r := 0; r < len(nums); r++ {
        if nums[r] == maxN {
            maxCnt++
        }

        for maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN) {
            if nums[l] == maxN {
                maxCnt--
            }
            l++
        }

        if maxCnt == k {
            res += int64(l + 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        var maxCnt = 0
        var l = 0
        var res = 0L

        for (r in nums.indices) {
            if (nums[r] == maxN) {
                maxCnt++
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--
                }
                l++
            }

            if (maxCnt == k) {
                res += l + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxCnt = 0, l = 0
        var res = 0

        for r in 0..<nums.count {
            if nums[r] == maxN {
                maxCnt += 1
            }

            while maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN) {
                if nums[l] == maxN {
                    maxCnt -= 1
                }
                l += 1
            }

            if maxCnt == k {
                res += l + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Variable Size Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1
            while max_cnt == k:
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1
            res += l

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int max_n = Integer.MIN_VALUE, max_cnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int max_n = *max_element(nums.begin(), nums.end());
        int max_cnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        let max_n = Math.max(...nums),
            max_cnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === max_n) {
                max_cnt++;
            }
            while (max_cnt === k) {
                if (nums[l] === max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int max_n = nums.Max(), max_cnt = 0, l = 0;
        long res = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxCnt, l := 0, 0
    var res int64 = 0

    for r := 0; r < len(nums); r++ {
        if nums[r] == maxN {
            maxCnt++
        }
        for maxCnt == k {
            if nums[l] == maxN {
                maxCnt--
            }
            l++
        }
        res += int64(l)
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        var maxCnt = 0
        var l = 0
        var res = 0L

        for (r in nums.indices) {
            if (nums[r] == maxN) {
                maxCnt++
            }
            while (maxCnt == k) {
                if (nums[l] == maxN) {
                    maxCnt--
                }
                l++
            }
            res += l
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxCnt = 0, l = 0
        var res = 0

        for r in 0..<nums.count {
            if nums[r] == maxN {
                maxCnt += 1
            }
            while maxCnt == k {
                if nums[l] == maxN {
                    maxCnt -= 1
                }
                l += 1
            }
            res += l
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Fixed Size Sliding Window + Math

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n = len(nums)
        max_n = max(nums)
        max_indexes = [-1]
        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

        res = 0
        for i in range(1, len(max_indexes) - k + 1):
            cur = (max_indexes[i] - max_indexes[i - 1])
            cur *= (n - max_indexes[i + k - 1])
            res += cur

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        int max_n = Integer.MIN_VALUE;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        List<Integer> max_indexes = new ArrayList<>();
        max_indexes.add(-1);
        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.add(i);
            }
        }

        long res = 0;
        for (int i = 1; i <= max_indexes.size() - k; i++) {
            long cur = (max_indexes.get(i) - max_indexes.get(i - 1));
            cur *= (n - max_indexes.get(i + k - 1));
            res += cur;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        int max_n = *max_element(nums.begin(), nums.end());
        vector<int> max_indexes = {-1};

        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.push_back(i);
            }
        }

        long long res = 0;
        for (int i = 1; i <= int(max_indexes.size()) - k; i++) {
            long long cur = (max_indexes[i] - max_indexes[i - 1]);
            cur *= (n - max_indexes[i + k - 1]);
            res += cur;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        const n = nums.length;
        const max_n = Math.max(...nums);
        const max_indexes = [-1];

        for (let i = 0; i < n; i++) {
            if (nums[i] === max_n) {
                max_indexes.push(i);
            }
        }

        let res = 0;
        for (let i = 1; i <= max_indexes.length - k; i++) {
            res +=
                (max_indexes[i] - max_indexes[i - 1]) *
                (n - max_indexes[i + k - 1]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int n = nums.Length;
        int max_n = nums.Max();
        List<int> max_indexes = new List<int> { -1 };

        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.Add(i);
            }
        }

        long res = 0;
        for (int i = 1; i <= max_indexes.Count - k; i++) {
            long cur = (max_indexes[i] - max_indexes[i - 1]);
            cur *= (n - max_indexes[i + k - 1]);
            res += cur;
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    n := len(nums)
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxIndexes := []int{-1}

    for i := 0; i < n; i++ {
        if nums[i] == maxN {
            maxIndexes = append(maxIndexes, i)
        }
    }

    var res int64 = 0
    for i := 1; i <= len(maxIndexes)-k; i++ {
        cur := int64(maxIndexes[i] - maxIndexes[i-1])
        cur *= int64(n - maxIndexes[i+k-1])
        res += cur
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val n = nums.size
        val maxN = nums.max()
        val maxIndexes = mutableListOf(-1)

        for (i in 0 until n) {
            if (nums[i] == maxN) {
                maxIndexes.add(i)
            }
        }

        var res = 0L
        for (i in 1..maxIndexes.size - k) {
            val cur = (maxIndexes[i] - maxIndexes[i - 1]).toLong() *
                      (n - maxIndexes[i + k - 1])
            res += cur
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        let maxN = nums.max()!
        var maxIndexes = [-1]

        for i in 0..<n {
            if nums[i] == maxN {
                maxIndexes.append(i)
            }
        }

        var res = 0
        for i in 1...(maxIndexes.count - k) {
            let cur = (maxIndexes[i] - maxIndexes[i - 1]) *
                      (n - maxIndexes[i + k - 1])
            res += cur
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Fixed Size Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n = max(nums)
        max_indexes = deque()
        res = 0

        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

            if len(max_indexes) > k:
                max_indexes.popleft()

            if len(max_indexes) == k:
                res += max_indexes[0] + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        Queue<Integer> maxIndexes = new LinkedList<>();
        long res = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == maxN) {
                maxIndexes.add(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.poll();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.peek() + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        queue<int> maxIndexes;
        long long res = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.front() + 1;
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
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        const maxN = Math.max(...nums);
        const maxIndexes = new Queue();
        let res = 0;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() === k) {
                res += maxIndexes.front() + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int maxN = nums.Max();
        Queue<int> maxIndexes = new Queue<int>();
        long res = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == maxN) {
                maxIndexes.Enqueue(i);
            }

            if (maxIndexes.Count > k) {
                maxIndexes.Dequeue();
            }

            if (maxIndexes.Count == k) {
                res += maxIndexes.Peek() + 1;
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxIndexes := []int{}
    var res int64 = 0

    for i := 0; i < len(nums); i++ {
        if nums[i] == maxN {
            maxIndexes = append(maxIndexes, i)
        }

        if len(maxIndexes) > k {
            maxIndexes = maxIndexes[1:]
        }

        if len(maxIndexes) == k {
            res += int64(maxIndexes[0] + 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        val maxIndexes = ArrayDeque<Int>()
        var res = 0L

        for (i in nums.indices) {
            if (nums[i] == maxN) {
                maxIndexes.addLast(i)
            }

            if (maxIndexes.size > k) {
                maxIndexes.removeFirst()
            }

            if (maxIndexes.size == k) {
                res += maxIndexes.first() + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxIndexes = [Int]()
        var res = 0

        for i in 0..<nums.count {
            if nums[i] == maxN {
                maxIndexes.append(i)
            }

            if maxIndexes.count > k {
                maxIndexes.removeFirst()
            }

            if maxIndexes.count == k {
                res += maxIndexes[0] + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
