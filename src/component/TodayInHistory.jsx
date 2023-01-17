import React, { useState, useEffect} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TodayInHistory = () => {
  const [dateMonth, setDateMonth] = useState("1");
  const [dateDay, setDateDay] = useState("1");
  const[data, setData] = useState(null);
  const[isPending, setIsPending] = useState(true);
  const[error, setError] = useState(null);
  const[randomEvent, setRandomEvent] = useState(null);
  const[randomBirth, setRandomBirth] = useState(null);
  const[randomDeath, setRandomDeath] = useState(null);
  const monthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  const dayArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const monthDaySize = [0,31,29,31,30,31,30,31,31,30,31,30,31];
  var address ="";
  var month = require('month');

  useEffect(() => {
    }, []);

  const monthOnChangeHandler = (e) => {
    setDateMonth(e.target.value);
  };

  const dayOnChangeHandler = (e) => {
    setDateDay(e.target.value);
  };

  const getNewData = e => {
    setIsPending(true);
    address = 'http://history.muffinlabs.com/date/' + dateMonth + '/' + dateDay;
    fetch(address)
      .then(res => {
          if(!res.ok) {
              throw Error('Kunde ej hämta data');
          }
          return res.json();
      })
      .then(data => {
          setData(data);
          setIsPending(false);
          setError(null);
          setRandomEvent(Math.floor(Math.random() * data.data.Events.length));
          setRandomBirth(Math.floor(Math.random() * data.data.Births.length));
          setRandomDeath(Math.floor(Math.random() * data.data.Deaths.length));
      })
      .catch(err => {
          setIsPending(false);
          setError(err.message);
      })
    };

  return (
    <div>
      <h1>TodayInHistory</h1>
      <div className="date-selector">
        <h2>Choose a date</h2>
        <select onChange={monthOnChangeHandler}>
          {monthArray.map((x) => (
            <option value={x}>{month(x)}</option>
          ))}
        </select>

        <select onChange={dayOnChangeHandler}>
          {
          dayArray.map((x) => (
            x <= monthDaySize[dateMonth] ? 
            (<>
              <option value={x}>{x}</option>
            </>) : 
            (<></>)
            
          ))}
        </select>
        <button className="get-new-button" onClick={getNewData}>
          New Event
        </button>
      </div>
      <br></br>
      <Tabs className={"tabs"}>
        <TabList>
          <Tab>Event</Tab>
          <Tab>Birth</Tab>
          <Tab>Death</Tab>
        </TabList>

        <TabPanel> 
        <div>{console.log(data)}</div>
          {
            isPending ? (<>
              <div>Loading...</div>
            </>) : (<>
              <div>Year: {data.data.Events[randomEvent].year}</div>
              <div>Event of the day: {data.data.Events[randomEvent].text}</div>
            </>)
          }
        </TabPanel>

        <TabPanel>
        <div>{console.log(data)}</div>
          {
            isPending ? (<>
              <div>Loading...</div>
            </>) : (<>
              <div>Year: {data.data.Births[randomBirth].year}</div>
              <div>Birth of the day: {data.data.Births[randomBirth].text}</div>
            </>)
          }
        </TabPanel>

        <TabPanel>
        <div>{console.log(data)}</div>
          {
            isPending ? (<>
              <div>Loading...</div>
            </>) : (<>
              <div>Year: {data.data.Deaths[randomDeath].year}</div>
              <div>Death of the day: {data.data.Deaths[randomDeath].text}</div>
            </>)
          }
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TodayInHistory;


