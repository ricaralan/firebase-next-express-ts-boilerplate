import { Request, Response } from 'express';
import DummyModel from '../models/DummyModel';

export default class DummyController {

    static sayHello(req: Request, res: Response) {
        res.send('Hello world!');
    }

    static async insert(req: Request, res: Response) {
        const data = await DummyModel.insert();

        res.send(data);
    }

}
