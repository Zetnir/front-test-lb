import { fireEvent, render, screen, waitFor } from '../../../../../test-utils';

import { TableData } from './TableData';

test('renders tableData component based on given props', async () => {
  const data = 1342;
  const cumulativeData = 4312;
  const region = 'Test Table Data';
  render(
    <table>
      <tbody>
        <TableData
          data={data}
          cumulativeData={cumulativeData}
          region={region}
        />
      </tbody>
    </table>
  );

  const dataElement = screen.getByText(data);
  expect(dataElement).toBeInTheDocument();
  const cumulativeDataElement = screen.getByText(cumulativeData);
  expect(cumulativeDataElement).toBeInTheDocument();
  const regionElement = screen.getByText(region);
  expect(regionElement).toBeInTheDocument();
});
