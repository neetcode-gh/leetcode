## 1. Backtracking

### Intuition

The problem asks us to split a string into at least two parts where each consecutive part represents a number that is exactly one less than the previous. Since we need to explore all possible ways to split the string, backtracking is a natural choice. We try every possible split point, build numbers digit by digit, and check if they form a valid descending consecutive sequence.

### Algorithm

1. Create a helper function `isValid` that checks if a list of numbers forms a descending consecutive sequence (each element is exactly one less than the previous) and contains at least two elements.
2. Use depth-first search starting at index `0` with an empty list of splits.
3. At each position, try extending the current number by including more digits (from current index to end of string).
4. For each potential number, add it to the splits list and recursively process the remaining string.
5. If we reach the end of the string, validate the sequence. If valid, return `true`.
6. Backtrack by removing the last added number and try the next split point.

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        n = len(s)

        def isValid(splits):
            for i in range(1, len(splits)):
                if splits[i] != splits[i - 1] - 1:
                    return False
            return len(splits) > 1

        def dfs(i, splits):
            if i == n:
                return isValid(splits)
            num = 0
            for j in range(i, n):
                num = num * 10 + int(s[j])
                splits.append(num)
                if dfs(j + 1, splits):
                    return True
                splits.pop()
            return False

        return dfs(0, [])
```

```java
public class Solution {
    public boolean splitString(String s) {
        return dfs(s, 0, new ArrayList<>());
    }

    private boolean isValid(List<Long> splits) {
        for (int i = 1; i < splits.size(); i++) {
            if (splits.get(i) != splits.get(i - 1) - 1) {
                return false;
            }
        }
        return splits.size() > 1;
    }

