const express = require( "express" );
import bodyParser from "body-parser";
import { bmiCalculat } from './bmiCalculator';
import { exerciseCalculator} from './exerciseCalculator'

interface Body {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi',(reg,res) => {
    const height = String(reg.query.height);
    const weight = String(reg.query.weight);
    const answer: string = bmiCalculat(height, weight);
  
    if (!reg.query.height || !reg.query.weight) {
      res.send({ answer });
    } else {
      res.json({ weight, height, answer });
    }

})

app.post('/exercises', (req, res: Response) => {
  const body = req.body as Body;
 
  const target: number = body.target;
  const daily_exercises: number[] = body.daily_exercises;

  const answer = exerciseCalculator(daily_exercises, target);

  res.json({ answer });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});