import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', file);
      setLoading(true);
      const response = await axios.post('http://localhost:3003/upload/voice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg(response.data.transcription);
      setLoading(false);

      // If you want to play the audio automatically after upload, uncomment the following line
      // audioRef.current.play();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Typewriter Effect
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  useEffect(() => {
    if (msg && currentCharIndex < msg.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, 10); // Adjust the typing speed here (in milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [msg, currentCharIndex]);

  const typedMessage = msg.substring(0, currentCharIndex);


  const [inputText, setInputText] = useState("");
  const [audioFile, setAudioFile] = useState("");

  const handleInputChange = (event) => {
      setInputText(""); // Reset inputText
      setInputText(event.target.value); // Set the new input text
  };

  const handleGenerateSpeech = async () => {
      // Check if inputText is empty before making the API call
      if (!inputText.trim()) {
          return;
      }

      try {
          setLoading(true);
          const response = await axios.post("http://localhost:3003/speech/text", {
              text: inputText,
          });

          if (response.data.success) {
              setAudioFile(response.data.filePath);
          }
          setLoading(false);
      } catch (error) {
          console.error("Error generating speech:", error);
          setLoading(false);
      }
  };

  const handlePlayAudio = () => {
      if (audioFile) {
          const audio = new Audio(`http://localhost:3003${audioFile}`);
          audio.play();
      }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="text-center mt-5 mb-5">
          <img src="https://divineinfosys.com/wp-content/uploads/2024/01/1681142315open-ai-logo-1.png" width='500px' alt="" />
        </div>
        <div className='row'>
          <div className='col-sm'>
            <div className="text-center border-bottom pb-4 justify-content-center d-flex">
              <div className=" mt-4">
                <div className="mb-3">
                  <h5>Upload Audio File</h5>
                  <input className="form-control mt-3" onChange={handleFileChange} type="file" id="formFile" />
                </div>
                <div>
                  <button className='btn btn-success' onClick={handleUpload}>Submit</button><button className="btn btn-warning ms-2" onClick={() => window.location.reload()}>Clear</button>
                  {file && (
                    <div>
                      {/* <h3>Uploaded Audio Preview:</h3> */}
                      <audio style={{ position: 'absolute', margin: '-91px 225px', width: '210px', height: '38px' }} controls ref={audioRef}>
                        <source src={URL.createObjectURL(file)} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-2">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='mt-4'>
            <p className=''>{typedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