    private boolean dfs(String s, int i, List<Long> splits) {
        if (i == s.length()) {
            return isValid(splits);
        }
        long num = 0;
        for (int j = i; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            splits.add(num);
            if (dfs(s, j + 1, splits)) {
                return true;
            }
            splits.remove(splits.size() - 1);
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        vector<long long> splits;
        return dfs(s, 0, splits);
    }

private:
    bool isValid(vector<long long>& splits) {
        for (int i = 1; i < splits.size(); i++) {
            if (splits[i] != splits[i - 1] - 1) {
                return false;
            }
        }
        return splits.size() > 1;
    }

    bool dfs(string& s, int i, vector<long long>& splits) {
        if (i == s.size()) {
            return isValid(splits);
        }
        unsigned long long num = 0;
        for (int j = i; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            splits.push_back(num);
            if (dfs(s, j + 1, splits)) {
                return true;
            }
            splits.pop_back();
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const isValid = (splits) => {
            for (let i = 1; i < splits.length; i++) {
                if (splits[i] !== splits[i - 1] - 1) {
                    return false;
                }
            }
            return splits.length > 1;
        };

        const dfs = (i, splits) => {
            if (i === n) {
                return isValid(splits);
            }
            let num = 0;
            for (let j = i; j < n; j++) {
                num = num * 10 + Number(s[j]);
                splits.push(num);
                if (dfs(j + 1, splits)) {
                    return true;
                }
                splits.pop();
            }
            return false;
        };

        return dfs(0, []);
    }
}
```

```csharp
public class Solution {
    public bool SplitString(string s) {
        return Dfs(s, 0, new List<long>());
    }

    private bool IsValid(List<long> splits) {
        for (int i = 1; i < splits.Count; i++) {
            if (splits[i] != splits[i - 1] - 1) {
                return false;
            }
        }
        return splits.Count > 1;
    }

    private bool Dfs(string s, int i, List<long> splits) {
        if (i == s.Length) {
            return IsValid(splits);
        }
        long num = 0;
        for (int j = i; j < s.Length; j++) {
            num = num * 10 + (s[j] - '0');
            splits.Add(num);
            if (Dfs(s, j + 1, splits)) {
                return true;
            }
            splits.RemoveAt(splits.Count - 1);
        }
        return false;
    }
}
```

```go
func splitString(s string) bool {
    n := len(s)

    var isValid func(splits []int64) bool
    isValid = func(splits []int64) bool {
        for i := 1; i < len(splits); i++ {
            if splits[i] != splits[i-1]-1 {
                return false
            }
        }
        return len(splits) > 1
    }

    var dfs func(i int, splits []int64) bool
    dfs = func(i int, splits []int64) bool {
        if i == n {
            return isValid(splits)
        }
        var num int64 = 0
        for j := i; j < n; j++ {
            num = num*10 + int64(s[j]-'0')
            splits = append(splits, num)
            if dfs(j+1, splits) {
                return true
            }
            splits = splits[:len(splits)-1]
        }
        return false
    }

    return dfs(0, []int64{})
}
```

```kotlin
class Solution {
    fun splitString(s: String): Boolean {
        return dfs(s, 0, mutableListOf())
    }

    private fun isValid(splits: List<Long>): Boolean {
        for (i in 1 until splits.size) {
            if (splits[i] != splits[i - 1] - 1) {
                return false
            }
        }
        return splits.size > 1
    }

    private fun dfs(s: String, i: Int, splits: MutableList<Long>): Boolean {
        if (i == s.length) {
            return isValid(splits)
        }
        var num = 0L
        for (j in i until s.length) {
            num = num * 10 + (s[j] - '0')
            splits.add(num)
            if (dfs(s, j + 1, splits)) {
                return true
            }
            splits.removeAt(splits.size - 1)
        }
        return false
    }
}
```

```swift
class Solution {
    func splitString(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count

        func isValid(_ splits: [Int64]) -> Bool {
            for i in 1..<splits.count {
                if splits[i] != splits[i - 1] - 1 {
                    return false
                }
            }
            return splits.count > 1
        }

        func dfs(_ i: Int, _ splits: inout [Int64]) -> Bool {
            if i == n {
                return isValid(splits)
            }
            var num: Int64 = 0
            for j in i..<n {
                num = num * 10 + Int64(chars[j].asciiValue! - Character("0").asciiValue!)
                splits.append(num)
                if dfs(j + 1, &splits) {
                    return true
                }
                splits.removeLast()
            }
            return false
        }

        var splits = [Int64]()
        return dfs(0, &splits)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$

---

## 2. Recursion - I

### Intuition

Instead of collecting all splits and validating at the end, we can optimize by passing the previous number directly. Once we fix the first number, we only need to find subsequent numbers that are exactly one less. This eliminates the need to store all splits and allows early termination when we find a valid sequence.

### Algorithm

1. Iterate through all possible first numbers by trying each prefix of the string (excluding the last character to ensure at least two parts).
2. For each first number, call `dfs` with the remaining string and the first number as the previous value.
3. In `dfs`, try to form numbers from the current position. If a number equals `prev - 1`, recursively check the rest.
4. If we reach the end of the string during recursion, we found a valid split.
5. Return `true` if any starting number leads to a valid sequence.

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        def dfs(index, prev):
            if index == len(s):
                return True
            num = 0
            for j in range(index, len(s)):
                num = num * 10 + int(s[j])
                if num + 1 == prev and dfs(j + 1, num):
                    return True
            return False

        val = 0
        for i in range(len(s) - 1):
            val = val * 10 + int(s[i])
            if dfs(i + 1, val):
                return True

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private boolean dfs(String s, int index, long prev) {
        if (index == s.length()) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        unsigned long long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

private:
    bool dfs(string& s, int index, long long prev) {
        if (index == s.size()) {
            return true;
        }
        unsigned long long num = 0;
        for (int j = index; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const dfs = (index, prev) => {
            if (index === n) {
                return true;
            }
            let num = 0;
            for (let j = index; j < n; j++) {
                num = num * 10 + Number(s[j]);
                if (num + 1 === prev && dfs(j + 1, num)) {
                    return true;
                }
            }
            return false;
        };

        let val = 0;
        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            if (dfs(i + 1, val)) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitString(string s) {
        int n = s.Length;
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (Dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private bool Dfs(string s, int index, long prev) {
        if (index == s.Length) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.Length; j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && Dfs(s, j + 1, num)) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func splitString(s string) bool {
    n := len(s)

    var dfs func(index int, prev int64) bool
    dfs = func(index int, prev int64) bool {
        if index == n {
            return true
        }
        var num int64 = 0
        for j := index; j < n; j++ {
            num = num*10 + int64(s[j]-'0')
            if num+1 == prev && dfs(j+1, num) {
                return true
            }
        }
        return false
    }

    var val int64 = 0
    for i := 0; i < n-1; i++ {
        val = val*10 + int64(s[i]-'0')
        if dfs(i+1, val) {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun splitString(s: String): Boolean {
        val n = s.length
        var value = 0L
        for (i in 0 until n - 1) {
            value = value * 10 + (s[i] - '0')
            if (dfs(s, i + 1, value)) {
                return true
            }
        }
        return false
    }

    private fun dfs(s: String, index: Int, prev: Long): Boolean {
        if (index == s.length) {
            return true
        }
        var num = 0L
        for (j in index until s.length) {
            num = num * 10 + (s[j] - '0')
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func splitString(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count

        func dfs(_ index: Int, _ prev: Int64) -> Bool {
            if index == n {
                return true
            }
            var num: Int64 = 0
            for j in index..<n {
                num = num * 10 + Int64(chars[j].asciiValue! - Character("0").asciiValue!)
                if num + 1 == prev && dfs(j + 1, num) {
                    return true
                }
            }
            return false
        }

        var val: Int64 = 0
        for i in 0..<(n - 1) {
            val = val * 10 + Int64(chars[i].asciiValue! - Character("0").asciiValue!)
            if dfs(i + 1, val) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Recursion - II

### Intuition

Building on the previous approach, we add an important pruning optimization. Since we need descending consecutive values, once the current number we are building becomes greater than or equal to the previous number, there is no point continuing to add more digits. This early termination significantly reduces the search space.

### Algorithm

1. Same setup as Recursion I: iterate through possible first numbers.
2. In `dfs`, build numbers digit by digit from the current position.
3. If the current number equals `prev - 1`, recursively check the remaining string.
4. Key optimization: if the current number becomes greater than or equal to `prev`, break out of the loop early since adding more digits will only make it larger.
5. Return `true` when the end of string is reached with a valid sequence.

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        def dfs(index, prev):
            if index == len(s):
                return True
            num = 0
            for j in range(index, len(s)):
                num = num * 10 + int(s[j])
                if num + 1 == prev and dfs(j + 1, num):
                    return True
                if num >= prev:
                    break
            return False

        val = 0
        for i in range(len(s) - 1):
            val = val * 10 + int(s[i])
            if dfs(i + 1, val):
                return True

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private boolean dfs(String s, int index, long prev) {
        if (index == s.length()) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.length(); j++) {
            num = num * 10 + (s.charAt(j) - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
            if (num >= prev) {
                break;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        unsigned long long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

private:
    bool dfs(string& s, int index, long long prev) {
        if (index == s.size()) {
            return true;
        }
        unsigned long long num = 0;
        for (int j = index; j < s.size(); j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true;
            }
            if (num >= prev) {
                break;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;

        const dfs = (index, prev) => {
            if (index === n) {
                return true;
            }
            let num = 0;
            for (let j = index; j < n; j++) {
                num = num * 10 + Number(s[j]);
                if (num + 1 === prev && dfs(j + 1, num)) {
                    return true;
                }
                if (num >= prev) {
                    break;
                }
            }
            return false;
        };

        let val = 0;
        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            if (dfs(i + 1, val)) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitString(string s) {
        int n = s.Length;
        long val = 0;
        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            if (Dfs(s, i + 1, val)) {
                return true;
            }
        }
        return false;
    }

    private bool Dfs(string s, int index, long prev) {
        if (index == s.Length) {
            return true;
        }
        long num = 0;
        for (int j = index; j < s.Length; j++) {
            num = num * 10 + (s[j] - '0');
            if (num + 1 == prev && Dfs(s, j + 1, num)) {
                return true;
            }
            if (num >= prev) {
                break;
            }
        }
        return false;
    }
}
```

```go
func splitString(s string) bool {
    n := len(s)

    var dfs func(index int, prev int64) bool
    dfs = func(index int, prev int64) bool {
        if index == n {
            return true
        }
        var num int64 = 0
        for j := index; j < n; j++ {
            num = num*10 + int64(s[j]-'0')
            if num+1 == prev && dfs(j+1, num) {
                return true
            }
            if num >= prev {
                break
            }
        }
        return false
    }

    var val int64 = 0
    for i := 0; i < n-1; i++ {
        val = val*10 + int64(s[i]-'0')
        if dfs(i+1, val) {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun splitString(s: String): Boolean {
        val n = s.length
        var value = 0L
        for (i in 0 until n - 1) {
            value = value * 10 + (s[i] - '0')
            if (dfs(s, i + 1, value)) {
                return true
            }
        }
        return false
    }

    private fun dfs(s: String, index: Int, prev: Long): Boolean {
        if (index == s.length) {
            return true
        }
        var num = 0L
        for (j in index until s.length) {
            num = num * 10 + (s[j] - '0')
            if (num + 1 == prev && dfs(s, j + 1, num)) {
                return true
            }
            if (num >= prev) {
                break
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func splitString(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count

        func dfs(_ index: Int, _ prev: Int64) -> Bool {
            if index == n {
                return true
            }
            var num: Int64 = 0
            for j in index..<n {
                num = num * 10 + Int64(chars[j].asciiValue! - Character("0").asciiValue!)
                if num + 1 == prev && dfs(j + 1, num) {
                    return true
                }
                if num >= prev {
                    break
                }
            }
            return false
        }

        var val: Int64 = 0
        for i in 0..<(n - 1) {
            val = val * 10 + Int64(chars[i].asciiValue! - Character("0").asciiValue!)
            if dfs(i + 1, val) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Stack

### Intuition

Instead of using recursion with the call stack, we can simulate the same process with an explicit stack. This converts the recursive solution into an iterative one, which can be useful for avoiding stack overflow on very deep recursions and makes the state transitions more explicit.

### Algorithm

1. For each possible first number, push the state (next index, first number value) onto the stack.
2. While the stack is not empty, pop a state containing the current index and previous value.
3. Build numbers starting from the current index. When a number equals `prev - 1`:
   - If this number uses all remaining characters, return `true`.
   - Otherwise, push the new state (next index, current number) onto the stack.
4. Apply the same pruning: if the number grows to be greater than or equal to `prev`, stop building.
5. If all possibilities are exhausted without finding a valid sequence, return `false`.

::tabs-start

```python
class Solution:
    def splitString(self, s: str) -> bool:
        n = len(s)
        stack = []
        val = 0

        for i in range(n - 1):
            val = val * 10 + int(s[i])
            stack.append((i + 1, val))

            while stack:
                index, prev = stack.pop()
                num = 0
                for j in range(index, n):
                    num = num * 10 + int(s[j])
                    if num + 1 == prev:
                        if j + 1 == n:
                            return True
                        stack.append((j + 1, num))
                    elif num >= prev:
                        break

        return False
```

```java
public class Solution {
    public boolean splitString(String s) {
        int n = s.length();
        Stack<long[]> stack = new Stack<>();
        long val = 0;

        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s.charAt(i) - '0');
            stack.push(new long[]{i + 1, val});

            while (!stack.isEmpty()) {
                long[] top = stack.pop();
                int index = (int) top[0];
                long prev = top[1];
                long num = 0;

                for (int j = index; j < n; j++) {
                    num = num * 10 + (s.charAt(j) - '0');
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true;
                        }
                        stack.push(new long[]{j + 1, num});
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitString(string s) {
        int n = s.size();
        stack<pair<int, long long>> stack;
        unsigned long long val = 0;

        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            stack.push({i + 1, val});

            while (!stack.empty()) {
                auto [index, prev] = stack.top();
                stack.pop();
                unsigned long long num = 0;

                for (int j = index; j < n; j++) {
                    num = num * 10 + (s[j] - '0');
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true;
                        }
                        stack.push({j + 1, num});
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    splitString(s) {
        const n = s.length;
        let stack = [];
        let val = 0;

        for (let i = 0; i < n - 1; i++) {
            val = val * 10 + Number(s[i]);
            stack.push([i + 1, val]);

            while (stack.length) {
                let [index, prev] = stack.pop();
                let num = 0;

                for (let j = index; j < n; j++) {
                    num = num * 10 + Number(s[j]);
                    if (num + 1 === prev) {
                        if (j + 1 === n) {
                            return true;
                        }
                        stack.push([j + 1, num]);
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitString(string s) {
        int n = s.Length;
        var stack = new Stack<long[]>();
        long val = 0;

        for (int i = 0; i < n - 1; i++) {
            val = val * 10 + (s[i] - '0');
            stack.Push(new long[] { i + 1, val });

            while (stack.Count > 0) {
                long[] top = stack.Pop();
                int index = (int)top[0];
                long prev = top[1];
                long num = 0;

                for (int j = index; j < n; j++) {
                    num = num * 10 + (s[j] - '0');
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true;
                        }
                        stack.Push(new long[] { j + 1, num });
                    } else if (num >= prev) {
                        break;
                    }
                }
            }
        }

        return false;
    }
}
```

```go
func splitString(s string) bool {
    n := len(s)
    type pair struct {
        index int
        prev  int64
    }
    stack := []pair{}
    var val int64 = 0

    for i := 0; i < n-1; i++ {
        val = val*10 + int64(s[i]-'0')
        stack = append(stack, pair{i + 1, val})

        for len(stack) > 0 {
            top := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            index, prev := top.index, top.prev
            var num int64 = 0

            for j := index; j < n; j++ {
                num = num*10 + int64(s[j]-'0')
                if num+1 == prev {
                    if j+1 == n {
                        return true
                    }
                    stack = append(stack, pair{j + 1, num})
                } else if num >= prev {
                    break
                }
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun splitString(s: String): Boolean {
        val n = s.length
        val stack = ArrayDeque<LongArray>()
        var value = 0L

        for (i in 0 until n - 1) {
            value = value * 10 + (s[i] - '0')
            stack.addLast(longArrayOf((i + 1).toLong(), value))

            while (stack.isNotEmpty()) {
                val top = stack.removeLast()
                val index = top[0].toInt()
                val prev = top[1]
                var num = 0L

                for (j in index until n) {
                    num = num * 10 + (s[j] - '0')
                    if (num + 1 == prev) {
                        if (j + 1 == n) {
                            return true
                        }
                        stack.addLast(longArrayOf((j + 1).toLong(), num))
                    } else if (num >= prev) {
                        break
                    }
                }
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func splitString(_ s: String) -> Bool {
        let chars = Array(s)
        let n = chars.count
        var stack = [(Int, Int64)]()
        var val: Int64 = 0

        for i in 0..<(n - 1) {
            val = val * 10 + Int64(chars[i].asciiValue! - Character("0").asciiValue!)
            stack.append((i + 1, val))

            while !stack.isEmpty {
                let (index, prev) = stack.removeLast()
                var num: Int64 = 0

                for j in index..<n {
                    num = num * 10 + Int64(chars[j].asciiValue! - Character("0").asciiValue!)
                    if num + 1 == prev {
                        if j + 1 == n {
                            return true
                        }
                        stack.append((j + 1, num))
                    } else if num >= prev {
                        break
                    }
                }
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Integer Overflow with Large Numbers

The string can be up to 20 characters long, meaning numbers can exceed 64-bit integer limits. Using `int` or even standard `long` without considering overflow can produce incorrect comparisons. Use `unsigned long long` or language-specific big integer handling, and be cautious when building numbers digit by digit.

### Not Requiring At Least Two Parts

The problem requires splitting into at least two parts. A common mistake is returning true when the entire string forms a single number. Always ensure the loop for the first number excludes the last character, forcing at least one more part to exist.

### Missing the Pruning Optimization

Without early termination when the current number exceeds or equals the previous number, the solution explores many unnecessary branches. Since we need strictly descending consecutive values, once `num >= prev`, no valid sequence can be formed by adding more digits, so breaking out of the loop is essential for efficiency.
