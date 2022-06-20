package leetcode;

import java.util.Stack;

public class SimplifyPath71 {
    public static void main(String[] args) {
        String path = "/home//foo/";
        System.out.println(simplify(path));
    }
    public static String simplify(String path){
        String[] p = path.split("/");
        StringBuilder res = new StringBuilder();
        Stack<String> stack = new Stack<>();

        for(int i=0;i<p.length;i++){
            if(!stack.isEmpty() && p[i].equals("..")){
                stack.pop();
            }
            else if(!p[i].equals(".") && !p[i].equals("..") && !p[i].equals("") ){
                stack.push(p[i]);
            }
        }

        if(stack.isEmpty()) return "/";
        while (!stack.isEmpty()){
            res.insert(0,stack.pop()).insert(0,"/");
        }

return  res.toString();
    }

}
