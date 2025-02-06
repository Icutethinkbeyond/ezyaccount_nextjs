"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Tabs,
  Tab,
  Checkbox,
  TextField,
} from "@mui/material";
import {
  AccountCircle,
  FileCopy,
  SupervisorAccount,
  SettingsApplications,
} from "@mui/icons-material"; 

const Settings = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [permissions, setPermissions] = useState({
    generalUser: true,
    documentManager: true,
    generalManager: true,
    systemManager: true,
    vat: false,
    runningNumber: false,
    monthYearRunningNumber: false,
    yearMonthRunningNumber: false,
  });

  const [tabValue, setTabValue] = useState(2); 

  const handlePermissionChange = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key], 
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue); 
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <Typography variant="h2" gutterBottom>
        ตั้งค่า
      </Typography>
      <Box
        sx={{
          maxWidth: 1000, 
          mx: "auto",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {/* Tabs Section */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="ตั้งค่าผู้ใช้งานและจำกัดการเข้าใช้งานระบบ" />
          <Tab label="ตั้งค่าเอกสาร" />
          <Tab label="ตั้งค่าผู้ใช้งาน" />
          <Tab label="ตั้งค่าธุรกิจ" />
        </Tabs>

        {/* User and Permissions Section */}
        {tabValue === 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4">ข้อมูลผู้ใช้งานและจำกัดสิทธิ์</Typography>

            {/* แถวผู้ใช้งานและวันที่ลงทะเบียน */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap", 
                gap: 2,
                mt: 2,
              }}
            >
              {/* เลือกผู้ใช้งาน */}
              <FormControl fullWidth sx={{ maxWidth: 400 }}>
                <InputLabel>ผู้ใช้งาน</InputLabel>
                <Select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  sx={{
                    fontSize: "0.900rem", 
                    height: 50, 
                  }}
                >
                  <MenuItem value="">
                    <em>เลือกผู้ใช้งาน...</em>
                  </MenuItem>
                  <MenuItem value="user1">ผู้ใช้งาน 1</MenuItem>
                  <MenuItem value="user2">ผู้ใช้งาน 2</MenuItem>
                </Select>
              </FormControl>

              {/* วันที่ลงทะเบียน */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }} 
                >
                  วันที่ลงทะเบียน
                </Typography>
                <Box
                  sx={{
                    maxWidth: 200,
                    textAlign: "center",
                    border: "1px solid #ccc", 
                    borderRadius: 2, 
                    padding: 1, 
                    bgcolor: "background.paper", 
                    margin: "0 auto", 
                  }}
                >
                  <Typography variant="body2">
                    {new Date().toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* สิทธิ์การเข้าถึง */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {/* ผู้ใช้งานทั่วไป */}
              <FormControlLabel
                control={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <AccountCircle sx={{ mb: 2, fontSize: 70 }} />
                    <Typography variant="body2">
                      สิทธิ์สำหรับผู้ใช้งานทั่วไป
                    </Typography>
                    <Switch
                      checked={permissions.generalUser}
                      onChange={() => handlePermissionChange("generalUser")}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                }
                label=""
                sx={{ flexBasis: "22%" }}
              />

              {/* ผู้จัดทำเอกสาร */}
              <FormControlLabel
                control={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <FileCopy sx={{ mb: 2, fontSize: 70 }} />
                    <Typography variant="body2">
                      สิทธิ์สำหรับผู้จัดทำเอกสาร
                    </Typography>
                    <Switch
                      checked={permissions.documentManager}
                      onChange={() => handlePermissionChange("documentManager")}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                }
                label=""
                sx={{ flexBasis: "22%" }}
              />

              {/* ผู้ดูแลทั่วไป */}
              <FormControlLabel
                control={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SupervisorAccount sx={{ mb: 2, fontSize: 70 }} />
                    <Typography variant="body2">
                      สิทธิ์สำหรับผู้ดูแลทั่วไป
                    </Typography>
                    <Switch
                      checked={permissions.generalManager}
                      onChange={() => handlePermissionChange("generalManager")}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                }
                label=""
                sx={{ flexBasis: "22%" }}
              />

              {/* ผู้ดูแลระบบ */}
              <FormControlLabel
                control={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SettingsApplications sx={{ mb: 2, fontSize: 70 }} />
                    <Typography variant="body2">
                      สิทธิ์สำหรับผู้ดูแลระบบ
                    </Typography>
                    <Switch
                      checked={permissions.systemManager}
                      onChange={() => handlePermissionChange("systemManager")}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                }
                label=""
                sx={{ flexBasis: "22%" }}
              />
            </Box>
          </Box>
        )}

        {/* ตั้งค่าเอกสาร */}
        {tabValue === 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4">รายละเอียดตั้งค่าเอกสาร</Typography>

            {/* การตั้งค่าภาษีมูลค่าเพิ่ม (VAT) */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">ตั้งค่าภาษีมูลค่าเพิ่ม (VAT)</Typography>

              {/* กลุ่มของ Checkbox สำหรับเลือก VAT */}
              <Box sx={{ mt: 2 }}>
                {/* เลือก VAT */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions.vat === true} 
                      onChange={() =>
                        setPermissions((prev) => ({ ...prev, vat: true }))
                      }
                      color="primary"
                    />
                  }
                  label="มี VAT"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={permissions.vat === false} 
                      onChange={() =>
                        setPermissions((prev) => ({ ...prev, vat: false }))
                      }
                      color="primary"
                    />
                  }
                  label="ไม่มี VAT"
                />
              </Box>

              {/* รูปแบบเลขที่ใบเสนอราคา / ใบเสร็จรับเงิน / ใบกำกับภาษี */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5">
                  รูปแบบเลขที่ใบเสนอราคา / ใบเสร็จรับเงิน / ใบกำกับภาษี
                </Typography>

                {/* กลุ่มของ Checkbox สำหรับเลือก รูปแบบเลขที่ */}
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.runningNumber} 
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            runningNumber: !prev.runningNumber,
                          }))
                        }
                        color="primary"
                      />
                    }
                    label="รันนิ่งนัมเบอร์"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.monthYearRunningNumber} 
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            monthYearRunningNumber:
                              !prev.monthYearRunningNumber,
                          }))
                        }
                        color="primary"
                      />
                    }
                    label="เดือนปี-รันนิ่งนัมเบอร์"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.yearMonthRunningNumber} 
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            yearMonthRunningNumber:
                              !prev.yearMonthRunningNumber,
                          }))
                        }
                        color="primary"
                      />
                    }
                    label="ปีเดือน-รันนิ่งนัมเบอร์"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* ตั่้งค่าผู้ใช้ */}
        {tabValue === 2 && (
          <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
            {/* ฟอร์มข้อมูล */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h4" mb={2}>
                ตั่งค่าผู้ใช้งาน
              </Typography>

              {/* ชื่อ-นามสกุล */}
              <TextField
                label="ชื่อ-นามสกุล"
                fullWidth
                margin="normal"
                placeholder="ชื่อ-นามสกุล"
              />

              {/* อีเมล */}
              <TextField
                label="อีเมล"
                fullWidth
                margin="normal"
                placeholder="อีเมล"
              />

              {/* เบอร์โทรศัพท์ */}
              <TextField
                label="เบอร์โทรศัพท์"
                fullWidth
                margin="normal"
                placeholder="เบอร์โทรศัพท์"
              />

              {/* ประเภทผู้ใช้งาน */}
              <FormControl fullWidth>
                <InputLabel>ประเภทผู้ใช้งาน</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="" disabled>
                    โปรดเลือกประเภทผู้ใช้งาน
                  </MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>

              {/* ที่อยู่ */}
              <TextField
                label="ที่อยู่"
                fullWidth
                margin="normal"
                placeholder="ที่อยู่"
              />
            </Box>

            {/* อัปโหลดไฟล์ */}
            <Box
              sx={{
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                border: "1px dashed gray",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Button variant="outlined" component="label">
                  Browse...
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Typography variant="body2" component="span" sx={{ mt: 2 }}>
                  No file selected.
              </Typography>
            </Box>
          </Box>
        )}

        {/* ตั้งค่าธุรกิจ  */}
        {tabValue === 3 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" mb={3}>
              ตั้งค่าธุรกิจ
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, 
                gap: 2,
              }}
            >
              {/* ฟอร์มกรอกข้อมูล */}
              <Box sx={{ flex: 1 }}>
                {/* ชื่อธุรกิจ */}
                <TextField
                  label="ชื่อธุรกิจ"
                  fullWidth
                  margin="normal"
                  placeholder="กรอกชื่อธุรกิจ"
                />

                {/* ที่อยู่ */}
                <TextField
                  label="ที่อยู่"
                  fullWidth
                  margin="normal"
                  placeholder="กรอกที่อยู่ธุรกิจ"
                />

                {/* เลขที่เสียภาษี */}
                <TextField
                  label="เลขที่เสียภาษี"
                  fullWidth
                  margin="normal"
                  placeholder="กรอกเลขที่เสียภาษี"
                />

                {/* ข้อมูลติดต่อ */}
                <TextField
                  label="ข้อมูลติดต่อของธุรกิจ"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  placeholder="กรอกข้อมูลติดต่อของธุรกิจ"
                />
              </Box>

              {/* อัปโหลดไฟล์ */}
              <Box
                sx={{
                  minWidth: 250,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  border: "1px dashed gray",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                <Button variant="outlined" component="label">
                  Browse...
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Typography variant="body2" component="span" sx={{ mt: 2 }}>
                  No file selected.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Save Button */}
        <Box sx={{ mt: 4, textAlign: "right" }}>
          <Button variant="contained" color="primary">
            บันทึก
          </Button>
        </Box>
      </Box>
    </main>
  );
};

export default Settings;
