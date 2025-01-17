"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  MenuItem,
  IconButton,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRouter } from "next/navigation";
import BaseCard from "@/components/shared/BaseCard";

const AddUserAndCustomer = () => {
  const [userID, setUserID] = useState<string>(""); // เก็บรหัสผู้ใช้งาน
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [taxNumber, setTaxNumber] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [contactType, setContactType] = useState<string>("");
  const [reportType, setReportType] = useState<string>(""); // สำหรับเลือกประเภทรายงาน
  const [date, setDate] = useState<string>(""); // สำหรับเลือกวันเดือนปี

  const router = useRouter();

  // ฟังก์ชันสร้างรหัสผู้ใช้งานแบบตัวเลขล้วน
  const generateUserID = () => {
    const digits = "0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return id;
  };

  // ใช้ useEffect เพื่อสร้างรหัสผู้ใช้งานทันทีเมื่อหน้าโหลด
  useEffect(() => {
    setUserID(generateUserID());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("User ID:", userID);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Branch:", branch);
    console.log("Tax Number:", taxNumber);
    console.log("Contact Type:", contactType);
    console.log("Selected File:", image);
    console.log("Report Type:", reportType);
    console.log("Date:", date);

    router.push("/path-to-go-after-submit");
  };

  return (
    <main className="min-h-screen p-24">
      {/* Box สำหรับจัดระเบียบข้อความและการเลือกฟิลด์ให้อยู่แถวเดียว */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          เพิ่มผู้ใช้งาน/ลูกค้า
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* เลือกรายงานยอดขาย */}
          <TextField
            label="รายงานยอดขาย"
            variant="outlined"
            select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="รายงาน 1">รายงาน 1</MenuItem>
            <MenuItem value="รายงาน 2">รายงาน 2</MenuItem>
          </TextField>

          {/* เลือกวันเดือนปี */}
          <TextField
            label="เลือกวันเดือนปี"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <IconButton
            sx={{
              color: "black", 
              height: "50%", 
              width: 30, 
            }}
            onClick={() => {
              setReportType(""); 
              setDate(""); 
            }}
          >
            <RestartAltIcon />
          </IconButton>

          {/* ปุ่มดูรายงาน */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "100%", 
              width: 150, 
              fontSize: "1.1rem", 
              padding: "10px 20px", 
            }}
            onClick={() => {
              console.log("Viewing report...");
              // เพิ่มการกระทำเมื่อคลิกดูรายงาน
            }}
          >
            ดูรายงาน
          </Button>

          {/* ปุ่มรีเซ็ท (ใช้ IconButton) */}
        </Box>
      </Box>

      <BaseCard title="">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ข้อมูลสินค้า/บริการ
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            noValidate
            autoComplete="off"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "2fr 1fr",
              alignItems: "start",
            }}
          >
            {/* ส่วนข้อมูลฟอร์ม */}
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="ชื่อ"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="ที่อยู่"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <TextField
                  label="อีเมล"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="เบอร์โทร"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <TextField
                  label="สำนักงานใหญ่/สาขา"
                  variant="outlined"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />

                <TextField
                  label="เลขที่เสียภาษี"
                  variant="outlined"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                />
              </Box>
            </Box>

            {/* ส่วนรูปภาพ */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* รหัสผู้ใช้งาน */}
              <Typography variant="subtitle1">รหัสผู้ใช้งาน:</Typography>
              <Box
                sx={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  marginBottom: 2,
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {userID}
              </Box>

              {/* เพิ่มรูปภาพ */}
              <Typography variant="subtitle1">เพิ่มรูปโปรไฟล์:</Typography>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  border: "1px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  marginBottom: 2,
                }}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    IMAGE
                  </Typography>
                )}
              </Box>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "block" }}
              />

              {/* ประเภทผู้ติดต่อ */}
              <TextField
                label="ประเภทผู้ติดต่อ"
                variant="outlined"
                fullWidth
                select
                value={contactType}
                onChange={(e) => setContactType(e.target.value)}
                sx={{ marginTop: 2, width: "100%" }}
              >
                <MenuItem value="ประเภทที่ 1">ประเภทที่ 1</MenuItem>
                <MenuItem value="ประเภทที่ 2">ประเภทที่ 2</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Box sx={{ textAlign: "right", marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              บันทึกข้อมูล
            </Button>
          </Box>
        </CardContent>
      </BaseCard>
    </main>
  );
};

export default AddUserAndCustomer;
