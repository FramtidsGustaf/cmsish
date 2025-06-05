import { css } from 'hono/css';

const tableStyling = css`
  /* border: 1px solid var(--text-color); */
  background-color: var(--white);
  border-collapse: collapse;
`;

const thStyling = css`
  text-align: start;
  padding: 8px 16px;
`;

const trStyling = css`
  border-bottom: 1px solid var(--text-color);
`;

const tdStyling = css`
  padding: 8px 16px;
`;

interface TableProps {
  headers: string[];
  data: { [key: string]: any }[];
  isLoading?: boolean;
}

export const Table = ({ headers, data, isLoading }: TableProps) => {
  return (
    <table class={tableStyling}>
      <tr>
        {headers.map((header) => (
          <th class={thStyling}>{header}</th>
        ))}
      </tr>
      {data.map((row) => (
        <tr class={trStyling}>
          {Object.values(row).map((value) => (
            <td class={tdStyling}>{value}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};
