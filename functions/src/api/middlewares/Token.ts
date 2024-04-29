import { Request, Response, NextFunction } from 'express';
import { firebaseAuth } from '../../config/firebase';

// Verify if exists token
export function ExistsToken(req: Request, res: Response, next?: NextFunction) {
    _verifyTokenRequest(req)
    .then(() => {
        next();
    })
    .catch(_handleTokenCatch(res));
}

// Verify if exists token and set user to request
export function SetUserRequestByToken(req: Request, res: Response, next?: NextFunction) {
    _verifyTokenRequest(req)
    .then(() => {
        const token = req.headers.authorization.split('Bearer ')[1];

        return firebaseAuth.verifyIdToken(<string> token);
    })
    .then(function(decodedToken) {
        req.userDataToken = decodedToken;
        next();
    })
    .catch(_handleTokenCatch(res));
}

function _verifyTokenRequest(req: Request) {
    return new Promise((resolve, reject) => {   
        const { token } = req.headers;
        
        if(!token) {
            return reject({
                type: 'custom',
                message: 'El token de acceso es requerido en los headers'
            });
        } else if(typeof token !== 'string') {
            return reject();
        }

        return resolve(true);
    });
}

function _handleTokenCatch(res: Response) {
    return (error) => {
        let message = 'El token de acceso no es válido';
        if(error && error.message && error.message.indexOf('expired') > 0) {
            message = 'El token que intentas utilizar ha expirado';
        }

        if(error && error.type) {
            message = error.message;
        } 

        res.status(401).send({ message });
    }
}
