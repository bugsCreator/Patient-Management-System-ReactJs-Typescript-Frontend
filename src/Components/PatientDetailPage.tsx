import { Button, Card, Carousel, Layout, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../Requests";
import UserDetailPage from "./UserDetailPage";

const {  Content } = Layout;


interface PatientDetail {
  name: string;
  age: number;
  address: string;
  photoList: string[];
  prescriptionList: string[];
}

const PatientDetailPage = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [patientDetail, setPatientDetail] = useState<PatientDetail | null>(null);
  const parms = useParams();

  const patientId = parms["id"];

  useEffect(() => {
    const fetchData = async () => {
      let result = await getPatient(patientId as string)

      let data = result.data.data;
      data = {
        ...data,
        name: data.patient.name,
        age: data.patient.age,
        address: data.patient.address,
      };
      setPatientDetail(data);
    };

    fetchData();
  }, [patientId]);

  const handleAddDetail = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>

      <Content style={{ padding: "50px" }}>
        {patientDetail ? (
          <>
            <h1>{patientDetail.name}'s Details</h1>
            <Card title="Basic Information">
              <p>Name: {patientDetail.name}</p>
              <p>Age: {patientDetail.age}</p>
              <p>Address: {patientDetail.address}</p>
            </Card>
            <Card title="Past Photos">
              <Carousel>
                {patientDetail.photoList.map((photo) => (
                  <div key={photo}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/${photo}`}
                      alt="Past"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                ))}
              </Carousel>
            </Card>
            <Card title="Prescription">
              <Carousel>
                {patientDetail.prescriptionList.map((prescription) => (
                  <div key={prescription}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/` + prescription}
                      alt="Prescription"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                ))}
              </Carousel>
            </Card>
            <Button type="primary" onClick={handleAddDetail}>
              Add Detail
            </Button>
            <Modal
              title="Add Detail"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <UserDetailPage
                patientId={patientId as string}
                setPatientDetail={setPatientDetail}
                setIsModalVisible={setIsModalVisible}
              />
            </Modal>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: "center" }}>
            <p>Loading...</p>
          </div>

        )}
      </Content>
    </Layout>
  );
};

export default PatientDetailPage;
