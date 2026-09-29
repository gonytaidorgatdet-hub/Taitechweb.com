import express from 'express'
import { randomUUID } from 'node:crypto'

const app = express()
const port = Number(process.env.PORT) || 3001

const seedData = {
  overview: {
    stats: [
      { label: 'Portfolio value', value: '$24.8M', delta: '+12.4%', tone: 'green' },
      { label: 'Disbursements', value: '$6.2M', delta: '+8.1%', tone: 'blue' },
      { label: 'Collections', value: '$5.4M', delta: '+6.7%', tone: 'purple' },
      { label: 'Default ratio', value: '2.8%', delta: '-0.9%', tone: 'amber' },
    ],
    performanceBars: [
      { name: 'Retail', value: 84, color: '#5eead4' },
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
      { borrower: 'Gambella Food Hub', product: 'Inventory finance', amount: '$42,500', status: 'Watchlist', due: '4 days', risk: 'Moderate' },
      { borrower: 'Rumbek Agro', product: 'Seasonal crop loan', amount: '$31,400', status: 'On-time', due: '19 days', risk: 'Low' },
      { borrower: 'Bor fishing gruops', product: 'Group lending', amount: '$27,900', status: 'Late', due: '2 days', risk: 'High' },
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
      { borrower: 'Martha Nyebel.', product: 'Working capital', branch: 'Kisumu', amount: '$18,200', apr: '18.0%', status: 'Approved' },
      { borrower: 'Gambella Food Hub', product: 'Inventory finance', branch: 'Nairobi', amount: '$42,500', apr: '16.5%', status: 'Review' },
      { borrower: 'Rumbek Agro', product: 'Seasonal crop loan', branch: 'Eldoret', amount: '$31,400', apr: '15.0%', status: 'Approved' },
      { borrower: 'Bor Fishing gruops', product: 'Group lending', branch: 'Mombasa', amount: '$27,900', apr: '20.0%', status: 'Pending' },
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
      { name: 'Kajaak Farms', type: 'Agriculture', group: 'Farm input', score: '81', status: 'Review', lastLoan: '$7,200', city: 'Wau' },
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
      { group: 'Addis Ababa Women Club', product: 'Target savings', balance: '$1.4M', members: '318', yieldRate: '9.2%', status: 'Healthy' },
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
      { name: 'TAITECH SACCO', exposure: '$420K', score: '68', category: 'Concentration risk', severity: 'High' },
      { name: 'Bathel Gruops', exposure: '$310K', score: '74', category: 'Seasonality risk', severity: 'Moderate' },
      { name: 'Gambella Boda Association', exposure: '$260K', score: '81', category: 'Delinquency risk', severity: 'High' },
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

const users = [
  { email: 'Taitechweb@gmail.com', password: 'Taitech29@', name: 'TAidor@.', role: 'Operations' },
  { email: 'gonygatdettaidor@gmail.com', password: 'Taitech29@', name: 'Nyakim@.', role: 'Risk Manager' },
]

const sessions = new Map()

function createSession(user) {
  const token = `gofinance-prof-${randomUUID()}`
  sessions.set(token, user.email)
  return token
}

function readRequiredFields(body, fields) {
  const record = Object.fromEntries(
    fields.map((field) => [field, String(body?.[field] ?? '').trim()]),
  )

  return Object.values(record).every(Boolean) ? record : null
}

function isAdminUser(user) {
  return Boolean(user && (user.email === 'Taitechweb@gmail.com' || user.role === 'Operations' || user.role === 'Admin'))
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const user = users.find((entry) => entry.email === sessions.get(token))
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  req.user = user
  next()
}

function requireAdmin(req, res, next) {
  if (!isAdminUser(req.user)) {
    return res.status(403).json({ error: 'Admin access required.' })
  }

  next()
}

app.use(express.json())

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {}
  const user = users.find((entry) => entry.email === email && entry.password === password)

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  res.json({
    token: createSession(user),
    user: {
      name: user.name,
      role: user.role,
      email: user.email,
    },
  })
})

app.post('/api/logout', authMiddleware, (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  sessions.delete(token)
  res.status(204).end()
})

app.post('/api/loans', authMiddleware, requireAdmin, (req, res) => {
  const loan = readRequiredFields(req.body, ['borrower', 'product', 'branch', 'amount', 'apr', 'status'])
  if (!loan) {
    return res.status(400).json({ error: 'Complete every loan field.' })
  }

  seedData.loans.rows.unshift(loan)
  seedData.overview.loanRows.unshift({
    borrower: loan.borrower,
    product: loan.product,
    amount: loan.amount,
    status: loan.status,
    due: 'New',
    risk: loan.status === 'Approved' ? 'Low' : 'Moderate',
  })
  res.status(201).json({ record: loan })
})

app.put('/api/loans/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.loans.rows.length) {
    return res.status(404).json({ error: 'Loan record not found.' })
  }

  const loan = readRequiredFields(req.body, ['borrower', 'product', 'branch', 'amount', 'apr', 'status'])
  if (!loan) {
    return res.status(400).json({ error: 'Complete every loan field.' })
  }

  seedData.loans.rows[index] = loan

  if (seedData.overview.loanRows[index]) {
    seedData.overview.loanRows[index] = {
      borrower: loan.borrower,
      product: loan.product,
      amount: loan.amount,
      status: loan.status,
      due: seedData.overview.loanRows[index].due || 'Updated',
      risk: loan.status === 'Approved' ? 'Low' : 'Moderate',
    }
  }

  return res.json({ record: loan })
})

