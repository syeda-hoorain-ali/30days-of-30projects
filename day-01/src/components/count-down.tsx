"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Countdown = () => {

  const [input, setInput] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const style = {
    offset: 565 - (565 * (duration - timeLeft)) / duration,
    rotate: `rotateZ(${(duration - timeLeft) * (360 / duration)}deg)`
  }

  const handleStart = () => {
    setIsActive(true);
    setIsPause(false);
    setTimeLeft(timeLeft - 1);
  }

  const handlePause = () => {
    setIsActive(false);
    setIsPause(true);
    if (interval.current) {
      clearInterval(interval.current)
    }
  }

  const handleReset = () => {
    setIsActive(false);
    setIsPause(true);
    setTimeLeft(duration)
    if (interval.current) {
      clearInterval(interval.current)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDuration(Number(input));
    setTimeLeft(Number(input));
    setIsActive(true);
    setIsPause(false);
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds - hours * 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    return time;
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      if (isActive && !isPause) {
        if (timeLeft <= 1) {
          setTimeLeft(0)
          return
        }
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)

    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [duration, timeLeft])


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-7 flex-col items-center">

        <form className="flex gap-7" onSubmit={handleSubmit}>
          <Input type="number" placeholder="Enter seconds" className="text-white" value={input} onChange={e => setInput(e.target.value)} />
          <Button type="submit">Set</Button>
        </form>

        <div className="circle relative w-[12rem] h-[12rem] flex items-center justify-center">
          <div className="dots absolute h-full w-full rounded-full flex justify-center items-start z-50" style={{ transform: style.rotate }} ></div>

          <svg className="relative h-[12rem] w-[12rem] rotate-[270deg]">
            <circle
              cx="90" cy="90" r="90"
              className="w-full h-full fill-transparent stroke-[8] translate-x-[5px] translate-y-[5px] transition-all stroke-black"
              strokeLinecap="round">
            </circle>
            <circle
              cx="90" cy="90" r="90"
              className="w-full h-full fill-transparent stroke-[8] translate-x-[5px] translate-y-[5px] transition-all stroke-purple-700"
              strokeDasharray={565}
              strokeDashoffset={style.offset}>
            </circle>
          </svg>

          <div className="days absolute top-20 left-14 text-white text-xl">{formatTime(timeLeft)}</div>
        </div>

        <div className="flex gap-5">
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>

      </div>
    </div>
  )

}

export default Countdown