import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Event() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user]);

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
          <EventCard gameTitle={event.gameTitle} description={event.description} date={event.date} time={event.time} gamer={event.gamer} id={event.id} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default Event;
