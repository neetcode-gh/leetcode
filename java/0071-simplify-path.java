class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        StringBuilder curr = new StringBuilder();

        String newPath = path + "/";

        for(int i=0;i<newPath.length();i++) {
            char ch = newPath.charAt(i);

            if(ch == '/') {
                if(curr.toString().equals("..")) {
                    if(!stack.isEmpty()) {
                        stack.pop();
                    } 
                } else if(!curr.isEmpty() && !curr.toString().equals(".")) {
                    stack.push(curr.toString());
                }

                curr = new StringBuilder();
            } else {
                curr.append(ch);
            }
        }

        curr = new StringBuilder();

        while(!stack.isEmpty()) {
            curr.insert(0, "/" + stack.pop());
        }

        if(curr.length() == 0) {
            curr.append('/');
        }

        return curr.toString();
    }
}
