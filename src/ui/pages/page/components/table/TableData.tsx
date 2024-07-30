export type TableDataProps = React.ParamHTMLAttributes<HTMLDivElement> & {
  data: number;
  cumulativeData: number;
  region: string;
};

export const TableData: React.FC<TableDataProps> = ({
  data,
  cumulativeData,
  region,
  ...props
}) => {
  return (
    <tr data-testid={`table-data-${region}`} className={props.className}>
      <td>{region}</td>
      <td className='text-right'>{data}</td>
      <td className='text-right'>{cumulativeData}</td>
    </tr>
  );
};
