import { io } from '../app';
import { fetch, fetchedQuestions } from '../utils/fetchQuestions';

let adminLock: boolean = true;
let adminId: String = null;

io.on('connection', (socket) => {
  socket.on('adminLogin', (password, cb): void => {
    if (password === process.env.ADMIN_PASSWORD) {
      adminLock = true;
      adminId = socket.id;
      process.stdout.write('Admin LoggedIn: Ready to KickOff\n\n');
      cb(true);
      return null;
    }
    cb(false);
    return null;
  });
  socket.on('emitQuestion', (): void => {
    if (socket.id === adminId) {
      socket.emit('question', fetchedQuestions[0]);
    }
  });
  socket.on('disconnect', () => {
    if (socket.id === adminId) {
      adminId = null;
      process.stdout.write('Admin LoggedOut\n\n');
      return null;
    }
  });
});
