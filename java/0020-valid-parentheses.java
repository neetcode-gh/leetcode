class Solution {
    public boolean isValid(String s) {
        if(s.length() % 2 != 0) return false;

        Stack<Character> stack = new Stack<>();
        Map<Character, Character> bracketLookup = new HashMap<>();
        bracketLookup.put(')', '(');
        bracketLookup.put('}', '{');
        bracketLookup.put(']', '[');

        for(int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);

            if(bracketLookup.containsKey(ch)) { // we have found a closing bracket
                if(stack.empty()) return false;
                else {
                    if(stack.peek().equals(bracketLookup.get(ch))) stack.pop();
                    else return false;
                }
            } else stack.push(ch);
        }

        return stack.empty();
    }
}
