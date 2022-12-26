class Solution {

    public String multiply(String num1, String num2) {
        if ("0".equals(num1) || "0".equals(num2)) {
            return "0";
        }

        int[] res = new int[num1.length() + num2.length()];

        num1 = reverseString(num1);
        num2 = reverseString(num2);

        for (int i = 0; i < num1.length(); i++) {
            for (int j = 0; j < num2.length(); j++) {
                int digit =
                    Integer.valueOf(String.valueOf(num1.charAt(i))) *
                    Integer.valueOf(String.valueOf(num2.charAt(j)));
                res[i + j] += digit;
                res[i + j + 1] += res[i + j] / 10;
                res[i + j] = res[i + j] % 10;
            }
        }

        reverseArrayInPlace(res);

        // Get the proper starting point to avoid leading zeros
        int startIndex = 0;
        while (startIndex < res.length) {
            if (res[startIndex] != 0) {
                break;
            }
            startIndex++;
        }

        StringBuilder buildResponse = new StringBuilder();
        for (int i = startIndex; i < res.length; i++) {
            buildResponse.append(res[i]);
        }

        return buildResponse.toString();
    }

    private String reverseString(String str) {
        StringBuilder reversedStr = new StringBuilder(str);
        reversedStr.reverse();
        return reversedStr.toString();
    }

    private void reverseArrayInPlace(int[] arr) {
        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - i - 1];
            arr[arr.length - i - 1] = temp;
        }
    }
}
