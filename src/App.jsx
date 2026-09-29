import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Overview', key: 'overview' },
  { label: 'Loans', key: 'loans' },
  { label: 'Customers', key: 'customers' },
  { label: 'Collections', key: 'collections' },
  { label: 'Risk', key: 'risk' },
  { label: 'Savings', key: 'savings' },
  { label: 'Reports', key: 'reports' },
]

const stats = [
  { label: 'Portfolio value', value: '$24.8M', delta: '+12.4%', tone: 'green' },
  { label: 'Disbursements', value: '$6.2M', delta: '+8.1%', tone: 'blue' },
  { label: 'Collections', value: '$5.4M', delta: '+6.7%', tone: 'purple' },
  { label: 'Default ratio', value: '2.8%', delta: '-0.9%', tone: 'amber' },
]

const performanceBars = [
  { name: 'Retail', value: 84, color: 'var(--chart-retail)' },
  { name: 'SME', value: 72, color: 'var(--chart-sme)' },
  { name: 'Agri', value: 63, color: 'var(--chart-agri)' },
  { name: 'SACCO', value: 89, color: 'var(--chart-sacco)' },
]

const borrowerSegments = [
  { sector: 'Micro business', total: '$8.4M', share: '34%', trend: '+4.2%' },
  { sector: 'Agriculture', total: '$5.1M', share: '21%', trend: '+2.9%' },
  { sector: 'SME finance', total: '$6.7M', share: '27%', trend: '+5.7%' },
  { sector: 'Consumer loans', total: '$4.6M', share: '18%', trend: '+1.8%' },
]

const loanRows = [
  { borrower: 'Martha Nyebel.', product: 'Working capital', amount: '$18,200', status: 'On-time', due: '12 days', risk: 'Low' },
  { borrower: 'Gambella Food Hub', product: 'Inventory finance', amount: '$42,500', status: 'Watchlist', due: '4 days', risk: 'Moderate' },
  { borrower: 'Rumbek Agro', product: 'Seasonal crop loan', amount: '$31,400', status: 'On-time', due: '19 days', risk: 'Low' },
  { borrower: 'Bor Fishing gruops', product: 'Group lending', amount: '$27,900', status: 'Late', due: '2 days', risk: 'High' },
]

const riskItems = [
  { name: 'B2B pipeline', value: '$1.2M', detail: '6 deals need review', color: 'amber' },
  { name: 'Delayed repayments', value: '$780K', detail: '18 accounts > 7 days', color: 'red' },
  { name: 'High value customers', value: '42', detail: 'Exposure > $100K', color: 'purple' },
]

const customerRows = [
  { name: 'Taidor Gatdet', type: 'Retail', group: 'Women enterprise', score: '92', status: 'Active', lastLoan: '$4,800', city: 'Malakal' },
  { name: 'Mambo Foods', type: 'SME', group: 'Food & retail', score: '88', status: 'Healthy', lastLoan: '$12,500', city: 'Bor' },
  { name: 'Kajaak Farms', type: 'Agriculture', group: 'Farm input', score: '81', status: 'Review', lastLoan: '$7,200', city: 'Wau' },
  { name: 'NIMSA GRUOPS', type: 'SACCO', group: 'Member lending', score: '94', status: 'Active', lastLoan: '$18,900', city: 'Tonj' },
  { name: 'Marion Atuhairwe', type: 'Consumer', group: 'Payroll', score: '79', status: 'Watch', lastLoan: '$2,900', city: 'Yie' },
]

const collectionRows = [
  { account: 'Martha Nyebel', agent: 'Jane M.', amount: '$21,476', due: '15 Apr', status: 'Follow-up', bucket: '7-14 days' },
  { account: 'Bor Fishing gruops', agent: 'Philip A.', amount: '$33,480', due: '12 Apr', status: 'Promised pay', bucket: '1-6 days' },
  { account: 'Rumbek Agro', agent: 'Aisha K.', amount: '$36,110', due: '8 Apr', status: 'In progress', bucket: '1-6 days' },
  { account: 'Gambella Food Hub', agent: 'Chris O.', amount: '$49,513', due: '21 Apr', status: 'Escalated', bucket: '15+ days' },
]

const riskAlerts = [
  { name: 'TAITECH SACCO', exposure: '$420K', score: '68', category: 'Concentration risk', severity: 'High' },
  { name: 'Bathel Gruops', exposure: '$310K', score: '74', category: 'Seasonality risk', severity: 'Moderate' },
  { name: 'Gambella Boda Association', exposure: '$260K', score: '81', category: 'Delinquency risk', severity: 'High' },
  { name: 'Udier Teacher Association', exposure: '$92K', score: '61', category: 'Income volatility', severity: 'Low' },
]
const reportMetrics = [
  { label: 'Portfolio recovery', value: '92.8%', delta: '+3.4%', tone: 'green' },
  { label: 'Cash collection rate', value: '86.1%', delta: '+1.8%', tone: 'blue' },
  { label: 'Late payment ratio', value: '4.7%', delta: '-0.6%', tone: 'purple' },
  { label: 'Operating cost', value: '12.3%', delta: '-0.9%', tone: 'amber' },
]

const reportTrend = [
  { month: 'Jan', value: 62 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 72 },
  { month: 'Apr', value: 78 },
  { month: 'May', value: 82 },
  { month: 'Jun', value: 89 },
]

const reportRows = [
  { region: 'Malakal', disbursed: '$3.1M', collected: '$2.8M', recovery: '90.3%', risk: 'Low' },
  { region: 'Yie', disbursed: '$1.9M', collected: '$1.6M', recovery: '84.2%', risk: 'Moderate' },
  { region: 'Juba', disbursed: '$2.4M', collected: '$2.1M', recovery: '87.6%', risk: 'Low' },
  { region: 'Bor', disbursed: '$2.8M', collected: '$2.5M', recovery: '89.2%', risk: 'Moderate' },
]

