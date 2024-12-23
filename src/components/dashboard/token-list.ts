interface Token {
    address: string;
    chainId: number;
    decimals: number;
    name: string;
    symbol: string;
    logoURI?: string;
}

class TokenList {
    private tokens: Token[] = [];

    async fetchTokens(): Promise<void> {
        try {
            const response = await fetch('https://quote-api.jup.ag/v6/tokens', {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Limit to 100 tokens
            this.tokens = data.slice(0, 100);
        } catch (error) {
            console.error('Error fetching tokens:', error);
            throw error;
        }
    }

    getAllTokens(): Token[] {
        return this.tokens;
    }

    findTokenBySymbol(symbol: string): Token | undefined {
        return this.tokens.find(token => 
            token.symbol.toLowerCase() === symbol.toLowerCase()
        );
    }

    findTokenByAddress(address: string): Token | undefined {
        return this.tokens.find(token => 
            token.address.toLowerCase() === address.toLowerCase()
        );
    }

    filterTokens(searchText: string): Token[] {
        const search = searchText.toLowerCase();
        return this.tokens.filter(token =>
            token.symbol.toLowerCase().includes(search) ||
            token.name.toLowerCase().includes(search)
        );
    }
}

export default TokenList;