int value(char c){

    switch(c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}

int romanToInt(char * s){
    int len = 0;
    int sum = 0;
    int valueCurrent, valueNext;

    len = strlen(s);

    for(int i=0; i<len; i++) {
        
        valueCurrent = value(s[i]);

        if((i+1) < len) {
            valueNext = value(s[i+1]);
        }
        else { 
            valueNext = 0;
        }

        if(valueNext > valueCurrent) {
            sum = sum - valueCurrent;
        }
        else {
            sum = sum + valueCurrent;
        }
    }
    
    return sum;
}