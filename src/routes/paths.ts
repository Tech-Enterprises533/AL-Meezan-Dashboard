export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
  clientRoot: 'clients',
  amlRoot: 'aml',
  vatRoot: 'vat',
  listRoot: 'list',
  notificationsRoot: 'notifications',
};

const paths = {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,

  // Dashboard Subpages
  // home: `/${rootPaths.pageRoot}/dashboard`,
  pendingTasks: `/${rootPaths.pageRoot}/dashboard/pending-tasks`,
  upcomingDeadlines: `/${rootPaths.pageRoot}/dashboard/upcoming-deadlines`,
  alerts: `/${rootPaths.pageRoot}/dashboard/alerts`,

  // Authentication
  signin: `/${rootPaths.authRoot}/signin`,

  // Error Pages
  notFound: `/${rootPaths.errorRoot}/404`,

  // Client Management
  clients: `/${rootPaths.clientRoot}`,
  clientAllClients: `/${rootPaths.clientRoot}/all-clients`,
  clientAddNew: `/${rootPaths.clientRoot}/add-new`,
  clientUpdate: (id: string | number) => `/${rootPaths.clientRoot}/update/${id}`,
  clientDelete: (id: string | number) => `/${rootPaths.clientRoot}/delete/${id}`,

  // AML Compliance Bar
  kycForm: `/${rootPaths.amlRoot}/kyc-form`,
  tradeWiseCompliance: `/${rootPaths.amlRoot}/trade-wise-compliance`,
  authorityWiseCompliance: `/${rootPaths.amlRoot}/authority-wise-compliance`,

  // VAT Form
  vatRegistration: `/${rootPaths.vatRoot}/vat-registration`,
  vatDeRegistration: `/${rootPaths.vatRoot}/vat-de-registration`,
  vatRefundClaims: `/${rootPaths.vatRoot}/vat-refund-claims`,
  vatReconsiderationRequests: `/${rootPaths.vatRoot}/vat-reconsideration-requests`,
  vatInquiriesComplains: `/${rootPaths.vatRoot}/vat-inquiries-complains`,

  // VAT Form List
  vatRegistrationList: `/${rootPaths.listRoot}/vat-registration-list`,
  vatDeRegistrationList: `/${rootPaths.listRoot}/vat-de-registration-list`,
  vatRefundClaimsList: `/${rootPaths.listRoot}/vat-refund-claims-list`,

  // Notifications
  Notifications: `/${rootPaths.notificationsRoot}/notifications`,

  logout: `/${rootPaths.authRoot}/dashboard/logout`,
};

export default paths;
