using System;
namespace AlgoPractice
{
	public class MinStack
	{
		private Stack<int> _stack;
		private Stack<int> _minStack;

		public MinStack()
		{
			_stack = new Stack<int>();
			_minStack = new Stack<int>();
		}

		void Push(int val)
        {
			_stack.Push(val);
			if(val < _minStack.Peek())
            {
				_minStack.Push(val);
            }
        }

		public void Pop()
        {
			if (_stack.Count() == 0) return;
			var val = _stack.Pop();
			if(val == _minStack.Peek())
            {
				_minStack.Pop();
            }
        }

		public int Top()
        {
			return _stack.Count() == 0 ? -1 : _stack.Peek();
        }

		public int GetMin()
        {
			return _minStack.Count() == 0 ? -1 : _minStack.Peek();
        }
	}
}

