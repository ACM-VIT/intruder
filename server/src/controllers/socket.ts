import { io } from '../app';
import {
  fetch,
  QuestionGetter,
  Question,
  Attempt,
} from '../utils/fetchQuestions';
import * as jwt from '../utils/jwt';

interface Users {
  [prop: string]: string;
}

// Configuration vars
let questionsFetched = false;
let adminLock = true;
let initialized = false;
let criticalState = false;
let gotMessage = false;

// State vars
const users: Users = {};
let prevScorer: string = null;
let prevScorerSocket: string = null;
let prevScorerMessage: string = null;
let currentQuestion: Question = null;
let adminId: string = null;
let statsId: string = null;

// Timers
let successMessageTimer: any = null;

// Set-Timer methods
const setCriticalStateTimer = (): void => {
  setTimeout(() => {
    prevScorer = null;
    prevScorerSocket = null;
    prevScorerMessage = null;
    criticalState = false;
    gotMessage = false;
    const socket = io.sockets.connected[prevScorerSocket];
    if (!socket) {
      io.emit('question', currentQuestion);
    } else {
      socket.broadcast.emit('question', currentQuestion);
    }
  }, 5000);
};
const setSuccessMessageTimer = (): void => {
  successMessageTimer = setTimeout(() => {
    gotMessage = true;
    const socket = io.sockets.connected[prevScorerSocket];
    prevScorerMessage = '';
    if (!socket) {
      io.emit('successMessage', { username: prevScorer, message: prevScorerMessage });
    } else {
      socket.broadcast.emit('successMessage', {
        username: prevScorer,
        message: prevScorerMessage,
      });
    }
    io.to(prevScorerSocket).emit('question', currentQuestion);
    setCriticalStateTimer();
  }, 7000);
};

const connectionFunc = (socket): void => {
  socket.on('adminLogin', (password, cb): void => {
    if (adminId !== null) {
      cb(false);
      socket.disconnect();
      return null;
    }
    if (password === process.env.ADMIN_PASSWORD) {
      adminLock = true;
      adminId = socket.id;
      process.stdout.write('Admin LoggedIn, Ready to KickOff!\n\n');
      cb(true);
      return null;
    }
    socket.disconnect();
    cb(false);
    return null;
  });
  socket.on('statsListenerLogin', (password, cb): void => {
    if (statsId !== null) {
      cb(false);
      socket.disconnect();
      return null;
    }
    if (password !== process.env.STATS_PASSWORD) {
      cb(false);
      socket.disconnect();
      return null;
    }
    statsId = socket.id;
    cb(true);
    if (criticalState) {
      socket.emit('intruderMessage', { username: prevScorer, message: prevScorerMessage });
    }
    return null;
  });
  socket.on('emitQuestion', (cb): void => {
    if (questionsFetched && socket.id === adminId && !initialized) {
      currentQuestion = QuestionGetter.get();
      io.emit('question', currentQuestion);
      initialized = true;
      cb(true);
      io.to(statsId).emit('initialized');
    }
    cb(false);
  });
  socket.on('skip', (): void => {
    if (!criticalState && socket.id === adminId) {
      criticalState = true;
      prevScorer = 'Admin';
      prevScorerMessage = '';
      currentQuestion = QuestionGetter.get();
      const finished = (currentQuestion === null);
      io.emit('success', { username: prevScorer, finished });
      io.emit('successMessage', { username: prevScorer, message: prevScorerMessage });
      io.to(statsId).emit('intruded', { username: prevScorer });
      io.to(statsId).emit('intruderMessage', {
        username: prevScorer,
        message: prevScorerMessage,
      });
      setCriticalStateTimer();
    }
  });
  socket.on('join', (token, cb): void => {
    let payload: any;
    try {
      payload = jwt.verify(token);
      users[socket.id as string] = payload.username;
      if ((prevScorer === payload.username) && socket.connected && !gotMessage) {
        prevScorerSocket = socket.id;
        socket.emit('messageRequired');
      }
      if (currentQuestion !== null && socket.connected
        && (!criticalState || prevScorer === payload.username)) {
        socket.emit('question', currentQuestion);
      } else {
        socket.emit('criticalState');
      }
      cb(true);
    } catch (err) {
      cb(false);
      socket.disconnect();
    }
  });
  socket.on('submit', (solution): void => {
    if (criticalState) {
      return null;
    }
    const username: string = users[socket.id];
    if (!username || !solution || typeof solution !== 'string') {
      return null;
    }
    const attempt: Attempt = { username, solution };
    currentQuestion.checkSolution(attempt, (bool: boolean): void => {
      if (bool) {
        criticalState = true;
        prevScorerSocket = socket.id;
        prevScorer = username;
        currentQuestion = QuestionGetter.get();
        const finished = (currentQuestion === null);
        socket.broadcast.emit('success', { username, finished });
        socket.emit('pass');
        io.to(statsId).emit('intruderSuccess', { username, finished });
        setSuccessMessageTimer();
      } else {
        socket.emit('fail');
        io.to(statsId).emit('intruded', { username });
      }
    });
    return null;
  });
  socket.on('successMessage', (message): void => {
    if (users[socket.id] !== prevScorer) {
      return null;
    }
    clearTimeout(successMessageTimer);
    successMessageTimer = null;
    gotMessage = true;
    socket.broadcast.emit('successMessage', { username: prevScorer, message });
    io.to(statsId).emit('intruderMessage', { useranme: prevScorer, message });
    socket.emit('question', currentQuestion);
    setCriticalStateTimer();
    return null;
  });
  socket.on('disconnect', () => {
    if (socket.id === adminId) {
      adminId = null;
      process.stdout.write('Admin LoggedOut\n\n');
      return null;
    }
    if (socket.id === statsId) {
      statsId = null;
      process.stdout.write('Stats Listener LoggedOut\n\n');
      return null;
    }
    delete users[socket.id];
    return null;
  });
};

const registerIO = (): void => {
  io.on('connection', connectionFunc);
  fetch(() => {
    questionsFetched = true;
    io.to(adminId).emit('ready');
    process.stdout.write('Questions fetched successfully\n\n');
  });
};

export default registerIO;
