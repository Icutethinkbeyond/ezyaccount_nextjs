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
import { useQuotationListContext, type Product } from "@/contexts/QuotationContext";
import { toNumber, uniqueId } from "lodash";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { formatNumber } from "@/utils/utils";

interface FooterProps {
  isEdit?: boolean | null | undefined;
  documentId?: string;
}

const FooterForm: React.FC<FooterProps> = ({ isEdit = false, documentId }) => {
  const router = useRouter();
  const localActive = useLocale();
  const { footerForm, setFooterForm, headForm, products } =
    useQuotationListContext();

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

  const handleSavePost = async (status: string) => {
    try {
      // แปลง products เป็น categories format
      const categories: any[] = [];

      products.forEach((product: Product) => {
        if (product.isSubjectItem) {
          // สร้างหมวดหมู่จาก Product ที่เป็นหัวหมวด
          const category = {
            id: `cat-${Date.now()}-${Math.random()}`,
            name: product.productService,
            subItems: [] as any[],
          };

          // เพิ่มรายการย่อยจาก subProductList
          if (product.subProductList && product.subProductList.length > 0) {
            product.subProductList.forEach((subProduct) => {
              category.subItems.push({
                id: `item-${Date.now()}-${Math.random()}`,
                description: subProduct.productService,
                unit: "ชิ้น",
                qty: subProduct.amount,
                pricePerUnit: subProduct.price,
                remark: subProduct.description,
              });
            });
          }

          categories.push(category);
        }
      });

      const quotationData = {
        companyName: headForm.companyName,
        companyTel: headForm.companyTel,
        taxId: headForm.taxId,
        branch: headForm.branch,
        dateCreate: headForm.dateCreate,
        companyAddress: headForm.companyAddress,
        contactorName: headForm.contactorName,
        contactorTel: headForm.contactorTel,
        contactorEmail: headForm.contactorEmail,
        contactorAddress: headForm.contactorAddress,
        includeVat: footerForm.includeVat,
        taxRate: 7,
        globalDiscount: footerForm.discountPrice,
        withholdingTax: footerForm.withholdingTaxPrice,
        categories: categories,
      };

      const res = await fetch('/api/income/quotation/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotationData),
      });

      const result = await res.json();
      if (result.success) {
        alert("บันทึกใบเสนอราคาสำเร็จ!");
        router.push(`/${localActive}/protected/income/quotation`);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  const handleUpdatePost = async () => {
    try {
      if (!documentId) {
        alert("ไม่พบ documentId");
        return;
      }

      // แปลง products เป็น categories format
      const categories: any[] = [];

      products.forEach((product: Product) => {
        if (product.isSubjectItem) {
          // สร้างหมวดหมู่จาก Product ที่เป็นหัวหมวด
          const category = {
            id: `cat-${Date.now()}-${Math.random()}`,
            name: product.productService,
            subItems: [] as any[],
          };

          // เพิ่มรายการย่อยจาก subProductList
          if (product.subProductList && product.subProductList.length > 0) {
            product.subProductList.forEach((subProduct) => {
              category.subItems.push({
                id: `item-${Date.now()}-${Math.random()}`,
                description: subProduct.productService,
                unit: "ชิ้น",
                qty: subProduct.amount,
                pricePerUnit: subProduct.price,
                remark: subProduct.description,
              });
            });
          }

          categories.push(category);
        }
      });

      const quotationData = {
        companyName: headForm.companyName,
        companyTel: headForm.companyTel,
        taxId: headForm.taxId,
        branch: headForm.branch,
        dateCreate: headForm.dateCreate,
        companyAddress: headForm.companyAddress,
        contactorName: headForm.contactorName,
        contactorTel: headForm.contactorTel,
        contactorEmail: headForm.contactorEmail,
        contactorAddress: headForm.contactorAddress,
        includeVat: footerForm.includeVat,
        taxRate: 7,
        globalDiscount: footerForm.discountPrice,
        withholdingTax: footerForm.withholdingTaxPrice,
        categories: categories,
      };

      console.log("📤 PATCH Request - Products:", products);
      console.log("📤 PATCH Request - Categories:", categories);
      console.log("📤 PATCH Request - Full Data:", quotationData);

      const res = await fetch(`/api/income/quotation/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotationData),
      });

      const result = await res.json();
      if (result.success) {
        alert("อัพเดทใบเสนอราคาสำเร็จ!");
        router.push(`/${localActive}/protected/income/quotation`);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการอัพเดท");
    }
  };

  const handlePreview = () => {
    const url = documentId ? `/quotation/preview/${documentId}` : `/quotation/preview`;
    window.open(url, '_blank');
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
                      ราคารวม
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
                      ส่วนลด
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
                        หักภาษี ณ ที่จ่าย
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={footerForm.withholdingTax}
                        label="หักภาษี ณ ที่จ่าย"
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

export default FooterForm;
