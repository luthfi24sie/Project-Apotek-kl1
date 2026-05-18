import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Sun } from "lucide-react"; 

/**
 * Header Component - Apotek Sehat Design System
 * TopBar height: 60px
 * Background: #FFFFFF, border-bottom: 1px solid #E2E8F0
 */
export default function Header({ userName = "Subash" }) { 
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return ( 
        <header id="header-container" className="h-[60px] bg-white border-b border-border-default sticky top-0 z-30 px-6 flex items-center justify-between font-inter"> 
            {/* Search Bar (280px according to Figma) */} 
            <div id="search-bar" className="relative w-[280px]"> 
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search for anything here..." 
                    className="w-full bg-white border border-border-default rounded-[6px] py-2 pl-10 pr-4 text-[13px] outline-none focus:border-primary transition-all placeholder:text-text-muted"
                /> 
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" /> 
            </div> 

            <div id="right-section" className="flex items-center gap-6"> 
                {/* Language Selector */}
                <button className="flex items-center gap-2 text-[13px] text-text-primary font-medium hover:text-primary transition-colors">
                    <img src="https://flagcdn.com/us.svg" className="size-4 rounded-sm object-cover" alt="US" />
                    <span>English (US)</span>
                    <ChevronDown size={14} className="text-text-muted" />
                </button>

                {/* Greeting & Time */}
                <div className="flex items-center gap-3 border-l border-border-default pl-6">
                    <div className="bg-amber-100 p-1.5 rounded-full">
                        <Sun size={14} className="text-amber-500" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[13px] font-medium leading-none mb-1">
                            <span className="text-amber-500 font-bold">{getGreeting()}</span>
                            <span className="text-text-primary ml-1">{userName}</span>
                        </p>
                        <p className="text-[11px] text-text-secondary font-medium leading-none">
                            {formatDate(currentTime)} - {formatTime(currentTime)}
                        </p>
                    </div>
                </div>
            </div> 
        </header> 
    ); 
}
