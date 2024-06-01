import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/EventCard';
import { getSingleEvent } from '../../utils/data/eventData';

export default function Event() {
  const [anEvent, setAnEvent] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleEvent(id).then((data) => setAnEvent(data));
    }
  }, [id]);

  if (!anEvent) {
    return <p>Loading...</p>;
  }

  return (
    <article className="events">
      <h1>Event</h1>
      <Button
        onClick={() => {
          router.push(`/events/update/${id}`);
        }}
      >
        Edit this Event
      </Button>

      <section key={`event--${anEvent.id}`} className="event">
        <EventCard
          gameTitle={anEvent.game?.title || 'Unknown Game'}
          description={anEvent.description || 'No Description'}
          date={anEvent.date || 'unknown date'}
          time={anEvent.time || 'unknown time'}
          gamer={anEvent.organizer?.bio || 'No Organizer atm.'}
          id={id}
        />
      </section>

    </article>
  );
}
