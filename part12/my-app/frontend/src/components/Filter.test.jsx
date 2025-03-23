import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import { expect, vi } from 'vitest';

test('renders content', () => {
   
  render(<Filter filterNames={''} setFilteredNames={vi.fn()} />)

  expect(screen.getByRole('textbox')).toBeDefined()
  expect(screen.getByText('filter shown with')).toBeDefined()
})

test('input working', () => {
  const setFilteredNames = vi.fn();
  render(<Filter filterNames={''} setFilteredNames={setFilteredNames} />)

  const input = screen.getByRole('textbox');
  fireEvent.change(input, {target: { value: 'test' } });

  expect(setFilteredNames).toHaveBeenCalledWith('test');
})