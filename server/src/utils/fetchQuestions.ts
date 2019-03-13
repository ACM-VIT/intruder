import UserModel from '../models/user';
import QuestionModel from '../models/question';

interface Attempt {
  username: string;
  solution: any;
  correct: boolean;
}

class Question {
  private static num: number = 0;
  error: string = null;
  content: any = {};
  number: number = -1;
  attempts: Array<Attempt> = [];
  successfulAttempt: Attempt = null;
  solution: any = null;
  score: number = -1;
  constructor(cb: (b: boolean) => void) {
    QuestionModel.findOne({ number: Question.num + <number>1 }).then((que: any) => {
      this.content = que.content;
      this.number = que.number;
      this.solution = que.solution;
      this.score = que.score;
      cb(true);
    }).catch((err) => {
      this.error = err.message;
      cb(false);
    });
    Question.num += 1;
  };
  checkSolution(attempt: Attempt, cb) {
    if (attempt.solution === this.solution) {
      process.stdout.write(`${attempt.username} intruded by answering Question: ${this.number}\n`);
      cb(true);
      this.successfulAttempt = attempt;
      UserModel.update({ username: attempt.username }, {
        $inc: { score: this.score },
      }).then(() => {
        process.stdout.write('Score saved\n\n');
      }).catch((err) => {
        process.stderr.write(`Error saving score: ${err.message}\n\n`);
      });
      QuestionModel.update({ number: this.number }, {
        $push: { attempts: attempt },
        $set: { successfulAttempt: attempt },
      }).then(() => {
        process.stdout.write('Final state saved successfully\n\n');
      }).catch((err) => {
        process.stderr.write(`Error saving final state: ${err.message}\n\n`);
      });
    }
    cb(false);
    QuestionModel.update({ number: this.number }, {
      $push: { attempts: attempt },
    }).then(() => {
      process.stdout.write('State saved successfully\n');
    }).catch((err) => {
      process.stderr.write(`Error saving state: ${err.message}\n`);
    });
    this.attempts.push(attempt);
  }
}

const fetchedQuestion: Array<Question> = [];

function fetch(notify: () => void): void {
  let totalCount: number = -1;
  let count: number = 0;
  const cb = (bool: boolean): void => {
    if (!bool) {
      process.stderr.write(`Error fetching question\n`);
      process.exit(1);
    }
    count += 1;
    if (count === totalCount) {
      notify();
    }
  }
  QuestionModel.countDocuments({}).then((data) => {
    totalCount = data;
    for (let i = 0; i < data; i += 1) {
      let que = new Question(cb);
      fetchedQuestion.push(que);
    }
  }).catch((err) => {
    process.stderr.write(`Error counting questions: ${err.message}\n`);
    process.exit(1);
  });
}

export { fetch, fetchedQuestion };
