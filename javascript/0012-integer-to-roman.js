/**
 * https://leetcode.com/problems/integer-to-roman/
 * @param {number} num
 * @return {string}
 */

var intToRoman = function(num) {
    let ans = "";

    while(num !== 0){

        //M == 1000
        if(num >= 1000){
            num -= 1000;
            ans += "M";
        }
        //CM == 900
        else if(num >= 900){
            num -= 900;
            ans += "CM";
        }
        //D == 500
        else if(num >= 500){
            num -= 500;
            ans += "D";
        }
        //CD == 400
        else if(num >= 400){
            num -= 400;
            ans += "CD"
        }
        //C == 100
        else if(num >= 100){
            num -= 100;
            ans += "C";
        }
        //XC == 90
        else if(num >= 90){
            num -= 90;
            ans += "XC";
        }
        //L == 50;
        else if(num >= 50){
            num -= 50;
            ans += "L";
        }
        //XL == 40
        else if(num >= 40){
            num -= 40;
            ans += "XL";
        }
        //X == 10
        else if(num >= 10){
            num -= 10;
            ans += "X";
        }
        //IX == 9
        else if(num >= 9){
            num -= 9;
            ans += "IX";
        }
        //V == 5
        else if(num >= 5){
            num -= 5;
            ans += "V";
        }
        //IV == 4
        else if(num >= 4){
            num -= 4;
            ans += "IV";
        }
        //II == 2
        else if(num >= 2){
            num -= 2;
            ans += "II";
        }
        //I == 1
        else{
            num -= 1;
            ans += "I";
        }
    }
    return ans;
};
