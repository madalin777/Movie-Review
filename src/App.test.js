import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Helper function to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders app header', () => {
  renderWithRouter(<App />);
  const logoElement = screen.getByText(/ReviewBox/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders search input', () => {
  renderWithRouter(<App />);
  const searchInput = screen.getByPlaceholderText(/Caută titlu, actor sau gen/i);
  expect(searchInput).toBeInTheDocument();
});
