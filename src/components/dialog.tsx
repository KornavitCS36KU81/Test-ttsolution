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
                <div className="z-10 fixed inset-0 flex items-end md:items-center justify-center">
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                            show ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {/* Modal content */}
                    <div
                        className={`relative bg-white rounded-t-xl md:rounded-xl shadow-lg w-screen md:w-3/6 p-4 transform transition-all duration-300
                        ${show ? "opacity-100 translate-y-0 md:translate-none md:scale-100" : "opacity-0 translate-y-full md:translate-none md:scale-95"}`}
                    >
                        { children }
                    </div>

                </div>
            )}
        </>
    )
}