export interface ProfitDistributionType {
  profit: number;
  expenses: number;
  assets: number;
}

export interface StatsType {
  outstandingInvoices: number;
  averageCollectionPeriod: string;
  grossProfitMargin: number;
  inventoryTurnover: string;
  onlinePayments: number;
}

export interface FinancialsType {
  revenue: number;
  expenses: number;
  stockValue: number;
  profitDistribution: ProfitDistributionType;
}

export interface ChangeType {
  outstandingInvoices: number;
  averageCollectionPeriod: number;
  grossProfitMargin: number;
  inventoryTurnover: number;
  onlinePayments: number;
  revenue: number;
  expenses: number;
  stockValue: number;
}

export interface PeriodType {
  start: string;
  end: string;
}

export interface DashboardAccountantType {
  stats: StatsType;
  financials: FinancialsType;
  change: ChangeType;
  period: PeriodType;
}
