class Solution {
    func evalRPN(_ tokens: [String]) -> Int {
        guard tokens.count > 0 else { return 0 }
        var stack: Stack<Int> = Stack()
        for c in tokens {
            if c == "+" {
                stack.push((stack.pop() ?? 0) + (stack.pop() ?? 0) )
            } else if c == "-" {
                var a = stack.pop() ?? 0
                var b = stack.pop() ?? 0
                stack.push(b - a)
            } else if c == "*" {
                stack.push((stack.pop() ?? 0) * (stack.pop() ?? 0) )
            } else if c == "/" {
                var a = stack.pop() ?? 0
                var b = stack.pop() ?? 0
                stack.push(b / a)
            } else {
                stack.push(Int(c) ?? 0)
            }
        }
        return stack.pop() ?? 0
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
