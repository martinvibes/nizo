import AvailableFeatures from "./available-transaction";
import TransactionsHistory from "./transaction-history";


function Transactions() {
  return (
    <section className="flex justify-between flex-col gap-4">
      <AvailableFeatures />
      <TransactionsHistory/>
    </section>
  );
}
export default Transactions;
