'use client';

import clsx from "clsx";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
}) => {
  return ( 
    <div className="relative">
      <label 
        htmlFor={id} 
        className={clsx(`          
            absolute
            -top-[30%]
            left-1/2
            -translate-x-1/2
            block 
            leading-6 
            text-sm 
            text-[#377b71] 
            font-bold
            bg-[#2a2a2a] 
            px-[20px]
            `,
            errors[id] && 'focus:ring-rose-500'
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block 
            w-full 
            rounded-md 
            border-[2px]
            bg-transparent
            py-2.5
            text-center
            text-white 
            shadow-sm 
            border-[#5b5f5d]
            placeholder:text-gray-400 
            sm:text-sm 
            sm:leading-6
            outline-none`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
   );
}
 
export default Input;