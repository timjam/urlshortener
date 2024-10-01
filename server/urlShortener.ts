import { Router } from 'express';
import { addNewUrl, deleteUrl, getOriginalUrl, getStats } from './db/jsonDb';

const urlShortener = Router();

urlShortener.get("/urlStats", async (req, res) => {
    const { shortUrl } = req.query;

    if (!shortUrl || typeof shortUrl !== 'string' ) {
        return res.status(404).json({ error: "URL not found"})
    }

    const data = await getStats(shortUrl);
    return res.json(data);
});

urlShortener.post("/addUrl", async (req, res) => {
    const shortUrl = await addNewUrl(req.body.url);
    return res.json({ shortUrl });
});

urlShortener.get("/u/:shortUrl", async (req, res) => {
    const longUrl = await getOriginalUrl(req.params.shortUrl);
    if (!longUrl) {
        return res.status(404).json({ error: "URL not found" });
    }
    return res.redirect(longUrl)
});

urlShortener.delete("/deleteUrl/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;
    const deleted = await deleteUrl(shortUrl);
    return res.json({ deleted });
});





export { urlShortener };