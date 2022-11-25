int evalRPN(char ** tokens, int tokensSize){
    long int stk[tokensSize];
    
    int stkIndex = -1;
        
    for(int i = 0; i < tokensSize; i++)
    {
        if(strcmp(tokens[i], "+") == 0) 
        {
            int first = stk[stkIndex];
            stkIndex--;
            int second = stk[stkIndex];
            
            stk[stkIndex] = first + second;
        }
        else if(strcmp(tokens[i], "-") == 0) 
        {
            int first = stk[stkIndex];
            stkIndex--;
            int second = stk[stkIndex];
            
            stk[stkIndex] = second - first;
        }
        else if(strcmp(tokens[i], "*") == 0) 
        {
            long first = stk[stkIndex];
            stkIndex--;
            int second = stk[stkIndex];
            
            stk[stkIndex] = first * second;

        }
        else if(strcmp(tokens[i], "/") == 0) 
        {   
            int first = stk[stkIndex];
            stkIndex--;
            int second = stk[stkIndex];
            
            stk[stkIndex] = second / first;
        }
        else
        {
            stkIndex++;
            stk[stkIndex] = atoi(tokens[i]);
        }
            
    }
 
    
    return stk[stkIndex];    
}
