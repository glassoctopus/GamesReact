import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then((data) => {
      // Extract the necessary fields from nested objects
      const events = data.map((event) => ({
        id: event.id,
        description: event.description,
        date: event.date,
        time: event.time,
        gameTitle: event.game.title,
        gamer: event.organizer.bio,
      }));
      resolve(events);
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents };
