import { useEffect, useState, useRef } from "react";
import "./styles.css";

interface CountdownTimerProps {
  durationInMinutes: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationInMinutes,
}) => {
  const calculateTargetTime = (durationInMinutes: number): number => {
    const now = new Date().getTime();
    const targetTime = now + durationInMinutes * 60 * 1000;
    return targetTime;
  };

  const [countdownDate, setCountdownDate] = useState<number>(() => {
    // Check if there's a saved countdown date in local storage
    const savedCountdownDate = localStorage.getItem("countdownDate");
    if (savedCountdownDate) {
      return parseInt(savedCountdownDate, 10);
    }
    // If not, calculate the initial countdown date
    return calculateTargetTime(durationInMinutes);
  });
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => setNewTime(), 1000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Save the current countdown date to local storage
    localStorage.setItem("countdownDate", String(countdownDate));
  }, [countdownDate]);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();
      const distanceToDate = countdownDate - currentTime;
      const hoursRemaining = Math.floor(distanceToDate / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((distanceToDate / (1000 * 60)) % 60);
      const secondsRemaining = Math.floor((distanceToDate / 1000) % 60);

      setHours(hoursRemaining);
      setMinutes(minutesRemaining);
      setSeconds(secondsRemaining);

      if (
        hoursRemaining <= 0 &&
        minutesRemaining <= 0 &&
        secondsRemaining <= 0
      ) {
        // Countdown has reached 0 hours, 0 minutes, and 0 seconds, you can add additional logic here
        if (timerRef.current !== null) {
          clearInterval(timerRef.current); // Stop the countdown
        }
      }
    }
  };

  return (
    <div>
      <div className="countdown-wrapper">
        <div className="time-section">
          <div className="time">{String(hours).padStart(2, "0")}</div>
        </div>
        <div className="time">:</div>
        <div className="time-section">
          <div className="time">{String(minutes).padStart(2, "0")}</div>
        </div>
        <div className="time">:</div>
        <div className="time-section">
          <div className="time">{String(seconds).padStart(2, "0")}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
