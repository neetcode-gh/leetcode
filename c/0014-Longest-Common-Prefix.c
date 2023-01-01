char * longestCommonPrefix(char ** strs, int strsSize){
    int commonPrefixCount = 0;
    int firstStrSize = strlen(strs[0]);

    for(int i = 0; i < firstStrSize; i++)
    {
        for(int s = 1; s < strsSize; s++)
        {
            if(i == strlen(strs[s]) || strs[0][i] != strs[s][i])
            {
                // Add null terminator after the last common prefix char
                strs[0][commonPrefixCount] = '\0';
                return strs[0];
            }
        }

        commonPrefixCount++;
    }

    return strs[0];
}
