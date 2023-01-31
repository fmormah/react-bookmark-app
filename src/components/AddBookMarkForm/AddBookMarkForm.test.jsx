import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddBookMarkForm from './AddBookMarkForm';
import { act } from 'react-dom/test-utils';

jest.mock('../../utils', () => ({
  checkForHttp: jest.fn(() => 'http://example.com'),
  isValidAndExistsURL: jest.fn(() => Promise.resolve()),
  proxyUrl: '',
  linkImageGrabber: '',
}));

describe('AddBookMarkForm component', () => {
  it('renders a form with an input and submit button', () => {
    const { getByTestId } = render(<AddBookMarkForm />);
    const form = getByTestId('add-bookmark-form');
    const input = getByTestId('add-bookmark-form-url-input');
    const button = form.querySelector('button');
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    const { getByTestId } = render(<AddBookMarkForm />);
    const input = getByTestId('add-bookmark-form-url-input');
    fireEvent.change(input, { target: { value: 'https://www.example.com' } });
    expect(input.value).toBe('https://www.example.com');
  });
});
