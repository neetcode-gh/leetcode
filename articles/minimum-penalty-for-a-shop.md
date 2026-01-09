## 1. Brute Force

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        n = len(customers)
        res = n
        minPenalty = n

        for i in range(n + 1):
            penalty = 0
            for j in range(i):
                if customers[j] == 'N':
                    penalty += 1
            for j in range(i, n):
                if customers[j] == 'Y':
                    penalty += 1

            if penalty < minPenalty:
                minPenalty = penalty
                res = i

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int n = customers.length();
        int res = n, minPenalty = n;

        for (int i = 0; i <= n; i++) {
            int penalty = 0;
            for (int j = 0; j < i; j++) {
                if (customers.charAt(j) == 'N') {
                    penalty++;
                }
            }
            for (int j = i; j < n; j++) {
                if (customers.charAt(j) == 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int n = customers.size();
        int res = n, minPenalty = n;

        for (int i = 0; i <= n; i++) {
            int penalty = 0;
            for (int j = 0; j < i; j++) {
                if (customers[j] == 'N') {
                    penalty++;
                }
            }
            for (int j = i; j < n; j++) {
                if (customers[j] == 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        const n = customers.length;
        let res = n,
            minPenalty = n;

        for (let i = 0; i <= n; i++) {
            let penalty = 0;
            for (let j = 0; j < i; j++) {
                if (customers[j] === 'N') {
                    penalty++;
                }
            }
            for (let j = i; j < n; j++) {
                if (customers[j] === 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int BestClosingTime(string customers) {
        int n = customers.Length;
        int res = n, minPenalty = n;

        for (int i = 0; i <= n; i++) {
            int penalty = 0;
            for (int j = 0; j < i; j++) {
                if (customers[j] == 'N') {
                    penalty++;
                }
            }
            for (int j = i; j < n; j++) {
                if (customers[j] == 'Y') {
                    penalty++;
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```go
func bestClosingTime(customers string) int {
    n := len(customers)
    res, minPenalty := n, n

    for i := 0; i <= n; i++ {
        penalty := 0
        for j := 0; j < i; j++ {
            if customers[j] == 'N' {
                penalty++
            }
        }
        for j := i; j < n; j++ {
            if customers[j] == 'Y' {
                penalty++
            }
        }

        if penalty < minPenalty {
            minPenalty = penalty
            res = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun bestClosingTime(customers: String): Int {
        val n = customers.length
        var res = n
        var minPenalty = n

        for (i in 0..n) {
            var penalty = 0
            for (j in 0 until i) {
                if (customers[j] == 'N') {
                    penalty++
                }
            }
            for (j in i until n) {
                if (customers[j] == 'Y') {
                    penalty++
                }
            }

            if (penalty < minPenalty) {
                minPenalty = penalty
                res = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func bestClosingTime(_ customers: String) -> Int {
        let n = customers.count
        let chars = Array(customers)
        var res = n
        var minPenalty = n

        for i in 0...n {
            var penalty = 0
            for j in 0..<i {
                if chars[j] == "N" {
                    penalty += 1
                }
            }
            for j in i..<n {
                if chars[j] == "Y" {
                    penalty += 1
                }
            }

            if penalty < minPenalty {
                minPenalty = penalty
                res = i
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

## 2. Prefix & Suffix

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        n = len(customers)
        cnt = 0

        prefixN = []
        for c in customers:
            prefixN.append(cnt)
            if c == 'N':
                cnt += 1
        prefixN.append(cnt)

        suffixY = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffixY[i] = suffixY[i + 1]
            if customers[i] == 'Y':
                suffixY[i] += 1

        res = n
        minPenalty = n
        for i in range(n + 1):
            penalty = prefixN[i] + suffixY[i]
            if penalty < minPenalty:
                minPenalty = penalty
                res = i

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int n = customers.length();
        int cnt = 0;

        int[] prefixN = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixN[i] = cnt;
            if (customers.charAt(i) == 'N') {
                cnt++;
            }
        }
        prefixN[n] = cnt;

        int[] suffixY = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers.charAt(i) == 'Y') {
                suffixY[i]++;
            }
        }

        int res = n, minPenalty = n;
        for (int i = 0; i <= n; i++) {
            int penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int n = customers.size(), cnt = 0;

        vector<int> prefixN(n + 1);
        for (int i = 0; i < n; i++) {
            prefixN[i] = cnt;
            if (customers[i] == 'N') {
                cnt++;
            }
        }
        prefixN[n] = cnt;

        vector<int> suffixY(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers[i] == 'Y') {
                suffixY[i]++;
            }
        }

        int res = n, minPenalty = n;
        for (int i = 0; i <= n; i++) {
            int penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        const n = customers.length;
        let cnt = 0;

        const prefixN = [];
        for (const c of customers) {
            prefixN.push(cnt);
            if (c === 'N') {
                cnt++;
            }
        }
        prefixN.push(cnt);

        const suffixY = new Array(n + 1).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers[i] === 'Y') {
                suffixY[i]++;
            }
        }

        let res = n,
            minPenalty = n;
        for (let i = 0; i <= n; i++) {
            const penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int BestClosingTime(string customers) {
        int n = customers.Length;
        int cnt = 0;

        int[] prefixN = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixN[i] = cnt;
            if (customers[i] == 'N') {
                cnt++;
            }
        }
        prefixN[n] = cnt;

        int[] suffixY = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suffixY[i] = suffixY[i + 1];
            if (customers[i] == 'Y') {
                suffixY[i]++;
            }
        }

        int res = n, minPenalty = n;
        for (int i = 0; i <= n; i++) {
            int penalty = prefixN[i] + suffixY[i];
            if (penalty < minPenalty) {
                minPenalty = penalty;
                res = i;
            }
        }

        return res;
    }
}
```

```go
func bestClosingTime(customers string) int {
    n := len(customers)
    cnt := 0

    prefixN := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefixN[i] = cnt
        if customers[i] == 'N' {
            cnt++
        }
    }
    prefixN[n] = cnt

    suffixY := make([]int, n+1)
    for i := n - 1; i >= 0; i-- {
        suffixY[i] = suffixY[i+1]
        if customers[i] == 'Y' {
            suffixY[i]++
        }
    }

    res, minPenalty := n, n
    for i := 0; i <= n; i++ {
        penalty := prefixN[i] + suffixY[i]
        if penalty < minPenalty {
            minPenalty = penalty
            res = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun bestClosingTime(customers: String): Int {
        val n = customers.length
        var cnt = 0

        val prefixN = IntArray(n + 1)
        for (i in 0 until n) {
            prefixN[i] = cnt
            if (customers[i] == 'N') {
                cnt++
            }
        }
        prefixN[n] = cnt

        val suffixY = IntArray(n + 1)
        for (i in n - 1 downTo 0) {
            suffixY[i] = suffixY[i + 1]
            if (customers[i] == 'Y') {
                suffixY[i]++
            }
        }

        var res = n
        var minPenalty = n
        for (i in 0..n) {
            val penalty = prefixN[i] + suffixY[i]
            if (penalty < minPenalty) {
                minPenalty = penalty
                res = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func bestClosingTime(_ customers: String) -> Int {
        let n = customers.count
        let chars = Array(customers)
        var cnt = 0

        var prefixN = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefixN[i] = cnt
            if chars[i] == "N" {
                cnt += 1
            }
        }
        prefixN[n] = cnt

        var suffixY = [Int](repeating: 0, count: n + 1)
        for i in stride(from: n - 1, through: 0, by: -1) {
            suffixY[i] = suffixY[i + 1]
            if chars[i] == "Y" {
                suffixY[i] += 1
            }
        }

        var res = n
        var minPenalty = n
        for i in 0...n {
            let penalty = prefixN[i] + suffixY[i]
            if penalty < minPenalty {
                minPenalty = penalty
                res = i
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

## 3. Iteration (Two Pass)

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        cntY = sum(c == "Y" for c in customers)

        minPenalty = cntY
        res = cntN = 0
        for i, c in enumerate(customers):
            if c == "Y":
                cntY -= 1
            else:
                cntN += 1

            penalty = cntN + cntY
            if penalty < minPenalty:
                res = i + 1
                minPenalty = penalty

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int cntY = 0;
        for (char c : customers.toCharArray()) {
            if (c == 'Y') cntY++;
        }

        int minPenalty = cntY, res = 0, cntN = 0;
        for (int i = 0; i < customers.length(); i++) {
            if (customers.charAt(i) == 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            int penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int cntY = count(customers.begin(), customers.end(), 'Y');

        int minPenalty = cntY, res = 0, cntN = 0;
        for (int i = 0; i < customers.size(); i++) {
            if (customers[i] == 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            int penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        let cntY = 0;
        for (let c of customers) {
            if (c === 'Y') cntY++;
        }

        let minPenalty = cntY,
            res = 0,
            cntN = 0;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i] === 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            const penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int BestClosingTime(string customers) {
        int cntY = 0;
        foreach (char c in customers) {
            if (c == 'Y') cntY++;
        }

        int minPenalty = cntY, res = 0, cntN = 0;
        for (int i = 0; i < customers.Length; i++) {
            if (customers[i] == 'Y') {
                cntY--;
            } else {
                cntN++;
            }

            int penalty = cntN + cntY;
            if (penalty < minPenalty) {
                res = i + 1;
                minPenalty = penalty;
            }
        }

        return res;
    }
}
```

```go
func bestClosingTime(customers string) int {
    cntY := 0
    for _, c := range customers {
        if c == 'Y' {
            cntY++
        }
    }

    minPenalty, res, cntN := cntY, 0, 0
    for i := 0; i < len(customers); i++ {
        if customers[i] == 'Y' {
            cntY--
        } else {
            cntN++
        }

        penalty := cntN + cntY
        if penalty < minPenalty {
            res = i + 1
            minPenalty = penalty
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun bestClosingTime(customers: String): Int {
        var cntY = customers.count { it == 'Y' }

        var minPenalty = cntY
        var res = 0
        var cntN = 0
        for (i in customers.indices) {
            if (customers[i] == 'Y') {
                cntY--
            } else {
                cntN++
            }

            val penalty = cntN + cntY
            if (penalty < minPenalty) {
                res = i + 1
                minPenalty = penalty
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func bestClosingTime(_ customers: String) -> Int {
        let chars = Array(customers)
        var cntY = chars.filter { $0 == "Y" }.count

        var minPenalty = cntY
        var res = 0
        var cntN = 0
        for i in 0..<chars.count {
            if chars[i] == "Y" {
                cntY -= 1
            } else {
                cntN += 1
            }

            let penalty = cntN + cntY
            if penalty < minPenalty {
                res = i + 1
                minPenalty = penalty
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

## 4. Iteration (One Pass)

::tabs-start

```python
class Solution:
    def bestClosingTime(self, customers: str) -> int:
        res = minPenalty = 0
        penalty = 0

        for i, c in enumerate(customers):
            penalty += 1 if c == 'Y' else -1

            if penalty > minPenalty:
                minPenalty = penalty
                res = i + 1

        return res
```

```java
public class Solution {
    public int bestClosingTime(String customers) {
        int res = 0, minPenalty = 0, penalty = 0;

        for (int i = 0; i < customers.length(); i++) {
            penalty += customers.charAt(i) == 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int bestClosingTime(string customers) {
        int res = 0, minPenalty = 0, penalty = 0;

        for (int i = 0; i < customers.size(); i++) {
            penalty += customers[i] == 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} customers
     * @return {number}
     */
    bestClosingTime(customers) {
        let res = 0,
            minPenalty = 0,
            penalty = 0;

        for (let i = 0; i < customers.length; i++) {
            penalty += customers[i] === 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int BestClosingTime(string customers) {
        int res = 0, minPenalty = 0, penalty = 0;

        for (int i = 0; i < customers.Length; i++) {
            penalty += customers[i] == 'Y' ? 1 : -1;

            if (penalty > minPenalty) {
                minPenalty = penalty;
                res = i + 1;
            }
        }

        return res;
    }
}
```

```go
func bestClosingTime(customers string) int {
    res, minPenalty, penalty := 0, 0, 0

    for i := 0; i < len(customers); i++ {
        if customers[i] == 'Y' {
            penalty++
        } else {
            penalty--
        }

        if penalty > minPenalty {
            minPenalty = penalty
            res = i + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun bestClosingTime(customers: String): Int {
        var res = 0
        var minPenalty = 0
        var penalty = 0

        for (i in customers.indices) {
            penalty += if (customers[i] == 'Y') 1 else -1

            if (penalty > minPenalty) {
                minPenalty = penalty
                res = i + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func bestClosingTime(_ customers: String) -> Int {
        let chars = Array(customers)
        var res = 0
        var minPenalty = 0
        var penalty = 0

        for i in 0..<chars.count {
            penalty += chars[i] == "Y" ? 1 : -1

            if penalty > minPenalty {
                minPenalty = penalty
                res = i + 1
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
