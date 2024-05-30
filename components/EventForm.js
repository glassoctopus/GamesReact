import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createEvent, getSingleEvent, updateEvent, getGamers,
} from '../utils/data/eventData';
import { getGames } from '../utils/data/gameData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  gamer: '',
};

const EventForm = ({ id, update }) => {
  const [currentGame, setCurrentGame] = useState([]);
  const [currentEventOrganizer, setCurrentEventOrganizer] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (update) {
      getSingleEvent(id).then((data) => {
        setCurrentEvent({
          game: data.game,
          description: data.description,
          date: data.date,
          time: data.time,
          gamer: data.gamer,
          id,
        });
      });
    }
    getGamers().then(setCurrentEventOrganizer);
    getGames().then(setCurrentGame);
  }, [id, update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: currentEvent.game,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      id: currentEvent.gamer,
    };

    console.log('Submitting event:', event);

    if (!update) {
      createEvent(event)
        .then(() => router.push('/events'))
        .catch((error) => {
          console.error('Error creating this event: ', error);
        });
    } else {
      updateEvent(event)
        .then(() => router.push('/events'))
        .catch((error) => {
          console.error('Error updating this event: ', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Name of the Event</Form.Label>
          <FloatingLabel controlId="floatingInput1" label="description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a description, the event's name!"
              name="description"
              required
              value={currentEvent.description}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Form.Label>Game of the Event</Form.Label>
          <Form.Select
            name="game"
            required
            value={currentEvent.game}
            onChange={handleChange}
          >
            <option value="">Please select the game</option>
            {Object.keys(currentGame).map((key) => (
              <option key={key} value={key}>
                {currentGame[key].title}
              </option>
            ))}
          </Form.Select>

          <Form.Group controlId="formEventDate">
            <Form.Label>Date of the event</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of the event"
              name="date"
              value={currentEvent.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEventTime">
            <Form.Label>Time of the event</Form.Label>
            <Form.Control
              type="time"
              placeholder="Time of the event"
              name="time"
              value={currentEvent.time}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Label>Event Organizer</Form.Label>
          <Form.Select
            name="gamer"
            required
            value={currentEvent.gamer}
            onChange={handleChange}
          >
            <option value="">Please select the organizer</option>
            {Object.keys(currentEventOrganizer).map((key) => (
              <option key={key} value={key}>
                {currentEventOrganizer[key].bio}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number,
  update: PropTypes.bool,
};

EventForm.defaultProps = {
  id: null,
  update: undefined,
};

export default EventForm;
