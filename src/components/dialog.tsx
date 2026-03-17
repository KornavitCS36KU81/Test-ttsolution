import { useState, useEffect, ReactNode } from "react";

type DialogComponent = {
    isOpen: boolean;
    children: ReactNode;
}

export default function Dialog({children, isOpen}:DialogComponent) {
    const [show, setShow] = useState(false);

    // block scroll in Model and add the animation
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => setShow(true), 10);
        } else {
            document.body.style.overflow = "auto";
            setTimeout(() => setShow(false), 10);
        }
    }, [isOpen]);

    if (!isOpen) return <></>;

    return (
        <>
            {isOpen && (
                <div className="z-10 fixed inset-0 flex items-center justify-center">
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                            show ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {/* Modal content */}
                    <div
                        className={`relative bg-white rounded-xl shadow-lg w-100 p-6 transform transition-all duration-300
                        ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                    >
                        { children }
                    </div>

                </div>
            )}
        </>
    )
}