import { render, screen } from '@testing-library/react';
import App from './App';
import { onlyLettersAndSpacesRegex, capitalizeEachWord } from './utils';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('onlyLettersAndSpacesRegex works correctly', () => {
  // returns true if we need to replace a character -> filtering by the regex test should return true for all of them
  // as we need to replace the numbers/symbols on this string
  const validTestCases = ['cambridge8', '99New 8york', '(new) york', 'lond0n'];

  expect(
    validTestCases.filter((search) => onlyLettersAndSpacesRegex.test(search))
  ).toHaveLength(validTestCases.length - 1);

  // should return false for all as nothing needs to be replaced
  const invalidTestCases = ['cambridge', 'new york', 'London'];

  expect(
    invalidTestCases.filter((search) => onlyLettersAndSpacesRegex.test(search))
  ).toHaveLength(0);
});

test('capitalizeEachWordEachWord utility fn works correctly', () => {
  expect(capitalizeEachWord('tokyo')).toBe('Tokyo');
  expect(capitalizeEachWord('LoNDoN')).toBe('London');
  expect(capitalizeEachWord('NeW YOrK')).toBe('New York');
  expect(capitalizeEachWord('New York')).toBe('New York');
});