const institutionProfiles = {
  bank: {
    label: 'Bank',
    heroTitle: 'banking command center',
    heroText: 'Monitor capital adequacy, deposit growth, liquidity, and branch profitability across your full banking network.',
    heroBadges: ['Retail banking', 'Liquidity control', 'Regulatory view'],
    stats: [
      { label: 'Total assets', value: '$4.8B', delta: '+8.6%', tone: 'green' },
      { label: 'Deposits', value: '$3.1B', delta: '+6.4%', tone: 'blue' },
      { label: 'Net interest margin', value: '4.7%', delta: '+0.4%', tone: 'purple' },
      { label: 'NPL ratio', value: '2.3%', delta: '-0.5%', tone: 'amber' },
    ],
    performanceBars: [
      { name: 'Corporate', value: 88, color: 'var(--chart-retail)' },
      { name: 'SME', value: 75, color: 'var(--chart-sme)' },
      { name: 'Retail', value: 81, color: 'var(--chart-agri)' },
      { name: 'Treasury', value: 92, color: 'var(--chart-sacco)' },
    ],
    borrowerSegments: [
      { sector: 'Corporate banking', total: '$1.4B', share: '38%', trend: '+5.2%' },
      { sector: 'SME lending', total: '$980M', share: '27%', trend: '+4.8%' },
      { sector: 'Retail finance', total: '$760M', share: '21%', trend: '+3.4%' },
      { sector: 'Treasury', total: '$540M', share: '14%', trend: '+2.6%' },
    ],
    riskItems: [
      { name: 'Liquidity coverage', value: '$1.4B', detail: 'Reserve buffer above target', color: 'purple' },
      { name: 'Credit exposure', value: '$780M', detail: '18 accounts need review', color: 'amber' },
      { name: 'FX sensitivity', value: '$310M', detail: 'Moderate hedging gap', color: 'red' },
    ],
    loanRows: [
      { borrower: 'Apex Manufacturing', product: 'Working capital', amount: '$1.8M', status: 'On-time', due: '12 days', risk: 'Low' },
      { borrower: 'Nairobi Logistics', product: 'Trade finance', amount: '$2.4M', status: 'Watchlist', due: '4 days', risk: 'Moderate' },
      { borrower: 'Harbor Retail', product: 'Commercial mortgage', amount: '$860K', status: 'On-time', due: '19 days', risk: 'Low' },
      { borrower: 'Metro Foods', product: 'Term loan', amount: '$1.2M', status: 'Late', due: '2 days', risk: 'High' },
    ],
    customerRows: [
      { name: 'Mutoni Angel', type: 'Retail', group: 'Payroll', score: '94', status: 'Active', lastLoan: '$48K', city: 'Nairobi' },
      { name: 'Apex Traders', type: 'SME', group: 'Wholesale', score: '90', status: 'Healthy', lastLoan: '$210K', city: 'Mombasa' },
      { name: 'Kenyan Rail Logistics', type: 'Corporate', group: 'Transport', score: '88', status: 'Review', lastLoan: '$640K', city: 'Kisumu' },
      { name: 'Cedar Homes', type: 'Corporate', group: 'Real estate', score: '92', status: 'Active', lastLoan: '$1.1M', city: 'Nakuru' },
    ],
    collectionRows: [
      { account: 'Metro Foods', agent: 'Jane M.', amount: '$240K', due: '15 Apr', status: 'Follow-up', bucket: '7-14 days' },
      { account: 'Harbor Retail', agent: 'Philip A.', amount: '$180K', due: '12 Apr', status: 'Promised pay', bucket: '1-6 days' },
      { account: 'Nairobi Logistics', agent: 'Aisha K.', amount: '$310K', due: '8 Apr', status: 'In progress', bucket: '1-6 days' },
      { account: 'Apex Manufacturing', agent: 'Chris O.', amount: '$420K', due: '21 Apr', status: 'Escalated', bucket: '15+ days' },
    ],
    riskAlerts: [
      { name: 'Apex Manufacturing', exposure: '$4.2M', score: '68', category: 'Credit concentration', severity: 'High' },
      { name: 'Udier Logistics', exposure: '$2.8M', score: '74', category: 'Operating risk', severity: 'Moderate' },
      { name: 'Metro Foods', exposure: '$1.9M', score: '81', category: 'Portfolio stress', severity: 'High' },
      { name: 'Gambella Homes', exposure: '$820K', score: '61', category: 'Liquidity strain', severity: 'Low' },
    ],
    reportMetrics: [
      { label: 'Capital adequacy', value: '18.4%', delta: '+1.2%', tone: 'green' },
      { label: 'Cost-to-income', value: '42.6%', delta: '-1.8%', tone: 'blue' },
      { label: 'Loan growth', value: '11.8%', delta: '+2.4%', tone: 'purple' },
      { label: 'Deposit growth', value: '9.6%', delta: '+1.1%', tone: 'amber' },
    ],
    reportRows: [
      { region: 'Udier', disbursed: '$840K', collected: '$760K', recovery: '90.3%', risk: 'Low' },
      { region: 'Juba', disbursed: '$610K', collected: '$560K', recovery: '91.8%', risk: 'Low' },
      { region: 'Malakal', disbursed: '$720K', collected: '$660K', recovery: '88.7%', risk: 'Moderate' },
      { region: 'Kisumu', disbursed: '$540K', collected: '$470K', recovery: '86.9%', risk: 'Moderate' },
    ],
    labels: {
      overview: 'Banking intelligence',
      summary: 'Healthy balance sheet',
      loans: { eyebrow: 'Credit operations', title: 'Commercial lending pipeline', action: '+ New credit' },
      customers: { eyebrow: 'Client base', title: 'Customer portfolio', action: '+ Add customer' },
      savings: { eyebrow: 'Treasury', title: 'Deposit & savings overview', action: '+ New account' },
      collections: { eyebrow: 'Collections', title: 'Branch collections performance', action: '+ Schedule follow-up' },
      risk: { eyebrow: 'Risk monitoring', title: 'Portfolio risk overview', action: '+ Review watchlist' },
      reports: { eyebrow: 'Board reporting', title: 'Performance dashboard', action: 'Export PDF' },
    },
  },
  mfi: {
    label: 'MFI',
    heroTitle: 'microfinance growth engine',
    heroText: 'Track client outreach, product performance, SME lending, and collection recovery across every field office.',
    heroBadges: ['SME lending', 'Portfolio quality', 'Branch outreach'],
    stats: [
      { label: 'Active clients', value: '18.4K', delta: '+11.2%', tone: 'green' },
      { label: 'Portfolio at risk', value: '4.8%', delta: '-0.9%', tone: 'blue' },
      { label: 'Savings mobilized', value: '$7.6M', delta: '+14.1%', tone: 'purple' },
      { label: 'Repayment rate', value: '92.1%', delta: '+2.7%', tone: 'amber' },
    ],
    performanceBars: [
      { name: 'Retail', value: 86, color: 'var(--chart-retail)' },
      { name: 'Women SME', value: 73, color: 'var(--chart-sme)' },
      { name: 'Agribusiness', value: 68, color: 'var(--chart-agri)' },
      { name: 'Payroll', value: 90, color: 'var(--chart-sacco)' },
    ],
    borrowerSegments: [
      { sector: 'Women enterprises', total: '$2.8M', share: '31%', trend: '+6.0%' },
      { sector: 'Agri finance', total: '$2.2M', share: '24%', trend: '+4.6%' },
      { sector: 'SME working capital', total: '$3.1M', share: '35%', trend: '+5.4%' },
      { sector: 'Consumer loans', total: '$1.1M', share: '10%', trend: '+1.8%' },
    ],
    riskItems: [
      { name: 'Past due loans', value: '$780K', detail: '18 clients > 7 days', color: 'amber' },
      { name: 'Client concentration', value: '$640K', detail: '7 groups above policy limit', color: 'red' },
      { name: 'New savings', value: '$1.2M', detail: 'Member pipeline strong', color: 'purple' },
    ],
    loanRows: [
      { borrower: 'Martha Nyebel.', product: 'Women enterprise loan', amount: '$18,200', status: 'On-time', due: '12 days', risk: 'Low' },
      { borrower: 'Kule Food Hub', product: 'Inventory finance', amount: '$42,500', status: 'Watchlist', due: '4 days', risk: 'Moderate' },
      { borrower: 'Gambella Agro', product: 'Seasonal crop loan', amount: '$31,400', status: 'On-time', due: '19 days', risk: 'Low' },
      { borrower: 'Udier Traders', product: 'Group lending', amount: '$27,900', status: 'Late', due: '2 days', risk: 'High' },
    ],
    customerRows: [
      { name: 'Faith Nyebuony', type: 'Retail', group: 'Women enterprise', score: '92', status: 'Active', lastLoan: '$4,800', city: 'Nairobi' },
      { name: 'Mambo Foods', type: 'SME', group: 'Food & retail', score: '88', status: 'Healthy', lastLoan: '$12,500', city: 'Kisumu' },
      { name: 'Samuel Goy', type: 'Agriculture', group: 'Farm input', score: '81', status: 'Review', lastLoan: '$7,200', city: 'Eldoret' },
      { name: 'Amani SACCO', type: 'Group', group: 'Member lending', score: '94', status: 'Active', lastLoan: '$18,900', city: 'Mombasa' },
    ],
    collectionRows: [
      { account: 'Nairobi BOys', agent: 'Jane M.', amount: '$24,800', due: '15 Apr', status: 'Follow-up', bucket: '7-14 days' },
      { account: 'Changkuoth Nyak Studio', agent: 'Philip A.', amount: '$18,300', due: '12 Apr', status: 'Promised pay', bucket: '1-6 days' },
      { account: 'Mambo Foods', agent: 'Aisha K.', amount: '$31,600', due: '8 Apr', status: 'In progress', bucket: '1-6 days' },
      { account: 'Yien Will', agent: 'Chris O.', amount: '$42,500', due: '21 Apr', status: 'Escalated', bucket: '15+ days' },
    ],
    riskAlerts: [
      { name: 'Arua Hill SACCO', exposure: '$420K', score: '68', category: 'Concentration risk', severity: 'High' },
      { name: 'Mathiang Agro', exposure: '$310K', score: '74', category: 'Seasonality risk', severity: 'Moderate' },
      { name: 'Udier Traders', exposure: '$260K', score: '81', category: 'Delinquency risk', severity: 'High' },
      { name: 'Leah Njeri', exposure: '$92K', score: '61', category: 'Income volatility', severity: 'Low' },
    ],
    reportMetrics: [
      { label: 'Portfolio recovery', value: '92.8%', delta: '+3.4%', tone: 'green' },
      { label: 'Cash collection rate', value: '86.1%', delta: '+1.8%', tone: 'blue' },
      { label: 'Late payment ratio', value: '4.7%', delta: '-0.6%', tone: 'purple' },
      { label: 'Operating cost', value: '12.3%', delta: '-0.9%', tone: 'amber' },
    ],
    reportRows: [
      { region: 'Malakal', disbursed: '$3.1M', collected: '$2.8M', recovery: '90.3%', risk: 'Low' },
      { region: 'Yie', disbursed: '$1.9M', collected: '$1.6M', recovery: '84.2%', risk: 'Moderate' },
      { region: 'Juba', disbursed: '$2.4M', collected: '$2.1M', recovery: '87.6%', risk: 'Low' },
      { region: 'Bor ', disbursed: '$2.8M', collected: '$2.5M', recovery: '89.2%', risk: 'Moderate' },
    ],
    labels: {
      overview: 'Lending intelligence',
      summary: 'Healthy portfolio',
      loans: { eyebrow: 'Loan operations', title: 'Microloan pipeline', action: '+ New facility' },
      customers: { eyebrow: 'Client base', title: 'Borrower portfolio', action: '+ Add client' },
      savings: { eyebrow: 'Savings engine', title: 'Member savings overview', action: '+ New savings' },
      collections: { eyebrow: 'Collections', title: 'Collection performance', action: '+ Schedule follow-up' },
      risk: { eyebrow: 'Risk monitoring', title: 'Portfolio risk overview', action: '+ Review watchlist' },
      reports: { eyebrow: 'Reports & analytics', title: 'Business performance dashboard', action: 'Export PDF' },
    },
  },
  sacco: {
    label: 'SACCO',
    heroTitle: 'member finance command center',
    heroText: 'Track member savings, share capital, member loans, and cooperative growth across your savings and credit network.',
    heroBadges: ['Member services', 'Share capital', 'Cooperative finance'],
    stats: [
      { label: 'Member deposits', value: '$18.6M', delta: '+12.8%', tone: 'green' },
      { label: 'Share capital', value: '$11.2M', delta: '+9.4%', tone: 'blue' },
      { label: 'Loan book', value: '$16.4M', delta: '+7.9%', tone: 'purple' },
      { label: 'Dividend yield', value: '8.7%', delta: '+1.2%', tone: 'amber' },
    ],
    performanceBars: [
      { name: 'Salary', value: 90, color: 'var(--chart-retail)' },
      { name: 'Business', value: 78, color: 'var(--chart-sme)' },
      { name: 'Farming', value: 72, color: 'var(--chart-agri)' },
      { name: 'School fees', value: 84, color: 'var(--chart-sacco)' },
    ],
    borrowerSegments: [
      { sector: 'Salary groups', total: '$5.8M', share: '36%', trend: '+5.1%' },
      { sector: 'Business members', total: '$4.4M', share: '27%', trend: '+4.7%' },
      { sector: 'Farm co-ops', total: '$3.3M', share: '20%', trend: '+3.4%' },
      { sector: 'Education loans', total: '$2.9M', share: '17%', trend: '+2.2%' },
    ],
    riskItems: [
      { name: 'Member arrears', value: '$520K', detail: '42 members behind schedule', color: 'amber' },
      { name: 'Share capital drift', value: '$290K', detail: '3 branches below target', color: 'red' },
      { name: 'Deposits growth', value: '$1.8M', detail: 'Strong member retention', color: 'purple' },
    ],
    loanRows: [
      { borrower: 'Gatluak Wal', product: 'School fees advance', amount: '$8,400', status: 'On-time', due: '10 days', risk: 'Low' },
      { borrower: 'Aney peter', product: 'Business loan', amount: '$21,600', status: 'Watchlist', due: '5 days', risk: 'Moderate' },
      { borrower: 'Sarah farms', product: 'Agri asset finance', amount: '$32,500', status: 'On-time', due: '17 days', risk: 'Low' },
      { borrower: 'Excel Farms', product: 'Salary advance', amount: '$15,200', status: 'Late', due: '2 days', risk: 'High' },
    ],
    customerRows: [
      { name: 'Grace Nyamal', type: 'Member', group: 'Salary', score: '95', status: 'Active', lastLoan: '$8,400', city: 'Udier' },
      { name: 'Princess Adia', type: 'Business', group: 'Retail', score: '89', status: 'Healthy', lastLoan: '$21,600', city: 'Tonj' },
      { name: 'Kajaak Boys', type: 'Co-op', group: 'Agriculture', score: '83', status: 'Review', lastLoan: '$32,500', city: 'Yie' },
      { name: 'Kibra Teachers Club', type: 'Association', group: 'Payroll', score: '96', status: 'Active', lastLoan: '$15,200', city: 'Arua' },
    ],
    collectionRows: [
      { account: 'Udier Teachers Club', agent: 'Jane M.', amount: '$18,200', due: '15 Apr', status: 'Follow-up', bucket: '7-14 days' },
      { account: 'Mwea Farmers Group', agent: 'Philip A.', amount: '$24,300', due: '12 Apr', status: 'Promised pay', bucket: '1-6 days' },
      { account: 'Tatu Traders', agent: 'Aisha K.', amount: '$21,600', due: '8 Apr', status: 'In progress', bucket: '1-6 days' },
      { account: 'Grace Nyagoa', agent: 'Chris O.', amount: '$8,400', due: '21 Apr', status: 'Escalated', bucket: '15+ days' },
    ],
    riskAlerts: [
      { name: 'TAITECH SACCO', exposure: '$480K', score: '66', category: 'Member arrears', severity: 'High' },
      { name: 'Bathel Gruops', exposure: '$340K', score: '72', category: 'Seasonal cashflow', severity: 'Moderate' },
      { name: 'Gambella Boda Association', exposure: '$220K', score: '79', category: 'Business risk', severity: 'High' },
      { name: 'Udier Teacher Association', exposure: '$95K', score: '58', category: 'Income volatility', severity: 'Low' },
    ],
    reportMetrics: [
      { label: 'Member growth', value: '13.4%', delta: '+2.9%', tone: 'green' },
      { label: 'Savings ratio', value: '78.2%', delta: '+4.1%', tone: 'blue' },
      { label: 'Loan demand', value: '61.7%', delta: '+3.8%', tone: 'purple' },
      { label: 'Dividend payout', value: '9.1%', delta: '+0.8%', tone: 'amber' },
    ],
    reportRows: [
      { region: 'Malakal', disbursed: '$2.1M', collected: '$1.9M', recovery: '90.8%', risk: 'Low' },
      { region: 'Yie ', disbursed: '$1.6M', collected: '$1.4M', recovery: '87.9%', risk: 'Moderate' },
      { region: 'Juba', disbursed: '$2.9M', collected: '$2.5M', recovery: '89.5%', risk: 'Low' },
      { region: 'Bor', disbursed: '$1.8M', collected: '$1.5M', recovery: '84.1%', risk: 'Moderate' },
    ],
    labels: {
      overview: 'Member services intelligence',
      summary: 'Strong member balance sheet',
      loans: { eyebrow: 'Member credit', title: 'Member loan pipeline', action: '+ New member loan' },
      customers: { eyebrow: 'Members', title: 'Member portfolio', action: '+ Add member' },
      savings: { eyebrow: 'Savings', title: 'Share & savings overview', action: '+ New deposit' },
      collections: { eyebrow: 'Recoveries', title: 'Member collections performance', action: '+ Schedule reminder' },
      risk: { eyebrow: 'Governance risk', title: 'Co-op risk overview', action: '+ Review risk panel' },
      reports: { eyebrow: 'Board review', title: 'Co-op performance dashboard', action: 'Export PDF' },
    },
  },
}

