## 1. Brute Force

### Intuition

We can simulate the voting process directly. Each senator, when it's their turn, will ban the next opposing senator in the circular order. We keep iterating through the remaining senators until only one party remains. This approach mirrors the problem's rules exactly but requires repeatedly scanning the list to find and remove opponents.

### Algorithm

1. Convert the senate string to a list for easy modification.
2. Iterate through the list repeatedly in rounds.
3. For each senator at position `i`:
   - Check if the game is over (only one party left).
   - Find the next senator of the opposing party (wrapping around circularly).
   - Remove that opponent from the list.
   - Adjust the current index if the removed senator was before `i`.
4. Return the winning party once one side is eliminated.

::tabs-start

```python
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        s = list(senate)
        while True:
            i = 0
            while i < len(s):
                if 'R' not in s:
                    return "Dire"
                if 'D' not in s:
                    return "Radiant"
                if s[i] == 'R':
                    j = (i + 1) % len(s)
                    while s[j] == 'R':
                        j = (j + 1) % len(s)
                    s.pop(j)
                    if j < i:
                        i -= 1
                else:
                    j = (i + 1) % len(s)
                    while s[j] == 'D':
                        j = (j + 1) % len(s)
                    s.pop(j)
                    if j < i:
                        i -= 1
                i += 1
```

```java
public class Solution {
    public String predictPartyVictory(String senate) {
        List<Character> s = new ArrayList<>();
        for (char c : senate.toCharArray()) {
            s.add(c);
        }

        while (true) {
            int i = 0;
            while (i < s.size()) {
                if (!s.contains('R')) {
                    return "Dire";
                }
                if (!s.contains('D')) {
                    return "Radiant";
                }
                if (s.get(i) == 'R') {
                    int j = (i + 1) % s.size();
                    while (s.get(j) == 'R') {
                        j = (j + 1) % s.size();
                    }
                    s.remove(j);
                    if (j < i) {
                        i--;
                    }
                } else {
                    int j = (i + 1) % s.size();
                    while (s.get(j) == 'D') {
                        j = (j + 1) % s.size();
                    }
                    s.remove(j);
                    if (j < i) {
                        i--;
                    }
                }
                i++;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    string predictPartyVictory(string senate) {
        vector<char> s(senate.begin(), senate.end());

        while (true) {
            int i = 0;
            while (i < s.size()) {
                if (find(s.begin(), s.end(), 'R') == s.end()) {
                    return "Dire";
                }
                if (find(s.begin(), s.end(), 'D') == s.end()) {
                    return "Radiant";
                }
                if (s[i] == 'R') {
                    int j = (i + 1) % s.size();
                    while (s[j] == 'R') {
                        j = (j + 1) % s.size();
                    }
                    s.erase(s.begin() + j);
                    if (j < i) {
                        i--;
                    }
                } else {
                    int j = (i + 1) % s.size();
                    while (s[j] == 'D') {
                        j = (j + 1) % s.size();
                    }
                    s.erase(s.begin() + j);
                    if (j < i) {
                        i--;
                    }
                }
                i++;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} senate
     * @return {string}
     */
    predictPartyVictory(senate) {
        const s = senate.split('');

        while (true) {
            let i = 0;
            while (i < s.length) {
                if (!s.includes('R')) {
                    return 'Dire';
                }
                if (!s.includes('D')) {
                    return 'Radiant';
                }
                if (s[i] === 'R') {
                    let j = (i + 1) % s.length;
                    while (s[j] === 'R') {
                        j = (j + 1) % s.length;
                    }
                    s.splice(j, 1);
                    if (j < i) {
                        i--;
                    }
                } else {
                    let j = (i + 1) % s.length;
                    while (s[j] === 'D') {
                        j = (j + 1) % s.length;
                    }
                    s.splice(j, 1);
                    if (j < i) {
                        i--;
                    }
                }
                i++;
            }
        }
    }
}
```

```csharp
public class Solution {
    public string PredictPartyVictory(string senate) {
        List<char> s = senate.ToList();

        while (true) {
            int i = 0;
            while (i < s.Count) {
                if (!s.Contains('R')) return "Dire";
                if (!s.Contains('D')) return "Radiant";
                if (s[i] == 'R') {
                    int j = (i + 1) % s.Count;
                    while (s[j] == 'R') {
                        j = (j + 1) % s.Count;
                    }
                    s.RemoveAt(j);
                    if (j < i) i--;
                } else {
                    int j = (i + 1) % s.Count;
                    while (s[j] == 'D') {
                        j = (j + 1) % s.Count;
                    }
                    s.RemoveAt(j);
                    if (j < i) i--;
                }
                i++;
            }
        }
    }
}
```

