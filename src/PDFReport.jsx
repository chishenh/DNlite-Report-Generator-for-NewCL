
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Path, Circle, Line, G } from '@react-pdf/renderer';

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
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: COLORS.slate800,
    },
    header: {
        height: 110,
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
        fontFamily: 'Helvetica-Bold',
        color: COLORS.teal,
    },
    titleSup: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.teal,
        marginTop: 2,
    },
    titleTextReport: {
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
        color: COLORS.slate900,
        marginLeft: 8,
    },
    companyLogoArea: {
        height: 50,
        width: 150,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: -2,
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
        fontFamily: 'Helvetica-Bold',
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
        fontFamily: 'Helvetica-Bold',
        color: COLORS.slate500,
    },
    cellValueText: {
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: COLORS.slate900,
    },
    table: {
        width: '100%',
        borderWidth: 1,
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
        fontFamily: 'Helvetica-Bold',
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
        lineHeight: 1.5,
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
        marginBottom: 30,
    },
    appendixBadge: {
        borderWidth: 1,
        borderColor: COLORS.teal,
        color: COLORS.teal,
        fontSize: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        fontFamily: 'Helvetica-Bold',
    },
    riskVisualRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    riskCol: {
        width: '48%',
    },
    chartBox: {
        backgroundColor: COLORS.slate225,
        borderRadius: 8,
        padding: 16,
        height: 140,
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
        fontFamily: 'Helvetica-Bold',
        color: COLORS.slate700,
        marginBottom: 4,
    },
    infoCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    card: {
        width: '48%',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
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
                const noteBg = isRisk ? COLORS.bgRed : COLORS.bgTeal;

                return (
                    <React.Fragment key={index}>
                        {/* --- PAGE 1 --- */}
                        <Page size="A4" style={[styles.page, { backgroundColor: noteBg }]}>
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    {logo ? <Image src={logo} style={styles.logoInHeader} /> : null}
                                    <View style={styles.titleBlock}>
                                        <Text style={styles.titleTextDNlite}>DNlite</Text>
                                        <Text style={styles.titleSup}>®</Text>
                                        <Text style={styles.titleTextReport}>Test Report</Text>
                                    </View>
                                </View>
                                <View style={styles.companyLogoArea}>
                                    {companyLogo ? <Image src={companyLogo} style={styles.companyLogoImg} /> : null}
                                </View>
                            </View>

                            {/* Body */}
                            <View style={styles.content}>
                                <View style={styles.sectionTitleWrapper}>
                                    <View style={styles.sectionTitleBar} />
                                    <Text style={styles.sectionTitle}>Personal Information</Text>
                                </View>
                                <View style={styles.grid}>
                                    <View style={styles.row}>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Clinic</Text></View>
                                        <View style={styles.cellValueContainer}><Text style={styles.cellValueText}>{String(person._unit || '')}</Text></View>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Sampling Date</Text></View>
                                        <View style={[styles.cellValueContainer, { borderRightWidth: 0 }]}><Text style={styles.cellValueText}>{String(person._date || '')}</Text></View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Report Number</Text></View>
                                        <View style={styles.cellValueContainer}><Text style={styles.cellValueText}>{String(person._reportNo || '')}</Text></View>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Gender</Text></View>
                                        <View style={[styles.cellValueContainer, { borderRightWidth: 0 }]}><Text style={styles.cellValueText}>{String(person._gender || '')}</Text></View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Patient / MRN</Text></View>
                                        <View style={styles.cellValueContainer}>
                                            <Text style={[styles.cellValueText, { fontFamily: 'Helvetica-Bold' }]}>
                                                {String(person._name || '')} <Text style={{ fontFamily: 'Helvetica', color: COLORS.slate400, fontSize: 9, fontWeight: 'normal' }}>/ {String(person._mrn || '')}</Text>
                                            </Text>
                                        </View>
                                        <View style={styles.cellLabelContainer}><Text style={styles.cellLabelText}>Age</Text></View>
                                        <View style={[styles.cellValueContainer, { borderRightWidth: 0 }]}><Text style={styles.cellValueText}>{String(person._age || '')}</Text></View>
                                    </View>
                                </View>

                                <View style={styles.sectionTitleWrapper}>
                                    <View style={styles.sectionTitleBar} />
                                    <Text style={styles.sectionTitle}>DNlite Level</Text>
                                </View>
                                <View style={styles.table}>
                                    <View style={[styles.tableHeader, { backgroundColor: COLORS.slate300 }]}>
                                        <View style={[styles.thContainer, { width: '35%' }]}><Text style={styles.thText}>Item</Text></View>
                                        <View style={[styles.thContainer, { width: '20%', alignItems: 'center' }]}><Text style={styles.thText}>Test Result</Text></View>
                                        <View style={[styles.thContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.thText}>Unit</Text></View>
                                        <View style={[styles.thContainer, { width: '30%', borderRightWidth: 0 }]}><Text style={styles.thText}>Remark</Text></View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate225 }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold' }]}>uPTM-FetA</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold' }]}>{String(person._disp_uptm || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>ng/mL</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0 }]}><Text style={styles.tdText}></Text></View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate225 }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold' }]}>Urine creatinine (UCr)</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold' }]}>{String(person._disp_ucr || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>mg/dL</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0 }]}><Text style={[styles.tdText, { color: COLORS.slate500, fontSize: 8 }]}>Normal Range: 0.60-2.50</Text></View>
                                    </View>
                                    <View style={[styles.tableRow, { backgroundColor: 'white' }]}>
                                        <View style={[styles.tdContainer, { width: '35%', backgroundColor: COLORS.slate225 }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold' }]}>DNlite (uPTM-FetA/UCr)</Text></View>
                                        <View style={[styles.tdContainer, { width: '20%', alignItems: 'center' }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold', color: statusColor }]}>{String(person._disp_dnlite || '')}</Text></View>
                                        <View style={[styles.tdContainer, { width: '15%', alignItems: 'center' }]}><Text style={styles.tdText}>ng/mg</Text></View>
                                        <View style={[styles.tdContainer, { width: '30%', borderRightWidth: 0 }]}><Text style={[styles.tdText, { fontFamily: 'Helvetica-Bold', color: COLORS.slate500, fontSize: 8 }]}>Cut-off: 7.53</Text></View>
                                    </View>
                                </View>

                                <View style={styles.chartSection}>
                                    <View style={styles.gaugeWrapper}>
                                        <PdfGaugeChart value={dnliteVal} threshold={7.53} max={300} />
                                    </View>
                                    <View style={styles.resultWrapper}>
                                        <View>
                                            <Text style={{ fontSize: 10, color: COLORS.slate500, marginBottom: 4 }}>Your DNlite level is</Text>
                                            <Text style={{ fontSize: 30, fontFamily: 'Helvetica-Bold', color: statusColor }}>
                                                {String(person._disp_dnlite || '')} <Text style={{ fontSize: 10, color: COLORS.slate400, fontFamily: 'Helvetica' }}>ng/mg</Text>
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10, color: COLORS.slate500, marginBottom: 4 }}>Categorized as:</Text>
                                            <View style={{ backgroundColor: statusColor, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, alignSelf: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontFamily: 'Helvetica-Bold', fontSize: 12 }}>{isRisk ? "High Risk" : "Low Risk"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.recommendationBox, { borderColor: statusColor }]}>
                                    <Text style={styles.recText}>
                                        {isRisk
                                            ? "Your kidney function is in a condition that may negatively impact your health. Please contact your physician as soon as possible to discuss and develop a personalized health management plan. By actively following preventive measures, you can reduce the risk of kidney-related complications. It is recommended to undergo the DNlite kidney function test every 3 to 6 months."
                                            : "Your kidney function is within the normal range. Please continue with your current blood glucose monitoring, medication management, and complication screening plan. Undergo the DNlite kidney function test once a year to assess your risk of kidney disease in a timely manner."
                                        }
                                    </Text>
                                </View>

                                <View style={styles.signaturesGrid}>
                                    <View style={styles.row}>
                                        <View style={[styles.cellLabelContainer, { width: '25%' }]}><Text style={styles.cellLabelText}>Lab. Director</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '25%' }]}><Text style={[styles.cellValueText, { fontFamily: 'Helvetica-Oblique' }]}>{String(inspector || '')}</Text></View>
                                        <View style={[styles.cellLabelContainer, { width: '25%' }]}><Text style={styles.cellLabelText}>Report Date</Text></View>
                                        <View style={[styles.cellValueContainer, { width: '25%', borderRightWidth: 0 }]}><Text style={styles.cellValueText}>{String(person._date || '')}</Text></View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate400 }}>Page 1/2</Text>
                                </View>
                            </View>
                        </Page>

                        {/* --- PAGE 2 --- */}
                        <Page size="A4" style={[styles.page, { backgroundColor: noteBg }]}>
                            <View style={styles.p2Header}>
                                <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold' }}>Definition of Risk</Text>
                                <Text style={styles.appendixBadge}>APPENDIX</Text>
                            </View>
                            <View style={styles.content}>
                                <View style={styles.riskVisualRow}>
                                    <View style={styles.riskCol}>
                                        <View style={styles.sectionTitleWrapper}>
                                            <View style={[styles.sectionTitleBar, { backgroundColor: COLORS.slate800 }]} />
                                            <Text style={styles.sectionTitle}>Renal Function Deterioration</Text>
                                        </View>
                                        <Text style={styles.recText}>
                                            If your DNlite level is <Text style={{ color: COLORS.red, fontFamily: 'Helvetica-Bold' }}>High Risk</Text>, your risk of renal function deterioration within 5 years is <Text style={{ color: COLORS.red, fontFamily: 'Helvetica-Bold' }}>9.5 times</Text> higher than that of a diabetic patient.
                                        </Text>
                                        <View style={styles.chartBox}>
                                            <View style={styles.barCol}>
                                                <Text style={styles.barVal}>1</Text>
                                                <View style={{ width: 60, height: '10%', backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                <Text style={styles.barLabel}>Low</Text>
                                            </View>
                                            <View style={styles.barCol}>
                                                <Text style={[styles.barVal, { color: COLORS.red }]}>9.5</Text>
                                                <View style={{ width: 60, height: '95%', backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                <Text style={styles.barLabel}>High</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 8, color: COLORS.slate400, textAlign: 'center', marginTop: 4, fontFamily: 'Helvetica-Oblique' }}>Incidence Rate Ratio</Text>
                                    </View>
                                    <View style={styles.riskCol}>
                                        <View style={styles.sectionTitleWrapper}>
                                            <View style={[styles.sectionTitleBar, { backgroundColor: COLORS.slate800 }]} />
                                            <Text style={styles.sectionTitle}>End-Stage Renal Disease (ESRD)</Text>
                                        </View>
                                        <Text style={styles.recText}>
                                            If you are categorized as <Text style={{ color: COLORS.red, fontFamily: 'Helvetica-Bold' }}>High Risk</Text>, your risk of developing ESRD within 5 years is <Text style={{ color: COLORS.red, fontFamily: 'Helvetica-Bold' }}>3.5 times</Text> higher than that of a diabetic patient.
                                        </Text>
                                        <View style={styles.chartBox}>
                                            <View style={styles.barCol}>
                                                <Text style={styles.barVal}>1</Text>
                                                <View style={{ width: 60, height: '28%', backgroundColor: COLORS.teal, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                <Text style={styles.barLabel}>Low</Text>
                                            </View>
                                            <View style={styles.barCol}>
                                                <Text style={[styles.barVal, { color: COLORS.red }]}>3.5</Text>
                                                <View style={{ width: 60, height: '95%', backgroundColor: COLORS.red, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                                                <Text style={styles.barLabel}>High</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 8, color: COLORS.slate400, textAlign: 'center', marginTop: 4, fontFamily: 'Helvetica-Oblique' }}>Incidence Rate Ratio</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: COLORS.slate50, padding: 12, borderRadius: 6, borderWidth: 1, borderColor: COLORS.slate100 }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.5 }}>
                                        <Text style={{ fontFamily: 'Helvetica-Bold' }}>Note 1:</Text> "Renal function deterioration" is clinically defined as a decrease in estimated Glomerular Filtration Rate (eGFR) by more than 30%.{"\n"}
                                        <Text style={{ fontFamily: 'Helvetica-Bold' }}>Note 2:</Text> "End-stage renal disease" is clinically defined as requiring kidney transplantation, dialysis, or an increase in serum creatinine by more than 50% within 3 months.
                                    </Text>
                                </View>
                                <View style={[styles.sectionTitleWrapper, { marginTop: 30 }]}>
                                    <View style={styles.sectionTitleBar} />
                                    <Text style={styles.sectionTitle}>Important Notes & Recommended Follow-Up</Text>
                                </View>
                                <View style={styles.infoCards}>
                                    <View style={[styles.card, { borderColor: COLORS.teal }]}>
                                        <View style={[styles.cardTitleBlock, { backgroundColor: COLORS.teal }]}>
                                            <Text style={{ color: 'white', fontSize: 10, fontFamily: 'Helvetica-Bold' }}>Low Risk</Text>
                                        </View>
                                        <View style={styles.cardBody}>
                                            <Text style={styles.recText}>
                                                Your kidney function is within the normal range. Please continue your current blood glucose monitoring, medication management, and complication screening plan. It is recommended to undergo the DNlite kidney function test <Text style={{ fontFamily: 'Helvetica-Bold' }}>once a year</Text>.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.card, { borderColor: COLORS.red }]}>
                                        <View style={[styles.cardTitleBlock, { backgroundColor: COLORS.red }]}>
                                            <Text style={{ color: 'white', fontSize: 10, fontFamily: 'Helvetica-Bold' }}>High Risk</Text>
                                        </View>
                                        <View style={styles.cardBody}>
                                            <Text style={styles.recText}>
                                                Your kidney function is in a condition that may negatively impact your health. Please contact your physician as soon as possible. It is recommended to undergo the DNlite kidney function test <Text style={{ fontFamily: 'Helvetica-Bold' }}>every 3 to 6 months</Text> to monitor your kidney disease risk.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: COLORS.slate400, marginBottom: 4, letterSpacing: 1 }}>REFERENCES</Text>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.4 }}>• Nat Rev Nephrol. 2021 (17) 740-750.</Text>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.4 }}>• Am J Nephrol. 2023 Oct 9. doi: 10.1159/000534514.</Text>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.4 }}>• IFU: DNlite-DKD UPTM-FetA ELISA Kit (8103105).</Text>
                                    <Text style={{ fontSize: 8, color: COLORS.slate500, lineHeight: 1.4 }}>• DNlite-DKD UPTM-FetA ELISA Kit: Technical Notice (TN8103105-04)</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                    <Text style={{ fontSize: 8, color: COLORS.slate400 }}>Page 2/2</Text>
                                </View>
                            </View>
                        </Page>
                    </React.Fragment>
                );
            })}
        </Document>
    );
};
