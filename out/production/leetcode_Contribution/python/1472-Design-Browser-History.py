"""
1472. Design Browser History
"""


class DLLNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None


class BrowserHistory:
    def __init__(self, homepage: str):
        # initialize head and tail to dummy node
        self.head = DLLNode(-1)
        self.tail = DLLNode(-1)

        self.head.next = self.tail
        self.tail.prev = self.head

        # insert homepage at head node
        self.insertAtHead(homepage)
        # update cur pointer to homepage
        self.cur = self.head.next

    def insertAtHead(self, homepage: str):
        temp = DLLNode(homepage)
        temp.next = self.head.next
        temp.prev = self.head

        self.tail.prev = temp
        self.head.next = temp

    def visit(self, url: str) -> None:
        temp = DLLNode(url)
        # clears forward history
        temp.next = self.tail
        temp.prev = self.cur
        self.tail.prev = temp
        self.cur.next = temp
        # update cur pointer to URL
        self.cur = self.cur.next

    def back(self, steps: int) -> str:
        i = 0
        while self.cur.prev != self.head and i < steps:
            self.cur = self.cur.prev
            i += 1
        return self.cur.val

    def forward(self, steps: int) -> str:
        i = 0
        while self.cur.next != self.tail and i < steps:
            self.cur = self.cur.next
            i += 1
        return self.cur.val
