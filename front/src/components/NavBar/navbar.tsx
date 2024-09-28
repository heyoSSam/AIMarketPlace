import { useState, useEffect } from 'react';
import { User, LogIn, LogOut, ShoppingCart, Wallet, Coins } from 'lucide-react';
import { ethers } from 'ethers';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar(){
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async () => {
        if((window as any).ethereum){
            try{
                const accounts = await (window as any).ethereum.request({
                    method:"eth_requestAccounts",
                });
                setAccount(accounts[0]);
            } catch(error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("Please install MetaMask");
        }
    };

    const checkWalletConnection = async () => {
        if((window as any).ethereum){
            const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              setAccount(accounts[0]);
            }
        }
    };

    const logoutWallet = () => {
        setAccount(null);
    }

    useEffect(() => {
        checkWalletConnection();
    }, []);

    return (
        <div className="flex justify-between">
            <div>
                <h1 className="text-4xl"><span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    AI
                    </span>
                MarketPlace</h1>
            </div>
            <div>
                {account ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger><User/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>{account}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                              <Wallet className="mr-2 h-4 w-4" />
                              <span>Balance: 1 ETH </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              <span>Create Listing</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                              <Coins className="mr-2 h-4 w-4" />
                              <span>Withdraw</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={logoutWallet}>
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div>
                        <button onClick={connectWallet}><LogIn /></button>
                    </div>
                )} 
            </div>
        </div>
    );
}