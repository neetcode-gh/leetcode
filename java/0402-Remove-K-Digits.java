class Solution {
        public String removeKdigits(String num, int k) {

        if(k==num.length() || k>num.length()){
            return "0";
        }

        Stack<Character> st=new Stack<>();
        
        for(int i=0;i<num.length();i++){
            char ch=num.charAt(i);
            while(!st.isEmpty() && k>0 && st.peek()>ch){
                st.pop();
                k--;
            }
            st.push(ch);
        }
        
        while(!st.isEmpty() && k>0){
            st.pop();
            k--;
        }
        
        StringBuilder sb = new StringBuilder();
        while(!st.isEmpty())
            sb.append(st.pop());

        sb.reverse();

        while(sb.length()>1 && sb.charAt(0)=='0')
            sb.deleteCharAt(0);

        return sb.toString();
        
        
        
    }
}
