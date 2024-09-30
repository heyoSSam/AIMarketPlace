import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from '@/components/ui/button'
import { Star } from 'lucide-react';

export default function List() {
    return (
        <div>
            <Card>
              <CardHeader>
                <img className="rounded" src="https://play-lh.googleusercontent.com/8XCwpfWc9YkehwhrhoID6PGhs5SaSJoocS0oTBA8EsGFGLrj32oIYu5UKsIO7wdU1PQZ"></img>
                <CardTitle className="my-4">
                    AI
                    <CardDescription>
                        <div className="flex">
                            <Star className="mr-1"></Star>
                            4.8
                        </div>
                    </CardDescription>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription><p className="text-center">bla bla bla</p></CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-purple-400 via-pink-500 
                                   to-red-500 text-white font-bold py-2 px-4 
                                   rounded shadow-lg hover:shadow-xl transition duration-300">
                Buy now</Button>
              </CardFooter>
            </Card>
            
        </div>
    )
}