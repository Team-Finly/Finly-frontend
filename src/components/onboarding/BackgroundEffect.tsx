import { motion } from "framer-motion";
import bgShapes from "../../assets/icons/background.svg";

const BackgroundEffect = () => {
  return (
    <div className="relative flex items-center justify-center w-[285px] h-[182px]">
      <motion.img
        src={bgShapes}
        alt="배경 효과"
        className="absolute z-0 w-full h-full object-contain"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 104,   
          damping: 8.06,    
          mass: 1,          
          duration: 1.489,  
          delay: 0.5   
        }}
        ></motion.img>
    </div>
  );
};

export default BackgroundEffect;