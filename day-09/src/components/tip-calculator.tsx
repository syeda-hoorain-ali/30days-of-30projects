"use client";

import { FormEvent, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const TipCalculator = () => {

  const [bill, setBill] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const tip = Number(percentage) * (+bill / 100)
    setTipAmount(tip);
    setTotalAmount(+bill + tip);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100  to-blue-500">

      <Card className="w-96 shadow-lg">
        <CardHeader>
          <h1 className="text-3xl font-bold">Tip Calculator</h1>
          <p className="text-gray-500 text-sm px-1">
            Enter the bill amount and tip percentage to calculate the tip and total.
          </p>
        </CardHeader>

        <CardContent className="w-96 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="amount">Bill amount</Label>
              <Input type="number" id="amount" value={bill} onChange={e => setBill(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="percentage">Tip percentage</Label>
              <Input type="number" id="percentage" value={percentage} onChange={e => setPercentage(e.target.value)} />
            </div>

            <Button type="submit">Calculate</Button>
          </form>

          <hr />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-semibold">Tip Amount:</span>
              <span>${tipAmount}</span>
            </div>


            <div className="flex justify-between">
              <span className="font-semibold">Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}

export default TipCalculator
