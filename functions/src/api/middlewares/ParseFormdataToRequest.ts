import { Request, Response, NextFunction } from 'express';
import Busboy from 'busboy';

export function ParseFormdataToRequest(req: Request, res: Response, next?: NextFunction) {
    const { headers } = req;
    const busboy      = Busboy({ headers });
    req.fields        = {};
    req.files         = {};

    busboy.on('field', (fieldname: string, val) => {
        req.fields[fieldname] = val;
    });

    busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string, encoding: string, mimeType: string }) => {
        const chunks: Buffer[] = [];
        file.on('data', (data: Buffer) => {
            chunks.push(data);
        });

        file.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const file_object = {
                filename: info.filename,
                buffer,
                encoding: info.encoding,
                mimeType: info.mimeType
            };

            if (req.files[fieldname]) {
                if (Array.isArray(req.files[fieldname])) {
                    req.files[fieldname].push(file_object);
                } else {
                    req.files[fieldname] = [req.files[fieldname], file_object];
                }
            } else {
                req.files[fieldname] = [file_object];
            }
        });
    });

    busboy.on('finish',() => {
        next();
    });

    busboy.pipe(req.body);
}
