class Solution {
  int evalRPN(List<String> tokens) {
    var stack = [];
    for (var i = 0; i < tokens.length; i++) {
    var char = tokens[i];
    if (char == '+') {
      var a = stack.removeLast();
      var b = stack.removeLast();
      stack.add(a + b);
    } else if (char == '-') {
      var a = stack.removeLast();
      var b = stack.removeLast();
      stack.add(b - a);
    } else if (char == '*') {
      var a = stack.removeLast();
      var b = stack.removeLast();
      stack.add(a * b);
    } else if (char == '/') {
      var a = stack.removeLast();
      var b = stack.removeLast();
      stack.add(b ~/ a);
    } else {
      stack.add(int.parse(char));
    }
  }
  return stack.first;
  }
}
