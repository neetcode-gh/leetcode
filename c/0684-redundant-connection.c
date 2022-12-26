/*
Return an edge that can be removed so that the resulting graph is a tree of n nodes.
Time: O(n)
Space: O(n)
*/
int max(int a, int b) {
    return a>b?a:b;
}

int find(int* parent, int k) {
    if (parent[k]==k)
        return k;
    return find(parent, parent[k]);
}



int* findRedundantConnection(int** edges, int edgesSize, int* edgesColSize, int* returnSize){
    int* ans = malloc(sizeof(int)*2);
    int* parent = malloc(sizeof(int)*(edgesSize+1));
    for (int i=0; i<=edgesSize; i++)
        parent[i] = i;
    for (int i=0; i<edgesSize; i++) {
        int f1 = find(parent, edges[i][0]);
        int f2 = find(parent, edges[i][1]);
        if (f1==f2) {
            ans[0] = edges[i][0];
            ans[1] = edges[i][1];
        } else { // Union
            parent[f1] = f2;
        }
    }
    *returnSize = 2;
    return ans;
}
