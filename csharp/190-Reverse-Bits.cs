public class Solution {
    public uint reverseBits(uint n) {
        var binary = Convert.ToString(n, 2);
        binary = binary.PadLeft(32, '0');
        var binaryArray = binary.ToCharArray();
        Array.Reverse(binaryArray);
        return (uint)Convert.ToInt32(new string(binaryArray), 2);
    }
}