## Prerequisites
Before attempting this problem, you should be comfortable with:
- **String Parsing** - Extracting characters and numeric values from a formatted string
- **Iterator Pattern** - Understanding how iterators maintain state between successive calls
- **Arrays/Lists** - Using dynamic arrays to store precomputed results

---

## 1. Uncompressing the String (Time Limit Exceeded)

### Intuition
The most straightforward approach is to fully decompress the string during initialization. We parse each character-count pair and append the character that many times to a result array. Then iteration simply walks through this precomputed array. This is easy to implement but can use excessive memory and time when counts are very large.

### Algorithm
1. Parse the compressed string, extracting each character followed by its numeric count.
2. For each pair, append the character to a result array the specified number of times.
3. Maintain a pointer `ptr` starting at `0`.
4. For `next()`: If `hasNext()` is `false`, return a space. Otherwise, return the character at `ptr` and increment `ptr`.
5. For `hasNext()`: Return `true` if `ptr` is less than the length of the result array.

::tabs-start

```python
class StringIterator:
    def __init__(self, compressedString: str):
        self.res = []
        self.ptr = 0
        
        i = 0
        while i < len(compressedString):
            ch = compressedString[i]
            i += 1
            num = 0
            while i < len(compressedString) and compressedString[i].isdigit():
                num = num * 10 + int(compressedString[i])
                i += 1
            
            for j in range(num):
                self.res.append(ch)

    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        char = self.res[self.ptr]
        self.ptr += 1
        return char

    def hasNext(self) -> bool:
        return self.ptr != len(self.res)
```

```java
class StringIterator {

    StringBuilder res=new StringBuilder();
    int ptr=0;

    public StringIterator(String s) {
        int i = 0;
        while (i < s.length()) {
            char ch = s.charAt(i++);
            int num = 0;
            while (i < s.length() && Character.isDigit(s.charAt(i))) {
                num = num * 10 + s.charAt(i) - '0';
                i++;
            }

            for (int j = 0; j < num; j++)
                res.append(ch);
        }
    }

    public char next() {
        if (!hasNext())
            return ' ';

        return res.charAt(ptr++);
    }

    public boolean hasNext() {
        return ptr!=res.length();
    }
}
```

```cpp
class StringIterator {
public:
    string res;
    int ptr;
    
    StringIterator(string compressedString) {
        res = "";
        ptr = 0;
        
        int i = 0;
        while (i < compressedString.length()) {
            char ch = compressedString[i++];
            int num = 0;
            while (i < compressedString.length() && isdigit(compressedString[i])) {
                num = num * 10 + compressedString[i] - '0';
                i++;
            }
            
            for (int j = 0; j < num; j++)
                res += ch;
        }
    }
    
    char next() {
        if (!hasNext())
            return ' ';
        
        return res[ptr++];
    }
    
    bool hasNext() {
        return ptr != res.length();
    }
};
```

```javascript
class StringIterator {
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.res = [];
        this.ptr = 0;
        
        let i = 0;
        while (i < compressedString.length) {
            const ch = compressedString[i++];
            let num = 0;
            while (i < compressedString.length && !isNaN(compressedString[i])) {
                num = num * 10 + parseInt(compressedString[i]);
                i++;
            }
            
            for (let j = 0; j < num; j++)
                this.res.push(ch);
        }
    }
    
    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';
        
        return this.res[this.ptr++];
    }
    
    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.res.length;
    }
}
```

```csharp
public class StringIterator {
    private List<char> res;
    private int ptr;

    public StringIterator(string compressedString) {
        res = new List<char>();
        ptr = 0;

        int i = 0;
        while (i < compressedString.Length) {
            char ch = compressedString[i++];
            int num = 0;
            while (i < compressedString.Length && char.IsDigit(compressedString[i])) {
                num = num * 10 + (compressedString[i] - '0');
                i++;
            }

            for (int j = 0; j < num; j++)
                res.Add(ch);
        }
    }

    public char Next() {
        if (!HasNext())
            return ' ';

        return res[ptr++];
    }

    public bool HasNext() {
        return ptr != res.Count;
    }
}
```

