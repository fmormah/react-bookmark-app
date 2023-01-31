import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import BookMarkedItem from "../BookMarkItem/BookMarkItem";
import { linkImageGrabber, checkForHttp } from "../../utils";

const BookMarkedList = ({ storedData, alertHandler, searchString }) => {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 20;
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [listIdToEdit, setListIdToEdit] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const [editingDescription, setEditingDescription] = useState(null);

  // Removes an item from the links state and updates in local storage
  const removeItem = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    const storedData = JSON.parse(localStorage.getItem("phantomBookMarkApp"));
    storedData.links = updatedLinks;
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(storedData));
    alertHandler(`Bookmark removed`);
  };

  // Updates a list item with new data
  const updateListItem = ({
    id,
    title,
    description,
    frequency,
    pinned,
    thumbNail,
  }) => {
    let updatedLinks = [...links];
    updatedLinks = updatedLinks.map((item) => {
      if (id === item.id) {
        let updatedItem = {
          url: item.url,
          thumbNail: thumbNail ?? item.thumbNail,
          favicon: item.favicon,
          title: title ?? item.title,
          description: description ?? item.description,
          frequency: frequency ?? item.frequency,
          dateAdded: item.dateAdded,
          id: item.id,
          pinned: pinned ?? item.pinned,
        };
        item = updatedItem;
      }
      return item;
    });
    alertHandler(`Saved`);
    setIsLightBoxOpen(false);
    const storedData = JSON.parse(localStorage.getItem("phantomBookMarkApp"));
    storedData.links = updatedLinks;
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(storedData));
    setLinks(updatedLinks);
    setListIdToEdit(null);
  };

  // Edit a bookmark item
  const editBookmark = (id) => {
    const filteredData = storedData.links.filter((item) => item.id === id);
    setListIdToEdit(filteredData);
    setEditingTitle(filteredData[0].title);
    setEditingDescription(filteredData[0].description);
    setIsLightBoxOpen(!isLightBoxOpen);
  };

  // Update edited item in storage
  const saveEditedListItem = (e, id) => {
    e.preventDefault();
    updateListItem({
      id,
      title: editingTitle,
      description: editingDescription,
    });
  };

  // Refresh thumbnail
  const recaptureListItemimage = (link) => {
    const { id, url } = link;
    updateListItem({
      id,
      thumbNail: `${linkImageGrabber}${checkForHttp(url)}`,
    });
  };

  // Toggle Pinned Item status (Pinned feature incomplete)
  const togglePinListeditem = (link) => {
    const { id, pinned } = link;
    updateListItem({
      id,
      pinned: !pinned,
    });
  };

  // clear links state and remove from local storage or session storage or cookies
  const handleClear = () => {
    setLinks([]);
    const storedData = JSON.parse(localStorage.getItem("phantomBookMarkApp"));
    storedData.links = [];
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(storedData));
    setListIdToEdit(null);
    setEditingTitle(null);
    setEditingDescription(null);
    setIsLightBoxOpen(null);
    alertHandler(`Clear All Bookmarks`);
  };

  //Pagination page change handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handles list sorting
  const applySorting = (items) => {
    switch (storedData?.sortingType?.type) {
      case "a-z":
        items.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        break;
      case "date":
        items.sort((a, b) => {
          return a.dateAdded - b.dateAdded;
        });
        break;
      case "most-clicked":
        items.sort((a, b) => {
          return a.frequency - b.frequency;
        });
        break;
      default:
      // code block
    }
    if (storedData?.sortingType?.reversed) {
      items.reverse();
    }
  };

  // Helps determine which links are clicked on most
  const incrementFrequencyOfClicks = (id) => {
    storedData.links.map((link) => {
      if (link.id === id) {
        link.frequency = link.frequency + 1;
      }
      return storedData;
    });
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(storedData));
  };

  useEffect(() => {
    // fetch links from local storage or session storage or cookies
    if (!searchString || searchString === "") {
      setLinks(storedData?.links);
    } else {
      const searchedResults = storedData.links.filter((obj) =>
        obj.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setLinks(searchedResults);
    }
  }, [searchString, storedData?.links]);

  applySorting(links);
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = links?.slice(indexOfFirstLink, indexOfLastLink);

  return (
    storedData && (
      <div>
        <div className="page-mobile-view">
          <Pagination
            linksPerPage={linksPerPage}
            totalLinks={links.length}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>

        <ul className="bookmark-grid">
          {currentLinks.map((link, index) => (
            <li key={index} className={`bookmark-item`}>
              <BookMarkedItem
                removeItem={() => {
                  removeItem(index);
                }}
                editBookmark={() => {
                  editBookmark(link.id);
                }}
                recaptureListItemimage={() => {
                  recaptureListItemimage(link);
                }}
                togglePinListeditem={() => {
                  togglePinListeditem(link);
                }}
                incrementFrequencyOfClicks={() => {
                  incrementFrequencyOfClicks(link.id);
                }}
                linkItem={link}
                alertHandler={alertHandler}
              />
            </li>
          ))}
        </ul>

        <Pagination
          linksPerPage={linksPerPage}
          totalLinks={links.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
        <button className="clear-all-btn" onClick={handleClear}></button>

        {isLightBoxOpen && (
          <div className="lightBoxBackdrop">
            <div className="lightBoxForm">
              <h2>Edit Bookmark</h2>
              <form
                data-testid="update_form"
                onSubmit={(e) => {
                  saveEditedListItem(e, listIdToEdit[0].id);
                }}
              >
                <h3>Title</h3>
                <input
                  type="text"
                  data-testid="editing_title"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                />
                <h3>Description</h3>
                <input
                  type="text"
                  data-testid="editing_description"
                  value={editingDescription}
                  onChange={(event) =>
                    setEditingDescription(event.target.value)
                  }
                />

                <button type="submit">Save</button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLightBoxOpen(!isLightBoxOpen);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default BookMarkedList;
