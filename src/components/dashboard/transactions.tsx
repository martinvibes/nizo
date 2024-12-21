import AvailableFeatures from "./available-transaction";
import TransactionsHistory from "./transaction-history";

interface transactionHistory {
  transactions:string[]
}

const Transactions = (props:transactionHistory) => {

  return (
    <section className="hidden sm:flex justify-between flex-col gap-4 ">
      <AvailableFeatures />
      <TransactionsHistory transactions={props.transactions} />
    </section>
  );
}
export default Transactions;
