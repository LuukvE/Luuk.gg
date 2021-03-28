import { useCallback } from 'react';

import { defaultRecipes } from '../constants';
import { AWSUploadResponse, Recipe } from '../types';
import { useSelector, useDispatch, actions } from '../store';

import useGraphQL from './useGraphQL';

const useRecipes = () => {
  const dispatch = useDispatch();
  const { loading, request } = useGraphQL();
  const { user, cooking } = useSelector((state) => state);
  const { recipes } = cooking;

  // Get pre-signed URL to upload an image to AWS S3
  const upload = useCallback(
    async (filename: string) => {
      const { error, response } = await request({
        query: `query {
        recipe {
          uploadImage(fileName: "${filename}") {
            link
            upload
          }
        }
      }`
      });

      if (error) return { error };

      return { response: response.data.recipe.uploadImage as AWSUploadResponse };
    },
    [request]
  );

  // Save recipes to AWS S3
  const saveRecipes = useCallback(async () => {
    const payload = recipes.filter((recipe) => recipe.creator === user?.email);

    const { response, error } = await request({
      variables: payload.reduce((memo: { [key: string]: Recipe }, recipe, index) => {
        memo[`_${index}`] = recipe;

        return memo;
      }, {}),
      query: `mutation(${payload.map((_, index) => `$_${index}: RecipePayload`).join(', ')}) {
        recipe {
          ${payload
            .map(
              (_, index) => `_${index}: save (recipe: $_${index}) {
                  cid
                  name
                  duration
                  creator
                  difficulty
                  image
                  text
                  created
                  deleted
                }
              `
            )
            .join('')}
        }
      }
      `
    });

    if (error) return { error };

    const result = Object.values(response.data.recipe as Recipe[]).filter(
      (recipe) => !recipe.deleted
    );

    dispatch(
      actions.setCooking({
        recipes: [...result, ...defaultRecipes]
      })
    );

    return { response };
  }, [recipes, user, request, dispatch]);

  // Load recipes from AWS S3
  const loadRecipes = useCallback(async () => {
    const { response, error } = await request({
      query: `query {
        recipe {
          getAll {
            cid
            name
            duration
            creator
            difficulty
            image
            text
            created
          }
        }
      }
      `
    });

    if (error) return { error };

    dispatch(
      actions.setCooking({
        recipes: [...response.data.recipe.getAll, ...defaultRecipes]
      })
    );

    return { error, response };
  }, [request, dispatch]);

  return {
    upload,
    loading,
    saveRecipes,
    loadRecipes
  };
};

export default useRecipes;
