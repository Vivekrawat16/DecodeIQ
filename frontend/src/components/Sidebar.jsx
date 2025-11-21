import { Link, useLocation } from "react-router";
import {
    LayoutDashboard,
    BookOpen,
    Terminal,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    GripVertical
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import ThemeController from "./ThemeController";
import { useState, useEffect, useRef } from "react";

function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [width, setWidth] = useState(256); // Default 64 * 4 = 256px
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/problems", icon: BookOpen, label: "Problems" },
        { path: "/mock-oa", icon: Terminal, label: "Mock OA" },
    ];

    const startResizing = (e) => {
        setIsResizing(true);
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e) => {
        if (isResizing) {
            let newWidth = e.clientX;
            if (newWidth < 64) newWidth = 64; // Minimum width (collapsed-ish)
            if (newWidth > 480) newWidth = 480; // Maximum width
            setWidth(newWidth);

            // Auto collapse/expand based on width
            if (newWidth < 150 && !isCollapsed) setIsCollapsed(true);
            if (newWidth >= 150 && isCollapsed) setIsCollapsed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, isCollapsed]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        setWidth(isCollapsed ? 256 : 80); // Reset to default or shrink
    };

    return (
        <aside
            ref={sidebarRef}
            className={`h-screen sticky top-0 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col flex-shrink-0 z-50 relative group/sidebar ${isResizing ? '' : 'transition-all duration-300 ease-in-out'}`}
            style={{ width: `${width}px` }}
        >
            {/* Header */}
            <div className={`p-6 border-b border-[var(--border-color)] flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-between'}`}>
                <Link to="/" className="flex items-center gap-3 group overflow-hidden">
                    <img src="/logo.png" alt="DecodeIQ" className="size-8 min-w-8 rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform" />
                    {!isCollapsed && (
                        <div className="flex flex-col whitespace-nowrap">
                            <span className="font-bold text-lg tracking-tight">DecodeIQ</span>
                            <span className="text-[10px] font-mono text-base-content/50 uppercase tracking-wider">Pro</span>
                        </div>
                    )}
                </Link>

                {!isCollapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="p-1.5 rounded-md hover:bg-base-200 text-base-content/50 hover:text-base-content transition-colors"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
                {!isCollapsed && (
                    <div className="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-4 px-2 whitespace-nowrap">
                        Platform
                    </div>
                )}

                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-link ${isActive(item.path) ? "active" : ""} ${isCollapsed ? 'justify-center px-2' : ''}`}
                        title={isCollapsed ? item.label : ""}
                    >
                        <item.icon className="size-4 min-w-4" />
                        {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border-color)] space-y-4">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
                    {!isCollapsed && <span className="text-xs font-medium text-base-content/50 whitespace-nowrap">Theme</span>}
                    <ThemeController />
                </div>

                <div className={`flex items-center gap-3 p-2 rounded-lg bg-base-200/50 border border-[var(--border-color)] ${isCollapsed ? 'justify-center' : ''}`}>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "size-9 border border-base-content/20 hover:border-primary/50 transition-colors",
                                userButtonPopoverCard: "shadow-xl border border-base-content/10 bg-[#09090b]",
                                userButtonPopoverActionButton: "hover:bg-base-content/5 text-base-content/80",
                                userButtonPopoverActionButtonText: "text-sm font-medium",
                                userButtonPopoverFooter: "hidden"
                            }
                        }}
                    />
                    {!isCollapsed && (
                        <div className="flex flex-col whitespace-nowrap overflow-hidden">
                            <span className="text-xs font-medium text-base-content truncate">My Account</span>
                            <span className="text-[10px] text-base-content/50 truncate">Manage Profile</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Resize Handle */}
            <div
                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors z-50 opacity-0 group-hover/sidebar:opacity-100"
                onMouseDown={startResizing}
            />

            {/* Collapsed Expand Button (Floating) */}
            {isCollapsed && (
                <button
                    onClick={toggleCollapse}
                    className="absolute -right-3 top-8 bg-base-100 border border-base-content/20 rounded-full p-1 shadow-md hover:bg-base-200 z-50"
                >
                    <ChevronRight className="size-3" />
                </button>
            )}
        </aside>
    );
}

export default Sidebar;
