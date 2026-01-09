## 1. Binary Search + Fixed Size Sliding Window

### Intuition

The answer has a monotonic property: if we can find a valid substring of length `L`, then there must also exist valid substrings of all lengths less than `L`. This makes binary search applicable. We binary search on the answer length and for each candidate length, use a fixed-size sliding window to check if any window of that size has at most `k` distinct characters.

### Algorithm

1. If `k >= n`, return `n` (entire string is valid).
2. Binary search on the answer with `left = k` and `right = n`.
3. For each midpoint `mid`, check if a valid window of size `mid` exists:
   - Use a hash map to count characters in the initial window.
   - Slide the window across the string, adding the new character and removing the old one.
   - If at any point the distinct count is at most `k`, return `true`.
4. Based on the result, narrow the search range.
5. Return `left` as the final answer.

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        n = len(s)
        if k >= n:
            return n
        left, right = k, n
        
        def isValid(size):
            counter = collections.Counter(s[:size])
            if len(counter) <= k:
                return True
            for i in range(size, n):
                counter[s[i]] += 1
                counter[s[i - size]] -= 1
                if counter[s[i - size]] == 0:
                    del counter[s[i - size]]
                if len(counter) <= k:
                    return True
            return False
        
        while left < right:
            mid = (left + right + 1) // 2
            
            if isValid(mid):
                left = mid
            else:
                right = mid - 1
        
        return left
