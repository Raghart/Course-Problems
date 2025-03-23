import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders content', () => {
  render(<Header title='Testing' />)

  const element = screen.getByText('Testing')
  expect(element).toBeDefined()
})