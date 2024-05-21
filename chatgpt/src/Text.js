import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [inputText, setInputText] = useState("");
    const [audioFile, setAudioFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [voice, setVoice] = useState('alloy');

    const handleInputChange = (event) => {
        setInputText("");
        setInputText(event.target.value);
    };

    const handleVoiceChange = (event) => {
        setVoice(event.target.value);
    };

    const handleGenerateSpeech = async () => {

        if (!inputText.trim()) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3003/speech/text", {
                voice: voice,
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
                <div className="text-center pb-4 justify-content-center d-flex">
                    <div className="col-sm-4 mt-2">
                        <textarea style={{ width: '100%', height: '130px', padding: '8px 10px', boxSizing: 'border-box', border: '2px solid #ccc', backgroundColor: '#f8f8f8', borderRadius: '4px', fontSize: '16px', resize: 'none' }}
                            rows={4}
                            cols={50}
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Enter text to convert to speech..."
                        />
                        <br />
                        <div className="mt-2">
                            <label htmlFor="voiceSelect">Select Voice:</label>
                            <select className="form-select" id="voiceSelect" value={voice} onChange={handleVoiceChange}>
                                <option value="alloy">alloy</option>
                                <option value="echo">echo</option>
                                <option value="fable">fable</option>
                                <option value="onyx">onyx</option>
                                <option value="nova">nova</option>
                                <option value="shimmer">shimmer</option>
                            </select>
                        </div>
                        <button className="btn btn-success mt-4" onClick={handleGenerateSpeech}>Generate Speech</button>
                        <button className="btn btn-warning ms-2 mt-4" onClick={() => window.location.reload()}>Reset</button>
                        <br />
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
                    <div>
                        {audioFile && (
                            <div>
                                {/* <button onClick={handlePlayAudio}>Play Audio</button> */}
                                <audio style={{ position: 'absolute', margin: '-10px 543px', width: '210px', height: '38px' }} controls>
                                    <source src={`http://localhost:3003${audioFile}`} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
