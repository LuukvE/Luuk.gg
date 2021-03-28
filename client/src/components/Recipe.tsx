import './Recipe.scss';
import React, { FC, ChangeEvent } from 'react';
import { parseJSON, format } from 'date-fns';
import Markdown from 'react-markdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useDispatch, useSelector, actions } from '../store';
import { Recipe as RecipeType } from '../types';
import useRecipes from '../hooks/useRecipes';

const Recipe: FC<{ recipe: RecipeType; uploadFile: (file: File, cid: string) => void }> = ({
  recipe,
  uploadFile
}) => {
  const dispatch = useDispatch();
  const { loading, saveRecipes } = useRecipes();
  const { user, cooking } = useSelector((state) => state);
  const { editId, openId } = cooking;

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
              <img src="https://s3.eu-central-1.amazonaws.com/luuk.gg/luuk.jpg" alt="" /> Luuk van
              Egeraat
            </>
          )}
          <small>{recipe.created && format(parseJSON(recipe.created), 'dd-MM-yyyy')}</small>
        </div>
        {recipe.creator === user?.email && (
          <Form.Control
            className="upload-image"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              [].map.call(e.target.files, (file: File) => uploadFile(file, recipe.cid));
            }}
            accept="image/jpeg"
          />
        )}
      </div>
      {editId !== recipe.cid && (
        <div className="content">
          <h1>{recipe.name}</h1>
          <div className="meta">
            <small>
              <b>Difficulty:</b> <span className={`difficulty-icon level-${recipe.difficulty}`} />
            </small>
            {recipe.duration && (
              <small>
                <b>Duration:</b> {recipe.duration}
              </small>
            )}
          </div>
          {openId === recipe.cid && (
            <div className="text">
              <Markdown>{recipe.text}</Markdown>
            </div>
          )}
          <div
            onClick={() => {
              dispatch(
                actions.setCooking({
                  openId: openId === recipe.cid ? null : recipe.cid
                })
              );
            }}
            className="toggle"
          >
            {openId === recipe.cid ? (
              <span>
                <i className="fas fa-chevron-up" />
              </span>
            ) : (
              <b>
                <i className="fas fa-chevron-down" />
              </b>
            )}
          </div>
          {editId === null && recipe.creator === user?.email && (
            <Button
              onClick={() => {
                dispatch(actions.setCooking({ editId: recipe.cid }));
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
      {editId === recipe.cid && (
        <div className="content">
          <Form.Control
            placeholder="Title"
            className="edit-title"
            value={recipe.name}
            onChange={(e) => {
              dispatch(
                actions.updateRecipe({
                  cid: recipe.cid,
                  name: e.target.value
                })
              );
            }}
          />
          <div className="meta">
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
                      cid: recipe.cid,
                      difficulty: parseInt(e.target.value, 10)
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
                      cid: recipe.cid,
                      duration: e.target.value
                    })
                  );
                }}
              />
            </small>
          </div>
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
                    cid: recipe.cid,
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

              if (body.response) dispatch(actions.setCooking({ editId: null }));
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
              dispatch(actions.setCooking({ deleteId: recipe.cid }));
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