app.delete('/api/loans/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.loans.rows.length) {
    return res.status(404).json({ error: 'Loan record not found.' })
  }

  const [deleted]=seedData.loans.rows.splice(index, 1)
  if (seedData.overview.loanRows[index]) {
    seedData.overview.loanRows.splice(index, 1)
  }

  return res.json({ deleted: deleted ?? null })
})

app.post('/api/customers', authMiddleware, requireAdmin, (req, res) => {
  const customer = readRequiredFields(req.body, ['name', 'type', 'group', 'score', 'status', 'lastLoan', 'city'])
  if (!customer) {
    return res.status(400).json({ error: 'Complete every customer field.' })
  }

  seedData.customers.rows.unshift({
    ...customer,
    score: String(customer.score),
  })

  return res.status(201).json({ record: seedData.customers.rows[0] })
})

app.post('/api/savings', authMiddleware, requireAdmin, (req, res) => {
  const savingsRecord = readRequiredFields(req.body, ['group', 'product', 'balance', 'members', 'yieldRate', 'status'])
  if (!savingsRecord) {
    return res.status(400).json({ error: 'Complete every savings field.' })
  }

  seedData.savings.rows.unshift(savingsRecord)
  res.status(201).json({ record: savingsRecord })
})

app.post('/api/collections', authMiddleware, requireAdmin, (req, res) => {
  const payment = readRequiredFields(req.body, ['account', 'agent', 'amount', 'due', 'bucket', 'status'])
  if (!payment) {
    return res.status(400).json({ error: 'Complete every payment field.' })
  }

  seedData.collections.rows.unshift(payment)
  res.status(201).json({ record: payment })
})

app.put('/api/collections/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.collections.rows.length) {
    return res.status(404).json({ error: 'Collection record not found.' })
  }

  const payment = readRequiredFields(req.body, ['account', 'agent', 'amount', 'due', 'bucket', 'status'])
  if (!payment) {
    return res.status(400).json({ error: 'Complete every payment field.' })
  }

  seedData.collections.rows[index] = payment
  return res.json({ record: payment })
})

