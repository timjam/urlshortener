import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const UrlStats = z.object({
    shortUrl: z.string(),
    originalUrl: z.string(),
    accessed: z.record(z.number()),
});

type UrlStats = z.infer<typeof UrlStats>;

export const useStats = (shortUrl: string) => {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["stats", shortUrl],
        queryFn: async () => {
            const response = await axios.get('/urlStats', { params: { shortUrl } });
            return UrlStats.parse(response.data);
        },
    });

    return { isPending, error, data, isFetching };
};