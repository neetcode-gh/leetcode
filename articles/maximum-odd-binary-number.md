## 1. Sorting

### Intuition

A binary number is odd if and only if its last bit is `1`. To maximize the number, we want as many `1`s as possible in the higher-order positions (leftmost).

We can sort the string in descending order to push all `1`s to the front. Then, we swap one `1` to the last position to ensure the number is odd. Since we sorted in descending order, the rightmost `1` is easy to find.

### Algorithm

1. Convert the string to a character array and sort in descending order (all `1`s come first).
2. Find the last `1` in the sorted array (it will be at the boundary between `1`s and `0`s).
3. Swap this `1` with the last character of the array.
4. Return the resulting string.

::tabs-start

```python
class Solution:
    def maximumOddBinaryNumber(self, s: str) -> str:
        s = sorted(s)
        s.reverse()
        i = len(s) - 1
        while i >= 0 and s[i] == "0":
            i -= 1

        s[i], s[len(s) - 1] = s[len(s) - 1], s[i]
        return ''.join(s)
```

```java
public class Solution {
    public String maximumOddBinaryNumber(String s) {
        char[] arr = s.toCharArray();
        Arrays.sort(arr);
        reverse(arr);

        int n = arr.length;
        int i = n - 1;

        while (i >= 0 && arr[i] == '0') {
            i--;
        }

        char temp = arr[i];
        arr[i] = arr[n - 1];
        arr[n - 1] = temp;

        return new String(arr);
    }

    private void reverse(char[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            char temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    string maximumOddBinaryNumber(string s) {
        sort(s.begin(), s.end(), greater<char>());

        int n = s.size(), i = n - 1;
        while (i >= 0 && s[i] == '0') {
            i--;
        }

        swap(s[i], s[n - 1]);
        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    maximumOddBinaryNumber(s) {
        let arr = s.split('');
        arr.sort().reverse();

        let i = arr.length - 1;
        while (i >= 0 && arr[i] === '0') {
            i--;
        }

        [arr[i], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i]];
        return arr.join('');
    }
}
```

```go
func maximumOddBinaryNumber(s string) string {
    arr := []byte(s)
    sort.Slice(arr, func(i, j int) bool {
        return arr[i] > arr[j]
    })

    n := len(arr)
    i := n - 1
    for i >= 0 && arr[i] == '0' {
        i--
    }

    arr[i], arr[n-1] = arr[n-1], arr[i]
    return string(arr)
}
```

```kotlin
class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        val arr = s.toCharArray()
        arr.sortDescending()

        val n = arr.size
        var i = n - 1
        while (i >= 0 && arr[i] == '0') {
            i--
        }

        val temp = arr[i]
        arr[i] = arr[n - 1]
        arr[n - 1] = temp

        return String(arr)
    }
}
```

```swift
class Solution {
    func maximumOddBinaryNumber(_ s: String) -> String {
        var arr = Array(s).sorted(by: >)
        let n = arr.count
        var i = n - 1

        while i >= 0 && arr[i] == "0" {
            i -= 1
        }

        arr.swapAt(i, n - 1)
        return String(arr)
    }
}
```

```csharp
public class Solution {
    public string MaximumOddBinaryNumber(string s) {
        char[] arr = s.ToCharArray();
        Array.Sort(arr);
        Array.Reverse(arr);
        int i = arr.Length - 1;
        while (i >= 0 && arr[i] == '0') {
            i--;
        }
        char temp = arr[i];
        arr[i] = arr[arr.Length - 1];
        arr[arr.Length - 1] = temp;
        return new string(arr);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Greedy

### Intuition

We do not actually need to sort. The optimal answer has a simple structure: place all but one `1` at the beginning, followed by all `0`s, and end with a single `1`.

We just need to count the `1`s. If there are `count` ones, the result is `(count - 1)` ones, then `(n - count)` zeros, then one `1`.

### Algorithm

1. Count the number of `1`s in the string.
2. Construct the result: `(count - 1)` ones + `(length - count)` zeros + `1`.
3. Return the constructed string.

::tabs-start

```python
class Solution:
    def maximumOddBinaryNumber(self, s: str) -> str:
        count = 0
        for c in s:
            if c == "1":
                count += 1

        return (count - 1) * "1" + (len(s) - count) * "0" + "1"
```

```java
public class Solution {
    public String maximumOddBinaryNumber(String s) {
        int count = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') count++;
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < count - 1; i++) result.append('1');
        for (int i = 0; i < s.length() - count; i++) result.append('0');
        result.append('1');

        return result.toString();
    }
}
```

```cpp
class Solution {
public:
    string maximumOddBinaryNumber(string s) {
        int count = 0;
        for (char c : s) {
            if (c == '1') count++;
        }

        string result((count - 1), '1');
        result += string(s.length() - count, '0');
        result += '1';

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    maximumOddBinaryNumber(s) {
        let count = 0;
        for (const c of s) {
            if (c === '1') count++;
        }

        return '1'.repeat(count - 1) + '0'.repeat(s.length - count) + '1';
    }
}
```

```go
func maximumOddBinaryNumber(s string) string {
    count := 0
    for _, c := range s {
        if c == '1' {
            count++
        }
    }

    return strings.Repeat("1", count-1) + strings.Repeat("0", len(s)-count) + "1"
}
```

```kotlin
class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        var count = 0
        for (c in s) {
            if (c == '1') count++
        }

