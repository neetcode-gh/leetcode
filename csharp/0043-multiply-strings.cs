public class Solution
{
    //T: O(m*n)  | S: O(m+n)
    public string Multiply(string num1, string num2)
    {
        if (string.Equals(num1, "0") || string.Equals(num2, "0"))
            return "0";
        var m = num1.Length;
        var n = num2.Length;

        var result = new int[m + n];

        num1 = Reverse(num1);
        num2 = Reverse(num2);

        for (var i1 = 0; i1 < num1.Length; i1++)
        {
            for (var i2 = 0; i2 < num2.Length; i2++)
            {

                var digit = (num1[i1] - '0') * (num2[i2] - '0');
                result[i1 + i2] += digit;
                result[i1 + i2 + 1] += (result[i1 + i2]) / 10;
                result[i1 + i2] = (result[i1 + i2]) % 10;
            }
        }

        Array.Reverse(result);
        var i = 0;
        while (i < result.Length && result[i] == 0)
        {
            i++;
        }

        var str = new StringBuilder();
        for (; i < result.Length; i++)
        {
            //Console.WriteLine(result[i]);
            str.Append(result[i]);
        }
        return str.ToString();

    }

    private string Reverse(string str)
    {
        var array = str.ToCharArray();
        Array.Reverse(array);
        return new string(array);
    }
}