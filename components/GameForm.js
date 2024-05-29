import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createGame, getSingleGame, updateGame, getGameTypes,
} from '../utils/data/gameData';

const initialState = {
  title: '',
  maker: '',
  numberOfPlayers: 0,
  skillLevel: 1,
  gameTypeId: 0,
};

const GameForm = ({ user, id, update }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (update) {
      getSingleGame(id).then((data) => {
        setCurrentGame({
          title: data.title,
          maker: data.maker,
          number_of_players: data.numberOfPlayers,
          skill_level: data.skillLevel,
          game_type: data.gameTypeId,
          id,
        });
      });
    }
    getGameTypes().then(setGameTypes);
  }, [id, update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.numberOfPlayers),
      skill_level: Number(currentGame.skillLevel),
      game_type: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    if (!update) {
      createGame(game)
        .then(() => router.push('/games'))
        .catch((error) => {
          console.error('Error creating this game: ', error);
        });
    } else {
      updateGame(game)
        .then(() => router.push('/games'))
        .catch((error) => {
          console.error('Error updating this game: ', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          {/* TITLE INPUT  */}
          <Form.Label>Title</Form.Label>
          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a title, the game's name!"
              name="title"
              required
              value={currentGame.title}
              onChange={handleChange}
            />
          </FloatingLabel>

          {/* MAKER INPUT  */}
          <FloatingLabel controlId="floatingInput1" label="Creator" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a maker"
              name="maker"
              value={currentGame.maker}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* Number Of Players INPUT  */}
          <FloatingLabel controlId="floatingInput1" label="numberOfPlayers" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter the total number of Players"
              name="numberOfPlayers"
              value={currentGame.numberOfPlayers}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* skill Level INPUT  */}
          <FloatingLabel controlId="floatingInput1" label="skillLevel" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a skill Level value 1-10"
              name="skillLevel"
              value={currentGame.skillLevel}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* game Type INPUT  */}
          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="gameTypeId"
            required
            value={currentGame.gameType}
            onChange={handleChange}
          >
            <option value="">pick the type of game / genre</option>
            {gameTypes.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>
                {gameType.label}
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

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number,
  update: PropTypes.bool,
};

GameForm.defaultProps = {
  id: null,
  update: undefined,
};

export default GameForm;
