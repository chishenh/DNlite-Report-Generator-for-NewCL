
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

  return (
    <div style={{ width: '300px', height: '160px', margin: '0 auto', position: 'relative' }}>
      <svg width="300" height="160" viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <path d={describeArc(center, center, radius, angleStart, threshAngle)} fill="none" stroke={COLORS.teal} strokeWidth="16" />
        <path d={describeArc(center, center, radius, threshAngle, angleEnd)} fill="none" stroke={COLORS.red} strokeWidth="16" />
        <text x={polarToCartesian(center, center, radius + 20, threshAngle).x} y={polarToCartesian(center, center, radius + 20, threshAngle).y} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">{threshold}</text>
        <text x={polarToCartesian(center, center, radius + 20, angleStart).x} y={polarToCartesian(center, center, radius + 20, angleStart).y + 5} textAnchor="start" fontSize="10" fill="#94a3b8">1</text>
        <text x={polarToCartesian(center, center, radius + 20, angleEnd).x} y={polarToCartesian(center, center, radius + 20, angleEnd).y + 5} textAnchor="end" fontSize="10" fill="#94a3b8">300</text>
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

      const keyUptm = findKey("uPTM") || findKey("FetA");
      const keyUcr = findKey("UCr") || findKey("Creatinine");
      const keyDnlite = findKey("DNlite");

      const rawUptm = obj[keyUptm];
      const rawUcr = obj[keyUcr];
      const valUptm = parseNum(rawUptm);
      const valUcr = parseNum(rawUcr);
      let valDnlite = parseNum(obj[keyDnlite]);

      // Calculate DNlite if missing but raw values exist
      if ((valDnlite === 0 || isNaN(valDnlite)) && valUcr !== 0) {
        valDnlite = parseFloat((valUptm / valUcr).toFixed(2));
      }

      obj._disp_uptm = rawUptm || valUptm.toString();
      obj._disp_ucr = rawUcr || valUcr.toString();
      obj._val_dnlite = valDnlite;
      obj._disp_dnlite = valDnlite.toFixed(2);

      obj._name = obj[findKey("姓名")] || obj[findKey("Name")] || "Unknown";
      obj._age = obj[findKey("年齡")] || obj[findKey("Age")] || "-";
      obj._gender = obj[findKey("性別")] || obj[findKey("Gender")] || obj[findKey("Sex")] || "-";
      obj._date = obj[findKey("日期")] || obj[findKey("Date")] || obj[findKey("Sampling")] || reportConfig.date;
      obj._reportDate = obj[findKey("Report Date")] || obj[findKey("ReportDate")] || obj._date;
      obj._inspector = obj[findKey("Lab Director")] || obj[findKey("Director")] || obj[findKey("Inspector")] || reportConfig.inspector;
      obj._unit = obj[findKey("單位")] || obj[findKey("Unit")] || obj[findKey("Clinic")] || "GluCare. Health";
      obj._mrn = obj[findKey("病歷")] || obj[findKey("MRN")] || "N/A";
      obj._reportNo = obj[findKey("報告")] || obj[findKey("Report")] || String(1000 + idx);

      return obj;
    }).filter(row => row._name && row._name !== "Unknown");

    // Update global config from first row if available
    if (processed.length > 0) {
      if (processed[0]._inspector) reportConfig.inspector = processed[0]._inspector;
      if (processed[0]._reportDate) reportConfig.date = processed[0]._reportDate;
    }

    setData(processed);
    setStep(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      "Clinic", "Sampling Date", "Report Date", "Report Number",
      "Patient Name", "MRN", "Gender", "Age",
      "Lab. Director", "uPTM-FetA", "Urine creatinine (UCr)", "DNlite (uPTM-FetA/UCr)"
    ];
    const data = [
      headers,
      ["GluCare. Health", "2025-12-21", "2025-12-21", "1001", "John Doe", "MRN12345", "Male", "60", "Dr. Wang", "550", "1.18", ""]
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "DNlite_Report_Template.xlsx");
  };

  const loadSample = () => {
    const sample = [["姓名", "Age", "Gender", "Clinic", "Sampling Date", "MRN", "uPTM-FetA", "UCr"], ["John Doe", "60", "Male", "GluCare. Health", "2025-10-28", "16656", "550", "1.18"], ["Jane Smith", "55", "Female", "GluCare. Health", "2025-10-28", "16657", "120.5", "0.8"]];
    processData(sample);
  };

  const handleDownloadSingle = async () => {
    setIsGenerating(true);
    setProgress("生成向量 PDF...");
    try {
      // Use defaults if state logos are null
      const useLogo = logo || logoDnlite;
      const useCompanyLogo = companyLogo || logoGlucare;

      const blob = await pdf(<PDFReport data={data[0]} logo={useLogo} companyLogo={useCompanyLogo} inspector={reportConfig.inspector} />).toBlob();
      saveAs(blob, `${data[0]._name}_Report.pdf`);
    } catch (e) { console.error(e); alert("生成失敗: " + e.message); }
    finally { setIsGenerating(false); setProgress(""); }
  };

  const handleDownloadZip = async () => {
    setIsGenerating(true);
    const zip = new JSZip();

    try {
      const useLogo = logo || logoDnlite;
      const useCompanyLogo = companyLogo || logoGlucare;

      for (let i = 0; i < data.length; i++) {
        const person = data[i];
        setProgress(`${person._name} (${i + 1}/${data.length})`);

        // Allow UI update
        await new Promise(r => setTimeout(r, 0));

        // Generate Vector PDF
        const blob = await pdf(<PDFReport data={person} logo={useLogo} companyLogo={useCompanyLogo} inspector={reportConfig.inspector} />).toBlob();
        zip.file(`${person._name}_Report.pdf`, blob);
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `DNlite_Reports_Vector.zip`);
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 pb-20 pt-20">
      {/* Toolbar */}
      <div className="print-hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur shadow-sm z-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-900 font-medium text-sm">← 返回</button>
          <div className="flex items-center gap-2">
            {logo ? (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"><span className="text-[10px] font-bold text-slate-500">DNlite OK</span><button onClick={() => { setLogo(null); safeStorage.removeItem('dnlite_report_logo'); }}><X className="w-3 h-3 text-slate-400" /></button></div>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1 rounded border border-slate-200 text-xs hover:bg-slate-100" title="Upload DNlite Logo"><ImageIcon className="w-3 h-3" /> DNlite Logo<input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'main')} /></label>
            )}
          </div>
          <div className="flex items-center gap-2">
            {companyLogo ? (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"><span className="text-[10px] font-bold text-slate-500">Co. OK</span><button onClick={() => { setCompanyLogo(null); safeStorage.removeItem('dnlite_company_logo'); }}><X className="w-3 h-3 text-slate-400" /></button></div>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1 rounded border border-slate-200 text-xs hover:bg-slate-100" title="Upload Company Logo"><Building2 className="w-3 h-3" /> Company Logo<input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, 'company')} /></label>
            )}
          </div>
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
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div className="h-16 w-auto max-w-[220px] flex items-center mb-2">
                      {logo ? <img src={logo} alt="Logo" className="h-full object-contain object-left" /> : <DefaultDNliteLogo />}
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"><span style={{ color: COLORS.teal }}>遠腎佳</span>糖尿病腎病預後檢測</h1>
                  </div>
                  <div className="h-16 w-[180px] flex justify-end items-start mt-2">
                    {companyLogo ? <img src={companyLogo} alt="Company Logo" className="h-full object-contain object-right" /> : <div className="text-xs text-slate-300 border border-dashed border-slate-300 rounded px-2 py-4 w-full text-center">Company Logo Area</div>}
                  </div>
                </div>

                {/* Content */}
                <div className="content-section">
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 border-l-4 pl-2" style={{ borderColor: COLORS.teal }}>個人資訊</h3>
                    <div className="grid grid-cols-3 border-t border-l border-slate-300">
                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>診所/單位</div>
                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>採檢日期</div>
                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>報告編號</div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 text-center">{person._unit}</div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 text-center">{person._date}</div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 text-center">{person._reportNo}</div>

                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>姓名 / 病歷號</div>
                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>性別</div>
                      <div className="p-2 border-b border-r border-slate-300 text-[10px] font-bold text-slate-600 text-center" style={{ backgroundColor: '#dce3eb' }}>年齡</div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 font-bold text-center">{person._name} <span className="font-normal text-slate-400">/ {person._mrn}</span></div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 text-center">{person._gender}</div>
                      <div className="p-2 border-b border-r border-slate-300 text-sm text-slate-800 text-center">{person._age}</div>
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
                          <td className="border border-slate-300 p-2 text-center">mg/dL</td>
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
                      <p className="text-sm text-slate-700 leading-relaxed text-justify">{isRisk ? "您的腎功能狀況可能對健康產生負面影響。請盡快聯繫醫師討論並制定個人化的健康管理計畫。透過積極的預防措施，您可以降低腎臟相關併發症的風險。建議每 3 到 6 個月進行一次 DNlite 腎功能檢測。" : "您的腎功能處於正常範圍。請繼續目前的血糖監測、藥物管理和併發症篩檢計畫。建議每年進行一次 DNlite 腎功能檢測，以及時評估腎病風險。"}</p>
                    </div>
                  </div>
                </div>

                <div className="footer-section">
                  <div className="flex justify-between items-end h-full pt-4">
                    <div><div className="text-xs text-slate-400 mb-2">實驗室主管</div><div className="font-serif text-xl italic text-slate-800 border-b border-slate-300 pb-1 px-2 inline-block min-w-[150px] text-center">{reportConfig.inspector}</div></div>
                    <div className="text-right"><div className="text-xs text-slate-400 mb-2">報告日期</div><div className="text-sm text-slate-800 font-medium">{reportConfig.date}</div></div>
                  </div>
                </div>
              </div>

              {/* --- PAGE 2 --- */}
              <div className="report-sheet relative box-border overflow-hidden flex flex-col">
                <div className="h-[90px] px-10 pt-8 flex justify-between items-center bg-white flex-none">
                  <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">風險定義</h1>
                  <div className="font-bold text-sm border px-3 py-1 rounded" style={{ color: COLORS.teal, borderColor: COLORS.teal }}>附錄</div>
                </div>
                <div className="flex-1 px-10 py-10 flex flex-col justify-between">
                  <div>
                    <div className="grid grid-cols-2 gap-10 mb-4">
                      <div className="flex flex-col">
                        <h3 className="text-base font-bold text-slate-800 mb-3 border-l-4 border-slate-800 pl-3">腎功能惡化</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-6 text-justify h-12">若您被歸類為 <span className="font-bold" style={{ color: COLORS.red }}>高度風險</span>，您在 5 年內腎功能惡化的風險是一般糖尿病患者的 <span className="font-bold text-sm" style={{ color: COLORS.red }}>9.5 倍</span>。</p>
                        <div className="rounded-xl p-4 flex justify-center items-end h-[150px] bg-slate-50"><RiskBarChart value={1} label="低" color={COLORS.teal} /><RiskBarChart value={9.5} label="高" color={COLORS.red} /></div>
                        <div className="text-center text-[10px] text-slate-400 mt-2 font-medium">發生率比</div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base font-bold text-slate-800 mb-3 border-l-4 border-slate-800 pl-3">末期腎病變 (ESRD)</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-6 text-justify h-12">若您被歸類為 <span className="font-bold" style={{ color: COLORS.red }}>高度風險</span>，您在 5 年內發展為末期腎病變的風險是一般糖尿病患者的 <span className="font-bold text-sm" style={{ color: COLORS.red }}>3.5 倍</span>。</p>
                        <div className="rounded-xl p-4 flex justify-center items-end h-[150px] bg-slate-50"><RiskBarChart value={1} label="低" color={COLORS.teal} /><RiskBarChart value={3.5} label="高" color={COLORS.red} /></div>
                        <div className="text-center text-[10px] text-slate-400 mt-2 font-medium">發生率比</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 italic leading-snug bg-slate-50 p-3 rounded border border-slate-100"><b>註 1:</b> 「腎功能惡化」臨床定義為估計腎絲球過濾率 (eGFR) 下降超過 30%。<br /><b>註 2:</b> 「末期腎病變」臨床定義為需要腎臟移植、透析，或血清肌酸酐在 3 個月內增加超過 50%。</div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4 border-l-4 pl-3" style={{ borderColor: COLORS.teal }}>重要注意事項與建議追蹤</h3>
                    <div className="flex flex-col gap-4">
                      <div className="border rounded-xl overflow-hidden flex flex-col shadow-sm" style={{ borderColor: COLORS.teal }}>
                        <div className="py-2 px-4 text-white text-sm font-bold flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}><CheckCircle2 className="w-4 h-4" /> 低度風險</div>
                        <div className="p-3 flex-1 flex flex-col justify-center" style={{ backgroundColor: COLORS.bgTeal }}><p className="text-xs text-slate-700 leading-relaxed text-justify">您的腎功能處於正常範圍。請繼續目前的血糖監測、藥物管理和併發症篩檢計畫。建議<span className="font-bold">每年</span>進行一次 DNlite 腎功能檢測，以及時評估腎病風險。</p></div>
                      </div>
                      <div className="border rounded-xl overflow-hidden flex flex-col shadow-sm" style={{ borderColor: COLORS.red }}>
                        <div className="py-2 px-4 text-white text-sm font-bold flex items-center gap-2" style={{ backgroundColor: COLORS.red }}><AlertTriangle className="w-4 h-4" /> 高度風險</div>
                        <div className="p-3 flex-1 flex flex-col justify-center" style={{ backgroundColor: COLORS.bgRed }}><p className="text-xs text-slate-700 leading-relaxed text-justify">您的腎功能狀況可能對健康產生負面影響。請盡快聯繫醫師討論並制定個人化的健康管理計畫。透過積極的預防措施，您可以降低腎臟相關併發症的風險。建議<span className="font-bold">每 3 到 6 個月</span>進行一次 DNlite 腎功能檢測。</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 mb-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">References</h3>
                    <ul className="text-[10px] text-slate-500 list-disc list-inside leading-normal space-y-1"><li>Nat Rev Nephrol. 2021 (17) 740-750.</li><li>Am J Nephrol. 2023 Oct 9. doi: 10.1159/000534514.</li><li>IFU: DNlite-DKD UPTM-FetA ELISA Kit (8103105).</li><li>DNlite-DKD UPTM-FetA ELISA Kit: Technical Notice (TN8103105-04)</li></ul>
                  </div>
                </div>
                <div className="h-[60px] px-10 pb-6 bg-white box-border flex flex-col justify-end flex-none"><div className="border-t border-slate-200 pt-2 flex justify-between text-[10px] text-slate-400 font-mono"><span>Generated by DNlite Analysis System V23.1</span><span>頁次 2/2</span></div></div>
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
