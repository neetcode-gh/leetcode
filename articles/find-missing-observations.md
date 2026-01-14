## 1. Math - I

### Intuition

We know the target mean and the sum of the existing rolls. From this, we can calculate the total sum needed for all `n + m` dice, and therefore the sum required for the `n` missing dice. If this required sum is impossible (less than `n` or greater than `6 * n`), no valid solution exists. Otherwise, we greedily assign values to each die, giving each one as high a value as possible while ensuring the remaining dice can still reach at least `1` each.

### Algorithm

1. Calculate the required sum for the `n` missing dice: `nTotal = mean * (n + m) - sum(rolls)`.
2. If `nTotal < n` or `nTotal > 6 * n`, return an empty array (no valid solution).
3. For each of the `n` missing dice:
   - Assign the maximum possible value while leaving enough for the remaining dice to each have at least `1`.
   - The value is `min(nTotal - (remaining dice) + 1, 6)`.
   - Subtract this value from `nTotal` and decrement the remaining count.
4. Return the constructed result array.

::tabs-start

```python
class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        m = len(rolls)
        nTotal = (mean * (n + m)) - sum(rolls)

        if nTotal < n or nTotal > n * 6:
            return []

        res = []
        while nTotal:
            dice = min(nTotal - n + 1, 6)
            res.append(dice)
            nTotal -= dice
            n -= 1
        return res
```

```java
public class Solution {
    public int[] missingRolls(int[] rolls, int mean, int n) {
        int m = rolls.length;
        int nTotal = (mean * (n + m)) - Arrays.stream(rolls).sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int dice = Math.min(nTotal - (n - i - 1), 6);
            res[i] = dice;
            nTotal -= dice;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> missingRolls(vector<int>& rolls, int mean, int n) {
        int m = rolls.size();
        int nTotal = (mean * (n + m)) - accumulate(rolls.begin(), rolls.end(), 0);

        if (nTotal < n || nTotal > n * 6) {
            return {};
        }

        vector<int> res;
        for (int i = 0; i < n; ++i) {
            int dice = min(nTotal - (n - i - 1), 6);
            res.push_back(dice);
            nTotal -= dice;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} rolls
     * @param {number} mean
     * @param {number} n
     * @return {number[]}
     */
    missingRolls(rolls, mean, n) {
        const m = rolls.length;
        let nTotal =
            mean * (n + m) - rolls.reduce((sum, roll) => sum + roll, 0);

        if (nTotal < n || nTotal > n * 6) {
            return [];
        }

        const res = [];
        while (nTotal > 0) {
            const dice = Math.min(nTotal - n + 1, 6);
            res.push(dice);
            nTotal -= dice;
            n--;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] MissingRolls(int[] rolls, int mean, int n) {
        int m = rolls.Length;
        int nTotal = (mean * (n + m)) - rolls.Sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int dice = Math.Min(nTotal - (n - i - 1), 6);
            res[i] = dice;
            nTotal -= dice;
        }
        return res;
    }
}
```

```go
func missingRolls(rolls []int, mean int, n int) []int {
    m := len(rolls)
    sum := 0
    for _, roll := range rolls {
        sum += roll
    }
    nTotal := (mean * (n + m)) - sum

    if nTotal < n || nTotal > n*6 {
        return []int{}
    }

    res := make([]int, 0, n)
    for nTotal > 0 {
        dice := nTotal - n + 1
        if dice > 6 {
            dice = 6
        }
        res = append(res, dice)
        nTotal -= dice
        n--
    }
    return res
}
```

```kotlin
class Solution {
    fun missingRolls(rolls: IntArray, mean: Int, n: Int): IntArray {
        val m = rolls.size
        var nTotal = (mean * (n + m)) - rolls.sum()

        if (nTotal < n || nTotal > n * 6) {
            return intArrayOf()
        }

        val res = mutableListOf<Int>()
        var remaining = n
        while (nTotal > 0) {
            val dice = minOf(nTotal - remaining + 1, 6)
            res.add(dice)
            nTotal -= dice
            remaining--
        }
        return res.toIntArray()
    }
}
```

```swift
class Solution {
    func missingRolls(_ rolls: [Int], _ mean: Int, _ n: Int) -> [Int] {
        let m = rolls.count
        var nTotal = (mean * (n + m)) - rolls.reduce(0, +)

        if nTotal < n || nTotal > n * 6 {
            return []
        }

        var res = [Int]()
        var remaining = n
        while nTotal > 0 {
            let dice = min(nTotal - remaining + 1, 6)
            res.append(dice)
            nTotal -= dice
            remaining -= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

> Where $m$ is the size of the array $rolls$ and $n$ is the number of missing observations.

---

## 2. Math - II

### Intuition

Instead of greedily assigning values one at a time, we can distribute the required sum more evenly. First, compute the average value each die should have by dividing the total needed by `n`. The remainder tells us how many dice need to be one higher than the average. This produces a cleaner distribution where most dice have the same value.

### Algorithm

1. Calculate the required sum for the `n` missing dice: `nTotal = mean * (n + m) - sum(rolls)`.
2. If `nTotal < n` or `nTotal > 6 * n`, return an empty array.
3. Compute the base average: `avg = nTotal / n`.
4. Compute the remainder: `rem = nTotal - (avg * n)`.
5. Create the result with `(n - rem)` dice having value `avg` and `rem` dice having value `avg + 1`.
6. Return the result array.

::tabs-start

```python
class Solution:
    def missingRolls(self, rolls: List[int], mean: int, n: int) -> List[int]:
        m = len(rolls)
        nTotal = (mean * (n + m)) - sum(rolls)

        if nTotal < n or nTotal > n * 6:
            return []

        avg = nTotal // n
        rem = nTotal - (avg * n)
        return [avg] * (n - rem) + [avg + 1] * rem
