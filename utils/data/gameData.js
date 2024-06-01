import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games`, {
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

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGame = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const deleteGame = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gametypes`, {
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
  createGame, getSingleGame, getGames, updateGame, getGameTypes, deleteGame,
};
