
import React, { useState, useEffect } from 'react';
import { Upload, Printer, Activity, FileText, Loader2, Image as ImageIcon, Archive, CheckCircle2, AlertTriangle, RefreshCw, X, Building2, FileDown } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { PDFReport } from './PDFReport';
import logoDnlite from './assets/logo_dnlite.png';
import logoGlucare from './assets/logo_glucare.png';
import logoNewcl from './assets/logo_newcl.jpg';
import stamp0 from './assets/stamps/stamp_0.png';
import stamp1 from './assets/stamps/stamp_1.png';
import stamp2 from './assets/stamps/stamp_2.png';
import stamp3 from './assets/stamps/stamp_3.png';
import stamp4 from './assets/stamps/stamp_4.png';

console.log("App Module Loaded");

const STAMP_OPTIONS = {
  "林翠仙": stamp0,
  "古琪茗": stamp1,
  "李家宏": stamp2,
  "林珈妤": stamp3,
  "曾盈慈": stamp4,
};

// -----------------------------------------------------------------------------
// Component: DNlite Report Generator V23.1 (Vector PDF Version)
// -----------------------------------------------------------------------------

// [Config] Colors
const COLORS = {
  teal: '#44B7BA',
  red: '#BC4943',
  grey: '#64748b',
  bgTeal: '#ecfdfd',
  bgRed: '#fdf2f2',
  needle: '#334155',
};

// [Helper] Safe LocalStorage
const safeStorage = {
  getItem: (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } },
  setItem: (key, val) => { try { localStorage.setItem(key, val); } catch (e) { } },
  removeItem: (key) => { try { localStorage.removeItem(key); } catch (e) { } }
};

// [Component] Default Logo (Web Version) -> NOW USES IMPORTED IMAGE
const DefaultDNliteLogo = () => (
  <img src={logoDnlite} alt="DNlite Logo" className="h-full object-contain object-left" />
);

// [Component] Gauge Chart (Web Version)
const GaugeChart = ({ value, threshold = 7.53, max = 300 }) => {
  const safeValue = (typeof value === 'number' && !isNaN(value)) ? value : 0;
  const minLog = Math.log(1);
  const maxLog = Math.log(max);
  const valClamped = Math.max(1, Math.min(safeValue, max));
  const valLog = Math.log(valClamped);
  const threshLog = Math.log(threshold);

  const totalRange = maxLog - minLog;
  const valueRatio = (valLog - minLog) / totalRange;
  const threshRatio = (threshLog - minLog) / totalRange;

  const radius = 80;
  const center = 100;
  const innerEdgeR = 72; // radius (80) - strokeWidth(16)/2

  const angleStart = -180;
  const angleEnd = 0;
  const angleRange = 180;

  const threshAngle = angleStart + (threshRatio * angleRange);
  const needleAngle = angleStart + (valueRatio * angleRange);

  const isHighRisk = safeValue >= threshold;
  const currentColor = isHighRisk ? COLORS.red : COLORS.teal;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return { x: centerX + (radius * Math.cos(angleInRadians)), y: centerY + (radius * Math.sin(angleInRadians)) };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  };

  const needleLen = radius - 8;
  const needleBaseWidth = 6;
  const needleRad = (needleAngle * Math.PI) / 180;
  const tipX = center + needleLen * Math.cos(needleRad);
  const tipY = center + needleLen * Math.sin(needleRad);
  const baseLeftX = center + needleBaseWidth * Math.cos(needleRad - Math.PI / 2);
  const baseLeftY = center + needleBaseWidth * Math.sin(needleRad - Math.PI / 2);
  const baseRightX = center + needleBaseWidth * Math.cos(needleRad + Math.PI / 2);
  const baseRightY = center + needleBaseWidth * Math.sin(needleRad + Math.PI / 2);
  const needlePath = `M ${baseLeftX} ${baseLeftY} L ${tipX} ${tipY} L ${baseRightX} ${baseRightY} Z`;

  // Inner Arc Path
  const innerArcPath = describeArc(center, center, innerEdgeR, angleStart, angleEnd);

  // Ticks
  const tickValues = [1, 3, 10, 30, 100, 300];
  const ticks = tickValues.map(v => {
    const vLog = Math.log(v);
    const vRatio = (vLog - minLog) / totalRange;
    const angle = angleStart + (vRatio * angleRange);
    const start = polarToCartesian(center, center, innerEdgeR, angle);
    const end = polarToCartesian(center, center, innerEdgeR - 5, angle);
    const textPos = polarToCartesian(center, center, innerEdgeR - 15, angle);
    return { value: v, start, end, textPos };
  });

  return (
    <div style={{ width: '300px', height: '160px', margin: '0 auto', position: 'relative' }}>
      <svg width="300" height="160" viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <path d={describeArc(center, center, radius, angleStart, threshAngle)} fill="none" stroke={COLORS.teal} strokeWidth="16" />
        <path d={describeArc(center, center, radius, threshAngle, angleEnd)} fill="none" stroke={COLORS.red} strokeWidth="16" />

        {/* Inner Black Border */}
        <path d={innerArcPath} fill="none" stroke="black" strokeWidth="1" />

        {/* Mask/Ticks */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={t.start.x} y1={t.start.y} x2={t.end.x} y2={t.end.y} stroke="black" strokeWidth="1" />
            <text x={t.textPos.x} y={t.textPos.y + 4} textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="bold" style={{ fontFamily: 'sans-serif' }}>{t.value}</text>
          </g>
        ))}

        <path d={needlePath} fill={COLORS.needle} />
        <circle cx={center} cy={center} r="8" fill={COLORS.needle} />
      </svg>
    </div>
  );
};

