module.exports = function check(str, bracketsConfig) {
  const openedBrackets = [];
  const closedBracketToOpened = {};

  for (const [open, close] of bracketsConfig) {
    closedBracketToOpened[close] = open;
    openedBrackets.push(open);
  }

  const stack = [];

  for (const char of str) {
    if (openedBrackets.includes(char)) {
      // Check if the opening bracket is the same as the closing bracket
      // For cases with |, 1, 2  etc.
      // char === closedBracketToOpened[char]
      const lastInStack = stack[stack.length - 1];
      if (char === lastInStack && char === closedBracketToOpened[char]) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else {
      const lastBracket = stack.pop();
      if (lastBracket !== closedBracketToOpened[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}