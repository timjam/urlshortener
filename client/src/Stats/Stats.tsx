import React from 'react';
import { useStats } from '../queries/stats.queries';

import {
    Table,
    TableBody,
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
        <div className="container py-10">
            <Table>
                <TableHeader>
                    <TableRow className="border-b">
                        <TableHead className="w-[180px] px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2 text-left">Access Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(data.accessed).map(([date, count]) => (
                        <StatsTableRow key={date} date={date} count={count} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};