import React from "react";
import { render, cleanup } from "@testing-library/react";
import BookMarkedList from "./BookMarkedList";

afterEach(cleanup);

const storedData = {
  links: [
    {
      id: 1,
      title: "Google",
      url: "www.google.com",
      thumbNail: "image.jpg",
      favicon: "favicon.ico",
      description: "Search Engine",
      frequency: 2,
      dateAdded: "2022-01-01",
      pinned: false,
    },
    {
      id: 2,
      title: "Facebook",
      url: "www.facebook.com",
      thumbNail: "image2.jpg",
      favicon: "favicon2.ico",
      description: "Social Network",
      frequency: 1,
      dateAdded: "2022-02-01",
      pinned: false,
    },
  ],
};

const alertHandler = jest.fn();

test("renders a list of bookmarked items", () => {
  const { getByText } = render(
    <BookMarkedList storedData={storedData} alertHandler={alertHandler} />
  );

  expect(getByText("Google")).toBeInTheDocument();
  expect(getByText("Facebook")).toBeInTheDocument();
});