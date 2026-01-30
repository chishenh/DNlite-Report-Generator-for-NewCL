
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Path, Circle, Line, G, Font } from '@react-pdf/renderer';

// Register Chinese Font
Font.register({
    family: 'Noto Sans TC',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc@5.0.12/files/noto-sans-tc-chinese-traditional-400-normal.woff' },
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc@5.0.12/files/noto-sans-tc-chinese-traditional-700-normal.woff', fontWeight: 'bold' }
    ]
});

// [Config] Colors
const COLORS = {
    teal: '#44B7BA',
    red: '#BC4943',
    grey: '#64748b',
    bgTeal: '#ecfdfd',
    bgRed: '#fdf2f2',
    needle: '#334155',
    slate50: '#f8fafc',
    slate100: '#f1f5f9',
    slate225: '#dce3eb',
    slate250: '#d1d5db',
    slate300: '#cbd5e1',
    slate400: '#94a3b8',
    slate500: '#64748b',
    slate600: '#475569',
    slate700: '#334155',
    slate800: '#1e293b',
    slate900: '#0f172a',
};

// [Styles]
const styles = StyleSheet.create({
    page: {
        paddingBottom: 20,

        fontFamily: 'Noto Sans TC',
        fontSize: 10,
        color: COLORS.slate800,
    },
    header: {
        height: 150,
        paddingHorizontal: 48,
        paddingTop: 20,
        marginBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: COLORS.teal,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 5,
    },
    headerLeft: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100%',
    },
    logoInHeader: {
        width: 180,
        height: 50,
        objectFit: 'contain',
        objectPosition: 'left',
    },
    titleBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: -4,
    },
    titleTextDNlite: {
        fontSize: 28,
        color: COLORS.teal,
    },
    titleSup: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.teal,
        marginTop: 2,
    },
    titleTextReport: {
        fontSize: 28,
        color: COLORS.slate900,
        marginLeft: 8,
    },
    companyLogoArea: {
        height: 50,
        width: 150,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    companyLogoImg: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        objectPosition: 'right',
    },
    content: {
        paddingHorizontal: 48,
    },
    sectionTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
    },
    sectionTitleBar: {
        width: 4,
        height: 16,
        backgroundColor: COLORS.teal,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.slate800,
    },
    grid: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.slate300,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.slate300,
        minHeight: 26,
    },
    cellLabelContainer: {
        width: '20%',
        backgroundColor: COLORS.slate225,
        borderRightWidth: 1,
        borderColor: COLORS.slate300,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    cellValueContainer: {
        width: '30%',
        borderRightWidth: 1,
        borderColor: COLORS.slate300,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    cellLabelText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.slate500,
    },
    cellValueText: {
        fontSize: 10,

        color: COLORS.slate900,
    },
    table: {
        width: '100%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: COLORS.slate300,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.slate100,
        borderBottomWidth: 1,
        borderColor: COLORS.slate300,
        height: 26,
        alignItems: 'stretch',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.slate300,
        height: 26,
        alignItems: 'stretch',
    },
    thContainer: {
        borderRightWidth: 1,
        borderColor: COLORS.slate300,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    tdContainer: {
        borderRightWidth: 1,
        borderColor: COLORS.slate300,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    thText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.slate500,
    },
    tdText: {
        fontSize: 10,
        color: COLORS.slate900,
    },
    chartSection: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 130,
    },
    gaugeWrapper: {
        width: 280,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultWrapper: {
        flex: 1,
        height: 120,
        paddingLeft: 20,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    recommendationBox: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        minHeight: 60,
        backgroundColor: 'white',
    },
    recText: {
        fontSize: 9,
        color: COLORS.slate700,

        lineHeight: 1.6,
        textAlign: 'justify',
    },
    signaturesGrid: {
        marginTop: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.slate300,
        backgroundColor: 'white',
        width: '100%',
    },
    p2Header: {
        height: 80,
        paddingHorizontal: 48,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 10,
    },
    appendixBadge: {
        borderWidth: 1,
        borderColor: COLORS.teal,
        color: COLORS.teal,
        fontSize: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    riskVisualRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    riskCol: {
        width: '46%',
    },
    chartBox: {
        backgroundColor: COLORS.slate50,
        borderRadius: 8,
        padding: 16,
        height: 150,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    barCol: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        width: 60,
    },
    barLabel: {
        fontSize: 9,
        color: COLORS.slate500,
        marginTop: 6,
    },
    barVal: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.slate700,
        marginBottom: 4,
    },
    infoCards: {
        flexDirection: 'column',
        marginTop: 10,
    },
    card: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    cardTitleBlock: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    cardBody: {
        padding: 12,
        minHeight: 80,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 48,
        right: 48,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

// [Component] Gauge Chart
const PdfGaugeChart = ({ value, threshold = 7.53, max = 300 }) => {
    const safeValue = (typeof value === 'number' && !isNaN(value)) ? value : 0;
    const minLog = Math.log(1);
    const maxLog = Math.log(max);
    const valClamped = Math.max(1, Math.min(safeValue, max));
    const valLog = Math.log(valClamped);
    const threshLog = Math.log(threshold);

    const totalRange = maxLog - minLog;
    const valueRatio = (valLog - minLog) / totalRange;
    const threshRatio = (threshLog - minLog) / totalRange;

    const radius = 85;
    const center = 105;
    const centerX = 140;
    const innerEdgeR = 77;

    const angleStart = -180;
    const angleEnd = 0;
    const angleRange = 180;

    const threshAngle = angleStart + (threshRatio * angleRange);
    const needleAngle = angleStart + (valueRatio * angleRange);

    const polarToCartesian = (cx, cy, r, angleInDegrees) => {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return { x: cx + (r * Math.cos(angleInRadians)), y: cy + (r * Math.sin(angleInRadians)) };
    };

    const describeArc = (x, y, r, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, r, endAngle);
        const end = polarToCartesian(x, y, r, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
    };

    const needleLen = 65;
    const needleWidth = 5;
    const needleRad = (needleAngle * Math.PI) / 180;
    const tipX = centerX + needleLen * Math.cos(needleRad);
    const tipY = center + needleLen * Math.sin(needleRad);
    const baseLX = centerX + needleWidth * Math.cos(needleRad - Math.PI / 2);
    const baseLY = center + needleWidth * Math.sin(needleRad - Math.PI / 2);
    const baseRX = centerX + needleWidth * Math.cos(needleRad + Math.PI / 2);
    const baseRY = center + needleWidth * Math.sin(needleRad + Math.PI / 2);
    const needlePath = `M ${baseLX} ${baseLY} L ${tipX} ${tipY} L ${baseRX} ${baseRY} Z`;

    const arc1 = describeArc(centerX, center, radius, angleStart, threshAngle);
    const arc2 = describeArc(centerX, center, radius, threshAngle, angleEnd);
    const innerArc = describeArc(centerX, center, innerEdgeR, angleStart, angleEnd);

    const tickValues = [1, 3, 10, 30, 100, 300];
    const ticks = tickValues.map(v => {
        const vLog = Math.log(v);
        const vRatio = (vLog - minLog) / totalRange;
        const angle = angleStart + (vRatio * angleRange);
        const start = polarToCartesian(centerX, center, innerEdgeR, angle);
        const end = polarToCartesian(centerX, center, innerEdgeR - 5, angle);
        const textPos = polarToCartesian(centerX, center, innerEdgeR - 15, angle);
        return { value: v, start, end, textPos };
    });

    return (
        <Svg width="280" height="130" viewBox="0 0 280 130">
            <Path d={arc1} stroke={COLORS.teal} strokeWidth={16} fill="none" />
            <Path d={arc2} stroke={COLORS.red} strokeWidth={16} fill="none" />
            <Path d={innerArc} stroke="black" strokeWidth={1} fill="none" />
            {ticks.map((t, i) => (
                <G key={i}>
                    <Line x1={t.start.x} y1={t.start.y} x2={t.end.x} y2={t.end.y} stroke="black" strokeWidth={1} />
                    <Text x={t.textPos.x} y={t.textPos.y + 3} textAnchor="middle" fontSize="8" fill={COLORS.slate600}>{String(t.value)}</Text>
                </G>
            ))}
            <Path d={needlePath} fill={COLORS.needle} />
            <Circle cx={centerX} cy={center} r={5} fill={COLORS.needle} />
        </Svg>
    );
};

// [Component] Main PDF Logic
export const PDFReport = ({ data, logo, companyLogo, inspector }) => {
    const people = Array.isArray(data) ? data : [data];

    return (
        <Document>
            {people.map((person, index) => {
                if (!person) return null;

                const dnliteVal = parseFloat(person._val_dnlite);
                const isRisk = dnliteVal >= 7.53;
                const statusColor = isRisk ? COLORS.red : COLORS.teal;


                return (
                    <React.Fragment key={index}>
                        {/* --- PAGE 1 --- */}
                        <Page size="A4" style={[styles.page, { backgroundColor: 'white' }]}>
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4, marginTop: 10 }}>
                                        <View style={{ width: 50, height: 50, overflow: 'hidden', marginRight: 5, borderRadius: 4 }}>
                                            {logo ? <Image src={logo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
                                        </View>
                                        <Text style={{ fontSize: 20, color: COLORS.teal, fontWeight: 'bold', marginBottom: 4 }}>DNlite<Text style={{ fontSize: 10, baseline: 'super', color: COLORS.teal }}>®</Text> 遠腎佳</Text>
                                    </View>
                                    <Text style={{ fontSize: 26, color: COLORS.slate900, marginTop: 4, marginBottom: 10 }}>腎功能預後檢測報告</Text>
                                </View>
                                <View style={[styles.companyLogoArea, { overflow: 'hidden' }]}>
                                    {companyLogo ? <Image src={companyLogo} style={styles.companyLogoImg} /> : null}
                                </View>
                            </View>

                            {/* Body */}
                            <View style={styles.content}>
                                <View style={styles.sectionTitleWrapper}>
                                    <View style={styles.sectionTitleBar} />
                                    <Text style={styles.sectionTitle}>個人資訊</Text>
                                </View>
                                <View style={styles.grid}>
                                    {/* Row 1 Headers (3 Cols) */}
                                    <View style={styles.row}>
                                        <View style={[styles.cellLabelContainer, { width: '33.33%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>送檢單位</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '33.33%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>採檢日期</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '33.34%', borderRightWidth: 0, backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>報告編號</Text></View>
                                    </View>
                                    {/* Row 1 Values (3 Cols) */}
                                    <View style={styles.row}>
                                        <View style={[styles.cellValueContainer, { width: '33.33%', alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._unit || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '33.33%', alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._date || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '33.34%', borderRightWidth: 0, alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._reportNo || '')}</Text></View>
                                    </View>
                                    {/* Row 2 Headers (5 Cols) */}
                                    <View style={styles.row}>
                                        <View style={[styles.cellLabelContainer, { width: '20%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>姓名</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '20%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>病歷號碼</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '20%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>性別</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '20%', backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>出生日期</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '20%', borderRightWidth: 0, backgroundColor: COLORS.slate100, alignItems: 'center' }]}><Text style={styles.cellLabelText}>身分證字號</Text></View>
                                    </View>
                                    {/* Row 2 Values (5 Cols) */}
                                    <View style={[styles.row, { borderBottomWidth: 0 }]}>
                                        <View style={[styles.cellValueContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.cellValueText, { fontWeight: 'bold' }]}>{String(person._name || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '20%', alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._mrn || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '20%', alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._gender || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '20%', alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._dob || '')}</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '20%', borderRightWidth: 0, alignItems: 'center' }]}><Text style={styles.cellValueText}>{String(person._id || '')}</Text></View>
                                    </View>
                                </View>

                                <View style={styles.sectionTitleWrapper}>
                                    <View style={styles.sectionTitleBar} />
                                    <Text style={styles.sectionTitle}>DNlite 檢測結果</Text>
                                </View>
                                <View style={styles.table}>
                                    <View style={[styles.tableHeader, { backgroundColor: COLORS.slate300 }]}>
                                        <View style={[styles.thContainer, { width: '35%' }]}><Text style={styles.thText}>檢測項目</Text></View>
                                        <View style={[styles.thContainer, { width: '20%', alignItems: 'center' }]}><Text style={styles.thText}>結果</Text></View>
                                        <View style={[styles.thContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.thText}>單位</Text></View>
                                        <View style={[styles.thContainer, { width: '30%', borderRightWidth: 0, justifyContent: 'center', alignItems: 'center' }]}><Text style={styles.thText}>備註</Text></View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate100 }]}><Text style={[styles.tdText, { fontWeight: 'bold' }]}>uPTM-FetA</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontWeight: 'bold' }]}>{String(person._disp_uptm || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>ng/mL</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0, justifyContent: 'center', alignItems: 'center' }]}><Text style={styles.tdText}></Text></View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate100 }]}><Text style={[styles.tdText, { fontWeight: 'bold' }]}>Urine creatinine (UCr)</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontWeight: 'bold' }]}>{String(person._disp_ucr || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>mg/mL</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0, justifyContent: 'center', alignItems: 'center' }]}><Text style={[styles.tdText, { color: COLORS.slate500, fontSize: 8 }]}>參考區間: 0.60-2.50</Text></View>
                                    </View>
                                    <View style={[styles.tableRow, { backgroundColor: 'white' }]}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate100 }]}><Text style={[styles.tdText, { fontWeight: 'bold' }]}>DNlite (uPTM-FetA/UCr)</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontWeight: 'bold', color: statusColor }]}>{String(person._disp_dnlite || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>ng/mg</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0, justifyContent: 'center', alignItems: 'center' }]}><Text style={[styles.tdText, { fontWeight: 'bold', color: COLORS.slate500, fontSize: 8 }]}>臨床建議值: 7.53</Text></View>
                                    </View>
                                </View>

                                <View style={styles.chartSection}>
                                    <View style={styles.gaugeWrapper}>
                                        <PdfGaugeChart value={dnliteVal} threshold={7.53} max={300} />
                                    </View>
                                    <View style={styles.resultWrapper}>
                                        <View>
                                            <Text style={{ fontSize: 10, color: COLORS.slate500, marginBottom: 4 }}>您的 DNlite 數值為</Text>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: statusColor }}>
                                                {String(person._disp_dnlite || '')} <Text style={{ fontSize: 10, color: COLORS.slate400, fontFamily: 'Helvetica' }}>ng/mg</Text>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10, color: COLORS.slate500, marginBottom: 4 }}>風險評估:</Text>
                                            <View style={{ backgroundColor: statusColor, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, alignSelf: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{isRisk ? "高度風險" : "低度風險"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.recommendationBox, { borderColor: statusColor }]}>
                                    <Text style={styles.recText}>
                                        {isRisk ? (
                                            <React.Fragment>
                                                <Text>若您為<Text style={{ color: COLORS.red }}>二型糖尿病患</Text>, 5 年腎功能惡化的風險是其他人的 9.5 倍, 末期腎病變風險為 3.5 倍。</Text>
                                                <Text>{"\n"}請與您的醫師討論及擬定健康管理策略, 並且每三個月追蹤檢驗 DNlite。</Text>
                                                <Text>{"\n\n"}若您<Text style={{ color: COLORS.red }}>非糖尿病患</Text>, 5 年腎功能惡化的風險是其他人的 4 倍, 末期腎病變風險為 1.6 倍。</Text>
                                                <Text>{"\n"}請考慮於三個月內再檢測一次 DNlite, 如仍為高風險, 建議您尋求醫師協助, 綜合評估健康狀況。</Text>
                                            </React.Fragment>
                                        ) : (
                                            "您的腎功能處於正常範圍。請繼續目前的血糖監測、藥物管理和併發症篩檢計畫。建議每年進行一次 DNlite 腎功能檢測，以及時評估腎病風險。"
                                        )}
                                    </Text>
                                </View>

                                <View style={styles.signaturesGrid}>
                                    <View style={[styles.row, { height: 65, borderBottomWidth: 0 }]}>
                                        {/* Med Tech */}
                                        <View style={{ width: 25, backgroundColor: COLORS.slate100, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center', paddingVertical: 2 }}>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.1 }}>{'醫\n事\n檢\n驗\n師'}</Text>
                                        </View>
                                        <View style={{ width: 90, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                            {person._medTechStamp ? (
                                                <Image src={person._medTechStamp} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <Text style={{ fontSize: 10 }}>{person._medTechName || ''}</Text>
                                            )}
                                        </View>

                                        {/* Lab Director / Signatory */}
                                        <View style={{ width: 25, backgroundColor: COLORS.slate100, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center', paddingVertical: 2 }}>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.1 }}>{'報\n告\n簽\n署\n人'}</Text>
                                        </View>
                                        <View style={{ width: 90, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                            {person._signatoryStamp ? (
                                                <Image src={person._signatoryStamp} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <Text style={{ fontSize: 10 }}>{inspector || person._signatoryName}</Text>
                                            )}
                                        </View>

                                        {/* Date */}
                                        <View style={{ width: 25, backgroundColor: COLORS.slate100, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center', paddingVertical: 2 }}>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.1 }}>{'報\n告\n日\n期'}</Text>
                                        </View>
                                        <View style={{ width: 90, borderRightWidth: 1, borderColor: COLORS.slate300, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 10 }}>{person._reportDate}</Text>
                                        </View>

                                        {/* Footer Info */}
                                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 8 }}>
                                            <Text style={{ fontSize: 7, color: COLORS.slate500, lineHeight: 1.4 }}>欣奕醫事檢驗所 第二實驗室</Text>
                                            <Text style={{ fontSize: 7, color: COLORS.slate500, lineHeight: 1.4 }}>新北市永和區中山路一段 168 號 11 樓</Text>
                                            <Text style={{ fontSize: 7, color: COLORS.slate500, lineHeight: 1.4 }}>TEL 02-29209181</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate400 }}>頁次 1/2</Text>
                                </View>
                            </View>
                        </Page>

                        {/* --- PAGE 2 --- */}
                        <Page size="A4" style={[styles.page, { backgroundColor: 'white' }]}>
                            <View style={styles.p2Header}>
                                <View style={{ backgroundColor: COLORS.teal, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 4 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>風險定義參考</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={styles.riskVisualRow}>
                                    {/* Left Col: Renal Worsening */}
                                    <View style={styles.riskCol}>
                                        <View style={styles.sectionTitleWrapper}>
                                            <View style={styles.sectionTitleBar} />
                                            <Text style={styles.sectionTitle}>腎功能惡化風險</Text>
                                        </View>
                                        <View style={{ marginBottom: 8 }}>
                                            <Text style={{ fontSize: 9, color: COLORS.slate700, fontWeight: 'bold', marginBottom: 4 }}>若 DNlite 遠腎佳檢測結果為「高度風險」：</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
                                                <View style={{ width: 4, height: 4, backgroundColor: COLORS.teal, marginRight: 6, marginTop: 5 }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 9, color: COLORS.red, marginBottom: 1 }}>二型糖尿病患</Text>
                                                    <Text style={{ fontSize: 9, color: COLORS.slate700, lineHeight: 1.4 }}>
                                                        5年內腎功能惡化的風險為一般二型糖尿病患的 <Text style={{ color: COLORS.slate800, fontWeight: 'bold' }}>9.5 倍</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <View style={{ width: 4, height: 4, backgroundColor: COLORS.teal, marginRight: 6, marginTop: 5 }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 9, color: COLORS.red, marginBottom: 1 }}>非糖尿病患</Text>
                                                    <Text style={{ fontSize: 9, color: COLORS.slate700, lineHeight: 1.4 }}>
                                                        5年內腎功能惡化的風險為一般非糖尿病患的 <Text style={{ color: COLORS.slate800, fontWeight: 'bold' }}>4.0 倍</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Charts Row */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* Type 2 Chart */}
                                            <View style={{ width: '48%', backgroundColor: COLORS.slate50, borderRadius: 4, padding: 6, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: COLORS.slate500, marginBottom: 20 }}>二型糖尿病</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 85, width: '100%', justifyContent: 'space-around' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.slate600, fontWeight: 'bold' }}>1</Text>
                                                        <View style={{ width: 40, height: 8, backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate400, marginTop: 2 }}>低度風險</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.red, fontWeight: 'bold' }}>9.5</Text>
                                                        <View style={{ width: 40, height: 70, backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate600, marginTop: 2, fontWeight: 'bold' }}>高度風險</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {/* Non-DM Chart */}
                                            <View style={{ width: '48%', backgroundColor: COLORS.slate50, borderRadius: 4, padding: 6, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: COLORS.slate500, marginBottom: 20 }}>非糖尿病</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 85, width: '100%', justifyContent: 'space-around' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.slate600, fontWeight: 'bold' }}>1</Text>
                                                        <View style={{ width: 40, height: 8, backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate400, marginTop: 2 }}>低度風險</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.red, fontWeight: 'bold' }}>4.0</Text>
                                                        <View style={{ width: 40, height: 30, backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate600, marginTop: 2, fontWeight: 'bold' }}>高度風險</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Right Col: ESRD */}
                                    <View style={styles.riskCol}>
                                        <View style={styles.sectionTitleWrapper}>
                                            <View style={styles.sectionTitleBar} />
                                            <Text style={styles.sectionTitle}>末期腎病變風險</Text>
                                        </View>
                                        <View style={{ marginBottom: 8 }}>
                                            <Text style={{ fontSize: 9, color: COLORS.slate700, fontWeight: 'bold', marginBottom: 4 }}>若 DNlite 遠腎佳檢測結果為「高度風險」：</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }}>
                                                <View style={{ width: 4, height: 4, backgroundColor: COLORS.teal, marginRight: 6, marginTop: 5 }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 9, color: COLORS.red, marginBottom: 1 }}>二型糖尿病患</Text>
                                                    <Text style={{ fontSize: 9, color: COLORS.slate700, lineHeight: 1.4 }}>
                                                        5年內末期腎病變的風險為一般二型糖尿病患的 <Text style={{ color: COLORS.slate800, fontWeight: 'bold' }}>3.5 倍</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <View style={{ width: 4, height: 4, backgroundColor: COLORS.teal, marginRight: 6, marginTop: 5 }} />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 9, color: COLORS.red, marginBottom: 1 }}>非糖尿病患</Text>
                                                    <Text style={{ fontSize: 9, color: COLORS.slate700, lineHeight: 1.4 }}>
                                                        5年內末期腎病變的風險為一般非糖尿病患的 <Text style={{ color: COLORS.slate800, fontWeight: 'bold' }}>1.6 倍</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Charts Row */}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* Type 2 Chart */}
                                            <View style={{ width: '48%', backgroundColor: COLORS.slate50, borderRadius: 4, padding: 6, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: COLORS.slate500, marginBottom: 20 }}>二型糖尿病</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 85, width: '100%', justifyContent: 'space-around' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.slate600, fontWeight: 'bold' }}>1</Text>
                                                        <View style={{ width: 40, height: 8, backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate400, marginTop: 2 }}>低度風險</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.red, fontWeight: 'bold' }}>3.5</Text>
                                                        <View style={{ width: 40, height: 26, backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate600, marginTop: 2, fontWeight: 'bold' }}>高度風險</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {/* Non-DM Chart */}
                                            <View style={{ width: '48%', backgroundColor: COLORS.slate50, borderRadius: 4, padding: 6, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: COLORS.slate500, marginBottom: 20 }}>非糖尿病</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 85, width: '100%', justifyContent: 'space-around' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.slate600, fontWeight: 'bold' }}>1</Text>
                                                        <View style={{ width: 40, height: 8, backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate400, marginTop: 2 }}>低度風險</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 8, color: COLORS.red, fontWeight: 'bold' }}>1.6</Text>
                                                        <View style={{ width: 40, height: 12, backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                        <Text style={{ fontSize: 6, color: COLORS.slate600, marginTop: 2, fontWeight: 'bold' }}>高度風險</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Notes */}
                                <View style={{ borderTopWidth: 1, borderColor: COLORS.slate225, paddingTop: 8, marginBottom: 12 }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.4 }}>
                                        <Text style={{ fontWeight: 'bold' }}>備註 1:</Text> 「腎功能惡化」臨床上以<Text style={{ textDecoration: 'underline' }}>腎絲球過濾率下降比例超過30%</Text>表達{"\n"}
                                        <Text style={{ fontWeight: 'bold' }}>備註 2:</Text> 「末期腎病變」臨床上以<Text style={{ textDecoration: 'underline' }}>需腎移植、透析或3個月內血清肌酸酐增加50%以上</Text>表達{"\n"}
                                        <Text style={{ fontWeight: 'bold' }}>備註 3:</Text> 台灣二型糖尿病患的慢性腎病變盛行率為 15%~18%，推估5年慢性腎病變發生率約為 5%~9%{"\n"}
                                        <Text style={{ fontWeight: 'bold' }}>備註 4:</Text> 台灣二型糖尿病患的末期腎病變盛行率為 5%~7%，推估5年末期腎病變發生率約為 1.25%~2.33%{"\n"}
                                        <Text style={{ fontWeight: 'bold' }}>備註 5:</Text> 台灣一般成年人的慢性腎病變盛行率為 10%~12%，推估5年慢性腎病變發生率約為 3.3%~6%{"\n"}
                                        <Text style={{ fontWeight: 'bold' }}>備註 6:</Text> 台灣一般成年人的末期腎病變盛行率為 0.35%~0.5%，推估5年末期腎病變發生率約為 0.09%~0.17%
                                    </Text>
                                </View>

                                {/* Precautions */}
                                <View style={{ marginHorizontal: -48, paddingHorizontal: 48, paddingTop: 16, paddingBottom: 30 }}>
                                    {/* Section Title */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                        <View style={{ width: 4, height: 14, backgroundColor: COLORS.teal, marginRight: 6 }} />
                                        <Text style={{ color: COLORS.slate800, fontWeight: 'bold', fontSize: 11 }}>注意事項及建議追蹤方式</Text>
                                    </View>

                                    {/* Cards Stacked */}
                                    <View style={{ marginBottom: 15 }}>
                                        {/* Low Risk Card */}
                                        <View style={{ width: '100%', borderWidth: 1, borderColor: COLORS.teal, borderRadius: 6, marginBottom: 8 }}>
                                            <View style={{ backgroundColor: COLORS.teal, paddingVertical: 6, paddingHorizontal: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>低度風險</Text>
                                            </View>
                                            <View style={{ padding: 8 }}>
                                                <Text style={{ fontSize: 9, color: COLORS.slate800, textAlign: 'justify', lineHeight: 1.5 }}>
                                                    表示您的腎功能屬於一般狀態。請持續維持目前的血糖監測、藥物管理及併發症檢測計畫。建議<Text style={{ fontWeight: 'bold' }}>每年</Text>進行一次遠腎佳 DNlite 腎功能檢測。
                                                </Text>
                                            </View>
                                        </View>

                                        {/* High Risk Card */}
                                        <View style={{ width: '100%', borderWidth: 1, borderColor: COLORS.red, borderRadius: 6 }}>
                                            <View style={{ backgroundColor: COLORS.red, paddingVertical: 6, paddingHorizontal: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>高度風險</Text>
                                            </View>
                                            <View style={{ padding: 8 }}>
                                                <Text style={{ fontSize: 9, color: COLORS.slate800, textAlign: 'justify', lineHeight: 1.5 }}>
                                                    表示您的腎功能屬於對健康不利的狀態，請盡速與您的醫師聯繫、討論及擬定您的健康管理策略。建議<Text style={{ fontWeight: 'bold' }}>每 3-6 個月</Text>進行一次遠腎佳 DNlite 腎功能檢測。
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* References */}
                                    <View style={{ marginTop: 15 }}>
                                        <View style={styles.sectionTitleWrapper}>
                                            <View style={styles.sectionTitleBar} />
                                            <Text style={styles.sectionTitle}>參考文獻</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.6, marginBottom: 4 }}>• Nat Rev Nephrol. 2021 (17) 740-750.</Text>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.6, marginBottom: 4 }}>• Am J Nephrol. 2023 Oct 9. doi: 10.1159/000534514.</Text>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.6, marginBottom: 4 }}>• IFU: DNlite-DKD UPTM-FetA ELISA Kit (8103105).</Text>
                                            <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.6 }}>• DNlite-DKD UPTM-FetA ELISA Kit: Technical Notice (TN8103105-04)</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate400 }}>頁次 2/2</Text>
                                </View>
                            </View>
                        </Page>
                    </React.Fragment>
                );
            })}
        </Document >
    );
};
