import { Sparkle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-r from-blue-700/60 to-purple-600/60 dark:from-blue-900/30 dark:to-purple-900/30 border-t border-blue-300 dark:border-purple-800 text-white text-sm tracking-wide text-center py-3 px-4 shadow-inner flex items-center justify-center gap-2">
      <Sparkle className="w-5 h-5 text-yellow-300 animate-flicker" />
      <span className="font-medium">
        &copy; 2025 Crafted with Care · Internal Tools
      </span>
    </footer>
  );
};

export default Footer;