```go
type StringIterator struct {
    res []byte
    ptr int
}

func Constructor(compressedString string) StringIterator {
    res := []byte{}
    i := 0
    for i < len(compressedString) {
        ch := compressedString[i]
        i++
        num := 0
        for i < len(compressedString) && compressedString[i] >= '0' && compressedString[i] <= '9' {
            num = num*10 + int(compressedString[i]-'0')
            i++
        }
        for j := 0; j < num; j++ {
            res = append(res, ch)
        }
    }
    return StringIterator{res: res, ptr: 0}
}

func (this *StringIterator) Next() byte {
    if !this.HasNext() {
        return ' '
    }
    ch := this.res[this.ptr]
    this.ptr++
    return ch
}

func (this *StringIterator) HasNext() bool {
    return this.ptr != len(this.res)
}
```

```kotlin
class StringIterator(compressedString: String) {
    private val res = StringBuilder()
    private var ptr = 0

    init {
        var i = 0
        while (i < compressedString.length) {
            val ch = compressedString[i++]
            var num = 0
            while (i < compressedString.length && compressedString[i].isDigit()) {
                num = num * 10 + (compressedString[i] - '0')
                i++
            }
            repeat(num) { res.append(ch) }
        }
    }

    fun next(): Char {
        if (!hasNext()) return ' '
        return res[ptr++]
    }

    fun hasNext(): Boolean {
        return ptr != res.length
    }
}
```

```swift
class StringIterator {
    private var res: [Character]
    private var ptr: Int

    init(_ compressedString: String) {
        res = []
        ptr = 0
        let chars = Array(compressedString)
        var i = 0
        while i < chars.count {
            let ch = chars[i]
            i += 1
            var num = 0
            while i < chars.count && chars[i].isNumber {
                num = num * 10 + Int(String(chars[i]))!
                i += 1
            }
            for _ in 0..<num {
                res.append(ch)
            }
        }
    }

    func next() -> Character {
        if !hasNext() {
            return " "
        }
        let ch = res[ptr]
        ptr += 1
        return ch
    }

    func hasNext() -> Bool {
        return ptr != res.count
    }
}
```

::tabs-end

### Time & Space Complexity

- We precompute the elements of the uncompressed string. Thus, the space required in this case is $O(m)$, where $m$ refers to the length of the uncompressed string.

- The time required for precomputation is $O(m)$ since we need to generate the uncompressed string of length $m$.

- Once the precomputation has been done, the time required for performing `next()` and `hasNext()` is $O(1)$ for both.

- This approach can be easily extended to include `previous()`, `last()` and `find()` operations. All these operations require the use of an index only and thus, take $O(1)$ time. Operations like `hasPrevious()` can also be easily included.

- Since once the precomputation has been done, `next()` requires $O(1)$ time, this approach is useful if `next()` operation needs to be performed a large number of times. However, if `hasNext()` is performed most of the times, this approach isn't much advantageous since precomputation needs to be done anyhow.

- A potential problem with this approach could arise if the length of the uncompressed string is very large. In such a case, the size of the complete uncompressed string could become so large that it can't fit in the memory limits, leading to memory overflow.

>  Where $m$ is the length of the **uncompressed** string.

---

## 2. Pre-Computation

### Intuition
Instead of fully decompressing, we can store the compressed representation more efficiently by separating characters and their counts into parallel arrays. During iteration, we track which character group we're in and how many of that character remain. When a count reaches zero, we move to the next group. This uses space proportional to the compressed string rather than the decompressed length.

### Algorithm
1. Parse the compressed string using regex or manual parsing to extract two arrays: `chars` (the letters) and `nums` (the counts).
2. Maintain a pointer `ptr` to the current character group.
3. For `next()`: If `hasNext()` is `false`, return a space. Otherwise, decrement `nums[ptr]`, get the character at `chars[ptr]`, and if `nums[ptr]` becomes `0`, increment `ptr`. Return the character.
4. For `hasNext()`: Return `true` if `ptr` is less than the length of `chars`.

::tabs-start

```python
class StringIterator:
    def __init__(self, compressedString: str):
        self.ptr = 0
        import re
        self.nums = list(map(int, re.findall(r'\d+', compressedString)))
        self.chars = re.findall(r'[a-zA-Z]', compressedString)

    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        self.nums[self.ptr] -= 1
        res = self.chars[self.ptr]
        
        if self.nums[self.ptr] == 0:
            self.ptr += 1
        
        return res

    def hasNext(self) -> bool:
        return self.ptr != len(self.chars)
```

