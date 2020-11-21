import React from 'react';
import { coursePart } from '../types'


const Total : React.FC<{ courseParts: Array<coursePart> }> = ({ courseParts }) => {
    return (
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      );
    };

export default Total