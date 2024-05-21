import { useNavigate } from "react-router-dom";
import './Design.css'

function Design() {

    const navigate = useNavigate();

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row">
                <div className="col-sm-4 ms-5 ps-4 ">
                    <div className="">
                        <button onClick={() => navigate('/home')} className="button-1">Text Generation</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/image')} className="button-2">Image Generation</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/voice')} className="button-3">Speech To Text</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/text')} className="button-4">Text To Speech</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/grammer')} className="button-5">Grammar correction</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/translate')} className="button-6">Translation</button>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => navigate('/pdf')} className="button-7">PDF To Text</button>
                    </div>
                </div>
                <div className="col-sm">
                    <img src="https://divineinfosys.com/wp-content/uploads/2024/01/1681142315open-ai-logo-1.png" width='700px' style={{marginTop:'130px'}} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Design;