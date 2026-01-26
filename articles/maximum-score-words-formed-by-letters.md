## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Backtracking** - Used to explore all possible subsets of words by making include/exclude decisions at each step
- **Hash Maps / Frequency Arrays** - Needed to track letter counts and determine if a word can be formed with available letters
- **Recursion** - The core technique for exploring the decision tree of word combinations
- **Bit Manipulation (optional)** - Alternative approach using bitmasks to represent subsets

---

## 1. Backtracking

### Intuition

We need to select a subset of words to maximize total score, where each word consumes letters from a shared pool. This is a classic subset selection problem. For each word, we decide whether to include it (if we have enough letters) or skip it. We explore all valid combinations using recursion and backtracking, restoring the letter counts after each recursive call.

### Algorithm

1. Build a frequency count of available letters.
2. Define a recursive function that processes words one by one:
   - Base case: if all words are processed, return `0`.
   - Always try skipping the current word.
   - If the current word can be formed with available letters:
     - Subtract its letter requirements from the count.
     - Recursively process remaining words and add the word's score.
     - Restore the letter counts (backtrack).
3. Return the maximum score from either skipping or including the word.

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        def can_form_word(w, letter_cnt):
            word_cnt = Counter(w)
            for c in word_cnt:
                if word_cnt[c] > letter_cnt[c]:
                    return False
            return True

        def get_score(w):
            res = 0
            for c in w:
                res += score[ord(c) - ord('a')]
            return res

        letter_cnt = Counter(letters)

        def backtrack(i):
            if i == len(words):
                return 0

            res = backtrack(i + 1)  # skip
            if can_form_word(words[i], letter_cnt):  # include (when possible)
                for c in words[i]:
                    letter_cnt[c] -= 1
                res = max(res, get_score(words[i]) + backtrack(i + 1))
                for c in words[i]:
                    letter_cnt[c] += 1

            return res

        return backtrack(0)