```go
func predictPartyVictory(senate string) string {
    s := []byte(senate)
    for {
        i := 0
        for i < len(s) {
            hasR, hasD := false, false
            for _, c := range s {
                if c == 'R' {
                    hasR = true
                }
                if c == 'D' {
                    hasD = true
                }
            }
            if !hasR {
                return "Dire"
            }
            if !hasD {
                return "Radiant"
            }
            if s[i] == 'R' {
                j := (i + 1) % len(s)
                for s[j] == 'R' {
                    j = (j + 1) % len(s)
                }
                s = append(s[:j], s[j+1:]...)
                if j < i {
                    i--
                }
            } else {
                j := (i + 1) % len(s)
                for s[j] == 'D' {
                    j = (j + 1) % len(s)
                }
                s = append(s[:j], s[j+1:]...)
                if j < i {
                    i--
                }
            }
            i++
        }
    }
}
```

```kotlin
class Solution {
    fun predictPartyVictory(senate: String): String {
        val s = senate.toMutableList()

        while (true) {
            var i = 0
            while (i < s.size) {
                if ('R' !in s) return "Dire"
                if ('D' !in s) return "Radiant"
                if (s[i] == 'R') {
                    var j = (i + 1) % s.size
                    while (s[j] == 'R') {
                        j = (j + 1) % s.size
                    }
                    s.removeAt(j)
                    if (j < i) i--
                } else {
                    var j = (i + 1) % s.size
                    while (s[j] == 'D') {
                        j = (j + 1) % s.size
                    }
                    s.removeAt(j)
                    if (j < i) i--
                }
                i++
            }
        }
    }
}
```

```swift
class Solution {
    func predictPartyVictory(_ senate: String) -> String {
        var s = Array(senate)

        while true {
            var i = 0
            while i < s.count {
                if !s.contains("R") {
                    return "Dire"
                }
                if !s.contains("D") {
                    return "Radiant"
                }
                if s[i] == "R" {
                    var j = (i + 1) % s.count
                    while s[j] == "R" {
                        j = (j + 1) % s.count
                    }
                    s.remove(at: j)
                    if j < i {
                        i -= 1
                    }
                } else {
                    var j = (i + 1) % s.count
                    while s[j] == "D" {
                        j = (j + 1) % s.count
                    }
                    s.remove(at: j)
                    if j < i {
                        i -= 1
                    }
                }
                i += 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Greedy (Two Queues)

### Intuition

The key insight is that a senator should always ban the nearest opposing senator who would otherwise act before them. We use two queues to track the positions of Radiant and Dire senators. When comparing the front of both queues, the senator with the smaller index acts first and bans the other. The surviving senator then re-enters at the end of the queue with an updated index (adding `n` to represent the next round).

### Algorithm

1. Create two queues `R` and `D` to store indices of Radiant and Dire senators.
2. Populate the queues by scanning through the senate string.
3. While both queues are non-empty:
   - Compare the front indices from both queues.
   - The senator with the smaller index survives and gets re-added with index `+ n`.
   - The other senator is banned (removed permanently).
4. Return "Radiant" if the `R` queue is non-empty, otherwise "Dire".

::tabs-start

```python
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        D, R = deque(), deque()
        n = len(senate)

        for i, c in enumerate(senate):
            if c == 'R':
                R.append(i)
            else:
                D.append(i)

        while D and R:
            dTurn = D.popleft()
            rTurn = R.popleft()

            if rTurn < dTurn:
                R.append(rTurn + n)
            else:
                D.append(dTurn + n)

        return "Radiant" if R else "Dire"
