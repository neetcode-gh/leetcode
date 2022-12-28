class Solution {
    func isValid(_ s: String) -> Bool {
        let parenMap:[Character:Character] = ["(":")", "[":"]", "{":"}"]
        var stack = Stack<Character>()
        for c in s {
            if parenMap.keys.contains(c) {
                stack.push(c)
            } else if stack.isEmpty || c != parenMap[stack.pop()!] {
                return false
            }
        }
        return stack.isEmpty
    }
}

class Node<T> {
    var data: T
    var next: Node<T>?
    init(_ value: T) {
        self.data = value
    }
}

class Stack<T> {

    var head: Node<T>?

    var isEmpty: Bool {
        head == nil
    }

    func peak() -> Node<T>? {
        head
    }

    func push(_ data: T) {
        var node = Node<T>(data)
        node.next = head
        head = node
    }

    func pop() -> T? {
        var data = head?.data
        head = head?.next
        return data
    }
}
