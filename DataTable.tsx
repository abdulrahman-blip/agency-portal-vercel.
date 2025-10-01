
export default function DataTable({ columns, rows }:{ columns:string[], rows:any[] }){
  return (
    <table className="table">
      <thead><tr>{columns.map(c=> <th key={c} className="th text-left">{c}</th>)}</tr></thead>
      <tbody>{rows.map((r,i)=>(<tr key={i}>{columns.map(c=> <td key={c} className="td">{String(r[c] ?? "")}</td>)}</tr>))}</tbody>
    </table>
  );
}
