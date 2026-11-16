## 1. Convert to String

::tabs-start

```python
class Solution:
    def sumOfDigits(self, nums: List[int]) -> int:
        mn = min(nums)
        total = 0
        for c in str(mn):
            total += int(c)
        return 1 if total % 2 == 0 else 0
```

```java
public class Solution {
    public int sumOfDigits(int[] nums) {
        int mn = Arrays.stream(nums).min().getAsInt();
        int total = 0;
        for (char c : String.valueOf(mn).toCharArray()) {
            total += c - '0';
        }
        return total % 2 == 0 ? 1 : 0;
    }
}
```

```cpp
class Solution {
public:
    int sumOfDigits(vector<int>& nums) {
        int mn = *min_element(nums.begin(), nums.end());
        int total = 0;
        for (char c : to_string(mn)) {
            total += c - '0';
        }
        return total % 2 == 0 ? 1 : 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumOfDigits(nums) {
        const mn = Math.min(...nums);
        let total = 0;
        for (const c of String(mn)) {
            total += Number(c);
        }
        return total % 2 === 0 ? 1 : 0;
    }
}
```

```csharp
public class Solution {
    public int SumOfDigits(int[] nums) {
        int mn = nums.Min();
        int total = 0;
        foreach (char c in mn.ToString()) {
            total += c - '0';
        }
        return total % 2 == 0 ? 1 : 0;
    }
}
```

```go
func sumOfDigits(nums []int) int {
    mn := nums[0]
    for _, num := range nums {
        mn = min(mn, num)
    }
    total := 0
    for _, c := range strconv.Itoa(mn) {
        total += int(c - '0')
    }
    if total%2 == 0 {
        return 1
    }
    return 0
}
```

```kotlin
class Solution {
    fun sumOfDigits(nums: IntArray): Int {
        var mn = nums[0]
        for (num in nums) {
            mn = minOf(mn, num)
        }
        var total = 0
        for (c in mn.toString()) {
            total += c - '0'
        }
        return if (total % 2 == 0) 1 else 0
    }
}
```

```swift
class Solution {
    func sumOfDigits(_ nums: [Int]) -> Int {
        let mn = nums.min()!
        var total = 0
        for c in String(mn) {
            total += c.wholeNumberValue!
        }
        return total % 2 == 0 ? 1 : 0
    }
}
```

```rust
impl Solution {
    pub fn sum_of_digits(nums: Vec<i32>) -> i32 {
        let mn = *nums.iter().min().unwrap();
        let mut total = 0;
        for c in mn.to_string().chars() {
            total += c.to_digit(10).unwrap() as i32;
        }
        if total % 2 == 0 { 1 } else { 0 }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumOfDigits(nums: number[]): number {
        const mn = Math.min(...nums);
        let total = 0;
        for (const c of String(mn)) {
            total += Number(c);
        }
        return total % 2 === 0 ? 1 : 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + \log m)$
- Space complexity: $O(\log m)$

> Where $n$ is the length of the array $nums$ and $m$ is the minimum value in $nums$.

---

## 2. Math

::tabs-start

```python
class Solution:
    def sumOfDigits(self, nums: List[int]) -> int:
        mn = min(nums)
        total = 0
        while mn > 0:
            total += mn % 10
            mn //= 10
        return 1 if total % 2 == 0 else 0
```

```java
public class Solution {
    public int sumOfDigits(int[] nums) {
        int mn = Arrays.stream(nums).min().getAsInt();
        int total = 0;
        while (mn > 0) {
            total += mn % 10;
            mn /= 10;
        }
        return total % 2 == 0 ? 1 : 0;
    }
}
```

```cpp
class Solution {
public:
    int sumOfDigits(vector<int>& nums) {
        int mn = *min_element(nums.begin(), nums.end());
        int total = 0;
        while (mn > 0) {
            total += mn % 10;
            mn /= 10;
        }
        return total % 2 == 0 ? 1 : 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumOfDigits(nums) {
        let mn = Math.min(...nums);
        let total = 0;
        while (mn > 0) {
            total += mn % 10;
            mn = Math.floor(mn / 10);
        }
        return total % 2 === 0 ? 1 : 0;
    }
}
```

```csharp
public class Solution {
    public int SumOfDigits(int[] nums) {
        int mn = nums.Min();
        int total = 0;
        while (mn > 0) {
            total += mn % 10;
            mn /= 10;
        }
        return total % 2 == 0 ? 1 : 0;
    }
}
```

```go
func sumOfDigits(nums []int) int {
    mn := nums[0]
    for _, num := range nums {
        mn = min(mn, num)
    }
    total := 0
    for mn > 0 {
        total += mn % 10
        mn /= 10
    }
    if total%2 == 0 {
        return 1
    }
    return 0
}
```

```kotlin
class Solution {
    fun sumOfDigits(nums: IntArray): Int {
        var mn = nums[0]
        for (num in nums) {
            mn = minOf(mn, num)
        }
        var total = 0
        while (mn > 0) {
            total += mn % 10
            mn /= 10
        }
        return if (total % 2 == 0) 1 else 0
    }
}
```

```swift
class Solution {
    func sumOfDigits(_ nums: [Int]) -> Int {
        var mn = nums.min()!
        var total = 0
        while mn > 0 {
            total += mn % 10
            mn /= 10
        }
        return total % 2 == 0 ? 1 : 0
    }
}
```

```rust
impl Solution {
    pub fn sum_of_digits(nums: Vec<i32>) -> i32 {
        let mut mn = *nums.iter().min().unwrap();
        let mut total = 0;
        while mn > 0 {
            total += mn % 10;
            mn /= 10;
        }
        if total % 2 == 0 { 1 } else { 0 }
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    sumOfDigits(nums: number[]): number {
        let mn = Math.min(...nums);
        let total = 0;
        while (mn > 0) {
            total += mn % 10;
            mn = Math.floor(mn / 10);
        }
        return total % 2 === 0 ? 1 : 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + \log m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $nums$ and $m$ is the minimum value in $nums$.
