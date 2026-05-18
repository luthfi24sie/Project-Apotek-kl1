import React from 'react';

export default function Card({ children, className = "" }) { 
	return ( 
		<div className={`bg-white border border-border rounded-xl shadow-sm p-6 ${className}`}> 
		      {children} 
		</div> 
   ); 
 }
