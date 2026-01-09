## 1. Brute Force

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        n = len(nums)
        for num in nums:
            count = sum(1 for i in nums if i == num)
            if count > n // 2:
                return num
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        int n = nums.length;
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) {
                    count++;
                }
            }
            if (count > n / 2) {
                return num;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();
        for (int num : nums) {
            int count = 0;
            for (int i : nums) {
                if (i == num) {
                    count++;
                }
            }
            if (count > n / 2) {
                return num;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    majorityElement(nums) {
        let n = nums.length;
        for (let num of nums) {
            let count = nums.reduce(
                (acc, val) => acc + (val === num ? 1 : 0),
                0,
            );
            if (count > Math.floor(n / 2)) {
                return num;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int MajorityElement(int[] nums) {
        int n = nums.Length;
        foreach (int num in nums) {
            int count = 0;
            foreach (int i in nums) {
                if (i == num) {
                    count++;
                }
            }
            if (count > n / 2) {
                return num;
            }
        }
        return -1;
    }
}
```

```go
func majorityElement(nums []int) int {
    n := len(nums)
    for _, num := range nums {
        count := 0
        for _, i := range nums {
            if i == num {
                count++
            }
        }
        if count > n/2 {
            return num
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        val n = nums.size
        for (num in nums) {
            var count = 0
            for (i in nums) {
                if (i == num) {
                    count++
                }
            }
            if (count > n / 2) {
                return num
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        let n = nums.count
        for num in nums {
            var count = 0
            for i in nums {
                if i == num {
                    count += 1
                }
            }
            if count > n / 2 {
                return num
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        count = defaultdict(int)
        res = maxCount = 0

        for num in nums:
            count[num] += 1
            if maxCount < count[num]:
                res = num
                maxCount = count[num]
        return res
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int res = 0, maxCount = 0;

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
            if (count.get(num) > maxCount) {
                res = num;
                maxCount = count.get(num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> count;
        int res = 0, maxCount = 0;

        for (int num : nums) {
            count[num]++;
            if (count[num] > maxCount) {
                res = num;
                maxCount = count[num];
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
     * @return {number}
     */
    majorityElement(nums) {
        const count = new Map();
        let res = 0,
            maxCount = 0;

        for (let num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
            if (count.get(num) > maxCount) {
                res = num;
                maxCount = count.get(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MajorityElement(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int res = 0, maxCount = 0;

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;

            if (count[num] > maxCount) {
                res = num;
                maxCount = count[num];
            }
        }

        return res;
    }
}
```

```go
func majorityElement(nums []int) int {
    count := make(map[int]int)
    res, maxCount := 0, 0

    for _, num := range nums {
        count[num]++
        if count[num] > maxCount {
            res = num
            maxCount = count[num]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        var res = 0
        var maxCount = 0

        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
            if (count[num]!! > maxCount) {
                res = num
                maxCount = count[num]!!
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        var res = 0
        var maxCount = 0

        for num in nums {
            count[num, default: 0] += 1
            if count[num]! > maxCount {
                res = num
                maxCount = count[num]!
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

## 3. Sorting

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        nums.sort()
        return nums[len(nums) // 2]
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() / 2];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    majorityElement(nums) {
        nums.sort();
        return nums[Math.floor(nums.length / 2)];
    }
}
```

```csharp
public class Solution {
    public int MajorityElement(int[] nums) {
        Array.Sort(nums);
        return nums[nums.Length / 2];
    }
}
```

```go
func majorityElement(nums []int) int {
    sort.Ints(nums)
    return nums[len(nums)/2]
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        nums.sort()
        return nums[nums.size / 2]
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        let sorted = nums.sorted()
        return sorted[nums.count / 2]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Bit Manipulation

::tabs-start

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        n = len(nums)
        bit = [0] * 32
        for num in nums:
            for i in range(32):
                bit[i] += ((num >> i) & 1)

        res = 0
        for i in range(32):
            if bit[i] > (n // 2):
                if i == 31:
                    res -= (1 << i)
                else:
                    res |= (1 << i)
        return res
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        int n = nums.length;
        int[] bit = new int[32];
        for (int num : nums) {
            for (int i = 0; i < 32; i++) {
                bit[i] += (num >> i) & 1;
            }
        }

        int res = 0;
        for (int i = 0; i < 32; i++) {
            if (bit[i] > n / 2) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();
        vector<int> bit(32, 0);
        for (int num : nums) {
            for (int i = 0; i < 32; i++) {
                bit[i] += (num >> i) & 1;
            }
        }

        int res = 0;
        for (int i = 0; i < 32; i++) {
            if (bit[i] > n / 2) {
                res |= (1 << i);
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
     * @return {number}
     */
    majorityElement(nums) {
        const n = nums.length;
        const bit = Array(32).fill(0);
        for (let num of nums) {
            for (let i = 0; i < 32; i++) {
                bit[i] += (num >> i) & 1;
            }
        }

        let res = 0;
        for (let i = 0; i < 32; i++) {
            if (bit[i] > Math.floor(n / 2)) {
                res |= 1 << i;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MajorityElement(int[] nums) {
        int n = nums.Length;
        int[] bit = new int[32];

        foreach (int num in nums) {
            for (int i = 0; i < 32; i++) {
                bit[i] += (num >> i) & 1;
            }
        }

        int res = 0;
        for (int i = 0; i < 32; i++) {
            if (bit[i] > n / 2) {
                res |= (1 << i);
            }
        }

        return res;
    }
}
```

```go
func majorityElement(nums []int) int {
    n := len(nums)
    bit := make([]int, 32)

    for _, num := range nums {
        for i := 0; i < 32; i++ {
            bit[i] += (num >> i) & 1
        }
    }

    res := 0
    for i := 0; i < 32; i++ {
        if bit[i] > n/2 {
            res |= (1 << i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        val n = nums.size
        val bit = IntArray(32)

        for (num in nums) {
            for (i in 0 until 32) {
                bit[i] += (num shr i) and 1
            }
        }

        var res = 0
        for (i in 0 until 32) {
            if (bit[i] > n / 2) {
                res = res or (1 shl i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        let n = nums.count
        var bit = [Int](repeating: 0, count: 32)

        for num in nums {
            for i in 0..<32 {
                bit[i] += (num >> i) & 1
            }
        }

        var res = 0
        for i in 0..<32 {
            if bit[i] > n / 2 {
                res |= (1 << i)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 32)$
- Space complexity: $O(32)$

> $32$ represents the number of bits as the given numbers are integers.

---

## 5. Boyer-Moore Voting Algorithm

::tabs-start

```python
class Solution:
    def majorityElement(self, nums):
        res = count = 0

        for num in nums:
            if count == 0:
                res = num
            count += (1 if num == res else -1)
        return res
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        int res = 0, count = 0;

        for (int num : nums) {
            if (count == 0) {
                res = num;
            }
            count += (num == res) ? 1 : -1;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int res = 0, count = 0;

        for (int num : nums) {
            if (count == 0) {
                res = num;
            }
            count += (num == res) ? 1 : -1;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    majorityElement(nums) {
        let res = 0,
            count = 0;

        for (let num of nums) {
            if (count === 0) {
                res = num;
            }
            count += num === res ? 1 : -1;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MajorityElement(int[] nums) {
        int res = 0, count = 0;

        foreach (int num in nums) {
            if (count == 0) {
                res = num;
            }
            count += (num == res) ? 1 : -1;
        }

        return res;
    }
}
```

```go
func majorityElement(nums []int) int {
    res, count := 0, 0

    for _, num := range nums {
        if count == 0 {
            res = num
        }
        if num == res {
            count++
        } else {
            count--
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        var res = 0
        var count = 0

        for (num in nums) {
            if (count == 0) {
                res = num
            }
            count += if (num == res) 1 else -1
        }
        return res
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        var res = 0
        var count = 0

        for num in nums {
            if count == 0 {
                res = num
            }
            count += (num == res) ? 1 : -1
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

## 6. Randomization

::tabs-start

```python
class Solution:
    def majorityElement(self, nums):
        n = len(nums)
        while True:
            candidate = random.choice(nums)
            if nums.count(candidate) > n // 2:
                return candidate
```

```java
public class Solution {
    public int majorityElement(int[] nums) {
        Random rand = new Random();
        int n = nums.length;

        while (true) {
            int candidate = nums[rand.nextInt(n)];
            int count = 0;
            for (int num : nums) {
                if (num == candidate) {
                    count++;
                }
            }
            if (count > n / 2) {
                return candidate;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();

        while (true) {
            int candidate = nums[rand() % n];
            int count = 0;
            for (int num : nums) {
                if (num == candidate) {
                    count++;
                }
            }
            if (count > n / 2) {
                return candidate;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    majorityElement(nums) {
        const n = nums.length;
        while (true) {
            const candidate = nums[Math.floor(Math.random() * n)];
            let count = 0;
            for (const num of nums) {
                if (num === candidate) {
                    count++;
                }
            }
            if (count > Math.floor(n / 2)) {
                return candidate;
            }
        }
    }
}
```

```csharp
public class Solution {
    private static Random random = new Random();

    public int MajorityElement(int[] nums) {
        int n = nums.Length;

        while (true) {
            int candidate = nums[random.Next(n)];
            int count = nums.Count(x => x == candidate);

            if (count > n / 2) {
                return candidate;
            }
        }
    }
}
```

```go
func majorityElement(nums []int) int {
    n := len(nums)

    for {
        candidate := nums[rand.Intn(n)]
        count := 0
        for _, num := range nums {
            if num == candidate {
                count++
            }
        }
        if count > n/2 {
            return candidate
        }
    }
}
```

```kotlin
class Solution {
    fun majorityElement(nums: IntArray): Int {
        val n = nums.size

        while (true) {
            val candidate = nums[kotlin.random.Random.nextInt(n)]
            var count = 0
            for (num in nums) {
                if (num == candidate) {
                    count++
                }
            }
            if (count > n / 2) {
                return candidate
            }
        }
    }
}
```

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        let n = nums.count

        while true {
            let candidate = nums[Int.random(in: 0..<n)]
            var count = 0
            for num in nums {
                if num == candidate {
                    count += 1
                }
            }
            if count > n / 2 {
                return candidate
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

> The probability of randomly choosing the majority element is greater than $50\%$, so the expected number of iterations in the outer while loop is constant.
