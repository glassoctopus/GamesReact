import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/GameCard';
import { getSingleGame } from '../../utils/data/gameData';

export default function Game() {
  const [aGame, setaGame] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then((data) => setaGame(data));
  }, [id]);

  return (
    <article className="games">
      <h1>Game</h1>
      <Button
        onClick={() => {
          router.push(`/games/update/${id}`);
        }}
      >
        Edit this Game
      </Button>

      <section key={`game--${aGame.id}`} className="game">
        <GameCard title={aGame.title} maker={aGame.maker} numberOfPlayers={aGame.number_of_players} skillLevel={aGame.skill_level} id={aGame.id} />
      </section>

    </article>
  );
}
