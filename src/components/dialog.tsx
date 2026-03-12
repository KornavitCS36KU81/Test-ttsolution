import { useState, useEffect, ReactNode, BaseSyntheticEvent } from "react";

type ActionButton = {
    name: string;
    action: (e?: BaseSyntheticEvent) => Promise<void>;
}

type DialogComponent = {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    cannel: string;
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

    const handleFormSubmit = async (event: BaseSyntheticEvent) => {
        await props.submit.action(event)
        setOpen(false)
    }

    return (
        <>
        <div className={`cursor-pointer ${props.className}`} onClick={() => setOpen(true)}>{children}</div>
        
        {/* Dialog */}
        {open && (
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
                    <form onSubmit={handleFormSubmit}>
                        { props.content }
                        <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-8">
                            <button
                                onClick={() => setOpen(false)}
                                className="cursor-pointer w-full px-4 py-2 bg-black text-white rounded-lg"
                            >
                                { props.cannel }
                            </button>

                            <button
                                type="submit"
                                className="cursor-pointer w-full px-4 py-2 border rounded-lg"
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