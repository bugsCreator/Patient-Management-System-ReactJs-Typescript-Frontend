import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import PatientAddForm from "./PatientAddForm";
import { Patient } from "../Types";
import { SavePatientRequest } from "../Requests";
import PatientList from "./PatientList";
import { LogoutOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const Home = (): JSX.Element => {
    const [MenuKey, setMenuKey] = useState<any>("1");

    const handleAddPatient = (newPatient: Patient) => {
       return  SavePatientRequest(newPatient)
    };
    const items = [
        {
            label: 'Patients List',
            key: '1',
            icon: (<SearchOutlined />),
            onClick: () => { setMenuKey("1") },
            className: "class1",
        },
        {
            label: 'Add Patients',
            icon: (<UserOutlined />),
            key: '2',
            onClick: () => { setMenuKey("2") },
            className: "class2",
        }, {
            icon: <LogoutOutlined />,
            key: "3",
            className: "logout",
            onClick: () => {
                localStorage.clear()
                window.location.reload();
            },
        },
    ];


    return (
        <Layout>
            <Header>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={[MenuKey]} items={items}>
                    {/* <Menu.Item key="1" >
                        <span onClick={() => setMenuKey("1")}>Home</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span onClick={() => setMenuKey("2")}>Patients</span>
                    </Menu.Item> */}
                </Menu>
            </Header>
            {MenuKey == "2" ? (<Content key={MenuKey} style={{ padding: "50px" }}>
                <h1>Add Patient</h1>
                <PatientAddForm handleAddPatient={handleAddPatient} key={"patient"} />
            </Content>) : (<Content key={MenuKey} style={{ padding: "50px" }}>
                <h1>Patients List</h1>
                <PatientList key={"list"} />
            </Content>)}
        </Layout>
    );
};

export default Home;
