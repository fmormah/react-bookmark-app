import React, { useState, useEffect } from "react";
import {
  checkForHttp,
  isValidAndExistsURL,
  proxyUrl,
  imageToDataURL
} from "../../utils";

const AddBookMarkForm = ({ alertHandler, storedData }) => {
  // useState hook to manage the state of link
  const [link, setLink] = useState("");
  // useState hook to manage the state of title and description
  const [titleAndDescription, setTitleAndDescription] = useState(null);
  // useState hook to manage if the link should be bookmarked
  const [shouldLinkBookmarked, setShouldLinkBookmarked] = useState(null);
  // useState hook to manage if the link should be bookmarked
  const [thumbNailBase64, setThumbNailBase64] = useState(null);

  // function to get the title and description of a page using its URL
  const getTitleAndDescription = async (url) => {
    try {
      // fetch data from the URL
      const response = await fetch(proxyUrl + url);
      const data = await response.text();

      // parse the fetched data as HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // get the title and description of the page
      const title = doc.querySelector("title").innerText;
      const description = doc
        .querySelector('meta[name="description"]')
        ?.getAttribute("content");

      // set the state of titleAndDescription
      setTitleAndDescription({
        title,
        description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // function to fetch data of the bookmark
  const fetchBookMarkedData = () => {
    if (shouldLinkBookmarked) {
      imageToDataURL(checkForHttp(link), setThumbNailBase64)
      .then(()=>{
        getTitleAndDescription(checkForHttp(link));
        setShouldLinkBookmarked(null);
      });
    }
  };

  // function to store the data of the bookmark
  const storeData = () => {
    // create an object with the bookmark data
    const bookeMarkedItem = {
      url: checkForHttp(link),
      thumbNail: thumbNailBase64,
      favicon: `https://www.google.com/s2/favicons?domain=${checkForHttp(
        link
      )}`,
      title: titleAndDescription?.title ?? "Bookmarked Page",
      description:
        titleAndDescription?.description ?? "You book marked this page",
      frequency: 0,
      dateAdded: Date.now(),
      id: Date.now(),
      pinned: false,
    };

    // add the bookmark data to the storedData
    storedData.links.push(bookeMarkedItem);

    // store the updated storedData in local storage
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(storedData));
    // trigger the alertHandler to show a message that the bookmark was added
    alertHandler(`${link} bookmarked 👍🏿`);

    // reset the states of link and titleAndDescription
    setLink("");
    setTitleAndDescription(null);
  };

  const saveBookmark = (event) => {
    // prevent default form behavior
    event.preventDefault();
    // check if bookmark already exists
    checkIfBookMarkExists(link);
  };

  const checkIfBookMarkExists = (url) => {
    // Check if link already exists in storedData
    let result = storedData?.links?.some((obj) => {
      return obj.url === checkForHttp(url);
    });
    // If link exists, show alert with message
    if (result) {
      alertHandler("Bookmark already exists", true);
    } else {
      // Check if URL is valid and exists
      isValidAndExistsURL({
        url,
        stateSetter: setShouldLinkBookmarked,
        alertHandler,
      });
    }
  };

  useEffect(() => {
    // fetch data from storage
    fetchBookMarkedData();
    // If title and description are available, store the data
    if (titleAndDescription) {
      storeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLinkBookmarked, thumbNailBase64,titleAndDescription]);
  // Note: The dependency array is ignored by eslint due to the exhaustive-deps rule being disabled. This is because the code only needs to re-run when the state changes.
  
  if(shouldLinkBookmarked){
    return(
      <div className="loader-screen">
        <div className= "loader-centered">
          <div className= "blob-1"/>
          <div className= "blob-2"/>
        </div>
      </div>
    )
  }
  return (
    <>
      <form
        className="add-form"
        data-testid="add-bookmark-form"
        onSubmit={saveBookmark}
        aria-label="Add new bookmark form"
      >
        <input
          type="text"
          data-testid="add-bookmark-form-url-input"
          placeholder="Add New Bookmark"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          aria-label="Enter the URL for the bookmark"
        />
        <button type="submit" aria-label="Add Bookmark">
          <span>+</span>
        </button>
      </form>
    </>
  );
};

export default AddBookMarkForm;
