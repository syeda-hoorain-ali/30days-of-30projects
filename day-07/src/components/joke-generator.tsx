"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Response {
  id: number;
  punchline: string;
  setup: string;
  type: string;
}

const JokeGenerator = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [joke, setJoke] = useState<string>('');

  const getJoke = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!response.ok) {
        setJoke("Fail to fetch joke. Please try again");
        return;
      }

      const data: Response = await response.json();

      setJoke(`${data.setup} ${data.punchline}`);

    } catch (error) {
      console.log(error);
      setJoke("Fail to fetch joke. Please try again");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { getJoke() }, []);



  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-br from-pink-500 to-blue-700'>

      <Card className='max-w-md mx-auto shadow-lg border-2 border-black '>
        <CardHeader>
          <h1 className='text-3xl font-bold'>Random Joke Generator&#128517;</h1>
        </CardHeader>

        <CardContent>

          {isLoading ?
            <p className='flex text-lg gap-2 items-center'>
              <Loader2 className='animate-spin' /> Loading...
            </p> :
            <p>{joke}</p>
          }

          <Button className='mt-4 shadow-md ' onClick={getJoke}>New Joke</Button>
        </CardContent>
      </Card>

    </div>
  )
}

export default JokeGenerator
