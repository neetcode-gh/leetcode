## 1. Brute Force

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        res = list(dominoes)

        for i in range(n):
            if dominoes[i] != '.':
                continue

            l, r = i - 1, i + 1

            while l >= 0 and dominoes[l] == '.':
                l -= 1

            while r < n and dominoes[r] == '.':
                r += 1

            left_force = dominoes[l] if l >= 0 else None
            right_force = dominoes[r] if r < n else None

            if left_force == 'R' and right_force == 'L':
                if (i - l) < (r - i):
                    res[i] = 'R'
                elif (r - i) < (i - l):
                    res[i] = 'L'
            elif left_force == 'R':
                res[i] = 'R'
            elif right_force == 'L':
                res[i] = 'L'

        return "".join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        char[] res = dominoes.toCharArray();

        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) != '.') continue;

            int l = i - 1, r = i + 1;

            while (l >= 0 && dominoes.charAt(l) == '.') l--;
            while (r < n && dominoes.charAt(r) == '.') r++;

            char leftForce = (l >= 0) ? dominoes.charAt(l) : ' ';
            char rightForce = (r < n) ? dominoes.charAt(r) : ' ';

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R';
                else if ((r - i) < (i - l)) res[i] = 'L';
            } else if (leftForce == 'R') {
                res[i] = 'R';
            } else if (rightForce == 'L') {
                res[i] = 'L';
            }
        }

        return new String(res);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        vector<char> res(dominoes.begin(), dominoes.end());

        for (int i = 0; i < n; i++) {
            if (dominoes[i] != '.') continue;

            int l = i - 1, r = i + 1;

            while (l >= 0 && dominoes[l] == '.') l--;
            while (r < n && dominoes[r] == '.') r++;

            char leftForce = (l >= 0) ? dominoes[l] : ' ';
            char rightForce = (r < n) ? dominoes[r] : ' ';

            if (leftForce == 'R' && rightForce == 'L') {
                if ((i - l) < (r - i)) res[i] = 'R';
                else if ((r - i) < (i - l)) res[i] = 'L';
            } else if (leftForce == 'R') {
                res[i] = 'R';
            } else if (rightForce == 'L') {
                res[i] = 'L';
            }
        }

        return string(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const n = dominoes.length;
        const res = dominoes.split('');

        for (let i = 0; i < n; i++) {
            if (dominoes[i] !== '.') continue;

            let l = i - 1,
                r = i + 1;

            while (l >= 0 && dominoes[l] === '.') l--;
            while (r < n && dominoes[r] === '.') r++;

            const leftForce = l >= 0 ? dominoes[l] : null;
            const rightForce = r < n ? dominoes[r] : null;

            if (leftForce === 'R' && rightForce === 'L') {
                if (i - l < r - i) res[i] = 'R';
                else if (r - i < i - l) res[i] = 'L';
            } else if (leftForce === 'R') {
                res[i] = 'R';
            } else if (rightForce === 'L') {
                res[i] = 'L';
            }
        }

        return res.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for only the output string.

---

## 2. Force From Left & Right

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        left = [float('inf')] * n
        right = [float('inf')] * n
        res = list(dominoes)

        force = float('inf')
        for i in range(n):
            if dominoes[i] == 'R':
                force = 0
            elif dominoes[i] == 'L':
                force = float('inf')
            else:
                force += 1
            right[i] = force

        force = float('inf')
        for i in range(n - 1, -1, -1):
            if dominoes[i] == 'L':
                force = 0
            elif dominoes[i] == 'R':
                force = float('inf')
            else:
                force += 1
            left[i] = force

        for i in range(n):
            if left[i] < right[i]:
                res[i] = 'L'
            elif right[i] < left[i]:
                res[i] = 'R'

        return "".join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        int[] left = new int[n];
        int[] right = new int[n];
        char[] res = dominoes.toCharArray();

        int force = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (dominoes.charAt(i) == 'R') {
                force = 0;
            } else if (dominoes.charAt(i) == 'L') {
                force = Integer.MAX_VALUE;
            } else {
                force = force == Integer.MAX_VALUE ? Integer.MAX_VALUE : force + 1;
            }
            right[i] = force;
        }

        force = Integer.MAX_VALUE;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes.charAt(i) == 'L') {
                force = 0;
            } else if (dominoes.charAt(i) == 'R') {
                force = Integer.MAX_VALUE;
            } else {
                force = force == Integer.MAX_VALUE ? Integer.MAX_VALUE : force + 1;
            }
            left[i] = force;
        }

        for (int i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return new String(res);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        vector<int> left(n, INT_MAX);
        vector<int> right(n, INT_MAX);
        vector<char> res(dominoes.begin(), dominoes.end());

        int force = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') {
                force = 0;
            } else if (dominoes[i] == 'L') {
                force = INT_MAX;
            } else {
                force = (force == INT_MAX) ? INT_MAX : force + 1;
            }
            right[i] = force;
        }

        force = INT_MAX;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes[i] == 'L') {
                force = 0;
            } else if (dominoes[i] == 'R') {
                force = INT_MAX;
            } else {
                force = (force == INT_MAX) ? INT_MAX : force + 1;
            }
            left[i] = force;
        }

        for (int i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return string(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const n = dominoes.length;
        const left = new Array(n).fill(Infinity);
        const right = new Array(n).fill(Infinity);
        const res = dominoes.split('');

        let force = Infinity;
        for (let i = 0; i < n; i++) {
            if (dominoes[i] === 'R') {
                force = 0;
            } else if (dominoes[i] === 'L') {
                force = Infinity;
            } else {
                force = force === Infinity ? Infinity : force + 1;
            }
            right[i] = force;
        }

        force = Infinity;
        for (let i = n - 1; i >= 0; i--) {
            if (dominoes[i] === 'L') {
                force = 0;
            } else if (dominoes[i] === 'R') {
                force = Infinity;
            } else {
                force = force === Infinity ? Infinity : force + 1;
            }
            left[i] = force;
        }

        for (let i = 0; i < n; i++) {
            if (left[i] < right[i]) {
                res[i] = 'L';
            } else if (right[i] < left[i]) {
                res[i] = 'R';
            }
        }

        return res.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Simulation (Queue)

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        dom = list(dominoes)
        q = deque()

        for i, d in enumerate(dom):
            if d != ".":
                q.append((i, d))

        while q:
            i, d = q.popleft()

            if d == "L" and i > 0 and dom[i - 1] == ".":
                q.append((i - 1, "L"))
                dom[i - 1] = "L"
            elif d == "R":
                if i + 1 < len(dom) and dom[i + 1] == ".":
                    if i + 2 < len(dom) and dom[i + 2] == "L":
                        q.popleft()
                    else:
                        q.append((i + 1, "R"))
                        dom[i + 1] = "R"

        return "".join(dom)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        char[] dom = dominoes.toCharArray();
        Queue<int[]> q = new LinkedList<>();

        for (int i = 0; i < dom.length; i++) {
            if (dom[i] != '.') {
                q.add(new int[] {i, dom[i]});
            }
        }

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int i = curr[0];
            char d = (char) curr[1];

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.add(new int[] {i - 1, 'L'});
                dom[i - 1] = 'L';
            } else if (d == 'R') {
                if (i + 1 < dom.length && dom[i + 1] == '.') {
                    if (i + 2 < dom.length && dom[i + 2] == 'L') {
                        q.poll();
                    } else {
                        q.add(new int[] {i + 1, 'R'});
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return new String(dom);
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        vector<char> dom(dominoes.begin(), dominoes.end());
        queue<pair<int, char>> q;

        for (int i = 0; i < dom.size(); i++) {
            if (dom[i] != '.') {
                q.push({i, dom[i]});
            }
        }

        while (!q.empty()) {
            auto [i, d] = q.front();
            q.pop();

            if (d == 'L' && i > 0 && dom[i - 1] == '.') {
                q.push({i - 1, 'L'});
                dom[i - 1] = 'L';
            } else if (d == 'R') {
                if (i + 1 < dom.size() && dom[i + 1] == '.') {
                    if (i + 2 < dom.size() && dom[i + 2] == 'L') {
                        q.pop();
                    } else {
                        q.push({i + 1, 'R'});
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return string(dom.begin(), dom.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        const dom = dominoes.split('');
        const q = new Queue();

        for (let i = 0; i < dom.length; i++) {
            if (dom[i] !== '.') {
                q.push([i, dom[i]]);
            }
        }

        while (!q.isEmpty()) {
            const [i, d] = q.pop();

            if (d === 'L' && i > 0 && dom[i - 1] === '.') {
                q.push([i - 1, 'L']);
                dom[i - 1] = 'L';
            } else if (d === 'R') {
                if (i + 1 < dom.length && dom[i + 1] === '.') {
                    if (i + 2 < dom.length && dom[i + 2] === 'L') {
                        q.pop();
                    } else {
                        q.push([i + 1, 'R']);
                        dom[i + 1] = 'R';
                    }
                }
            }
        }

        return dom.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Iteration (Greedy)

::tabs-start

```python
class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        res = []
        dots = 0
        R = False

        for d in dominoes:
            if d == '.':
                dots += 1
            elif d == 'R':
                if R:
                    # Previous was 'R', and current is also 'R'.
                    # Append 'R' for all the dots between them.
                    res.append('R' * (dots + 1))
                elif dots > 0:
                    # Previous was not 'R'. The previous dots remain unchanged.
                    res.append('.' * dots)
                dots = 0
                R = True  # Current is 'R'
            else:
                if R:
                    # Append the previous 'R'.
                    res.append('R')
                    if dots > 0:
                        # Half the dots are affected by the previous 'R'.
                        res.append('R' * (dots // 2))

                        # Add a '.' if there's an odd number of dots.
                        if (dots % 2) != 0:
                            res.append('.')

                        # Append half the dots as 'L'.
                        res.append('L' * (dots // 2))

                    # Append the current 'L'.
                    res.append('L')
                    R, dots = False, 0
                else:
                    # There is no 'R' on the left.
                    # Append 'L' for all the dots and the current 'L'.
                    res.append('L' * (dots + 1))
                    dots = 0

        if R:
            # Trailing dots are affected by the last 'R'.
            res.append('R' * (dots + 1))
        else:
            # Trailing dots remain unchanged as there is no previous 'R'.
            res.append('.' * dots)

        return ''.join(res)
```

```java
public class Solution {
    public String pushDominoes(String dominoes) {
        StringBuilder res = new StringBuilder();
        int dots = 0;
        boolean R = false;

        for (char d : dominoes.toCharArray()) {
            if (d == '.') {
                dots++;
            } else if (d == 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res.append("R".repeat(dots + 1));
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res.append(".".repeat(dots));
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res.append("R");
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res.append("R".repeat(dots / 2));

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 != 0) {
                            res.append(".");
                        }

                        // Append half the dots as 'L'.
                        res.append("L".repeat(dots / 2));
                    }
                    // Append the current 'L'.
                    res.append("L");
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res.append("L".repeat(dots + 1));
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res.append("R".repeat(dots + 1));
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res.append(".".repeat(dots));
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string pushDominoes(string dominoes) {
        string res = "";
        int dots = 0;
        bool R = false;

        for (char d : dominoes) {
            if (d == '.') {
                dots++;
            } else if (d == 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res += string(dots + 1, 'R');
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res += string(dots, '.');
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res += 'R';
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res += string(dots / 2, 'R');

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 != 0) {
                            res += '.';
                        }

                        // Append half the dots as 'L'.
                        res += string(dots / 2, 'L');
                    }
                    // Append the current 'L'.
                    res += 'L';
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res += string(dots + 1, 'L');
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res += string(dots + 1, 'R');
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res += string(dots, '.');
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} dominoes
     * @return {string}
     */
    pushDominoes(dominoes) {
        let res = [];
        let dots = 0;
        let R = false;

        for (let d of dominoes) {
            if (d === '.') {
                dots++;
            } else if (d === 'R') {
                if (R) {
                    // Previous was 'R', and current is also 'R'.
                    // Append 'R' for all the dots between them.
                    res.push('R'.repeat(dots + 1));
                } else if (dots > 0) {
                    // Previous was not 'R'. The previous dots remain unchanged.
                    res.push('.'.repeat(dots));
                }
                dots = 0;
                R = true; // Current is 'R'.
            } else {
                if (R) {
                    // Append the previous 'R'.
                    res.push('R');
                    if (dots > 0) {
                        // Half the dots are affected by the previous 'R'.
                        res.push('R'.repeat(Math.floor(dots / 2)));

                        // Add a '.' if there's an odd number of dots.
                        if (dots % 2 !== 0) {
                            res.push('.');
                        }

                        // Append half the dots as 'L'.
                        res.push('L'.repeat(Math.floor(dots / 2)));
                    }
                    // Append the current 'L'.
                    res.push('L');
                    R = false;
                    dots = 0;
                } else {
                    // There is no 'R' on the left.
                    // Append 'L' for all the dots and the current 'L'.
                    res.push('L'.repeat(dots + 1));
                    dots = 0;
                }
            }
        }

        if (R) {
            // Trailing dots are affected by the last 'R'.
            res.push('R'.repeat(dots + 1));
        } else {
            // Trailing dots remain unchanged as there is no previous 'R'.
            res.push('.'.repeat(dots));
        }

        return res.join('');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for only the output string.
