import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

function TranslationComponent() {
    const [prompt, setPrompt] = useState('');
    const [translation, setTranslation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3003/translate', { prompt });
            setTranslation(res.data); // Convert object to string
            setError('');
            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
            setError('Error occurred while translating. Please try again.');
        }
    };

    console.log(translation)

    return (

        <div className="container">
            <div className="row">
                <div className="text-center mt-5 mb-5">
                    <img src="https://divineinfosys.com/wp-content/uploads/2024/01/1681142315open-ai-logo-1.png" width='500px' alt="" />
                </div>
                <div className="text-center border-bottom pb-2 justify-content-center d-flex">
                    <div className="col-sm-6">
                        <h1>Translation</h1>
                        <div className='mt-4'>
                            <label htmlFor="prompt">Enter Sentence in English:</label>
                            <input type="text" className='form-control my-2' id="prompt" placeholder='Sentence...' value={prompt} onChange={handlePromptChange} />
                            <button className='btn btn-success' onClick={handleSubmit}>Translate</button>
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
                        {translation && (
                            <div>
                                <h5>Translation in Marathi:</h5>
                                <p>{translation.toString()}</p>
                            </div>
                        )}
                        {error && <p>{error.error.message}</p>}
                    </div>

                )}
            </div>
        </div>



    );
}

export default TranslationComponent;
