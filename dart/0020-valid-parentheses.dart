class Solution {
  bool isValid(String s) {
      var res = [];
      for (int i=0; i<s.length; i++) {
          if (s[i] != ']' && s[i] != ')' && s[i] != '}') {
              res.add(s[i]);
              continue;
          } else {
              if (res.isEmpty) {
                  return false;
              }
          }

          if (s[i] == ']') {
              if (res.last == '[') {
                  res.removeLast();
              } else {
                  return false;
              }
          } else if (s[i] == ')') {
              if (res.last == '(') {
                  res.removeLast();
              } else {
                  return false;
              }
          } else if (s[i] == '}') {
              if (res.last == '{') {
                  res.removeLast();
              } else {
                  return false;
              }
          }
      }
      return res.length == 0;
  }
}