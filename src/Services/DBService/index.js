import * as firebase from 'firebase';

let DB;

export default class DBService{
    static initDabatase(){
        var config = {
            apiKey: "AIzaSyC7MAAyGyAvQWNupeGHTsrZZeX0JRkbQvY",
            authDomain: "veenders-bbd96.firebaseapp.com",
            databaseURL: "https://veenders-bbd96.firebaseio.com",
            projectId: "veenders-bbd96",
            storageBucket: "veenders-bbd96.appspot.com",
            messagingSenderId: "352113342354"
          };
          firebase.initializeApp(config);

          DB = firebase.firestore();

          DB.settings({timestampsInSnapshots:true});
    }
    static async setDocumentWithId(collectionName, document, id){
        let success = true;
        
        try {
          await DB.collection(collectionName).doc(id).set(document, { merge: true });
        } catch (error) {
          success = false;
                console.log("​DatabaseApi -> updateDocument -> error", error)
        }
    
        return success;
    }
    
    static async addDocument(collectionName, document){
        let success = false;
        
        try {
            const docRef = await DB.collection(collectionName).add(document);
            if(docRef.id) {
                success = true;
            }
          
        } catch (error) {
                console.log("​DatabaseApi -> }catch -> error", error)
        }
    
        return success;
    }
    static async getRealtimeDocument(collectionName, filterName, filterValue, callback, comparator='=='){
        return DB.collection(collectionName).where(filterName, comparator, filterValue)
          .onSnapshot((querySnapshot) => {
            let result = null;
            querySnapshot.forEach((doc) => {
              result = doc.data();
              result.id = doc.id;
            });
            callback(result);
        });
    }
    static async getRealtimeContent(collectionName, callback){
        return DB.collection(collectionName).onSnapshot((querySnapshot) => {
            let content = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                content.push( { id: doc.id, ...data } );
            });
            callback(content);
        });
    }
    static async getDocumentById(collection, id){
        const query = DB.collection(collection).doc(id);
        const doc = await query.get();
        return { id: doc.id, ...doc.data()};
    }
    static async getDocument(collection, field,value,comparator='=='){
        const query = DB.collection(collection).where(field,comparator,value);
        let result = null;

        const querySnapshot = await query.get();
        querySnapshot.forEach((doc) => {
            result = { id: doc.id, ...doc.data()};
        });

        return result;
    }
    static async getFilteredContent(collection, field,value,comparator='=='){
        const query = DB.collection(collection).where(field,comparator,value);
        let result = [];

        const querySnapshot = await query.get();
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data()});
        });

        return result;
    }
    static async getContent(collection){
        let content=[];
        console.log('entramos en servicio');
        try{
            const querySnapshot = await DB.collection(collection).get()
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                content.push( { id: doc.id, ...data } );
            });
            return content
        }catch(error){
            console.error(error)
        }

    }
}