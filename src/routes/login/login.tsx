import {useNavigate, useSearchParams} from "react-router-dom";
import Navbar from "../../components/navbar/navbar.tsx";
import {useThemeStore} from "../../store/theme-store";
import {Button, Form, type FormProps, Input, message, Typography} from "antd";
import leftImg from "../../assets/sign-in.svg"
import {usePostQuery} from "../../hooks";
import {ContentLoading} from "../../components/loading/loading.tsx";
import {useAuthStore} from "../../store/auth-store";
import {get} from "lodash";

const {Title} = Typography;

const Login = () => {
  const [searchParams] = useSearchParams()
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  // @ts-ignore
  const {setUserToken, setUserId} = useAuthStore()
  // @ts-ignore
  const {themeMode} = useThemeStore()
  const role = atob(searchParams.get("role") as string);

  const {mutate, isPending} = usePostQuery({
    queryKey: ["login"],
  })

  type FieldType = {
    email: string,
    password: string,
    deviceId: string,
  };

  const onFinishAdmin: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate(`/${role}`);
    messageApi.open({type: 'success', content: "Successfully logged in", className: "text-md font-semibold"});
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    mutate({
      url: "/auth/loginByEmail",
      attributes: {...values, deviceId: "qwerty123321"}
    }, {
      onSuccess: (response) => {
        messageApi.open({type: 'success', content: "Successfully logged in", className: "text-md font-semibold"});
        console.log('Success:', response);
        setUserId(get(response, "data.data"));
        setUserToken(get(response, "data.message"))
        navigate(`/${role}`);
      },
      onError: (error) => {
        console.log('Error:', error);
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({type: 'error', content: "Error logged in", className: "text-md font-semibold"});
  };

  console.log(role)
  return (
      <div>
        {contextHolder}
        <div
            className={`w-full min-h-screen flex justify-center items-center ${themeMode === "dark" ? "bg-[#141414]" : "bg-gradient-to-br from-[#B8D8F7] to-[#B7D9F7]"}`}>
          <Navbar/>
          <div className="grid grid-cols-12 md:gap-x-10 flex-1 px-8">
            <div className="hidden md:flex items-center justify-center col-span-6 lg:col-span-7">
              <div className="max-w-lg">
                <img src={leftImg} width={1000} height={1000} alt="Sign In illustration"/>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-5 mt-10">

              <div
                  className={`max-w-md w-full rounded-2xl p-8 shadow-lg border ${themeMode === "dark" ? "bg-[#161616] border-[#303030]" : "bg-white border-gray-200"}`}>
                <Title level={4}>Вход в личный кабинет</Title>
                <Title level={2} className="!m-0">TenzorSoft</Title>

                {
                  isPending ? <ContentLoading/> : (
                      role === "admin" ? (<Form
                          className="w-full !my-4"
                          name="basic" initialValues={{remember: true}}
                          onFinish={onFinishAdmin} onFinishFailed={onFinishFailed}
                          autoComplete="off" layout="vertical"
                      >
                        <Form.Item
                            label="Email" name="email" initialValue="khaitovilhom04@gmail.com"
                            rules={[{required: true, message: 'Please input your email address!'}]}
                        >
                          <Input size="large" placeholder="johndoe@gmail.com"/>
                        </Form.Item>

                        <Form.Item
                            label="Password" name="password" initialValue="12121212"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                          <Input.Password size="large" placeholder="********"/>
                        </Form.Item>

                        <Form.Item label={null}>
                          <Button className="w-full" size="large" type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>) : (<Form
                          className="w-full !my-4"
                          name="basic" initialValues={{remember: true}}
                          onFinish={onFinish} onFinishFailed={onFinishFailed}
                          autoComplete="off" layout="vertical"
                      >
                        <Form.Item
                            label="Email" name="email" initialValue="ilhomxaitov82@gmail.com"
                            rules={[{required: true, message: 'Please input your email address!'}]}
                        >
                          <Input size="large" placeholder="johndoe@gmail.com"/>
                        </Form.Item>

                        <Form.Item
                            label="Password" name="password" initialValue="12121212"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                          <Input.Password size="large" placeholder="********"/>
                        </Form.Item>

                        <Form.Item label={null}>
                          <Button className="w-full" size="large" type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>)
                  )
                }
              </div>

            </div>
          </div>
        </div>
      </div>
  )
}
export default Login
