import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

function Grammer() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3003/grammer', { prompt });
            setResponse(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (

        <div className="container">
            <div className="row">
                <div className="text-center mt-5 mb-5">
                    <img src="https://divineinfosys.com/wp-content/uploads/2024/01/1681142315open-ai-logo-1.png" width='500px' alt="" />
                </div>
                <div className="text-center border-bottom pb-2 justify-content-center d-flex">
                    <div className="col-sm-6">
                    <h1>Grammar correction</h1>
            <div className=''>
                <input type="text" placeholder='Enter text here...' class="form-control" id="prompt" value={prompt} onChange={handlePromptChange} />
                <button className='btn btn-success mt-3' onClick={handleSubmit}>Submit</button>
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
                    <div>
                        {response && (
                <div>
                    <p>{response}</p>
                </div>
            )}
                    </div>
                )}
            </div>
        </div>


        
    );
}

export default Grammer;
