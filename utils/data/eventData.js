import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(() => resolve())
    .catch(reject);
});

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

const getGamers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gamers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getGamer = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gamers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  createEvent, getSingleEvent, updateEvent, getEvents, getGamers, getGamer,
};
