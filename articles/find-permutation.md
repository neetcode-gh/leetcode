## 1. Using Stack

### Intuition

To produce the lexicographically smallest permutation, we want to place smaller numbers as early as possible. The string tells us the relationship between consecutive elements: 'I' means increasing, 'D' means decreasing. When we encounter a sequence of 'D's, we need to reverse the order of those numbers. A stack naturally handles this: push numbers onto the stack during 'D' sequences, then pop them all when we hit an 'I' (or the end), which reverses their order.

### Algorithm

1. Initialize an empty result array and a stack.
2. Iterate through positions `1` to `n`:
   - If the character at position `i-1` is 'I', push `i` onto the stack, then pop all elements from the stack into the result.
   - If the character is 'D', just push `i` onto the stack.
3. After the loop, push `n+1` onto the stack and pop all remaining elements into the result.
4. Return the result array.

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

```csharp
public class Solution {
    public int[] FindPermutation(string s) {
        int[] res = new int[s.Length + 1];
        Stack<int> stack = new Stack<int>();
        int j = 0;

        for (int i = 1; i <= s.Length; i++) {
            if (s[i - 1] == 'I') {
                stack.Push(i);
                while (stack.Count > 0) {
                    res[j++] = stack.Pop();
                }
            } else {
                stack.Push(i);
            }
        }

        stack.Push(s.Length + 1);
        while (stack.Count > 0) {
            res[j++] = stack.Pop();
        }

        return res;
    }
}
```

```go
func findPermutation(s string) []int {
    n := len(s)
    res := make([]int, n+1)
    stack := []int{}
    j := 0

    for i := 1; i <= n; i++ {
        if s[i-1] == 'I' {
            stack = append(stack, i)
            for len(stack) > 0 {
                res[j] = stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                j++
            }
        } else {
            stack = append(stack, i)
        }
    }

    stack = append(stack, n+1)
    for len(stack) > 0 {
        res[j] = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        j++
    }

    return res
}
```

```kotlin
class Solution {
    fun findPermutation(s: String): IntArray {
        val n = s.length
        val res = IntArray(n + 1)
        val stack = ArrayDeque<Int>()
        var j = 0

        for (i in 1..n) {
            if (s[i - 1] == 'I') {
                stack.addLast(i)
                while (stack.isNotEmpty()) {
                    res[j++] = stack.removeLast()
                }
            } else {
                stack.addLast(i)
            }
        }

        stack.addLast(n + 1)
        while (stack.isNotEmpty()) {
            res[j++] = stack.removeLast()
        }

        return res
    }
}
```

```swift
class Solution {
    func findPermutation(_ s: String) -> [Int] {
        let n = s.count
        let chars = Array(s)
        var res = [Int](repeating: 0, count: n + 1)
        var stack = [Int]()
        var j = 0

        for i in 1...n {
            if chars[i - 1] == "I" {
                stack.append(i)
                while !stack.isEmpty {
                    res[j] = stack.removeLast()
                    j += 1
                }
            } else {
                stack.append(i)
            }
        }

        stack.append(n + 1)
        while !stack.isEmpty {
            res[j] = stack.removeLast()
            j += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of elements in the resultant arrangement

---

## 2. Reversing the Subarray

### Intuition

Start with the identity permutation `[1, 2, ..., n+1]`, which is already the smallest possible arrangement. Whenever we see a sequence of consecutive 'D's, we need those corresponding elements to be in decreasing order. We can achieve this by reversing the subarray that spans those 'D's. This maintains the smallest possible values in earlier positions while satisfying the decrease constraints.

### Algorithm

1. Initialize the result array as `[1, 2, 3, ..., n+1]`.
2. Iterate through the string:
   - When a 'D' is encountered, find the end of the consecutive 'D' sequence.
   - Reverse the subarray from the position before the first 'D' to the position after the last 'D'.
   - Continue from after the reversed segment.
3. Return the modified result array.

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

```csharp
public class Solution {
    public int[] FindPermutation(string s) {
        int n = s.Length;
        int[] res = new int[n + 1];

        for (int idx = 0; idx < res.Length; idx++) {
            res[idx] = idx + 1;
        }

        int i = 1;

        while (i <= n) {
            int j = i;

            while (i <= n && s[i - 1] == 'D') {
                i++;
            }

            Reverse(res, j - 1, i);
            i++;
        }

        return res;
    }

