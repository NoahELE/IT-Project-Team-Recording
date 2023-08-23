import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export default function Record() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [recordedTime, setRecordedTime] = useState(0);

  const recording = status === 'recording';

  useEffect(() => {
    let interval: number | null = null;
    if (recording) {
      interval = setInterval(() => {
        setRecordedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [recording]);

  return (
    <div className="audio">
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <div>Recorded Time: {recordedTime} seconds</div>
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
    </div>
  );
}
