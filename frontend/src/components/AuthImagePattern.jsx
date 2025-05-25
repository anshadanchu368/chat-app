"use client"

import { MessageCircle, Users, User, UserCheck, PartyPopper, Heart, Star, Smile, Coffee } from "lucide-react"

const AuthImagePattern = ({ title, subtitle }) => {
  const icons = [
    { Icon: MessageCircle, delay: "0s", size: "w-8 h-8" },
    { Icon: Users, delay: "0.5s", size: "w-10 h-10" },
    { Icon: User, delay: "1s", size: "w-6 h-6" },
    { Icon: UserCheck, delay: "1.5s", size: "w-9 h-9" },
    { Icon: PartyPopper, delay: "2s", size: "w-7 h-7" },
    { Icon: Heart, delay: "2.5s", size: "w-8 h-8" },
    { Icon: Star, delay: "3s", size: "w-6 h-6" },
    { Icon: Smile, delay: "3.5s", size: "w-9 h-9" },
    { Icon: Coffee, delay: "4s", size: "w-7 h-7" },
  ]

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      <div className="max-w-md text-center relative z-10">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 -m-20">
          {icons.map((item, i) => {
            const { Icon, delay, size } = item
            return (
              <div
                key={i}
                className="absolute animate-bubble opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: delay,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                <Icon className={`${size} text-primary`} />
              </div>
            )
          })}
        </div>

        {/* Main Content Icons */}
        <div className="relative mb-8 flex flex-wrap justify-center gap-4">
          {icons.slice(0, 6).map((item, i) => {
            const { Icon, delay } = item
            return (
              <div
                key={i}
                className="p-4 rounded-full bg-primary/10 animate-float"
                style={{
                  animationDelay: delay,
                  animationDuration: `${3 + i * 0.2}s`,
                }}
              >
                <Icon className="w-8 h-8 text-primary" />
              </div>
            )
          })}
        </div>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>

      <style jsx>{`
        @keyframes bubble {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(-5px) rotate(-3deg);
          }
        }

        .animate-bubble {
          animation: bubble infinite ease-in-out;
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default AuthImagePattern
