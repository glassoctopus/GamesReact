import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function EventCard({
  gameTitle,
  description,
  date,
  time,
  gamer,
  id,
}) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}`)) {
      // console.log('we should be deleting this event soon.');
    }
  };

  return (
    <Card className="text-center" style={{ width: '666px', margin: '10px' }}>
      <Card.Header>~{gameTitle}~</Card.Header>
      <Card.Body>
        <Card.Title>Of: {description}</Card.Title>
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
};