// [Component] Risk Bar Chart (Web Version)
const RiskBarChart = ({ value, label, color }) => (
  <div className="flex flex-col items-center justify-end h-full w-24 mx-3 group">
    <div className="text-sm font-bold text-slate-700 mb-1">{value}</div>
    <div className="w-full rounded-t-sm transition-all duration-500" style={{ height: `${Math.max(5, (value / 10) * 100)}%`, backgroundColor: color }}></div>
    <div className="text-xs text-slate-500 mt-2 text-center font-medium">{label}</div>
  </div>
);

// -----------------------------------------------------------------------------
// MAIN APP
// -----------------------------------------------------------------------------
export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState("");


  const [isSampleData, setIsSampleData] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [logo, setLogo] = useState(safeStorage.getItem('dnlite_report_logo') || logoDnlite);
  const [companyLogo, setCompanyLogo] = useState(safeStorage.getItem('dnlite_company_logo_v2') || logoNewcl);

  const reportConfig = {
    title: 'DNlite Test Report',
    inspector: 'Lab Director',
    date: new Date().toISOString().split('T')[0],
  };

  // The useEffect for loading logos is now redundant for initial load due to useState initialization
  // but kept for consistency if there were other side effects.
  // For this specific change, it could be removed if its only purpose was initial logo loading.
  useEffect(() => {
    // If useState already initializes from safeStorage, this effect might only be needed for
    // cases where safeStorage is updated externally or if initial state was null.
    // Given the new useState, this effect's primary role for initial load is diminished.
    // However, keeping it doesn't hurt and might cover edge cases or future changes.
    const savedLogo = safeStorage.getItem('dnlite_report_logo');
    const savedCompanyLogo = safeStorage.getItem('dnlite_company_logo_v2');
    if (savedLogo && savedLogo !== logo) setLogo(savedLogo);
    if (savedCompanyLogo && savedCompanyLogo !== companyLogo) setCompanyLogo(savedCompanyLogo);
  }, []); // Empty dependency array means it runs once on mount

  const processData = (rawData) => {
    if (!rawData || rawData.length === 0) return alert("無資料 (No Data)");

    let headerRow = rawData[0];
    let dataRows = rawData.slice(1);
    // Flexible header detection
    if (headerRow && !headerRow.includes("姓名") && !headerRow.includes("Name")) {
      const idx = rawData.findIndex(r => r && (r.includes("姓名") || r.includes("Name") || r.includes("uPTM-FetA")));
      if (idx !== -1) { headerRow = rawData[idx]; dataRows = rawData.slice(idx + 1); }
    }

    if (!headerRow) return alert("無法識別標題列");

    const processed = dataRows.map((row, idx) => {
      let obj = {};
      // Map row data to header keys
      headerRow.forEach((h, i) => { if (h) obj[h.trim()] = row[i]; });

      const findKey = (k) => Object.keys(obj).find(key => key && key.toLowerCase().includes(k.toLowerCase()));

      const parseNum = (v) => {
        if (typeof v === 'number') return v;
        if (typeof v === 'string') return parseFloat(v.replace(/[^\d.-]/g, '')) || 0;
        return 0;
      };

      const rawUptm = obj[findKey("uPTM")] || obj[findKey("FetA")] || "0";
      const rawUcr = obj[findKey("Creatinine")] || obj[findKey("UCr")] || "1";

      const valUptm = parseFloat(rawUptm);
      const valUcr = parseFloat(rawUcr);

      let finalDispUptm = isNaN(valUptm) ? rawUptm : valUptm.toFixed(2); // Default
      let finalDispDnlite = "";
      let finalValDnlite = 0;

      // Custom Conditions logic
      const isLowCondition = (String(rawUptm).includes('<')) || (!isNaN(valUptm) && valUptm < 5.428);
      const isHighCondition = (String(rawUptm).includes('>')) || (!isNaN(valUptm) && valUptm > 250);

      if (isLowCondition) {
        finalDispUptm = "<5.428";
        finalDispDnlite = "<7.53";
        finalValDnlite = 0; // Low Risk
      } else if (isHighCondition) {
        finalDispUptm = "> 250";
        finalDispDnlite = ">7.53";
        finalValDnlite = 999; // High Risk
      } else {
        // Normal Calc
        finalDispUptm = !isNaN(valUptm) ? valUptm.toFixed(2) : rawUptm;
        if (valUcr > 0 && !isNaN(valUptm)) {
          finalValDnlite = valUptm / valUcr;
          finalDispDnlite = finalValDnlite.toFixed(2);
        } else {
          finalDispDnlite = "-";
          finalValDnlite = 0;
        }
      }

      obj._val_uptm = valUptm;
      obj._val_ucr = valUcr;
      obj._disp_uptm = finalDispUptm;
      obj._disp_ucr = isNaN(valUcr) ? rawUcr : valUcr.toFixed(2);
      obj._val_dnlite = finalValDnlite;
      obj._disp_dnlite = finalDispDnlite;

      // Logic completed above. Redundant block removed.

      // Update key mapping to be more specific for Chinese headers
      obj._name = obj[findKey("姓名")] || obj[findKey("Name")] || obj[findKey("Patient")] || "Unknown";
      obj._gender = obj[findKey("性別")] || obj[findKey("Gender")] || obj[findKey("Sex")] || "Unknown";

      const formatDate = (input) => {
        if (!input) return "";
        let date;
        // Check if input is an Excel serial number (valid range: 1 to ~100000)
        // Excel serial 1 = 1900-01-01, serial 100000 ≈ year 2173
        if (typeof input === 'number' && input >= 1 && input < 100000) {
          // Excel serial number
          date = new Date(Math.round((input - 25569) * 864e5));
        } else {
          // Handle string input
          let dateStr = String(input).trim();
          // Normalize slash-separated dates (e.g., "1980/1/1" -> "1980-01-01")
          if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              const year = parts[0].padStart(4, '0');
              const month = parts[1].padStart(2, '0');
              const day = parts[2].padStart(2, '0');
              dateStr = `${year}-${month}-${day}`;
            }
          }
          date = new Date(dateStr);
        }
        if (isNaN(date.getTime())) return input;
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      };

      const rawDob = obj[findKey("出生")] || obj[findKey("Birth")] || obj[findKey("DOB")] || "1960-01-01";
      obj._dob = formatDate(rawDob);

      // Calculate Age from DOB
      const birthDate = new Date(obj._dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      obj._age = age.toString();

      const rawDate = obj[findKey("採檢")] || obj[findKey("Sampling")] || obj[findKey("日期")] || obj[findKey("Date")] || reportConfig.date;
      obj._date = formatDate(rawDate);

      // Report Date = Today (Generation Date)
      obj._reportDate = formatDate(new Date());

      obj._inspector = obj[findKey("實驗室主管")] || obj[findKey("Lab Director")] || obj[findKey("Director")] || obj[findKey("Inspector")] || reportConfig.inspector;
      obj._unit = obj[findKey("送檢單位")] || obj[findKey("單位")] || obj[findKey("Unit")] || obj[findKey("Clinic")] || "GluCare. Health";
      obj._mrn = obj[findKey("病歷")] || obj[findKey("MRN")] || "N/A";
      obj._reportNo = obj[findKey("報告編號")] || obj[findKey("報告")] || obj[findKey("Report")] || String(1000 + idx);

      obj._id = obj[findKey("身分")] || obj[findKey("ID")] || "A123456789";

      // Stamp Processing
      const mtKey = findKey("醫事") || findKey("MedTech") || findKey("檢驗師");
      const sigKey = findKey("簽署") || findKey("Signatory");

      obj._medTechName = (obj[mtKey] || "林翠仙").toString().trim(); // Default
      obj._signatoryName = (obj[sigKey] || obj[findKey("Inspector")] || "林翠仙").toString().trim(); // Default

      obj._medTechStamp = STAMP_OPTIONS[obj._medTechName] || null;
      obj._signatoryStamp = STAMP_OPTIONS[obj._signatoryName] || null;

      return obj;
    }).filter(row => row._name && row._name !== "Unknown");

    // Update global config from first row if available
    if (processed.length > 0) {
      if (processed[0]._inspector) reportConfig.inspector = processed[0]._inspector; // Keep for backward compat?
      if (processed[0]._reportDate) reportConfig.date = processed[0]._reportDate;
    }

    setData(processed);
    setStep(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setIsSampleData(false);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
        processData(rawData);
      } catch (err) { console.error(err); alert("檔案解析失敗"); }
    };
  };

  const handleLogoUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        if (type === 'main') {
          setLogo(base64);
          safeStorage.setItem('dnlite_report_logo', base64);
        } else {
          setCompanyLogo(base64);
          safeStorage.setItem('dnlite_company_logo_v2', base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = [
      "送檢單位", "採檢日期", "報告編號",
      "姓名", "病歷號碼", "性別", "出生日期", "身分證字號",
      "uPTM-FetA", "Urine creatinine (UCr)", "DNlite (uPTM-FetA/UCr)",
      "醫事檢驗師", "報告簽署人"
    ];
    const data = [
      headers,
      ["GluCare. Health", "2024-12-25", "1001", "陳小明", "MRN001", "男", "1980-01-01", "A123456789", "550", "1.2", "", "林翠仙", "古琪茗"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
      { wch: 20 }, // 送檢單位
      { wch: 15 }, // 採檢日期
      { wch: 15 }, // 報告編號
      { wch: 15 }, // 姓名
      { wch: 15 }, // 病歷號碼
      { wch: 10 }, // 性別
      { wch: 15 }, // 出生日期
      { wch: 15 }, // 身分證字號
      { wch: 15 }, // uPTM-FetA
      { wch: 25 }, // Urine creatinine
      { wch: 25 }, // DNlite
      { wch: 15 }, // 醫事檢驗師
      { wch: 15 }  // 報告簽署人
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "DNlite_Report_Template.xlsx");
  };

  const loadSample = () => {
    // Updated sample without "Age" (col 1) and "Report Date" (which was not in sample but headers)
    // Old Sample: ["姓名", "年齡", "性別", "出生日期", "身分證字號", "送檢單位", "採檢日期", "病歷號碼", "uPTM-FetA", "UCr", "醫事檢驗師", "報告簽署人"]
    // New Sample: ["姓名", "性別", "出生日期", "身分證字號", "送檢單位", "採檢日期", "病歷號碼", "uPTM-FetA", "UCr", "醫事檢驗師", "報告簽署人"]
    setIsSampleData(true);
    setUploadedFileName("Sample_Data");
    const sample = [
      ["送檢單位", "採檢日期", "報告編號", "姓名", "病歷號碼", "性別", "出生日期", "身分證字號", "uPTM-FetA", "UCr", "醫事檢驗師", "報告簽署人"],
      ["XXX", "2024-12-24", "1001", "陳大文 (一般)", "88001", "男", "1980/5/20", "A123456789", "100", "1.0", "林翠仙", "古琪茗"],
      ["XXX", "2024/12/24", "1002", "李小美 (低值)", "88002", "女", "1990/8/15", "B234567890", "< 5.428", "1.0", "李家宏", "林珈妤"],
      ["XXX", "2024-12-24", "1003", "王大明 (高值)", "88003", "男", "1954/4/23", "C345678901", "300", "1.5", "曾盈慈", "林翠仙"]
    ];
    processData(sample);
  };

  const handleDownloadSingle = async () => {
    setIsGenerating(true);
    setProgress("生成向量 PDF...");
    try {
      // Use defaults if state logos are null
      const useLogo = logo || logoDnlite;
      const useCompanyLogo = companyLogo || logoGlucare;

      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const reportDate = `${y}-${m}-${d}`;
      const dateStr = `${y}${m}${d}`;

      // Overwrite report date with generation date
      const printData = { ...data[0], _reportDate: reportDate };

      const blob = await pdf(<PDFReport data={printData} logo={useLogo} companyLogo={useCompanyLogo} inspector={reportConfig.inspector} />).toBlob();
      saveAs(blob, `${dateStr}_${printData._reportNo}.pdf`);
    } catch (e) { console.error(e); alert("生成失敗: " + e.message); }
    finally { setIsGenerating(false); setProgress(""); }
  };

  const logDownloadStats = async (count, fileName, orgName) => {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRVLGFptG942m5X5MwC4HQzSCxOgCFv6IS7ntCZRQo4Nnoa6CoGlQHDRXSDxFnsABflw/exec";

    try {
      const payload = {
        count: count,
        fileName: fileName,
        orgName: orgName || "Unknown"
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Download stats logged successfully");
    } catch (error) {
      console.error("Failed to log download stats:", error);
    }
  };

  const handleDownloadZip = async () => {
    setIsGenerating(true);
    const zip = new JSZip();

    try {
      const useLogo = logo || logoDnlite;
      const useCompanyLogo = companyLogo || logoGlucare;

      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const reportDate = `${y}-${m}-${d}`;
      const dateStr = `${y}${m}${d}`;

      // Tracking
      if (!isSampleData) {
        // Fire and forget
        const orgName = data[0]?._unit || "Unknown";
        logDownloadStats(data.length, uploadedFileName, orgName);
      }

      for (let i = 0; i < data.length; i++) {
        const person = data[i];
        const printData = { ...person, _reportDate: reportDate };
        setProgress(`${person._name} (${i + 1}/${data.length})`);

        // Allow UI update
        await new Promise(r => setTimeout(r, 0));

        // Generate Vector PDF
        const blob = await pdf(<PDFReport data={printData} logo={useLogo} companyLogo={useCompanyLogo} inspector={reportConfig.inspector} />).toBlob();
        zip.file(`${dateStr}_${person._reportNo}.pdf`, blob);
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${dateStr}_DNlite_Report_NewCL.ZIP`);
    } catch (e) { console.error(e); alert("生成失敗: " + e.message); }
    finally { setIsGenerating(false); setProgress(""); }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-800">DNlite Report for <span style={{ color: COLORS.teal }}>NEWCL 欣奕醫事檢驗所</span></h1>
          <p className="text-slate-500 mt-2">Vector PDF Engine</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-sm border-2 border-dashed border-slate-300 flex flex-col items-center transition-all">
          <label className="cursor-pointer text-white px-8 py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95" style={{ backgroundColor: COLORS.teal }}>
            上傳 Excel 檔案
            <input type="file" accept=".xlsx, .csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <div className="flex gap-4 mt-6">
            <button onClick={handleDownloadTemplate} className="text-sm font-medium text-slate-500 hover:text-teal-600 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition"><FileDown className="w-4 h-4" /> 下載 Excel 範本 (Download Template)</button>
            <button onClick={loadSample} className="text-sm font-medium text-slate-500 hover:text-teal-600 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition"><RefreshCw className="w-4 h-4" /> 載入範例 (Sample)</button>
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl px-4">
          <h3 className="text-xs font-bold text-slate-500 mb-1">免責聲明 / Disclaimer</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            本報告產生器僅供數據輸出使用，請務必仔細檢查內容正確性。若因數據輸入錯誤或格式轉換異常導致之錯誤，本系統概不負責。<br />
            This report generator is for data output only. Please verify content accuracy carefully. We are not responsible for any errors or damages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 pb-20 pt-20">
      {/* Toolbar */}
      <div className="print-hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur shadow-sm z-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-900 font-medium text-sm">← 返回</button>

        </div>
        <div className="flex gap-2">
          <button onClick={handleDownloadSingle} disabled={isGenerating} className="px-3 py-2 bg-white border border-slate-300 rounded text-sm hover:bg-slate-50 flex items-center gap-1 opacity-90"><FileDown className="w-4 h-4" /> 預覽 PDF (Preview)</button>
          <button onClick={handleDownloadZip} disabled={isGenerating} className="px-4 py-2 text-white rounded text-sm font-bold flex items-center gap-2 disabled:opacity-50" style={{ backgroundColor: COLORS.teal }}>
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />} {isGenerating ? progress || "處理中..." : "下載 ZIP (Vector)"}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 print:block print:gap-0">
        <div className="text-center text-slate-500 mb-2">以下預覽畫面僅供參考，實際輸出為高解析度向量 PDF</div>
        {data.map((person, index) => {
          const dnliteVal = parseFloat(person._val_dnlite);
          const isRisk = dnliteVal >= 7.53;
          const statusColor = isRisk ? COLORS.red : COLORS.teal;

          return (
            <div key={index} id={`report-wrapper-${index}`}>

              {/* --- PAGE 1 --- */}
              <div className="report-sheet">
                {/* Header */}
                <div className="header-section">
                  <div className="flex flex-col justify-end h-full w-full pb-2">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <div className="flex items-end gap-3 mb-2">
                          <div className="h-10 flex items-center">
                            {logo && <img src={logo} alt="Logo" className="h-full object-contain object-left" />}
                          </div>
                          <span className="text-2xl font-bold text-slate-800 tracking-wide leading-none pb-1">DNlite<sup className="text-xs">®</sup> <span style={{ color: COLORS.teal }}>遠腎佳</span></span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 tracking-tight mt-1">腎功能預後檢測報告</div>
                      </div>
                      <div className="h-14 w-[150px] flex justify-end items-end mb-1">
                        {companyLogo ? <img src={companyLogo} alt="Company Logo" className="h-full object-contain object-right" /> : <div className="text-[10px] text-slate-300 border border-dashed border-slate-300 rounded px-2 py-1 w-full text-center">Company Logo Area</div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="content-section">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 pl-2" style={{ borderColor: COLORS.teal }}>個人資訊</h3>
                    <div className="border border-slate-300 text-sm">
                      {/* Row 1 Headers (3 Cols) */}
                      <div className="flex border-b border-slate-300 bg-slate-100">
                        <div className="w-1/3 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">送檢單位</div>
                        <div className="w-1/3 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">採檢日期</div>
                        <div className="w-1/3 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">報告編號</div>
                      </div>
                      {/* Row 1 Values (3 Cols) */}
                      <div className="flex border-b border-slate-300">
                        <div className="w-1/3 border-r border-slate-300 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._unit}</div>
                        <div className="w-1/3 border-r border-slate-300 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._date}</div>
                        <div className="w-1/3 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._reportNo}</div>
                      </div>
                      {/* Row 2 Headers (5 Cols) */}
                      <div className="flex border-b border-slate-300 bg-slate-100">
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">姓名</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">病歷號碼</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">性別</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">出生日期</div>
                        <div className="w-1/5 p-1 text-center font-bold text-slate-500 text-xs flex items-center justify-center">身分證字號</div>
                      </div>
                      {/* Row 2 Values (5 Cols) */}
                      <div className="flex">
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center text-slate-900 font-bold text-sm flex items-center justify-center">{person._name}</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._mrn}</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._gender}</div>
                        <div className="w-1/5 border-r border-slate-300 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._dob}</div>
                        <div className="w-1/5 p-1 text-center text-slate-900 text-sm flex items-center justify-center">{person._id}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 pl-2" style={{ borderColor: COLORS.teal }}>DNlite 檢測結果</h3>
                    <table className="w-full text-sm border-collapse border border-slate-300">
                      <thead style={{ backgroundColor: '#cbd5e1' }}>
                        <tr>
                          <th className="border border-slate-300 p-2 text-left w-1/4">檢測項目</th>
                          <th className="border border-slate-300 p-2 text-center">結果</th>
                          <th className="border border-slate-300 p-2 text-center w-1/6">單位</th>
                          <th className="border border-slate-300 p-2 text-left w-1/3 text-center">備註</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-2 font-bold text-slate-900" style={{ backgroundColor: '#dce3eb' }}>uPTM-FetA</td>
                          <td className="border border-slate-300 p-2 font-bold text-center">{person._disp_uptm}</td>
                          <td className="border border-slate-300 p-2 text-center">ng/mL</td>
                          <td className="border border-slate-300 p-2 text-slate-500"></td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-2 font-bold text-slate-900" style={{ backgroundColor: '#dce3eb' }}>Urine creatinine (UCr)</td>
                          <td className="border border-slate-300 p-2 font-bold text-center">{person._disp_ucr}</td>
                          <td className="border border-slate-300 p-2 text-center">mg/mL</td>
                          <td className="border border-slate-300 p-2 text-slate-500 text-center"><span className="text-xs">參考區間: 0.60-2.50</span></td>
                        </tr>
                        <tr style={{ backgroundColor: isRisk ? COLORS.bgRed : COLORS.bgTeal }}>
                          <td className="border border-slate-300 p-2 font-bold whitespace-nowrap text-slate-900" style={{ backgroundColor: '#dce3eb' }}>DNlite (uPTM-FetA/UCr)</td>
                          <td className="border border-slate-300 p-2 font-bold text-center" style={{ color: statusColor }}>{person._disp_dnlite}</td>
                          <td className="border border-slate-300 p-2 text-center">ng/mg</td>
                          <td className="border border-slate-300 p-2 font-bold text-slate-500 text-center"><span className="text-xs">臨床建議值: 7.53</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-8 items-center">
                    <div className="w-full flex justify-center"><GaugeChart value={dnliteVal} threshold={7.53} max={300} /></div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div><div className="text-sm text-slate-500 mb-1">您的 DNlite 數值為</div><div className="text-3xl font-extrabold" style={{ color: statusColor }}>{person._disp_dnlite} <span className="text-sm font-medium text-slate-400">ng/mg</span></div></div>
                      <div><div className="text-sm text-slate-500 mb-2">風險評估:</div><div className="py-2 px-5 text-white text-lg font-bold rounded-lg flex items-center gap-2 shadow-sm w-fit" style={{ backgroundColor: statusColor }}>{isRisk ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}{isRisk ? "高度風險" : "低度風險"}</div></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="border rounded-xl p-6 bg-white" style={{ borderColor: statusColor, backgroundColor: isRisk ? COLORS.bgRed : COLORS.bgTeal }}>
                      <p className="text-sm text-slate-700 leading-relaxed text-justify">
                        {isRisk ? (
                          <>
                            <span>若您為<span style={{ color: COLORS.red, fontWeight: 'bold' }}>二型糖尿病患</span>，5 年腎功能惡化的風險是其他人的 9.5 倍，末期腎病變風險為 3.5 倍。</span>
                            <br />
                            <span>請與您的醫師討論及擬定健康管理策略，並且每三個月追蹤檢驗 DNlite。</span>
                            <br /><br />
                            <span>若您<span style={{ color: COLORS.red, fontWeight: 'bold' }}>非糖尿病患</span>，5 年腎功能惡化的風險是其他人的 4 倍，末期腎病變風險為 1.6 倍。</span>
                            <br />
                            <span>請考慮於三個月內再檢測一次 DNlite，如仍為高風險，建議您尋求醫師協助，綜合評估健康狀況。</span>
                          </>
                        ) : (
                          "您的腎功能處於正常範圍。請繼續目前的血糖監測、藥物管理和併發症篩檢計畫。建議每年進行一次 DNlite 腎功能檢測，以及時評估腎病風險。"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="footer-section mt-4 border-t border-slate-300 pt-2">
                  <div className="flex items-start">
                    {/* Med Tech */}
                    <div className="flex border border-slate-300 mr-4">
                      <div className="w-[30px] bg-slate-100 text-[8px] text-slate-500 flex items-center justify-center p-1 leading-tight border-r border-slate-300">醫<br />事<br />檢<br />驗<br />師</div>
                      <div className="w-[100px] h-[60px] flex items-center justify-center p-1">
                        {person._medTechStamp ? (
                          <img src={person._medTechStamp} alt="Stamp" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-sm">{person._medTechName}</span>
                        )}
                      </div>
                    </div>

                    {/* Signatory */}
                    <div className="flex border border-slate-300 mr-4">
                      <div className="w-[30px] bg-slate-100 text-[8px] text-slate-500 flex items-center justify-center p-1 leading-tight border-r border-slate-300">報<br />告<br />簽<br />署<br />人</div>
                      <div className="w-[100px] h-[60px] flex items-center justify-center p-1">
                        {person._signatoryStamp ? (
                          <img src={person._signatoryStamp} alt="Stamp" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-sm">{reportConfig.inspector || person._signatoryName}</span>
                        )}
                      </div>
                    </div>

                    {/* Report Date */}
                    <div className="flex border border-slate-300 mr-4">
                      <div className="w-[30px] bg-slate-100 text-[8px] text-slate-500 flex items-center justify-center p-1 leading-tight border-r border-slate-300">報<br />告<br />日<br />期</div>
                      <div className="w-[100px] h-[60px] flex items-center justify-center p-1">
                        <span className="text-sm">{person._reportDate}</span>
                      </div>
                    </div>

                    {/* Lab Info */}
                    <div className="flex-1 flex flex-col justify-center text-[10px] text-slate-500 ml-4">
                      <div>欣奕醫事檢驗所 第二實驗室</div>
                      <div>新北市永和區中山路一段 168 號 11 樓</div>
                      <div>TEL 02-29209181</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- PAGE 2 --- */}
              <div className="report-sheet relative box-border overflow-hidden flex flex-col">
                <div className="h-[90px] px-10 pt-8 flex justify-between items-center bg-white flex-none">
                  <h1 className="text-2xl font-extrabold text-white tracking-tight px-4 py-1 rounded" style={{ backgroundColor: COLORS.teal }}>風險定義參考</h1>

                </div>
                <div className="flex-1 px-10 pt-4 pb-10 flex flex-col justify-start">

                  {/* Top Block: Risk Definitions */}
                  {/* Top Block: Risk Definitions */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-8">
                      {/* Left Clean: Renal Function Worsening */}
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2 mt-4"><div className="w-1 h-4 bg-teal-500 mr-2"></div><h3 className="font-bold text-slate-800 text-sm">腎功能惡化風險</h3></div>
                        <div className="text-sm text-slate-700 mb-3 font-bold">若 DNlite 遠腎佳檢測結果為「高度風險」：</div>
                        <div className="mb-4 space-y-2">
                          <div className="flex items-start"><div className="w-1.5 h-1.5 bg-teal-500 mr-2 mt-1.5 flex-none mb-1"></div><div className="text-xs text-slate-700 leading-snug"><span className="text-red-600 font-bold">二型糖尿病患</span><br />5年內腎功能惡化的風險為一般二型糖尿病患的 <span className="font-bold text-slate-900">9.5 倍</span></div></div>
                          <div className="flex items-start"><div className="w-1.5 h-1.5 bg-teal-500 mr-2 mt-1.5 flex-none mb-1"></div><div className="text-xs text-slate-700 leading-snug"><span className="text-red-600 font-bold">非糖尿病患</span><br />5年內腎功能惡化的風險為一般非糖尿病患的 <span className="font-bold text-slate-900">4.0 倍</span></div></div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {/* Chart 1: Type 2 */}
                          <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-500 mb-4">二型糖尿病</div>
                            <div className="flex items-end justify-center gap-6 h-[80px] w-full">
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-slate-600">1</span><div className="w-12 h-2 bg-teal-500 rounded-t-sm"></div><span className="text-[8px] text-slate-400 mt-1">低度風險</span></div>
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-red-600">9.5</span><div className="w-12 h-16 bg-red-500 rounded-t-sm"></div><span className="text-[8px] text-slate-600 mt-1 font-bold">高度風險</span></div>
                            </div>
                          </div>
                          {/* Chart 2: Non-DM */}
                          <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-500 mb-4">非糖尿病</div>
                            <div className="flex items-end justify-center gap-6 h-[80px] w-full">
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-slate-600">1</span><div className="w-12 h-2 bg-teal-500 rounded-t-sm"></div><span className="text-[8px] text-slate-400 mt-1">低度風險</span></div>
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-red-600">4.0</span><div className="w-12 h-8 bg-red-500 rounded-t-sm"></div><span className="text-[8px] text-slate-600 mt-1 font-bold">高度風險</span></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Clean: ESRD Risk */}
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2 mt-4"><div className="w-1 h-4 bg-teal-500 mr-2"></div><h3 className="font-bold text-slate-800 text-sm">末期腎病變風險</h3></div>
                        <div className="text-sm text-slate-700 mb-3 font-bold">若 DNlite 遠腎佳檢測結果為「高度風險」：</div>
                        <div className="mb-4 space-y-2">
                          <div className="flex items-start"><div className="w-1.5 h-1.5 bg-teal-500 mr-2 mt-1.5 flex-none mb-1"></div><div className="text-xs text-slate-700 leading-snug"><span className="text-red-600 font-bold">二型糖尿病患</span><br />5年內末期腎病變的風險為一般二型糖尿病患的 <span className="font-bold text-slate-900">3.5 倍</span></div></div>
                          <div className="flex items-start"><div className="w-1.5 h-1.5 bg-teal-500 mr-2 mt-1.5 flex-none mb-1"></div><div className="text-xs text-slate-700 leading-snug"><span className="text-red-600 font-bold">非糖尿病患</span><br />5年內末期腎病變的風險為一般非糖尿病患的 <span className="font-bold text-slate-900">1.6 倍</span></div></div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {/* Chart 3: Type 2 */}
                          <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-500 mb-4">二型糖尿病</div>
                            <div className="flex items-end justify-center gap-6 h-[80px] w-full">
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-slate-600">1</span><div className="w-12 h-2 bg-teal-500 rounded-t-sm"></div><span className="text-[8px] text-slate-400 mt-1">低度風險</span></div>
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-red-600">3.5</span><div className="w-12 h-6 bg-red-500 rounded-t-sm"></div><span className="text-[8px] text-slate-600 mt-1 font-bold">高度風險</span></div>
                            </div>
                          </div>
                          {/* Chart 4: Non-DM */}
                          <div className="bg-slate-50 p-2 rounded border border-slate-200 flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-500 mb-4">非糖尿病</div>
                            <div className="flex items-end justify-center gap-6 h-[80px] w-full">
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-slate-600">1</span><div className="w-12 h-2 bg-teal-500 rounded-t-sm"></div><span className="text-[8px] text-slate-400 mt-1">低度風險</span></div>
                              <div className="flex flex-col items-center"><span className="text-[10px] font-bold text-red-600">1.6</span><div className="w-12 h-3 bg-red-500 rounded-t-sm"></div><span className="text-[8px] text-slate-600 mt-1 font-bold">高度風險</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <div className="text-[10px] text-slate-500 leading-snug space-y-1">
                      <div><span className="font-bold">備註 1:</span> 「腎功能惡化」臨床上以<span className="underline decoration-slate-300">腎絲球過濾率下降比例超過30%</span>表達</div>
                      <div><span className="font-bold">備註 2:</span> 「末期腎病變」臨床上以<span className="underline decoration-slate-300">需腎移植、透析或3個月內血清肌酸酐增加50%以上</span>表達</div>
                      <div><span className="font-bold">備註 3:</span> 台灣二型糖尿病患的慢性腎病變盛行率為 15%~18%，推估5年慢性腎病變發生率約為 5%~9%</div>
                      <div><span className="font-bold">備註 4:</span> 台灣二型糖尿病患的末期腎病變盛行率為 5%~7%，推估5年末期腎病變發生率約為 1.25%~2.33%</div>
                      <div><span className="font-bold">備註 5:</span> 台灣一般成年人的慢性腎病變盛行率為 10%~12%，推估5年慢性腎病變發生率約為 3.3%~6%</div>
                      <div><span className="font-bold">備註 6:</span> 台灣一般成年人的末期腎病變盛行率為 0.35%~0.5%，推估5年末期腎病變發生率約為 0.09%~0.17%</div>
                    </div>
                  </div>

                  {/* Precautions Section */}
                  <div className="mt-6 flex-1 -mx-10 px-10 py-6">
                    <div className="flex items-center mb-4"><div className="w-1 h-3.5 bg-teal-500 mr-2"></div><h3 className="font-bold text-slate-800 text-sm">注意事項及建議追蹤方式</h3></div>
                    <div className="flex flex-col gap-4">
                      {/* Low Risk */}
                      <div className="border border-teal-500 rounded-lg overflow-hidden">
                        <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1.5">低度風險</div>
                        <div className="p-3 bg-white">
                          <p className="text-xs text-slate-800 leading-relaxed text-justify">
                            表示您的腎功能屬於一般狀態。請持續維持目前的血糖監測、藥物管理及併發症檢測計畫。建議<span className="font-bold">每年</span>進行一次遠腎佳 DNlite 腎功能檢測。
                          </p>
                        </div>
                      </div>

                      {/* High Risk */}
                      <div className="border border-red-500 rounded-lg overflow-hidden">
                        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5">高度風險</div>
                        <div className="p-3 bg-white">
                          <p className="text-xs text-slate-800 leading-relaxed text-justify">
                            表示您的腎功能屬於對健康不利的狀態，請盡速與您的醫師聯繫、討論及擬定您的健康管理策略。建議<span className="font-bold">每 3-6 個月</span>進行一次遠腎佳 DNlite 腎功能檢測。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* References Section */}
                  <div className="mt-4">
                    <div className="flex items-center mb-2"><div className="w-1 h-3.5 bg-teal-500 mr-2"></div><h3 className="font-bold text-slate-800 text-sm">參考文獻</h3></div>
                    <ul className="text-[10px] text-slate-500 leading-tight space-y-1 list-none pl-1">
                      <li>• Nat Rev Nephrol. 2021 (17) 740-750.</li>
                      <li>• Am J Nephrol. 2023 Oct 9. doi: 10.1159/000534514.</li>
                      <li>• IFU: DNlite-DKD uPTM-FetA ELISA Kit (8103105).</li>
                      <li>• DNlite-DKD uPTM-FetA ELISA Kit: Technical Notice (TN8103105-04)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .report-sheet {
            width: 794px; 
            height: 1123px;
            margin: 0 auto 40px;
            background: white;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .header-section {
            position: absolute; top: 0; left: 0; right: 0;
            height: 150px;
            padding: 20px 48px 10px;
            border-bottom: 4px solid ${COLORS.teal};
            display: flex; justify-content: space-between; align-items: flex-end;
            background: white; z-index: 10;
        }
        .content-section {
            position: absolute; top: 160px; bottom: 100px; left: 0; right: 0;
            padding: 0 48px;
            display: flex; flex-direction: column;
        }
        .footer-section {
            position: absolute; bottom: 0; left: 0; right: 0;
            height: 100px; 
            padding: 0 48px 24px;
            background: white;
        }
        @media print {
            .print-hidden { display: none !important; }
            body { background: white; margin: 0; padding: 0; }
        }
      `}</style>
    </div>
  );
}
