import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title', () => {
  render(<App />);
  const titleElement = screen.queryByTestId('appTitle');
  expect(titleElement).toBeInTheDocument();
});
