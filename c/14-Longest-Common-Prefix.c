char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize <= 0 || strs == NULL || strs[0] == NULL)
        return "";
    int prefix = 0;
    if (strsSize == 1)
        prefix++;
    int lenght = strlen(strs[0]);
    for (int i = 0; i < strsSize - 1; i++) {
        char *str = strs[i];
        prefix = 0;
        for (int j = 0; j != lenght; j++) {
            if (str[j] == strs[i + 1][j])
                prefix++;
            else {
                lenght = prefix;
                break;
            }
        }
        if (prefix == 0)
            break;
    }
    if (prefix <= 0)
        return "";
    char *result = malloc(sizeof(char) * (prefix + 1));
    if (result == NULL)
        return (NULL);
    for (int i = 0; i < prefix; i++)
        result[i] = strs[0][i];
    result[prefix] = '\0';
    return (result);
}
