## 1. Brute Force

::tabs-start

```python
class Solution:
    def dietPlanPerformance(self, calories: List[int], k: int, lower: int, upper: int) -> int:
        res = 0
        for i in range(len(calories) - k + 1):
            total = 0
            for j in range(i, i + k):
                total += calories[j]
            if total < lower:
                res -= 1
            elif total > upper:
                res += 1
        return res
```

```java
public class Solution {
    public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int res = 0;
        for (int i = 0; i + k <= calories.length; i++) {
            int total = 0;
            for (int j = i; j < i + k; j++) {
                total += calories[j];
            }
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int dietPlanPerformance(vector<int>& calories, int k, int lower, int upper) {
        int res = 0;
        for (int i = 0; i + k <= calories.size(); i++) {
            int total = 0;
            for (int j = i; j < i + k; j++) {
                total += calories[j];
            }
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(calories, k, lower, upper) {
        let res = 0;
        for (let i = 0; i + k <= calories.length; i++) {
            let total = 0;
            for (let j = i; j < i + k; j++) {
                total += calories[j];
            }
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int DietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int res = 0;
        for (int i = 0; i + k <= calories.Length; i++) {
            int total = 0;
            for (int j = i; j < i + k; j++) {
                total += calories[j];
            }
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```go
func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
    res := 0
    for i := 0; i+k <= len(calories); i++ {
        total := 0
        for j := i; j < i+k; j++ {
            total += calories[j]
        }
        if total < lower {
            res--
        } else if total > upper {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun dietPlanPerformance(calories: IntArray, k: Int, lower: Int, upper: Int): Int {
        var res = 0
        for (i in 0..calories.size - k) {
            var total = 0
            for (j in i until i + k) {
                total += calories[j]
            }
            if (total < lower) {
                res--
            } else if (total > upper) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func dietPlanPerformance(_ calories: [Int], _ k: Int, _ lower: Int, _ upper: Int) -> Int {
        var res = 0
        for i in 0...(calories.count - k) {
            var total = 0
            for j in i..<(i + k) {
                total += calories[j]
            }
            if total < lower {
                res -= 1
            } else if total > upper {
                res += 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn diet_plan_performance(calories: Vec<i32>, k: i32, lower: i32, upper: i32) -> i32 {
        let k = k as usize;
        let mut res = 0;
        for i in 0..=calories.len() - k {
            let mut total = 0;
            for j in i..i + k {
                total += calories[j];
            }
            if total < lower {
                res -= 1;
            } else if total > upper {
                res += 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(
        calories: number[],
        k: number,
        lower: number,
        upper: number,
    ): number {
        let res = 0;
        for (let i = 0; i + k <= calories.length; i++) {
            let total = 0;
            for (let j = i; j < i + k; j++) {
                total += calories[j];
            }
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $calories$ and $k$ is the window size.

---

## 2. Prefix Sum

::tabs-start

```python
class Solution:
    def dietPlanPerformance(self, calories: List[int], k: int, lower: int, upper: int) -> int:
        n = len(calories)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + calories[i]

        res = 0
        for i in range(k, n + 1):
            total = prefix[i] - prefix[i - k]
            if total < lower:
                res -= 1
            elif total > upper:
                res += 1
        return res
```

```java
public class Solution {
    public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int n = calories.length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        int res = 0;
        for (int i = k; i <= n; i++) {
            int total = prefix[i] - prefix[i - k];
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int dietPlanPerformance(vector<int>& calories, int k, int lower, int upper) {
        int n = calories.size();
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        int res = 0;
        for (int i = k; i <= n; i++) {
            int total = prefix[i] - prefix[i - k];
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(calories, k, lower, upper) {
        const n = calories.length;
        const prefix = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        let res = 0;
        for (let i = k; i <= n; i++) {
            const total = prefix[i] - prefix[i - k];
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int DietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int n = calories.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        int res = 0;
        for (int i = k; i <= n; i++) {
            int total = prefix[i] - prefix[i - k];
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

```go
func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
    n := len(calories)
    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + calories[i]
    }

    res := 0
    for i := k; i <= n; i++ {
        total := prefix[i] - prefix[i-k]
        if total < lower {
            res--
        } else if total > upper {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun dietPlanPerformance(calories: IntArray, k: Int, lower: Int, upper: Int): Int {
        val n = calories.size
        val prefix = IntArray(n + 1)
        for (i in 0 until n) {
            prefix[i + 1] = prefix[i] + calories[i]
        }

        var res = 0
        for (i in k..n) {
            val total = prefix[i] - prefix[i - k]
            if (total < lower) {
                res--
            } else if (total > upper) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func dietPlanPerformance(_ calories: [Int], _ k: Int, _ lower: Int, _ upper: Int) -> Int {
        let n = calories.count
        var prefix = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefix[i + 1] = prefix[i] + calories[i]
        }

        var res = 0
        for i in k...n {
            let total = prefix[i] - prefix[i - k]
            if total < lower {
                res -= 1
            } else if total > upper {
                res += 1
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn diet_plan_performance(calories: Vec<i32>, k: i32, lower: i32, upper: i32) -> i32 {
        let n = calories.len();
        let k = k as usize;
        let mut prefix = vec![0; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        let mut res = 0;
        for i in k..=n {
            let total = prefix[i] - prefix[i - k];
            if total < lower {
                res -= 1;
            } else if total > upper {
                res += 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(
        calories: number[],
        k: number,
        lower: number,
        upper: number,
    ): number {
        const n = calories.length;
        const prefix: number[] = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + calories[i];
        }

        let res = 0;
        for (let i = k; i <= n; i++) {
            const total = prefix[i] - prefix[i - k];
            if (total < lower) {
                res--;
            } else if (total > upper) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the array $calories$.

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def dietPlanPerformance(self, calories: List[int], k: int, lower: int, upper: int) -> int:
        res = total = 0
        for i in range(len(calories)):
            total += calories[i]
            if i >= k:
                total -= calories[i - k]
            if i >= k - 1:
                if total < lower:
                    res -= 1
                elif total > upper:
                    res += 1
        return res
```

```java
public class Solution {
    public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int res = 0, total = 0;
        for (int i = 0; i < calories.length; i++) {
            total += calories[i];
            if (i >= k) {
                total -= calories[i - k];
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--;
                } else if (total > upper) {
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
    int dietPlanPerformance(vector<int>& calories, int k, int lower, int upper) {
        int res = 0, total = 0;
        for (int i = 0; i < calories.size(); i++) {
            total += calories[i];
            if (i >= k) {
                total -= calories[i - k];
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--;
                } else if (total > upper) {
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
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(calories, k, lower, upper) {
        let res = 0,
            total = 0;
        for (let i = 0; i < calories.length; i++) {
            total += calories[i];
            if (i >= k) {
                total -= calories[i - k];
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--;
                } else if (total > upper) {
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
    public int DietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int res = 0, total = 0;
        for (int i = 0; i < calories.Length; i++) {
            total += calories[i];
            if (i >= k) {
                total -= calories[i - k];
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--;
                } else if (total > upper) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
    res, total := 0, 0
    for i := 0; i < len(calories); i++ {
        total += calories[i]
        if i >= k {
            total -= calories[i-k]
        }
        if i >= k-1 {
            if total < lower {
                res--
            } else if total > upper {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun dietPlanPerformance(calories: IntArray, k: Int, lower: Int, upper: Int): Int {
        var res = 0
        var total = 0
        for (i in calories.indices) {
            total += calories[i]
            if (i >= k) {
                total -= calories[i - k]
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--
                } else if (total > upper) {
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
    func dietPlanPerformance(_ calories: [Int], _ k: Int, _ lower: Int, _ upper: Int) -> Int {
        var res = 0
        var total = 0
        for i in 0..<calories.count {
            total += calories[i]
            if i >= k {
                total -= calories[i - k]
            }
            if i >= k - 1 {
                if total < lower {
                    res -= 1
                } else if total > upper {
                    res += 1
                }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn diet_plan_performance(calories: Vec<i32>, k: i32, lower: i32, upper: i32) -> i32 {
        let k = k as usize;
        let (mut res, mut total) = (0, 0);
        for i in 0..calories.len() {
            total += calories[i];
            if i >= k {
                total -= calories[i - k];
            }
            if i + 1 >= k {
                if total < lower {
                    res -= 1;
                } else if total > upper {
                    res += 1;
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} calories
     * @param {number} k
     * @param {number} lower
     * @param {number} upper
     * @return {number}
     */
    dietPlanPerformance(
        calories: number[],
        k: number,
        lower: number,
        upper: number,
    ): number {
        let res = 0,
            total = 0;
        for (let i = 0; i < calories.length; i++) {
            total += calories[i];
            if (i >= k) {
                total -= calories[i - k];
            }
            if (i >= k - 1) {
                if (total < lower) {
                    res--;
                } else if (total > upper) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the array $calories$.
