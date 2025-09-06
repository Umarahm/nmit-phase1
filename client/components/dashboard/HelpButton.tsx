import React from 'react';
import { HelpCircle } from 'lucide-react';

export function HelpButton() {
  return (
    <button className="
      fixed bottom-8 left-8 
      w-12 h-12 
      bg-orange-primary 
      rounded-full 
      shadow-lg hover:shadow-xl 
      transition-shadow 
      flex items-center justify-center
      group
    ">
      <HelpCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
    </button>
  );
}
