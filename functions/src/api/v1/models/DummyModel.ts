import { firestore } from '../../../config/firebase';

export default class DummyModel {

    static doSomething() {}

    static async insert() {
        try {
            const docRef = firestore.collection('users').doc('alovelace');

            await docRef.set({
                first: 'Ada',
                last: 'Lovelace',
                born: 1815
            });

            return {
                insertedId: docRef.id,
            };
        } catch(error) {
            console.log(error);
        }
    }

    static async list() {
        return {};
    }

}
