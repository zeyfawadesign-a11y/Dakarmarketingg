
import { useState, useRef, useEffect } from 'react';

interface InputFieldProps {
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  onSubmit: (value: string) => { valid: boolean; error?: string } | void;
  maxLength?: number;
}

export default function InputField({ type, placeholder, onSubmit, maxLength = 200 }: InputFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError('Ce champ est requis');
      return;
    }

    const result = onSubmit(value.trim());
    
    if (result && !result.valid) {
      setError(result.error || 'Valeur invalide');
    } else {
      setValue('');
      setCharCount(0);
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharCount(newValue.length);
      setError('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && type !== 'textarea') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const inputClasses = `w-full px-4 py-3 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all ${
    error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
  }`;

  return (
    <div className="mt-2 px-2" role="form" aria-label="Champ de saisie">
      <div className="bg-white rounded-lg shadow-sm p-3">
        {type === 'textarea' ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${inputClasses} min-h-[100px] resize-none`}
            maxLength={maxLength}
            aria-label={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? 'input-error' : undefined}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={inputClasses}
            maxLength={maxLength}
            aria-label={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? 'input-error' : undefined}
          />
        )}

        {error && (
          <p 
            id="input-error"
            className="text-red-500 text-xs mt-2 flex items-center gap-1 animate-shake"
            role="alert"
            aria-live="assertive"
          >
            <i className="ri-error-warning-fill" aria-hidden="true"></i>
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500" aria-label={`${charCount} caractères sur ${maxLength}`}>
            {charCount}/{maxLength}
          </span>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#E63946] text-white rounded-lg text-sm font-medium hover:bg-[#C1121F] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2"
            type="button"
            aria-label="Envoyer le message"
            tabIndex={0}
          >
            Envoyer
            <i className="ri-send-plane-fill" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
