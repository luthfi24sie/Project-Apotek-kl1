import React, { useEffect, useState } from "react";
import { Search, ChevronDown, Sun } from "lucide-react"; 

/**
 * Header Component - Apotek Sehat Design System
 * TopBar height: 60px
 * Background: #FFFFFF, border-bottom: 1px solid #E2E8F0
 */
export default function Header({ 
    userName = "Subash",
    darkMode = false
}) { 
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return ( 
        <header 
            id="header-container" 
            className={`h-[60px] sticky top-0 z-30 px-6 flex items-center justify-between font-inter border-b ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-border-default"}`}
        > 
            {/* Search Bar (280px according to Figma) */} 
            <div id="search-bar" className="relative w-[280px]"> 
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search for anything here..." 
                    className={`w-full border rounded-[6px] py-2 pl-10 pr-4 text-[13px] outline-none focus:border-primary transition-all placeholder:text-text-muted ${darkMode ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400" : "bg-white border-border-default"}`}
                /> 
                <Search 
                    size={14} 
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-text-muted"}`}
                /> 
            </div> 

            <div id="right-section" className="flex items-center gap-6"> 
                {/* Language Selector */}
                <button className={`flex items-center gap-2 text-[13px] font-medium hover:text-primary transition-colors ${darkMode ? "text-white" : "text-text-primary"}`}>
                    <img src="https://flagcdn.com/us.svg" className="size-4 rounded-sm object-cover" alt="US" />
                    <span>English (US)</span>
                    <ChevronDown size={14} className={darkMode ? "text-slate-400" : "text-text-muted"} />
                </button>

                {/* Greeting & Time */}
                <div className={`flex items-center gap-3 border-l pl-6 ${darkMode ? "border-slate-700" : "border-border-default"}`}>
                    <div className={`p-1.5 rounded-full ${darkMode ? "bg-slate-700 text-yellow-400" : "bg-amber-100 text-amber-500"}`}>
                        <Sun size={14} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[13px] font-medium leading-none mb-1">
                            <span className="text-amber-500 font-bold">{getGreeting()}</span>
                            <span className={`ml-1 ${darkMode ? "text-white" : "text-text-primary"}`}>{userName}</span>
                        </p>
                        <p className={`text-[11px] font-medium leading-none ${darkMode ? "text-slate-400" : "text-text-secondary"}`}>
                            {formatDate(currentTime)} - {formatTime(currentTime)}
                        </p>
                    </div>
                </div>
            </div> 
        </header> 
    ); 
}
