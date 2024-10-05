import React, { useState, useEffect } from "react";
import "./css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { Button } from "react-bootstrap";

import WeeklyCalendar from "./component/WeeklyCalendar";
import { AddEventModal } from "./component/EventModal";

const API_URL = "http://localhost:3000";

const App = () => {
  // モーダルの開閉
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // イベントのデータ
  const [events, setEvents] = useState([]);
  const initEvent = {
    id: null,
    title: "",
    day: "",
    h1: "",
    m1: "",
    h2: "",
    m2: "",
    category: "",
  };
  const [event, setEvent] = useState(initEvent);

  // フェッチ
  let isFirst = false;

  useEffect(() => {
    if (!isFirst && event.id !== null) {
      setShow(true);
    }
  }, [event]);

  useEffect(() => {
    fetchEvent();
  }, []);

  // fetchEvent
  const fetchEvent = async () => {
    const eventUrl = `${API_URL}/plans`;
    const res = await fetch(eventUrl);
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
      console.log("参照：", data);
    } else {
      console.error("Failed to fetch events");
    }
  };

  // データ追加
  const addEvent = async (title, day, h1, m1, h2, m2, category) => {
    const eventUrl = `${API_URL}/plans`;
    const body = { title, day, h1, m1, h2, m2, category };
    const req = {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(eventUrl, req);
    if (res.ok) {
      fetchEvent();
    } else {
      console.error("Failed to add event");
    }
  };
  // データ削除
  const deleteEvent = async (id) => {
    const eventUrl = `${API_URL}/plans/${id}`;
    const req = {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(eventUrl, req);
    if (res.ok) {
      fetchEvent();
    } else {
      console.error("Failed to delete event");
    }
  };
  // データ更新
  const editEvent = async (id, title, day, h1, m1, h2, m2, category) => {
    const eventUrl = `${API_URL}/plans/${id}`;
    const body = { id, title, day, h1, m1, h2, m2, category };
    const req = {
      method: "PUT",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(eventUrl, req);
    if (res.ok) {
      fetchEvent();
    } else {
      console.error("Failed to edit event");
    }
  };

  return (
    <div style={{ backgroundColor: "#333" }}>
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="mt-3 ms-3 fst-italic">Weekly Schedule</h1>
        </div>
        <div className="eventBtnWrap">
          <Button className="eventBtn" variant="primary" onClick={handleShow}>
            予定追加
          </Button>
        </div>
      </div>
      <AddEventModal
        show={show}
        modalClose={modalClose}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
        editEvent={editEvent}
        event={event}
        setEvent={setEvent}
        initEvent={initEvent}
      />
      <div className="weeklyCalendar">
        <WeeklyCalendar events={events} setEvent={setEvent} />
      </div>
    </div>
  );
};

export default App;
