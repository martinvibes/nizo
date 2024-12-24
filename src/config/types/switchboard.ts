// src/config/types/switchboard.ts

export interface SwitchboardFeed {
  name: string; // Display name of the feed
  symbol: string; // Trading symbol used for price fetching
  address: string; // Switchboard feed address
  decimals: number; // Number of decimal places for formatting
}
