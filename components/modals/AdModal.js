import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#FFF',
    padding: '10px',
    zIndex: '1000'
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}


export default function AdModal({open, children, onClose}) {
    if (!open) {
        return null
    }
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES} className="w-25">
                    <div onClick={onClose} className="text-right">
                        <i className="far fa-times-circle"/>
                    </div>
                    <div className="card">
                    {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("modal-root")
    );
}