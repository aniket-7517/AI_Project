import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Home() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [imageData, setImageData] = useState({});
    const [loading, setLoading] = useState(false);

    const postData = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3003/image', data);
            setImageData(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                        <form onSubmit={handleSubmit(postData)}>
                            <div className="mb-3">
                                <h4 className="my-3">Image Generation</h4>
                                <input type="text" {...register('prompt')} className="form-control" id="prompt" placeholder="Message..." />
                                <p className="text-danger">{imageData?.error?.message}</p>
                            </div>
                            <button className="btn btn-success" type="submit">Submit</button> <button className="btn btn-warning" onClick={() => window.location.reload()}>Clear</button>
                        </form>
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
                        {imageData.data?.map((img, index) => (
                            <div className="text-center mt-2" key={index}>
                                <img src={img.url} width='auto' height='700px' alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;
