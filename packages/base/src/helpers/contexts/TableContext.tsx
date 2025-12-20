import { createContext, useContext, useEffect, useState } from "react";
import { ITableColumn } from "../../components/table/helperTypes";

interface ITableProvider {
  children: any;
  columns: ITableColumn[];
  api: string;
  tableLoading: boolean;
  extraLoading: boolean;
  queryKey: string[];
  meta: {
    pageSize: string;
    page: string;
    Tablefilters: [];
    orderBy: [];
  };
  setMeta: Function;
  modalStatus: "CREATE" | "UPDATE" | "NONE" | "DELETE" | "DETAIL" | "EXTRA";
  setModal: Function;
  handleCloseModal: () => void;
  noData: boolean;
}
interface ITableContext {
  children: any;
  columns: ITableColumn[];
  api: string;
  tableLoading: boolean;
  extraLoading: boolean;
  queryKey: string[];
  meta: {
    pageSize: string;
    page: string;
    Tablefilters: [];
    orderBy: [];
  };
  setMeta: Function;
  modalStatus: "CREATE" | "UPDATE" | "NONE" | "DELETE" | "DETAIL" | "EXTRA";
  setModal: Function;
  handleCloseModal: () => void;
  noData: boolean;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  rowData: { id?: string; [key: string]: any };
  setRowData: React.Dispatch<
    React.SetStateAction<{ id?: string; [key: string]: any }>
  >;
  setInitialMeta: Function;
}

const TableContext = createContext<ITableContext | undefined>(undefined);

const TableProvider = (props: ITableProvider) => {
  const { children } = props;

  const [mode, setMode] = useState<string>("");
  const [rowData, setRowData] = useState<{}>({});

  const setInitialMeta = () => {
    let temp: any[] = [];
    value?.columns?.forEach((item) => {
      const key: string = Object.keys(item)?.[0];
      temp.push({ [key]: "" });
    });
    value?.setMeta((cv: any) => ({ ...cv, orderBy: temp, Tablefilters: [] }));
  };

  useEffect(() => {
    setInitialMeta();
  }, []);
  

  const value = {
    ...props,
    setMode,
    mode,
    rowData,
    setRowData,
    setInitialMeta,
  };

  return (
    <TableContext.Provider value={{ ...value }}>
      {children}
    </TableContext.Provider>
  );
};

const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) throw Error("use context inside provider!!");
  return context;
};

export { TableProvider, useTable };
