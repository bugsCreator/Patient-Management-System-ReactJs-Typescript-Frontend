import { Input, Table, Row, Col, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { getAllPatientRequest, deletePatientRequest } from '../Requests';
import { Patient } from '../Types';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPatientRequest();
      let response = result.data.data;
      setPatients(response);
      setFilteredPatients(response);
    };
    fetchData();
  }, []);

  const handleSearch = (event:any) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = patients.filter((patient:Patient) =>
      patient.name.toLowerCase().includes(query)
    );
    setFilteredPatients(filteredData);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePatientRequest(id);
      const newPatients = patients.filter((patient: Patient) => patient._id !== id);
      setPatients(newPatients);
      setFilteredPatients(newPatients);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDeleteButton = (text: any, record: any) => (
    <Popconfirm
      title={`Are you sure you want to delete ${record.name}?`}
      onConfirm={() => handleDelete(record._id)}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined ></DeleteOutlined>
    </Popconfirm>
  );

  return (
    <div>
      <Input.Search
        placeholder="Search patients"
        onChange={handleSearch}
        value={searchQuery}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table dataSource={filteredPatients} key={filteredPatients+""} scroll={{ x: 500 }}>
            <Column title="Name" dataIndex="name" key="name"   render={(text:any, record:any) => (
                <Link to={`/${record._id}/detail`}>{text}</Link>
              )}/>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Sex" dataIndex="sex" key="sex" />
            <Column title="Father's Name" dataIndex="fatherName" key="fatherName" />
            <Column title="Contact Number" dataIndex="contactNumber" key="contactNumber" />
            <Column title="Designation" dataIndex="designation" key="designation" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column title="Action" key="action" render={renderDeleteButton} />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default PatientList;
