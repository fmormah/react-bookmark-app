import React, { useState } from "react";
import AddBookMarkForm from "../AddBookMarkForm/AddBookMarkForm";

const Header = ({
  storedData,
  alertHandler,
  searchString,
  setSearchString,
  setSortType,
  setStoredData,
}) => {
  // useState hook to manage the filter menu's active state
  const [isFilterMenuActive, setIsFilterMenuActive] = useState(false);

  // changeSortingType is a function that changes the sorting type of the data
  const changeSortingType = (type) => {
    // create a sort object with the passed type and reversed value from storedData
    const sortObj = {
      type,
      reversed: storedData?.sortingType?.reversed ?? false,
    };

    let x = storedData;
    setSortType(sortObj); // set the sort type using the sort object
    x.sortingType = sortObj;
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(x)); // update local storage
    setIsFilterMenuActive(false); // close filter menu after sorting type is changed
  };

  // reverseSortingType is a function that reverses the sorting direction
  const reverseSortingType = () => {
    let x = storedData;
    const reverseDirection = !storedData?.sortingType?.reversed;
    setSortType({
      type: storedData?.sortingType?.type,
      reversed: reverseDirection,
    });
    x.sortingType = {
      type: storedData?.sortingType?.type,
      reversed: reverseDirection,
    };
    localStorage.setItem("phantomBookMarkApp", JSON.stringify(x)); // update local storage
    setIsFilterMenuActive(false); // close filter menu after sorting direction is reversed
  };

  return (
    <header className="header-container">
      <div className="header-console">
        <h1>
          <span className="header-number">{storedData?.links?.length}</span>{" "}
          Bookmarks
        </h1>

        <AddBookMarkForm storedData={storedData} alertHandler={alertHandler} />

        <div id="filter-holder">
          <input
            type="text"
            placeholder="Search"
            value={searchString}
            data-testid="search-input"
            onChange={(event) => setSearchString(event.target.value)}
          />

          <div
            data-testid="filter-btn"
            onClick={() => {
              setIsFilterMenuActive(!isFilterMenuActive);
            }}
            className={`filter-btn ${isFilterMenuActive ? "is-active" : ""}`}
          >
            {isFilterMenuActive && (
              <ul>
                <li>
                  <button
                    data-testid="a-z-filter-btn"
                    className={
                      storedData?.sortingType?.type === "a-z" ? "is-active" : ""
                    }
                    onClick={() => {
                      changeSortingType("a-z");
                    }}
                  >
                    A-Z
                  </button>
                </li>
                <li>
                  <button
                    data-testid="data-filter-btn"
                    className={
                      storedData?.sortingType?.type === "date"
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      changeSortingType("date");
                    }}
                  >
                    Date Added
                  </button>
                </li>
                <li>
                  <button
                    data-testid="clicks-filter-btn"
                    className={
                      storedData?.sortingType?.type === "most-clicked"
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      changeSortingType("most-clicked");
                    }}
                  >
                    Most Visited
                  </button>
                </li>
                <li>
                  <button
                    className={
                      storedData?.sortingType?.reversed === true
                        ? "is-active"
                        : ""
                    }
                    onClick={reverseSortingType}
                  >
                    Reverse List
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
