## 1. Brute Force

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []

        for num in range(low, high + 1):
            s = str(num)
            flag = True
            for i in range(1, len(s)):
                if ord(s[i]) - ord(s[i - 1]) != 1:
                    flag = False
                    break
            if flag:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        for (int num = low; num <= high; num++) {
            String s = String.valueOf(num);
            boolean flag = true;
            for (int i = 1; i < s.length(); i++) {
                if (s.charAt(i) - s.charAt(i - 1) != 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.add(num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        for (int num = low; num <= high; num++) {
            string s = to_string(num);
            bool flag = true;
            for (int i = 1; i < s.size(); i++) {
                if (s[i] - s[i - 1] != 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        for (let num = low; num <= high; num++) {
            const s = num.toString();
            let flag = true;
            for (let i = 1; i < s.length; i++) {
                if (s.charCodeAt(i) - s.charCodeAt(i - 1) !== 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.push(num);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Simulation

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []
        low_digit, high_digit = len(str(low)), len(str(high))

        for digits in range(low_digit, high_digit + 1):
            for start in range(1, 10):
                if start + digits > 10:
                    break
                num = start
                prev = start
                for i in range(digits - 1):
                    num = num * 10
                    prev += 1
                    num += prev
                if low <= num <= high:
                    res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        int lowDigit = String.valueOf(low).length();
        int highDigit = String.valueOf(high).length();

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.add(num);
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
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        int lowDigit = to_string(low).length();
        int highDigit = to_string(high).length();

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.push_back(num);
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
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        const lowDigit = low.toString().length;
        const highDigit = high.toString().length;

        for (let digits = lowDigit; digits <= highDigit; digits++) {
            for (let start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                let num = start;
                let prev = start;
                for (let i = 1; i < digits; i++) {
                    num = num * 10 + ++prev;
                }
                if (num >= low && num <= high) {
                    res.push(num);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 3. Breadth First Search

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []
        queue = deque(range(1, 10))

        while queue:
            n = queue.popleft()
            if n > high:
                continue
            if low <= n <= high:
                res.append(n)
            ones = n % 10
            if ones < 9:
                queue.append(n * 10 + (ones + 1))

        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();

        for (int i = 1; i < 10; i++) {
            queue.add(i);
        }

        while (!queue.isEmpty()) {
            int n = queue.poll();
            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.add(n);
            }
            int ones = n % 10;
            if (ones < 9) {
                queue.add(n * 10 + (ones + 1));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        queue<int> queue;

        for (int i = 1; i < 10; i++) {
            queue.push(i);
        }

        while (!queue.empty()) {
            int n = queue.front();
            queue.pop();

            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.push_back(n);
            }
            int ones = n % 10;
            if (ones < 9) {
                queue.push(n * 10 + (ones + 1));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        const queue = new Queue();
        for (let i = 1; i < 9; i++) {
            queue.push(i);
        }

        while (!queue.isEmpty()) {
            const n = queue.pop();
            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.push(n);
            }
            const ones = n % 10;
            if (ones < 9) {
                queue.push(n * 10 + (ones + 1));
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 4. Depth First Search

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []

        def dfs(num):
            if num > high:
                return
            if low <= num <= high:
                res.append(num)
            last_digit = num % 10
            if last_digit < 9:
                dfs(num * 10 + (last_digit + 1))

        for i in range(1, 10):
            dfs(i)

        return sorted(res)
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();

        for (int i = 1; i < 10; i++) {
            dfs(i, low, high, res);
        }

        Collections.sort(res);
        return res;
    }

    private void dfs(int num, int low, int high, List<Integer> res) {
        if (num > high) {
            return;
        }
        if (num >= low) {
            res.add(num);
        }
        int lastDigit = num % 10;
        if (lastDigit < 9) {
            dfs(num * 10 + (lastDigit + 1), low, high, res);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        for (int i = 1; i < 10; i++) {
            dfs(i, low, high, res);
        }
        sort(res.begin(), res.end());
        return res;
    }

private:
    void dfs(int num, int low, int high, vector<int>& res) {
        if (num > high) {
            return;
        }
        if (num >= low) {
            res.push_back(num);
        }
        int lastDigit = num % 10;
        if (lastDigit < 9) {
            dfs(num * 10 + (lastDigit + 1), low, high, res);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];

        const dfs = (num) => {
            if (num > high) {
                return;
            }
            if (num >= low) {
                res.push(num);
            }
            const lastDigit = num % 10;
            if (lastDigit < 9) {
                dfs(num * 10 + (lastDigit + 1));
            }
        };

        for (let i = 1; i < 10; i++) {
            dfs(i);
        }

        return res.sort((a, b) => a - b);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 5. Sliding Window

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        nums = "123456789"
        res = []
        for d in range(2, 10):
            for i in range(9 - d + 1):
                num = int(nums[i: i + d])
                if num > high:
                    break
                if low <= num <= high:
                    res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        String nums = "123456789";
        List<Integer> res = new ArrayList<>();

        for (int d = 2; d <= 9; d++) {
            for (int i = 0; i <= 9 - d; i++) {
                int num = Integer.parseInt(nums.substring(i, i + d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.add(num);
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
    vector<int> sequentialDigits(int low, int high) {
        string nums = "123456789";
        vector<int> res;

        for (int d = 2; d <= 9; d++) {
            for (int i = 0; i <= 9 - d; i++) {
                int num = stoi(nums.substr(i, d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.push_back(num);
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
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const nums = '123456789';
        const res = [];

        for (let d = 2; d <= 9; d++) {
            for (let i = 0; i <= 9 - d; i++) {
                const num = parseInt(nums.substring(i, i + d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.push(num);
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.
