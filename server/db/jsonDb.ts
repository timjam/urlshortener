import { JsonDB, Config } from 'node-json-db';
import * as crypto from 'crypto';

const db = new JsonDB(new Config("shortUrls", true, true, '/'));

export const addNewUrl = (longUrl: string) => {
    const url = longUrl.split('://').pop();

    if (!url) {
        throw new Error('Invalid URL');
    }

    const shortUrl = crypto.createHash('md5').update(url).digest("hex")

    db.push(`/${shortUrl}`, {
        shortUrl,
        originalUrl: longUrl,
        accessed: {}
    });

    return shortUrl;
};

export const getOriginalUrl = async (shortUrl: string) => {
    try {
        const data = await db.getData(`/${shortUrl}`);

        if (!data) {
            return null;
        }

        const today = new Date().toISOString().split('T')[0];

        db.push(`/${shortUrl}`, {
            ...data,
            accessed: {
                [today]: (data.accessed[today] || 0) + 1
            }
        });

        return data.originalUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getStats = async (shortUrl: string) => {
    const data = await db.getData(`/${shortUrl}`);
    return data;
}