```

```java
public class Solution {
    int[] letterCnt;
    int[] score;

    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        this.score = score;
        this.letterCnt = new int[26];

        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        return backtrack(0, words);
    }

    private int canFormWord(String word) {
        int[] wordCnt = new int[26];
        for (char c : word.toCharArray()) {
            wordCnt[c - 'a']++;
            if (wordCnt[c - 'a'] > letterCnt[c - 'a']) {
                return 0;
            }
        }
        return 1;
    }

    private int getScore(String word) {
        int res = 0;
        for (char c : word.toCharArray()) {
            res += score[c - 'a'];
        }
        return res;
    }

    private int backtrack(int i, String[] words) {
        if (i == words.length) {
            return 0;
        }

        int res = backtrack(i + 1, words);  // skip
        if (canFormWord(words[i]) == 1) {  // include (when possible)
            for (char c : words[i].toCharArray()) {
                letterCnt[c - 'a']--;
            }
            res = Math.max(res, getScore(words[i]) + backtrack(i + 1, words));
            for (char c : words[i].toCharArray()) {
                letterCnt[c - 'a']++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> letterCnt = vector<int>(26, 0);
    vector<int> score;
    vector<string> words;

    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        this->words = words;
        this->score = score;

        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        return backtrack(0);
    }

    bool canFormWord(string& word) {
        vector<int> wordCnt(26, 0);
        for (char c : word) {
            wordCnt[c - 'a']++;
            if (wordCnt[c - 'a'] > letterCnt[c - 'a']) {
                return false;
            }
        }
        return true;
    }

    int getScore(string& word) {
        int res = 0;
        for (char c : word) {
            res += score[c - 'a'];
        }
        return res;
    }

    int backtrack(int i) {
        if (i == words.size()) {
            return 0;
        }

        int res = backtrack(i + 1);  // skip
        if (canFormWord(words[i])) {  // include (when possible)
            for (char c : words[i]) {
                letterCnt[c - 'a']--;
            }
            res = max(res, getScore(words[i]) + backtrack(i + 1));
            for (char c : words[i]) {
                letterCnt[c - 'a']++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        const canFormWord = (w, letterCnt) => {
            let wordCnt = new Array(26).fill(0);
            for (let c of w) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordCnt[idx]++;
                if (wordCnt[idx] > letterCnt[idx]) {
                    return false;
                }
            }
            return true;
        };

        const getScore = (w) => {
            let res = 0;
            for (let c of w) {
                res += score[c.charCodeAt(0) - 'a'.charCodeAt(0)];
            }
            return res;
        };

        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const backtrack = (i) => {
            if (i === words.length) {
                return 0;
            }

            let res = backtrack(i + 1); // skip

            if (canFormWord(words[i], letterCnt)) {
                // include (when possible)
                for (let c of words[i]) {
                    letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]--;
                }
                res = Math.max(res, getScore(words[i]) + backtrack(i + 1));
                for (let c of words[i]) {
                    letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
                }
            }

            return res;
        };

        return backtrack(0);
    }
}
```

```go
func maxScoreWords(words []string, letters []byte, score []int) int {
    letterCnt := make([]int, 26)
    for _, c := range letters {
        letterCnt[c-'a']++
    }

    canFormWord := func(w string) bool {
        wordCnt := make([]int, 26)
        for i := 0; i < len(w); i++ {
            idx := w[i] - 'a'
            wordCnt[idx]++
            if wordCnt[idx] > letterCnt[idx] {
                return false
            }
        }
        return true
    }

    getScore := func(w string) int {
        res := 0
        for i := 0; i < len(w); i++ {
            res += score[w[i]-'a']
        }
        return res
    }

    var backtrack func(i int) int
    backtrack = func(i int) int {
        if i == len(words) {
            return 0
        }

        res := backtrack(i + 1)
        if canFormWord(words[i]) {
            for j := 0; j < len(words[i]); j++ {
                letterCnt[words[i][j]-'a']--
            }
            res = max(res, getScore(words[i])+backtrack(i+1))
            for j := 0; j < len(words[i]); j++ {
                letterCnt[words[i][j]-'a']++
            }
        }
        return res
    }

    return backtrack(0)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var letterCnt: IntArray
    private lateinit var score: IntArray
    private lateinit var words: Array<String>

    fun maxScoreWords(words: Array<String>, letters: CharArray, score: IntArray): Int {
        this.words = words
        this.score = score
        this.letterCnt = IntArray(26)

        for (c in letters) {
            letterCnt[c - 'a']++
        }

        return backtrack(0)
    }

    private fun canFormWord(word: String): Boolean {
        val wordCnt = IntArray(26)
        for (c in word) {
            val idx = c - 'a'
            wordCnt[idx]++
            if (wordCnt[idx] > letterCnt[idx]) {
                return false
            }
        }
        return true
    }

    private fun getScore(word: String): Int {
        var res = 0
        for (c in word) {
            res += score[c - 'a']
        }
        return res
    }

    private fun backtrack(i: Int): Int {
        if (i == words.size) {
            return 0
        }

        var res = backtrack(i + 1)
        if (canFormWord(words[i])) {
            for (c in words[i]) {
                letterCnt[c - 'a']--
            }
            res = maxOf(res, getScore(words[i]) + backtrack(i + 1))
            for (c in words[i]) {
                letterCnt[c - 'a']++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    private var letterCnt = [Int](repeating: 0, count: 26)
    private var score = [Int]()
    private var words = [String]()

    func maxScoreWords(_ words: [String], _ letters: [Character], _ score: [Int]) -> Int {
        self.words = words
        self.score = score
        self.letterCnt = [Int](repeating: 0, count: 26)

        for c in letters {
            letterCnt[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        return backtrack(0)
    }

    private func canFormWord(_ word: String) -> Bool {
        var wordCnt = [Int](repeating: 0, count: 26)
        for c in word {
            let idx = Int(c.asciiValue! - Character("a").asciiValue!)
            wordCnt[idx] += 1
            if wordCnt[idx] > letterCnt[idx] {
                return false
            }
        }
        return true
    }

    private func getScore(_ word: String) -> Int {
        var res = 0
        for c in word {
            res += score[Int(c.asciiValue! - Character("a").asciiValue!)]
        }
        return res
    }

    private func backtrack(_ i: Int) -> Int {
        if i == words.count {
            return 0
        }

        var res = backtrack(i + 1)
        if canFormWord(words[i]) {
            for c in words[i] {
                letterCnt[Int(c.asciiValue! - Character("a").asciiValue!)] -= 1
            }
            res = max(res, getScore(words[i]) + backtrack(i + 1))
            for c in words[i] {
                letterCnt[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n * (w + m) + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.

---

## 2. Backtracking + Precomputation

### Intuition

The basic backtracking approach recalculates letter frequencies and scores for each word during recursion. We can speed this up by precomputing the frequency array and score for each word upfront. This avoids redundant character-by-character processing and makes the validity check and score lookup constant time operations.

### Algorithm

1. Build a frequency count of available letters.
2. Precompute for each word:
   - Its character frequency array (`26` elements for each letter).
   - Its total score based on the given scoring array.
3. Use backtracking as before, but now:
   - Check validity by comparing frequency arrays (`26` comparisons).
   - Update letter counts by subtracting/adding the precomputed frequencies.
   - Use the precomputed score directly.

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        letter_cnt = [0] * 26
        for c in letters:
            letter_cnt[ord(c) - ord('a')] += 1

        n = len(words)
        word_scores = [0] * n
        word_freqs = [[0] * 26 for _ in range(n)]

        for i, word in enumerate(words):
            for c in word:
                idx = ord(c) - ord('a')
                word_freqs[i][idx] += 1
                word_scores[i] += score[idx]

        def backtrack(i):
            if i == n:
                return 0

            res = backtrack(i + 1)  # skip
            can_include = all(word_freqs[i][j] <= letter_cnt[j] for j in range(26))

            if can_include:  # include (when possible)
                for j in range(26):
                    letter_cnt[j] -= word_freqs[i][j]
                res = max(res, word_scores[i] + backtrack(i + 1))
                for j in range(26):
                    letter_cnt[j] += word_freqs[i][j]

            return res

        return backtrack(0)
```

```java
public class Solution {
    private int[] letterCnt = new int[26];
    private int[] wordScores;
    private int[][] wordFreqs;
    private int n;

    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        Arrays.fill(letterCnt, 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        n = words.length;
        wordScores = new int[n];
        wordFreqs = new int[n][26];

        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        return backtrack(0, words);
    }

    private int backtrack(int i, String[] words) {
        if (i == n) {
            return 0;
        }

        int res = backtrack(i + 1, words); // skip
        boolean canInclude = true;

        for (int j = 0; j < 26; j++) {
            if (wordFreqs[i][j] > letterCnt[j]) {
                canInclude = false;
                break;
            }
        }

        if (canInclude) {  // include (when possible)
            for (int j = 0; j < 26; j++) {
                letterCnt[j] -= wordFreqs[i][j];
            }
            res = Math.max(res, wordScores[i] + backtrack(i + 1, words));
            for (int j = 0; j < 26; j++) {
                letterCnt[j] += wordFreqs[i][j];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> letterCnt = vector<int>(26, 0);
    vector<int> wordScores;
    vector<vector<int>> wordFreqs;
    int n;

    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        fill(letterCnt.begin(), letterCnt.end(), 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        n = words.size();
        wordScores = vector<int>(n, 0);
        wordFreqs = vector<vector<int>>(n, vector<int>(26, 0));

        for (int i = 0; i < n; i++) {
            for (char c : words[i]) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        return backtrack(0, words);
    }

private:
    int backtrack(int i, vector<string>& words) {
        if (i == n) {
            return 0;
        }

        int res = backtrack(i + 1, words); // skip
        bool canInclude = true;

        for (int j = 0; j < 26; j++) {
            if (wordFreqs[i][j] > letterCnt[j]) {
                canInclude = false;
                break;
            }
        }

        if (canInclude) {  // include (when possible)
            for (int j = 0; j < 26; j++) {
                letterCnt[j] -= wordFreqs[i][j];
            }
            res = max(res, wordScores[i] + backtrack(i + 1, words));
            for (int j = 0; j < 26; j++) {
                letterCnt[j] += wordFreqs[i][j];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let n = words.length;
        let wordScores = new Array(n).fill(0);
        let wordFreqs = Array.from({ length: n }, () => new Array(26).fill(0));

        for (let i = 0; i < n; i++) {
            for (let c of words[i]) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        const backtrack = (i) => {
            if (i === n) {
                return 0;
            }

            let res = backtrack(i + 1); // skip
            let canInclude = true;

            for (let j = 0; j < 26; j++) {
                if (wordFreqs[i][j] > letterCnt[j]) {
                    canInclude = false;
                    break;
                }
            }

            if (canInclude) {
                // include (when possible)
                for (let j = 0; j < 26; j++) {
                    letterCnt[j] -= wordFreqs[i][j];
                }
                res = Math.max(res, wordScores[i] + backtrack(i + 1));
                for (let j = 0; j < 26; j++) {
                    letterCnt[j] += wordFreqs[i][j];
                }
            }

            return res;
        };

        return backtrack(0);
    }
}
```

```go
func maxScoreWords(words []string, letters []byte, score []int) int {
    letterCnt := make([]int, 26)
    for _, c := range letters {
        letterCnt[c-'a']++
    }

    n := len(words)
    wordScores := make([]int, n)
    wordFreqs := make([][]int, n)

    for i := 0; i < n; i++ {
        wordFreqs[i] = make([]int, 26)
        for j := 0; j < len(words[i]); j++ {
            idx := words[i][j] - 'a'
            wordFreqs[i][idx]++
            wordScores[i] += score[idx]
        }
    }

    var backtrack func(i int) int
    backtrack = func(i int) int {
        if i == n {
            return 0
        }

        res := backtrack(i + 1)
        canInclude := true

        for j := 0; j < 26; j++ {
            if wordFreqs[i][j] > letterCnt[j] {
                canInclude = false
                break
            }
        }

        if canInclude {
            for j := 0; j < 26; j++ {
                letterCnt[j] -= wordFreqs[i][j]
            }
            res = max(res, wordScores[i]+backtrack(i+1))
            for j := 0; j < 26; j++ {
                letterCnt[j] += wordFreqs[i][j]
            }
        }
        return res
    }

    return backtrack(0)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var letterCnt: IntArray
    private lateinit var wordScores: IntArray
    private lateinit var wordFreqs: Array<IntArray>
    private var n = 0

    fun maxScoreWords(words: Array<String>, letters: CharArray, score: IntArray): Int {
        letterCnt = IntArray(26)
        for (c in letters) {
            letterCnt[c - 'a']++
        }

        n = words.size
        wordScores = IntArray(n)
        wordFreqs = Array(n) { IntArray(26) }

        for (i in 0 until n) {
            for (c in words[i]) {
                val idx = c - 'a'
                wordFreqs[i][idx]++
                wordScores[i] += score[idx]
            }
        }

        return backtrack(0)
    }

    private fun backtrack(i: Int): Int {
        if (i == n) {
            return 0
        }

        var res = backtrack(i + 1)
        var canInclude = true

        for (j in 0 until 26) {
            if (wordFreqs[i][j] > letterCnt[j]) {
                canInclude = false
                break
            }
        }

        if (canInclude) {
            for (j in 0 until 26) {
                letterCnt[j] -= wordFreqs[i][j]
            }
            res = maxOf(res, wordScores[i] + backtrack(i + 1))
            for (j in 0 until 26) {
                letterCnt[j] += wordFreqs[i][j]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    private var letterCnt = [Int](repeating: 0, count: 26)
    private var wordScores = [Int]()
    private var wordFreqs = [[Int]]()
    private var n = 0

    func maxScoreWords(_ words: [String], _ letters: [Character], _ score: [Int]) -> Int {
        letterCnt = [Int](repeating: 0, count: 26)
        for c in letters {
            letterCnt[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        n = words.count
        wordScores = [Int](repeating: 0, count: n)
        wordFreqs = [[Int]](repeating: [Int](repeating: 0, count: 26), count: n)

        for i in 0..<n {
            for c in words[i] {
                let idx = Int(c.asciiValue! - Character("a").asciiValue!)
                wordFreqs[i][idx] += 1
                wordScores[i] += score[idx]
            }
        }

        return backtrack(0)
    }

    private func backtrack(_ i: Int) -> Int {
        if i == n {
            return 0
        }

        var res = backtrack(i + 1)
        var canInclude = true

        for j in 0..<26 {
            if wordFreqs[i][j] > letterCnt[j] {
                canInclude = false
                break
            }
        }

        if canInclude {
            for j in 0..<26 {
                letterCnt[j] -= wordFreqs[i][j]
            }
            res = max(res, wordScores[i] + backtrack(i + 1))
            for j in 0..<26 {
                letterCnt[j] += wordFreqs[i][j]
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.

---

## 3. Backtracking (Bit Mask)

### Intuition

Instead of recursive backtracking, we can iterate through all possible subsets using bit manipulation. With `n` words, there are `2^n` possible subsets, each representable as an integer where bit `i` indicates whether word `i` is included. For each subset (bitmask), we check if all included words can be formed simultaneously and calculate the total score.

### Algorithm

1. Precompute frequency arrays and scores for all words.
2. Iterate through all bitmasks from `0` to `2^n - 1`:
   - For each bitmask, create a copy of the available letter counts.
   - For each bit set in the mask:
     - Check if the corresponding word can be formed with remaining letters.
     - If not, mark this subset as invalid and break.
     - If yes, subtract the word's letters and add its score.
   - If the subset is valid, update the maximum score.
3. Return the maximum score found.

::tabs-start

```python
class Solution:
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        letter_cnt = [0] * 26
        for c in letters:
            letter_cnt[ord(c) - ord('a')] += 1

        n = len(words)
        word_scores = [0] * n
        word_freqs = [[0] * 26 for _ in range(n)]

        for i, word in enumerate(words):
            for c in word:
                idx = ord(c) - ord('a')
                word_freqs[i][idx] += 1
                word_scores[i] += score[idx]

        res = 0

        for mask in range(1 << n):
            cur_score = 0
            cur_letter_cnt = letter_cnt[:]
            valid = True

            for i in range(n):
                if mask & (1 << i):
                    for j in range(26):
                        if word_freqs[i][j] > cur_letter_cnt[j]:
                            valid = False
                            break
                    if not valid:
                        break

                    for j in range(26):
                        cur_letter_cnt[j] -= word_freqs[i][j]

                    cur_score += word_scores[i]

            if valid:
                res = max(res, cur_score)

        return res
```

```java
public class Solution {
    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        int[] letterCnt = new int[26];
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        int n = words.length;
        int[] wordScores = new int[n];
        int[][] wordFreqs = new int[n][26];

        for (int i = 0; i < n; i++) {
            for (char c : words[i].toCharArray()) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        int res = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int curScore = 0;
            int[] curLetterCnt = Arrays.copyOf(letterCnt, 26);
            boolean valid = true;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    for (int j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (int j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = Math.max(res, curScore);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        vector<int> letterCnt(26, 0);
        for (char c : letters) {
            letterCnt[c - 'a']++;
        }

        int n = words.size();
        vector<int> wordScores(n, 0);
        vector<vector<int>> wordFreqs(n, vector<int>(26, 0));

        for (int i = 0; i < n; i++) {
            for (char c : words[i]) {
                int idx = c - 'a';
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        int res = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            int curScore = 0;
            vector<int> curLetterCnt = letterCnt;
            bool valid = true;

            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    for (int j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (int j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = max(res, curScore);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string[]} letters
     * @param {number[]} score
     * @return {number}
     */
    maxScoreWords(words, letters, score) {
        let letterCnt = new Array(26).fill(0);
        for (let c of letters) {
            letterCnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let n = words.length;
        let wordScores = new Array(n).fill(0);
        let wordFreqs = Array.from({ length: n }, () => new Array(26).fill(0));

        for (let i = 0; i < n; i++) {
            for (let c of words[i]) {
                let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
                wordFreqs[i][idx]++;
                wordScores[i] += score[idx];
            }
        }

        let res = 0;
        for (let mask = 0; mask < 1 << n; mask++) {
            let curScore = 0;
            let curLetterCnt = [...letterCnt];
            let valid = true;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    for (let j = 0; j < 26; j++) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false;
                            break;
                        }
                    }
                    if (!valid) break;

                    for (let j = 0; j < 26; j++) {
                        curLetterCnt[j] -= wordFreqs[i][j];
                    }

                    curScore += wordScores[i];
                }
            }

            if (valid) {
                res = Math.max(res, curScore);
            }
        }

        return res;
    }
}
```

```go
func maxScoreWords(words []string, letters []byte, score []int) int {
    letterCnt := make([]int, 26)
    for _, c := range letters {
        letterCnt[c-'a']++
    }

    n := len(words)
    wordScores := make([]int, n)
    wordFreqs := make([][]int, n)

    for i := 0; i < n; i++ {
        wordFreqs[i] = make([]int, 26)
        for j := 0; j < len(words[i]); j++ {
            idx := words[i][j] - 'a'
            wordFreqs[i][idx]++
            wordScores[i] += score[idx]
        }
    }

    res := 0
    for mask := 0; mask < (1 << n); mask++ {
        curScore := 0
        curLetterCnt := make([]int, 26)
        copy(curLetterCnt, letterCnt)
        valid := true

        for i := 0; i < n; i++ {
            if mask&(1<<i) != 0 {
                for j := 0; j < 26; j++ {
                    if wordFreqs[i][j] > curLetterCnt[j] {
                        valid = false
                        break
                    }
                }
                if !valid {
                    break
                }

                for j := 0; j < 26; j++ {
                    curLetterCnt[j] -= wordFreqs[i][j]
                }
                curScore += wordScores[i]
            }
        }

        if valid && curScore > res {
            res = curScore
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxScoreWords(words: Array<String>, letters: CharArray, score: IntArray): Int {
        val letterCnt = IntArray(26)
        for (c in letters) {
            letterCnt[c - 'a']++
        }

        val n = words.size
        val wordScores = IntArray(n)
        val wordFreqs = Array(n) { IntArray(26) }

        for (i in 0 until n) {
            for (c in words[i]) {
                val idx = c - 'a'
                wordFreqs[i][idx]++
                wordScores[i] += score[idx]
            }
        }

        var res = 0
        for (mask in 0 until (1 shl n)) {
            var curScore = 0
            val curLetterCnt = letterCnt.copyOf()
            var valid = true

            for (i in 0 until n) {
                if (mask and (1 shl i) != 0) {
                    for (j in 0 until 26) {
                        if (wordFreqs[i][j] > curLetterCnt[j]) {
                            valid = false
                            break
                        }
                    }
                    if (!valid) break

                    for (j in 0 until 26) {
                        curLetterCnt[j] -= wordFreqs[i][j]
                    }
                    curScore += wordScores[i]
                }
            }

            if (valid) {
                res = maxOf(res, curScore)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScoreWords(_ words: [String], _ letters: [Character], _ score: [Int]) -> Int {
        var letterCnt = [Int](repeating: 0, count: 26)
        for c in letters {
            letterCnt[Int(c.asciiValue! - Character("a").asciiValue!)] += 1
        }

        let n = words.count
        var wordScores = [Int](repeating: 0, count: n)
        var wordFreqs = [[Int]](repeating: [Int](repeating: 0, count: 26), count: n)

        for i in 0..<n {
            for c in words[i] {
                let idx = Int(c.asciiValue! - Character("a").asciiValue!)
                wordFreqs[i][idx] += 1
                wordScores[i] += score[idx]
            }
        }

        var res = 0
        for mask in 0..<(1 << n) {
            var curScore = 0
            var curLetterCnt = letterCnt
            var valid = true

            for i in 0..<n {
                if mask & (1 << i) != 0 {
                    for j in 0..<26 {
                        if wordFreqs[i][j] > curLetterCnt[j] {
                            valid = false
                            break
                        }
                    }
                    if !valid { break }

                    for j in 0..<26 {
                        curLetterCnt[j] -= wordFreqs[i][j]
                    }
                    curScore += wordScores[i]
                }
            }

            if valid {
                res = max(res, curScore)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * 2 ^ n + N)$
- Space complexity: $O(n + w)$

> Where $n$ is the number of words, $w$ is the maximum length of a word, $m$ is the size of the array $scores$, and $N$ is the size of the array $letters$.

---

## Common Pitfalls

### Not Restoring Letter Counts After Backtracking

When using backtracking, you must restore the letter counts after exploring the branch where you include a word. Forgetting to add the letters back after the recursive call means subsequent branches operate with incorrect letter availability, leading to wrong results or missing valid combinations.

### Checking Word Validity Too Late

You should verify that a word can be formed with available letters before consuming those letters. If you subtract letters first and then discover the word is invalid, you've already corrupted the state. Always check availability first, then subtract if the word can be formed.

### Counting Letters Incorrectly for Duplicate Characters

When a word contains duplicate characters (e.g., "aab"), you need the letter pool to have enough of each character. A common bug is checking if each character exists at least once, rather than checking if the count is sufficient. Use frequency arrays or counters that properly track multiple occurrences.

### Confusing Word Score with Letter Score

The `score` array maps each letter to its value (index 0 = 'a', index 1 = 'b', etc.). A word's score is the sum of its letters' scores, not a single lookup. Misinterpreting this mapping or forgetting to sum all letters in the word produces incorrect scores.

### Using Greedy Instead of Exhaustive Search

This problem requires exploring all `2^n` subsets of words because including a high-scoring word might prevent including multiple other words that together score higher. Greedy approaches (e.g., always taking the highest-scoring valid word first) don't guarantee the optimal solution.
