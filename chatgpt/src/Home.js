import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [formData, setFormData] = useState("");
    const [displayedLines, setDisplayedLines] = useState([]);
    const [loading, setLoading] = useState(false);

    const postData = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3003/chat', data);
            const lines = response.data.split('\n');
            setFormData(lines);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let lineIndex = 0;
        let charIndex = 0;
        const timer = setInterval(() => {
            if (lineIndex < formData.length) {
                const line = formData[lineIndex];
                if (charIndex < line.length) {
                    setDisplayedLines((prevLines) => {
                        const newLines = [...prevLines];
                        newLines[lineIndex] = line.substring(0, charIndex + 1);
                        return newLines;
                    });
                    charIndex++;
                } else {
                    lineIndex++;
                    charIndex = 0;
                }
            } else {
                clearInterval(timer);
            }
        }, 10); // Adjust the speed of typewriter effect here (in milliseconds)

        return () => {
            clearInterval(timer);
        };
    }, [formData]);

    const onSubmit = (data) => {
        setDisplayedLines([]); // Clear previous output
        handleSubmit(postData)(data); // Call postData with new input data
    };

    return (
        <div className="container mt-">
            <div className="row ">
                <div className="text-center mt-5 mb-5">
                    <img src="https://divineinfosys.com/wp-content/uploads/2024/01/1681142315open-ai-logo-1.png" width='500px' alt="" />
                </div>
                <div>
                    <div className="text-center justify-content-center d-flex mt-2 border-bottom pb-4" >
                        <div className=" col-sm-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="mb-3">
                                    <h4 className="my-3">How can I help you?</h4>
                                    <input type="text" {...register('prompt')} class="form-control" id="prompt" placeholder="Message..." />
                                </div>
                                <button className="btn btn-success" type="submit">Submit</button><button className="btn btn-warning ms-2" onClick={() => window.location.reload()}>Clear</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div>
                            <div className="mt-2">
                                {displayedLines.map((line, index) => (
                                    <p className="" style={{ marginLeft: '100px' }} key={index}>{line}</p>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home;
