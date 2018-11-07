import { auth } from './firebase';

// New User Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => 
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign Out
export const doSignOut = () =>
    auth.signOut();

// Start Password reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Start password change
export const doPasswordUpdate = (newPassword) =>
    auth.currentUser.updatePassword(newPassword);

export const onAuthStateChange = () => {
    return new Promise((res, rej) => {
        auth.onAuthStateChanged(function (user) {
            res(user);
        })
    })
}