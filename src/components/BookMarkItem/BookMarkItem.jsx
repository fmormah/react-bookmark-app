import React, { useState, useEffect } from "react";
import {
  heartOnIcon,
  heartOffIcon,
  globeIcon,
  copyIcon,
  editIcon,
  cameraIcon,
  trashIcon,
} from "./icons";

const BookMarkedItem = ({
  linkItem,
  alertHandler,
  removeItem,
  editBookmark,
  recaptureListItemimage,
  togglePinListeditem,
  incrementFrequencyOfClicks,
}) => {
  const { url, title, favicon, thumbNail, pinned } = linkItem;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  useEffect(() => {}, [isSubMenuOpen]);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div>
      <a
        onClick={incrementFrequencyOfClicks}
        className="bookmark-anchor"
        href={url}
      >
        <img
          src={thumbNail}
          alt={`${title} Thumbnail`}
          className="bookmark-thumbnail"
        />
        <div className="bookmark-description">
          <img src={favicon} alt={`${title} favicon`} />
          <div className="bookmark-title">{title}</div>
        </div>
      </a>
      <button onClick={toggleSubMenu} className="bookmark-menu">
        <span>...</span>
      </button>

      {/* TODO: Pinned feature to be completed but is unfinished as of this comment */}
      <button
        data-testid="toggle_pin"
        onClick={togglePinListeditem}
        className={`fav-btn ${pinned && "is-pinned"}`}
      >
        {pinned ? heartOnIcon : heartOffIcon}
      </button>

      {isSubMenuOpen && (
        <div className="bookmark-submenu">
          <ul onMouseLeave={toggleSubMenu}>
            <li>
              <a
                onClick={incrementFrequencyOfClicks}
                className="submenu-options"
                href={url}
              >
                {globeIcon}
                Open link
              </a>
            </li>

            <li>
              <a
                onClick={incrementFrequencyOfClicks}
                className="submenu-options"
                target="_blank"
                href={url}
                rel="noreferrer"
              >
                {globeIcon}
                Open in new tab
              </a>
            </li>

            <li>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toggleSubMenu();
                  alertHandler("URL Copied");
                }}
                className="submenu-options"
              >
                {copyIcon}
                Copy link address
              </button>
            </li>
            <li>
              <button
                data-testid="edit_bookmark"
                onClick={() => {
                  toggleSubMenu();
                  editBookmark();
                }}
                className="submenu-options"
              >
                {editIcon}
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={recaptureListItemimage}
                className="submenu-options"
              >
                {cameraIcon}
                Refresh thubmnail
              </button>
            </li>
            <li>
              <button
                data-testid="remove_bookmark"
                onClick={() => {
                  toggleSubMenu();
                  removeItem();
                }}
                className="submenu-options"
              >
                {trashIcon}
                Remove
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookMarkedItem;
