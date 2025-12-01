"use client"

import React from "react"
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { usePricingContext } from "@/contexts/PricingContext"
import { calculateSubItemTotal } from "@/utils/utils"

interface SubItem {
  id: string
  description: string
  unit: string
  qty: number
  pricePerUnit: number
  remark: string
}

interface MainCategory {
  id: string
  name: string
  subItems: SubItem[]
}

const PricingTable: React.FC = () => {
  const theme = useTheme()
  const {
    categories,
    addCategory,
    removeCategory,
    addSubItem,
    removeSubItem,
    updateSubItem,
    updateCategoryName, // Added updateCategoryName from context
    getCategoryTotal,
    getTotalPrice,
  } = usePricingContext()

  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({})

  const handleAddCategory = () => {
    addCategory("")
  }

  const handleUpdateCategoryName = (categoryId: string, name: string) => {
    updateCategoryName(categoryId, name)
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories[categoryId] !== false // Default to expanded
  }

  const handleAddSubItem = (categoryId: string) => {
    addSubItem(categoryId, {
      description: "",
      unit: "",
      qty: 0,
      pricePerUnit: 0,
      remark: "",
    })
  }


  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          ตารางราคา
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          เพิ่มหมวดหมู่หลัก
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#e0e0e0" }}>
              <TableCell sx={{ fontWeight: "bold", width: "5%" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "35%" }}>รายการ</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Qty</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "12%" }}>price/Unit</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "12%" }}>price</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "12%" }}>remark</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "4%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, catIndex) => (
              <React.Fragment key={category.id}>
                {/* Category Header Row */}
                <TableRow
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {catIndex + 1}
                  </TableCell>
                  <TableCell colSpan={6}>
                    <TextField
                      fullWidth
                      placeholder="ชื่อหมวดหมู่หลัก"
                      value={category.name}
                      onChange={(e) => handleUpdateCategoryName(category.id, e.target.value)}
                      variant="standard"
                      // sx={{
                      //   input: {
                      //     color: "white",
                      //     fontWeight: "bold",
                      //     fontSize: "1.1rem",
                      //   },
                      //   "& .MuiInput-underline:before": {
                      //     borderBottomColor: "rgba(255, 255, 255, 0.5)",
                      //   },
                      //   "& .MuiInput-underline:hover:before": {
                      //     borderBottomColor: "rgba(255, 255, 255, 0.8)",
                      //   },
                      //   "& .MuiInput-underline:after": {
                      //     borderBottomColor: "white",
                      //   },
                      // }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <IconButton size="small" onClick={() => toggleCategory(category.id)} sx={{ color: "white" }}>
                      {isCategoryExpanded(category.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton size="small" onClick={() => removeCategory(category.id)} sx={{ color: "white", ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* Sub Items */}
                {isCategoryExpanded(category.id) &&
                  category.subItems.map((item, itemIndex) => (
                    <TableRow key={item.id} hover>
                      <TableCell sx={{ fontSize: "0.9rem" }}>
                        {catIndex + 1}.{itemIndex + 1}
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          placeholder="รายละเอียดสินค้า"
                          value={item.description}
                          onChange={(e) => updateSubItem(category.id, item.id, { description: e.target.value })}
                          variant="standard"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          placeholder="หน่วย"
                          value={item.unit}
                          onChange={(e) => updateSubItem(category.id, item.id, { unit: e.target.value })}
                          variant="standard"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          type="number"
                          value={item.qty || ""}
                          onChange={(e) => updateSubItem(category.id, item.id, { qty: Number(e.target.value) })}
                          variant="standard"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          type="number"
                          value={item.pricePerUnit || ""}
                          onChange={(e) =>
                            updateSubItem(category.id, item.id, { pricePerUnit: Number(e.target.value) })
                          }
                          variant="standard"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {calculateSubItemTotal(item.qty, item.pricePerUnit).toLocaleString("th-TH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          placeholder="หมายเหตุ"
                          value={item.remark}
                          onChange={(e) => updateSubItem(category.id, item.id, { remark: e.target.value })}
                          variant="standard"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => removeSubItem(category.id, item.id)} color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Add Sub Item Button */}
                {isCategoryExpanded(category.id) && (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ py: 1 }}>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddSubItem(category.id)}
                        sx={{ ml: 2 }}
                      >
                        เพิ่มรายการย่อย
                      </Button>
                    </TableCell>
                  </TableRow>
                )}

                {/* Category Subtotal */}
                {isCategoryExpanded(category.id) && category.subItems.length > 0 && (
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell colSpan={5} sx={{ textAlign: "right" }}>
                      <Typography variant="body1" fontWeight="bold">
                        รวมรวม
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        {getCategoryTotal(category.id).toLocaleString("th-TH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                )}
              </React.Fragment>
            ))}

            {/* Grand Total */}
            {categories.length > 0 && (
              <TableRow
                sx={{
                  bgcolor: theme.palette.primary.main,
                  "& td": { color: "white", fontWeight: "bold" },
                }}
              >
                <TableCell colSpan={5} sx={{ textAlign: "right" }}>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    มูลค่ารวมทั้งหมด
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {getTotalPrice().toLocaleString("th-TH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {categories.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ยังไม่มีข้อมูล
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            กดปุ่ม "เพิ่มหมวดหมู่หลัก" เพื่อเริ่มต้นสร้างตารางราคา
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default PricingTable
