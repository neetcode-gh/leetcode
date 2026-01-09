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

```go
func reverseString(s []byte) {
    tmp := make([]byte, len(s))
    for i := len(s) - 1; i >= 0; i-- {
        tmp[len(s)-1-i] = s[i]
    }
    for i := 0; i < len(s); i++ {
        s[i] = tmp[i]
    }
}
```

```kotlin
class Solution {
    fun reverseString(s: CharArray): Unit {
        val tmp = CharArray(s.size)
        val n = s.size

        for (i in 0 until n) {
            tmp[i] = s[n - 1 - i]
        }

        for (i in 0 until n) {
            s[i] = tmp[i]
        }
    }
}
```

```swift
class Solution {
    func reverseString(_ s: inout [Character]) {
        var tmp = [Character]()
        for i in stride(from: s.count - 1, through: 0, by: -1) {
            tmp.append(s[i])
        }
        for i in 0..<s.count {
            s[i] = tmp[i]
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

```go
func reverseString(s []byte) {
    var reverse func(l, r int)
    reverse = func(l, r int) {
        if l < r {
            reverse(l+1, r-1)
            s[l], s[r] = s[r], s[l]
        }
    }
    reverse(0, len(s)-1)
}
```

```kotlin
class Solution {
    fun reverseString(s: CharArray): Unit {
        reverse(s, 0, s.size - 1)
    }

    private fun reverse(s: CharArray, l: Int, r: Int) {
        if (l < r) {
            reverse(s, l + 1, r - 1)
            val temp = s[l]
            s[l] = s[r]
            s[r] = temp
        }
    }
}
```

```swift
class Solution {
    func reverseString(_ s: inout [Character]) {
        reverse(&s, 0, s.count - 1)
    }

    private func reverse(_ s: inout [Character], _ l: Int, _ r: Int) {
        if l < r {
            reverse(&s, l + 1, r - 1)
            let temp = s[l]
            s[l] = s[r]
            s[r] = temp
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

```go
func reverseString(s []byte) {
    stack := make([]byte, 0)
    for _, c := range s {
        stack = append(stack, c)
    }
    for i := 0; i < len(s); i++ {
        s[i] = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
    }
}
```

```kotlin
class Solution {
    fun reverseString(s: CharArray): Unit {
        val stack = ArrayDeque<Char>()
        for (c in s) {
            stack.addLast(c)
        }
        for (i in s.indices) {
            s[i] = stack.removeLast()
        }
    }
}
```

```swift
class Solution {
    func reverseString(_ s: inout [Character]) {
        var stack = [Character]()
        for c in s {
            stack.append(c)
        }
        for i in 0..<s.count {
            s[i] = stack.removeLast()
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

```go
func reverseString(s []byte) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}
```

```kotlin
class Solution {
    fun reverseString(s: CharArray): Unit {
        s.reverse()
    }
}
```

```swift
class Solution {
    func reverseString(_ s: inout [Character]) {
        s.reverse()
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

```go
func reverseString(s []byte) {
    l, r := 0, len(s)-1
    for l < r {
        s[l], s[r] = s[r], s[l]
        l++
        r--
    }
}
```

```kotlin
class Solution {
    fun reverseString(s: CharArray): Unit {
        var l = 0
        var r = s.size - 1
        while (l < r) {
            val temp = s[l]
            s[l] = s[r]
            s[r] = temp
            l++
            r--
        }
    }
}
```

```swift
class Solution {
    func reverseString(_ s: inout [Character]) {
        var l = 0
        var r = s.count - 1
        while l < r {
            let temp = s[l]
            s[l] = s[r]
            s[r] = temp
            l += 1
            r -= 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
