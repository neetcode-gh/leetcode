public class Solution 
{
    public uint reverseBits(uint n) 
    {
		uint result = 0;
		for (int i = 0; i < 32; i++)
		{
			uint temp = (n & 1);
			result = (result << 1) + temp;
			n >>= 1;
		}
        return result;
    } 
}
