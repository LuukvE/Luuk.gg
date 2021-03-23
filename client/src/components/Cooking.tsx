import './Cooking.scss';
import React, { FC } from 'react';
import Markdown from 'react-markdown';

import { useSelector } from '../store';

const Cooking: FC = () => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div className="Cooking">
      {recipes.map((recipe, index) => (
        <div className="recipe" key={index}>
          {!!recipe.image && <img src={recipe.image} alt="" />}
          <div className="content">
            <h1>{recipe.name}</h1>
            <small>
              <b>Difficulty:</b> {recipe.difficulty}
            </small>
            <small>
              <b>Duration:</b> {recipe.duration}
            </small>
            <div className="text">
              <Markdown>{recipe.text}</Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cooking;
