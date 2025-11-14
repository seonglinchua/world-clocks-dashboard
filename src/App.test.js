import { render, screen } from '@testing-library/react';
import App from './App';

test('renders world clocks dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/World Clocks Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders multiple city clocks', () => {
  render(<App />);
  const newYorkElements = screen.getAllByText(/New York/i);
  const londonElements = screen.getAllByText(/London/i);
  const tokyoElements = screen.getAllByText(/Tokyo/i);
  expect(newYorkElements.length).toBeGreaterThan(0);
  expect(londonElements.length).toBeGreaterThan(0);
  expect(tokyoElements.length).toBeGreaterThan(0);
});
