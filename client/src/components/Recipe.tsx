import './Recipe.scss';
import React, { FC, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { parseJSON, format } from 'date-fns';
import Markdown from 'react-markdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useDispatch, useSelector, actions } from '../store';
import { Recipe as RecipeType } from '../types';
import useAWS from '../hooks/useAWS';

const Recipe: FC<{
  index: number;
  recipe: RecipeType;
  editIndex: number | null;
  setEditIndex: Dispatch<SetStateAction<number | null>>;
  setDeleteIndex: Dispatch<SetStateAction<number | null>>;
  uploadFile: (file: File, index: number) => void;
}> = ({ index, recipe, editIndex, setEditIndex, setDeleteIndex, uploadFile }) => {
  const dispatch = useDispatch();
  const { loading, saveRecipes } = useAWS();
  const user = useSelector((state) => state.user);

  return (
    <div className="Recipe">
      <div className={`image-placeholder${recipe.creator === user?.email ? ' my-image' : ''}`}>
        {!!recipe.image && <img src={recipe.image} alt="" />}
        <div className="creator">
          {recipe.creator === user?.email ? (
            <>
              {user?.picture && <img src={user.picture} alt="" />} {user?.name}
            </>
          ) : (
            <>
              <img src="https://s3.eu-central-1.amazonaws.com/luuk.gg/luuk.jpg" alt="" /> Luuk van Egeraat
            </>
          )}
          <small>{recipe.created && format(parseJSON(recipe.created), 'dd-MM-yyyy')}</small>
        </div>
        {recipe.creator === user?.email && (
          <Form.Control
            className="upload-image"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              [].map.call(e.target.files, (file: File) => uploadFile(file, index));
            }}
            accept="image/jpeg"
          />
        )}
      </div>
      {editIndex !== index && (
        <div className="content">
          <h1>{recipe.name}</h1>
          <small>
            <b>Difficulty:</b> <span className={`difficulty-icon level-${recipe.difficulty}`} />
          </small>
          {recipe.duration && (
            <small>
              <b>Duration:</b> {recipe.duration}
            </small>
          )}
          <div className="text">
            <Markdown>{recipe.text}</Markdown>
          </div>
          {editIndex === null && recipe.creator === user?.email && (
            <Button
              onClick={() => {
                setEditIndex(index);
              }}
              variant="success"
            >
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <span>
                  <i className="fas fa-pencil-alt" /> Edit
                </span>
              )}
            </Button>
          )}
        </div>
      )}
      {editIndex === index && (
        <div className="content">
          <Form.Control
            placeholder="Title"
            className="edit-title"
            value={recipe.name}
            onChange={(e) => {
              dispatch(
                actions.updateRecipe({
                  index,
                  name: e.target.value
                })
              );
            }}
          />
          <small>
            <b>Difficulty:</b> <span className={`difficulty-icon level-${recipe.difficulty}`} />
            <Form.Control
              type="range"
              min={1}
              max={3}
              value={recipe.difficulty}
              className="edit-difficulty"
              onChange={(e) => {
                dispatch(
                  actions.updateRecipe({
                    index,
                    difficulty: e.target.value
                  })
                );
              }}
            />
          </small>
          <small>
            <b>Duration:</b>{' '}
            <Form.Control
              placeholder="10 min"
              className="edit-duration"
              value={recipe.duration}
              onChange={(e) => {
                dispatch(
                  actions.updateRecipe({
                    index,
                    duration: e.target.value
                  })
                );
              }}
            />
          </small>
          <div className="text">
            <Form.Control
              placeholder="Ingredients & Instructions"
              as="textarea"
              rows={8}
              className="edit-text"
              value={recipe.text}
              onChange={(e) => {
                dispatch(
                  actions.updateRecipe({
                    index,
                    text: e.target.value
                  })
                );
              }}
            />
            <Markdown>{recipe.text}</Markdown>
          </div>
          <Button
            onClick={async () => {
              const body = await saveRecipes();

              if (body.response) setEditIndex(null);
            }}
            variant="success"
          >
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <span>
                <i className="fas fa-save" /> Save
              </span>
            )}
          </Button>
          <Button
            onClick={() => {
              setDeleteIndex(index);
            }}
            variant="outline-danger"
          >
            <i className="fas fa-trash" /> Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
