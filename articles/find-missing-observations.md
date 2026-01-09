## 1. Math - I

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
