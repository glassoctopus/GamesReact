import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Event() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="event">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard gameTitle={event.gameTitle} description={event.description} date={event.date} time={event.time} gamer={event.gamer} />
        </section>
      ))}
    </article>
  );
}

export default Event;
