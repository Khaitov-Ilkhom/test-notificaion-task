import {LuBell, LuShield, LuUser, LuUsers} from "react-icons/lu";
import {Button, Card, Typography} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/navbar/navbar.tsx";
import {useThemeStore} from "../../store/theme-store";

const {Title} = Typography;

const Home = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const navigate = useNavigate();
  // @ts-ignore
  const {themeMode} = useThemeStore()

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    localStorage.setItem("userRole", role)
    // localStorage.setItem("userId", role === "admin" ? "admin_001" : `user_${Math.floor(Math.random() * 100)}`)

    navigate(`/login?role=${btoa(role)}`)
  }

  return (
      <div
          className={`min-h-screen flex items-center justify-center p-4 ${themeMode === "dark" ? "bg-[#141414]" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>

        <Navbar/>

        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <LuBell className="h-12 w-12 text-indigo-600 mr-3"/>
              <h1 className={`text-4xl font-bold ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>NotifyHub</h1>
            </div>
            <p className={`text-xl mb-2 ${themeMode === "dark" ? "text-white" : "text-gray-600"}`}>Real-time
              Notification System</p>
            <p className="text-gray-500">Choose your role to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedRole === "admin" ? "ring-2 ring-indigo-500" : ""}`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <LuShield className="h-16 w-16 text-indigo-600"/>
                </div>
                <Title className="text-2xl">Admin Dashboard</Title>
                <p>Manage users and send notifications</p>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <LuUsers className="h-4 w-4 mr-2 text-green-500"/>
                    View all registered users
                  </li>
                  <li className="flex items-center">
                    <LuBell className="h-4 w-4 mr-2 text-green-500"/>
                    Send targeted notifications
                  </li>
                  <li className="flex items-center">
                    <LuShield className="h-4 w-4 mr-2 text-green-500"/>
                    Real-time delivery tracking
                  </li>
                </ul>
                <Button onClick={() => handleRoleSelect("admin")} className="w-full">
                  Enter as Admin
                </Button>
              </div>
            </Card>

            <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedRole === "user" ? "ring-2 ring-indigo-500" : ""}`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <LuUser className="h-16 w-16 text-blue-600"/>
                </div>
                <Title className="text-2xl">User Dashboard</Title>
                <p>Receive and manage notifications</p>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <LuBell className="h-4 w-4 mr-2 text-green-500"/>
                    Real-time notifications
                  </li>
                  <li className="flex items-center">
                    <LuUsers className="h-4 w-4 mr-2 text-green-500"/>
                    Push notification support
                  </li>
                  <li className="flex items-center">
                    <LuShield className="h-4 w-4 mr-2 text-green-500"/>
                    Notification history
                  </li>
                </ul>
                <Button onClick={() => handleRoleSelect("user")} className="w-full">
                  Enter as User
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
  )
}
export default Home
