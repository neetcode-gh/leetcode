## 1. Brute Force

### Intuition

A sequential digit number has digits that increase by exactly 1 from left to right (like 123 or 4567). The straightforward approach is to check every number in the range `[low, high]` and verify if it has sequential digits by comparing adjacent digit characters. While simple to implement, this becomes impractical for large ranges.

### Algorithm

1. Iterate through every number from `low` to `high`.
2. For each number, convert it to a string.
3. Check if each adjacent pair of digits differs by exactly 1.
4. If all adjacent pairs satisfy this condition, add the number to the result.
5. Return the result list.

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []

        for num in range(low, high + 1):
            s = str(num)
            flag = True
            for i in range(1, len(s)):
                if ord(s[i]) - ord(s[i - 1]) != 1:
                    flag = False
                    break
            if flag:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        for (int num = low; num <= high; num++) {
            String s = String.valueOf(num);
            boolean flag = true;
            for (int i = 1; i < s.length(); i++) {
                if (s.charAt(i) - s.charAt(i - 1) != 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.add(num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        for (int num = low; num <= high; num++) {
            string s = to_string(num);
            bool flag = true;
            for (int i = 1; i < s.size(); i++) {
                if (s[i] - s[i - 1] != 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.push_back(num);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        for (let num = low; num <= high; num++) {
            const s = num.toString();
            let flag = true;
            for (let i = 1; i < s.length; i++) {
                if (s.charCodeAt(i) - s.charCodeAt(i - 1) !== 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> SequentialDigits(int low, int high) {
        var res = new List<int>();
        for (int num = low; num <= high; num++) {
            string s = num.ToString();
            bool flag = true;
            for (int i = 1; i < s.Length; i++) {
                if (s[i] - s[i - 1] != 1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res.Add(num);
            }
        }
        return res;
    }
}
```

```go
func sequentialDigits(low int, high int) []int {
    res := []int{}
    for num := low; num <= high; num++ {
        s := strconv.Itoa(num)
        flag := true
        for i := 1; i < len(s); i++ {
            if s[i]-s[i-1] != 1 {
                flag = false
                break
            }
        }
        if flag {
            res = append(res, num)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        val res = mutableListOf<Int>()
        for (num in low..high) {
            val s = num.toString()
            var flag = true
            for (i in 1 until s.length) {
                if (s[i] - s[i - 1] != 1) {
                    flag = false
                    break
                }
            }
            if (flag) {
                res.add(num)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func sequentialDigits(_ low: Int, _ high: Int) -> [Int] {
        var res = [Int]()
        for num in low...high {
            let s = Array(String(num))
            var flag = true
            for i in 1..<s.count {
                if Int(s[i].asciiValue!) - Int(s[i - 1].asciiValue!) != 1 {
                    flag = false
                    break
                }
            }
            if flag {
                res.append(num)
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

---

## 2. Simulation

### Intuition

Instead of checking every number, we can generate only the valid sequential digit numbers directly. For a number with `d` digits starting with digit `s`, we can build it by appending consecutive digits. For example, starting with 3 and building a 4-digit number gives us 3456. We iterate over all valid digit lengths and starting digits, constructing each candidate and checking if it falls within `[low, high]`.

### Algorithm

1. Determine the digit lengths to consider: from the number of digits in `low` to that of `high`.
2. For each digit length `d`:
   - For each starting digit `s` from 1 to 9:
     - If `s + d > 10`, break (not enough consecutive digits available).
     - Build the number by starting with `s` and appending `s+1`, `s+2`, etc.
     - If the result is within `[low, high]`, add it to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []
        low_digit, high_digit = len(str(low)), len(str(high))

        for digits in range(low_digit, high_digit + 1):
            for start in range(1, 10):
                if start + digits > 10:
                    break
                num = start
                prev = start
                for i in range(digits - 1):
                    num = num * 10
                    prev += 1
                    num += prev
                if low <= num <= high:
                    res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        int lowDigit = String.valueOf(low).length();
        int highDigit = String.valueOf(high).length();

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.add(num);
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        int lowDigit = to_string(low).length();
        int highDigit = to_string(high).length();

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.push_back(num);
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        const lowDigit = low.toString().length;
        const highDigit = high.toString().length;

        for (let digits = lowDigit; digits <= highDigit; digits++) {
            for (let start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                let num = start;
                let prev = start;
                for (let i = 1; i < digits; i++) {
                    num = num * 10 + ++prev;
                }
                if (num >= low && num <= high) {
                    res.push(num);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> SequentialDigits(int low, int high) {
        var res = new List<int>();
        int lowDigit = low.ToString().Length;
        int highDigit = high.ToString().Length;

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.Add(num);
                }
            }
        }
        return res;
    }
}
```

```go
func sequentialDigits(low int, high int) []int {
    res := []int{}
    lowDigit := len(strconv.Itoa(low))
    highDigit := len(strconv.Itoa(high))

    for digits := lowDigit; digits <= highDigit; digits++ {
        for start := 1; start < 10; start++ {
            if start+digits > 10 {
                break
            }
            num := start
            prev := start
            for i := 1; i < digits; i++ {
                prev++
                num = num*10 + prev
            }
            if num >= low && num <= high {
                res = append(res, num)
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        val res = mutableListOf<Int>()
        val lowDigit = low.toString().length
        val highDigit = high.toString().length

        for (digits in lowDigit..highDigit) {
            for (start in 1..9) {
                if (start + digits > 10) {
                    break
                }
                var num = start
                var prev = start
                for (i in 1 until digits) {
                    prev++
                    num = num * 10 + prev
                }
                if (num in low..high) {
                    res.add(num)
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func sequentialDigits(_ low: Int, _ high: Int) -> [Int] {
        var res = [Int]()
        let lowDigit = String(low).count
        let highDigit = String(high).count

        for digits in lowDigit...highDigit {
            for start in 1..<10 {
                if start + digits > 10 {
                    break
                }
                var num = start
                var prev = start
                for _ in 1..<digits {
                    prev += 1
                    num = num * 10 + prev
                }
                if num >= low && num <= high {
                    res.append(num)
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 3. Breadth First Search

### Intuition

We can think of generating sequential digit numbers as a BFS traversal. Start with single digits 1 through 9 in a queue. For each number, we can extend it by appending the next consecutive digit (if the last digit is less than 9). Processing the queue level by level naturally generates numbers in increasing order of length, and within each length, in increasing order of value.

### Algorithm

1. Initialize a queue with digits 1 through 9.
2. While the queue is not empty:
   - Dequeue a number `n`.
   - If `n > high`, skip it.
   - If `n` is within `[low, high]`, add it to the result.
   - Get the last digit of `n`. If it's less than 9, enqueue `n * 10 + (lastDigit + 1)`.
3. Return the result list.

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []
        queue = deque(range(1, 10))

        while queue:
            n = queue.popleft()
            if n > high:
                continue
            if low <= n <= high:
                res.append(n)
            ones = n % 10
            if ones < 9:
                queue.append(n * 10 + (ones + 1))

        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();

        for (int i = 1; i < 10; i++) {
            queue.add(i);
        }

        while (!queue.isEmpty()) {
            int n = queue.poll();
            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.add(n);
            }
            int ones = n % 10;
            if (ones < 9) {
                queue.add(n * 10 + (ones + 1));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        queue<int> queue;

        for (int i = 1; i < 10; i++) {
            queue.push(i);
        }

        while (!queue.empty()) {
            int n = queue.front();
            queue.pop();

            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.push_back(n);
            }
            int ones = n % 10;
            if (ones < 9) {
                queue.push(n * 10 + (ones + 1));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];
        const queue = new Queue();
        for (let i = 1; i < 9; i++) {
            queue.push(i);
        }

        while (!queue.isEmpty()) {
            const n = queue.pop();
            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.push(n);
            }
            const ones = n % 10;
            if (ones < 9) {
                queue.push(n * 10 + (ones + 1));
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> SequentialDigits(int low, int high) {
        var res = new List<int>();
        var queue = new Queue<int>();

        for (int i = 1; i < 10; i++) {
            queue.Enqueue(i);
        }

        while (queue.Count > 0) {
            int n = queue.Dequeue();
            if (n > high) {
                continue;
            }
            if (n >= low && n <= high) {
                res.Add(n);
            }
            int ones = n % 10;
            if (ones < 9) {
                queue.Enqueue(n * 10 + (ones + 1));
            }
        }

        return res;
    }
}
```

```go
func sequentialDigits(low int, high int) []int {
    res := []int{}
    queue := []int{}

    for i := 1; i < 10; i++ {
        queue = append(queue, i)
    }

    for len(queue) > 0 {
        n := queue[0]
        queue = queue[1:]

        if n > high {
            continue
        }
        if n >= low && n <= high {
            res = append(res, n)
        }
        ones := n % 10
        if ones < 9 {
            queue = append(queue, n*10+(ones+1))
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        val res = mutableListOf<Int>()
        val queue = ArrayDeque<Int>()

        for (i in 1..9) {
            queue.add(i)
        }

        while (queue.isNotEmpty()) {
            val n = queue.removeFirst()
            if (n > high) {
                continue
            }
            if (n in low..high) {
                res.add(n)
            }
            val ones = n % 10
            if (ones < 9) {
                queue.add(n * 10 + (ones + 1))
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func sequentialDigits(_ low: Int, _ high: Int) -> [Int] {
        var res = [Int]()
        var queue = [Int]()

        for i in 1..<10 {
            queue.append(i)
        }

        while !queue.isEmpty {
            let n = queue.removeFirst()
            if n > high {
                continue
            }
            if n >= low && n <= high {
                res.append(n)
            }
            let ones = n % 10
            if ones < 9 {
                queue.append(n * 10 + (ones + 1))
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 4. Depth First Search

### Intuition

DFS provides another way to enumerate sequential digit numbers. Starting from each single digit (1 to 9), we recursively extend the number by appending the next digit. The recursion naturally explores all valid sequential numbers. Since we start from different initial digits and explore in order, the results may not be sorted, so we sort at the end.

### Algorithm

1. Define a DFS function that takes the current number:
   - If the number exceeds `high`, return.
   - If the number is within `[low, high]`, add it to the result.
   - If the last digit is less than 9, recurse with `num * 10 + (lastDigit + 1)`.
2. Call DFS starting from each digit 1 through 9.
3. Sort the result list and return it.

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        res = []

        def dfs(num):
            if num > high:
                return
            if low <= num <= high:
                res.append(num)
            last_digit = num % 10
            if last_digit < 9:
                dfs(num * 10 + (last_digit + 1))

        for i in range(1, 10):
            dfs(i)

        return sorted(res)
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();

        for (int i = 1; i < 10; i++) {
            dfs(i, low, high, res);
        }

        Collections.sort(res);
        return res;
    }

    private void dfs(int num, int low, int high, List<Integer> res) {
        if (num > high) {
            return;
        }
        if (num >= low) {
            res.add(num);
        }
        int lastDigit = num % 10;
        if (lastDigit < 9) {
            dfs(num * 10 + (lastDigit + 1), low, high, res);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        vector<int> res;
        for (int i = 1; i < 10; i++) {
            dfs(i, low, high, res);
        }
        sort(res.begin(), res.end());
        return res;
    }

private:
    void dfs(int num, int low, int high, vector<int>& res) {
        if (num > high) {
            return;
        }
        if (num >= low) {
            res.push_back(num);
        }
        int lastDigit = num % 10;
        if (lastDigit < 9) {
            dfs(num * 10 + (lastDigit + 1), low, high, res);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const res = [];

        const dfs = (num) => {
            if (num > high) {
                return;
            }
            if (num >= low) {
                res.push(num);
            }
            const lastDigit = num % 10;
            if (lastDigit < 9) {
                dfs(num * 10 + (lastDigit + 1));
            }
        };

        for (let i = 1; i < 10; i++) {
            dfs(i);
        }

        return res.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public IList<int> SequentialDigits(int low, int high) {
        var res = new List<int>();

        void Dfs(int num) {
            if (num > high) {
                return;
            }
            if (num >= low) {
                res.Add(num);
            }
            int lastDigit = num % 10;
            if (lastDigit < 9) {
                Dfs(num * 10 + (lastDigit + 1));
            }
        }

        for (int i = 1; i < 10; i++) {
            Dfs(i);
        }

        res.Sort();
        return res;
    }
}
```

```go
func sequentialDigits(low int, high int) []int {
    res := []int{}

    var dfs func(num int)
    dfs = func(num int) {
        if num > high {
            return
        }
        if num >= low {
            res = append(res, num)
        }
        lastDigit := num % 10
        if lastDigit < 9 {
            dfs(num*10 + (lastDigit + 1))
        }
    }

    for i := 1; i < 10; i++ {
        dfs(i)
    }

    sort.Ints(res)
    return res
}
```

```kotlin
class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        val res = mutableListOf<Int>()

        fun dfs(num: Int) {
            if (num > high) {
                return
            }
            if (num >= low) {
                res.add(num)
            }
            val lastDigit = num % 10
            if (lastDigit < 9) {
                dfs(num * 10 + (lastDigit + 1))
            }
        }

        for (i in 1..9) {
            dfs(i)
        }

        return res.sorted()
    }
}
```

```swift
class Solution {
    func sequentialDigits(_ low: Int, _ high: Int) -> [Int] {
        var res = [Int]()

        func dfs(_ num: Int) {
            if num > high {
                return
            }
            if num >= low {
                res.append(num)
            }
            let lastDigit = num % 10
            if lastDigit < 9 {
                dfs(num * 10 + (lastDigit + 1))
            }
        }

        for i in 1..<10 {
            dfs(i)
        }

        return res.sorted()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## 5. Sliding Window

### Intuition

All sequential digit numbers are substrings of "123456789". A 2-digit sequential number is a substring of length 2, a 3-digit one is length 3, and so on. By sliding a window of each valid length across this master string and converting substrings to integers, we generate all possible sequential digit numbers directly.

### Algorithm

1. Define the string `nums = "123456789"`.
2. For each window size `d` from 2 to 9:
   - Slide the window across `nums`:
     - Extract the substring of length `d` starting at index `i`.
     - Convert it to an integer.
     - If it exceeds `high`, break the inner loop.
     - If it is within `[low, high]`, add it to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        nums = "123456789"
        res = []
        for d in range(2, 10):
            for i in range(9 - d + 1):
                num = int(nums[i: i + d])
                if num > high:
                    break
                if low <= num <= high:
                    res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        String nums = "123456789";
        List<Integer> res = new ArrayList<>();

        for (int d = 2; d <= 9; d++) {
            for (int i = 0; i <= 9 - d; i++) {
                int num = Integer.parseInt(nums.substring(i, i + d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.add(num);
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        string nums = "123456789";
        vector<int> res;

        for (int d = 2; d <= 9; d++) {
            for (int i = 0; i <= 9 - d; i++) {
                int num = stoi(nums.substr(i, d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.push_back(num);
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} low
     * @param {number} high
     * @return {number[]}
     */
    sequentialDigits(low, high) {
        const nums = '123456789';
        const res = [];

        for (let d = 2; d <= 9; d++) {
            for (let i = 0; i <= 9 - d; i++) {
                const num = parseInt(nums.substring(i, i + d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.push(num);
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> SequentialDigits(int low, int high) {
        string nums = "123456789";
        var res = new List<int>();

        for (int d = 2; d <= 9; d++) {
            for (int i = 0; i <= 9 - d; i++) {
                int num = int.Parse(nums.Substring(i, d));
                if (num > high) {
                    break;
                }
                if (num >= low && num <= high) {
                    res.Add(num);
                }
            }
        }

        return res;
    }
}
```

```go
func sequentialDigits(low int, high int) []int {
    nums := "123456789"
    res := []int{}

    for d := 2; d <= 9; d++ {
        for i := 0; i <= 9-d; i++ {
            num, _ := strconv.Atoi(nums[i : i+d])
            if num > high {
                break
            }
            if num >= low && num <= high {
                res = append(res, num)
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun sequentialDigits(low: Int, high: Int): List<Int> {
        val nums = "123456789"
        val res = mutableListOf<Int>()

        for (d in 2..9) {
            for (i in 0..(9 - d)) {
                val num = nums.substring(i, i + d).toInt()
                if (num > high) {
                    break
                }
                if (num in low..high) {
                    res.add(num)
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func sequentialDigits(_ low: Int, _ high: Int) -> [Int] {
        let nums = Array("123456789")
        var res = [Int]()

        for d in 2...9 {
            for i in 0...(9 - d) {
                let num = Int(String(nums[i..<(i + d)]))!
                if num > high {
                    break
                }
                if num >= low && num <= high {
                    res.append(num)
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

> Since, we have at most $36$ valid numbers as per the given constraints.

---

## Common Pitfalls

### Not Recognizing the Limited Search Space

A common mistake is using a brute force approach that iterates through every number in the range `[low, high]`. Since there are only 36 possible sequential digit numbers (from "12" to "123456789"), iterating through potentially billions of numbers is extremely inefficient. Recognize that you should generate only the valid candidates.

### Forgetting the Upper Bound on Starting Digits

When building sequential digit numbers of length `d`, the starting digit cannot exceed `10 - d`. For example, a 4-digit sequential number cannot start with 7, 8, or 9 because there are not enough consecutive digits remaining. Failing to enforce this constraint leads to invalid numbers like "7890" which wraps around.

### Returning Results Out of Order

Some approaches like DFS generate numbers in an order that is not sorted (e.g., 12, 123, 1234, ..., 23, 234, ...). The problem expects results in ascending order. Remember to sort the final result if your generation method does not naturally produce sorted output.
