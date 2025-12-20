/**
 * Table Column Maker
 * @param name Name of column
 * @param title Title of column
 * @param type Type of column
 * @param hasFilter Enabling filter on column
 * @param hasSorting Enabling sorting on column
 * @param isPrintable Appear column in print?
 * @param isExportable Appear column in excel?
 */


export type paramType = { name: string; value: string; type: TTableColumnsTypes };

export type TTableColumnsTypes =
  | "text"
  | "number"
  | "fromDate"
  | "toDate"
  | "dropdown"
  | "";

export interface ITableColumn {
  [name: string]: {
    title: React.ReactNode;
    type: TTableColumnsTypes;
    hasFilter?: boolean;
    hasSorting?: boolean;
    isExportable?: boolean;
    isShow?: boolean;
  };
}

export const ho = (
  name: string,
  title: React.ReactNode,
  type: TTableColumnsTypes,
  hasFilter: boolean = true,
  hasSorting: boolean = true,
  isExportable: boolean = true,
  isShow: boolean = true
): ITableColumn => {
  return {
    [name]: {
      title,
      type,
      hasFilter,
      hasSorting,
      isExportable,
      isShow,
    },
  };
};

