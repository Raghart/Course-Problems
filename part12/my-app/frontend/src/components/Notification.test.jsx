import { render, screen } from '@testing-library/react';
import Notification from './Notification';

test('renders content', () => {
  render(<Notification message='Testing notification' isError={false} />)

  const element = screen.getByText('Testing notification')
  expect(element).toBeDefined()
})