app.delete('/api/collections/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.collections.rows.length) {
    return res.status(404).json({ error: 'Collection record not found.' })
  }

  const [deleted] = seedData.collections.rows.splice(index, 1)
  return res.json({ deleted: deleted ?? null })
})

app.post('/api/risk', authMiddleware, requireAdmin, (req, res) => {
  const alert = readRequiredFields(req.body, ['name', 'category', 'exposure', 'score', 'severity'])
  if (!alert) {
    return res.status(400).json({ error: 'Complete every risk alert field.' })
  }

  seedData.risk.alerts.unshift({
    ...alert,
    score: String(alert.score),
  })
  return res.status(201).json({ record: seedData.risk.alerts[0] })
})

app.put('/api/risk/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.risk.alerts.length) {
    return res.status(404).json({ error: 'Risk alert not found.' })
  }

  const alert = readRequiredFields(req.body, ['name', 'category', 'exposure', 'score', 'severity'])
  if (!alert) {
    return res.status(400).json({ error: 'Complete every risk alert field.' })
  }

  seedData.risk.alerts[index] = {
    ...seedData.risk.alerts[index],
    ...alert,
    score: String(alert.score),
  }

  return res.json({ record: seedData.risk.alerts[index] })
})

app.delete('/api/risk/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.risk.alerts.length) {
    return res.status(404).json({ error: 'Risk alert not found.' })
  }

  const [deleted] = seedData.risk.alerts.splice(index, 1)
  return res.json({ deleted: deleted ?? null })
})

app.get('/api/overview', authMiddleware, (_req, res) => res.json(seedData.overview))
app.get('/api/loans', authMiddleware, (_req, res) => res.json(seedData.loans))
app.get('/api/customers', authMiddleware, (_req, res) => res.json(seedData.customers))
app.put('/api/customers/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.customers.rows.length) {
    return res.status(404).json({ error: 'Customer record not found.' })
  }

  const customer = readRequiredFields(req.body, ['name', 'type', 'group', 'score', 'status', 'lastLoan', 'city'])
  if (!customer) {
    return res.status(400).json({ error: 'Complete every customer field.' })
  }

  seedData.customers.rows[index] = {
    ...seedData.customers.rows[index],
    ...customer,
    score: String(customer.score),
  }

  return res.json({ record: seedData.customers.rows[index] })
})
app.delete('/api/customers/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.customers.rows.length) {
    return res.status(404).json({ error: 'Customer record not found.' })
  }

  const [deleted] = seedData.customers.rows.splice(index, 1)
  return res.json({ deleted: deleted ?? null })
})
app.put('/api/savings/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.savings.rows.length) {
    return res.status(404).json({ error: 'Savings record not found.' })
  }

  const savingsRecord = readRequiredFields(req.body, ['group', 'product', 'balance', 'members', 'yieldRate', 'status'])
  if (!savingsRecord) {
    return res.status(400).json({ error: 'Complete every savings field.' })
  }

  seedData.savings.rows[index] = {
    ...seedData.savings.rows[index],
    ...savingsRecord,
  }

  return res.json({ record: seedData.savings.rows[index] })
})

app.delete('/api/savings/:index', authMiddleware, requireAdmin, (req, res) => {
  const index = Number.parseInt(req.params.index, 10)
  if (!Number.isInteger(index) || index < 0 || index >= seedData.savings.rows.length) {
    return res.status(404).json({ error: 'Savings record not found.' })
  }

  const [deleted] = seedData.savings.rows.splice(index, 1)
  return res.json({ deleted: deleted ?? null })
})

app.get('/api/collections', authMiddleware, (_req, res) => res.json(seedData.collections))
app.get('/api/risk', authMiddleware, (_req, res) => res.json(seedData.risk))
app.get('/api/reports', authMiddleware, (_req, res) => res.json(seedData.reports))
app.get('/api/savings', authMiddleware, (_req, res) => res.json(seedData.savings))

app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`Finance API running on http://localhost:${port}`)
})
