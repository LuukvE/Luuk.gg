import './Cooking.scss';
import React, { FC, useCallback, useState, useEffect, useRef, ChangeEvent } from 'react';
import Markdown from 'react-markdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useSelector, useDispatch, actions } from '../store';
import useAWS from '../hooks/useAWS';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const Cooking: FC = () => {
  const dispatch = useDispatch();
  const saveOnChange = useRef(false);
  const { loading, upload, saveRecipes, loadRecipes } = useAWS();
  const { recipes, user } = useSelector((state) => state);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // When signed in, load recipes created by the user
  useEffect(() => {
    if (user) loadRecipes();
  }, [user, loadRecipes]);

  // When saveOnChange is true and recipes change, save them
  useEffect(() => {
    if (!saveOnChange.current) return;

    saveRecipes();

    saveOnChange.current = false;
  }, [recipes, saveOnChange, saveRecipes]);

  // Upload an image selected by the user and save it
  const uploadFile = useCallback(
    (file: File, index: number) => {
      upload(file.name).then(async ({ error, response }) => {
        if (error || !response) return;

        // Create a form to POST to AWS
        const form = new FormData();

        // Add all fields required for the pre-signed URL upload to succeed
        Object.keys(response.upload.fields).map((key) => {
          return form.append(key, response.upload.fields[key]);
        });

        // Add the image
        form.append('file', file);

        // Send the request straight to AWS
        await fetch(response.upload.url, {
          method: 'POST',
          mode: 'no-cors',
          body: form
        });

        // This enables the useEffect hook that saves the recipes
        // The hook will only trigger after the updateRecipes action has updated the store
        saveOnChange.current = true;

        // Update the store
        dispatch(
          actions.updateRecipe({
            image: response.link,
            index: index
          })
        );
      });
    },
    [upload, dispatch]
  );

  return (
    <div className="Cooking">
      <div className="sub-menu">
        <h1>Cooking Recipes {loading && <Spinner animation="border" />}</h1>
        {user ? (
          <>
            <Button
              variant="success"
              onClick={() => {
                dispatch(actions.addRecipe({}));

                setEditIndex(0);
              }}
            >
              <i className="fas fa-plus" /> Create
            </Button>
          </>
        ) : (
          <>
            Add your own recipes{' '}
            <a className="btn btn-primary" href={`${apiURL}/signin`} rel="noreferrer">
              <i className="fas fa-sign-in-alt" /> Sign in
            </a>
          </>
        )}
      </div>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div className="recipe" key={index}>
            {recipe.creator !== user?.email && !!recipe.image && <img src={recipe.image} alt="" />}
            {recipe.creator === user?.email && (
              <div className="image-placeholder">
                {!!recipe.image && <img src={recipe.image} alt="" />}
                <Form.Control
                  className="upload-image"
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    [].map.call(e.target.files, (file) => uploadFile(file, index));
                  }}
                  accept="image/jpeg"
                />
              </div>
            )}
            {editIndex !== index && (
              <div className="content">
                <h1>{recipe.name}</h1>
                <small>
                  <b>Difficulty:</b>{' '}
                  <span className={`difficulty-icon level-${recipe.difficulty}`} />
                </small>
                <small>
                  <b>Duration:</b> {recipe.duration}
                </small>
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
                  <b>Difficulty:</b>{' '}
                  <span className={`difficulty-icon level-${recipe.difficulty}`} />
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cooking;
