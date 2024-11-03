char* multiply(char* num1, char* num2) {
    int len1 = strlen(num1);
    int len2 = strlen(num2);
    int len = len1 + len2;
    int* result = (int*)calloc(len, sizeof(int));

    for (int i = len1 - 1; i >= 0; i--) {
        for (int j = len2 - 1; j >= 0; j--) {
            int product = (num1[i] - '0') * (num2[j] - '0');
            int sum = product + result[i + j + 1];
            result[i + j + 1] = sum % 10;
            result[i + j] += sum / 10;
        }
    }

    char* res = (char*)malloc((len + 1) * sizeof(char));
    int idx = 0;
    for (int i = 0; i < len; i++) {
        if (idx == 0 && result[i] == 0) {
            continue;
        }
        res[idx++] = result[i] + '0';
    }
    res[idx] = '\0';

    if (idx == 0) {
        return "0";
    }

    free(result);
    return res;
}
