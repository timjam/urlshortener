import { JsonDB, Config } from 'node-json-db';
import * as crypto from 'crypto';
import { z } from 'zod';

const db = new JsonDB(new Config("shortUrls", true, true, '/'));

export const UrlStats = z.object({
    shortUrl: z.string(),
    originalUrl: z.string(),
    accessed: z.record(z.number()),
});

export type UrlStats = z.infer<typeof UrlStats>;

export const AllData = z.record(UrlStats);

export type AllData = z.infer<typeof AllData>;

const urlExists = async (url: string) => {
    try {
        const urls = await db.getData('/');

        const parsedUrls = AllData.parse(urls);

        const existing = Object.values(parsedUrls).filter((item) => item.originalUrl === url);

        if (existing.length !== 1) {
            return null;
        }
        
        return existing[0];
    } catch (error) {
        console.error(`Faulty item in db - ${error}`);
        return null;
    }
};

export const addNewUrl = async (longUrl: string) => {

    const exists = await urlExists(longUrl);

    if (exists) {
        return exists.shortUrl;
    }

    const url = longUrl.split('://').pop();

    if (!url) {
        throw new Error('Invalid URL');
    }

    const shortUrl = crypto.createHash('md5').update(url).digest("hex")

    const urlStats: UrlStats = {
        shortUrl,
        originalUrl: longUrl,
        accessed: {}
    };

    db.push(`/${shortUrl}`, urlStats);

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
    try {
        const data = await db.getData(`/${shortUrl}`);
        return data;

    } catch (error) {
        console.error(`Couldn't find stats for ${shortUrl} - ${error}`);
        return null;
    }
}

export const deleteUrl = async (shortUrl: string) => {
    try {
        db.delete(`/${shortUrl}`);
        return true;
    } catch (error) {
        console.error(`Couldn't delete ${shortUrl} - ${error}`);
        return false;
    }
};