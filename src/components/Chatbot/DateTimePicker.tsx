
import { useState } from 'react';

interface DateTimePickerProps {
  onSelect: (date: string, time: string) => void;
}

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Dimanche, 6 = Samedi
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!isWeekday(date)) {
      setError('Veuillez sélectionner un jour ouvrable (Lundi-Vendredi)');
      setSelectedDate('');
    } else {
      setSelectedDate(date);
      setError('');
    }
  };

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) {
      setError('Veuillez d\'abord sélectionner une date');
      return;
    }
    setSelectedTime(time);
    setError('');
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      setError('Veuillez sélectionner une date');
      return;
    }
    if (!selectedTime) {
      setError('Veuillez sélectionner un créneau horaire');
      return;
    }

    const formattedDate = new Date(selectedDate).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    onSelect(formattedDate, selectedTime);
  };

  return (
    <div className="mt-2 px-2" role="form" aria-label="Sélecteur de date et heure">
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        {/* Sélecteur de date */}
        <div>
          <label 
            htmlFor="date-picker" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choisissez une date
          </label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getMinDate()}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all cursor-pointer"
            aria-label="Sélectionner une date"
            aria-invalid={!!error && !selectedDate}
            aria-describedby={error ? 'datetime-error' : undefined}
          />
        </div>

        {/* Créneaux horaires */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choisissez un créneau
            </label>
            <div 
              className="grid grid-cols-2 gap-2"
              role="radiogroup"
              aria-label="Créneaux horaires disponibles"
            >
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeSelect(slot)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2 ${
                    selectedTime === slot
                      ? 'bg-[#E63946] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                  role="radio"
                  aria-checked={selectedTime === slot}
                  aria-label={`Créneau ${slot}`}
                  tabIndex={0}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p 
            id="datetime-error"
            className="text-red-500 text-xs flex items-center gap-1 animate-shake"
            role="alert"
            aria-live="assertive"
          >
            <i className="ri-error-warning-fill" aria-hidden="true"></i>
            {error}
          </p>
        )}

        {/* Bouton de confirmation */}
        <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 ${
            selectedDate && selectedTime
              ? 'bg-[#1A1A1A] text-white hover:bg-black cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          type="button"
          aria-label="Confirmer la date et l'heure"
          aria-disabled={!selectedDate || !selectedTime}
        >
          <i className="ri-check-line text-lg" aria-hidden="true"></i>
          Confirmer
        </button>
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
