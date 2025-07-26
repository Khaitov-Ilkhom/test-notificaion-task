import {Badge, Button, Form, type FormProps, Input, message, Modal, Table, type TableProps, Tag} from "antd";
import {get} from "lodash";
import {LuArrowLeft, LuUsers} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useGetQuery, usePostQuery} from "../../hooks";
import Navbar from "../../components/navbar/navbar.tsx";
import type {AllUserData, FieldType, Role} from "../../types";
import {useThemeStore} from "../../store/theme-store";
import {Loading, ContentLoading} from "../../components/loading/loading.tsx";
import {useState} from "react";

const {TextArea} = Input;

export default function Admin() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [{id, modalOpen}, setIsModalOpen] = useState({id: null, modalOpen: false});
  // @ts-ignore
  const {themeMode} = useThemeStore()

  console.log(id, modalOpen);

  const {data, isLoading} = useGetQuery({
    url: "/user/getAllUsers?page=0&size=20",
    queryProps: {
      queryKey: ["get-all-users"],
    }
  });

  const {mutate, isPending} = usePostQuery({
    queryKey: ["create-notification"],
  })

  // @ts-ignore
  const allUsers: AllUserData[] = get(data, "data.meta.list")

  const handleCancel = () => {
    setIsModalOpen({id: null, modalOpen: false});
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values, id);

    mutate({
      url: "/notification/create",
      attributes: {...values, userId: id},
    }, {
      onSuccess: (response) => {
        console.log('Success:', response);
        messageApi.open({type: 'success', content: response?.data?.message, className: "text-md font-semibold"});

        setIsModalOpen({id: null, modalOpen: false});
      },
      onError: (error) => {
        console.log('Error:', error);
        messageApi.open({type: 'error', content: "Error create notification", className: "text-md font-semibold"});
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns: TableProps<AllUserData>['columns'] = [
    {
      title: '№',
      key: 'index',
      render: (_text, _record, index) => <p className="text-center font-semibold">{index + 1}</p>,
    },
    {
      title: "Full Name",
      key: 'firstname',
      render: (text) => <p>{text.firstname} {text.lastname}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: "Status",
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Roles',
      key: 'role',
      render: (_, record) => {
        const first = record.roles;

        const roleColors: Record<string, { bg: string; color: string }> = {
          admin: {bg: '#fdecea', color: '#d93025'}, buyer: {bg: '#e8f0fe', color: '#1a73e8'},
          seller: {bg: '#e6f4ea', color: '#188038'}, support: {bg: '#fff4e5', color: '#e37400'},
        };

        return first.map((role: Role) => {
          const name = role.name.toLowerCase();
          const style = roleColors[name] || {bg: '#f0f0f0', color: '#333'};
          return (
              <Tag
                  key={role.id} className="capitalize"
                  style={{backgroundColor: style.bg, color: style.color, border: 'none'}}
              >
                {name}
              </Tag>
          );
        });
      },
    },
    {
      title: 'Notification',
      key: 'notification',
      render: (user) => (<Button onClick={() => setIsModalOpen({modalOpen: true, id: user.id})}>Create +</Button>),
    },
  ];

  if (isLoading) {
    return <Loading/>;
  }

  return (
      <div className={`min-h-screen ${themeMode === "dark" ? "bg-[#141414]" : "bg-gray-50"}`}>
        {contextHolder}
        <Navbar/>
        <div className="max-w-7xl mx-auto pt-[80px] px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate("/")}>
                <LuArrowLeft className="h-4 w-4 mr-2"/>
                Back to Home
              </Button>
              <div>
                <h1 className={`text-3xl font-bold ${themeMode === "dark" ? "text-white" : "text-gray-900"}`}>Admin
                  Dashboard</h1>
                <p className="text-gray-600">Manage users and send notifications</p>
              </div>
            </div>
            <Badge className="!flex justify-center items-center gap-2">
              <LuUsers className="h-4 w-4 mr-1"/> {allUsers?.length > 0 ? allUsers.length : 0} Users
            </Badge>
          </div>

          <div>
            <Table<AllUserData> bordered columns={columns} dataSource={allUsers}/>
          </div>
        </div>

        <Modal
            title="Create new notification"
            closable={{'aria-label': 'Custom Close Button'}}
            open={modalOpen} onCancel={handleCancel}
            footer={null} centered={true}
        >
          {isPending ? <ContentLoading/> : <Form
              name="basic" initialValues={{remember: true}}
              onFinish={onFinish} onFinishFailed={onFinishFailed}
              autoComplete="off" layout="vertical"
          >
            <Form.Item<FieldType>
                label="Notification title"
                name="title"
                rules={[{required: true, message: 'Please input notification title!'}]}
            >
              <Input size="large" placeholder="Enter notification title"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Message"
                name="body"
                rules={[{required: true, message: 'Please input your message!'}]}
            >
              <TextArea size="large" placeholder="Enter your message here..." rows={4}/>
            </Form.Item>

            <Form.Item label={null}>
              <Button className="w-full" size="large" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          }
        </Modal>
      </div>
  )
}