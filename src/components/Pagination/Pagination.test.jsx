import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  const handlePageChange = jest.fn();
  const linksPerPage = 2;
  const totalLinks = 6;
  const currentPage = 1;

  it("renders correctly with totalLinks greater than 0", () => {
    const { container } = render(
      <Pagination
        linksPerPage={linksPerPage}
        totalLinks={totalLinks}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("does not render if totalLinks is 0 or less", () => {
    const { container } = render(
      <Pagination
        linksPerPage={linksPerPage}
        totalLinks={0}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("calls handlePageChange on next button click", () => {
    const { getByTestId } = render(
      <Pagination
        linksPerPage={linksPerPage}
        totalLinks={totalLinks}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    );
    fireEvent.click(getByTestId("next-button"));
    expect(handlePageChange).toHaveBeenCalledWith(currentPage + 1);
  });
});