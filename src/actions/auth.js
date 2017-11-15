import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const startGoogleLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider);

export const startGithubLogin = () => () => firebase.auth().signInWithPopup(githubAuthProvider);

export const startLogout = () => () => firebase.auth().signOut();

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const logout = () => ({
  type: 'LOGOUT',
});

