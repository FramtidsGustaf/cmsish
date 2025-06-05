import { useEffect, useState } from 'hono/jsx';
import { Table } from '../Components/Table/Table';

export const PagesPage = () => {
  const [data, setData] = useState<{ [key: string]: any }[]>();
  const [headers, setHeaders] = useState<string[]>();

  const hejsan = async () => {
    const res = await fetch('http://localhost:3000/api/v1/pages');
    const jsonData = await res.json();
    setData(jsonData);
    setHeaders(Object.keys(jsonData[0]));
  };

  useEffect(() => {
    hejsan();
  }, []);

  return (
    <>
      {!data || !headers ? (
        <h3>Loading...</h3>
      ) : (
        <Table headers={headers} data={data} isLoading={false} />
        // <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        //   <tr style={{ border: '1px solid black' }}>
        //     {headers.map((header) => (
        //       <th style={{ border: '1px solid black' }}>{header}</th>
        //     ))}
        //   </tr>
        //   {data.map((row) => (
        //     <tr style={{ border: '1px solid black' }}>
        //       {Object.values(row).map((value) => (
        //         <td style={{ border: '1px solid black' }}>{value}</td>
        //       ))}
        //     </tr>
        //   ))}
        // </table>
      )}
    </>
  );
};
