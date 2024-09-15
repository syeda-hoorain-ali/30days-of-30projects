"use client";


import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const PasswordGenerator = () => {

  const [length, setLength] = useState<number>(16);
  const [password, setPassword] = useState<string>('');
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includenumber, setIncludeNumber] = useState<boolean>(true);
  const [includeSymbol, setIncludeSymbol] = useState<boolean>(true);

  const handleCheckboxChange = (setter: (value: boolean) => void) => {
    return (checked: boolean): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "~!@#$%^&*(){}[]<>:;/?-_+=";

    let allChars = '';

    if (includeUppercase) allChars += uppercaseLetters;
    if (includeLowercase) allChars += lowercaseLetters;
    if (includenumber) allChars += numbers;
    if (includeSymbol) allChars += symbols;

    if (allChars === '') {
      alert("Please select at least one character type.");
      return
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * allChars.length)
      generatedPassword += allChars[index];
    }

    setPassword(generatedPassword)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
      .then(() => alert("Password copied to clipboard"));

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-400">
      <Card>
        <CardHeader>
          <h1 className="text-3xl text-center font-bold">Password Generator</h1>
          <p className="text-gray-400">Create a secure password with just a few clicks.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label className="font-medium" htmlFor="length">Password Length</Label>
            <Input
              className="shadow"
              type="number"
              id="length"
              value={length}
              onChange={e => setLength(+e.target.value)}
            />

            <div className="my-4 flex flex-col gap-1">
              <span className="font-semibold">Include:</span>

              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-4 h-4 rounded-full accent-slate-900"
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={() => handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-4 h-4 rounded-full accent-slate-900"
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={() => handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-4 h-4 rounded-full accent-slate-900"
                  id="number"
                  checked={includenumber}
                  onCheckedChange={() => handleCheckboxChange(setIncludeNumber)}
                />
                <Label htmlFor="number">Number</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-4 h-4 rounded-full accent-slate-900"
                  id="symbols"
                  checked={includeSymbol}
                  onCheckedChange={() => handleCheckboxChange(setIncludeSymbol)}
                />
                <Label htmlFor="symbols">Symbols Letters</Label>
              </div>

            </div>

            <Button className="w-full">Generate Password</Button>
          </form>

          <hr className="my-4" />

          <div>
            <Label className="font-medium" htmlFor="password">Generated Password</Label>

            <div className="flex gap-2">
              <Input className="shadow" id="password" readOnly value={password} />
              <Button onClick={copyPassword}>Copy to Cilpboard</Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordGenerator
