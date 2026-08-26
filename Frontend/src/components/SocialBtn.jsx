import { Twitter, Instagram, Linkedin, Circle } from "lucide-react";

// Fallback in case of icon naming differences in lucide-react
const TwitterIcon = Twitter || Circle;
const InstagramIcon = Instagram || Circle;
const LinkedinIcon = Linkedin || Circle;
const CircleIcon = Circle;

const iconData = [
  {
    name: "Twitter",
    component: TwitterIcon,
    bg: "bg-white text-gray-800 border border-gray-200",
  },
  {
    name: "Dribbble",
    component: CircleIcon,
    bg: "bg-pink-100/80 text-pink-600 border border-pink-200/50",
  },
  {
    name: "Instagram",
    component: InstagramIcon,
    bg: "bg-orange-100/80 text-orange-600 border border-orange-200/50",
  },
  {
    name: "Linkedin",
    component: LinkedinIcon,
    bg: "bg-blue-100/80 text-blue-600 border border-blue-200/50",
  },
];

export default function SocialBtn() {
  return (
    <div className="flex items-center gap-2">
      {iconData.map((icon) => {
        const Icon = icon.component;
        return (
          <button
            key={icon.name}
            type="button"
            className={`${icon.bg} w-8 h-8 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm`}
            aria-label={icon.name}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