function App() {
  const [activeView, setActiveView] = useState('overview')
  const [theme, setTheme] = useState('light')
  const [institutionType, setInstitutionType] = useState('bank')
  const [businessName, setBusinessName] = useState(() => {
    if (typeof window === 'undefined') return 'Taitech finance'
    return localStorage.getItem('taitech-business-name') || 'Taitech finance'
  })

  useEffect(() => {
    const normalizedName = businessName.trim() || 'Taitech finance'
    document.title = normalizedName
    localStorage.setItem('taitech-business-name', normalizedName)
  }, [businessName])

  const brandInitial = (businessName || 'B').trim().charAt(0).toUpperCase() || 'B'
  const activeInstitution = institutionProfiles[institutionType] || institutionProfiles.bank
  const stats = activeInstitution.stats
  const performanceBars = activeInstitution.performanceBars
  const borrowerSegments = activeInstitution.borrowerSegments
  const riskItems = activeInstitution.riskItems
  const loanRows = activeInstitution.loanRows
  const customerRows = activeInstitution.customerRows
  const collectionRows = activeInstitution.collectionRows
  const riskAlerts = activeInstitution.riskAlerts
  const reportMetrics = activeInstitution.reportMetrics
  const reportRows = activeInstitution.reportRows
  const heroBadges = activeInstitution.heroBadges

  const renderOverview = () => (
    <>
      <section className="hero-grid">
        <div className="panel overview-panel">
          <div className="hero-header-row">
            <div className="logo-badge">{brandInitial}</div>
            <span className="chip success">Institution dashboard</span>
          </div>

          <div className="hero-badges">
            {heroBadges.map((badge) => (
              <span key={badge} className="soft-badge">{badge}</span>
            ))}
          </div>

          <div className="eyebrow">{activeInstitution.labels.overview}</div>
          <h1>{businessName || 'Your business'} {activeInstitution.heroTitle}</h1>
          <p>
            {activeInstitution.heroText}
          </p>

          <div className="cta-row">
            <button type="button" className="primary-btn">Create disbursement</button>
            <button type="button" className="secondary-btn">Export report</button>
          </div>

          <div className="mini-metrics">
            <div>
              <span>Active borrowers</span>
              <strong>4,286</strong>
            </div>
            <div>
              <span>On-time rate</span>
              <strong>92.1%</strong>
            </div>
            <div>
              <span>Recovery rate</span>
              <strong>87.4%</strong>
            </div>
          </div>
        </div>

        <div className="panel summary-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Portfolio mix</span>
              <h3>{activeInstitution.labels.summary}</h3>
            </div>
            <span className="chip success">+6.2% QoQ</span>
          </div>

          <div className="donut-wrap">
            <div
              className="donut"
              style={{
                background:
                  'conic-gradient(var(--chart-retail) 0 52%, var(--chart-sme) 52% 79%, var(--chart-agri) 79% 92%, var(--chart-sacco) 92% 100%)',
              }}
            >
              <div className="donut-center">
                <strong>82%</strong>
                <span>Healthy</span>
              </div>
            </div>
          </div>

          <div className="legend">
            <div><i className="dot green" /> Performing <span>52%</span></div>
            <div><i className="dot purple" /> Protected <span>27%</span></div>
            <div><i className="dot amber" /> Watchlist <span>13%</span></div>
            <div><i className="dot red" /> Risk <span>8%</span></div>
          </div>
        </div>
      </section>

      <section className="kpi-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="panel stat-card">
            <span className="mini-label">{stat.label}</span>
            <div className="stat-row">
              <strong>{stat.value}</strong>
              <span className={`delta ${stat.tone}`}>{stat.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Performance</span>
              <h3>Loan quality by segment</h3>
            </div>
            <button type="button" className="chip">12M view</button>
          </div>

          <div className="bar-chart" aria-label="Loan quality by segment">
            {performanceBars.map((bar) => (
              <div key={bar.name} className="bar-group">
                <div className="bar-labels">
                  <span>{bar.name}</span>
                  <span>{bar.value}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${bar.value}%`, background: bar.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel list-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Borrower mix</span>
              <h3>Commercial segments</h3>
            </div>
          </div>

          <div className="segment-list">
            {borrowerSegments.map((item) => (
              <div key={item.sector} className="segment-row">
                <div>
                  <strong>{item.sector}</strong>
                  <span>{item.total}</span>
                </div>
                <div className="segment-meta">
                  <b>{item.share}</b>
                  <em>{item.trend}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lower-grid">
        <div className="panel table-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Active accounts</span>
              <h3>Outstanding portfolio</h3>
            </div>
            <button type="button" className="ghost-btn small">View all</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {loanRows.map((row) => (
                <tr key={row.borrower}>
                  <td>{row.borrower}</td>
                  <td>{row.product}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`status-pill ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.due}</td>
                  <td>{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel watch-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Risk watch</span>
              <h3>Priority actions</h3>
            </div>
          </div>

          <div className="watch-list">
            {riskItems.map((item) => (
              <div key={item.name} className="watch-item">
                <div className={`watch-indicator ${item.color}`} aria-hidden="true" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )

  const renderLoans = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.loans.eyebrow}</span>
          <h2>{activeInstitution.labels.loans.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.loans.action}</button>
      </div>

      <div className="kpi-grid three-up">
        <div className="panel stat-card">
          <span className="mini-label">Approved</span>
          <div className="stat-row"><strong>$8.1M</strong><span className="delta green">+14.8%</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">Pending review</span>
          <div className="stat-row"><strong>42</strong><span className="delta amber">+6</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">Repayments due</span>
          <div className="stat-row"><strong>$2.4M</strong><span className="delta blue">Due soon</span></div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Current pipeline</span>
            <h3>Loan applications</h3>
          </div>
          <button type="button" className="ghost-btn small">Filters</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Product</th>
              <th>Branch</th>
              <th>Amount</th>
              <th>APR</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Martha Nyebel.', 'Working capital', 'Juba', '$18,200', '18.0%', 'Approved'],
              ['Gambella Food Hub', 'Inventory finance', 'Gambella', '$42,500', '16.5%', 'Review'],
              ['Rumbek Agro', 'Seasonal crop loan', 'Rumbek', '$31,400', '15.0%', 'Approved'],
              ['Bor Fishing gruops', 'Group lending', 'Bor', '$27,900', '20.0%', 'Pending'],
            ].map(([borrower, product, branch, amount, apr, status]) => (
              <tr key={borrower}>
                <td>{borrower}</td>
                <td>{product}</td>
                <td>{branch}</td>
                <td>{amount}</td>
                <td>{apr}</td>
                <td><span className={`status-pill ${status.toLowerCase() === 'approved' ? 'on-time' : status.toLowerCase() === 'review' ? 'watchlist' : 'late'}`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.customers.eyebrow}</span>
          <h2>{activeInstitution.labels.customers.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.customers.action}</button>
      </div>

      <div className="kpi-grid four-up">
        <div className="panel stat-card">
          <span className="mini-label">Customers</span>
          <div className="stat-row"><strong>4,286</strong><span className="delta green">+9.3%</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">Active members</span>
          <div className="stat-row"><strong>3,522</strong><span className="delta blue">82.1%</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">New this month</span>
          <div className="stat-row"><strong>196</strong><span className="delta purple">+12</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">Retention</span>
          <div className="stat-row"><strong>94.6%</strong><span className="delta green">+1.1%</span></div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Directory</span>
            <h3>Customer records</h3>
          </div>
          <button type="button" className="ghost-btn small">Export</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Group</th>
              <th>Score</th>
              <th>Status</th>
              <th>Last loan</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {customerRows.map((customer) => (
              <tr key={customer.name}>
                <td>{customer.name}</td>
                <td>{customer.type}</td>
                <td>{customer.group}</td>
                <td>{customer.score}</td>
                <td><span className={`status-pill ${customer.status.toLowerCase() === 'active' ? 'on-time' : customer.status.toLowerCase() === 'healthy' ? 'watchlist' : 'late'}`}>{customer.status}</span></td>
                <td>{customer.lastLoan}</td>
                <td>{customer.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderSavings = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.savings.eyebrow}</span>
          <h2>{activeInstitution.labels.savings.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.savings.action}</button>
      </div>

      <div className="kpi-grid four-up">
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Deposit balances' : activeInstitution.label === 'MFI' ? 'Savings mobilized' : 'Share capital'}</span>
          <div className="stat-row"><strong>{activeInstitution.stats[0].value}</strong><span className={`delta ${activeInstitution.stats[0].tone}`}>{activeInstitution.stats[0].delta}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Monthly inflow' : activeInstitution.label === 'MFI' ? 'New deposits' : 'Member savings'}</span>
          <div className="stat-row"><strong>{activeInstitution.stats[1].value}</strong><span className={`delta ${activeInstitution.stats[1].tone}`}>{activeInstitution.stats[1].delta}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Withdrawal rate' : activeInstitution.label === 'MFI' ? 'Repayment rate' : 'Contribution ratio'}</span>
          <div className="stat-row"><strong>{activeInstitution.stats[3].value}</strong><span className={`delta ${activeInstitution.stats[3].tone}`}>{activeInstitution.stats[3].delta}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Active savers' : activeInstitution.label === 'MFI' ? 'Active clients' : 'Active members'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '8,240' : activeInstitution.label === 'MFI' ? '18.4K' : '3,116'}</strong><span className="delta purple">{activeInstitution.label === 'Bank' ? '+384' : activeInstitution.label === 'MFI' ? '+11.2%' : '+164'}</span></div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Accounts</span>
            <h3>Top savings groups</h3>
          </div>
          <button type="button" className="ghost-btn small">Export</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Group</th>
              <th>Product</th>
              <th>Balance</th>
              <th>Members</th>
              <th>Yield</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Thiang-kiir Women Club', 'Target savings', '$1.4M', '318', '9.2%', 'Healthy'],
              ['Borchar Agribusiness', 'Agri wallet', '$2.1M', '402', '8.8%', 'Healthy'],
              ['Tonj SACCO', 'Emergency fund', '$980K', '216', '8.3%', 'Review'],
              ['Rumbek Savers', 'Daily savings', '$1.8M', '468', '7.9%', 'Healthy'],
            ].map(([group, product, balance, members, yieldRate, status]) => (
              <tr key={group}>
                <td>{group}</td>
                <td>{product}</td>
                <td>{balance}</td>
                <td>{members}</td>
                <td>{yieldRate}</td>
                <td><span className={`status-pill ${status === 'Healthy' ? 'on-time' : 'watchlist'}`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCollections = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.collections.eyebrow}</span>
          <h2>{activeInstitution.labels.collections.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.collections.action}</button>
      </div>

      <div className="kpi-grid four-up">
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Collected today' : activeInstitution.label === 'MFI' ? 'Recovered this week' : 'Member collections'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '$1.26M' : activeInstitution.label === 'MFI' ? '$824K' : '$468K'}</strong><span className="delta green">{activeInstitution.label === 'Bank' ? '+18.4%' : activeInstitution.label === 'MFI' ? '+12.1%' : '+9.6%'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Due this week' : activeInstitution.label === 'MFI' ? 'Due this cycle' : 'Due this month'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '$3.8M' : activeInstitution.label === 'MFI' ? '$2.1M' : '$1.4M'}</strong><span className="delta blue">{activeInstitution.label === 'Bank' ? '94% on track' : activeInstitution.label === 'MFI' ? '91% on track' : '96% on track'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Recovery rate' : activeInstitution.label === 'MFI' ? 'Collection efficiency' : 'Recovery ratio'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '91.6%' : activeInstitution.label === 'MFI' ? '89.7%' : '94.3%'}</strong><span className="delta purple">{activeInstitution.label === 'Bank' ? '+2.9%' : activeInstitution.label === 'MFI' ? '+3.4%' : '+2.1%'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Missed payments' : activeInstitution.label === 'MFI' ? 'Past-due accounts' : 'Arrears cases'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '126' : activeInstitution.label === 'MFI' ? '218' : '94'}</strong><span className="delta amber">{activeInstitution.label === 'Bank' ? '-19' : activeInstitution.label === 'MFI' ? '-27' : '-12'}</span></div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Cash flow</span>
              <h3>Weekly collections</h3>
            </div>
            <button type="button" className="chip">This month</button>
          </div>

          <div className="bar-chart">
            {reportTrend.map((item) => (
              <div key={item.month} className="bar-group">
                <div className="bar-labels">
                  <span>{item.month}</span>
                  <span>${(item.value / 10).toFixed(1)}K</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.value}%`, background: 'linear-gradient(90deg, var(--secondary), var(--primary))' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel list-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Priority</span>
              <h3>Field collections</h3>
            </div>
          </div>

          <div className="segment-list">
            <div className="segment-row">
              <div>
                <strong>Branch field teams</strong>
                <span>18 agents assigned</span>
              </div>
              <div className="segment-meta">
                <b>86%</b>
                <em>Target hit</em>
              </div>
            </div>
            <div className="segment-row">
              <div>
                <strong>Mobile collections</strong>
                <span>724 payments scheduled</span>
              </div>
              <div className="segment-meta">
                <b>73%</b>
                <em>Confirmed</em>
              </div>
            </div>
            <div className="segment-row">
              <div>
                <strong>Recoveries closed</strong>
                <span>214 settlements this week</span>
              </div>
              <div className="segment-meta">
                <b>$892K</b>
                <em>Recovered</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Accounts</span>
            <h3>Recovery queue</h3>
          </div>
          <button type="button" className="ghost-btn small">Export call log</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Collector</th>
              <th>Amount</th>
              <th>Due date</th>
              <th>Bucket</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {collectionRows.map((row) => (
              <tr key={row.account}>
                <td>{row.account}</td>
                <td>{row.agent}</td>
                <td>{row.amount}</td>
                <td>{row.due}</td>
                <td>{row.bucket}</td>
                <td><span className={`status-pill ${row.status === 'Follow-up' ? 'watchlist' : row.status === 'Promised pay' ? 'on-time' : 'late'}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRisk = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.risk.eyebrow}</span>
          <h2>{activeInstitution.labels.risk.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.risk.action}</button>
      </div>

      <div className="kpi-grid four-up">
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Exposure at risk' : activeInstitution.label === 'MFI' ? 'Portfolio at risk' : 'Member exposure'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '$4.2M' : activeInstitution.label === 'MFI' ? '$1.8M' : '$920K'}</strong><span className="delta amber">{activeInstitution.label === 'Bank' ? '+0.7M' : activeInstitution.label === 'MFI' ? '+0.3M' : '+0.1M'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'High-risk accounts' : activeInstitution.label === 'MFI' ? 'At-risk clients' : 'High-risk members'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '74' : activeInstitution.label === 'MFI' ? '168' : '96'}</strong><span className="delta red">{activeInstitution.label === 'Bank' ? '11 escalated' : activeInstitution.label === 'MFI' ? '23 escalated' : '14 escalated'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Risk score' : activeInstitution.label === 'MFI' ? 'Delinquency score' : 'Arrears score'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '42/100' : activeInstitution.label === 'MFI' ? '38/100' : '44/100'}</strong><span className="delta green">{activeInstitution.label === 'Bank' ? 'Improving' : activeInstitution.label === 'MFI' ? 'Stable' : 'Improving'}</span></div>
        </div>
        <div className="panel stat-card">
          <span className="mini-label">{activeInstitution.label === 'Bank' ? 'Provision cover' : activeInstitution.label === 'MFI' ? 'Loan loss reserve' : 'Risk reserve'}</span>
          <div className="stat-row"><strong>{activeInstitution.label === 'Bank' ? '128%' : activeInstitution.label === 'MFI' ? '112%' : '120%'}</strong><span className="delta blue">{activeInstitution.label === 'Bank' ? 'Healthy' : activeInstitution.label === 'MFI' ? 'Adequate' : 'Healthy'}</span></div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Thresholds</span>
              <h3>Risk trend</h3>
            </div>
            <button type="button" className="chip">90-day view</button>
          </div>

          <div className="trend-grid">
            {[78, 75, 68, 62, 58, 49, 44].map((value, index) => (
              <div key={index} className="trend-stack">
                <span style={{ height: `${value}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="panel list-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Alerts</span>
              <h3>Watchlist</h3>
            </div>
          </div>

          <div className="watch-list">
            {riskAlerts.map((item) => (
              <div key={item.name} className="watch-item">
                <div className={`watch-indicator ${item.severity === 'High' ? 'red' : item.severity === 'Moderate' ? 'amber' : 'purple'}`} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.exposure}</span>
                </div>
                <small>{item.category} · score {item.score}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Exposure</span>
            <h3>Risk register</h3>
          </div>
          <button type="button" className="ghost-btn small">Download report</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Category</th>
              <th>Exposure</th>
              <th>Score</th>
              <th>Severity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riskAlerts.map((risk) => (
              <tr key={risk.name}>
                <td>{risk.name}</td>
                <td>{risk.category}</td>
                <td>{risk.exposure}</td>
                <td>{risk.score}</td>
                <td><span className={`status-pill ${risk.severity === 'High' ? 'late' : risk.severity === 'Moderate' ? 'watchlist' : 'on-time'}`}>{risk.severity}</span></td>
                <td>Review</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="mini-label">{activeInstitution.labels.reports.eyebrow}</span>
          <h2>{activeInstitution.labels.reports.title}</h2>
        </div>
        <button type="button" className="primary-btn">{activeInstitution.labels.reports.action}</button>
      </div>

      <div className="kpi-grid four-up">
        {reportMetrics.map((metric) => (
          <div key={metric.label} className="panel stat-card">
            <span className="mini-label">{metric.label}</span>
            <div className="stat-row"><strong>{metric.value}</strong><span className={`delta ${metric.tone}`}>{metric.delta}</span></div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Revenue</span>
              <h3>Portfolio momentum</h3>
            </div>
            <button type="button" className="chip">Quarterly</button>
          </div>

          <div className="report-hero">
            <div className="report-hero-card">
              <span>Net inflow</span>
              <strong>$8.4M</strong>
              <small>vs prior quarter +22.5%</small>
            </div>
            <div className="report-mini-grid">
              <div>
                <span>Operating margin</span>
                <strong>31.8%</strong>
              </div>
              <div>
                <span>Avg. ticket</span>
                <strong>$14.2K</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="panel list-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Forecast</span>
              <h3>Quarter outlook</h3>
            </div>
          </div>

          <div className="segment-list">
            <div className="segment-row">
              <div>
                <strong>Disbursements</strong>
                <span>Projected $12.8M</span>
              </div>
              <div className="segment-meta">
                <b>+9%</b>
                <em>Upward</em>
              </div>
            </div>
            <div className="segment-row">
              <div>
                <strong>Collections</strong>
                <span>Projected $11.2M</span>
              </div>
              <div className="segment-meta">
                <b>+7%</b>
                <em>Stable</em>
              </div>
            </div>
            <div className="segment-row">
              <div>
                <strong>Risk reserve</strong>
                <span>Recommended $1.6M</span>
              </div>
              <div className="segment-meta">
                <b>4.8%</b>
                <em>Target</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <div>
            <span className="mini-label">Regional</span>
            <h3>Performance by branch</h3>
          </div>
          <button type="button" className="ghost-btn small">Refresh</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Disbursed</th>
              <th>Collected</th>
              <th>Recovery</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {reportRows.map((row) => (
              <tr key={row.region}>
                <td>{row.region}</td>
                <td>{row.disbursed}</td>
                <td>{row.collected}</td>
                <td>{row.recovery}</td>
                <td><span className={`status-pill ${row.risk === 'Low' ? 'on-time' : 'watchlist'}`}>{row.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderContent = () => {
    if (activeView === 'loans') return renderLoans()
    if (activeView === 'customers') return renderCustomers()
    if (activeView === 'savings') return renderSavings()
    if (activeView === 'collections') return renderCollections()
    if (activeView === 'risk') return renderRisk()
    if (activeView === 'reports') return renderReports()
    return renderOverview()
  }

  return (
    <div className="dashboard-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="logo-area">
          <div className="brand-mark">{brandInitial}</div>
          <div className="brand-copy">
            <small>{activeInstitution.label} platform</small>
            <h2>{businessName || 'Your business'}</h2>
          </div>
        </div>

        <label className="business-name-field">
          <span>Business name</span>
          <input
            type="text"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Enter business name"
            aria-label="Business name"
          />
        </label>

        <div className="institution-switcher" aria-label="Institution profile selector">
          <span>Institution type</span>
          <div className="institution-options">
            {Object.entries(institutionProfiles).map(([key, profile]) => (
              <button
                key={key}
                type="button"
                className={key === institutionType ? 'institution-option active' : 'institution-option'}
                onClick={() => setInstitutionType(key)}
              >
                {profile.label}
              </button>
            ))}
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === activeView ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveView(item.key)}
            >
              <span className="nav-dot" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="mini-label">Portfolio health</div>
          <strong>82.4%</strong>
          <span>Performing loans</span>
          <div className="sparkline" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div className="topbar-meta">
            <span className="mini-label">{activeInstitution.label} overview</span>
            <strong>{activeInstitution.label} command center</strong>
          </div>

          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input type="text" defaultValue="Search borrower, branch, account" aria-label="Search" />
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-btn" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <button type="button" className="primary-btn">New loan</button>
            <div className="user-pill">
              <div className="avatar">AD</div>
              <div>
                <strong>Admin</strong>
                <span>Operations</span>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  )
}

export default App
