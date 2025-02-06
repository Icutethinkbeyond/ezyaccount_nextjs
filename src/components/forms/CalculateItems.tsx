import React, { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
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
import { useProductServiceListContext } from "@/contexts/QuotationContext";
import { toNumber, uniqueId } from "lodash";
import { Quotation, useDatabaseContext } from "@/contexts/dbContext";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/utils/utils";

interface CalculateItemsProps {
  isEdit?: boolean | null | undefined;
}

const CalculateItems: React.FC<CalculateItemsProps> = ({ isEdit = false }) => {
  const router = useRouter();
  const { footerForm, setFooterForm, headForm, products } =
    useProductServiceListContext();
  const { addQuotation, qoutationState, updateQuotation, editQuotation } =
    useDatabaseContext();

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

  const handleSavePost = (status: string) => {
    addQuotation({
      keyId: 1,
      ownerId: "1",
      status: status,
      headForm: headForm,
      products: products,
      summary: footerForm,
      createDate: new Date(),
      updateDate: new Date(),
    });
    router.push("/income/quotation");
  };

  const handleUpdatePost = () => {
    updateQuotation({
      keyId: editQuotation.keyId,
      ownerId: editQuotation.ownerId,
      status: editQuotation.status,
      headForm: headForm,
      products: products,
      summary: footerForm,
      createDate: editQuotation.createDate,
      updateDate: new Date(),
    });
    router.push("/income/quotation");
  };

  const handlePreview = () => {};

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container item xs={12} justifyContent="flex-end">
        <Grid item xs={12}>
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
                      รวมเป็นเงิน
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.total)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      ส่วนลดรวม
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.discountPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      ราคาหลังหักส่วนลด
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.priceAfterDiscount)}
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
                        label="ภาษีมูลค่าเพิ่ม 7%"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.vatPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h4">
                      จำนวนเงินรวมทั้งสิ้น
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.totalAmount)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControl sx={{ mb: 1, mt: 1 }} fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        หัก ณ ที่จ่าย
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={footerForm.withholdingTax}
                        label="หัก ณ ที่จ่าย"
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
                      {formatNumber(footerForm.withholdingTaxPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h3">
                      ยอดชำระรวม
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {formatNumber(footerForm.totalAmountDue)}
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
              onClick={() => handlePreview()}
            >
              Preview
            </Button>
            {!isEdit && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginBottom: "5px" }}
                onClick={() => handleSavePost("draft")}
              >
                Save Draft
              </Button>
            )}

            <Button
              variant="contained"
              color="success"
              sx={{ marginBottom: "5px" }}
              onClick={() =>
                !isEdit ? handleSavePost("approve") : handleUpdatePost()
              }
            >
              {isEdit ? "Edit" : "Save and Approve"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalculateItems;
