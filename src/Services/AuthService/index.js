import * as firebase from 'firebase';

export default class AuthService{
    static registerAuthObserver(callback){
        firebase.auth().onAuthStateChanged((user) => {
          callback(user);
        });
    }

    static async login(email, password) {
        let error = '';
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (err) {
          console.log("AuthApi -> login -> error", err)
          error = err.message;
        }
        return error;
    }

    static async logout() {
        let error = '';
        try {
          await firebase.auth().signOut()
        } catch (err) {
          console.log("AuthApi -> signUp -> error", err)
          error = err.message;
        }
        return error;
    }

    static async singUp(email,password) {
        let error = '';
        try{
            firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(err){
            error = err.message;
        }
        return error;
    }
}