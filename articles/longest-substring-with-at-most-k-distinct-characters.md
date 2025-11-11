## 1. Binary Search + Fixed Size Sliding Window

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.

---

## 2. Sliding Window

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.

---

## 3. Sliding Window II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the input string `s` and $k$ is the maximum number of distinct characters.
