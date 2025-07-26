import {AnimatePresence, motion} from "framer-motion";
import {LuMoon, LuSun} from "react-icons/lu";
import {Button} from "antd";
import {useThemeStore} from "../../store/theme-store";

const ThemeToggle= () => {
  // @ts-ignore
  const {themeMode, toggleTheme} = useThemeStore()

  return (
      <Button type="text" onClick={toggleTheme} className="relative overflow-hidden !py-4.5 !px-2.5">
        <AnimatePresence mode="wait" initial={false}>
          {themeMode === "dark" ? (
              <motion.div
                  key="sun"
                  initial={{opacity: 0, rotate: -90, scale: 0.5}}
                  animate={{opacity: 1, rotate: 0, scale: 1}}
                  exit={{opacity: 0, rotate: 90, scale: 0.5}}
                  transition={{duration: 0.3, ease: "easeInOut"}}
                  className="flex items-center justify-center"
              >
                <LuSun size={20}/>
              </motion.div>
          ) : (
              <motion.div
                  key="moon"
                  initial={{opacity: 0, rotate: 90, scale: 0.5}}
                  animate={{opacity: 1, rotate: 0, scale: 1}}
                  exit={{opacity: 0, rotate: -90, scale: 0.5}}
                  transition={{duration: 0.3, ease: "easeInOut"}}
                  className="flex items-center justify-center"
              >
                <LuMoon size={20}/>
              </motion.div>
          )}
        </AnimatePresence>
      </Button>
  )
}
export default ThemeToggle
