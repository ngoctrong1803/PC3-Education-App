import { memo, useEffect, useState } from "react";

function CountDown(props) {
  const { timer, handleTimeout, isSubmit, handleSubmit } = props;
  const [timerExam, setTimerExam] = useState(-1);
  //   useEffect(() => {
  //     handleTimeout(timerExam);
  //   }, [isSubmit]);
  useEffect(() => {
    if (isSubmit) {
      handleSubmit(timerExam);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (props.timer !== -1) {
      setTimerExam(timer);
    }
  }, [timer]);
  useEffect(() => {
    const timerTemp = setTimeout(() => {
      setTimerExam((pre) => pre - 1);
    }, 1000);
    if (timerExam === 0) {
      handleTimeout(timerExam);
      clearTimeout(timerTemp);
    }
    return () => {
      clearTimeout(timerTemp);
    };
  }, [timerExam]);
  return (
    <>
      {timerExam == -1 ? <span>00:00:00</span> : null}
      {/* hour */}
      {Math.floor(timerExam / 60 / 60) < 10 && timerExam != -1 ? (
        <span>0{Math.floor(timerExam / 60 / 60)}:</span>
      ) : timerExam != -1 ? (
        <span>{Math.floor(timerExam / 60 / 60)}:</span>
      ) : null}
      {/* minute */}
      {Math.floor(timerExam / 60) < 10 && timerExam != -1 ? (
        <span>0{Math.floor(timerExam / 60)}:</span>
      ) : timerExam != -1 ? (
        <span>{Math.floor(timerExam / 60)}:</span>
      ) : null}
      {/* second */}
      {timerExam - Math.floor(timerExam / 60) * 60 < 10 && timerExam != -1 ? (
        <span>0{timerExam - Math.floor(timerExam / 60) * 60}</span>
      ) : timerExam != -1 ? (
        <span>{timerExam - Math.floor(timerExam / 60) * 60}</span>
      ) : null}
    </>
  );
}

export default memo(CountDown);
