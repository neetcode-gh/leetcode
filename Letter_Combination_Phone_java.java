class Solution {
    
    static Map<Character,String> map = new HashMap<>();
    
    static {
        map.put('2', "abc");
        map.put('3', "def");
        map.put('4', "ghi");
        map.put('5', "jkl");
        map.put('6', "mno");
        map.put('7', "pqrs");
        map.put('8', "tuv");
        map.put('9', "wxyz");
    }
    
    public List<String> letterCombinations(String digits) {
        
        List<String> result = new ArrayList<>();
        if(!digits.equals(""))func(0,digits,"",result);
        return result;
        
    }
    
    private void func(int index,String digits,String prefix,List<String> result){
        
      
        //base case
        if(index==digits.length()){
            result.add(prefix);
            return ;
        }
        
        // recursive case
        for(char c: map.get(digits.charAt(index)).toCharArray()){
           func(index+1,digits,prefix+c,result); 
        }
        
    }

}