```

```java
class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int n = s.length();
        if (k >= n) {
            return n;
        }
        
        int left = k, right = n;
        while (left < right) {
            int mid = (left + right + 1) / 2;
            
            if (isValid(s, mid, k)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
    private boolean isValid(String s, int size, int k) {
        int n = s.length();
        Map<Character, Integer> counter = new HashMap<>();
        
        for (int i = 0; i < size; i++) {
            char c = s.charAt(i);
            counter.put(c, counter.getOrDefault(c, 0) + 1);
        }
        
        if (counter.size() <= k) {
            return true;
        }
        
        for (int i = size; i < n; i++) {
            char c1 = s.charAt(i);
            counter.put(c1, counter.getOrDefault(c1, 0) + 1);
            char c2 = s.charAt(i - size);
            counter.put(c2, counter.getOrDefault(c2, 0) - 1);
            if (counter.get(c2) == 0) {
                counter.remove(c2);
            }
            if (counter.size() <= k) {
                return true;
            }
        }
        
        return false;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.length();
        if (k >= n) {
            return n;
        }
        
        int left = k, right = n;
        while (left < right) {
            int mid = (left + right + 1) / 2;
            
            if (isValid(s, mid, k)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
private:
    bool isValid(string s, int size, int k) {
        int n = s.length();
        unordered_map<char, int> counter;
        
        for (int i = 0; i < size; i++) {
            char c = s[i];
            counter[c]++;
        }
        
        if (counter.size() <= k) {
            return true;
        }
        
        for (int i = size; i < n; i++) {
            char c1 = s[i];
            counter[c1]++;
            char c2 = s[i - size];
            counter[c2]--;
            if (counter[c2] == 0) {
                counter.erase(c2);
            }
            if (counter.size() <= k) {
                return true;
            }
        }
        
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    lengthOfLongestSubstringKDistinct(s, k) {
        let n = s.length;
        if (k >= n) {
            return n;
        }

        let left = k, right = n;
        while (left < right) {
            let mid = Math.floor((left + right + 1) / 2);

            if (this.isValid(s, mid, k)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    /**
     * @param {string} s
     * @param {number} size
     * @param {number} k
     * @return {boolean}
     */
    isValid(s, size, k) {
        let n = s.length;
        let counter = new Map();

        for (let i = 0; i < size; i++) {
            let c = s.charAt(i);
            counter.set(c, (counter.get(c) || 0) + 1);
        }

        if (counter.size <= k) {
            return true;
        }

        for (let i = size; i < n; i++) {
            let c1 = s.charAt(i);
            counter.set(c1, (counter.get(c1) || 0) + 1);
            let c2 = s.charAt(i - size);
            counter.set(c2, (counter.get(c2) || 0) - 1);
            if (counter.get(c2) === 0) {
                counter.delete(c2);
            }
            if (counter.size <= k) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.Length;
        if (k >= n) {
            return n;
        }

        int left = k, right = n;
        while (left < right) {
            int mid = (left + right + 1) / 2;

            if (IsValid(s, mid, k)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    private bool IsValid(string s, int size, int k) {
        int n = s.Length;
        var counter = new Dictionary<char, int>();

        for (int i = 0; i < size; i++) {
            char c = s[i];
            if (!counter.ContainsKey(c)) counter[c] = 0;
            counter[c]++;
        }

        if (counter.Count <= k) {
            return true;
        }

        for (int i = size; i < n; i++) {
            char c1 = s[i];
            if (!counter.ContainsKey(c1)) counter[c1] = 0;
            counter[c1]++;
            char c2 = s[i - size];
            counter[c2]--;
            if (counter[c2] == 0) {
                counter.Remove(c2);
            }
            if (counter.Count <= k) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func lengthOfLongestSubstringKDistinct(s string, k int) int {
    n := len(s)
    if k >= n {
        return n
    }

    left, right := k, n
    for left < right {
        mid := (left + right + 1) / 2

        if isValid(s, mid, k) {
            left = mid
        } else {
            right = mid - 1
        }
    }

    return left
}

func isValid(s string, size, k int) bool {
    n := len(s)
    counter := make(map[byte]int)

    for i := 0; i < size; i++ {
        counter[s[i]]++
    }

    if len(counter) <= k {
        return true
    }

    for i := size; i < n; i++ {
        counter[s[i]]++
        counter[s[i-size]]--
        if counter[s[i-size]] == 0 {
            delete(counter, s[i-size])
        }
        if len(counter) <= k {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringKDistinct(s: String, k: Int): Int {
        val n = s.length
        if (k >= n) {
            return n
        }

        var left = k
        var right = n
        while (left < right) {
            val mid = (left + right + 1) / 2

            if (isValid(s, mid, k)) {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return left
    }

    private fun isValid(s: String, size: Int, k: Int): Boolean {
        val n = s.length
        val counter = mutableMapOf<Char, Int>()

        for (i in 0 until size) {
            val c = s[i]
            counter[c] = (counter[c] ?: 0) + 1
        }

        if (counter.size <= k) {
            return true
        }

        for (i in size until n) {
            val c1 = s[i]
            counter[c1] = (counter[c1] ?: 0) + 1
            val c2 = s[i - size]
            counter[c2] = counter[c2]!! - 1
            if (counter[c2] == 0) {
                counter.remove(c2)
            }
            if (counter.size <= k) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringKDistinct(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        if k >= n {
            return n
        }

        var left = k
        var right = n
        while left < right {
            let mid = (left + right + 1) / 2

            if isValid(chars, mid, k) {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return left
    }

    private func isValid(_ chars: [Character], _ size: Int, _ k: Int) -> Bool {
        let n = chars.count
        var counter = [Character: Int]()

        for i in 0..<size {
            counter[chars[i], default: 0] += 1
        }

        if counter.count <= k {
            return true
        }

        for i in size..<n {
            counter[chars[i], default: 0] += 1
            counter[chars[i - size]]! -= 1
            if counter[chars[i - size]] == 0 {
                counter.removeValue(forKey: chars[i - size])
            }
            if counter.count <= k {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.

---

## 2. Sliding Window

### Intuition

A variable-size sliding window is the natural fit for this problem. We expand the window by moving the right pointer and adding characters. When we exceed `k` distinct characters, we shrink the window from the left until we're back to at most `k` distinct characters. The maximum window size seen during this process is our answer.

### Algorithm

1. Initialize `left = 0`, `maxSize = 0`, and a hash map `counter` to track character frequencies.
2. For each `right` from `0` to `n-1`:
   - Add `s[right]` to the counter.
   - While the number of distinct characters exceeds `k`:
     - Decrement the count of `s[left]`.
     - If the count becomes `0`, remove it from the map.
     - Increment `left`.
   - Update `maxSize = max(maxSize, right - left + 1)`.
3. Return `maxSize`.

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        n = len(s)
        max_size = 0
        counter = collections.Counter()
        
        left = 0
        for right in range(n):
            counter[s[right]] += 1
            
            while len(counter) > k: 
                counter[s[left]] -= 1
                if counter[s[left]] == 0:
                    del counter[s[left]]
                left += 1
            
            max_size = max(max_size, right - left + 1)
                    
        return max_size
```

```java
class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int n = s.length();
        int maxSize = 0;
        Map<Character, Integer> counter = new HashMap<>();
        
        int left = 0;
        for (int right = 0; right < n; right++) {
            counter.put(s.charAt(right), counter.getOrDefault(s.charAt(right), 0) + 1);
            
            while (counter.size() > k) {
                counter.put(s.charAt(left), counter.get(s.charAt(left)) - 1);
                if (counter.get(s.charAt(left)) == 0) {
                    counter.remove(s.charAt(left));
                }
                left++;
            }
            
            maxSize = Math.max(maxSize, right - left + 1);
        }
                    
        return maxSize;  
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.length();
        int maxSize = 0;
        unordered_map<char, int> counter;
        
        int left = 0;
        for (int right = 0; right < n; right++) {
            counter[s[right]]++;
            
            while (counter.size() > k) {
                counter[s[left]]--;
                if (counter[s[left]] == 0) {
                    counter.erase(s[left]);
                }
                left++;
            }
            
            maxSize = max(maxSize, right - left + 1);
        }
                    
        return maxSize;  
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    lengthOfLongestSubstringKDistinct(s, k) {
        let n = s.length;
        let maxSize = 0;
        let counter = new Map();

        let left = 0;
        for (let right = 0; right < n; right++) {
            counter.set(s.charAt(right), (counter.get(s.charAt(right)) || 0) + 1);

            while (counter.size > k) {
                counter.set(s.charAt(left), counter.get(s.charAt(left)) - 1);
                if (counter.get(s.charAt(left)) === 0) {
                    counter.delete(s.charAt(left));
                }
                left++;
            }

            maxSize = Math.max(maxSize, right - left + 1);
        }

        return maxSize;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.Length;
        int maxSize = 0;
        var counter = new Dictionary<char, int>();

        int left = 0;
        for (int right = 0; right < n; right++) {
            if (!counter.ContainsKey(s[right])) counter[s[right]] = 0;
            counter[s[right]]++;

            while (counter.Count > k) {
                counter[s[left]]--;
                if (counter[s[left]] == 0) {
                    counter.Remove(s[left]);
                }
                left++;
            }

            maxSize = Math.Max(maxSize, right - left + 1);
        }

        return maxSize;
    }
}
```

```go
func lengthOfLongestSubstringKDistinct(s string, k int) int {
    n := len(s)
    maxSize := 0
    counter := make(map[byte]int)

    left := 0
    for right := 0; right < n; right++ {
        counter[s[right]]++

        for len(counter) > k {
            counter[s[left]]--
            if counter[s[left]] == 0 {
                delete(counter, s[left])
            }
            left++
        }

        if right-left+1 > maxSize {
            maxSize = right - left + 1
        }
    }

    return maxSize
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringKDistinct(s: String, k: Int): Int {
        val n = s.length
        var maxSize = 0
        val counter = mutableMapOf<Char, Int>()

        var left = 0
        for (right in 0 until n) {
            counter[s[right]] = (counter[s[right]] ?: 0) + 1

            while (counter.size > k) {
                counter[s[left]] = counter[s[left]]!! - 1
                if (counter[s[left]] == 0) {
                    counter.remove(s[left])
                }
                left++
            }

            maxSize = maxOf(maxSize, right - left + 1)
        }

        return maxSize
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringKDistinct(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var maxSize = 0
        var counter = [Character: Int]()

        var left = 0
        for right in 0..<n {
            counter[chars[right], default: 0] += 1

            while counter.count > k {
                counter[chars[left]]! -= 1
                if counter[chars[left]] == 0 {
                    counter.removeValue(forKey: chars[left])
                }
                left += 1
            }

            maxSize = max(maxSize, right - left + 1)
        }

        return maxSize
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.

---

## 3. Sliding Window II

### Intuition

An optimization on the standard sliding window: instead of shrinking the window with a while loop, we only shrink by one step when invalid. This keeps the window size from ever decreasing by more than one, which means we only need to track when the window grows. The final answer is the maximum window size achieved, which equals `n - left` at the end.

### Algorithm

1. Initialize `maxSize = 0` and a hash map `counter`.
2. For each `right` from `0` to `n-1`:
   - Add `s[right]` to the counter.
   - If distinct characters exceed `k`:
     - Decrement count of `s[right - maxSize]` (the leftmost character of current max window).
     - Remove from map if count is `0`.
   - Otherwise, increment `maxSize`.
3. Return `maxSize`.

::tabs-start

```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        max_size = 0
        counter = collections.Counter()
        
        for right in range(len(s)):
            counter[s[right]] += 1
            
            if len(counter) <= k:
                max_size += 1
            else:
                counter[s[right - max_size]] -= 1
                if counter[s[right - max_size]] == 0:
                    del counter[s[right - max_size]]

        return max_size
```

```java
class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int n = s.length();
        int maxSize = 0;
        Map<Character, Integer> counter = new HashMap<>();
        
        for (int right = 0; right < n; right++) {
            counter.put(s.charAt(right), counter.getOrDefault(s.charAt(right), 0) + 1);
            
            if (counter.size() <= k) {
                maxSize++;
            } else {
                counter.put(s.charAt(right - maxSize), counter.get(s.charAt(right - maxSize)) - 1);
                if (counter.get(s.charAt(right - maxSize)) == 0) {
                    counter.remove(s.charAt(right - maxSize));
                }
            }
        }

        return maxSize; 
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.length();
        int maxSize = 0;
        unordered_map<char, int> counter;
        
        for (int right = 0; right < n; right++) {
            counter[s[right]]++;
            
            if (counter.size() <= k) {
                maxSize++;
            } else {
                counter[s[right - maxSize]]--;
                if (counter[s[right - maxSize]] == 0) {
                    counter.erase(s[right - maxSize]);
                }
            }
        }
        return maxSize; 
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    lengthOfLongestSubstringKDistinct(s, k) {
        let n = s.length;
        let maxSize = 0;
        let counter = new Map();

        for (let right = 0; right < n; right++) {
            counter.set(s.charAt(right), (counter.get(s.charAt(right)) || 0) + 1);

            if (counter.size <= k) {
                maxSize++;
            } else {
                counter.set(s.charAt(right - maxSize), counter.get(s.charAt(right - maxSize)) - 1);
                if (counter.get(s.charAt(right - maxSize)) === 0) {
                    counter.delete(s.charAt(right - maxSize));
                }
            }
        }
        return maxSize;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLongestSubstringKDistinct(string s, int k) {
        int n = s.Length;
        int maxSize = 0;
        var counter = new Dictionary<char, int>();

        for (int right = 0; right < n; right++) {
            if (!counter.ContainsKey(s[right])) counter[s[right]] = 0;
            counter[s[right]]++;

            if (counter.Count <= k) {
                maxSize++;
            } else {
                counter[s[right - maxSize]]--;
                if (counter[s[right - maxSize]] == 0) {
                    counter.Remove(s[right - maxSize]);
                }
            }
        }
        return maxSize;
    }
}
```

```go
func lengthOfLongestSubstringKDistinct(s string, k int) int {
    n := len(s)
    maxSize := 0
    counter := make(map[byte]int)

    for right := 0; right < n; right++ {
        counter[s[right]]++

        if len(counter) <= k {
            maxSize++
        } else {
            counter[s[right-maxSize]]--
            if counter[s[right-maxSize]] == 0 {
                delete(counter, s[right-maxSize])
            }
        }
    }
    return maxSize
}
```

```kotlin
class Solution {
    fun lengthOfLongestSubstringKDistinct(s: String, k: Int): Int {
        val n = s.length
        var maxSize = 0
        val counter = mutableMapOf<Char, Int>()

        for (right in 0 until n) {
            counter[s[right]] = (counter[s[right]] ?: 0) + 1

            if (counter.size <= k) {
                maxSize++
            } else {
                counter[s[right - maxSize]] = counter[s[right - maxSize]]!! - 1
                if (counter[s[right - maxSize]] == 0) {
                    counter.remove(s[right - maxSize])
                }
            }
        }
        return maxSize
    }
}
```

```swift
class Solution {
    func lengthOfLongestSubstringKDistinct(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var maxSize = 0
        var counter = [Character: Int]()

        for right in 0..<n {
            counter[chars[right], default: 0] += 1

            if counter.count <= k {
                maxSize += 1
            } else {
                counter[chars[right - maxSize]]! -= 1
                if counter[chars[right - maxSize]] == 0 {
                    counter.removeValue(forKey: chars[right - maxSize])
                }
            }
        }
        return maxSize
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.
