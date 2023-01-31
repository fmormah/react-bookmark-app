import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import PageAlerts from './PageAlerts';

afterEach(cleanup);

const alerts = [
  { id: 1, message: 'Test Message 1', messageType: 'success' },
  { id: 2, message: 'Test Message 2', messageType: 'error' },
];

const removeAlert = jest.fn();
const addAlert = jest.fn();

describe('PageAlerts component', () => {
  it('renders the component with proper alerts', () => {
    const { getByTestId } = render(
      <PageAlerts alerts={alerts} removeAlert={removeAlert} addAlert={addAlert} />
    );

    const alertContainer = getByTestId('alert-container');
    expect(alertContainer).toBeInTheDocument();
    expect(alertContainer.children).toHaveLength(2);
  });

  it('calls addAlert when alertMessage prop changes', () => {
    const { rerender } = render(
      <PageAlerts alerts={alerts} removeAlert={removeAlert} addAlert={addAlert} alertMessage={null} />
    );

    rerender(
      <PageAlerts alerts={alerts} removeAlert={removeAlert} addAlert={addAlert} alertMessage="Test Message" />
    );
    expect(addAlert).toHaveBeenCalled();
  });
});