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
import Web3 from 'web3';
import { useEffect, useState } from "react";

type List = {
  id: number,
  name: string,
  description: string,
  ratings: number[],
  price: string,
  owner: string
}

export default function List() {
  const [listings, setListings] = useState<List[]>([]);
  var length:BigInt = 0n;

  const getLength = async () => {
    try {
      const result = await contract.methods.getListingsCount().call();
      length = result; // Store length as a number for easier comparison
      console.log("Number of listings:", result);
    } catch (error) {
      console.log("Error fetching length:", error);
    }
  }

  const appendModels = async () => {
    await getLength(); // Ensure getLength is complete before proceeding
    console.log("Total listings:", length);

    const models: List[] = []; // Temporary array to hold the models

    for (let i = 0; i < Number(length); i++) {
      try {
        const tx: any = await contract.methods.AIListings(i).call();
        console.log("Model data:", tx); // Log each model's data
        const model: List = {
          id: Number(tx['modelId']),
          name: tx['name'],
          description: tx['description'],
          price: Web3.utils.fromWei(tx['price'], 'ether'),
          owner: tx['owner'],
          ratings: []
        };
        models.push(model);
      } catch (error) {
        console.log("Error fetching model:", error);
      }
    }

    setListings(models); // Update state with the fetched models
    console.log("Fetched models:", models); // Log the fetched models
  }

  useEffect(() => {
    const fetchModels = async () => {
      await appendModels();
    };
    fetchModels();
  }, []); // Empty dependency array ensures this runs once

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
                  {item.name}
                  <CardDescription>
                    <div className="flex">
                      <Star className="mr-1" />
                      4.8
                    </div>
                  </CardDescription>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription><p className="text-center">{item.description}</p></CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300">
                  Buy now
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))
      )}
    </>
  );
}
