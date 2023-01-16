import useTimer from "@/hook/useTimer";
const Timer = ({ endAt }) => {
  const { timer } = useTimer(endAt);
  return (
    <p>
      セール終了まで <strong className="c-green">{timer}</strong>
    </p>
  );
};

export default Timer;
