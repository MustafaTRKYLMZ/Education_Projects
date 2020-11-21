export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };




interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description:string;
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description:string;
    exerciseSubmissionLink: string;
  }
  interface CoursePartFour extends CoursePartBase {
    name: "State handling";
    description:string;
    anotherAttribute: string;
  }
export type coursePart = CoursePartOne | CoursePartTwo | CoursePartThree |CoursePartFour;