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

const fallbackData = {
  overview: {
    stats: [
      { label: 'Portfolio value', value: '$24.8M', delta: '+12.4%', tone: 'green' },
      { label: 'Disbursements', value: '$6.2M', delta: '+8.1%', tone: 'blue' },
      { label: 'Collections', value: '$5.4M', delta: '+6.7%', tone: 'purple' },
      { label: 'Default ratio', value: '2.8%', delta: '-0.9%', tone: 'amber' },
    ],
    performanceBars: [
      { name: 'Retail', value: 84, color: '#338b7e' },
      { name: 'SME', value: 72, color: '#86efac' },
      { name: 'Agri', value: 63, color: '#fbbf24' },
      { name: 'SACCO', value: 89, color: '#fb923c' },
    ],
    borrowerSegments: [
      { sector: 'Micro business', total: '$8.4M', share: '34%', trend: '+4.2%' },
      { sector: 'Agriculture', total: '$5.1M', share: '21%', trend: '+2.9%' },
      { sector: 'SME finance', total: '$6.7M', share: '27%', trend: '+5.7%' },
      { sector: 'Consumer loans', total: '$4.6M', share: '18%', trend: '+1.8%' },
    ],
    loanRows: [
      { borrower: 'Martha Nyebel.', product: 'Working capital', amount: '$18,200', status: 'On-time', due: '12 days', risk: 'Low' },
      { borrower: 'Gambella food Hub', product: 'Inventory finance', amount: '$42,500', status: 'Watchlist', due: '4 days', risk: 'Moderate' },
      { borrower: 'Rumbek Agro', product: 'Seasonal crop loan', amount: '$31,400', status: 'On-time', due: '19 days', risk: 'Low' },
      { borrower: 'Bor Fishing gruops', product: 'Group lending', amount: '$27,900', status: 'Late', due: '2 days', risk: 'High' },
    ],
    riskItems: [
      { name: 'B2B pipeline', value: '$1.2M', detail: '6 deals need review', color: 'amber' },
      { name: 'Delayed repayments', value: '$780K', detail: '18 accounts > 7 days', color: 'red' },
      { name: 'High value customers', value: '42', detail: 'Exposure > $100K', color: 'purple' },
    ],
  },
  loans: {
    stats: [
      { label: 'Approved', value: '$8.1M', delta: '+14.8%', tone: 'green' },
      { label: 'Pending review', value: '42', delta: '+6', tone: 'amber' },
      { label: 'Repayments due', value: '$2.4M', delta: 'Due soon', tone: 'blue' },
    ],
    rows: [
      { borrower: 'Martha Nyebel.', product: 'Working capital', branch: 'Juba', amount: '$18,200', apr: '18.0%', status: 'Approved' },
      { borrower: 'Gambella food Hub', product: 'Inventory finance', branch: 'Gambella', amount: '$42,500', apr: '16.5%', status: 'Review' },
      { borrower: 'Rumbek Agro', product: 'Seasonal crop loan', branch: 'Rumbek', amount: '$31,400', apr: '15.0%', status: 'Approved' },
      { borrower: 'Bor fishing gruops', product: 'Group lending', branch: 'Bor ', amount: '$27,900', apr: '20.0%', status: 'Pending' },
    ],
  },
  customers: {
    stats: [
      { label: 'Customers', value: '4,286', delta: '+9.3%', tone: 'green' },
      { label: 'Active members', value: '3,522', delta: '82.1%', tone: 'blue' },
      { label: 'New this month', value: '196', delta: '+12', tone: 'purple' },
      { label: 'Retention', value: '94.6%', delta: '+1.1%', tone: 'green' },
    ],
    rows: [
      { name: 'Taidor Gatdet', type: 'Retail', group: 'Women enterprise', score: '92', status: 'Active', lastLoan: '$4,800', city: 'Malakal' },
      { name: 'Mambo Foods', type: 'SME', group: 'Food & retail', score: '88', status: 'Healthy', lastLoan: '$12,500', city: 'Bor' },
      { name: 'kajaak Farms', type: 'Agriculture', group: 'Farm input', score: '81', status: 'Review', lastLoan: '$7,200', city: 'Wau' },
      { name: 'NIMSA GRUOPS', type: 'SACCO', group: 'Member lending', score: '94', status: 'Active', lastLoan: '$18,900', city: 'Tonj' },
      { name: 'Marion Atuhairwe', type: 'Consumer', group: 'Payroll', score: '79', status: 'Watch', lastLoan: '$2,900', city: 'Yie' },
    ],
  },
  savings: {
    stats: [
      { label: 'Total savings', value: '$18.6M', delta: '+11.2%', tone: 'green' },
      { label: 'Monthly inflow', value: '$2.9M', delta: '+7.4%', tone: 'blue' },
      { label: 'Withdrawal rate', value: '14.8%', delta: 'Stable', tone: 'amber' },
      { label: 'Active savers', value: '2,146', delta: '+184', tone: 'purple' },
    ],
    rows: [
      { group: 'Addiss Ababa Women Club', product: 'Target savings', balance: '$1.4M', members: '318', yieldRate: '9.2%', status: 'Healthy' },
      { group: 'Kiboko Agribusiness', product: 'Agri wallet', balance: '$2.1M', members: '402', yieldRate: '8.8%', status: 'Healthy' },
      { group: 'Starlight SACCO', product: 'Emergency fund', balance: '$980K', members: '216', yieldRate: '8.3%', status: 'Review' },
      { group: 'Urban Savers', product: 'Daily savings', balance: '$1.8M', members: '468', yieldRate: '7.9%', status: 'Healthy' },
    ],
  },
  collections: {
    stats: [
      { label: 'Collected today', value: '$1.26M', delta: '+18.4%', tone: 'green' },
      { label: 'Due this week', value: '$3.8M', delta: '94% on track', tone: 'blue' },
      { label: 'Recovery rate', value: '91.6%', delta: '+2.9%', tone: 'purple' },
      { label: 'Missed payments', value: '126', delta: '-19', tone: 'amber' },
    ],
    chart: [
      { month: 'Jan', value: 62 },
      { month: 'Feb', value: 68 },
      { month: 'Mar', value: 72 },
      { month: 'Apr', value: 78 },
      { month: 'May', value: 82 },
      { month: 'Jun', value: 89 },
    ],
    rows: [
      { account: 'Martha Nyebel', agent: 'Jane M.', amount: '$21,476', due: '15 Apr', status: 'Follow-up', bucket: '7-14 days' },
      { account: 'Bor Fishing gruops', agent: 'Philip A.', amount: '$33,480', due: '12 Apr', status: 'Promised pay', bucket: '1-6 days' },
      { account: 'Rumbek Agro', agent: 'Aisha K.', amount: '$36,110', due: '8 Apr', status: 'In progress', bucket: '1-6 days' },
      { account: 'Gambella Food Hub', agent: 'Chris O.', amount: '$49,513', due: '21 Apr', status: 'Escalated', bucket: '15+ days' },
    ],
  },
  risk: {
    stats: [
      { label: 'Exposure at risk', value: '$4.2M', delta: '+0.7M', tone: 'amber' },
      { label: 'High-risk accounts', value: '74', delta: '11 escalated', tone: 'red' },
      { label: 'Risk score', value: '42/100', delta: 'Improving', tone: 'green' },
      { label: 'Provision cover', value: '128%', delta: 'Healthy', tone: 'blue' },
    ],
    trend: [78, 75, 68, 62, 58, 49, 44],
    alerts: [
      { name: 'TAITECH SACCO ', exposure: '$420K', score: '68', category: 'Concentration risk', severity: 'High' },
      { name: 'Bathel Gruops', exposure: '$310K', score: '74', category: 'Seasonality risk', severity: 'Moderate' },
      { name: 'GAmbella Boda Association', exposure: '$260K', score: '81', category: 'Delinquency risk', severity: 'High' },
      { name: 'Udier Teacher Association', exposure: '$92K', score: '61', category: 'Income volatility', severity: 'Low' },
    ],
  },
  reports: {
    stats: [
      { label: 'Portfolio recovery', value: '92.8%', delta: '+3.4%', tone: 'green' },
      { label: 'Cash collection rate', value: '86.1%', delta: '+1.8%', tone: 'blue' },
      { label: 'Late payment ratio', value: '4.7%', delta: '-0.6%', tone: 'purple' },
      { label: 'Operating cost', value: '12.3%', delta: '-0.9%', tone: 'amber' },
    ],
    rows: [
      { region: 'Malakal', disbursed: '$3.1M', collected: '$2.8M', recovery: '90.3%', risk: 'Low' },
      { region: 'Yie', disbursed: '$1.9M', collected: '$1.6M', recovery: '84.2%', risk: 'Moderate' },
      { region: 'Juba', disbursed: '$2.4M', collected: '$2.1M', recovery: '87.6%', risk: 'Low' },
      { region: 'Bor', disbursed: '$2.8M', collected: '$2.5M', recovery: '89.2%', risk: 'Moderate' },
    ],
  },
}

