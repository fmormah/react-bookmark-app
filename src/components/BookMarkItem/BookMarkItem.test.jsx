import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import BookMarkedItem from './BookMarkItem';

afterEach(cleanup);

describe('BookMarkedItem', () => {
  const linkItem = {
    url: 'https://example.com',
    title: 'Example',
    favicon: 'favicon.ico',
    thumbNail: 'thumbnail.png',
    pinned: false,
  };
  const alertHandler = jest.fn();
  const removeItem = jest.fn();
  const editBookmark = jest.fn();
  const recaptureListItemimage = jest.fn();
  const togglePinListeditem = jest.fn();
  const incrementFrequencyOfClicks = jest.fn();
  const togglePinListeditemMock = jest.fn();
  
  it('renders the component', () => {
    const { getByText } = render(
      <BookMarkedItem 
        linkItem={linkItem} 
        alertHandler={alertHandler} 
        removeItem={removeItem} 
        editBookmark={editBookmark} 
        recaptureListItemimage={recaptureListItemimage} 
        togglePinListeditem={togglePinListeditem} 
        incrementFrequencyOfClicks={incrementFrequencyOfClicks}
      />
    );
    expect(getByText('Example')).toBeInTheDocument();
  });

  it('toggles submenu on button click', () => {
    const { getByText, getByTestId } = render(
      <BookMarkedItem 
        linkItem={linkItem} 
        alertHandler={alertHandler} 
        removeItem={removeItem} 
        editBookmark={editBookmark} 
        recaptureListItemimage={recaptureListItemimage} 
        togglePinListeditem={togglePinListeditem} 
        incrementFrequencyOfClicks={incrementFrequencyOfClicks}
      />
    );
    fireEvent.click(getByText('...'));
    expect(getByTestId('edit_bookmark')).toBeInTheDocument();
  });

  it('calls `removeItem` when remove button is clicked', () => {
    const { getByText, getByTestId } = render(
      <BookMarkedItem 
        linkItem={linkItem} 
        alertHandler={alertHandler} 
        removeItem={removeItem} 
        editBookmark={editBookmark} 
        recaptureListItemimage={recaptureListItemimage} 
        togglePinListeditem={togglePinListeditem} 
        incrementFrequencyOfClicks={incrementFrequencyOfClicks}
      />
    );
    fireEvent.click(getByText('...'));
    fireEvent.click(getByTestId('remove_bookmark'));
    expect(removeItem).toHaveBeenCalled();
  });

  it('toggles the pin on button click', () => {
    const { getByTestId } = render(
    <BookMarkedItem
    linkItem={{url: "https://google.com", title: "Google", favicon: "", thumbNail: "", pinned: false}}
    togglePinListeditem={togglePinListeditemMock}
    incrementFrequencyOfClicks={() => {}}
    removeItem={() => {}}
    recaptureListItemimage={() => {}}
    alertHandler={() => {}}
    editBookmark={() => {}}
    />
    );
    const pinButton = getByTestId("toggle_pin");
    fireEvent.click(pinButton);
    expect(togglePinListeditemMock).toHaveBeenCalled();
  });
});