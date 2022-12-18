class Solution1 {

    public boolean isValid(String s) {
        if (s.length() % 2 != 0) return false;
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            if (
                stack.isEmpty() &&
                (s.charAt(i) == ')' || s.charAt(i) == '}' || s.charAt(i) == ']')
            ) return false; else {
                if (!stack.isEmpty()) {
                    if (
                        stack.peek() == '(' && s.charAt(i) == ')'
                    ) stack.pop(); else if (
                        stack.peek() == '{' && s.charAt(i) == '}'
                    ) stack.pop(); else if (
                        stack.peek() == '[' && s.charAt(i) == ']'
                    ) stack.pop(); else stack.add(s.charAt(i));
                } else stack.add(s.charAt(i));
            }
        }
        return stack.isEmpty();
    }
}

// ASCII 
// '(' = 40  AND ')' = 41        DIFF= 1 <=2
// '[' = 91  AND ']' = 93        DIFF= 2 <=2
// '{' = 123  AND '}' = 125      DIFF= 2 <=2
// Absolute difference for non matching brackets will be more than 2
// We are only taking one open and one close bracket in diff, there would not be both open or close
// eg.   ( and ]  -> Abs(diff) = 53 > 2
//       [ and }  -> Abs(diff) = 34 > 2

class Solution2 {
    public boolean isValid(String str) {
        Stack<Character> st = new Stack<>();
        
        for(int i=0; i<str.length(); i++){
            char c = str.charAt(i);
            
            if(c=='(' || c=='{' || c=='[' ){
                st.push(c);   // only opening brackets will be pushed
            }else{
                // c -> closing bracket
                // st.peek() -> opening bracket
                if(!st.empty() && Math.abs(c-st.peek())<=2) 
                    st.pop();
                else
                    return false;
            }
         }
           
        
        return st.empty();
    }       
}
