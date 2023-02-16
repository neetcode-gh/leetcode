class MinStack {
  final List<int> stack = [];
  final List<int> minStack = [];

  MinStack();

  void push(int val) {
    stack.add(val);
    if (minStack.isEmpty) {
      minStack.add(val);
    } else {
      minStack.add(min(val, minStack.last));
    }
  }

  void pop() {
    stack.removeLast();
    minStack.removeLast();
  }

  int top() {
    return stack.last;
  }

  int getMin() {
    return minStack.last;
  }
}
