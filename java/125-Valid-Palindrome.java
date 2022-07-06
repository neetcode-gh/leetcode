// Method 1
public boolean isPalindrome(String s) {
        StringBuilder content = new StringBuilder();
        for(int i = 0; i < s.length(); i++) 
            if(Character.isLetterOrDigit(s.charAt(i)))
                content.append(s.charAt(i));
        content = new StringBuilder(content.toString().toLowerCase());
        String value = content.toString();
        return value.equals(content.reverse().toString());
}


//         Method 2
//         Using Array
//         38% more fast than the above code
class Solution {
    public boolean isPalindrome(String s) {
        boolean flag = true;
        s = s.toLowerCase();
        char[] ch = new char[s.length()];
        int index = 0;
        for(int i = 0; i < s.length(); i++){
            if((s.charAt(i)>= 'a' && s.charAt(i) < 'z')||(s.charAt(i)>= '0' && s.charAt(i) <= '9')) {
                ch[index] =  s.charAt(i);
                index++;
            }
        }
        for(int i = 0; i<index; i++){
            if(ch[i] != ch[index-i-1]){
                flag = false;
            }
                
        }
        return flag;
    }
}
