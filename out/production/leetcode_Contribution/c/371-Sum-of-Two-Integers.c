int getSum(int a, int b){
   while (b != 0) {
       int temp = a ^ b;
       b = (unsigned)(a & b) << 1;
       a = temp;
   }
    return a;
}