import { render, screen, fireEvent } from '@testing-library/react';
import PersonForm from './PersonForm';
import { expect, vi } from 'vitest';


test('form renders', () => {
    render(<PersonForm setMessage={vi.fn()} setIsError={vi.fn()} persons={[]} setPersons={vi.fn()} />) 

    expect(screen.getByTestId('inputName')).toBeDefined()
    expect(screen.getByText('name:')).toBeDefined()

    expect(screen.getByTestId('inputNumber')).toBeDefined()
    expect(screen.getByText('number:')).toBeDefined()

    expect(screen.getByTestId('addButton')).toBeDefined()
})