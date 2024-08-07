import { ReactNode, MouseEvent, useCallback, useEffect } from 'react';

interface ITableProps {
  headers: { label: string; rowKey: string }[];
  data: { [key: string]: string | number | boolean }[];
  count: number;
  pageSize: number;
  page: number;
  actionButtons: {
    actionButton: ReactNode;
    onClick: (
      event: MouseEvent<HTMLAnchorElement>,
      data: { [key: string]: string | number | boolean }
    ) => void;
  }[];
  onPageChange: (page: number) => void;
}

const Table = ({
  headers,
  data,
  count,
  pageSize,
  page,
  actionButtons,
  onPageChange,
}: ITableProps) => {
  const numPages = Math.ceil(count / pageSize);
  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(page + 1, numPages);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const pageNumber =
        (event.target as HTMLAnchorElement).getAttribute('href')?.slice(1) ||
        '1';
      onPageChange(parseInt(pageNumber));
    },
    [onPageChange]
  );

  useEffect(() => {
    onPageChange(1);
  }, [onPageChange]);

  return (
    <>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((header) => (
                <th key={header.rowKey} scope="col" className="px-6 py-3">
                  {header.label}
                </th>
              ))}
              {actionButtons ? (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {headers.map((header) => (
                  <td key={header.rowKey} className="px-6 py-4">
                    {row[header.rowKey]}
                  </td>
                ))}
                {actionButtons ? (
                  <td className="px-6 py-4">
                    {actionButtons.map((actionButton, index) => (
                      <a
                        key={index}
                        href="#"
                        className="mx-2 "
                        onClick={(event) => actionButton.onClick(event, row)}
                      >
                        {actionButton.actionButton}
                      </a>
                    ))}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(page - 1) * pageSize + 1}-
            {Math.min((page - 1) * pageSize + pageSize, count)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {count}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href={`#${prevPage}`}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === 1 ? 'pointer-events-none' : ''}`}
              onClick={handlePageChange}
            >
              Previous
            </a>
          </li>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
            <li key={pageNum}>
              <a
                href={`#${pageNum}`}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === pageNum ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                onClick={handlePageChange}
              >
                {pageNum}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`#${nextPage}`}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === numPages ? 'pointer-events-none' : ''}`}
              onClick={handlePageChange}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Table;
