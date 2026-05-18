import React from 'react';

export default function Table({ headers, children }) { 
  return ( 
    <div className="overflow-x-auto card !p-0"> 
      <table className="w-full border-collapse"> 
        <thead> 
          <tr className="bg-bg-page/50 border-b border-border"> 
            {headers.map((header, index) => ( 
              <th 
                key={index} 
                className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] text-left" 
              > 
                {header} 
              </th> 
            ))} 
          </tr> 
        </thead> 
 
        <tbody className="divide-y divide-border"> 
          {children} 
        </tbody> 
      </table> 
    </div> 
  ); 
}
