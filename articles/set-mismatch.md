## 1. Brute Force

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        res = [0, 0]
        n = len(nums)

        for i in range(1, n + 1):
            cnt = 0
            for num in nums:
                if num == i:
                    cnt += 1

            if cnt == 0:
                res[1] = i
            elif cnt == 2:
                res[0] = i

        return res
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int[] res = new int[2];
        int n = nums.length;

        for (int i = 1; i <= n; i++) {
            int cnt = 0;
            for (int num : nums) {
                if (num == i) {
                    cnt++;
                }
            }

            if (cnt == 0) {
                res[1] = i;
            } else if (cnt == 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        vector<int> res(2, 0);
        int n = nums.size();

        for (int i = 1; i <= n; i++) {
            int cnt = 0;
            for (int num : nums) {
                if (num == i) {
                    cnt++;
                }
            }

            if (cnt == 0) {
                res[1] = i;
            } else if (cnt == 2) {
                res[0] = i;
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
    findErrorNums(nums) {
        const res = [0, 0];
        const n = nums.length;

        for (let i = 1; i <= n; i++) {
            let cnt = 0;
            for (const num of nums) {
                if (num === i) {
                    cnt++;
                }
            }

            if (cnt === 0) {
                res[1] = i;
            } else if (cnt === 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int[] res = new int[2];
        int n = nums.Length;

        for (int i = 1; i <= n; i++) {
            int cnt = 0;
            foreach (int num in nums) {
                if (num == i) {
                    cnt++;
                }
            }

            if (cnt == 0) {
                res[1] = i;
            } else if (cnt == 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```go
func findErrorNums(nums []int) []int {
    res := []int{0, 0}
    n := len(nums)

    for i := 1; i <= n; i++ {
        cnt := 0
        for _, num := range nums {
            if num == i {
                cnt++
            }
        }

        if cnt == 0 {
            res[1] = i
        } else if cnt == 2 {
            res[0] = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = intArrayOf(0, 0)
        val n = nums.size

        for (i in 1..n) {
            var cnt = 0
            for (num in nums) {
                if (num == i) {
                    cnt++
                }
            }

            if (cnt == 0) {
                res[1] = i
            } else if (cnt == 2) {
                res[0] = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        var res = [0, 0]
        let n = nums.count

        for i in 1...n {
            var cnt = 0
            for num in nums {
                if num == i {
                    cnt += 1
                }
            }

            if cnt == 0 {
                res[1] = i
            } else if cnt == 2 {
                res[0] = i
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

## 2. Sorting

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        res = [0, 1]
        nums.sort()

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                res[0] = nums[i]
            elif nums[i] - nums[i - 1] == 2:
                res[1] = nums[i] - 1

        if nums[-1] != len(nums):
            res[1] = len(nums)
        return res
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int[] res = {0, 1};
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                res[0] = nums[i];
            } else if (nums[i] - nums[i - 1] == 2) {
                res[1] = nums[i] - 1;
            }
        }

        if (nums[nums.length - 1] != nums.length) {
            res[1] = nums.length;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        vector<int> res = {0, 1};
        sort(nums.begin(), nums.end());

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                res[0] = nums[i];
            } else if (nums[i] - nums[i - 1] == 2) {
                res[1] = nums[i] - 1;
            }
        }

        if (nums.back() != nums.size()) {
            res[1] = nums.size();
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
    findErrorNums(nums) {
        const res = [0, 1];
        nums.sort((a, b) => a - b);

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1]) {
                res[0] = nums[i];
            } else if (nums[i] - nums[i - 1] === 2) {
                res[1] = nums[i] - 1;
            }
        }

        if (nums[nums.length - 1] !== nums.length) {
            res[1] = nums.length;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int[] res = {0, 1};
        Array.Sort(nums);

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] == nums[i - 1]) {
                res[0] = nums[i];
            } else if (nums[i] - nums[i - 1] == 2) {
                res[1] = nums[i] - 1;
            }
        }

        if (nums[nums.Length - 1] != nums.Length) {
            res[1] = nums.Length;
        }
        return res;
    }
}
```

```go
func findErrorNums(nums []int) []int {
    res := []int{0, 1}
    sort.Ints(nums)

    for i := 1; i < len(nums); i++ {
        if nums[i] == nums[i-1] {
            res[0] = nums[i]
        } else if nums[i]-nums[i-1] == 2 {
            res[1] = nums[i] - 1
        }
    }

    if nums[len(nums)-1] != len(nums) {
        res[1] = len(nums)
    }
    return res
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = intArrayOf(0, 1)
        nums.sort()

        for (i in 1 until nums.size) {
            if (nums[i] == nums[i - 1]) {
                res[0] = nums[i]
            } else if (nums[i] - nums[i - 1] == 2) {
                res[1] = nums[i] - 1
            }
        }

        if (nums[nums.size - 1] != nums.size) {
            res[1] = nums.size
        }
        return res
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        var res = [0, 1]
        var nums = nums.sorted()

        for i in 1..<nums.count {
            if nums[i] == nums[i - 1] {
                res[0] = nums[i]
            } else if nums[i] - nums[i - 1] == 2 {
                res[1] = nums[i] - 1
            }
        }

        if nums[nums.count - 1] != nums.count {
            res[1] = nums.count
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Frequency Count (Hash Table)

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        res = [0, 0] # [duplicate, missing]
        count = Counter(nums)

        for i in range(1, len(nums) + 1):
            if count[i] == 0:
                res[1] = i
            if count[i] == 2:
                res[0] = i

        return res
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int n = nums.length;
        int[] count = new int[n + 1];
        int[] res = new int[2];

        for (int num : nums) {
            count[num]++;
        }

        for (int i = 1; i <= n; i++) {
            if (count[i] == 0) {
                res[1] = i;
            }
            if (count[i] == 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        int n = nums.size();
        vector<int> count(n + 1, 0);
        vector<int> res(2, 0);

        for (int num : nums) {
            count[num]++;
        }

        for (int i = 1; i <= n; i++) {
            if (count[i] == 0) {
                res[1] = i;
            }
            if (count[i] == 2) {
                res[0] = i;
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
    findErrorNums(nums) {
        const n = nums.length;
        const count = Array(n + 1).fill(0);
        const res = [0, 0];

        for (const num of nums) {
            count[num]++;
        }

        for (let i = 1; i <= n; i++) {
            if (count[i] === 0) {
                res[1] = i;
            }
            if (count[i] === 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int n = nums.Length;
        int[] count = new int[n + 1];
        int[] res = new int[2];

        foreach (int num in nums) {
            count[num]++;
        }

        for (int i = 1; i <= n; i++) {
            if (count[i] == 0) {
                res[1] = i;
            }
            if (count[i] == 2) {
                res[0] = i;
            }
        }

        return res;
    }
}
```

```go
func findErrorNums(nums []int) []int {
    n := len(nums)
    count := make([]int, n+1)
    res := []int{0, 0}

    for _, num := range nums {
        count[num]++
    }

    for i := 1; i <= n; i++ {
        if count[i] == 0 {
            res[1] = i
        }
        if count[i] == 2 {
            res[0] = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val n = nums.size
        val count = IntArray(n + 1)
        val res = IntArray(2)

        for (num in nums) {
            count[num]++
        }

        for (i in 1..n) {
            if (count[i] == 0) {
                res[1] = i
            }
            if (count[i] == 2) {
                res[0] = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var count = [Int](repeating: 0, count: n + 1)
        var res = [0, 0]

        for num in nums {
            count[num] += 1
        }

        for i in 1...n {
            if count[i] == 0 {
                res[1] = i
            }
            if count[i] == 2 {
                res[0] = i
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

---

## 4. Negative Marking

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        res = [0, 0]

        for num in nums:
            num = abs(num)
            nums[num - 1] *= -1
            if nums[num - 1] > 0:
                res[0] = num

        for i, num in enumerate(nums):
            if num > 0 and i + 1 != res[0]:
                res[1] = i + 1
                return res
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int[] res = new int[2];

        for (int num : nums) {
            int absNum = Math.abs(num);
            if (nums[absNum - 1] < 0) {
                res[0] = absNum;
            } else {
                nums[absNum - 1] *= -1;
            }
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0 && i + 1 != res[0]) {
                res[1] = i + 1;
                return res;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        vector<int> res(2);

        for (int num : nums) {
            int absNum = abs(num);
            if (nums[absNum - 1] < 0) {
                res[0] = absNum;
            } else {
                nums[absNum - 1] *= -1;
            }
        }

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0 && i + 1 != res[0]) {
                res[1] = i + 1;
                return res;
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
    findErrorNums(nums) {
        const res = [0, 0];

        for (let num of nums) {
            const absNum = Math.abs(num);
            if (nums[absNum - 1] < 0) {
                res[0] = absNum;
            } else {
                nums[absNum - 1] *= -1;
            }
        }

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0 && i + 1 !== res[0]) {
                res[1] = i + 1;
                return res;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int[] res = new int[2];

        foreach (int num in nums) {
            int absNum = Math.Abs(num);
            if (nums[absNum - 1] < 0) {
                res[0] = absNum;
            } else {
                nums[absNum - 1] *= -1;
            }
        }

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] > 0 && i + 1 != res[0]) {
                res[1] = i + 1;
                return res;
            }
        }

        return res;
    }
}
```

```go
func findErrorNums(nums []int) []int {
    res := []int{0, 0}

    for _, num := range nums {
        absNum := num
        if absNum < 0 {
            absNum = -absNum
        }
        if nums[absNum-1] < 0 {
            res[0] = absNum
        } else {
            nums[absNum-1] *= -1
        }
    }

    for i := 0; i < len(nums); i++ {
        if nums[i] > 0 && i+1 != res[0] {
            res[1] = i + 1
            return res
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val res = intArrayOf(0, 0)

        for (num in nums) {
            val absNum = Math.abs(num)
            if (nums[absNum - 1] < 0) {
                res[0] = absNum
            } else {
                nums[absNum - 1] *= -1
            }
        }

        for (i in nums.indices) {
            if (nums[i] > 0 && i + 1 != res[0]) {
                res[1] = i + 1
                return res
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        var nums = nums
        var res = [0, 0]

        for num in nums {
            let absNum = abs(num)
            if nums[absNum - 1] < 0 {
                res[0] = absNum
            } else {
                nums[absNum - 1] *= -1
            }
        }

        for i in 0..<nums.count {
            if nums[i] > 0 && i + 1 != res[0] {
                res[1] = i + 1
                return res
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

## 5. Math

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        N = len(nums)
        x = 0 # duplicate - missing
        y = 0 # duplicate^2 - missing^2

        for i in range(1, N + 1):
            x += nums[i - 1] - i
            y += nums[i - 1]**2 - i**2

        missing = (y - x**2) // (2 * x)
        duplicate = missing + x
        return [duplicate, missing]
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int N = nums.length;
        int x = 0; // duplicate - missing
        int y = 0; // duplicate^2 - missing^2

        for (int i = 1; i <= N; i++) {
            x += nums[i - 1] - i;
            y += nums[i - 1] * nums[i - 1] - i * i;
        }

        int missing = (y - x * x) / (2 * x);
        int duplicate = missing + x;
        return new int[]{duplicate, missing};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        int N = nums.size();
        long long x = 0; // duplicate - missing
        long long y = 0; // duplicate^2 - missing^2

        for (int i = 1; i <= N; i++) {
            x += nums[i - 1] - i;
            y += (long long)nums[i - 1] * nums[i - 1] - (long long)i * i;
        }

        int missing = (y - x * x) / (2 * x);
        int duplicate = missing + x;
        return {duplicate, missing};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findErrorNums(nums) {
        const N = nums.length;
        let x = 0; // duplicate - missing
        let y = 0; // duplicate^2 - missing^2

        for (let i = 1; i <= N; i++) {
            x += nums[i - 1] - i;
            y += nums[i - 1] ** 2 - i ** 2;
        }

        const missing = (y - x ** 2) / (2 * x);
        const duplicate = missing + x;
        return [duplicate, missing];
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int N = nums.Length;
        long x = 0; // duplicate - missing
        long y = 0; // duplicate^2 - missing^2

        for (int i = 1; i <= N; i++) {
            x += nums[i - 1] - i;
            y += (long)nums[i - 1] * nums[i - 1] - (long)i * i;
        }

        int missing = (int)((y - x * x) / (2 * x));
        int duplicate = (int)(missing + x);
        return new int[] { duplicate, missing };
    }
}
```

```go
func findErrorNums(nums []int) []int {
    N := len(nums)
    x := 0 // duplicate - missing
    y := 0 // duplicate^2 - missing^2

    for i := 1; i <= N; i++ {
        x += nums[i-1] - i
        y += nums[i-1]*nums[i-1] - i*i
    }

    missing := (y - x*x) / (2 * x)
    duplicate := missing + x
    return []int{duplicate, missing}
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val N = nums.size
        var x = 0L // duplicate - missing
        var y = 0L // duplicate^2 - missing^2

        for (i in 1..N) {
            x += nums[i - 1] - i
            y += nums[i - 1].toLong() * nums[i - 1] - i.toLong() * i
        }

        val missing = ((y - x * x) / (2 * x)).toInt()
        val duplicate = missing + x.toInt()
        return intArrayOf(duplicate, missing)
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        let N = nums.count
        var x = 0 // duplicate - missing
        var y = 0 // duplicate^2 - missing^2

        for i in 1...N {
            x += nums[i - 1] - i
            y += nums[i - 1] * nums[i - 1] - i * i
        }

        let missing = (y - x * x) / (2 * x)
        let duplicate = missing + x
        return [duplicate, missing]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 6. Bitwise XOR

::tabs-start

```python
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        N = len(nums)
        # a ^ a = 0
        # xorr = (1 ^ 2 ^ ... N) ^ (nums[0] ^ nums[1] ^ ... nums[N - 1])
        # xorr = missing ^ duplicate
        xorr = 0
        for i in range(1, N + 1):
            xorr ^= i
            xorr ^= nums[i - 1]

        # bit that is set in only one number among (duplicate, missing),
        # will be set in (duplicate ^ missing)
        # take rightMost set bit for simplicity
        rightMostBit = xorr & ~(xorr - 1)

        # divide numbers (from nums, from [1, N]) into two sets w.r.t the rightMostBit
        # xorr the numbers of these sets independently
        x = y = 0
        for i in range(1, N + 1):
            if i & rightMostBit:
                x ^= i
            else:
                y ^= i

            if nums[i - 1] & rightMostBit:
                x ^= nums[i - 1]
            else:
                y ^= nums[i - 1]

        # identify the duplicate number from x and y
        for num in nums:
            if num == x:
                return [x, y]
        return [y, x]
```

```java
public class Solution {
    public int[] findErrorNums(int[] nums) {
        int N = nums.length;
        // a ^ a = 0
        // xorr = (1 ^ 2 ^ ... N) ^ (nums[0] ^ nums[1] ^ ... nums[N - 1])
        // xorr = missing ^ duplicate
        int xorr = 0;
        for (int i = 1; i <= N; i++) {
            xorr ^= i;
            xorr ^= nums[i - 1];
        }

        // bit that is set in only one number among (duplicate, missing),
        // will be set in (duplicate ^ missing)
        // take rightMost set bit for simplicity
        int rightMostBit = xorr & ~(xorr - 1);

        // divide numbers (from nums, from [1, N]) into two sets w.r.t the rightMostBit
        // xorr the numbers of these sets independently
        int x = 0, y = 0;
        for (int i = 1; i <= N; i++) {
            if ((i & rightMostBit) != 0) {
                x ^= i;
            } else {
                y ^= i;
            }

            if ((nums[i - 1] & rightMostBit) != 0) {
                x ^= nums[i - 1];
            } else {
                y ^= nums[i - 1];
            }
        }

        // identify the duplicate number from x and y
        for (int num : nums) {
            if (num == x) {
                return new int[]{x, y};
            }
        }
        return new int[]{y, x};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        int N = nums.size();
        // a ^ a = 0
        // xorr = (1 ^ 2 ^ ... N) ^ (nums[0] ^ nums[1] ^ ... nums[N - 1])
        // xorr = missing ^ duplicate
        int xorr = 0;
        for (int i = 1; i <= N; i++) {
            xorr ^= i;
            xorr ^= nums[i - 1];
        }

        // bit that is set in only one number among (duplicate, missing),
        // will be set in (duplicate ^ missing)
        // take rightMost set bit for simplicity
        int rightMostBit = xorr & ~(xorr - 1);

        // divide numbers (from nums, from [1, N]) into two sets w.r.t the rightMostBit
        // xorr the numbers of these sets independently
        int x = 0, y = 0;
        for (int i = 1; i <= N; i++) {
            if (i & rightMostBit) {
                x ^= i;
            } else {
                y ^= i;
            }

            if (nums[i - 1] & rightMostBit) {
                x ^= nums[i - 1];
            } else {
                y ^= nums[i - 1];
            }
        }

        // identify the duplicate number from x and y
        for (int num : nums) {
            if (num == x) {
                return {x, y};
            }
        }
        return {y, x};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findErrorNums(nums) {
        const N = nums.length;
        // a ^ a = 0
        // xorr = (1 ^ 2 ^ ... N) ^ (nums[0] ^ nums[1] ^ ... nums[N - 1])
        // xorr = missing ^ duplicate
        let xorr = 0;
        for (let i = 1; i <= N; i++) {
            xorr ^= i;
            xorr ^= nums[i - 1];
        }

        // bit that is set in only one number among (duplicate, missing),
        // will be set in (duplicate ^ missing)
        // take rightMost set bit for simplicity
        const rightMostBit = xorr & ~(xorr - 1);

        // divide numbers (from nums, from [1, N]) into two sets w.r.t the rightMostBit
        // xorr the numbers of these sets independently
        let x = 0,
            y = 0;
        for (let i = 1; i <= N; i++) {
            if (i & rightMostBit) {
                x ^= i;
            } else {
                y ^= i;
            }

            if (nums[i - 1] & rightMostBit) {
                x ^= nums[i - 1];
            } else {
                y ^= nums[i - 1];
            }
        }

        // identify the duplicate number from x and y
        for (let num of nums) {
            if (num === x) {
                return [x, y];
            }
        }
        return [y, x];
    }
}
```

```csharp
public class Solution {
    public int[] FindErrorNums(int[] nums) {
        int N = nums.Length;
        int xorr = 0;
        for (int i = 1; i <= N; i++) {
            xorr ^= i;
            xorr ^= nums[i - 1];
        }

        int rightMostBit = xorr & ~(xorr - 1);

        int x = 0, y = 0;
        for (int i = 1; i <= N; i++) {
            if ((i & rightMostBit) != 0) {
                x ^= i;
            } else {
                y ^= i;
            }

            if ((nums[i - 1] & rightMostBit) != 0) {
                x ^= nums[i - 1];
            } else {
                y ^= nums[i - 1];
            }
        }

        foreach (int num in nums) {
            if (num == x) {
                return new int[] { x, y };
            }
        }
        return new int[] { y, x };
    }
}
```

```go
func findErrorNums(nums []int) []int {
    N := len(nums)
    xorr := 0
    for i := 1; i <= N; i++ {
        xorr ^= i
        xorr ^= nums[i-1]
    }

    rightMostBit := xorr & ^(xorr - 1)

    x, y := 0, 0
    for i := 1; i <= N; i++ {
        if i&rightMostBit != 0 {
            x ^= i
        } else {
            y ^= i
        }

        if nums[i-1]&rightMostBit != 0 {
            x ^= nums[i-1]
        } else {
            y ^= nums[i-1]
        }
    }

    for _, num := range nums {
        if num == x {
            return []int{x, y}
        }
    }
    return []int{y, x}
}
```

```kotlin
class Solution {
    fun findErrorNums(nums: IntArray): IntArray {
        val N = nums.size
        var xorr = 0
        for (i in 1..N) {
            xorr = xorr xor i
            xorr = xorr xor nums[i - 1]
        }

        val rightMostBit = xorr and (xorr - 1).inv()

        var x = 0
        var y = 0
        for (i in 1..N) {
            if (i and rightMostBit != 0) {
                x = x xor i
            } else {
                y = y xor i
            }

            if (nums[i - 1] and rightMostBit != 0) {
                x = x xor nums[i - 1]
            } else {
                y = y xor nums[i - 1]
            }
        }

        for (num in nums) {
            if (num == x) {
                return intArrayOf(x, y)
            }
        }
        return intArrayOf(y, x)
    }
}
```

```swift
class Solution {
    func findErrorNums(_ nums: [Int]) -> [Int] {
        let N = nums.count
        var xorr = 0
        for i in 1...N {
            xorr ^= i
            xorr ^= nums[i - 1]
        }

        let rightMostBit = xorr & ~(xorr - 1)

        var x = 0
        var y = 0
        for i in 1...N {
            if i & rightMostBit != 0 {
                x ^= i
            } else {
                y ^= i
            }

            if nums[i - 1] & rightMostBit != 0 {
                x ^= nums[i - 1]
            } else {
                y ^= nums[i - 1]
            }
        }

        for num in nums {
            if num == x {
                return [x, y]
            }
        }
        return [y, x]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
