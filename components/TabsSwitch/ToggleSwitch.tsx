import { useContext } from 'react';
import { trendingContext } from '../../Context/TrendingContext';
import { ToggleSwitchProps } from '@/types/global';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onClick, val1, val2 }) => {
  const contextValue = useContext(trendingContext);
  const state = contextValue?.state ?? true;

  return (
    <div className="flex items-center bg-transparent border border-white rounded-full shadow-inner w-64">
      <button
        className={`flex-1 py-2 px-4 rounded-full transition-colors duration-200 ${
          state 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-gray-300 text-white hover:bg-gray-400'
        }`}
        onClick={() => onClick(true)}
        aria-label={val1}
      >
        {val1}
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-full transition-colors duration-200 ${
          !state 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-gray-300 text-white hover:bg-gray-400'
        }`}
        onClick={() => onClick(false)}
        aria-label={val2}
      >
        {val2}
      </button>
    </div>
  );
};

export default ToggleSwitch;
