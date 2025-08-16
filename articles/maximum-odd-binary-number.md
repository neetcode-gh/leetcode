## 1. Sorting

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
