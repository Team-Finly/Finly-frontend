import { motion } from 'framer-motion';
import bgShapes from '@/assets/icons/background.svg';

const BackgroundEffect = () => {
  return (
    <div className="relative flex h-[182px] w-[285px] items-center justify-center">
      <motion.img
        src={bgShapes}
        alt="배경 효과"
        className="absolute z-0 h-full w-full object-contain"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 104,
          damping: 8.06,
          mass: 1,
          duration: 1.489,
          delay: 0.5,
        }}
      ></motion.img>
    </div>
  );
};

export default BackgroundEffect;
