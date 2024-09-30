import axios from 'axios';
import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';


export const UrlShortener = () => {

    const [shortUrl, setShortUrl] = React.useState<string | undefined>(undefined);

    const addUrl = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post<{ shortUrl: string }>("/addUrl", { url: e.target[0].value });
        setShortUrl(response.data.shortUrl);
    };

    return (
        <div className="p-4 w-full max-w-md space-y-4 font-sans">
            <form onSubmit={addUrl} className="space-y-2">
                <Label htmlFor="url" className="block text-sm font-medium text-gray-700">URL to shorten</Label>
                <div className="flex w-full items-center space-x-2">
                    <Input
                        type="url"
                        id="url"
                        placeholder="Enter your URL"
                        required
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    />
                    <Button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Submit
                    </Button>
                </div>
            </form>
            {shortUrl && (
                <div className="space-y-2 p-4 bg-gray-100 rounded-md">
                    <Label className="block text-sm font-semibold text-gray-700">Short URL:</Label>
                    <Button variant="link" className="text-sm text-gray-600 break-all" asChild>
                        <a href={`${window.location.origin}/u/${shortUrl}`} target="_blank" rel="noopener noreferrer">
                            {`${window.location.origin}/u/${shortUrl}`}
                        </a>
                    </Button>
                    <Label className="block text-sm font-semibold text-gray-700 mt-2">Link to stats page</Label>
                    <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all" asChild>
                        <a href={`/stats?shortUrl=${shortUrl}`} target="_blank" rel="noopener noreferrer">
                            Stats for {shortUrl}
                        </a>
                    </Button>
                </div>
            )}
        </div>
    );
}