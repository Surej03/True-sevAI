import React, { useContext, useState } from 'react'
import { Mic, Type } from 'lucide-react'
import { AppContext } from '../context/AppContext';

const VoiceToText = () => {
    const [text, setText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [storeAudio, setStoreAudio] = useState(null);
    const {backendUrl} = useContext(AppContext);

    let mediaRecorder;
    let audioChunks = [];

    const startRecording = () =>{
        setIsRecording(true);
        audioChunks = [];
        navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) =>{
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) =>{
                audioChunks.push(e.data);
            };
            mediaRecorder.onstop = () =>{
                const storeAudio = new Blob(audioChunks, {type: "audio/wav"});
                setStoreAudio(storeAudio);
                sendAudioToBackend(storeAudio); // Send audio to Python backend
            }
            mediaRecorder.start();
        });
    };
    const stopRecording = () =>{
        setIsRecording(false);
        mediaRecorder.stop();
    }
    const sendAudioToBackend = (storeAudio) =>{
        const formData = new FormData();
        formData.append("file", storeAudio, "audio.wav")

        fetch(backendUrl + "/voiceToText/", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => setText(data.text)) // Update the prompt field with transcribed text
        .catch((err) => console.error("Error", err));
    };


  return (
    <div>
        <button onClick={isRecording ?stopRecording : startRecording}>
        <Mic/>
        </button>
        <textarea value={text} readOnly placeholder="Generated text will appear here..." />
    </div>
  )
}

export default VoiceToText