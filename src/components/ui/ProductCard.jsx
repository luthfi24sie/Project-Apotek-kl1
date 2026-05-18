import React from 'react';
import Card from "./Card";
import Button from "./Button";

export default function ProductCard({ 
  image, 
  title, 
  category, 
  price, 
  description 
}) { 
  return ( 
    <Card className="overflow-hidden !p-0 group"> 
        <div className="relative overflow-hidden">
            <img 
                src={image} 
                alt={title} 
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
            /> 
            <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm border border-primary/10"> 
                    {category} 
                </span> 
            </div>
        </div>
 
        <div className="p-6"> 
            <h2 className="text-xl font-black text-text-primary mb-2 tracking-tight group-hover:text-primary transition-colors"> 
                {title} 
            </h2> 
 
            <p className="text-text-secondary text-sm mb-6 line-clamp-2 font-medium"> 
                {description} 
            </p> 
 
            <div className="flex items-center justify-between pt-4 border-t border-border"> 
                <h3 className="text-xl font-black text-primary tracking-tight"> 
                    {price} 
                </h3> 
                <Button size="sm">Detail</Button>
            </div> 
        </div> 
    </Card> 
  ); 
}
