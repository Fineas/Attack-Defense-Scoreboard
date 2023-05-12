import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =  "ctfx.hacktm.ro:8443";

export const socket = io(URL);