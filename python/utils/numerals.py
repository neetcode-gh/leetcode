

class NumManipulator:

    @staticmethod
    def sum_square_digits(n):
        output = 0

        # print(n, output)
        while n:
            output += (n % 10) ** 2
            n = n // 10
            # print(n, output)
        return output

    @staticmethod
    def reverse(num):
        reversed_num = 0

        while num != 0:
            digit = num % 10
            reversed_num = reversed_num * 10 + digit
            num //= 10

        return reversed_num

    @staticmethod
    def reverse_bits(n):
        result = 0
        for i in range(32):
            result <<= 1
            result |= n & 1
            n >>= 1
        return result


if __name__ == '__main__':
    given_num = 103
    rev_num = NumManipulator.reverse(given_num)
    bits_rev_num = NumManipulator.reverse_bits(given_num)
