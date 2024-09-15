"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

const ColorPicker = () => {

  const [color, setColor] = useState<string>('#ff0000');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
  }

  const copyColor = (): void => {
    navigator.clipboard.writeText(color).then(() => alert("Color copied to clipboard~"))
  }

  function hexToRgb(hex: string): string {
    const cleanHex = hex.replace(/^#/, '');

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    return `(${r}, ${g}, ${b})`;
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-fuchsia-300">

      <Card className="shadow-lg bg-neutral-100">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">Color Picker</h1>
          <p className="text-gray-500">
            Select a color and copy the hex and RGB values
          </p>
        </CardHeader>

        <CardContent>
          <div className="w-full flex flex-col items-center gap-3">

            <div
              className="bg-[#f00] h-40 w-full rounded-xl border-2 border-black"
              style={{ backgroundColor: color }}
            ></div>

            <h2 className="text-2xl font-bold tracking-wide">{color}</h2>
            <p className="text-gray-500">RGB {hexToRgb(color)}</p>

            <Button onClick={copyColor} className="w-full">Copy color</Button>
            <Input
              type="color"
              value={color}
              onChange={handleChange}
              className="p-0 h-16 border-none rounded-md cursor-pointer"
            />

          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default ColorPicker