```java
class StringIterator {

    int ptr = 0;
    String[] chars;int[] nums;

    public StringIterator(String compressedString) {
        nums = Arrays.stream(compressedString.substring(1).split("[a-zA-Z]+")).mapToInt(Integer::parseInt).toArray();;
        chars = compressedString.split("[0-9]+");
    }

    public char next() {
        if (!hasNext())
            return ' ';

        nums[ptr]--;
        char res=chars[ptr].charAt(0);
        if(nums[ptr]==0)
            ptr++;
        return res;
    }

    public boolean hasNext() {
        return ptr != chars.length;
    }
}
```

```cpp
class StringIterator {
public:
    int ptr = 0;
    vector<char> chars;
    vector<int> nums;
    
    StringIterator(string compressedString) {
        for (int i = 0; i < compressedString.length(); i++) {
            if (isalpha(compressedString[i])) {
                chars.push_back(compressedString[i]);
                int num = 0;
                i++;
                while (i < compressedString.length() && isdigit(compressedString[i])) {
                    num = num * 10 + (compressedString[i] - '0');
                    i++;
                }
                nums.push_back(num);
                i--;
            }
        }
    }
    
    char next() {
        if (!hasNext())
            return ' ';
        
        nums[ptr]--;
        char res = chars[ptr];
        
        if (nums[ptr] == 0)
            ptr++;
        
        return res;
    }
    
    bool hasNext() {
        return ptr != chars.size();
    }
};
```

```javascript
class StringIterator {
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.ptr = 0;
        this.nums = compressedString.match(/\d+/g).map(Number);
        this.chars = compressedString.match(/[a-zA-Z]/g);
    }

    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';
        
        this.nums[this.ptr]--;
        let res = this.chars[this.ptr];
        
        if (this.nums[this.ptr] === 0)
            this.ptr++;
        
        return res;
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.chars.length;
    }
}
```

```csharp
using System.Text.RegularExpressions;

public class StringIterator {
    private int ptr = 0;
    private char[] chars;
    private int[] nums;

    public StringIterator(string compressedString) {
        chars = Regex.Matches(compressedString, @"[a-zA-Z]")
            .Cast<Match>()
            .Select(m => m.Value[0])
            .ToArray();
        nums = Regex.Matches(compressedString, @"\d+")
            .Cast<Match>()
            .Select(m => int.Parse(m.Value))
            .ToArray();
    }

    public char Next() {
        if (!HasNext())
            return ' ';

        nums[ptr]--;
        char res = chars[ptr];
        if (nums[ptr] == 0)
            ptr++;
        return res;
    }

    public bool HasNext() {
        return ptr != chars.Length;
    }
}
```

```go
import "regexp"

type StringIterator struct {
    ptr   int
    chars []byte
    nums  []int
}

func Constructor(compressedString string) StringIterator {
    charRe := regexp.MustCompile(`[a-zA-Z]`)
    numRe := regexp.MustCompile(`\d+`)

    charMatches := charRe.FindAllString(compressedString, -1)
    numMatches := numRe.FindAllString(compressedString, -1)

    chars := make([]byte, len(charMatches))
    for i, c := range charMatches {
        chars[i] = c[0]
    }

    nums := make([]int, len(numMatches))
    for i, n := range numMatches {
        num := 0
        for _, ch := range n {
            num = num*10 + int(ch-'0')
        }
        nums[i] = num
    }

    return StringIterator{ptr: 0, chars: chars, nums: nums}
}

func (this *StringIterator) Next() byte {
    if !this.HasNext() {
        return ' '
    }
    this.nums[this.ptr]--
    res := this.chars[this.ptr]
    if this.nums[this.ptr] == 0 {
        this.ptr++
    }
    return res
}

func (this *StringIterator) HasNext() bool {
    return this.ptr != len(this.chars)
}
```

```kotlin
class StringIterator(compressedString: String) {
    private var ptr = 0
    private val chars: CharArray
    private val nums: IntArray

    init {
        chars = Regex("[a-zA-Z]").findAll(compressedString).map { it.value[0] }.toList().toCharArray()
        nums = Regex("\\d+").findAll(compressedString).map { it.value.toInt() }.toList().toIntArray()
    }

    fun next(): Char {
        if (!hasNext()) return ' '
        nums[ptr]--
        val res = chars[ptr]
        if (nums[ptr] == 0) ptr++
        return res
    }

    fun hasNext(): Boolean {
        return ptr != chars.size
    }
}
```

