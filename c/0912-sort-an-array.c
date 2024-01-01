void merge(int *array,int l,int m, int r){

    int n1 = m-l+1;
    int n2 = r-m;

    int * left = (int *)malloc(sizeof(int)*n1);
    int * right=(int *)malloc(sizeof(int)*n2);

    for(int i=0;i<n1;i++){
        left[i]=array[l+i];
    }

    for(int j=0;j<n2;j++){
        right[j]=array[m+j+1];
    }

    int i=0;
    int j=0;
    int k=l;

    while(i<n1 && j<n2){
        if(left[i]<=right[j]){
            array[k]=left[i];
            i++;
        }else{

            array[k]=right[j];
            j++;
        }
        k++;
    }

    while(i<n1){
        array[k]=left[i];
        i++;
        k++;
    }

    while(j<n2){
        array[k]=right[j];
        j++;
        k++;
    }

}

void mergesort(int * array, int l,int r){

    if(l<r){
        int m = (l+r)/2;

        mergesort(array,l,m);
        mergesort(array,m+1,r);

        merge(array,l,m,r);
    }

}

int* sortArray(int* nums, int numsSize, int* returnSize) {

    int *array = (int *) malloc(sizeof(int)*numsSize);
    for(int i=0;i<numsSize;i++){

        array[i]=nums[i];
    }

    mergesort(array,0,numsSize-1);

    *returnSize=numsSize;

    return array;
    
}
