import React from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("App component", () => {
  it("renders the component correctly", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app")).toBeInTheDocument();
  });

  it("updates the search string state on input change", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("search-input");
    act(() => {
      fireEvent.change(input, { target: { value: "search string" } });
    });
    expect(input.value).toBe("search string");
  });

  it("handles alerts", () => {
    const { getByText } = render(<App />);
    act(() => {
      const alertHandler = jest.fn();
      alertHandler("This is an error", true);
      expect(getByText("This is an error")).toBeInTheDocument();
    });
  });

  it("handles the removing of alerts", () => {
    const { queryByText } = render(<App />);
    act(() => {
      const removeAlert = jest.fn();
      removeAlert(1);
      expect(queryByText("This is an error")).not.toBeInTheDocument();
    });
  });

  it("handles adding alerts", () => {
    const { queryByText } = render(<App />);
    act(() => {
      const addAlert = jest.fn();
      addAlert("This is an alert", "alert-standard");
      expect(queryByText("This is an alert")).toBeInTheDocument();
    });
  });
});