```swift
class StringIterator {
    private var ptr = 0
    private var chars: [Character]
    private var nums: [Int]

    init(_ compressedString: String) {
        chars = []
        nums = []

        let charPattern = try! NSRegularExpression(pattern: "[a-zA-Z]")
        let numPattern = try! NSRegularExpression(pattern: "\\d+")
        let range = NSRange(compressedString.startIndex..., in: compressedString)

        let charMatches = charPattern.matches(in: compressedString, range: range)
        for match in charMatches {
            let matchRange = Range(match.range, in: compressedString)!
            chars.append(compressedString[matchRange].first!)
        }

        let numMatches = numPattern.matches(in: compressedString, range: range)
        for match in numMatches {
            let matchRange = Range(match.range, in: compressedString)!
            nums.append(Int(String(compressedString[matchRange]))!)
        }
    }

    func next() -> Character {
        if !hasNext() {
            return " "
        }
        nums[ptr] -= 1
        let res = chars[ptr]
        if nums[ptr] == 0 {
            ptr += 1
        }
        return res
    }

    func hasNext() -> Bool {
        return ptr != chars.count
    }
}
```

::tabs-end

### Time & Space Complexity

- The space required for storing the results of the precomputation is $O(n)$, where $n$ refers to the length of the compressed string. The $nums$ and $chars$ array contain a total of $n$ elements.

- The precomputation step requires $O(n)$ time. Thus, if `hasNext()` operation is performed most of the times, this precomputation turns out to be non-advantageous.

- Once the precomputation has been done, `hasNext()` and `next()` require $O(1)$ time.

- This approach can be extended to include the `previous()` and `hasPrevious()` operations, but that would require making some simple modifications to the current implementation.

>  Where $n$ is the length of the **compressed** string.

---

## 3. Demand-Computation

### Intuition
The most space-efficient approach avoids any preprocessing. We store the original compressed string and parse it lazily as we iterate. We keep track of the current character and how many times it should still be returned. When that count reaches zero, we parse the next character-count pair from the string on demand.

### Algorithm
1. Store the compressed string. Initialize `ptr = 0`, `num = 0`, and `ch = ' '`.
2. For `next()`: If `hasNext()` is `false`, return a space. If `num` is `0`, parse the next character (store in `ch`) and its following digits (store in `num`). Decrement `num` and return `ch`.
3. For `hasNext()`: Return `true` if `ptr` is less than the string length OR `num` is greater than `0`.

::tabs-start

```python
class StringIterator:
    
    def __init__(self, compressedString: str):
        self.res = compressedString
        self.ptr = 0
        self.num = 0
        self.ch = ' '
    
    def next(self) -> str:
        if not self.hasNext():
            return ' '
        
        if self.num == 0:
            self.ch = self.res[self.ptr]
            self.ptr += 1
            while self.ptr < len(self.res) and self.res[self.ptr].isdigit():
                self.num = self.num * 10 + int(self.res[self.ptr])
                self.ptr += 1

        self.num -= 1
        return self.ch
    
    def hasNext(self) -> bool:
        return self.ptr != len(self.res) or self.num != 0
```

```java
class StringIterator {

    String res;
    int ptr = 0, num = 0;
    char ch = ' ';

    public StringIterator(String s) {
        res = s;
    }

    public char next() {
        if (!hasNext())
            return ' ';

        if (num == 0) {
            ch = res.charAt(ptr++);
            while (ptr < res.length() && Character.isDigit(res.charAt(ptr))) {
                num = num * 10 + res.charAt(ptr++) - '0';
            }
        }
        
        num--;
        return ch;
    }

    public boolean hasNext() {
        return ptr != res.length() || num != 0;
    }
}
```

```cpp
class StringIterator {
public:
    string res;
    int ptr = 0, num = 0;
    char ch = ' ';
    
    StringIterator(string compressedString) {
        res = compressedString;
    }
    
    char next() {
        if (!hasNext())
            return ' ';

        if (num == 0) {
            ch = res[ptr++];
            while (ptr < res.length() && isdigit(res[ptr])) {
                num = num * 10 + (res[ptr++] - '0');
            }
        }
        
        num--;
        return ch;
    }
    
    bool hasNext() {
        return ptr != res.length() || num != 0;
    }
};
```

```javascript
class StringIterator {
    
    /**
     * @param {string} compressedString
     */
    constructor(compressedString) {
        this.res = compressedString;
        this.ptr = 0;
        this.num = 0;
        this.ch = ' ';
    }
    
    /**
     * @return {character}
     */
    next() {
        if (!this.hasNext())
            return ' ';

        if (this.num === 0) {
            this.ch = this.res[this.ptr++];
            while (this.ptr < this.res.length && !isNaN(this.res[this.ptr])) {
                this.num = this.num * 10 + parseInt(this.res[this.ptr++]);
            }
        }

        this.num--;
        return this.ch;
    }
    
    /**
     * @return {boolean}
     */
    hasNext() {
        return this.ptr !== this.res.length || this.num !== 0;
    }
}
```

