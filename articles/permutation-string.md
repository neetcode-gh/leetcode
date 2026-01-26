## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Tables / Frequency Counting** - Tracking character counts to compare substrings
- **Sliding Window Technique** - Efficiently checking fixed-size substrings without rebuilding counts
- **String Manipulation** - Working with substrings and character comparisons
- **Sorting** - Used in the brute-force approach to compare permutations

---

## 1. Brute Force

### Intuition

The brute-force approach tries every possible substring of `s2` and checks whether it is a permutation of `s1`.
To do this, we sort `s1` once, and then for each substring of `s2`, we sort it and compare.
If the sorted substring matches the sorted `s1`, it means the substring contains exactly the same characters.
This method is simple to understand but very slow because it examines all substrings and sorts each one.

### Algorithm

1. Sort `s1` so we can compare substrings against it.
2. Loop through every starting index `i` in `s2`.
3. For each `i`, loop through every ending index `j ≥ i`:
   - Extract the substring `s2[i : j + 1]`.
   - Sort it and compare with sorted `s1`.
   - If they match, return `true`.
4. If no matching substring is found, return `false`.

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
                let subStr = s2
                    .slice(i, j + 1)
                    .split('')
                    .sort()
                    .join('');
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

```swift
class Solution {
    func checkInclusion(_ s1: String, _ s2: String) -> Bool {
        let s1Sorted = s1.sorted()
        let chars = Array(s2)

        for i in 0..<chars.count {
            for j in i..<chars.count {
                let subStr = String(chars[i...j]).sorted()
                if subStr == s1Sorted {
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

- Time complexity: $O(n ^ 3 \log n)$
- Space complexity: $O(n)$

---

## 2. Hash Table

### Intuition

We first count the characters in `s1`, since any valid substring in `s2` must match these exact frequencies.
Then, for every starting point in `s2`, we build a frequency map as we extend the substring.
If we ever exceed the needed count for a character, we stop early because the substring can no longer be a valid permutation.
If all character counts match exactly, we have found a valid permutation.
This method is much cleaner than brute force but still slow because it restarts counting for each position.

### Algorithm

1. Build a frequency map `count1` for all characters in `s1`.
2. Let `need` be the number of unique characters in `s1` whose counts must match.
3. For each starting index `i` in `s2`:
   - Create an empty map `count2` and a match counter `cur = 0`.
   - Extend the substring by moving `j` from `i` forward:
     - Increment the frequency of `s2[j]` in `count2`.
     - If `count2[s2[j]]` exceeds what `count1` requires, break — this substring can't work.
     - If the count for this character now matches `count1`, increase `cur`.
     - If `cur == need`, return `true` — we found a valid permutation.
4. If no starting index yields a match, return `false`.

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

```swift
class Solution {
    func checkInclusion(_ s1: String, _ s2: String) -> Bool {
        var count1 = [Character: Int]()
        for c in s1 {
            count1[c, default: 0] += 1
        }

        let need = count1.count
        let chars = Array(s2)

        for i in 0..<chars.count {
            var count2 = [Character: Int]()
            var cur = 0

            for j in i..<chars.count {
                count2[chars[j], default: 0] += 1
                if count1[chars[j], default: 0] < count2[chars[j], default: 0] {
                    break
                }
                if count1[chars[j], default: 0] == count2[chars[j], default: 0] {
                    cur += 1
                }
                if cur == need {
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

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of the string1 and $m$ is the length of string2.

---

## 3. Sliding Window

### Intuition

Since a permutation of `s1` must have the **same character counts**, we can use a fixed-size sliding window over `s2` whose length is exactly `len(s1)`.
We maintain two frequency arrays:

- one for `s1`
- one for the current window in `s2`

If these two arrays ever match, the window is a valid permutation.
As we slide the window forward, we update counts by removing the left character and adding the new right character — no need to rebuild the counts each time.
This makes the solution fast and efficient.

### Algorithm

1. If `s1` is longer than `s2`, return `false`.
2. Build character frequency arrays for:
   - `s1`
   - the first window of `s2` of size `len(s1)`
3. Count how many positions match between the two arrays (`matches`).
4. Slide the window from left to right across `s2`:
   - At each step, add the new right character and update counts/matches.
   - Remove the left character and update counts/matches.
   - If at any time `matches == 26`, return `true`.
5. After finishing the loop, return whether `matches == 26`.

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

```swift
class Solution {
    func checkInclusion(_ s1: String, _ s2: String) -> Bool {
        if s1.count > s2.count {
            return false
        }

        var s1Count = [Int](repeating: 0, count: 26)
        var s2Count = [Int](repeating: 0, count: 26)
        let aAscii = Int(Character("a").asciiValue!)

        let s1Array = Array(s1)
        let s2Array = Array(s2)

        for i in 0..<s1.count {
            s1Count[Int(s1Array[i].asciiValue!) - aAscii] += 1
            s2Count[Int(s2Array[i].asciiValue!) - aAscii] += 1
        }

        var matches = 0
        for i in 0..<26 {
            if s1Count[i] == s2Count[i] {
                matches += 1
            }
        }

        var l = 0
        for r in s1.count..<s2.count {
            if matches == 26 {
                return true
            }

            var index = Int(s2Array[r].asciiValue!) - aAscii
            s2Count[index] += 1
            if s1Count[index] == s2Count[index] {
                matches += 1
            } else if s1Count[index] + 1 == s2Count[index] {
                matches -= 1
            }

            index = Int(s2Array[l].asciiValue!) - aAscii
            s2Count[index] -= 1
            if s1Count[index] == s2Count[index] {
                matches += 1
            } else if s1Count[index] - 1 == s2Count[index] {
                matches -= 1
            }
            l += 1
        }

        return matches == 26
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Not Checking Length Before Proceeding

If `s1` is longer than `s2`, no permutation of `s1` can exist as a substring of `s2`. Forgetting this early check leads to unnecessary computation or index errors when initializing the sliding window.

### Incorrect Window Size

The sliding window must be exactly the length of `s1`. A common mistake is using a variable-size window or forgetting to remove the leftmost character when adding a new right character. This breaks the frequency comparison and produces incorrect results.

### Mishandling the Matches Counter

When updating the frequency counts during window sliding, the `matches` counter must be carefully updated. A character transition from matching to non-matching should decrement `matches`, and vice versa. Off-by-one errors in these conditions (e.g., checking `==` vs `+1` or `-1`) cause the algorithm to miss valid windows or report false positives.
