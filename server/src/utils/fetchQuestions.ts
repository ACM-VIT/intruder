import { User as UserModel } from '../models/user';
import QuestionModel from '../models/question';

export interface Attempt {
  username: string;
  solution: any;
}

class Question {
  private static num: number = 0;

  public error: string = null;

  public content: any = {};

  public number: number = -1;

  public attempts: Attempt[] = [];

  public successfulAttempt: Attempt = null;

  public solution: any = null;

  public score: number = -1;

  public constructor(cb: (b: boolean) => void) {
    QuestionModel.findOne({ number: Question.num + 1 as number }).then((que: any) => {
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
  }

  public checkSolution(attempt: Attempt, cb): void {
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
      return null;
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
    return null;
  }
}

class QuestionGetter {
  private static readonly fetchedQuestions: Question[] = [];

  private static curNum: number = -1;

  public static push(que: Question): void {
    QuestionGetter.fetchedQuestions.push(que);
  }

  public static get(): Question {
    QuestionGetter.curNum += 1;
    if (QuestionGetter.curNum < QuestionGetter.fetchedQuestions.length) {
      return QuestionGetter.fetchedQuestions[QuestionGetter.curNum];
    }
    return null;
  }
}

function fetch(notify: () => void): void {
  let totalCount: number = -1;
  let count = -1;
  const cb = (bool: boolean): void => {
    if (!bool) {
      process.stderr.write('Error fetching question\n');
      process.exit(1);
    }
    count += 1;
    if (count === totalCount) {
      notify();
    }
  };
  QuestionModel.countDocuments({}).then((data) => {
    totalCount = data;
    cb(true);
    for (let i = 0; i < data; i += 1) {
      const que = new Question(cb);
      QuestionGetter.push(que);
    }
  }).catch((err) => {
    process.stderr.write(`Error counting questions: ${err.message}\n`);
    process.exit(1);
  });
}

export {
  fetch,
  QuestionGetter,
  Question,
};
