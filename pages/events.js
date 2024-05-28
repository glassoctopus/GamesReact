import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/data/gameData';

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="event">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard gameTitle={event.gameTitle} description={event.description} date={event.date} time={event.time} gamer={event.gamer} />
        </section>
      ))}
    </article>
  );
}

export default Event;
