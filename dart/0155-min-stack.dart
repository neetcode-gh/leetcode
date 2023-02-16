//  Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

void main() {
  var stack = [];
  var minstack = [];

  void push(int value) {
    stack.add(value);
    final minListData = [value, minstack.isEmpty ? value : minstack.last];
    final min = minListData
        .reduce((value, element) => value < element ? value : element);
    minstack.add(min);
  }

  void pop() {
    stack.removeLast();
    minstack.removeLast();
  }

  int getTop() {
    return stack.last;
  }

  int getMin() {
    return minstack.last;
  }

  push(-1);
  push(0);
  push(-3);
  print('Top : ${getTop()}');
  print('Min : ${getMin()}');
  pop();
  print('Top After Pop: ${getTop()}');
  print('Min After Pop: ${getMin()}');
}
