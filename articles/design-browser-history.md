## 1. Two Stacks

::tabs-start

```python
class BrowserHistory:

    def __init__(self, homepage: str):
        self.back_history = [homepage]
        self.front_history = []

    def visit(self, url: str) -> None:
        self.back_history.append(url)
        self.front_history = []

    def back(self, steps: int) -> str:
        while steps and len(self.back_history) > 1:
            self.front_history.append(self.back_history.pop())
            steps -= 1
        return self.back_history[-1]

    def forward(self, steps: int) -> str:
        while steps and self.front_history:
            self.back_history.append(self.front_history.pop())
            steps -= 1
        return self.back_history[-1]
```

```java
public class BrowserHistory {
    private Stack<String> backHistory;
    private Stack<String> frontHistory;

    public BrowserHistory(String homepage) {
        backHistory = new Stack<>();
        frontHistory = new Stack<>();
        backHistory.push(homepage);
    }

    public void visit(String url) {
        backHistory.push(url);
        frontHistory = new Stack<>();
    }

    public String back(int steps) {
        while (steps > 0 && backHistory.size() > 1) {
            frontHistory.push(backHistory.pop());
            steps--;
        }
        return backHistory.peek();
    }

    public String forward(int steps) {
        while (steps > 0 && !frontHistory.isEmpty()) {
            backHistory.push(frontHistory.pop());
            steps--;
        }
        return backHistory.peek();
    }
}
```

```cpp
class BrowserHistory {
private:
    stack<string> backHistory, frontHistory;

public:
    BrowserHistory(string homepage) {
        backHistory.push(homepage);
    }

    void visit(string url) {
        backHistory.push(url);
        frontHistory = stack<string>();
    }

    string back(int steps) {
        while (steps-- && backHistory.size() > 1) {
            frontHistory.push(backHistory.top());
            backHistory.pop();
        }
        return backHistory.top();
    }

    string forward(int steps) {
        while (steps-- && !frontHistory.empty()) {
            backHistory.push(frontHistory.top());
            frontHistory.pop();
        }
        return backHistory.top();
    }
};
```

```javascript
class BrowserHistory {
    /**
     * @constructor
     * @param {string} homepage
     */
    constructor(homepage) {
        this.backHistory = [homepage];
        this.frontHistory = [];
    }

    /**
     * @param {string} url
     * @return {void}
     */
    visit(url) {
        this.backHistory.push(url);
        this.frontHistory = [];
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    back(steps) {
        while (steps-- > 0 && this.backHistory.length > 1) {
            this.frontHistory.push(this.backHistory.pop());
        }
        return this.backHistory[this.backHistory.length - 1];
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    forward(steps) {
        while (steps-- > 0 && this.frontHistory.length > 0) {
            this.backHistory.push(this.frontHistory.pop());
        }
        return this.backHistory[this.backHistory.length - 1];
    }
}
```

```csharp
public class BrowserHistory {
    private Stack<string> backHistory;
    private Stack<string> frontHistory;

    public BrowserHistory(string homepage) {
        backHistory = new Stack<string>();
        frontHistory = new Stack<string>();
        backHistory.Push(homepage);
    }

    public void Visit(string url) {
        backHistory.Push(url);
        frontHistory = new Stack<string>();
    }

    public string Back(int steps) {
        while (steps > 0 && backHistory.Count > 1) {
            frontHistory.Push(backHistory.Pop());
            steps--;
        }
        return backHistory.Peek();
    }

    public string Forward(int steps) {
        while (steps > 0 && frontHistory.Count > 0) {
            backHistory.Push(frontHistory.Pop());
            steps--;
        }
        return backHistory.Peek();
    }
}
```

```go
type BrowserHistory struct {
    backHistory  []string
    frontHistory []string
}

func Constructor(homepage string) BrowserHistory {
    return BrowserHistory{
        backHistory:  []string{homepage},
        frontHistory: []string{},
    }
}

func (this *BrowserHistory) Visit(url string) {
    this.backHistory = append(this.backHistory, url)
    this.frontHistory = []string{}
}

func (this *BrowserHistory) Back(steps int) string {
    for steps > 0 && len(this.backHistory) > 1 {
        this.frontHistory = append(this.frontHistory, this.backHistory[len(this.backHistory)-1])
        this.backHistory = this.backHistory[:len(this.backHistory)-1]
        steps--
    }
    return this.backHistory[len(this.backHistory)-1]
}

func (this *BrowserHistory) Forward(steps int) string {
    for steps > 0 && len(this.frontHistory) > 0 {
        this.backHistory = append(this.backHistory, this.frontHistory[len(this.frontHistory)-1])
        this.frontHistory = this.frontHistory[:len(this.frontHistory)-1]
        steps--
    }
    return this.backHistory[len(this.backHistory)-1]
}
```

