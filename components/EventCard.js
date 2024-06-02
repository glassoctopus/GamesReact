import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

export default function EventCard({
  gameTitle,
  description,
  date,
  time,
  gamer,
  id,
  joined,
}) {
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}`)) {
      deleteEvent(id);
      window.location.reload();
      router.push('/events');
    }
  };

  const handleAttend = () => {
    const payload = { uid: user.id };
    joinEvent(id, payload).then(() => {
    });
  };

  const handleLeave = () => {
    const payload = {
      uid: user.id,
    };
    leaveEvent(id, payload).then(() => {
    });
  };

  return (
    <Card className="text-center" style={{ width: '666px', margin: '10px' }}>
      <Card.Header>~{gameTitle}~</Card.Header>
      <Card.Body>
        <Card.Title>Of: {description}</Card.Title>
        <div>
          {joined ? <Button onClick={handleLeave}>Withdraw</Button> : <Button onClick={handleAttend}>Register</Button>}
        </div>
        <Card.Text>On {date}, mark your calandar</Card.Text>
        <Card.Text>At: {time} Sharp, be there or be square.</Card.Text>
        <Card.Text>Brought to us all by: {gamer}</Card.Text>
        <Link href={`/events/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/events/update/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">a night of: {gameTitle}</Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  gameTitle: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  gamer: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  joined: PropTypes.bool.isRequired,
};
