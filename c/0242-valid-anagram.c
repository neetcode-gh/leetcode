<<<<<<< HEAD
bool isAnagram(char* s, char* t) {
    int hash[26] = {0};
    int i = 0;

    while (s[i]) hash[s[i++] - 'a']++;
    i = 0;
    while (t[i]) hash[t[i++] - 'a']--;

    for (i = 0; i < 26; i++)
        if (hash[i] != 0) return false;
    return true;
=======
bool isAnagram(char* s, char* t) {
    int hash[26] = {0};
    int i = 0;

    while (s[i]) hash[s[i++] - 'a']++;
    i = 0;
    while (t[i]) hash[t[i++] - 'a']--;

    for (i = 0; i < 26; i++)
        if (hash[i] != 0) return false;
    return true;
>>>>>>> ee7a3bcd934aa34bbe7308028fc96d087d88b922
}