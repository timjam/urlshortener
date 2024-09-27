import axios from 'axios';
import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';


export const UrlShortener = () => {

    const [shortUrl, setShortUrl] = React.useState<string | undefined>(undefined);

    const addUrl = async (e) => {
        e.preventDefault();
        const response = await axios.post<{ shortUrl: string }>("/addUrl", { url: e.target[0].value });
        console.log(JSON.stringify({ response: response.data }, null, 2));
        setShortUrl(response.data.shortUrl);
    };

    return (
        <div className="w-full max-w-sm space-y-4">
            <form onSubmit={addUrl} className="space-y-2">
                <Label htmlFor="url">URL to shorten</Label>
                <div className="flex w-full items-center space-x-2">
                    <Input type="url" id="url" placeholder="Enter your URL" required />
                    <Button type="submit">Submit</Button>
                </div>
            </form>

            {shortUrl && (
                <div className="space-y-2 p-4 bg-secondary rounded-md">
                    <Label className="block font-semibold">Short URL:</Label>
                    <p className="text-sm break-all">{shortUrl}</p>
                    <Label className="block font-semibold mt-2">Click to visit:</Label>
                    <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <a href={`/stats?shortUrl=${shortUrl}`} target="_blank" rel="noopener noreferrer" className="break-all">
                            Stats for {shortUrl}
                        </a>
                    </Button>
                </div>
            )}
        </div>
    );
}