```kotlin
class BrowserHistory(homepage: String) {
    private val backHistory = ArrayDeque<String>()
    private val frontHistory = ArrayDeque<String>()

    init {
        backHistory.addLast(homepage)
    }

    fun visit(url: String) {
        backHistory.addLast(url)
        frontHistory.clear()
    }

    fun back(steps: Int): String {
        var s = steps
        while (s > 0 && backHistory.size > 1) {
            frontHistory.addLast(backHistory.removeLast())
            s--
        }
        return backHistory.last()
    }

    fun forward(steps: Int): String {
        var s = steps
        while (s > 0 && frontHistory.isNotEmpty()) {
            backHistory.addLast(frontHistory.removeLast())
            s--
        }
        return backHistory.last()
    }
}
```

```swift
class BrowserHistory {
    private var backHistory: [String]
    private var frontHistory: [String]

    init(_ homepage: String) {
        backHistory = [homepage]
        frontHistory = []
    }

    func visit(_ url: String) {
        backHistory.append(url)
        frontHistory = []
    }

    func back(_ steps: Int) -> String {
        var steps = steps
        while steps > 0 && backHistory.count > 1 {
            frontHistory.append(backHistory.removeLast())
            steps -= 1
        }
        return backHistory.last!
    }

    func forward(_ steps: Int) -> String {
        var steps = steps
        while steps > 0 && !frontHistory.isEmpty {
            backHistory.append(frontHistory.removeLast())
            steps -= 1
        }
        return backHistory.last!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $visit()$ function call.
    - $O(min(n, steps))$ time for each $back()$ and $forward()$ function calls.
- Space complexity: $O(m * n)$

> Where $n$ is the number of visited urls, $m$ is the average length of each url, and $steps$ is the number of steps we go forward or back.

---

## 2. Dynamic Array

::tabs-start

```python
class BrowserHistory:

    def __init__(self, homepage: str):
        self.history = [homepage]
        self.cur = 0

    def visit(self, url: str) -> None:
        self.cur += 1
        self.history = self.history[:self.cur]
        self.history.append(url)

    def back(self, steps: int) -> str:
        self.cur = max(0, self.cur - steps)
        return self.history[self.cur]

    def forward(self, steps: int) -> str:
        self.cur = min(len(self.history) - 1, self.cur + steps)
        return self.history[self.cur]
```

```java
public class BrowserHistory {
    private List<String> history;
    private int cur;

    public BrowserHistory(String homepage) {
        history = new ArrayList<>();
        history.add(homepage);
        cur = 0;
    }

    public void visit(String url) {
        cur++;
        history = history.subList(0, cur);
        history.add(url);
    }

    public String back(int steps) {
        cur = Math.max(0, cur - steps);
        return history.get(cur);
    }

    public String forward(int steps) {
        cur = Math.min(history.size() - 1, cur + steps);
        return history.get(cur);
    }
}
```

```cpp
class BrowserHistory {
private:
    vector<string> history;
    int cur;

public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        cur = 0;
    }

    void visit(string url) {
        cur++;
        history.resize(cur);
        history.push_back(url);
    }

    string back(int steps) {
        cur = max(0, cur - steps);
        return history[cur];
    }

    string forward(int steps) {
        cur = min((int)history.size() - 1, cur + steps);
        return history[cur];
    }
};
```

```javascript
class BrowserHistory {
    /**
     * @constructor
     * @param {string} homepage
     */
    constructor(homepage) {
        this.history = [homepage];
        this.cur = 0;
    }

