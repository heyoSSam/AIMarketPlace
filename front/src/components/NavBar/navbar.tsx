import { User } from 'lucide-react';
import { ethers } from 'ethers';

export default function NavBar(){
    return (
        <div className="flex justify-between">
            <div>
                <h1 className="text-4xl"><span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    AI
                    </span>
                MarketPlace</h1>
            </div>
            <div>
                <button><User/></button>
            </div>
        </div>
    );
}