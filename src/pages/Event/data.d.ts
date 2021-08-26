export type TableListItem = {
  key: number;
  id: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  status: number;
  roomNo: string;
  progress: number;
};
export type ExhibitListItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
};
export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
