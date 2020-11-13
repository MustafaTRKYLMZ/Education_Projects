const express = require( "express" );
const bodyParser = require("body-parser");
import { bmiCalculat } from './bmiCalculator';

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});