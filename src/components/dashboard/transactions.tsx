import AvailableFeatures from "./available-transaction";
import TransactionsHistory from "./transaction-history";


function Transactions() {
  return (
    <section className="border flex justify-between flex-col p-2 gap-4">
      <AvailableFeatures />
      <TransactionsHistory/>
    </section>
  );
}
export default Transactions;
