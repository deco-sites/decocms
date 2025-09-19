import { useEffect, useState } from "preact/hooks";

interface Props {
  endDate: string;
  textColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownIsland({ endDate, textColor = "text-white" }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(endDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return (
      <div class="text-center">
        <h3 class="text-3xl font-bold mb-2">🔥 OFERTA ENCERRADA!</h3>
        <p class="text-lg">Mas ainda temos outras ofertas incríveis para você!</p>
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div class="bg-black bg-opacity-30 rounded-lg p-4 min-w-[80px]">
      <div class="text-3xl md:text-4xl font-bold font-mono">
        {value.toString().padStart(2, '0')}
      </div>
      <div class="text-sm uppercase tracking-wide opacity-75">
        {label}
      </div>
    </div>
  );

  return (
    <div class="flex justify-center items-center gap-4 flex-wrap">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div class="text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div class="text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div class="text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}