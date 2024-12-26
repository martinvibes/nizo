import { useState } from "react";
import SendTransferForm from "./send-transfer-form";

interface SendTransactionFormProps {
  onSuccess: () => void;
}

const SendTransactionForm = ({ onSuccess }: SendTransactionFormProps) => {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <SendTransferForm
      onSuccess={onSuccess}
      onClose={() => setShowModal(false)}
    />
  );
};

export default SendTransactionForm;