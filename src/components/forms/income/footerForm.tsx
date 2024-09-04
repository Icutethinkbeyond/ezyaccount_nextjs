import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import BaseCard from "@/components/shared/BaseCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  footerFormClean,
  FormDataFooter,
  useProductServiceListContext,
} from "@/contexts/productServiceListContext";
import { toNumber } from "lodash";

const FooterForm: React.FC = () => {
  const { footerForm, setFooterForm } = useProductServiceListContext();

  // const [formData, setFormData] = useState<FormDataFooter>(footerFormClean);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setFooterForm({
      ...footerForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleChangeSelect = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;

    let newValue = toNumber(value);

    if (footerForm.withholdingTax !== newValue) {
      setFooterForm({
        ...footerForm,
        withholdingTax: newValue,
      });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container item xs={12} justifyContent="flex-end">
        <Grid item xs={6}>
          <TableContainer
            sx={{
              width: {
                xs: "254px",
                sm: "100%",
              },
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h4">
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.total}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Discount Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.discountPrice}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Price After Discount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.priceAfterDiscount}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControl sx={{ mb: 1, mt: 1 }} fullWidth size="small">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={footerForm.includeVat}
                            onChange={handleChange}
                            name="includeVat"
                          />
                        }
                        label="Vat 7%"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.vatPrice}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h4">
                      Total Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.totalAmount}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControl sx={{ mb: 1, mt: 1 }} fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Withholding Tax
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={footerForm.withholdingTax}
                        label="Withholding Tax"
                        onChange={handleChangeSelect}
                      >
                        <MenuItem value={0}>0%</MenuItem>
                        <MenuItem value={1}>1%</MenuItem>
                        <MenuItem value={2}>2%</MenuItem>
                        <MenuItem value={3}>3%</MenuItem>
                        <MenuItem value={4}>4%</MenuItem>
                        <MenuItem value={5}>5%</MenuItem>
                        <MenuItem value={6}>6%</MenuItem>
                        <MenuItem value={7}>7%</MenuItem>
                        <MenuItem value={8}>8%</MenuItem>
                        <MenuItem value={9}>9%</MenuItem>
                        <MenuItem value={10}>10%</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.withholdingTaxPrice}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h3">
                      Total Amount Due
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {footerForm.totalAmountDue}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid container item xs={12} lg={12} justifyContent="flex-end">
          <Box sx={{ "& button": { mr: 1 } }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "5px" }}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginBottom: "5px" }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ marginBottom: "5px" }}
            >
              Save and Approve
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterForm;
