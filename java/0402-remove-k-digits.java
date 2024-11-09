class Solution {
    public String removeKdigits(String num, int k) {
        if(k >= num.length())
            return "0";

        Stack<Character> stack = new Stack<>();
        for(char d: num.toCharArray()){
            while(!stack.empty() && d < stack.peek() && k > 0){
                stack.pop();
                k--;
            }
            stack.push(d);
        }
        while(!stack.empty() && k > 0){
            stack.pop();
            k--;
        }

        StringBuilder res = new StringBuilder();
        while(!stack.empty()){
            res.insert(0, stack.pop());
        }
        
        for(int i = 0; i < res.length(); i++){
            if(res.charAt(i) != '0'){
                return res.toString().substring(i, res.length());
            }
        }
        return "0";
    }
} 