    /**
     * @param {string} url
     * @return {void}
     */
    visit(url) {
        this.cur++;
        this.history = this.history.slice(0, this.cur);
        this.history.push(url);
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    back(steps) {
        this.cur = Math.max(0, this.cur - steps);
        return this.history[this.cur];
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    forward(steps) {
        this.cur = Math.min(this.history.length - 1, this.cur + steps);
        return this.history[this.cur];
    }
}
```

```csharp
public class BrowserHistory {
    private List<string> history;
    private int cur;

    public BrowserHistory(string homepage) {
        history = new List<string> { homepage };
        cur = 0;
    }

    public void Visit(string url) {
        cur++;
        history = history.GetRange(0, cur);
        history.Add(url);
    }

    public string Back(int steps) {
        cur = Math.Max(0, cur - steps);
        return history[cur];
    }

    public string Forward(int steps) {
        cur = Math.Min(history.Count - 1, cur + steps);
        return history[cur];
    }
}
```

```go
type BrowserHistory struct {
    history []string
    cur     int
}

func Constructor(homepage string) BrowserHistory {
    return BrowserHistory{
        history: []string{homepage},
        cur:     0,
    }
}

func (this *BrowserHistory) Visit(url string) {
    this.cur++
    this.history = this.history[:this.cur]
    this.history = append(this.history, url)
}

func (this *BrowserHistory) Back(steps int) string {
    this.cur = max(0, this.cur-steps)
    return this.history[this.cur]
}

func (this *BrowserHistory) Forward(steps int) string {
    this.cur = min(len(this.history)-1, this.cur+steps)
    return this.history[this.cur]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class BrowserHistory(homepage: String) {
    private var history = mutableListOf(homepage)
    private var cur = 0

    fun visit(url: String) {
        cur++
        history = history.subList(0, cur).toMutableList()
        history.add(url)
    }

    fun back(steps: Int): String {
        cur = maxOf(0, cur - steps)
        return history[cur]
    }

    fun forward(steps: Int): String {
        cur = minOf(history.size - 1, cur + steps)
        return history[cur]
    }
}
```

```swift
class BrowserHistory {
    private var history: [String]
    private var cur: Int

    init(_ homepage: String) {
        history = [homepage]
        cur = 0
    }

    func visit(_ url: String) {
        cur += 1
        history = Array(history.prefix(cur))
        history.append(url)
    }

    func back(_ steps: Int) -> String {
        cur = max(0, cur - steps)
        return history[cur]
    }

    func forward(_ steps: Int) -> String {
        cur = min(history.count - 1, cur + steps)
        return history[cur]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(n)$ time for each $visit()$ function call.
    - $O(1)$ time for each $back()$ and $forward()$ function calls.
- Space complexity: $O(m * n)$

> Where $n$ is the number of visited urls and $m$ is the average length of each url.

---

## 3. Dynamic Array (Optimal)

::tabs-start

```python
class BrowserHistory:

    def __init__(self, homepage: str):
        self.history = [homepage]
        self.cur = 0
        self.n = 1

    def visit(self, url: str) -> None:
        self.cur += 1
        if self.cur == len(self.history):
            self.history.append(url)
            self.n += 1
        else:
            self.history[self.cur] = url
            self.n = self.cur + 1

    def back(self, steps: int) -> str:
        self.cur = max(0, self.cur - steps)
        return self.history[self.cur]

    def forward(self, steps: int) -> str:
        self.cur = min(self.n - 1, self.cur + steps)
        return self.history[self.cur]
```

```java
public class BrowserHistory {
    private List<String> history;
    private int cur;
    private int n;

    public BrowserHistory(String homepage) {
        history = new ArrayList<>();
        history.add(homepage);
        cur = 0;
        n = 1;
    }

    public void visit(String url) {
        cur++;
        if (cur == history.size()) {
            history.add(url);
            n++;
        } else {
            history.set(cur, url);
            n = cur + 1;
        }
    }

    public String back(int steps) {
        cur = Math.max(0, cur - steps);
        return history.get(cur);
    }

    public String forward(int steps) {
        cur = Math.min(n - 1, cur + steps);
        return history.get(cur);
    }
}
```

```cpp
class BrowserHistory {
private:
    vector<string> history;
    int cur, n;

public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        cur = 0;
        n = 1;
    }

    void visit(string url) {
        cur++;
        if (cur == history.size()) {
            history.push_back(url);
            n++;
        } else {
            history[cur] = url;
            n = cur + 1;
        }
    }

    string back(int steps) {
        cur = max(0, cur - steps);
        return history[cur];
    }

    string forward(int steps) {
        cur = min(n - 1, cur + steps);
        return history[cur];
    }
};
```

```javascript
class BrowserHistory {
    /**
     * @constructor
     * @param {string} homepage
     */
    constructor(homepage) {
        this.history = [homepage];
        this.cur = 0;
        this.n = 1;
    }

    /**
     * @param {string} url
     * @return {void}
     */
    visit(url) {
        this.cur++;
        if (this.cur === this.history.length) {
            this.history.push(url);
            this.n++;
        } else {
            this.history[this.cur] = url;
            this.n = this.cur + 1;
        }
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    back(steps) {
        this.cur = Math.max(0, this.cur - steps);
        return this.history[this.cur];
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    forward(steps) {
        this.cur = Math.min(this.n - 1, this.cur + steps);
        return this.history[this.cur];
    }
}
```

```csharp
public class BrowserHistory {
    private List<string> history;
    private int cur;
    private int n;

    public BrowserHistory(string homepage) {
        history = new List<string> { homepage };
        cur = 0;
        n = 1;
    }

    public void Visit(string url) {
        cur++;
        if (cur == history.Count) {
            history.Add(url);
            n++;
        } else {
            history[cur] = url;
            n = cur + 1;
        }
    }

    public string Back(int steps) {
        cur = Math.Max(0, cur - steps);
        return history[cur];
    }

    public string Forward(int steps) {
        cur = Math.Min(n - 1, cur + steps);
        return history[cur];
    }
}
```

```go
type BrowserHistory struct {
    history []string
    cur     int
    n       int
}

func Constructor(homepage string) BrowserHistory {
    return BrowserHistory{
        history: []string{homepage},
        cur:     0,
        n:       1,
    }
}

func (this *BrowserHistory) Visit(url string) {
    this.cur++
    if this.cur == len(this.history) {
        this.history = append(this.history, url)
        this.n++
    } else {
        this.history[this.cur] = url
        this.n = this.cur + 1
    }
}

func (this *BrowserHistory) Back(steps int) string {
    this.cur = max(0, this.cur-steps)
    return this.history[this.cur]
}

func (this *BrowserHistory) Forward(steps int) string {
    this.cur = min(this.n-1, this.cur+steps)
    return this.history[this.cur]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class BrowserHistory(homepage: String) {
    private val history = mutableListOf(homepage)
    private var cur = 0
    private var n = 1

    fun visit(url: String) {
        cur++
        if (cur == history.size) {
            history.add(url)
            n++
        } else {
            history[cur] = url
            n = cur + 1
        }
    }

    fun back(steps: Int): String {
        cur = maxOf(0, cur - steps)
        return history[cur]
    }

    fun forward(steps: Int): String {
        cur = minOf(n - 1, cur + steps)
        return history[cur]
    }
}
```

```swift
class BrowserHistory {
    private var history: [String]
    private var cur: Int
    private var n: Int

    init(_ homepage: String) {
        history = [homepage]
        cur = 0
        n = 1
    }

    func visit(_ url: String) {
        cur += 1
        if cur == history.count {
            history.append(url)
            n += 1
        } else {
            history[cur] = url
            n = cur + 1
        }
    }

    func back(_ steps: Int) -> String {
        cur = max(0, cur - steps)
        return history[cur]
    }

    func forward(_ steps: Int) -> String {
        cur = min(n - 1, cur + steps)
        return history[cur]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $visit()$ function call.
    - $O(1)$ time for each $back()$ and $forward()$ function calls.
- Space complexity: $O(m * n)$

> Where $n$ is the number of visited urls and $m$ is the average length of each url.

---

## 4. Doubly Linked List

::tabs-start

```python
class ListNode:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class BrowserHistory:

    def __init__(self, homepage: str):
        self.cur = ListNode(homepage)

    def visit(self, url: str) -> None:
        self.cur.next = ListNode(url, self.cur)
        self.cur = self.cur.next

    def back(self, steps: int) -> str:
        while self.cur.prev and steps > 0:
            self.cur = self.cur.prev
            steps -= 1
        return self.cur.val

    def forward(self, steps: int) -> str:
        while self.cur.next and steps > 0:
            self.cur = self.cur.next
            steps -= 1
        return self.cur.val
```

```java
class ListNode {
    String val;
    ListNode prev, next;

    public ListNode(String val, ListNode prev, ListNode next) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }

    public ListNode(String val) {
        this(val, null, null);
    }
}

public class BrowserHistory {
    private ListNode cur;

    public BrowserHistory(String homepage) {
        cur = new ListNode(homepage);
    }

    public void visit(String url) {
        cur.next = new ListNode(url, cur, null);
        cur = cur.next;
    }

    public String back(int steps) {
        while (cur.prev != null && steps > 0) {
            cur = cur.prev;
            steps--;
        }
        return cur.val;
    }

    public String forward(int steps) {
        while (cur.next != null && steps > 0) {
            cur = cur.next;
            steps--;
        }
        return cur.val;
    }
}
```

```cpp
class BrowserHistory {
    struct ListNode {
    public:
        string val;
        ListNode* prev;
        ListNode* next;

        ListNode(string val, ListNode* prev = nullptr, ListNode* next = nullptr)
            : val(val), prev(prev), next(next) {}
    };

    ListNode* cur;

public:
    BrowserHistory(string homepage) {
        cur = new ListNode(homepage);
    }

    void visit(string url) {
        cur->next = new ListNode(url, cur, nullptr);
        cur = cur->next;
    }

    string back(int steps) {
        while (cur->prev != nullptr && steps > 0) {
            cur = cur->prev;
            steps--;
        }
        return cur->val;
    }

    string forward(int steps) {
        while (cur->next != nullptr && steps > 0) {
            cur = cur->next;
            steps--;
        }
        return cur->val;
    }
};
```

```javascript
class ListNode {
    constructor(val, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class BrowserHistory {
    /**
     * @constructor
     * @param {string} homepage
     */
    constructor(homepage) {
        this.cur = new ListNode(homepage);
    }

    /**
     * @param {string} url
     * @return {void}
     */
    visit(url) {
        this.cur.next = new ListNode(url, this.cur, null);
        this.cur = this.cur.next;
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    back(steps) {
        while (this.cur.prev !== null && steps > 0) {
            this.cur = this.cur.prev;
            steps--;
        }
        return this.cur.val;
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    forward(steps) {
        while (this.cur.next !== null && steps > 0) {
            this.cur = this.cur.next;
            steps--;
        }
        return this.cur.val;
    }
}
```

```csharp
public class ListNode {
    public string val;
    public ListNode prev, next;

    public ListNode(string val, ListNode prev = null, ListNode next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

public class BrowserHistory {
    private ListNode cur;

    public BrowserHistory(string homepage) {
        cur = new ListNode(homepage);
    }

    public void Visit(string url) {
        cur.next = new ListNode(url, cur, null);
        cur = cur.next;
    }

    public string Back(int steps) {
        while (cur.prev != null && steps > 0) {
            cur = cur.prev;
            steps--;
        }
        return cur.val;
    }

    public string Forward(int steps) {
        while (cur.next != null && steps > 0) {
            cur = cur.next;
            steps--;
        }
        return cur.val;
    }
}
```

```go
type ListNode struct {
    val  string
    prev *ListNode
    next *ListNode
}

type BrowserHistory struct {
    cur *ListNode
}

func Constructor(homepage string) BrowserHistory {
    return BrowserHistory{
        cur: &ListNode{val: homepage},
    }
}

func (this *BrowserHistory) Visit(url string) {
    this.cur.next = &ListNode{val: url, prev: this.cur}
    this.cur = this.cur.next
}

func (this *BrowserHistory) Back(steps int) string {
    for this.cur.prev != nil && steps > 0 {
        this.cur = this.cur.prev
        steps--
    }
    return this.cur.val
}

func (this *BrowserHistory) Forward(steps int) string {
    for this.cur.next != nil && steps > 0 {
        this.cur = this.cur.next
        steps--
    }
    return this.cur.val
}
```

```kotlin
class ListNode(
    var `val`: String,
    var prev: ListNode? = null,
    var next: ListNode? = null
)

class BrowserHistory(homepage: String) {
    private var cur: ListNode = ListNode(homepage)

    fun visit(url: String) {
        cur.next = ListNode(url, cur, null)
        cur = cur.next!!
    }

    fun back(steps: Int): String {
        var s = steps
        while (cur.prev != null && s > 0) {
            cur = cur.prev!!
            s--
        }
        return cur.`val`
    }

    fun forward(steps: Int): String {
        var s = steps
        while (cur.next != null && s > 0) {
            cur = cur.next!!
            s--
        }
        return cur.`val`
    }
}
```

```swift
class ListNode {
    var val: String
    var prev: ListNode?
    var next: ListNode?

    init(_ val: String, _ prev: ListNode? = nil, _ next: ListNode? = nil) {
        self.val = val
        self.prev = prev
        self.next = next
    }
}

class BrowserHistory {
    private var cur: ListNode

    init(_ homepage: String) {
        cur = ListNode(homepage)
    }

    func visit(_ url: String) {
        cur.next = ListNode(url, cur, nil)
        cur = cur.next!
    }

    func back(_ steps: Int) -> String {
        var steps = steps
        while cur.prev != nil && steps > 0 {
            cur = cur.prev!
            steps -= 1
        }
        return cur.val
    }

    func forward(_ steps: Int) -> String {
        var steps = steps
        while cur.next != nil && steps > 0 {
            cur = cur.next!
            steps -= 1
        }
        return cur.val
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $visit()$ function call.
    - $O(min(n, steps))$ time for each $back()$ and $forward()$ function calls.
- Space complexity: $O(m * n)$

> Where $n$ is the number of visited urls, $m$ is the average length of each url, and $steps$ is the number of steps we go forward or back.
