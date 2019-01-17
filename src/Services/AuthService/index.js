import * as firebase from 'firebase';

export default class AuthService{
    static async singUp(email,password) {
        let error = '';
        try{
            firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(err){
            error = err.code;
        }
        return error;
    }
}