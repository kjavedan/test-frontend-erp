import { StatsType } from "@/types/dashboard";

import StatMetric from "../element/StatMetric";

export default function Stats(props: StatsType) {
  return (
    <div>
      <div className="flex w-full flex-col gap-10 md:flex-row md:items-center">
        <StatMetric
          label="Outstanding Invoices"
          value={props.outstandingInvoices}
        />
        <StatMetric
          label="Average Collection Period"
          value={props.averageCollectionPeriod}
        />
        <StatMetric
          label="Gross Profit Margin"
          value={props.grossProfitMargin}
        />
        <StatMetric
          label="Inventory Turnover"
          value={props.inventoryTurnover}
        />
        <StatMetric label="Online Payments" value={props.onlinePayments} />
      </div>
    </div>
  );
}
