import { useState, useRef, useEffect } from 'react';

function Record() {
  // Variable
  const [recording, Recording] = useState(false);
  const [audioURL, AudioURL] = useState<string | null>(null);
  const [recordedTime, RecordedTime] = useState<number>(0);

  // Reference
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    RecordedTime(0);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    // Temp file
    const tempAudio: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => {
      tempAudio.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(tempAudio, { type: 'audio/mp3' });
      const audioURL = URL.createObjectURL(audioBlob);
      AudioURL(audioURL);
    };

    mediaRecorder.start();
    Recording(true);

    // Start counting
    intervalRef.current = setInterval(() => {
        RecordedTime((prevTime) => prevTime + 1);
    }, 1000);
    mediaStreamRef.current = stream;
  };

  const stopRecording = () => {
    // Close microphones
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Stop recording audio
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      Recording(false);
    }

    // Stop counting
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
  <div className="audio">
    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    <button onClick={startRecording} disabled={recording}>
      Start Recording
    </button>
    <button onClick={stopRecording} disabled={!recording}>
      Stop Recording
    </button>
    <div>Recorded Time: {recordedTime} seconds</div>
    { audioURL && (
      <div>
        <audio src={audioURL} controls />
        <a href={audioURL} download="audio.mp3">Download Audio</a>
      </div>
      )}
    </div>
  );
}

export default Record;
