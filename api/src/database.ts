import { QuerySnapshot } from '@google-cloud/firestore';
import { credential, initializeApp, ServiceAccount } from 'firebase-admin';

import service from '../google-service.json';

import { User, Github, Recipe } from './types';

export const firestore = initializeApp({
  credential: credential.cert(service as ServiceAccount)
}).firestore();

export const getUser = async (email: string): Promise<User | null> => {
  const document = firestore.doc(`users/${email.toLowerCase()}`);
  const snapshot = await document.get();
  const user = snapshot.data() as User | undefined;

  return user || null;
};

export const setUser = async (user: User): Promise<User> => {
  const document = firestore.doc(`users/${user.email.toLowerCase()}`);

  await document.set(user, { merge: true });

  const snapshot = await document.get();

  const update = snapshot.data();

  return update as User;
};

export const getGithub = async (): Promise<Github | null> => {
  const document = firestore.doc(`github/cache`);
  const snapshot = await document.get();
  const github = snapshot.data() as Github | undefined;

  return github || null;
};

export const setGithub = async (github: Github): Promise<Github> => {
  const document = firestore.doc(`github/cache`);

  await document.set(github);

  const snapshot = await document.get();

  const update = snapshot.data();

  return update as Github;
};

export const setRecipe = async (recipe: Recipe): Promise<Recipe | null> => {
  const document = firestore.doc(`recipes/${recipe.id}`);

  const findSnapshot = await document.get();

  const found = findSnapshot.data();

  if (found && found.creator !== recipe.creator) return null;

  await document.set(recipe);

  const snapshot = await document.get();

  const update = snapshot.data();

  return update as Recipe;
};

export const deleteRecipe = async (recipe: Recipe): Promise<null> => {
  const document = firestore.doc(`recipes/${recipe.id}`);

  const snapshot = await document.get();

  const found = snapshot.data();

  if (!found || found.creator !== recipe.creator) return null;

  await document.delete();

  return null;
};

export const findRecipes = async (filter: { [key: string]: string | null }): Promise<Recipe[]> => {
  const results: Recipe[] = [];
  const query = Object.keys(filter).reduce(
    (query: any, key) => query.where(key, '==', filter[key]),
    firestore.collection('recipes')
  );

  const snapshot: QuerySnapshot = await query.get();

  snapshot.forEach((doc) => {
    const session = doc.data();

    results.push({
      ...session,
      created: session.created.toDate()
    } as Recipe);
  });

  return results;
};
