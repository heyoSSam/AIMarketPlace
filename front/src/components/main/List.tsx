import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react';
import { contract } from '@/constants/contract';
import { state } from '@/constants/constants';
import Web3 from 'web3';
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type List = {
  id: number,
  name: string,
  description: string,
  ratings: number,
  price: string,
  owner: string
}

interface FormData {
  rating: number
}

export default function List() {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
  });
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (id:number, e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tx = await contract.methods
          .rateModel(id, formData.rating)
          .send({ from: state.account });
      console.log('Transaction successful:', tx);
    } catch (error) {
        console.error('Transaction error:', error);
    }
  };

  const [listings, setListings] = useState<List[]>([]);
  var length:BigInt = 0n;

  const buy = async (id:number, model:List) => {
    try{
      const tx = await contract.methods.purchaseModel(id).send({from: state.account, value: Web3.utils.toWei(model.price, 'ether')});
    } catch(error){
      console.log(error);
    }
  }
  const getLength = async () => {
    try {
      const result = await contract.methods.getListingsCount().call();
      length = result;
    } catch (error) {
      console.log("Error fetching length:", error);
    }
  }

  const appendModels = async () => {
    await getLength(); 

    const models: List[] = [];

    for (let i = 0; i < Number(length); i++) {
      try {
        const tx: any = await contract.methods.AIListings(i).call();
        console.log(tx)
        const model: List = {
          id: Number(tx['modelId']),
          name: tx['name'],
          description: tx['description'],
          price: Web3.utils.fromWei(tx['price'], 'ether'),
          owner: tx['owner'],
          ratings: Number(tx['ratings']),
        };
        models.push(model);
      } catch (error) {
        console.log("Error fetching model:", error);
      }
    }

    setListings(models);
  }

  useEffect(() => {
    const fetchModels = async () => {
      await appendModels();
    };
    fetchModels();
  }, []); // Empty dependency array ensures this runs once
  console.log(listings)
  return (
    <>
      {listings.length === 0 ? (
        <p>No models found.</p>
      ) : (
        listings.map((item, index) => (
          <div key={index}>
            <Card>
              <CardHeader>
                <img className="rounded" src="https://play-lh.googleusercontent.com/8XCwpfWc9YkehwhrhoID6PGhs5SaSJoocS0oTBA8EsGFGLrj32oIYu5UKsIO7wdU1PQZ" alt="AI Model" />
                <CardTitle className="my-4">
                  {state.account.toLowerCase() == item.owner.toLowerCase() ? `✔️ ${item.name}` : item.name}
                  <CardDescription>
                    <div className="flex">
                      <Star className="mr-1" />
                      {item.ratings}
                    </div>
                  </CardDescription>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription><p className="text-center">{item.description}</p></CardDescription>
              </CardContent>
              <CardContent>
                <CardDescription><p className="text-center">{item.price} ETH </p></CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col gap-3">
                  {state.account.toLowerCase() == item.owner.toLowerCase() ? (
                  <Button 
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg"
                    disabled
                  >
                      Unavailable
                  </Button>) : (
                  <Button 
                    className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300"
                    onClick={() => buy(index, item)}>
                    Buy now
                  </Button>)}
                  <Dialog>
                    <DialogTrigger className="bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300">Rate</DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Rate model</DialogTitle>
                        <DialogDescription>
                          Give rating to your model here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Rating
                          </Label>
                          <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="text-black mt-1 block w-full p-2 border border-gray-300 rounded"
                            step="1" 
                            min="0"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={(e) => handleSubmit(index, e)}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      )}
    </>
  );
}
