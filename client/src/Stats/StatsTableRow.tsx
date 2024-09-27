import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export const StatsTableRow = ({ date, accessed }: { date: string; accessed: number; }) => {
    return (
        <TableRow>
            <TableCell>{date}</TableCell>
            <TableCell>{accessed}</TableCell>
        </TableRow>
    );
};