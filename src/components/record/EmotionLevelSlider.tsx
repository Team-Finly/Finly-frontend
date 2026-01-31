import React from 'react';

interface EmotionLevelSliderProps {
  level: number;
  onChange: (level: number) => void;
  isVisible: boolean;
}

const EmotionLevelSlider = ({
  level,
  onChange,
  isVisible,
}: EmotionLevelSliderProps) => {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isVisible
          ? 'mt-5 grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className="flex flex-col pt-1.25">
          <div className="relative flex items-center">
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={level}
              onChange={(e) => onChange(Number(e.target.value))}
              className="accent-secondary [&::-webkit-slider-thumb]:bg-secondary h-1.5 w-full cursor-pointer appearance-none rounded-[7.5px] bg-gray-100 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
          <div className="mt-[13px] flex justify-end">
            <p className="text-secondary text-sm leading-[17px] font-bold">
              Lv.
              <span className="font-extrabold">{level}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionLevelSlider;
