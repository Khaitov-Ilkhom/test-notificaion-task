import ThemeToggle from "../theme-toggle/theme-toggle.tsx";
import {useThemeStore} from "../../store/theme-store";
import logoDark from "../../assets/tenzorsoft-logo-3.png"
import logoLight from "../../assets/logoBlack.png"
import {Link} from "react-router-dom";

const Navbar = () => {
  // @ts-ignore
  const {themeMode} = useThemeStore()

  return (
      <div className={`w-full fixed top-0 flex justify-between items-center z-2 px-10 py-2 mx-auto border-b-1 ${themeMode === "dark" ? "bg-[#161616]" : "bg-white border-gray-100"}`}>
        <div>
          <Link to="/"><img className="h-[40px]" src={themeMode === "dark" ? logoDark : logoLight}/></Link>
        </div>

        <div className="flex justify-center items-center gap-2">
          <ThemeToggle/>
        </div>
      </div>
  )
}
export default Navbar