```csharp
public class StringIterator {
    private string res;
    private int ptr = 0, num = 0;
    private char ch = ' ';

    public StringIterator(string compressedString) {
        res = compressedString;
    }

    public char Next() {
        if (!HasNext())
            return ' ';

        if (num == 0) {
            ch = res[ptr++];
            while (ptr < res.Length && char.IsDigit(res[ptr])) {
                num = num * 10 + (res[ptr++] - '0');
            }
        }

        num--;
        return ch;
    }

    public bool HasNext() {
        return ptr != res.Length || num != 0;
    }
}
```

```go
type StringIterator struct {
    res string
    ptr int
    num int
    ch  byte
}

func Constructor(compressedString string) StringIterator {
    return StringIterator{res: compressedString, ptr: 0, num: 0, ch: ' '}
}

func (this *StringIterator) Next() byte {
    if !this.HasNext() {
        return ' '
    }

    if this.num == 0 {
        this.ch = this.res[this.ptr]
        this.ptr++
        for this.ptr < len(this.res) && this.res[this.ptr] >= '0' && this.res[this.ptr] <= '9' {
            this.num = this.num*10 + int(this.res[this.ptr]-'0')
            this.ptr++
        }
    }

    this.num--
    return this.ch
}

func (this *StringIterator) HasNext() bool {
    return this.ptr != len(this.res) || this.num != 0
}
```

```kotlin
class StringIterator(compressedString: String) {
    private val res = compressedString
    private var ptr = 0
    private var num = 0
    private var ch = ' '

    fun next(): Char {
        if (!hasNext()) return ' '

        if (num == 0) {
            ch = res[ptr++]
            while (ptr < res.length && res[ptr].isDigit()) {
                num = num * 10 + (res[ptr++] - '0')
            }
        }

        num--
        return ch
    }

    fun hasNext(): Boolean {
        return ptr != res.length || num != 0
    }
}
```

```swift
class StringIterator {
    private var res: [Character]
    private var ptr = 0
    private var num = 0
    private var ch: Character = " "

    init(_ compressedString: String) {
        res = Array(compressedString)
    }

    func next() -> Character {
        if !hasNext() {
            return " "
        }

        if num == 0 {
            ch = res[ptr]
            ptr += 1
            while ptr < res.count && res[ptr].isNumber {
                num = num * 10 + Int(String(res[ptr]))!
                ptr += 1
            }
        }

        num -= 1
        return ch
    }

    func hasNext() -> Bool {
        return ptr != res.count || num != 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Since no precomputation is done, constant space is required in this case.

- The time required to perform `next()` operation is $O(1)$.

- The time required for `hasNext()` operation is $O(1)$.

- Since no precomputations are done, and `hasNext()` requires only $O(1)$ time, this solution is advantageous if `hasNext()` operation is performed most of the times.

- This approach can be extended to include `previous()` and `hasPrevious()` operations, but this will require the use of some additional variables.

---

## Common Pitfalls

### Not Handling Multi-Digit Counts

Counts can be more than one digit (e.g., "a12" means 12 a's). A common mistake is reading only a single digit.

```python
# Wrong - only reads single digit
def next(self) -> str:
    if self.num == 0:
        self.ch = self.res[self.ptr]
        self.ptr += 1
        self.num = int(self.res[self.ptr])  # Fails for "a12"
        self.ptr += 1
    self.num -= 1
    return self.ch

# Correct - parse all consecutive digits
def next(self) -> str:
    if self.num == 0:
        self.ch = self.res[self.ptr]
        self.ptr += 1
        while self.ptr < len(self.res) and self.res[self.ptr].isdigit():
            self.num = self.num * 10 + int(self.res[self.ptr])
            self.ptr += 1
    self.num -= 1
    return self.ch
```

### Incorrect hasNext() Logic with Demand Computation

When using lazy parsing, `hasNext()` must check both whether unparsed string remains AND whether current character still has remaining count.

```python
# Wrong - only checks string position
def hasNext(self) -> bool:
    return self.ptr != len(self.res)  # Misses remaining count!

# Correct - check both conditions
def hasNext(self) -> bool:
    return self.ptr != len(self.res) or self.num != 0
```
