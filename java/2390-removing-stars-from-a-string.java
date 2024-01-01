class Solution {
    public String removeStars(String s) {

        // Create a new stack to keep track of characters encountered so far
        Stack<Character> stk = new Stack<>();
        
        // Iterate over each character in the input string
        for (char c : s.toCharArray()) {
            // If the current character is a star,
            // remove the topmost character from the stack
            if (c == '*') {
                stk.pop();
            }
            // If the current character is not a star, add it to the stack
            else {
                stk.push(c);
            }
        }
        
        // StringBuilder to store the characters in the stack
        StringBuilder sb = new StringBuilder();
        for (char c : stk) {
            sb.append(c);
        }
        
        // Convert the StringBuilder to a string and return it as the output
        return sb.toString();
    }
}
