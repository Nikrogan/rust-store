import { useState } from "react";
import { Table } from "../Table"

export const TableWrapper = ({columnList, ...props}) => {
    const [cols, setCols] = useState(columnList);

    const handleResize = ({ name, width }: { name: string; width: string }) => {
      const newCols = cols.map((col) => (col.name === name ? { ...col, width } : col));
      setCols(newCols);
    };

    return <Table onColumnResize={handleResize} columnList={cols} {...props}/>
}