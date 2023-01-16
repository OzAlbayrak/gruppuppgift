import React, { useState } from "react";
import useFetch from "./UseFetch";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TodayInHistory = () => {
  //var dateMonth = 2;
  //var dateDay = 14;
  const [dateMonth, setDateMonth] = useState("1");
  const [dateDay, setDateDay] = useState("1");
  const { data, isPending, error } = useFetch(
    "http://history.muffinlabs.com/date/2/14"
  );
  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dayArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  var event = [];
  var death = [];
  var birth = [];
  var text = "";
  var year = "";

  const monthOnChangeHandler = (e) => {
    setDateMonth(e.target.value);
    //const { data, isPending, error } = useFetch("http://history.muffinlabs.com/date/${dateMonth}/${dateDay}");
  };

  const dayOnChangeHandler = (e) => {
    setDateDay(e.target.value);
    //const { data, isPending, error } = useFetch("http://history.muffinlabs.com/date/2/14");
  };

  const getNewData = () => {};

  return (
    <div>
      <h1>TodayInHistory</h1>
      <h2>Choose a date</h2>
      <select onChange={monthOnChangeHandler}>
        {monthArray.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>

      <select onChange={dayOnChangeHandler}>
        {dayArray.map((x) => (
          <option value={x}>{x}</option>
        ))}
      </select>

      <button className="get-new-button" onClick={getNewData}>
        New Event
      </button>
      <button className="clear-button">Clear Event</button>

      <Tabs>
        <TabList>
          <Tab>Event</Tab>
          <Tab>Birth</Tab>
          <Tab>Death</Tab>
        </TabList>

        <TabPanel>
          <h2>data.event.year data.event.text</h2>
          <div>{console.log(data)}</div>
          <div>{data.data.Events[0].text}</div>
          <div>{data.date}</div>
          <div>{data.url}</div>

        </TabPanel>
        <TabPanel>
          <h2>data.birth.year data.birth.text</h2>
        </TabPanel>
        <TabPanel>
          <h2>data.death.year data.death.text</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TodayInHistory;

/*

 {data.Events[0].text}



<select onChange={monthOnChangeHandler}>
        <option value="1">1</option>
        <option value="12">12</option>
      </select>

      <select onChange={dayOnChangeHandler}>
        <option value="1">1</option>
        <option value="31">12</option>
      </select>







<>
          {data.Events.map((item, index) => (
              <div key={index}>
                <div>year: {item.year}</div>
                <div>text: {item.text}</div>
              </div>
            ))}
        </>




*/
