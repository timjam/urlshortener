import React from 'react';
import { deleteUrl, useStats } from '../queries/url.queries';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Route } from '../routes/stats';
import { StatsTableRow } from './StatsTableRow';
import { Button } from '@/components/ui/button';
import { TrashIcon } from "lucide-react"
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../queries/queryClient';

export const Stats = () => {

    const { shortUrl } = Route.useSearch();
    const { isPending, error, data } = useStats(shortUrl);
    const mutation = useMutation({
        mutationFn: deleteUrl,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["stats", shortUrl]
            });
        }
    });

    const handleDelete = () => {
        mutation.mutate(shortUrl);
    };

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="container py-10">
            <div className="mb-4">
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/50 h-10 py-2 px-4"
                >
                    <TrashIcon className="mr-2 h-4 w-4" /> Delete URL Data
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b">
                        <TableHead className="w-[180px] px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2 text-left">Access Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && Object.entries(data.accessed).map(([date, count]) => (
                        <StatsTableRow key={date} date={date} count={count} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};