        return "1".repeat(count - 1) + "0".repeat(s.length - count) + "1"
    }
}
```

```swift
class Solution {
    func maximumOddBinaryNumber(_ s: String) -> String {
        var count = 0
        for c in s {
            if c == "1" {
                count += 1
            }
        }

        return String(repeating: "1", count: count - 1) +
               String(repeating: "0", count: s.count - count) + "1"
    }
}
```

```csharp
public class Solution {
    public string MaximumOddBinaryNumber(string s) {
        int count = 0;
        foreach (char c in s) {
            if (c == '1') {
                count++;
            }
        }
        return new string('1', count - 1) + new string('0', s.Length - count) + "1";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers

### Intuition

We can rearrange the string in-place using a two-pointer technique similar to the partition step in quicksort. We move all `1`s to the left side of the array, then swap one `1` to the last position.

This achieves the same result as sorting but with a single O(n) pass.

### Algorithm

1. Convert the string to a character array.
2. Use a `left` pointer starting at `0`. Iterate through the array with index `i`.
3. Whenever `s[i] == '1'`, swap `s[i]` with `s[left]` and increment `left`.
4. After the loop, all `1`s are at positions `0` to `left - 1`.
5. Swap `s[left - 1]` with `s[n - 1]` to place one `1` at the end.
6. Return the resulting string.

::tabs-start

```python
class Solution:
    def maximumOddBinaryNumber(self, s: str) -> str:
        s = [c for c in s]
        left = 0

        for i in range(len(s)):
            if s[i] == "1":
                s[i], s[left] = s[left], s[i]
                left += 1
        s[left - 1], s[len(s) - 1] = s[len(s) - 1], s[left - 1]
        return "".join(s)
```

```java
public class Solution {
    public String maximumOddBinaryNumber(String s) {
        char[] arr = s.toCharArray();
        int left = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == '1') {
                char temp = arr[left];
                arr[left] = arr[i];
                arr[i] = temp;
                left++;
            }
        }

        char temp = arr[left - 1];
        arr[left - 1] = arr[arr.length - 1];
        arr[arr.length - 1] = temp;

        return new String(arr);
    }
}
```

```cpp
class Solution {
public:
    string maximumOddBinaryNumber(string s) {
        vector<char> arr(s.begin(), s.end());
        int left = 0;

        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] == '1') {
                swap(arr[left], arr[i]);
                left++;
            }
        }

        swap(arr[left - 1], arr[arr.size() - 1]);
        return string(arr.begin(), arr.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    maximumOddBinaryNumber(s) {
        let arr = s.split('');
        let left = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '1') {
                [arr[left], arr[i]] = [arr[i], arr[left]];
                left++;
            }
        }

        [arr[left - 1], arr[arr.length - 1]] = [
            arr[arr.length - 1],
            arr[left - 1],
        ];
        return arr.join('');
    }
}
```

```go
func maximumOddBinaryNumber(s string) string {
    arr := []byte(s)
    left := 0

    for i := 0; i < len(arr); i++ {
        if arr[i] == '1' {
            arr[left], arr[i] = arr[i], arr[left]
            left++
        }
    }

    arr[left-1], arr[len(arr)-1] = arr[len(arr)-1], arr[left-1]
    return string(arr)
}
```

```kotlin
class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        val arr = s.toCharArray()
        var left = 0

        for (i in arr.indices) {
            if (arr[i] == '1') {
                val temp = arr[left]
                arr[left] = arr[i]
                arr[i] = temp
                left++
            }
        }

        val temp = arr[left - 1]
        arr[left - 1] = arr[arr.size - 1]
        arr[arr.size - 1] = temp

        return String(arr)
    }
}
```

```swift
class Solution {
    func maximumOddBinaryNumber(_ s: String) -> String {
        var arr = Array(s)
        var left = 0

        for i in 0..<arr.count {
            if arr[i] == "1" {
                arr.swapAt(left, i)
                left += 1
            }
        }

        arr.swapAt(left - 1, arr.count - 1)
        return String(arr)
    }
}
```

```csharp
public class Solution {
    public string MaximumOddBinaryNumber(string s) {
        char[] arr = s.ToCharArray();
        int left = 0;

        for (int i = 0; i < arr.Length; i++) {
            if (arr[i] == '1') {
                char temp = arr[i];
                arr[i] = arr[left];
                arr[left] = temp;
                left++;
            }
        }
        char t = arr[left - 1];
        arr[left - 1] = arr[arr.Length - 1];
        arr[arr.Length - 1] = t;

        return new string(arr);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
