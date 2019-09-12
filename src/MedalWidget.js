import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './MedalWidget.css';

const url = 'https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json';

const idMaker = function* () {
  let index = 1;
  while (true) yield index++;
}

const addTotal = row =>
  Object.assign(row, { total: row.gold + row.silver + row.bronze });

const isOrder = (order, current) =>
  (order === current ? 'sorting' : '');

const sortRows = order => (a, b) => {
  switch (order) {
    case 'gold':
      if (a.gold !== b.gold) {
        return b.gold - a.gold;
      }
      return b.silver - a.silver;
    case 'silver':
      if (a.silver !== b.silver) {
        return b.silver - a.silver;
      }
      return b.gold - a.gold;
    case 'bronze':
      if (a.bronze !== b.bronze) {
        return b.bronze - a.bronze;
      }
      return b.gold - a.gold;
    default:
      if (a.total !== b.total) {
        return b.total - a.total;
      }
      return b.gold - a.gold;
  }
}

const useDataApi = (initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetch(url);
        const json = await result.json();
        if (json.error) {
          setIsError(true);
        }
        setData(json.map(addTotal));
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [data, isLoading, isError];
};

const renderRow = (id, row) => (
  <tr key={row.code} className='row'>
    <td className='id'>{id}</td>
    <td className='flag' >
      <div className={`flagSprite flag-${row.code.toLowerCase()}`} />
    </td>
    <td className='country'>{row.code}</td>
    <td className='medal'>{row.gold}</td>
    <td className='medal'>{row.silver}</td>
    <td className='medal'>{row.bronze}</td>
    <td className='medal bold'>{row.total}</td>
  </tr>
);

function MedalWidget({ order = 'gold' }) {
  const idCounter = idMaker();
  const [data, isLoading, isError] = useDataApi([]);
  const [sortOrder, setSortOrder] = useState(order);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(data.slice().sort(sortRows(sortOrder)));
  }, [data, sortOrder]);

  return (
    <div className='medal-widget'>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <table>
            <thead>
              <tr><td colSpan={7} className='title'>MEDAL COUNT</td></tr>
              <tr>
                <td colSpan={3}></td>
                <td
                  className={`medal ${isOrder('gold', sortOrder)}`}
                  onClick={() => setSortOrder('gold')}
                >
                  <div className='dot goldDot' />
                </td>
                <td
                  className={`medal ${isOrder('silver', sortOrder)}`}
                  onClick={() => setSortOrder('silver')}
                >
                  <div className='dot silverDot' />
                </td>
                <td
                  className={`medal ${isOrder('bronze', sortOrder)}`}
                  onClick={() => setSortOrder('bronze')}
                >
                  <div className='dot bronzeDot' />
                </td>
                <td
                  className={`medal bold ${isOrder('total', sortOrder)}`}
                  onClick={() => setSortOrder('total')}
                >
                  TOTAL
                </td>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => renderRow(idCounter.next().value, row))}
            </tbody>
          </table>
        )}
    </div>
  );
}

MedalWidget.initialize = (id, order) =>
  ReactDOM.render(<MedalWidget order={order} />, document.getElementById(id));

export default MedalWidget;

// Exports for tests
export { addTotal, sortRows };
