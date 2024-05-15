import {useEffect, useRef, ReactNode} from 'react';
import IconCross from "@assets/icons/icon-cross.svg?react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-full md:max-w-md max-h-svh"
            >
                <button
                    type="button"
                    className="cursor-pointer size-9 p-2.5 rounded-full bg-white -right-12 top-0 hidden absolute md:block"
                    onClick={onClose}
                >
                    <IconCross/>
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
