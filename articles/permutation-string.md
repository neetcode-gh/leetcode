## 1. Brute Force

::tabs-start

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        s1 = sorted(s1)

        for i in range(len(s2)):
            for j in range(i, len(s2)):
                subStr = s2[i : j + 1]
                subStr = sorted(subStr)
                if subStr == s1:
                    return True
        return False
```

```java
public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        char[] s1Arr = s1.toCharArray();
        Arrays.sort(s1Arr);
        String sortedS1 = new String(s1Arr);

        for (int i = 0; i < s2.length(); i++) {
            for (int j = i; j < s2.length(); j++) {
                char[] subStrArr = s2.substring(i, j + 1).toCharArray();
                Arrays.sort(subStrArr);
                String sortedSubStr = new String(subStrArr);

                if (sortedSubStr.equals(sortedS1)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkInclusion(std::string s1, std::string s2) {
        sort(s1.begin(), s1.end());

        for (int i = 0; i < s2.length(); i++) {
            for (int j = i; j < s2.length(); j++) {
                string subStr = s2.substr(i, j - i + 1);
                sort(subStr.begin(), subStr.end());
                
                if (subStr == s1) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        s1 = s1.split('').sort().join('');

        for (let i = 0; i < s2.length; i++) {
            for (let j = i; j < s2.length; j++) {
                let subStr = s2.slice(i, j + 1).split('').sort().join('');
                if (subStr === s1) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckInclusion(string s1, string s2) {
        char[] s1Arr = s1.ToCharArray();
        Array.Sort(s1Arr);
        string sortedS1 = new string(s1Arr);

        for (int i = 0; i < s2.Length; i++) {
            for (int j = i; j < s2.Length; j++) {
                char[] subStrArr = s2.Substring(i, j - i + 1).ToCharArray();
                Array.Sort(subStrArr);
                string sortedSubStr = new string(subStrArr);

                if (sortedSubStr == sortedS1) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func checkInclusion(s1 string, s2 string) bool {
	s1Sorted := []rune(s1)
	sort.Slice(s1Sorted, func(i, j int) bool {
		return s1Sorted[i] < s1Sorted[j]
	})
	s1 = string(s1Sorted)

	for i := 0; i < len(s2); i++ {
		for j := i; j < len(s2); j++ {
			subStr := s2[i : j+1]
			subStrSorted := []rune(subStr)
			sort.Slice(subStrSorted, func(a, b int) bool {
				return subStrSorted[a] < subStrSorted[b]
			})
			if string(subStrSorted) == s1 {
				return true
			}
		}
	}
	return false
}
```

```kotlin
class Solution {
    fun checkInclusion(s1: String, s2: String): Boolean {
        val sortedS1 = s1.toCharArray().apply { sort() }.concatToString()

        for (i in s2.indices) {
            for (j in i until s2.length) {
                val subStr = s2.substring(i, j + 1)
                val sortedSubStr = subStr.toCharArray().apply { sort() }.concatToString()
                if (sortedSubStr == sortedS1) {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3 \log n)$
* Space complexity: $O(n)$

---

## 2. Hash Table

::tabs-start

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        count1 = {}
        for c in s1:
            count1[c] = 1 + count1.get(c, 0)
        
        need = len(count1)
        for i in range(len(s2)):
            count2, cur = {}, 0
            for j in range(i, len(s2)):
                count2[s2[j]] = 1 + count2.get(s2[j], 0)
                if count1.get(s2[j], 0) < count2[s2[j]]:
                    break
                if count1.get(s2[j], 0) == count2[s2[j]]:
                    cur += 1
                if cur == need:
                    return True
        return False
```

```java
public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        Map<Character, Integer> count1 = new HashMap<>();
        for (char c : s1.toCharArray()) {
            count1.put(c, count1.getOrDefault(c, 0) + 1);
        }

        int need = count1.size();
        for (int i = 0; i < s2.length(); i++) {
            Map<Character, Integer> count2 = new HashMap<>();
            int cur = 0;
            for (int j = i; j < s2.length(); j++) {
                char c = s2.charAt(j);
                count2.put(c, count2.getOrDefault(c, 0) + 1);
                
                if (count1.getOrDefault(c, 0) < count2.get(c)) {
                    break;
                }
                
                if (count1.getOrDefault(c, 0) == count2.get(c)) {
                    cur++;
                }
                
                if (cur == need) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        unordered_map<char, int> count1;
        for (char c : s1) {
            count1[c]++;
        }

        int need = count1.size();
        for (int i = 0; i < s2.length(); i++) {
            unordered_map<char, int> count2;
            int cur = 0;
            for (int j = i; j < s2.length(); j++) {
                char c = s2[j];
                count2[c]++;
                
                if (count1[c] < count2[c]) {
                    break;
                }
                
                if (count1[c] == count2[c]) {
                    cur++;
                }
                
                if (cur == need) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        let count1 = {};
        for (let c of s1) {
            count1[c] = (count1[c] || 0) + 1;
        }

        let need = Object.keys(count1).length;
        for (let i = 0; i < s2.length; i++) {
            let count2 = {};
            let cur = 0;
            for (let j = i; j < s2.length; j++) {
                let c = s2[j];
                count2[c] = (count2[c] || 0) + 1;

                if ((count1[c] || 0) < count2[c]) {
                    break;
                }

                if ((count1[c] || 0) === count2[c]) {
                    cur++;
                }

                if (cur === need) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckInclusion(string s1, string s2) {
        Dictionary<char, int> count1 = new Dictionary<char, int>();
        foreach (char c in s1) {
            if (count1.ContainsKey(c)) {
                count1[c]++;
            } else {
                count1[c] = 1;
            }
        }

        int need = count1.Count;
        for (int i = 0; i < s2.Length; i++) {
            Dictionary<char, int> count2 = new Dictionary<char, int>();
            int cur = 0;
            for (int j = i; j < s2.Length; j++) {
                char c = s2[j];
                if (count2.ContainsKey(c)) {
                    count2[c]++;
                } else {
                    count2[c] = 1;
                }

                if (!count1.ContainsKey(c) || count1[c] < count2[c]) {
                    break;
                }

                if (count1[c] == count2[c]) {
                    cur++;
                }

                if (cur == need) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func checkInclusion(s1 string, s2 string) bool {
	count1 := make(map[rune]int)
	for _, c := range s1 {
		count1[c]++
	}

	need := len(count1)
	for i := 0; i < len(s2); i++ {
		count2 := make(map[rune]int)
		cur := 0
		for j := i; j < len(s2); j++ {
			count2[rune(s2[j])]++
			if count1[rune(s2[j])] < count2[rune(s2[j])] {
				break
			}
			if count1[rune(s2[j])] == count2[rune(s2[j])] {
				cur++
			}
			if cur == need {
				return true
			}
		}
	}
	return false
}
```

```kotlin
class Solution {
    fun checkInclusion(s1: String, s2: String): Boolean {
        val count1 = HashMap<Char, Int>()
        for (c in s1) {
            count1[c] = 1 + count1.getOrDefault(c, 0)
        }

        val need = count1.size
        for (i in s2.indices) {
            val count2 = mutableMapOf<Char, Int>()
            var cur = 0
            for (j in i until s2.length) {
                count2[s2[j]] = 1 + count2.getOrDefault(s2[j], 0)
                if (count1.getOrDefault(s2[j], 0) < count2[s2[j]]!!) {
                    break
                }
                if (count1.getOrDefault(s2[j], 0) == count2[s2[j]]!!) {
                    cur++
                }
                if (cur == need) {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(1)$

> Where $n$ is the length of the string1 and $m$ is the length of string2.

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        
        s1Count, s2Count = [0] * 26, [0] * 26
        for i in range(len(s1)):
            s1Count[ord(s1[i]) - ord('a')] += 1
            s2Count[ord(s2[i]) - ord('a')] += 1
        
        matches = 0
        for i in range(26):
            matches += (1 if s1Count[i] == s2Count[i] else 0)
        
        l = 0
        for r in range(len(s1), len(s2)):
            if matches == 26:
                return True
            
            index = ord(s2[r]) - ord('a')
            s2Count[index] += 1
            if s1Count[index] == s2Count[index]:
                matches += 1
            elif s1Count[index] + 1 == s2Count[index]:
                matches -= 1

            index = ord(s2[l]) - ord('a')
            s2Count[index] -= 1
            if s1Count[index] == s2Count[index]:
                matches += 1
            elif s1Count[index] - 1 == s2Count[index]:
                matches -= 1
            l += 1
        return matches == 26
```

```java
public class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }

        int[] s1Count = new int[26];
        int[] s2Count = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1.charAt(i) - 'a']++;
            s2Count[s2.charAt(i) - 'a']++;
        }

        int matches = 0;
        for (int i = 0; i < 26; i++) {
            if (s1Count[i] == s2Count[i]) {
                matches++;
            }
        }

        int l = 0;
        for (int r = s1.length(); r < s2.length(); r++) {
            if (matches == 26) {
                return true;
            }

            int index = s2.charAt(r) - 'a';
            s2Count[index]++;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 == s2Count[index]) {
                matches--;
            }

            index = s2.charAt(l) - 'a';
            s2Count[index]--;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 == s2Count[index]) {
                matches--;
            }
            l++;
        }
        return matches == 26;
    }
}
```

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.length() > s2.length()) {
            return false;
        }

        vector<int> s1Count(26, 0);
        vector<int> s2Count(26, 0);
        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1[i] - 'a']++;
            s2Count[s2[i] - 'a']++;
        }

        int matches = 0;
        for (int i = 0; i < 26; i++) {
            if (s1Count[i] == s2Count[i]) {
                matches++;
            }
        }

        int l = 0;
        for (int r = s1.length(); r < s2.length(); r++) {
            if (matches == 26) {
                return true;
            }

            int index = s2[r] - 'a';
            s2Count[index]++;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 == s2Count[index]) {
                matches--;
            }

            index = s2[l] - 'a';
            s2Count[index]--;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 == s2Count[index]) {
                matches--;
            }
            l++;
        }
        return matches == 26;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) {
            return false;
        }

        let s1Count = new Array(26).fill(0);
        let s2Count = new Array(26).fill(0);
        for (let i = 0; i < s1.length; i++) {
            s1Count[s1.charCodeAt(i) - 97]++;
            s2Count[s2.charCodeAt(i) - 97]++;
        }

        let matches = 0;
        for (let i = 0; i < 26; i++) {
            if (s1Count[i] === s2Count[i]) {
                matches++;
            }
        }

        let l = 0;
        for (let r = s1.length; r < s2.length; r++) {
            if (matches === 26) {
                return true;
            }

            let index = s2.charCodeAt(r) - 97;
            s2Count[index]++;
            if (s1Count[index] === s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 === s2Count[index]) {
                matches--;
            }

            index = s2.charCodeAt(l) - 97;
            s2Count[index]--;
            if (s1Count[index] === s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 === s2Count[index]) {
                matches--;
            }
            l++;
        }
        return matches === 26;
    }
}
```

```csharp
public class Solution {
    public bool CheckInclusion(string s1, string s2) {
        if (s1.Length > s2.Length) {
            return false;
        }

        int[] s1Count = new int[26];
        int[] s2Count = new int[26];
        for (int i = 0; i < s1.Length; i++) {
            s1Count[s1[i] - 'a']++;
            s2Count[s2[i] - 'a']++;
        }

        int matches = 0;
        for (int i = 0; i < 26; i++) {
            if (s1Count[i] == s2Count[i]) {
                matches++;
            }
        }

        int l = 0;
        for (int r = s1.Length; r < s2.Length; r++) {
            if (matches == 26) {
                return true;
            }

            int index = s2[r] - 'a';
            s2Count[index]++;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] + 1 == s2Count[index]) {
                matches--;
            }

            index = s2[l] - 'a';
            s2Count[index]--;
            if (s1Count[index] == s2Count[index]) {
                matches++;
            } else if (s1Count[index] - 1 == s2Count[index]) {
                matches--;
            }
            l++;
        }

        return matches == 26;
    }
}
```

```go
func checkInclusion(s1 string, s2 string) bool {
	if len(s1) > len(s2) {
		return false
	}

	s1Count := make([]int, 26)
	s2Count := make([]int, 26)
	for i := 0; i < len(s1); i++ {
		s1Count[s1[i]-'a']++
		s2Count[s2[i]-'a']++
	}

	matches := 0
	for i := 0; i < 26; i++ {
		if s1Count[i] == s2Count[i] {
			matches++
		}
	}

	l := 0
	for r := len(s1); r < len(s2); r++ {
		if matches == 26 {
			return true
		}

		index := s2[r] - 'a'
		s2Count[index]++
		if s1Count[index] == s2Count[index] {
			matches++
		} else if s1Count[index]+1 == s2Count[index] {
			matches--
		}

		index = s2[l] - 'a'
		s2Count[index]--
		if s1Count[index] == s2Count[index] {
			matches++
		} else if s1Count[index]-1 == s2Count[index] {
			matches--
		}
		l++
	}
	return matches == 26
}
```

```kotlin
class Solution {
    fun checkInclusion(s1: String, s2: String): Boolean {
        if (s1.length > s2.length) return false

        val s1Count = IntArray(26)
        val s2Count = IntArray(26)
        for (i in s1.indices) {
            s1Count[s1[i] - 'a']++
            s2Count[s2[i] - 'a']++
        }

        var matches = 0
        for (i in 0 until 26) {
            if (s1Count[i] == s2Count[i]) matches++
        }

        var l = 0
        for (r in s1.length until s2.length) {
            if (matches == 26) return true

            val index = s2[r] - 'a'
            s2Count[index]++
            if (s1Count[index] == s2Count[index]) {
                matches++
            } else if (s1Count[index] + 1 == s2Count[index]) {
                matches--
            }

            val leftIndex = s2[l] - 'a'
            s2Count[leftIndex]--
            if (s1Count[leftIndex] == s2Count[leftIndex]) {
                matches++
            } else if (s1Count[leftIndex] - 1 == s2Count[leftIndex]) {
                matches--
            }
            l++
        }
        return matches == 26
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$