    private void Reverse(int[] a, int start, int end) {
        for (int i = 0; i < (end - start) / 2; i++) {
            int temp = a[i + start];
            a[i + start] = a[end - i - 1];
            a[end - i - 1] = temp;
        }
    }
}
```

```go
func findPermutation(s string) []int {
    n := len(s)
    res := make([]int, n+1)

    for i := range res {
        res[i] = i + 1
    }

    i := 1

    for i <= n {
        j := i

        for i <= n && s[i-1] == 'D' {
            i++
        }

        reverse(res, j-1, i)
        i++
    }

    return res
}

func reverse(a []int, start, end int) {
    for i := 0; i < (end-start)/2; i++ {
        a[i+start], a[end-i-1] = a[end-i-1], a[i+start]
    }
}
```

```kotlin
class Solution {
    fun findPermutation(s: String): IntArray {
        val n = s.length
        val res = IntArray(n + 1) { it + 1 }

        var i = 1

        while (i <= n) {
            val j = i

            while (i <= n && s[i - 1] == 'D') {
                i++
            }

            reverse(res, j - 1, i)
            i++
        }

        return res
    }

    private fun reverse(a: IntArray, start: Int, end: Int) {
        for (i in 0 until (end - start) / 2) {
            val temp = a[i + start]
            a[i + start] = a[end - i - 1]
            a[end - i - 1] = temp
        }
    }
}
```

```swift
class Solution {
    func findPermutation(_ s: String) -> [Int] {
        let n = s.count
        let chars = Array(s)
        var res = (1...n + 1).map { $0 }

        var i = 1

        while i <= n {
            let j = i

            while i <= n && chars[i - 1] == "D" {
                i += 1
            }

            reverse(&res, j - 1, i)
            i += 1
        }

        return res
    }

    private func reverse(_ a: inout [Int], _ start: Int, _ end: Int) {
        for i in 0..<(end - start) / 2 {
            let temp = a[i + start]
            a[i + start] = a[end - i - 1]
            a[end - i - 1] = temp
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

## 3. Two Pointers

### Intuition

We can build the result directly without explicitly reversing subarrays. For 'I' characters, we simply place the next available number. For 'D' sequences, we need to place a decreasing run of numbers. When we find a sequence of `k` consecutive 'D's, we fill those `k+1` positions with decreasing values starting from the highest value in that range. This is done by identifying the 'D' segment boundaries and filling values in reverse order.

### Algorithm

1. Initialize `result[0] = 1` and iterate through the string.
2. For each position:
   - If the character is 'I', set the default value for the current position.
   - If the character is 'D', find the entire consecutive 'D' sequence.
   - Fill the positions covered by this 'D' sequence with decreasing values.
3. Return the result array.

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

```csharp
public class Solution {
    public int[] FindPermutation(string s) {
        int n = s.Length;
        int[] res = new int[n + 1];
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
}
```

```go
func findPermutation(s string) []int {
    n := len(s)
    res := make([]int, n+1)
    res[0] = 1
    i := 1

    for i <= n {
        res[i] = i + 1
        j := i

        if s[i-1] == 'D' {
            for i <= n && s[i-1] == 'D' {
                i++
            }

            for k, c := j-1, i; k <= i-1; k, c = k+1, c-1 {
                res[k] = c
            }
        } else {
            i++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findPermutation(s: String): IntArray {
        val n = s.length
        val res = IntArray(n + 1)
        res[0] = 1
        var i = 1

        while (i <= n) {
            res[i] = i + 1
            val j = i

            if (s[i - 1] == 'D') {
                while (i <= n && s[i - 1] == 'D') {
                    i++
                }

                var k = j - 1
                var c = i
                while (k <= i - 1) {
                    res[k] = c
                    k++
                    c--
                }
            } else {
                i++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findPermutation(_ s: String) -> [Int] {
        let n = s.count
        let chars = Array(s)
        var res = [Int](repeating: 0, count: n + 1)
        res[0] = 1
        var i = 1

        while i <= n {
            res[i] = i + 1
            let j = i

            if chars[i - 1] == "D" {
                while i <= n && chars[i - 1] == "D" {
                    i += 1
                }

                var k = j - 1
                var c = i
                while k <= i - 1 {
                    res[k] = c
                    k += 1
                    c -= 1
                }
            } else {
                i += 1
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

>  Where $n$ is the size of the resultant array
