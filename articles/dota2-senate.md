## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Greedy (Two Queues)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy

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
