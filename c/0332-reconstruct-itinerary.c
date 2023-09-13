int cmp(const void *a, const void *b) {
    const char **s1 = *(const char ***)a, **s2 = *(const char ***)b;
    int c = strcmp(s1[0], s2[0]);
    if (c) return c;
    return strcmp(s1[1], s2[1]);
}

int dfs(int *v, char ***tickets, int n, char **p, int last, int d) {
    int i;
    
    if (d == n) {
        p[n] = tickets[last][1];
        return 1;
    }
    
    for (i = 0; i < n; i++) {
        if (!v[i] && !strcmp(tickets[last][1], tickets[i][0])) {
            v[i] = 1;
            p[d] = tickets[i][0];
            if (dfs(v, tickets, n, p, i, d + 1)) return 1;
            v[i] = 0;
        }
    }
    
    return 0;
}

char** findItinerary(char*** tickets, int ticketsRowSize, int ticketsColSize, int* returnSize) {
    int *v, i, done;
    char **p;
    
    qsort(tickets, ticketsRowSize, sizeof(char **), cmp);
    
    p = (char **)malloc((ticketsRowSize + 1) * sizeof(char *));
    v = (int *)calloc(ticketsRowSize, sizeof(int));
    
    done = 0;
    for (i = 0; !done && i < ticketsRowSize; i++) {
        if (!strcmp(tickets[i][0], "JFK")) {
            v[i] = 1;
            p[0] = tickets[i][0];
            done = dfs(v, tickets, ticketsRowSize, p, i, 1);
            v[i] = 0;
        }
    }
    
    *returnSize = ticketsRowSize + 1;
    free(v);
    
    return p;
}
