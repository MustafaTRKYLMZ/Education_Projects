

interface CalculateValue {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  interface ObjectValues {
    target: number;
    days: number[];
  }
  
  const parsedArguments = (args: Array<string>): ObjectValues => {
    if (args.length < 4) throw new TypeError('Not enough arguments');
  
    const Arr = args.slice(3);
  
    for (let i = 0; i < Arr.length; i++) {
      if (isNaN(Number(Arr[i]))) {
        throw new TypeError('Provided values were not number!');
      }
    }
   
    const newArr = Arr.map((i) => Number(i));
  
    return {
      target: Number(args[2]),
      days: newArr,
    };
  };
  
  export const calculateExercises = (arry: number[], target: number): CalculateValue => {
    
    if (!arry || !target) throw new TypeError('parameters missing');
    console.log('TypeOf Array : ', typeof arry);
    if (typeof arry !== 'object' || typeof target !== 'number')
      throw new TypeError('malformatted parameters');
    const periodLength = arry.length;

    const sumReducer = function (accumulator: number, currentValue: number) {
      return accumulator + currentValue;
    };
    const training = () => {
      let check = 0;
     
      for (let i = 0; i < arry.length; i++) {
  
        if (arry[i] !== 0) check++;
        console.log('check : ', check);
      }
      return check;
    };
  
    const trainingDays = training();
  
    const average: number = arry.reduce(sumReducer) / periodLength;
    const success = () => {
      if (average >= target) return true;
      else return false;
    };
  
    const rate = () => {
      const times = target * arry.length;
      const division = times / 3;
      const sum = arry.reduce(sumReducer);
  
      if (sum >= 2 * division) return 3;
      else if (sum < 2 * division) return 2;
      else return 1;
    };
  
    const description = () => {
      const rates = rate();
      if (rates === 3) return 'awesome';
      else if (rates === 2) return 'not too bad but could be better';
      else return 'meh';
    };
  
    const returned = {
      periodLength: arry.length,
      trainingDays: trainingDays,
      success: success(),
      rating: rate(),
      ratingDescription: description(),
      target: target,
      average: average,
    };
    return returned;
  };
  let answer = '';
  try {
    const { target, days } = parsedArguments(process.argv);
    
    calculateExercises(days, target);

  } catch (e) {
    if (e instanceof Error) answer = e.message;
    console.log('Error, something bad happened, message: ', answer);
  }