```

```java
public class Solution {
    public String predictPartyVictory(String senate) {
        Queue<Integer> R = new LinkedList<>();
        Queue<Integer> D = new LinkedList<>();
        int n = senate.length();

        for (int i = 0; i < n; i++) {
            if (senate.charAt(i) == 'R') {
                R.add(i);
            } else {
                D.add(i);
            }
        }

        while (!R.isEmpty() && !D.isEmpty()) {
            int rTurn = R.poll();
            int dTurn = D.poll();

            if (rTurn < dTurn) {
                R.add(rTurn + n);
            } else {
                D.add(dTurn + n);
            }
        }

        return R.isEmpty() ? "Dire" : "Radiant";
    }
}
```

```cpp
class Solution {
public:
    string predictPartyVictory(string senate) {
        queue<int> R, D;
        int n = senate.size();

        for (int i = 0; i < n; i++) {
            if (senate[i] == 'R') {
                R.push(i);
            } else {
                D.push(i);
            }
        }

        while (!R.empty() && !D.empty()) {
            int rTurn = R.front(); R.pop();
            int dTurn = D.front(); D.pop();

            if (rTurn < dTurn) {
                R.push(rTurn + n);
            } else {
                D.push(dTurn + n);
            }
        }

        return R.empty() ? "Dire" : "Radiant";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} senate
     * @return {string}
     */
    predictPartyVictory(senate) {
        const R = new Queue();
        const D = new Queue();
        const n = senate.length;

        for (let i = 0; i < n; i++) {
            if (senate[i] === 'R') {
                R.push(i);
            } else {
                D.push(i);
            }
        }

        while (!R.isEmpty() && !D.isEmpty()) {
            const rTurn = R.pop();
            const dTurn = D.pop();

            if (rTurn < dTurn) {
                R.push(rTurn + n);
            } else {
                D.push(dTurn + n);
            }
        }

        return !R.isEmpty() ? 'Radiant' : 'Dire';
    }
}
```

```csharp
public class Solution {
    public string PredictPartyVictory(string senate) {
        Queue<int> D = new Queue<int>();
        Queue<int> R = new Queue<int>();
        int n = senate.Length;

        for (int i = 0; i < n; i++) {
            if (senate[i] == 'R') {
                R.Enqueue(i);
            } else {
                D.Enqueue(i);
            }
        }

        while (D.Count > 0 && R.Count > 0) {
            int dTurn = D.Dequeue();
            int rTurn = R.Dequeue();

            if (rTurn < dTurn) {
                R.Enqueue(rTurn + n);
            } else {
                D.Enqueue(dTurn + n);
            }
        }

        return R.Count > 0 ? "Radiant" : "Dire";
    }
}
```

```go
func predictPartyVictory(senate string) string {
    R := []int{}
    D := []int{}
    n := len(senate)

    for i, c := range senate {
        if c == 'R' {
            R = append(R, i)
        } else {
            D = append(D, i)
        }
    }

    for len(R) > 0 && len(D) > 0 {
        rTurn := R[0]
        R = R[1:]
        dTurn := D[0]
        D = D[1:]

        if rTurn < dTurn {
            R = append(R, rTurn+n)
        } else {
            D = append(D, dTurn+n)
        }
    }

    if len(R) > 0 {
        return "Radiant"
    }
    return "Dire"
}
```

```kotlin
class Solution {
    fun predictPartyVictory(senate: String): String {
        val R = ArrayDeque<Int>()
        val D = ArrayDeque<Int>()
        val n = senate.length

        for (i in senate.indices) {
            if (senate[i] == 'R') {
                R.addLast(i)
            } else {
                D.addLast(i)
            }
        }

        while (R.isNotEmpty() && D.isNotEmpty()) {
            val rTurn = R.removeFirst()
            val dTurn = D.removeFirst()

            if (rTurn < dTurn) {
                R.addLast(rTurn + n)
            } else {
                D.addLast(dTurn + n)
            }
        }

        return if (R.isNotEmpty()) "Radiant" else "Dire"
    }
}
```

```swift
class Solution {
    func predictPartyVictory(_ senate: String) -> String {
        var R = [Int]()
        var D = [Int]()
        let n = senate.count
        let chars = Array(senate)

        for (i, c) in chars.enumerated() {
            if c == "R" {
                R.append(i)
            } else {
                D.append(i)
            }
        }

        while !R.isEmpty && !D.isEmpty {
            let rTurn = R.removeFirst()
            let dTurn = D.removeFirst()

            if rTurn < dTurn {
                R.append(rTurn + n)
            } else {
                D.append(dTurn + n)
            }
        }

        return R.isEmpty ? "Dire" : "Radiant"
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy

### Intuition

We can track pending bans using a single counter. When we encounter a Radiant senator (`R`), they either get banned by a waiting Dire (if `cnt < 0`) or they ban a future Dire senator. Similarly, Dire senators either get banned or ban future Radiant senators. The twist is that when a senator is banned, their surviving opponent is appended to the end to act again in future rounds.

### Algorithm

1. Convert the string to a list and initialize a counter `cnt = 0`.
2. Iterate through the list (which grows as we append survivors):
   - If the senator is `R`:
     - If `cnt < 0`, a Dire senator bans them; append `D` to the end.
     - Increment `cnt` (representing a pending Radiant action).
   - If the senator is `D`:
     - If `cnt > 0`, a Radiant senator bans them; append `R` to the end.
     - Decrement `cnt` (representing a pending Dire action).
3. After processing, if `cnt > 0`, Radiant wins; otherwise, Dire wins.

::tabs-start

```python
class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        senate = list(senate)
        cnt = i = 0

        while i < len(senate):
            c = senate[i]
            if c == 'R':
                if cnt < 0:
                    senate.append('D')
                cnt += 1
            else:
                if cnt > 0:
                    senate.append('R')
                cnt -= 1
            i += 1

        return "Radiant" if cnt > 0 else "Dire"
```

```java
public class Solution {
    public String predictPartyVictory(String senate) {
        StringBuilder sb = new StringBuilder(senate);
        int cnt = 0, i = 0;

        while (i < sb.length()) {
            char c = sb.charAt(i);
            if (c == 'R') {
                if (cnt < 0) {
                    sb.append('D');
                }
                cnt++;
            } else {
                if (cnt > 0) {
                    sb.append('R');
                }
                cnt--;
            }
            i++;
        }

        return cnt > 0 ? "Radiant" : "Dire";
    }
}
```

```cpp
class Solution {
public:
    string predictPartyVictory(string senate) {
        int cnt = 0, i = 0;

        while (i < senate.size()) {
            char c = senate[i];
            if (c == 'R') {
                if (cnt < 0) {
                    senate.push_back('D');
                }
                cnt++;
            } else {
                if (cnt > 0) {
                    senate.push_back('R');
                }
                cnt--;
            }
            i++;
        }

        return cnt > 0 ? "Radiant" : "Dire";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} senate
     * @return {string}
     */
    predictPartyVictory(senate) {
        let s = senate.split('');
        let cnt = 0,
            i = 0;

        while (i < s.length) {
            const c = s[i];
            if (c === 'R') {
                if (cnt < 0) {
                    s.push('D');
                }
                cnt++;
            } else {
                if (cnt > 0) {
                    s.push('R');
                }
                cnt--;
            }
            i++;
        }

        return cnt > 0 ? 'Radiant' : 'Dire';
    }
}
```

```csharp
public class Solution {
    public string PredictPartyVictory(string senate) {
        List<char> list = new List<char>(senate);
        int cnt = 0, i = 0;

        while (i < list.Count) {
            char c = list[i];
            if (c == 'R') {
                if (cnt < 0) {
                    list.Add('D');
                }
                cnt++;
            } else { // c == 'D'
                if (cnt > 0) {
                    list.Add('R');
                }
                cnt--;
            }
            i++;
        }

        return cnt > 0 ? "Radiant" : "Dire";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Not Understanding the Circular Nature

The senate voting is circular, meaning after the last senator votes, it wraps back to the first. A banned senator in round 1 could have banned someone who would act later in the same round or in subsequent rounds.

```python
# Wrong: Only considering senators ahead in the array
j = i + 1
while j < len(s) and s[j] == s[i]:
    j += 1

# Correct: Circular wrap-around
j = (i + 1) % len(s)
while s[j] == s[i]:
    j = (j + 1) % len(s)
```

### Banning the Wrong Opponent

Each senator should optimally ban the nearest opposing senator who would otherwise act before them in the next round. Banning a distant opponent wastes the opportunity and may lead to suboptimal outcomes.

```python
# Wrong strategy: Banning any random opponent
# Correct strategy: Ban the next opponent in circular order
```

### Forgetting to Re-add Surviving Senators

In the queue-based approach, when a senator bans an opponent, the survivor must be re-added to the queue to vote again in future rounds. The index must be incremented by `n` to maintain proper ordering.

```python
# Wrong: Not re-adding the survivor
if rTurn < dTurn:
    pass  # R survives but isn't re-added

# Correct: Re-add survivor with updated index
if rTurn < dTurn:
    R.append(rTurn + n)
```
