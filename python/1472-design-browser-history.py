# Linked List Implementation
class ListNode:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class BrowserHistory:

    def __init__(self, homepage: str):
        self.cur = ListNode(homepage)

    # O(1)
    def visit(self, url: str) -> None:
        self.cur.next = ListNode(url, self.cur)
        self.cur = self.cur.next

    # O(n)
    def back(self, steps: int) -> str:
        while self.cur.prev and steps > 0:
            self.cur = self.cur.prev
            steps -= 1
        return self.cur.val

    # O(n)
    def forward(self, steps: int) -> str:
        while self.cur.next and steps > 0:
            self.cur = self.cur.next
            steps -= 1
        return self.cur.val


# Array Implementation
class BrowserHistory:    
    def __init__(self, homepage: str):
        self.i = 0
        self.len = 1
        self.history = [homepage]

    # O(1)
    def visit(self, url: str) -> None:
        if len(self.history) < self.i + 2:
            self.history.append(url)
        else:
            self.history[self.i + 1] = url
        self.i += 1
        self.len = self.i + 1

    # O(1)
    def back(self, steps: int) -> str:
        self.i = max(self.i - steps, 0)
        return self.history[self.i]

    # O(1)
    def forward(self, steps: int) -> str:
        self.i = min(self.i + steps, self.len - 1)
        return self.history[self.i]
