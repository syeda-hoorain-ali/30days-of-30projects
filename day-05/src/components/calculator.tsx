"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Calculator = () => {

  const [equation, setEquation] = useState<string>('');

  const handleEvaluate = () => {
    try {
      const result = eval(equation); 
      setEquation(String(result));
    } catch (error) {
      setEquation('Error'); 
    }
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-800'>
      <div className="calculator relative grid max-w-[400px] bg-gray-800 py-10 px-7 rounded-md">

          <Input
            readOnly
            value={equation}
            placeholder='0'
            className='relative col-span-4 h-24 w-full border-none outline-none bg-[#a7af7c] mb-2.5 rounded shadow text-right p-2.5 text-3xl placeholder:text-gray-700'
          />


          <Button variant="cal" size="cal" onClick={() => setEquation('')}
            className='col-span-2 w-40 from-red to-red before:from-red-600 before:to-gray-100 before:border-gray-50'>
            <i className='relative text-xl'>C</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '/')}>
            <i className='relative text-xl'>/</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '*')}>
            <i className='relative text-xl'>*</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '7')}>
            <i className='relative text-xl'>7</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '8')}>
            <i className='relative text-xl'>8</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '9')}>
            <i className='relative text-xl'>9</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '-')}>
            <i className='relative text-xl'>-</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '4')}>
            <i className='relative text-xl'>4</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '5')}>
            <i className='relative text-xl'>5</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '6')}>
            <i className='relative text-xl'>6</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '+')} className='row-span-2 h-40'>
            <i className='relative text-xl'>+</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '1')}>
            <i className='relative text-xl'>1</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '2')}>
            <i className='relative text-xl'>2</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '3')}>
            <i className='relative text-xl'>3</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '0')}>
            <i className='relative text-xl'>0</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '00')}>
            <i className='relative text-xl'>00</i>
          </Button>
          <Button variant="cal" size="cal" onClick={() => setEquation(equation + '.')}>
            <i className='relative text-xl'>.</i>
          </Button>

          <Button
            variant="cal"
            size="cal"
            onClick={handleEvaluate}
            className='from-blue-400 to-blue-400 blue before:from-blue-300 before:to-gray-100 before:border-gray-50'>
            <i className='relative text-xl'>=</i>
          </Button>
        </div>
      </div>
  )
}

export default Calculator
