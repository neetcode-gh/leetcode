public boolean isPalindrome(String s) {
        StringBuilder content = new StringBuilder();
        for(int i = 0; i < s.length(); i++) 
            if(Character.isLetterOrDigit(s.charAt(i)))
                content.append(s.charAt(i));
        content = new StringBuilder(content.toString().toLowerCase());
        String value = content.toString();
        return value.equals(content.reverse().toString());
    }
