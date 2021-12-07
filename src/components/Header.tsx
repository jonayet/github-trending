import React from "react";
import { useDispatch } from "react-redux";
import { setItemPerPage, setPageNo, setSortBy } from "../state/github";

import styles from "./styles.module.scss";
import { Dropdown } from "./Dropdow";
import { NumericInput } from "./NumericInput";

export const Header = () => {
  const dispatch = useDispatch();
  const sortBy = {
    name: "Name",
    description: "Description",
  };

  const sortOrder = {
    asc: "Ascending",
    desc: "Descending",
  };

  const pageNo = 1

  const itemPerPage = {
    5: "5",
    10: "10",
    20: "20",
  };

  const handleSortKeyChange = (sortKey: string) => {
    dispatch(setSortBy(sortKey));
  };

  const handleSortOrderChange = (sortOrder: string) => {
    dispatch(setSortBy(sortOrder));
  };

  const handlePageNoChange = (pageNo: number) => {
    dispatch(setPageNo(pageNo));
  };

  const handleItemPerPageChange = (itemPerPage: string) => {
    dispatch(setItemPerPage(itemPerPage as unknown as number));
  };

  return (
    <div className={styles.header}>
      <Dropdown
        label="Sort by"
        keyLabelPairs={sortBy}
        onChange={handleSortKeyChange}
      />

      <Dropdown
        label="Sort order"
        keyLabelPairs={sortOrder}
        onChange={handleSortOrderChange}
      />

      <NumericInput
        label="Page no"
        initialValue={pageNo}
        onChange={handlePageNoChange}
      />

      <Dropdown
        label="Item per page"
        keyLabelPairs={itemPerPage}
        onChange={handleItemPerPageChange}
      />
    </div>
  );
};
