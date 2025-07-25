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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $visit()$ function call.
    - $O(min(n, steps))$ time for each $back()$ and $forward()$ function calls.
- Space complexity: $O(m * n)$

> Where $n$ is the number of visited urls, $m$ is the average length of each url, and $steps$ is the number of steps we go forward or back.
