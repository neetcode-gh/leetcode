## 1. Using Stack

::tabs-start

```python
class Solution:
    def findPermutation(self, s: str) -> List[int]:
        res = [0] * (len(s) + 1)
        stack = []
        j = 0

        for i in range(1, len(s) + 1):
            if s[i - 1] == 'I':
                stack.append(i)
                while stack:
                    res[j] = stack.pop()
                    j += 1
            else:
                stack.append(i)

        stack.append(len(s) + 1)
        while stack:
            res[j] = stack.pop()
            j += 1

        return res
```

```java
class Solution {
    public int[] findPermutation(String s) {
        int[] res = new int[s.length() + 1];
        Stack<Integer> stack = new Stack<>();
        int j = 0;

        for (int i = 1; i <= s.length(); i++) {
            if (s.charAt(i - 1) == 'I') {
                stack.push(i);
                while (!stack.isEmpty()) {
                    res[j++] = stack.pop();
                }
            } else {
                stack.push(i);
            }
        }

        stack.push(s.length() + 1);
        while (!stack.isEmpty()) {
            res[j++] = stack.pop();
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findPermutation(string s) {
        vector<int> res(s.length() + 1);
        stack<int> stk;
        int j = 0;

        for (int i = 1; i <= s.length(); i++) {
            if (s[i - 1] == 'I') {
                stk.push(i);
                while (!stk.empty()) {
                    res[j++] = stk.top();
                    stk.pop();
                }
            } else {
                stk.push(i);
            }
        }

        stk.push(s.length() + 1);
        while (!stk.empty()) {
            res[j++] = stk.top();
            stk.pop();
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number[]}
     */
    findPermutation(s) {
        const n = s.length;
        const res = new Array(n + 1);
        const stack = [];
        let j = 0;

        for (let i = 1; i <= n; i++) {
            if (s[i - 1] === 'I') {
                stack.push(i);
                while (stack.length > 0) {
                    res[j++] = stack.pop();
                }
            } else {
                stack.push(i);
            }
        }

        stack.push(n + 1);
        while (stack.length > 0) {
            res[j++] = stack.pop();
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of elements in the resultant arrangement

---

## 2. Reversing the subarray

::tabs-start

```python
class Solution:
    def findPermutation(self, s: str) -> List[int]:
        n = len(s)
        res = [i + 1 for i in range(n + 1)]

        i = 1

        while i <= n:
            j = i

            while i <= n and s[i - 1] == 'D':
                i += 1

            self.reverse(res, j - 1, i)
            i += 1

        return res

    def reverse(self, a: List[int], start: int, end: int) -> None:
        for i in range((end - start) // 2):
            temp = a[i + start]
            a[i + start] = a[end - i - 1]
            a[end - i - 1] = temp
```

```java
class Solution {
    public int[] findPermutation(String s) {
        int[] res = new int[s.length() + 1];

        for (int i = 0; i < res.length; i++) {
            res[i] = i + 1;
        }

        int i = 1;

        while (i <= s.length()) {
            int j = i;

            while (i <= s.length() && s.charAt(i - 1) == 'D') {
                i++;
            }

            reverse(res, j - 1, i);
            i++;
        }

        return res;
    }

    public void reverse(int[] a, int start, int end) {
        for (int i = 0; i < (end - start) / 2; i++) {
            int temp = a[i + start];
            a[i + start] = a[end - i - 1];
            a[end - i - 1] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> findPermutation(string s) {
        int n = s.length();
        vector<int> res(n + 1);

        for (int i = 0; i < res.size(); i++) {
            res[i] = i + 1;
        }

        int i = 1;

        while (i <= n) {
            int j = i;

            while (i <= n && s[i - 1] == 'D') {
                i++;
            }

            reverse(res, j - 1, i);
            i++;
        }

        return res;
    }

    void reverse(vector<int>& a, int start, int end) {
        for (int i = 0; i < (end - start) / 2; i++) {
            int temp = a[i + start];
            a[i + start] = a[end - i - 1];
            a[end - i - 1] = temp;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number[]}
     */
    findPermutation(s) {
        const n = s.length;
        const res = new Array(n + 1);

        for (let i = 0; i < res.length; i++) {
            res[i] = i + 1;
        }

        let i = 1;

        while (i <= n) {
            let j = i;

            while (i <= n && s[i - 1] === 'D') {
                i++;
            }

            this.reverse(res, j - 1, i);
            i++;
        }

        return res;
    }

    /**
     * @param {number[]} a
     * @param {number} start
     * @param {number} end
     */
    reverse(a, start, end) {
        for (let i = 0; i < Math.floor((end - start) / 2); i++) {
            let temp = a[i + start];
            a[i + start] = a[end - i - 1];
            a[end - i - 1] = temp;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

>  Where $n$ is the size of the resultant array

---

## 3. Two pointers

::tabs-start

```python
class Solution:
    def findPermutation(self, s: str) -> List[int]:
        n = len(s)
        res = [0] * (n + 1)
        res[0] = 1
        i = 1

        while i <= n:
            res[i] = i + 1
            j = i

            if s[i - 1] == 'D':
                while i <= n and s[i - 1] == 'D':
                    i += 1

                k, c = j - 1, i
                while k <= i - 1:
                    res[k] = c
                    k += 1
                    c -= 1
            else:
                i += 1

        return res
```

```java
class Solution {
    public int[] findPermutation(String s) {
        int[] res = new int[s.length() + 1];
        res[0] = 1;
        int i = 1;

        while (i <= s.length()) {
            res[i] = i + 1;
            int j = i;

            if (s.charAt(i - 1) == 'D') {
                while (i <= s.length() && s.charAt(i - 1) == 'D') {
                    i++;
                }

                for (int k = j - 1, c = i; k <= i - 1; k++, c--) {
                    res[k] = c;
                }
            } else {
                i++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findPermutation(string s) {
        int n = s.length();
        vector<int> res(n + 1);
        res[0] = 1;
        int i = 1;

        while (i <= n) {
            res[i] = i + 1;
            int j = i;

            if (s[i - 1] == 'D') {
                while (i <= n && s[i - 1] == 'D') {
                    i++;
                }

                for (int k = j - 1, c = i; k <= i - 1; k++, c--) {
                    res[k] = c;
                }
            } else {
                i++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number[]}
     */
    findPermutation(s) {
        const n = s.length;
        const res = new Array(n + 1);
        res[0] = 1;
        let i = 1;

        while (i <= n) {
            res[i] = i + 1;
            let j = i;

            if (s[i - 1] === 'D') {
                while (i <= n && s[i - 1] === 'D') {
                    i++;
                }

                for (let k = j - 1, c = i; k <= i - 1; k++, c--) {
                    res[k] = c;
                }
            } else {
                i++;
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

>  Where $n$ is the size of the resultant array
