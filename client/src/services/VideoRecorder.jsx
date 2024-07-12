import React, { useState, useRef, useEffect } from 'react';

const WebcamRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const initWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    initWebcam();

    return () => {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    const stream = videoRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();

    setRecording(true);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.current.push(event.data);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();

    const blob = new Blob(recordedChunks.current, {
      type: 'video/webm',
    });

    const url = URL.createObjectURL(blob);
    setVideoURL(url);
    recordedChunks.current = [];

    setRecording(false);
  };

  const takeSnapshot = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL('image/png');
    setPhotoURL(dataURL);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '300px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="150"></canvas>

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      <button onClick={takeSnapshot}>Take Snapshot</button>

      {videoURL && (
        <div>
          <h3>Recorded Video</h3>
          <video src={videoURL} controls style={{ width: '300px' }} />
          <a href={videoURL} download="recording.webm">Download Recording</a>
        </div>
      )}

      {photoURL && (
        <div>
          <h3>Snapshot</h3>
          <img src={photoURL} alt="Snapshot" style={{ width: '300px' }} />
          <a href={photoURL} download="snapshot.png">Download Snapshot</a>
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;
