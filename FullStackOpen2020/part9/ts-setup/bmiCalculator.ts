export function  bmiCalculat(height: string, weight: string) {

    const bmiCalculator = (a: number, b: number) => {
        if (!a || !b) throw new Error('malformatted parameters');
        const height = a / 100;
        const square: number = height * height;
        const result = b / square;
        if (result <= 15) return 'Severely underweight';
        else if (result <= 16) return 'Underweight';
        else if (result <= 25) return 'Normal (healthy weight)';
        else return 'Overweight';
      };

      try {
        return bmiCalculator(Number(height), Number(weight));
    } catch (e) {
      return e.message;
    }
  }


