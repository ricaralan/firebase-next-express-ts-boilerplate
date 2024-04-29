import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth }       from 'firebase-admin/auth';
import { getDatabase }   from 'firebase-admin/database';
import { getFirestore }  from 'firebase-admin/firestore';

const app = initializeApp({
    credential:    applicationDefault(),
    databaseURL:   'https://<PROJECT_ID>-default-rtdb.firebaseio.com',
    storageBucket: '<PROJECT_ID>.appspot.com',
});
export const firebaseAuth = getAuth(app);
export const realtimeDB   = getDatabase(app);
export const firestore    = getFirestore(app);
