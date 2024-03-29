/* eslint-disable react/prop-types */
import Pagination from "../../../components/Pagination";
import { useTranslation } from "react-i18next";

const DataTable = ({
  pageTitle,
  dataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
}) => {
  const { t } = useTranslation();
  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">{dataListName}</h2>
            <div className="text-end">
              <form
                onSubmit={searchKeywordOnSubmitHandler}
                className="flex flex-col justify-center w-full space-y-3 md:max-w-2xl md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:blue-600 focus:border-transparent"
                    placeholder={searchInputPlaceHolder}
                    onChange={searchKeywordOnChangeHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:blue-500 focus:ring-offset-2 focus:blue-200"
                  type="submit"
                >
                  {t("admin.common.filter")}
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        scope="col"
                        key={index}
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        {t("admin.common.loading")}
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        {t("admin.common.noData")}
                      </td>
                    </tr>
                  ) : (
                    children?.length ?
                      children
                      :
                      <tr>
                        <td colSpan={5} className="text-center py-10 w-full">
                          {t("admin.common.noData")}
                        </td>
                      </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(headers?.["x-totalpagecount"])}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
