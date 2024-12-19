import { Card } from "../ui/card";

function TransactionsHistory() {
  return (
    <Card className="h-1/2 bg-[#2B2B2B] rounded-md flex flex-col gap-3 py-7 px-6 overflow-y-auto scrollbar-hide">
      <h1 className="text-base font-semibold text-white text-center">
        Action Tab
      </h1>
      <ul className="list-disc marker:text-white grid gap-y-2">
        <li className="text-sm font-semibold text-[#51586D]">
          Swap tokens - 30 USDT to 56 STRK
        </li>
        <li className="text-sm font-semibold text-[#51586D]">
          Swap tokens - 30 USDT to 56 STRK
        </li>
        <li className="text-sm font-semibold text-[#51586D]">
          Swap tokens - 30 USDT to 56 STRK
        </li>
        <li className="text-sm font-semibold text-[#51586D]">
          Swap tokens - 30 USDT to 56 STRK
        </li>
      </ul>
    </Card>
  );
}
export default TransactionsHistory;
