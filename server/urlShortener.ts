import { Router } from 'express';
import { addNewUrl, getOriginalUrl, getStats } from './db/jsonDb';

const urlShortener = Router();

urlShortener.get("/stats", async (req, res) => {
    const { shortUrl } = req.query;

    if (!shortUrl || typeof shortUrl !== 'string' ) {
        return res.status(404).json({ error: "URL not found"})
    }

    const data = await getStats(shortUrl);
    if (!data) {
        return res.status(404).json({ error: "URL not found" });
    }
    return res.json(data);
});

urlShortener.post("/addUrl", async (req, res) => {
    const shortUrl = await addNewUrl(req.body.url);
    console.log(JSON.stringify({ shortUrl }, null, 2));
    return res.json({ shortUrl });
});

urlShortener.get("/u/:shortUrl", async (req, res) => {
    const longUrl = await getOriginalUrl(req.params.shortUrl);
    if (!longUrl) {
        return res.status(404).json({ error: "URL not found" });
    }
    return res.redirect(longUrl)
});





export { urlShortener };