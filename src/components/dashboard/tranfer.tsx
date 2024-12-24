import { useState } from "react";
import SendTransferForm from "./send-transfer-form";

interface SendTransactionFormProps {
  initialData: {
    amount: number;
    address: string;
    currency: string;
  };
  onSuccess: () => void;
}

const SendTransactionForm = ({ initialData, onSuccess }: SendTransactionFormProps) => {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <SendTransferForm
      initialData={initialData}
      onSuccess={onSuccess}
      onClose={() => setShowModal(false)}
    />
  );
};

export default SendTransactionForm;