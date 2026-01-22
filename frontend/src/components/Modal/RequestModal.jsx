import { createPortal } from 'react-dom'
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RequestModal({onClose}) {
    
    const modalRoot = document.getElementById("modal-request");

    const backgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    const notify = () => toast.success(<span style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}>
        Успешно отправлено! Спасибо
    </span>, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
    });

    return createPortal((<div className='overlay' onMouseDown={backgroundClick}>
        <div className='modal-window'>
            <form onSubmit={(e) => {
                e.preventDefault();
                notify()
            }}>
                <p>Район проблемы:</p>
                <div className="input-wrapper">
                    <input type="text"
                        placeholder="" />
                </div>

                <p>Категория проблемы:</p>
                <div className="input-wrapper">
                    <input type="text"
                        placeholder="" />
                </div>

                <p>Дополнительное описание</p>
                <div className="input-wrapper">
                    <input type="text"
                        placeholder="" />
                </div>

                <div>
                    <button className='sign-btn' type='submit'>Отправить</button>
                </div>
                <ToastContainer />
            </form>
        </div>

    </div >), modalRoot)
    
}