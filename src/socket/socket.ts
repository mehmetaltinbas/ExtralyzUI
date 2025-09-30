// import { io } from 'socket.io-client';

// const socket = io(`${import.meta.env.VITE_API_URL}`, {
//     transports: ['websocket'],
//     withCredentials: true,
// });

// socket.on('connect', () => {
//     console.log('connected');
// });

// socket.on('connect_error', (error) => {
//     console.log(error.message);
// });

// export function dispatchAcknowledgement(eventName: string): Promise<any> {
//     return new Promise((resolve) => {
//         socket.emit(eventName, (response: any) => {
//             resolve(response);
//         });
//     });
// }
