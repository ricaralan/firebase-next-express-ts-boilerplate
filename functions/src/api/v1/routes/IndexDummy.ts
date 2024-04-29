// import * as expressFormidable from 'express-formidable';
import DummyController from '../controllers/DummyController';
import { SetUserRequestByToken } from '../../middlewares/Token';

export class Get {

    index() {
        return {
            controllers: [
                (req, res) => {
                    res.send('Hello dummy world!');
                }
            ]
        };
    }

    hello() {
        return {
            controllers: [
                DummyController.sayHello
            ]
        };
    }

    private_hello() {
        return {
            controllers: [
                SetUserRequestByToken,
                DummyController.sayHello
            ]
        };
    }

    insert_demo() {
        return {
            controllers: [
                DummyController.insert
            ]
        };
    }

}

