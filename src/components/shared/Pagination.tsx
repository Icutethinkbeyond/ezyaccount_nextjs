import React, { useState, useEffect } from "react";
import {
  Pagination,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";

interface PaginationComponentProps {
  totalItems: number;
  itemsPerPageOptions?: number[]; // Optional, defaults to [5, 10, 20]
  onPageChange: (
    items: string[],   // An array of paginated items
    currentPage: number,
    itemsPerPage: number
  ) => void;
}

const PaginationWithItems: React.FC<PaginationComponentProps> = ({
  totalItems,
  itemsPerPageOptions = [5, 10, 20], // Provide a default value
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]); // Default items per page

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    updateItems(page, itemsPerPage);  // Call with updated page and itemsPerPage
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    event: any
  ) => {
    const newItemsPerPage = event.target.value as number;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to page 1 when changing items per page
    updateItems(1, newItemsPerPage);  // Call with new items per page
  };

  // Function to update items based on page and items per page
  const updateItems = (page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const items = Array.from(
      { length: totalItems },
      (_, i) => `Item ${i + 1}`
    ).slice(startIndex, endIndex);
    onPageChange(items, page, itemsPerPage);  // Call the provided onPageChange
  };

  useEffect(() => {
    updateItems(currentPage, itemsPerPage);
  }, [totalItems, currentPage, itemsPerPage]);  // Ensure items update on totalItems change

  return (
    <Grid container mt={5}>
      {/* Select Items Per Page */}
      <Grid
        container
        item
        xs={6}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Typography variant="h6" mr={1}>
          Items per page:{" "}
        </Typography>
        <Select
          value={itemsPerPage}
          size="small"
          onChange={handleItemsPerPageChange} // Make sure this is enabled
          variant="outlined"
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="h6" ml={1}>
          {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} of ${totalItems} items`}
        </Typography>
      </Grid>

      {/* Pagination */}
      <Grid container item xs={6} justifyContent={"flex-end"}>
        <Pagination
          siblingCount={0}
          count={totalPages ? totalPages : 10}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Grid>
    </Grid>
  );
};

export default PaginationWithItems;
 