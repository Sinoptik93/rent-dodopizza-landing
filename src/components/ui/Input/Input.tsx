import React from 'react';
import {twMerge} from "tailwind-merge";

interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    value: string;
    isValid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({label, placeholder, isValid, type = 'text', value, onChange, onFocus, onBlur}: InputProps) => (
    <div className="mb-4">
        <label className="block text-neutral-400 text-sm">{label}</label>
        <input
            className={
                twMerge(
                    "w-full py-2 px-3 text-gray-700 appearance-none border rounded-xl",
                    "focus:outline-none focus:shadow-outline",
                    isValid !== undefined && !isValid && "border-[1px] border-red-500"
                )
            }
            type={type}
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
        />
    </div>
);

export default InputField;
