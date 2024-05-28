import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  gameTitle, //
  description,
  date,
  time,
  gamer,
}) => (
  <Card className="text-center" style={{ width: '666px', margin: '10px' }}>
    <Card.Header>~{gameTitle}~</Card.Header>
    <Card.Body>
      <Card.Title>Of: {description}</Card.Title>
      <Card.Text>On {date}, mark your calandar</Card.Text>
      <Card.Text>At: {time} Sharp, be there or be square.</Card.Text>
      <Card.Text>Brought to us all by: {gamer}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">a night of: {gameTitle}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  gameTitle: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  gamer: PropTypes.number.isRequired,
};

export default EventCard;