const formatStatusClass = (value = '') => {
  const text = String(value).toLowerCase()
  if (text.includes('approved') || text.includes('active') || text.includes('healthy') || text.includes('on-time') || text.includes('promised')) {
    return 'on-time'
  }
  if (text.includes('review') || text.includes('watch') || text.includes('moderate') || text.includes('follow-up') || text.includes('pending')) {
    return 'watchlist'
  }
  return 'late'
}

const filterRows = (rows, searchTerm, statusFilter) => {
  const term = searchTerm.trim().toLowerCase()

  return rows.filter((row) => {
    const values = Object.values(row).join(' ').toLowerCase()
    const matchesSearch = !term || values.includes(term)
    const statusValue = String(row.status ?? row.severity ?? row.risk ?? row.bucket ?? '').toLowerCase()
    const matchesStatus = statusFilter === 'all' || statusValue === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })
}

const exportCsv = (rows, fileName) => {
  if (!rows.length) return

  const headers = Object.keys(rows[0])
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? '').replace(/"/g, '""')}"`)
        .join(','),
    ),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const recordForms = {
  loan: {
    endpoint: 'loans',
    title: 'Add a loan',
    submitLabel: 'Save loan',
    fields: [
      { name: 'borrower', label: 'Borrower' },
      { name: 'product', label: 'Loan product', options: ['Working capital', 'Inventory finance', 'Seasonal crop loan', 'Group lending'] },
      { name: 'branch', label: 'Branch' },
      { name: 'amount', label: 'Amount', placeholder: '$10,000' },
      { name: 'apr', label: 'APR', placeholder: '18.0%' },
      { name: 'status', label: 'Status', options: ['Pending', 'Review', 'Approved'] },
    ],
  },
  customer: {
    endpoint: 'customers',
    title: 'Add a customer',
    submitLabel: 'Save customer',
    fields: [
      { name: 'name', label: 'Customer name' },
      { name: 'type', label: 'Customer type', options: ['Retail', 'SME', 'Agriculture', 'SACCO', 'Consumer'] },
      { name: 'group', label: 'Group' },
      { name: 'score', label: 'Score', type: 'number', placeholder: '90' },
      { name: 'status', label: 'Status', options: ['Active', 'Healthy', 'Review', 'Watch'] },
      { name: 'lastLoan', label: 'Last loan', placeholder: '$4,800' },
      { name: 'city', label: 'City' },
    ],
  },
  savings: {
    endpoint: 'savings',
    title: 'Add a savings product',
    submitLabel: 'Save savings product',
    fields: [
      { name: 'group', label: 'Group or account name' },
      { name: 'product', label: 'Savings product' },
      { name: 'balance', label: 'Opening balance', placeholder: '$1,000' },
      { name: 'members', label: 'Members', type: 'number', placeholder: '1' },
      { name: 'yieldRate', label: 'Yield rate', placeholder: '8.5%' },
      { name: 'status', label: 'Status', options: ['Healthy', 'Review'] },
    ],
  },
  payment: {
    endpoint: 'collections',
    title: 'Record a payment',
    submitLabel: 'Save payment',
    fields: [
      { name: 'account', label: 'Borrower or account' },
      { name: 'agent', label: 'Collector' },
      { name: 'amount', label: 'Amount paid', placeholder: '$500' },
      { name: 'due', label: 'Payment date', type: 'date' },
      { name: 'bucket', label: 'Collection bucket', options: ['Paid today', '1-6 days', '7-14 days', '15+ days'] },
      { name: 'status', label: 'Status', options: ['Promised pay', 'In progress', 'Follow-up'] },
    ],
  },
  risk: {
    endpoint: 'risk',
    title: 'Add a risk alert',
    submitLabel: 'Save alert',
    fields: [
      { name: 'name', label: 'Client name' },
      { name: 'category', label: 'Risk category' },
      { name: 'exposure', label: 'Exposure', placeholder: '$420K' },
      { name: 'score', label: 'Score', type: 'number', placeholder: '68' },
      { name: 'severity', label: 'Severity', options: ['High', 'Moderate', 'Low'] },
    ],
  },
}

const getRecordDefaults = (recordType) => Object.fromEntries(
  recordForms[recordType].fields.map((field) => [field.name, field.options?.[0] ?? '']),
)

function App() {
  const [activeView, setActiveView] = useState('overview')
  const [theme, setTheme] = useState(() => localStorage.getItem('gofinance-theme') || 'dark')
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('gofinance-token')))
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gofinance-user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [authForm, setAuthForm] = useState({ email: 'Taitechweb@gmail.com', password: 'Taitech29@' })
  const [authError, setAuthError] = useState('')
  const [dashboardData, setDashboardData] = useState(fallbackData)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [recordType, setRecordType] = useState(null)
  const [recordIndex, setRecordIndex] = useState(null)
  const [recordForm, setRecordForm] = useState({})
  const [recordError, setRecordError] = useState('')
  const [isSavingRecord, setIsSavingRecord] = useState(false)
  const [customerEditor, setCustomerEditor] = useState(null)
  const [customerError, setCustomerError] = useState('')
  const [isSavingCustomer, setIsSavingCustomer] = useState(false)
  const isAdminUser = (account) => Boolean(account && (account.email === 'admin@gofinance.io' || account.role === 'Operations' || account.role === 'Admin'))
  const canManageRecords = isAdminUser(user)

  useEffect(() => {
    localStorage.setItem('gofinance-theme', theme)
  }, [theme])

  const clearSessionState = () => {
    localStorage.removeItem('gofinance-token')
    localStorage.removeItem('gofinance-user')
    setUser(null)
    setIsAuthenticated(false)
    setAuthError('')
    setActiveView('overview')
  }

  const fetchPageData = async (pageKey) => {
    const token = localStorage.getItem('gofinance-token')
    if (!token) {
      if (isAuthenticated) {
        clearSessionState()
      }
      return
    }

    try {
      const response = await fetch(`/api/${pageKey}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        clearSessionState()
        return
      }

      if (!response.ok) {
        throw new Error('Unable to fetch data')
      }

      const pageData = await response.json()
      setDashboardData((current) => ({ ...current, [pageKey]: pageData }))
    } catch {
      setDashboardData((current) => ({ ...current, [pageKey]: fallbackData[pageKey] }))
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return

    const loadPageData = () => {
      void fetchPageData(activeView)
    }

    const initialLoadTimer = window.setTimeout(loadPageData, 0)
    const refreshTimer = window.setInterval(loadPageData, 60_000)

    return () => {
      window.clearTimeout(initialLoadTimer)
      window.clearInterval(refreshTimer)
    }
  }, [activeView, isAuthenticated])

  const handleLogin = async (event) => {
    event.preventDefault()
    setAuthError('')
    setIsSigningIn(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authForm),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('gofinance-token', data.token)
      localStorage.setItem('gofinance-user', JSON.stringify(data.user))
      setUser(data.user)
      setIsAuthenticated(true)
      setActiveView('overview')
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleLogout = () => {
    const token = localStorage.getItem('gofinance-token')
    if (token) {
      void fetch('/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {})
    }

    clearSessionState()
  }

  const openRecordModal = (nextRecordType, initialRecord = null, index = null) => {
    if (!canManageRecords) {
      setRecordError('Admin access is required to manage records.')
      return
    }

    setRecordType(nextRecordType)
    setRecordIndex(index)
    setRecordForm(initialRecord ? { ...initialRecord } : getRecordDefaults(nextRecordType))
    setRecordError('')
  }

  const handleRemoveRecord = async (endpoint, index, refreshPages = [endpoint]) => {
    if (!canManageRecords) return

    const confirmed = window.confirm('Remove this record?')
    if (!confirmed) return

    const token = localStorage.getItem('gofinance-token')
    if (!token) return

    try {
      const response = await fetch(`/api/${endpoint}/${index}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Unable to remove this record.')
      }

      await Promise.all(refreshPages.map(fetchPageData))
      if (endpoint === 'loans') {
        await fetchPageData('overview')
      }
    } catch (error) {
      setRecordError(error.message)
    }
  }

  const handleRecordSubmit = async (event) => {
    event.preventDefault()
    const config = recordForms[recordType]
    const token = localStorage.getItem('gofinance-token')
    if (!config || !token || !canManageRecords) {
      setRecordError('Admin access is required to manage records.')
      return
    }

    const isEditing = Number.isInteger(recordIndex) && recordIndex >= 0
    const method = isEditing ? 'PUT' : 'POST'
    const url = isEditing ? `/api/${config.endpoint}/${recordIndex}` : `/api/${config.endpoint}`

    setRecordError('')
    setIsSavingRecord(true)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordForm),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Unable to save this record.')
      }

      const pagesToRefresh = config.endpoint === 'loans' ? ['loans', 'overview'] : [config.endpoint]
      await Promise.all(pagesToRefresh.map(fetchPageData))
      setActiveView(config.endpoint)
      setRecordType(null)
      setRecordIndex(null)
      setRecordForm({})
    } catch (error) {
      setRecordError(error.message)
    } finally {
      setIsSavingRecord(false)
    }
  }

  const renderRecordModal = () => {
    if (!recordType) return null
    const config = recordForms[recordType]

    return (
      <div className="modal-backdrop" role="presentation" onMouseDown={() => setRecordType(null)}>
        <section className="record-modal" role="dialog" aria-modal="true" aria-labelledby="record-modal-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className="modal-header">
            <div>
              <span className="mini-label">Data entry</span>
              <h2 id="record-modal-title">{config.title}</h2>
            </div>
            <button type="button" className="ghost-btn small" onClick={() => setRecordType(null)}>Close</button>
          </div>

          <form className="record-form" onSubmit={handleRecordSubmit}>
            <div className="form-grid">
              {config.fields.map((field) => (
                <label key={field.name}>
                  <span>{field.label}</span>
                  {field.options ? (
                    <select value={recordForm[field.name] ?? ''} onChange={(event) => setRecordForm((current) => ({ ...current, [field.name]: event.target.value }))}>
                      {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={recordForm[field.name] ?? ''}
                      placeholder={field.placeholder}
                      onChange={(event) => setRecordForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      required
                    />
                  )}
                </label>
              ))}
            </div>

            {recordError && <div className="auth-error">{recordError}</div>}

            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setRecordType(null)}>Cancel</button>
              <button type="submit" className="primary-btn" disabled={isSavingRecord}>{isSavingRecord ? 'Saving...' : config.submitLabel}</button>
            </div>
          </form>
        </section>
      </div>
    )
  }

  const renderCustomerEditor = () => {
    if (!customerEditor) return null

    return (
      <div className="modal-backdrop" role="presentation" onMouseDown={closeCustomerEditor}>
        <section className="record-modal" role="dialog" aria-modal="true" aria-labelledby="customer-editor-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className="modal-header">
            <div>
              <span className="mini-label">Admin edit</span>
              <h2 id="customer-editor-title">Edit customer record</h2>
            </div>
            <button type="button" className="ghost-btn small" onClick={closeCustomerEditor}>Close</button>
          </div>

          <form className="record-form" onSubmit={handleCustomerSave}>
            <div className="form-grid">
              <label>
                <span>Customer name</span>
                <input value={customerEditor.name ?? ''} onChange={(event) => setCustomerEditor((current) => ({ ...current, name: event.target.value }))} placeholder="Client name" required />
              </label>
              <label>
                <span>Customer type</span>
                <select value={customerEditor.type ?? 'Retail'} onChange={(event) => setCustomerEditor((current) => ({ ...current, type: event.target.value }))}>
                  {['Retail', 'SME', 'Agriculture', 'SACCO', 'Consumer'].map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span>Group</span>
                <input value={customerEditor.group ?? ''} onChange={(event) => setCustomerEditor((current) => ({ ...current, group: event.target.value }))} placeholder="Women enterprise" required />
              </label>
              <label>
                <span>Score</span>
                <input type="number" value={customerEditor.score ?? ''} onChange={(event) => setCustomerEditor((current) => ({ ...current, score: event.target.value }))} placeholder="90" required />
              </label>
              <label>
                <span>Status</span>
                <select value={customerEditor.status ?? 'Active'} onChange={(event) => setCustomerEditor((current) => ({ ...current, status: event.target.value }))}>
                  {['Active', 'Healthy', 'Review', 'Watch'].map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span>Last loan</span>
                <input value={customerEditor.lastLoan ?? ''} onChange={(event) => setCustomerEditor((current) => ({ ...current, lastLoan: event.target.value }))} placeholder="$4,800" required />
              </label>
              <label>
                <span>City</span>
                <input value={customerEditor.city ?? ''} onChange={(event) => setCustomerEditor((current) => ({ ...current, city: event.target.value }))} placeholder="Nairobi" required />
              </label>
            </div>

            {customerError && <div className="auth-error">{customerError}</div>}

            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={closeCustomerEditor}>Cancel</button>
              <button type="submit" className="primary-btn" disabled={isSavingCustomer}>{isSavingCustomer ? 'Saving...' : 'Save changes'}</button>
            </div>
          </form>
        </section>
      </div>
    )
  }

  const renderTableToolbar = (rows, fileName) => (
    <div className="table-toolbar">
      <div className="toolbar-filters">
        <input
          type="search"
          className="table-search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search records..."
          aria-label="Search records"
        />
        <select
          className="status-select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="on-time">On time</option>
          <option value="watchlist">Watchlist</option>
          <option value="late">Late</option>
          <option value="approved">Approved</option>
          <option value="review">Review</option>
          <option value="healthy">Healthy</option>
          <option value="active">Active</option>
          <option value="follow-up">Follow-up</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button type="button" className="ghost-btn small" onClick={() => exportCsv(rows, fileName)}>
        Export CSV
      </button>
    </div>
  )

  const openCustomerEditor = (customer, index) => {
    setCustomerEditor({
      index,
      name: customer.name === 'Private customer' ? '' : (customer.name ?? ''),
      type: customer.type ?? 'Retail',
      group: customer.group ?? '',
      score: customer.score ?? '',
      status: customer.status ?? 'Active',
      lastLoan: customer.lastLoan ?? '',
      city: customer.city ?? '',
    })
    setCustomerError('')
  }

  const closeCustomerEditor = () => {
    setCustomerEditor(null)
    setCustomerError('')
  }

  const handleRemoveCustomer = async (index) => {
    if (!canManageRecords) return

    const confirmed = window.confirm('Remove this customer record?')
    if (!confirmed) return

    try {
      const token = localStorage.getItem('gofinance-token')
      const response = await fetch(`/api/customers/${index}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Unable to remove this customer record.')
      }

      await fetchPageData('customers')
    } catch (error) {
      setCustomerError(error.message)
    }
  }

    const handleCustomerSave = async (event) => {
    event.preventDefault()
    if (!customerEditor || !canManageRecords) return

    const token = localStorage.getItem('gofinance-token')
    if (!token) return

    setCustomerError('')
    setIsSavingCustomer(true)

    try {
      const response = await fetch(`/api/customers/${customerEditor.index}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...customerEditor,
          name: customerEditor.name.trim() || 'Private customer',
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Unable to save customer updates.')
      }

      setCustomerEditor(null)
      await fetchPageData('customers')
    } catch (error) {
      setCustomerError(error.message)
    } finally {
      setIsSavingCustomer(false)
    }
  }

  const renderOverview = () => {
    const overview = dashboardData.overview ?? fallbackData.overview
    const loanRows = filterRows(overview.loanRows || [], searchTerm, statusFilter)

    return (
      <>
        <section className="hero-grid">
          <div className="panel overview-panel">
            <div className="eyebrow">Lending intelligence</div>
            <h1>Portfolio control for lenders, MFIs, SACCOs & fintechs</h1>
            <p>
              Monitor pipeline health, collections performance, default risk and customer growth from one command center.
            </p>

            <div className="cta-row">
              <button type="button" className="primary-btn" onClick={() => openRecordModal('loan')}>Create disbursement</button>
              <button type="button" className="secondary-btn" onClick={() => setActiveView('reports')}>Export report</button>
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
                <h3>Healthy portfolio</h3>
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
          {(overview.stats || fallbackData.overview.stats).map((stat) => (
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
              {(overview.performanceBars || []).map((bar) => (
                <div key={bar.name} className="bar-group">
                  <div className="bar-labels">
                    <span>{bar.name}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${bar.value}%`, background: `linear-gradient(90deg, ${bar.color}, var(--primary))` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel list-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Segments</span>
                <h3>Borrower mix</h3>
              </div>
            </div>

            <div className="segment-list">
              {(overview.borrowerSegments || []).map((segment) => (
                <div key={segment.sector} className="segment-row">
                  <div>
                    <strong>{segment.sector}</strong>
                    <span>{segment.total} · {segment.share}</span>
                  </div>
                  <div className="segment-meta">
                    <b>{segment.trend}</b>
                    <em>Growth</em>
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
            </div>
            {renderTableToolbar(loanRows, 'overview-portfolio.csv')}

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
                  <tr key={`${row.borrower}-${row.product}`}>
                    <td>{row.borrower}</td>
                    <td>{row.product}</td>
                    <td>{row.amount}</td>
                    <td>
                      <span className={`status-pill ${formatStatusClass(row.status)}`}>
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
              {(overview.riskItems || []).map((item) => (
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
  }

  const renderLoans = () => {
    const loans = dashboardData.loans ?? fallbackData.loans
    const rows = filterRows(loans.rows || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Loan operations</span>
            <h2>Loan pipeline</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => openRecordModal('loan')}>+ New loan</button>
        </div>

        <div className="kpi-grid three-up">
          {(loans.stats || []).map((stat) => (
            <div key={stat.label} className="panel stat-card">
              <span className="mini-label">{stat.label}</span>
              <div className="stat-row"><strong>{stat.value}</strong><span className={`delta ${stat.tone}`}>{stat.delta}</span></div>
            </div>
          ))}
        </div>

        <div className="panel table-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Current pipeline</span>
              <h3>Loan applications</h3>
            </div>
          </div>
          {renderTableToolbar(rows, 'loan-pipeline.csv')}

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
              {rows.map((row) => (
                <tr key={`${row.borrower}-${row.branch}`}>
                  <td>{row.borrower}</td>
                  <td>{row.product}</td>
                  <td>{row.branch}</td>
                  <td>{row.amount}</td>
                  <td>{row.apr}</td>
                  <td><span className={`status-pill ${formatStatusClass(row.status)}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderCustomers = () => {
    const customers = dashboardData.customers ?? fallbackData.customers
    const rows = filterRows(customers.rows || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Client base</span>
            <h2>Customer portfolio</h2>
          </div>
          {canManageRecords ? (
            <button type="button" className="primary-btn" onClick={() => openRecordModal('customer')}>+ Add customer</button>
          ) : null}
        </div>

        <div className="kpi-grid four-up">
          {(customers.stats || []).map((stat) => (
            <div key={stat.label} className="panel stat-card">
              <span className="mini-label">{stat.label}</span>
              <div className="stat-row"><strong>{stat.value}</strong><span className={`delta ${stat.tone}`}>{stat.delta}</span></div>
            </div>
          ))}
        </div>

        <div className="panel table-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Directory</span>
              <h3>Customer records</h3>
            </div>
          </div>
          {renderTableToolbar(rows, 'customers.csv')}

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
                {canManageRecords ? <th>Admin</th> : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((customer, index) => (
                <tr key={`${customer.name}-${index}`}>
                  <td>{customer.name}</td>
                  <td>{customer.type}</td>
                  <td>{customer.group}</td>
                  <td>{customer.score}</td>
                  <td><span className={`status-pill ${formatStatusClass(customer.status)}`}>{customer.status}</span></td>
                  <td>{customer.lastLoan}</td>
                  <td>{customer.city}</td>
                  {canManageRecords ? (
                    <td>
                      <div className="row-actions">
                        <button type="button" className="ghost-btn small" onClick={() => openCustomerEditor(customer, index)}>Edit</button>
                        <button type="button" className="ghost-btn small danger" onClick={() => handleRemoveCustomer(index)}>Remove</button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderSavings = () => {
    const savings = dashboardData.savings ?? fallbackData.savings
    const rows = filterRows(savings.rows || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Savings engine</span>
            <h2>Savings overview</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => openRecordModal('savings')}>+ New savings product</button>
        </div>

        <div className="kpi-grid four-up">
          {(savings.stats || []).map((stat) => (
            <div key={stat.label} className="panel stat-card">
              <span className="mini-label">{stat.label}</span>
              <div className="stat-row"><strong>{stat.value}</strong><span className={`delta ${stat.tone}`}>{stat.delta}</span></div>
            </div>
          ))}
        </div>

        <div className="panel table-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Accounts</span>
              <h3>Top savings groups</h3>
            </div>
          </div>
          {renderTableToolbar(rows, 'savings-products.csv')}

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
              {rows.map((row) => (
                <tr key={row.group}>
                  <td>{row.group}</td>
                  <td>{row.product}</td>
                  <td>{row.balance}</td>
                  <td>{row.members}</td>
                  <td>{row.yieldRate}</td>
                  <td><span className={`status-pill ${formatStatusClass(row.status)}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderCollections = () => {
    const collections = dashboardData.collections ?? fallbackData.collections
    const rows = filterRows(collections.rows || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Collections</span>
            <h2>Recovery operations</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => openRecordModal('payment')}>+ Record payment</button>
        </div>

        <div className="kpi-grid four-up">
          {(collections.stats || []).map((stat) => (
            <div key={stat.label} className="panel stat-card">
              <span className="mini-label">{stat.label}</span>
              <div className="stat-row"><strong>{stat.value}</strong><span className={`delta ${stat.tone}`}>{stat.delta}</span></div>
            </div>
          ))}
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
              {(collections.chart || []).map((item) => (
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
          </div>
          {renderTableToolbar(rows, 'collections.csv')}

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
              {rows.map((row) => (
                <tr key={row.account}>
                  <td>{row.account}</td>
                  <td>{row.agent}</td>
                  <td>{row.amount}</td>
                  <td>{row.due}</td>
                  <td>{row.bucket}</td>
                  <td><span className={`status-pill ${formatStatusClass(row.status)}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderRisk = () => {
    const risk = dashboardData.risk ?? fallbackData.risk
    const rows = filterRows(risk.alerts || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Risk monitoring</span>
            <h2>Portfolio risk overview</h2>
          </div>
          <button type="button" className="primary-btn">+ Review watchlist</button>
        </div>

        <div className="kpi-grid four-up">
          {(risk.stats || []).map((stat) => (
            <div key={stat.label} className="panel stat-card">
              <span className="mini-label">{stat.label}</span>
              <div className="stat-row"><strong>{stat.value}</strong><span className={`delta ${stat.tone}`}>{stat.delta}</span></div>
            </div>
          ))}
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
              {(risk.trend || []).map((value, index) => (
                <div key={`${value}-${index}`} className="trend-stack">
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
              {(risk.alerts || []).map((item) => (
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
          </div>
          {renderTableToolbar(rows, 'risk-watchlist.csv')}

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
              {rows.map((riskItem) => (
                <tr key={riskItem.name}>
                  <td>{riskItem.name}</td>
                  <td>{riskItem.category}</td>
                  <td>{riskItem.exposure}</td>
                  <td>{riskItem.score}</td>
                  <td><span className={`status-pill ${formatStatusClass(riskItem.severity)}`}>{riskItem.severity}</span></td>
                  <td>Review</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderReports = () => {
    const reports = dashboardData.reports ?? fallbackData.reports
    const rows = filterRows(reports.rows || [], searchTerm, statusFilter)

    return (
      <div className="page-shell">
        <div className="page-header">
          <div>
            <span className="mini-label">Reports & analytics</span>
            <h2>Business performance dashboard</h2>
          </div>
          <button type="button" className="primary-btn" onClick={() => window.print()}>Export PDF</button>
        </div>

        <div className="kpi-grid four-up">
          {(reports.stats || []).map((metric) => (
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
          </div>
          {renderTableToolbar(rows, 'regional-performance.csv')}

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
              {rows.map((row) => (
                <tr key={row.region}>
                  <td>{row.region}</td>
                  <td>{row.disbursed}</td>
                  <td>{row.collected}</td>
                  <td>{row.recovery}</td>
                  <td><span className={`status-pill ${formatStatusClass(row.risk)}`}>{row.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (activeView === 'loans') return renderLoans()
    if (activeView === 'customers') return renderCustomers()
    if (activeView === 'savings') return renderSavings()
    if (activeView === 'collections') return renderCollections()
    if (activeView === 'risk') return renderRisk()
    if (activeView === 'reports') return renderReports()
    return renderOverview()
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="brand-mark">G</div>
            <div>
              <h2>GoFinance</h2>
              <span>Finance OS</span>
            </div>
          </div>

          <h1>Welcome back</h1>
          <p>Access your lending, collections and risk operations.</p>

          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="admin@gofinance.io"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Enter your password"
              />
            </label>

            {authError && <div className="auth-error">{authError}</div>}

            <button type="submit" className="primary-btn auth-submit" disabled={isSigningIn}>
              {isSigningIn ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="demo-credentials">
            Demo: Taitechweb@gmail.com / Taitech29@
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <h2>GoFinance</h2>
            <span>Finance OS</span>
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
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search borrower, branch, account"
              aria-label="Search"
            />
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-btn" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <button type="button" className="primary-btn" onClick={() => openRecordModal('loan')}>New loan</button>
            <div className="user-pill">
              <div className="avatar">{user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'JS'}</div>
              <div>
                <strong>{user?.name || 'Taitec Airbnb.'}</strong>
                <span>{user?.role || 'Operations'}</span>
              </div>
            </div>
            <button type="button" className="ghost-btn small" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {renderContent()}
      </main>
      {renderRecordModal()}
    </div>
  )
}

export default App
