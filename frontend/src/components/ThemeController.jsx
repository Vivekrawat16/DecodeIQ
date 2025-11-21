import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeController() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm transition-transform hover:scale-110"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="size-5 text-yellow-400 fill-yellow-400/20" />
            ) : (
                <Moon className="size-5 text-slate-600 fill-slate-600/20" />
            )}
        </button>
    );
}

export default ThemeController;
