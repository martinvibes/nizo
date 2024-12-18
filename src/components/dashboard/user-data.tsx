import { AvatarDemo } from "../ui/avatar";
import { Button } from "../ui/button";

function UserData() {
  return (
    <div className="bg-[#2B2B2B] rounded-md flex flex-col gap-8 pt-10 px-6">
      <AvatarDemo />
      <div className="grid gap-2">
        <Button className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold">
          Lorem
        </Button>
        <Button className="bg-[#13151D] border-[#3D435C] text-[#51586D] text-base font-semibold border">
          Lorem
        </Button>
      </div>
    </div>
  );
}
export default UserData;