```

```java
public class Solution {
    public int[] missingRolls(int[] rolls, int mean, int n) {
        int m = rolls.length;
        int nTotal = (mean * (n + m)) - Arrays.stream(rolls).sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int avg = nTotal / n;
        int rem = nTotal - (avg * n);
        int[] res = new int[n];

        for (int i = 0; i < n - rem; i++) {
            res[i] = avg;
        }
        for (int i = n - rem; i < n; i++) {
            res[i] = avg + 1;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> missingRolls(vector<int>& rolls, int mean, int n) {
        int m = rolls.size();
        int nTotal = (mean * (n + m)) - accumulate(rolls.begin(), rolls.end(), 0);

        if (nTotal < n || nTotal > n * 6) {
            return {};
        }

        int avg = nTotal / n;
        int rem = nTotal - (avg * n);
        vector<int> res;

        for (int i = 0; i < n - rem; ++i) {
            res.push_back(avg);
        }
        for (int i = 0; i < rem; ++i) {
            res.push_back(avg + 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} rolls
     * @param {number} mean
     * @param {number} n
     * @return {number[]}
     */
    missingRolls(rolls, mean, n) {
        const m = rolls.length;
        const nTotal =
            mean * (n + m) - rolls.reduce((sum, roll) => sum + roll, 0);

        if (nTotal < n || nTotal > n * 6) {
            return [];
        }

        const avg = Math.floor(nTotal / n);
        const rem = nTotal - avg * n;
        return Array(n - rem)
            .fill(avg)
            .concat(Array(rem).fill(avg + 1));
    }
}
```

```csharp
public class Solution {
    public int[] MissingRolls(int[] rolls, int mean, int n) {
        int m = rolls.Length;
        int nTotal = (mean * (n + m)) - rolls.Sum();

        if (nTotal < n || nTotal > n * 6) {
            return new int[0];
        }

        int avg = nTotal / n;
        int rem = nTotal - (avg * n);
        int[] res = new int[n];

        for (int i = 0; i < n - rem; i++) {
            res[i] = avg;
        }
        for (int i = n - rem; i < n; i++) {
            res[i] = avg + 1;
        }

        return res;
    }
}
```

```go
func missingRolls(rolls []int, mean int, n int) []int {
    m := len(rolls)
    sum := 0
    for _, roll := range rolls {
        sum += roll
    }
    nTotal := (mean * (n + m)) - sum

    if nTotal < n || nTotal > n*6 {
        return []int{}
    }

    avg := nTotal / n
    rem := nTotal - (avg * n)
    res := make([]int, n)

    for i := 0; i < n-rem; i++ {
        res[i] = avg
    }
    for i := n - rem; i < n; i++ {
        res[i] = avg + 1
    }

    return res
}
```

```kotlin
class Solution {
    fun missingRolls(rolls: IntArray, mean: Int, n: Int): IntArray {
        val m = rolls.size
        val nTotal = (mean * (n + m)) - rolls.sum()

        if (nTotal < n || nTotal > n * 6) {
            return intArrayOf()
        }

        val avg = nTotal / n
        val rem = nTotal - (avg * n)
        val res = IntArray(n)

        for (i in 0 until n - rem) {
            res[i] = avg
        }
        for (i in n - rem until n) {
            res[i] = avg + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func missingRolls(_ rolls: [Int], _ mean: Int, _ n: Int) -> [Int] {
        let m = rolls.count
        let nTotal = (mean * (n + m)) - rolls.reduce(0, +)

        if nTotal < n || nTotal > n * 6 {
            return []
        }

        let avg = nTotal / n
        let rem = nTotal - (avg * n)
        var res = [Int](repeating: avg, count: n - rem)
        res += [Int](repeating: avg + 1, count: rem)

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

> Where $m$ is the size of the array $rolls$ and $n$ is the number of missing observations.

## Common Pitfalls

### Forgetting to Validate the Required Sum

Before constructing the result, you must check that `nTotal` (the required sum for missing dice) falls within the valid range `[n, 6*n]`. If `nTotal < n`, it is impossible to assign at least 1 to each die. If `nTotal > 6*n`, it is impossible even if all dice show 6. Failing to return an empty array in these cases leads to incorrect or invalid outputs.

### Integer Overflow When Computing Total Sum

When calculating `mean * (n + m)`, both `n` and `m` can be large (up to 10^5), and the mean can be up to 6. The product can exceed the range of 32-bit integers in some languages. Ensure you use appropriate data types (e.g., `long` in Java) or rely on languages with arbitrary precision integers to avoid overflow.

### Off-by-One Errors in Greedy Assignment

When greedily assigning values, the formula `min(nTotal - remaining + 1, 6)` requires careful handling of the remaining count. If you decrement the count at the wrong time or miscalculate how much "room" is left for future dice, you may assign invalid values (less than 1 or greater than 6) or fail to distribute the sum correctly.
