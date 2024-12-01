class Node:
    def __init__(self, val: int):
        self.val = val
        self.next = None


class MyCircularQueue:

    def __init__(self, k: int):
        self.head = self.tail = None
        self.capacity = k
        self.size = 0


    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False

        node = Node(value)
        if self.size == 0:
            self.head = self.tail = node
        else:
            self.tail.next = self.tail = node

        self.size += 1

        return True


    def deQueue(self) -> bool:
        if self.isEmpty():
            return False

        self.head = self.head.next
        self.size -= 1

        return True


    def Front(self) -> int:
        return -1 if self.isEmpty() else self.head.val


    def Rear(self) -> int:
        return -1 if self.isEmpty() else self.tail.val


    def isEmpty(self) -> bool:
        return self.size == 0


    def isFull(self) -> bool:
        return self.capacity == self.size

