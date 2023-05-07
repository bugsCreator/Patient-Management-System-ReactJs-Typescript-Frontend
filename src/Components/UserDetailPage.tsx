import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Layout, Upload, message, notification } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useState } from "react";
import { getPatientDetail } from "../Requests";

const {  Content } = Layout;

interface UserDetailPageProps {
    setIsModalVisible: (value: boolean) => void;
    patientId: string;
    setPatientDetail: (value: any) => void;
}
const UserDetailPage = ({ setIsModalVisible, patientId, setPatientDetail }: UserDetailPageProps): JSX.Element => {
    const [photoList, setPhotoList] = useState<UploadFile[]>([]);
    const [prescriptionList, setPrescriptionList] = useState<UploadFile[]>([]);

    const handlePhotoUpload = (info: UploadChangeParam<UploadFile>) => {
        let fileList = [...info.fileList];
        setPhotoList(fileList);
    };

    const handlePrescriptionUpload = (info: UploadChangeParam<UploadFile>) => {
        let fileList = [...info.fileList];
        // Update the state
        setPrescriptionList(fileList);
    };

    const onFinish = () => {
        let formdata = new FormData();
        for (let i = 0; i < photoList.length; i++) {
            formdata.append(`photo`, new File([photoList[i].originFileObj!], photoList[i].name));
        }
        for (let i = 0; i < prescriptionList.length; i++) {
            formdata.append(`prescription`, new File([prescriptionList[i].originFileObj!], prescriptionList[i].name));
        }//644d2ca60c6b25ee48d96486
        getPatientDetail(patientId, formdata).then((res) => {
            let data = res.data.data
            data = {
                ...data,
                name: data.patient.name,
                age: data.patient.age,
                address: data.patient.address,
            };
            setPatientDetail(data);
            setPhotoList([])
            setPrescriptionList([])
            notification.success({
                message: "Success",
                description: "Patient Images Upload successfully",
            });
            setIsModalVisible(false);
        }).catch((err) => {
            notification.error({
                message: "Something wents wrong",
                description: err.message,
            });
        })
    };

    const handleRemove = (file: UploadFile) => {
        const isPhoto = photoList.find((item) => item.uid === file.uid);
        if (isPhoto) {
            setPhotoList(photoList.filter((item) => item.uid !== file.uid));
        } else {
            setPrescriptionList(
                prescriptionList.filter((item) => item.uid !== file.uid)
            );
        }
    };

    const handleBeforeUpload = (file: UploadFile) => {
        // Check file type and size before uploading
        if (file == null) {
            return;
        }
        const fileType = file.type!.split("/")[0];
        const isImage = fileType === "image";
        const isLt2M = file.size! / 1024 / 1024 < 15;//limit is 15MB

        if (!isImage) {
            message.error("You can only upload image files!");
        }

        if (!isLt2M) {
            message.error("Image must be smaller than 2MB!");
        }

        return isImage && isLt2M;
    };

    const photoUploadProps = {
        listType: "picture-card" as const,
        fileList: photoList,
        onPreview: () => { },
        onChange: handlePhotoUpload,
        onRemove: handleRemove,
        beforeUpload: handleBeforeUpload,
        multiple: true,
        accept: "image/*",
    };

    const prescriptionUploadProps = {
        listType: "picture-card" as const,
        fileList: prescriptionList,
        onPreview: () => { },
        onChange: handlePrescriptionUpload,
        onRemove: handleRemove,
        beforeUpload: handleBeforeUpload,
        multiple: true,
        accept: "image/*",
    };

    return (
        <Layout>

            <Content style={{ padding: "50px" }}>
                <Form onFinish={onFinish}>

                    <Form.Item label="Upload Photos">
                        <Upload {...photoUploadProps}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Upload Prescriptions">
                        <Upload {...prescriptionUploadProps}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default UserDetailPage;




