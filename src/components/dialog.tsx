import { useState, useEffect, ReactNode } from "react";

type ActionButton = {
    name: string;
    action?: () => void;
}

type DialogComponent = {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    cannel: ActionButton;
    submit: ActionButton;
}

export default function Dialog({children, ...props}:DialogComponent) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    // block scroll in Model and add the animation
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            setTimeout(() => setShow(true), 10);
        } else {
            document.body.style.overflow = "auto";
            setTimeout(() => setShow(false), 10);
        }
    }, [open]);

    function handleSubmit() {
        if (props.submit.action != undefined || props.submit.action != null) {
            props.submit.action()
        }
    }

    return (
        <>
        <div className={`${props.className}`} onClick={() => setOpen(true)}>{children}</div>
        
        {/* Dialog */}
        {open && (
            <div className="z-10 fixed inset-0 flex items-center justify-center">
                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                        show ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Modal content */}
                <div
                    className={`relative bg-white rounded-xl shadow-lg w-100 p-6 transform transition-all duration-300
                    ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                    <form onSubmit={() => {
                            handleSubmit()
                            setOpen(false)
                        }}
                    >
                        { props.content }
                        <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-8">
                            <button
                                onClick={() => {
                                    if (props.cannel.action != undefined || props.cannel.action != null) {
                                        props.cannel.action()
                                    }
                                    setOpen(false)
                                }}
                                className="w-full px-4 py-2 bg-black text-white rounded-lg"
                            >
                                { props.cannel.name }
                            </button>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                { props.submit.name }
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        )}
        </>
    )
}