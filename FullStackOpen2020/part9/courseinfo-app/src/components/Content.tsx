import React from "react";
import { coursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: Array<coursePart> }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) =>
        <Part key={part.name} part={part} />
      )}
    </div>
  );
};

export default Content;