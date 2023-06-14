class Solution {
    public String removeStars(String s) {
        Stack<Character> stack = new Stack<>();
        StringBuilder str = new StringBuilder();

        for(int i=0; i < s.length(); i++){
            if(s.charAt(i) != '*'){
                stack.push(s.charAt(i));
            } 
            else{ // i.e. s.charAt(i) is *
                char p = stack.pop();
            }
        }
        
        if(stack.isEmpty()) return "";
        while(!stack.isEmpty()){
            str.append(stack.pop());
        }

        return str.reverse().toString();
    }
}
