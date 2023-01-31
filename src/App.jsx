import React, { useState, useEffect } from "react";
import BookMarkedList from "./components/BookMarkedList/BookMarkedList";
import PageAlerts from "./components/PageAlerts/PageAlerts";
import Header from "./components/Header/Header";

function App() {
  //Alert Helprs
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageType, setAlertMessageType] = useState("alert-standard");
  const [alerts, setAlerts] = useState([]);

  //Local Storage helpers
  const cleanData = {
    sortingType: { type: "a-z", reversed: false },
    links: [],
  };
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("phantomBookMarkApp")) || cleanData
  );

  //Search/Filter Helpers
  const [searchString, setSearchString] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [sortType, setSortType] = useState(storedData?.sortingType);

  const alertHandler = (alert, isError) => {
    setAlertMessage(alert);
    if (isError === true) {
      setAlertMessageType("alert-error");
    } else {
      setAlertMessageType("alert-standard");
    }
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const addAlert = (message, messageType) => {
    if (message)
      setAlerts([...alerts, { message, messageType, id: Date.now() }]);
    setAlertMessage(null);
  };

  const checkStorageData = () => {
    if (
      JSON.stringify(storedData) !== localStorage.getItem("phantomBookMarkApp")
    ) {
      setStoredData(
        JSON.parse(localStorage.getItem("phantomBookMarkApp")) || cleanData
      );
    }
  };

  useEffect(() => {
    checkStorageData();
  });

  return (
    storedData && (
      <div data-testid="app" className="App">
        <Header
          searchString={searchString}
          setSearchString={setSearchString}
          storedData={storedData}
          alertHandler={alertHandler}
          setSortType={setSortType}
        />
        <BookMarkedList
          searchString={searchString}
          storedData={storedData}
          alertHandler={alertHandler}
        />
        <PageAlerts
          removeAlert={removeAlert}
          alerts={alerts}
          addAlert={() => addAlert(alertMessage, alertMessageType)}
        />
      </div>
    )
  );
}

export default App;
