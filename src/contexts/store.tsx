'use client';

import React, { createContext, useContext, useState } from 'react';

type balance = {
  sol: number;
  usd: number;
};

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'agent' | 'chart';
    balance:balance
}

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transactionType: string;
  setTransactionType:React.Dispatch<React.SetStateAction<string>>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading,setIsLoading] = useState(false)
    const [transactionType, setTransactionType] = useState("");
    return (
        <MessageContext.Provider value={{ messages, setMessages,isLoading,setIsLoading,transactionType,setTransactionType }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
}