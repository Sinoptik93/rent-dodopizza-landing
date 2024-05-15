import React from 'react';
import {twMerge} from "tailwind-merge";

interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({label, placeholder, type = 'text', value, onChange}: InputProps) => (
    <div className="mb-4">
        <label className="block text-neutral-400 text-sm">{label}</label>
        <input
            className={
                twMerge(
                    "w-full py-2 px-3 text-gray-700 appearance-none border rounded-xl",
                    "focus:outline-none focus:shadow-outline"
                )
            }
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default InputField;
