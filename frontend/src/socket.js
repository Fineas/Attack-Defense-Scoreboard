import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =  "34.159.195.22:3000";

export const socket = io(URL);