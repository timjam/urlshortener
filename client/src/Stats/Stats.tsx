import React from 'react';
import { useStats } from '../queries/stats.queries';

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Route } from '../routes/stats';
import { StatsTableRow } from './StatsTableRow';


export const Stats = () => {

    const { shortUrl } = Route.useSearch();
    const { isPending, error, data } = useStats(shortUrl);

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return <p>No data</p>;
    }

    return (
        <Table>
            <TableCaption>Short URL stats for ${data.originalUrl}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Accessed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(data.accessed).map(([date, count]) => <StatsTableRow key={`${data.shortUrl}-${date}`} date={date} accessed={count} />)}
            </TableBody>
        </Table>
    );
};