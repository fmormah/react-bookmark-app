import React from 'react';
import { render, fireEvent, cleanup, getByText } from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

describe('Header component', () => {
  it('renders correctly', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('toggles the filter menu on click', () => {
    const { getByTestId } = render(<Header />);
    const filterBtn = getByTestId('filter-btn');

    fireEvent.click(filterBtn);
    expect(filterBtn.className).toBe('filter-btn is-active');

    fireEvent.click(filterBtn);
    expect(filterBtn.className).toBe('filter-btn ');
  });
});