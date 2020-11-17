export const  bmiCalculat= (height: string, weight: string):string => {

      let answer = '';
      try {
        if (!height || !weight) throw new Error('malformatted parameters');
        const height = Number(height) / 100;
        const square: number = height * height;
        const result = Number(weight) / square;
        if (result <= 15) return 'Severely underweight';
        else if (result <= 16) return 'Underweight';
        else if (result <= 25) return 'Normal (healthy weight)';
        else answer= 'Overweight';
      } catch (e:unknown){
        if(e instanceof Error ) {
          answer = e.message
        }
      };

    return answer;
  };


