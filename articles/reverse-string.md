## 1. Array

::tabs-start

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        tmp = []
        for i in range(len(s) - 1, -1, -1):
            tmp.append(s[i])
        for i in range(len(s)):
            s[i] = tmp[i]
```

```java
public class Solution {
    public void reverseString(char[] s) {
        char[] tmp = new char[s.length];
        for (int i = s.length - 1, j = 0; i >= 0; i--, j++) {
            tmp[j] = s[i];
        }
        for (int i = 0; i < s.length; i++) {
            s[i] = tmp[i];
        }
    }
}
```

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        vector<char> tmp;
        for (int i = s.size() - 1; i >= 0; i--) {
            tmp.push_back(s[i]);
        }
        for (int i = 0; i < s.size(); i++) {
            s[i] = tmp[i];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseString(s) {
        const tmp = [];
        for (let i = s.length - 1; i >= 0; i--) {
            tmp.push(s[i]);
        }
        for (let i = 0; i < s.length; i++) {
            s[i] = tmp[i];
        }
    }
}
```

```csharp
public class Solution {
    public void ReverseString(char[] s) {
        char[] tmp = new char[s.Length];
        int n = s.Length;

        for (int i = 0; i < n; i++) {
            tmp[i] = s[n - 1 - i];
        }

        for (int i = 0; i < n; i++) {
            s[i] = tmp[i];
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        def reverse(l, r):
            if l < r:
                reverse(l + 1, r - 1)
                s[l], s[r] = s[r], s[l]

        reverse(0, len(s) - 1)
```

```java
public class Solution {
    public void reverseString(char[] s) {
        reverse(s, 0, s.length - 1);
    }

    private void reverse(char[] s, int l, int r) {
        if (l < r) {
            reverse(s, l + 1, r - 1);
            char temp = s[l];
            s[l] = s[r];
            s[r] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        reverse(s, 0, s.size() - 1);
    }

private:
    void reverse(vector<char>& s, int l, int r) {
        if (l < r) {
            reverse(s, l + 1, r - 1);
            swap(s[l], s[r]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseString(s) {
        const reverse = (l, r) => {
            if (l < r) {
                reverse(l + 1, r - 1);
                [s[l], s[r]] = [s[r], s[l]];
            }
        };
        reverse(0, s.length - 1);
    }
}
```

```csharp
public class Solution {
    public void ReverseString(char[] s) {
        Reverse(s, 0, s.Length - 1);
    }

    private void Reverse(char[] s, int left, int right) {
        if (left < right) {
            Reverse(s, left + 1, right - 1);
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Stack

::tabs-start

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        stack = []
        for c in s:
            stack.append(c)
        i = 0
        while stack:
            s[i] = stack.pop()
            i += 1
```

```java
public class Solution {
    public void reverseString(char[] s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s) {
            stack.push(c);
        }
        int i = 0;
        while (!stack.isEmpty()) {
            s[i++] = stack.pop();
        }
    }
}
```

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        stack<char> stk;
        for (char& c : s) {
            stk.push(c);
        }
        int i = 0;
        while (!stk.empty()) {
            s[i++] = stk.top();
            stk.pop();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseString(s) {
        const stack = [];
        for (const c of s) {
            stack.push(c);
        }
        let i = 0;
        while (stack.length) {
            s[i++] = stack.pop();
        }
    }
}
```

```csharp
public class Solution {
    public void ReverseString(char[] s) {
        Stack<char> stack = new Stack<char>();

        foreach (char c in s) {
            stack.Push(c);
        }

        for (int i = 0; i < s.Length; i++) {
            s[i] = stack.Pop();
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Built-In Function

::tabs-start

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        s.reverse()
```

```java
public class Solution {
    public void reverseString(char[] s) {
        List<Character> list = new ArrayList<>();
        for (char c : s) {
            list.add(c);
        }
        Collections.reverse(list);

        for (int i = 0; i < s.length; i++) {
            s[i] = list.get(i);
        }
    }
}
```

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        reverse(s.begin(), s.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseString(s) {
        s.reverse();
    }
}
```

```csharp
public class Solution {
    public void ReverseString(char[] s) {
        Array.Reverse(s);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Two Pointers

::tabs-start

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        l, r = 0, len(s) - 1
        while l < r:
            s[l], s[r] = s[r], s[l]
            l += 1
            r -= 1
```

```java
public class Solution {
    public void reverseString(char[] s) {
        int l = 0, r = s.length - 1;
        while (l < r) {
            char temp = s[l];
            s[l] = s[r];
            s[r] = temp;
            l++;
            r--;
        }
    }
}
```

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            swap(s[l++], s[r--]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} s
     * @return {void} Do not return anything, modify s in-place instead.
     */
    reverseString(s) {
        let l = 0,
            r = s.length - 1;
        while (l < r) {
            [s[l], s[r]] = [s[r], s[l]];
            l++;
            r--;
        }
    }
}
```

```csharp
public class Solution {
    public void ReverseString(char[] s) {
        int l = 0, r = s.Length - 1;
        while (l < r) {
            char temp = s[l];
            s[l] = s[r];
            s[r] = temp;
            l++;
            r--;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
