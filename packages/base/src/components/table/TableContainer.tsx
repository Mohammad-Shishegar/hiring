import clsx from "clsx";
import { useEffect, useState } from "react";
import { TableProvider } from "../../helpers/contexts/TableContext";
import Box from "../box";
import Modal, { modalSizeType } from "../modal";
import { ITableColumn } from "./helperTypes";
import Table from "./Table";
import TableButtonsAndTitle from "./TableButtonsAndTitle";
import TableFilter from "./TableFilter";
import TableFilterField from "./TableFilterField";
import TableHead from "./TableHead";
import TableLoading from "./TableLoading";
import TablePageSizePageNumber from "./TablePageSizePageNumber";
import NoData from "./NoData";
import ModalContainer from "./ModalContainer";

interface TableContainerProps {
  hasCreateBtn?: boolean;
  hasRefreshBtn?: boolean;
  hasExcel?: boolean;
  tableLoading: boolean;
  title: string;
  subTitle?: string;
  extraBtn?: React.ReactNode;
  columns: ITableColumn[];
  children: React.ReactNode;
  showPageSize?: boolean;
  showPageNumber?: boolean;
  api: string;
  queryKey: string[];
  detailModalSize?: modalSizeType;
  formModalSize?: modalSizeType;
  formModal?: React.ReactNode;
  filterRow?: React.ReactNode;
  detailModal?: React.ReactNode;
  extraModal?: React.ReactNode;
  requestData: any;
  data: [];
}

const TableContainer = ({
  hasCreateBtn = true,
  api = "",
  hasRefreshBtn = true,
  hasExcel = true,
  tableLoading,
  title,
  subTitle,
  extraBtn,
  columns,
  children,
  showPageSize = true,
  showPageNumber = true,
  formModalSize = "auto",
  detailModalSize = "auto",
  formModal,
  detailModal,
  filterRow,
  requestData,
  data,
  queryKey,
  extraModal,
}: TableContainerProps) => {
  const [modalStatus, setModalStatus] = useState<
    "CREATE" | "UPDATE" | "NONE" | "DETAIL" | "EXTRA"
  >("NONE");

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (data?.length === 0 || !data) setNoData(true);
    else setNoData(false);
  }, [data]);

  const handleCloseModal = () => setModalStatus("NONE");

  return (
    <TableProvider
      api={api}
      noData={noData}
      modalStatus={modalStatus}
      setModal={setModalStatus}
      handleCloseModal={handleCloseModal}
      meta={requestData?.meta}
      setMeta={requestData?.setMeta}
      columns={columns}
      extraLoading={false}
      queryKey={queryKey}
      tableLoading={tableLoading}
    >
      <TableFilterField>
        <div>
          <Box className={clsx("p-5 mt-5 m-6")}>
            <TableButtonsAndTitle
              extraBtn={extraBtn}
              hasCreateBtn={hasCreateBtn}
              hasExcel={hasExcel}
              hasRefreshBtn={hasRefreshBtn}
              title={title}
              subTitle={subTitle}
            />
            <Table>
              {/* Table Head */}
              <TableHead />
              {/* Table Filter */}
              {filterRow ? filterRow :  <TableFilter />}
              {/* Table Body Data */}

              {tableLoading ? <TableLoading /> : noData ? <NoData /> : children}
            </Table>
            {/* Table Page And Page size */}
            <TablePageSizePageNumber
              showPageNumber={showPageNumber}
              showPageSize={showPageSize}
            />
          </Box>
        </div>
      </TableFilterField>
      <ModalContainer
        detailModal={detailModal}
        formModalTitle={title}
        detailModalSize={detailModalSize}
        formModal={formModal}
        formModalSize={formModalSize}
        extraModal={extraModal}
      />
    </TableProvider>
  );
};
export default TableContainer;
