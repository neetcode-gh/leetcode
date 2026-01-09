## 1. Greedy

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        count = [a, b, c]
        res = []

        def getMax(repeated):
            idx = -1
            maxCnt = 0
            for i in range(3):
                if i == repeated or count[i] == 0:
                    continue
                if maxCnt < count[i]:
                    maxCnt = count[i]
                    idx = i
            return idx

        repeated = -1
        while True:
            maxChar = getMax(repeated)
            if maxChar == -1:
                break
            res.append(chr(maxChar + ord('a')))
            count[maxChar] -= 1
            if len(res) > 1 and res[-1] == res[-2]:
                repeated = maxChar
            else:
                repeated = -1

        return ''.join(res)
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        int[] count = {a, b, c};
        StringBuilder res = new StringBuilder();

        int repeated = -1;
        while (true) {
            int maxChar = getMax(count, repeated);
            if (maxChar == -1) {
                break;
            }
            res.append((char) (maxChar + 'a'));
            count[maxChar]--;

            if (res.length() > 1 && res.charAt(res.length() - 1) == res.charAt(res.length() - 2)) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res.toString();
    }

    private int getMax(int[] count, int repeated) {
        int idx = -1, maxCnt = 0;
        for (int i = 0; i < 3; i++) {
            if (i == repeated || count[i] == 0) {
                continue;
            }
            if (maxCnt < count[i]) {
                maxCnt = count[i];
                idx = i;
            }
        }
        return idx;
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        vector<int> count = {a, b, c};
        string res;

        int repeated = -1;
        while (true) {
            int maxChar = getMax(count, repeated);
            if (maxChar == -1) {
                break;
            }
            res += (char)(maxChar + 'a');
            count[maxChar]--;

            if (res.size() > 1 && res.back() == res[res.size() - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res;
    }

private:
    int getMax(const vector<int>& count, int repeated) {
        int idx = -1, maxCnt = 0;
        for (int i = 0; i < 3; i++) {
            if (i == repeated || count[i] == 0) {
                continue;
            }
            if (maxCnt < count[i]) {
                maxCnt = count[i];
                idx = i;
            }
        }
        return idx;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const count = [a, b, c];
        const res = [];

        const getMax = (repeated) => {
            let idx = -1;
            let maxCnt = 0;
            for (let i = 0; i < 3; i++) {
                if (i === repeated || count[i] === 0) {
                    continue;
                }
                if (maxCnt < count[i]) {
                    maxCnt = count[i];
                    idx = i;
                }
            }
            return idx;
        };

        let repeated = -1;
        while (true) {
            const maxChar = getMax(repeated);
            if (maxChar === -1) {
                break;
            }
            res.push(String.fromCharCode(maxChar + 97));
            count[maxChar]--;

            if (res.length > 1 && res[res.length - 1] === res[res.length - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        int[] count = new int[] { a, b, c };
        List<char> res = new List<char>();

        int GetMax(int repeated) {
            int idx = -1;
            int maxCnt = 0;
            for (int i = 0; i < 3; i++) {
                if (i == repeated || count[i] == 0) continue;
                if (maxCnt < count[i]) {
                    maxCnt = count[i];
                    idx = i;
                }
            }
            return idx;
        }

        int repeated = -1;
        while (true) {
            int maxChar = GetMax(repeated);
            if (maxChar == -1) break;

            res.Add((char)(maxChar + 'a'));
            count[maxChar]--;

            if (res.Count > 1 && res[res.Count - 1] == res[res.Count - 2]) {
                repeated = maxChar;
            } else {
                repeated = -1;
            }
        }

        return new string(res.ToArray());
    }
}
```

```go
func longestDiverseString(a int, b int, c int) string {
    count := []int{a, b, c}
    res := []byte{}

    getMax := func(repeated int) int {
        idx := -1
        maxCnt := 0
        for i := 0; i < 3; i++ {
            if i == repeated || count[i] == 0 {
                continue
            }
            if maxCnt < count[i] {
                maxCnt = count[i]
                idx = i
            }
        }
        return idx
    }

    repeated := -1
    for {
        maxChar := getMax(repeated)
        if maxChar == -1 {
            break
        }
        res = append(res, byte(maxChar+'a'))
        count[maxChar]--

        if len(res) > 1 && res[len(res)-1] == res[len(res)-2] {
            repeated = maxChar
        } else {
            repeated = -1
        }
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun longestDiverseString(a: Int, b: Int, c: Int): String {
        val count = intArrayOf(a, b, c)
        val res = StringBuilder()

        fun getMax(repeated: Int): Int {
            var idx = -1
            var maxCnt = 0
            for (i in 0 until 3) {
                if (i == repeated || count[i] == 0) continue
                if (maxCnt < count[i]) {
                    maxCnt = count[i]
                    idx = i
                }
            }
            return idx
        }

        var repeated = -1
        while (true) {
            val maxChar = getMax(repeated)
            if (maxChar == -1) break

            res.append(('a' + maxChar))
            count[maxChar]--

            repeated = if (res.length > 1 && res[res.length - 1] == res[res.length - 2]) {
                maxChar
            } else {
                -1
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func longestDiverseString(_ a: Int, _ b: Int, _ c: Int) -> String {
        var count = [a, b, c]
        var res = [Character]()

        func getMax(_ repeated: Int) -> Int {
            var idx = -1
            var maxCnt = 0
            for i in 0..<3 {
                if i == repeated || count[i] == 0 {
                    continue
                }
                if maxCnt < count[i] {
                    maxCnt = count[i]
                    idx = i
                }
            }
            return idx
        }

        var repeated = -1
        while true {
            let maxChar = getMax(repeated)
            if maxChar == -1 {
                break
            }
            res.append(Character(UnicodeScalar(maxChar + Int(("a" as Character).asciiValue!))!))
            count[maxChar] -= 1

            if res.count > 1 && res[res.count - 1] == res[res.count - 2] {
                repeated = maxChar
            } else {
                repeated = -1
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 2. Greedy (Max-Heap)

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        res = ""
        maxHeap = []
        for count, char in [(-a, "a"), (-b, "b"), (-c, "c")]:
            if count != 0:
                heapq.heappush(maxHeap, (count, char))

        while maxHeap:
            count, char = heapq.heappop(maxHeap)
            if len(res) > 1 and res[-1] == res[-2] == char:
                if not maxHeap:
                    break
                count2, char2 = heapq.heappop(maxHeap)
                res += char2
                count2 += 1
                if count2:
                    heapq.heappush(maxHeap, (count2, char2))
                heapq.heappush(maxHeap, (count, char))
            else:
                res += char
                count += 1
                if count:
                    heapq.heappush(maxHeap, (count, char))

        return res
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        StringBuilder res = new StringBuilder();
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((x, y) -> y[0] - x[0]);

        if (a > 0) maxHeap.offer(new int[]{a, 'a'});
        if (b > 0) maxHeap.offer(new int[]{b, 'b'});
        if (c > 0) maxHeap.offer(new int[]{c, 'c'});

        while (!maxHeap.isEmpty()) {
            int[] first = maxHeap.poll();
            if (res.length() > 1 && res.charAt(res.length() - 1) == first[1] && res.charAt(res.length() - 2) == first[1]) {
                if (maxHeap.isEmpty()) break;
                int[] second = maxHeap.poll();
                res.append((char) second[1]);
                second[0]--;
                if (second[0] > 0) maxHeap.offer(second);
                maxHeap.offer(first);
            } else {
                res.append((char) first[1]);
                first[0]--;
                if (first[0] > 0) maxHeap.offer(first);
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        string res;
        priority_queue<pair<int, char>> maxHeap;
        if (a > 0) maxHeap.push({a, 'a'});
        if (b > 0) maxHeap.push({b, 'b'});
        if (c > 0) maxHeap.push({c, 'c'});

        while (!maxHeap.empty()) {
            auto [count, ch] = maxHeap.top();
            maxHeap.pop();

            if (res.size() > 1 && res[res.size() - 1] == ch && res[res.size() - 2] == ch) {
                if (maxHeap.empty()) break;
                auto [count2, ch2] = maxHeap.top();
                maxHeap.pop();
                res += ch2;
                if (--count2 > 0) maxHeap.push({count2, ch2});
                maxHeap.push({count, ch});
            } else {
                res += ch;
                if (--count > 0) maxHeap.push({count, ch});
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const res = [];
        const maxHeap = new MaxPriorityQueue((x) => x[0]);

        if (a > 0) maxHeap.enqueue([a, 'a']);
        if (b > 0) maxHeap.enqueue([b, 'b']);
        if (c > 0) maxHeap.enqueue([c, 'c']);

        while (!maxHeap.isEmpty()) {
            const [count, char] = maxHeap.dequeue();

            if (
                res.length > 1 &&
                res[res.length - 1] === char &&
                res[res.length - 2] === char
            ) {
                if (maxHeap.isEmpty()) break;
                const [count2, char2] = maxHeap.dequeue();
                res.push(char2);
                if (count2 - 1 > 0) maxHeap.enqueue([count2 - 1, char2]);
                maxHeap.enqueue([count, char]);
            } else {
                res.push(char);
                if (count - 1 > 0) maxHeap.enqueue([count - 1, char]);
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        string res = "";
        PriorityQueue<(int count, char ch), int> maxHeap = new PriorityQueue<(int, char), int>();

        void AddToHeap(int count, char ch) {
            if (count > 0) {
                maxHeap.Enqueue((count, ch), -count);
            }
        }

        AddToHeap(a, 'a');
        AddToHeap(b, 'b');
        AddToHeap(c, 'c');

        while (maxHeap.Count > 0) {
            var (count1, ch1) = maxHeap.Dequeue();
            if (res.Length >= 2 && res[^1] == ch1 && res[^2] == ch1) {
                if (maxHeap.Count == 0) break;
                var (count2, ch2) = maxHeap.Dequeue();
                res += ch2;
                count2--;
                if (count2 > 0) {
                    maxHeap.Enqueue((count2, ch2), -count2);
                }
                maxHeap.Enqueue((count1, ch1), -count1);
            } else {
                res += ch1;
                count1--;
                if (count1 > 0) {
                    maxHeap.Enqueue((count1, ch1), -count1);
                }
            }
        }

        return res;
    }
}
```

```go
import "container/heap"

type MaxHeap [][]int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) {
    *h = append(*h, x.([]int))
}

func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func longestDiverseString(a int, b int, c int) string {
    res := []byte{}
    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)

    if a > 0 {
        heap.Push(maxHeap, []int{a, 'a'})
    }
    if b > 0 {
        heap.Push(maxHeap, []int{b, 'b'})
    }
    if c > 0 {
        heap.Push(maxHeap, []int{c, 'c'})
    }

    for maxHeap.Len() > 0 {
        first := heap.Pop(maxHeap).([]int)
        count, ch := first[0], byte(first[1])

        if len(res) > 1 && res[len(res)-1] == ch && res[len(res)-2] == ch {
            if maxHeap.Len() == 0 {
                break
            }
            second := heap.Pop(maxHeap).([]int)
            count2, ch2 := second[0], byte(second[1])
            res = append(res, ch2)
            count2--
            if count2 > 0 {
                heap.Push(maxHeap, []int{count2, int(ch2)})
            }
            heap.Push(maxHeap, []int{count, int(ch)})
        } else {
            res = append(res, ch)
            count--
            if count > 0 {
                heap.Push(maxHeap, []int{count, int(ch)})
            }
        }
    }

    return string(res)
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun longestDiverseString(a: Int, b: Int, c: Int): String {
        val res = StringBuilder()
        val maxHeap = PriorityQueue<IntArray> { x, y -> y[0] - x[0] }

        if (a > 0) maxHeap.offer(intArrayOf(a, 'a'.code))
        if (b > 0) maxHeap.offer(intArrayOf(b, 'b'.code))
        if (c > 0) maxHeap.offer(intArrayOf(c, 'c'.code))

        while (maxHeap.isNotEmpty()) {
            val first = maxHeap.poll()
            val ch = first[1].toChar()

            if (res.length > 1 && res[res.length - 1] == ch && res[res.length - 2] == ch) {
                if (maxHeap.isEmpty()) break
                val second = maxHeap.poll()
                res.append(second[1].toChar())
                second[0]--
                if (second[0] > 0) maxHeap.offer(second)
                maxHeap.offer(first)
            } else {
                res.append(ch)
                first[0]--
                if (first[0] > 0) maxHeap.offer(first)
            }
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func longestDiverseString(_ a: Int, _ b: Int, _ c: Int) -> String {
        var res = [Character]()
        var heap = [(Int, Character)]()

        func heapifyUp(_ index: Int) {
            var i = index
            while i > 0 {
                let parent = (i - 1) / 2
                if heap[i].0 > heap[parent].0 {
                    heap.swapAt(i, parent)
                    i = parent
                } else {
                    break
                }
            }
        }

        func heapifyDown(_ index: Int) {
            var i = index
            while true {
                let left = 2 * i + 1
                let right = 2 * i + 2
                var largest = i
                if left < heap.count && heap[left].0 > heap[largest].0 {
                    largest = left
                }
                if right < heap.count && heap[right].0 > heap[largest].0 {
                    largest = right
                }
                if largest != i {
                    heap.swapAt(i, largest)
                    i = largest
                } else {
                    break
                }
            }
        }

        func push(_ item: (Int, Character)) {
            heap.append(item)
            heapifyUp(heap.count - 1)
        }

        func pop() -> (Int, Character) {
            let result = heap[0]
            heap[0] = heap[heap.count - 1]
            heap.removeLast()
            if !heap.isEmpty {
                heapifyDown(0)
            }
            return result
        }

        if a > 0 { push((a, "a")) }
        if b > 0 { push((b, "b")) }
        if c > 0 { push((c, "c")) }

        while !heap.isEmpty {
            var (count, ch) = pop()

            if res.count > 1 && res[res.count - 1] == ch && res[res.count - 2] == ch {
                if heap.isEmpty { break }
                var (count2, ch2) = pop()
                res.append(ch2)
                count2 -= 1
                if count2 > 0 { push((count2, ch2)) }
                push((count, ch))
            } else {
                res.append(ch)
                count -= 1
                if count > 0 { push((count, ch)) }
            }
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## 3. Greedy (Recursion)

::tabs-start

```python
class Solution:
    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        def rec(max1, max2, max3, char1, char2, char3):
            if max1 < max2:
                return rec(max2, max1, max3, char2, char1, char3)
            if max2 < max3:
                return rec(max1, max3, max2, char1, char3, char2)
            if max2 == 0:
                return [char1] * min(2, max1)

            use1 = min(2, max1)
            use2 = 1 if max1 - use1 >= max2 else 0
            res = [char1] * use1 + [char2] * use2
            return res + rec(max1 - use1, max2 - use2, max3, char1, char2, char3)

        return ''.join(rec(a, b, c, 'a', 'b', 'c'))
```

```java
public class Solution {
    public String longestDiverseString(int a, int b, int c) {
        return String.join("", rec(a, b, c, 'a', 'b', 'c'));
    }

    private List<String> rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) {
            return rec(max2, max1, max3, char2, char1, char3);
        }
        if (max2 < max3) {
            return rec(max1, max3, max2, char1, char3, char2);
        }
        if (max2 == 0) {
            List<String> result = new ArrayList<>();
            for (int i = 0; i < Math.min(2, max1); i++) {
                result.add(String.valueOf(char1));
            }
            return result;
        }

        int use1 = Math.min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        List<String> res = new ArrayList<>();
        for (int i = 0; i < use1; i++) {
            res.add(String.valueOf(char1));
        }
        for (int i = 0; i < use2; i++) {
            res.add(String.valueOf(char2));
        }

        res.addAll(rec(max1 - use1, max2 - use2, max3, char1, char2, char3));
        return res;
    }
}
```

```cpp
class Solution {
public:
    string longestDiverseString(int a, int b, int c) {
        vector<char> res = rec(a, b, c, 'a', 'b', 'c');
        return string(res.begin(), res.end());
    }

private:
    vector<char> rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) {
            return rec(max2, max1, max3, char2, char1, char3);
        }
        if (max2 < max3) {
            return rec(max1, max3, max2, char1, char3, char2);
        }
        if (max2 == 0) {
            vector<char> result(min(2, max1), char1);
            return result;
        }

        int use1 = min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        vector<char> res(use1, char1);
        res.insert(res.end(), use2, char2);

        vector<char> rest = rec(max1 - use1, max2 - use2, max3, char1, char2, char3);
        res.insert(res.end(), rest.begin(), rest.end());

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @return {string}
     */
    longestDiverseString(a, b, c) {
        const rec = (max1, max2, max3, char1, char2, char3) => {
            if (max1 < max2) {
                return rec(max2, max1, max3, char2, char1, char3);
            }
            if (max2 < max3) {
                return rec(max1, max3, max2, char1, char3, char2);
            }
            if (max2 === 0) {
                return Array(Math.min(2, max1)).fill(char1);
            }

            const use1 = Math.min(2, max1);
            const use2 = max1 - use1 >= max2 ? 1 : 0;

            const res = Array(use1).fill(char1).concat(Array(use2).fill(char2));
            return res.concat(
                rec(max1 - use1, max2 - use2, max3, char1, char2, char3),
            );
        };

        return rec(a, b, c, 'a', 'b', 'c').join('');
    }
}
```

```csharp
public class Solution {
    public string LongestDiverseString(int a, int b, int c) {
        return string.Join("", Rec(a, b, c, 'a', 'b', 'c'));
    }

    private List<char> Rec(int max1, int max2, int max3, char char1, char char2, char char3) {
        if (max1 < max2) return Rec(max2, max1, max3, char2, char1, char3);
        if (max2 < max3) return Rec(max1, max3, max2, char1, char3, char2);
        if (max2 == 0) {
            int use = Math.Min(2, max1);
            var res = new List<char>();
            for (int i = 0; i < use; i++) res.Add(char1);
            return res;
        }

        int use1 = Math.Min(2, max1);
        int use2 = (max1 - use1 >= max2) ? 1 : 0;

        var result = new List<char>();
        for (int i = 0; i < use1; i++) result.Add(char1);
        for (int i = 0; i < use2; i++) result.Add(char2);

        result.AddRange(Rec(max1 - use1, max2 - use2, max3, char1, char2, char3));
        return result;
    }
}
```

```go
func longestDiverseString(a int, b int, c int) string {
    var rec func(max1, max2, max3 int, char1, char2, char3 byte) []byte
    rec = func(max1, max2, max3 int, char1, char2, char3 byte) []byte {
        if max1 < max2 {
            return rec(max2, max1, max3, char2, char1, char3)
        }
        if max2 < max3 {
            return rec(max1, max3, max2, char1, char3, char2)
        }
        if max2 == 0 {
            use := min(2, max1)
            res := make([]byte, use)
            for i := 0; i < use; i++ {
                res[i] = char1
            }
            return res
        }

        use1 := min(2, max1)
        use2 := 0
        if max1-use1 >= max2 {
            use2 = 1
        }

        res := make([]byte, use1+use2)
        for i := 0; i < use1; i++ {
            res[i] = char1
        }
        for i := 0; i < use2; i++ {
            res[use1+i] = char2
        }

        return append(res, rec(max1-use1, max2-use2, max3, char1, char2, char3)...)
    }

    return string(rec(a, b, c, 'a', 'b', 'c'))
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun longestDiverseString(a: Int, b: Int, c: Int): String {
        fun rec(max1: Int, max2: Int, max3: Int, char1: Char, char2: Char, char3: Char): List<Char> {
            if (max1 < max2) {
                return rec(max2, max1, max3, char2, char1, char3)
            }
            if (max2 < max3) {
                return rec(max1, max3, max2, char1, char3, char2)
            }
            if (max2 == 0) {
                val use = minOf(2, max1)
                return List(use) { char1 }
            }

            val use1 = minOf(2, max1)
            val use2 = if (max1 - use1 >= max2) 1 else 0

            val res = mutableListOf<Char>()
            repeat(use1) { res.add(char1) }
            repeat(use2) { res.add(char2) }

            res.addAll(rec(max1 - use1, max2 - use2, max3, char1, char2, char3))
            return res
        }

        return rec(a, b, c, 'a', 'b', 'c').joinToString("")
    }
}
```

```swift
class Solution {
    func longestDiverseString(_ a: Int, _ b: Int, _ c: Int) -> String {
        func rec(_ max1: Int, _ max2: Int, _ max3: Int,
                 _ char1: Character, _ char2: Character, _ char3: Character) -> [Character] {
            if max1 < max2 {
                return rec(max2, max1, max3, char2, char1, char3)
            }
            if max2 < max3 {
                return rec(max1, max3, max2, char1, char3, char2)
            }
            if max2 == 0 {
                return Array(repeating: char1, count: min(2, max1))
            }

            let use1 = min(2, max1)
            let use2 = (max1 - use1 >= max2) ? 1 : 0

            var res = Array(repeating: char1, count: use1) + Array(repeating: char2, count: use2)
            res.append(contentsOf: rec(max1 - use1, max2 - use2, max3, char1, char2, char3))
            return res
        }

        return String(rec(a, b, c, "a", "b", "c"))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(n)$ for recursion stack.
    - $O(n)$ space for the output string.
