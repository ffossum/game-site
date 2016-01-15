import io from 'socket.io-client';

const socket = io(`${location.protocol}//${location.hostname}:8080`);

export default socket;
