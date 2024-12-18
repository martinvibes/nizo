import { Button } from "../ui/button";
import { Card } from "../ui/card";

function AvailabeFeatures() {
  return (
    <Card className="h-1/2 bg-[#2B2B2B] rounded-md flex flex-col gap-3 pt-7 px-6 overflow-y-auto">
      <h1 className="text-base font-semibold text-white text-center">
        Action Tab
      </h1>
      <div className="grid gap-2">
        <Button className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold">
          Swap tokens
        </Button>
        <Button className="bg-[#13151D] border-[#3D435C] text-[#51586D] text-base font-semibold border">
          Check balance
        </Button>
        <Button className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold">
          View transactions
        </Button>
      </div>
    </Card>
  );
}
export default AvailabeFeatures;
