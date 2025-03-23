import { render, screen } from '@testing-library/react';
import Persons from './Persons';
import { expect, vi } from 'vitest';

const testData = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      }
]


test('renders persons', () => {
   
  render(<Persons persons={testData} setPersons={vi.fn()} />)

  expect(screen.getByText('Arto Hellas 040-123456')).toBeDefined()

  expect(screen.getByText('Ada Lovelace 39-44-5323523')).toBeDefined()

  expect(screen.getByText('Dan Abramov 12-43-234345')).toBeDefined()
})