import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export const StatsTableRow = ({ date, count }: { date: string; count: number; }) => {
    return (
        <TableRow className="border-b transition-colors hover:bg-muted/50">
            <TableCell className="px-6 py-2 font-medium text-left">{date}</TableCell>
            <TableCell className="px-6 py-2 text-left">{count}</TableCell>
        </TableRow>
    );
};