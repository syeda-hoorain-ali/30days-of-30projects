"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const NumberGame = () => {

  const [input, setInput] = useState<string>('');
  const [number, setNumber] = useState<number>(1);
  const [attemps, setAttemps] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);



  const handleStart = (): void => {
    const number = Math.ceil(Math.random() * 100);
    setNumber(number);
    setInput('');
    setIsPlaying(true);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (Number(input) < 0) {
      setMessage("Please enter a positive number."); return;
    }

    const diffrence = Math.abs(number - Number(input));
    setAttemps(attemps + 1)

    if (diffrence === 0) {
      setMessage(`Congratultion! You guessed the number in ${attemps + 1} attemps`);
      setIsPlaying(false);
      return;
    }

    if (diffrence < 5) {
      setMessage("Just a little bit more!"); return;
    }

    if (diffrence < 10) {
      setMessage("Very close! You're almost there!"); return;
    }

    if (diffrence < 20) {
      setMessage("You're quite close! Keep trying!"); return;
    }

    if (diffrence < 50) {
      setMessage("You're getting warmer! Keep guessing!"); return;
    }

    if (diffrence > 51) {
      setMessage("That's too far! Try a closer number."); return;
    }
  }


  return (
    <div className="w-screen h-screen bg-gradient flex items-center justify-center">

      <div className="w-[90%] max-w-md mx-3 bg-[#f0f8ff] rounded-2xl py-8 px-4 sm:px-8">
        <h1 className="text-center text-2xl mb-2 text-[#f019ec] font-bold">Number Gussing Game</h1>

        <div className="flex flex-col items-center text-center gap-5">
          <p className="text-base text-purple-800">Guess a number between 1 and 100:</p>

          {isPlaying &&
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="number"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="py-2 px-3 rounded-lg border-2 border-purple-800 shadow outline-none"
              />
              <Button type="submit" variant="game">Guess</Button>
            </form>
          }

          {!isPlaying && <Button onClick={handleStart} variant="game">Start Game</Button>}

          <p className="text-xl">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default NumberGame
