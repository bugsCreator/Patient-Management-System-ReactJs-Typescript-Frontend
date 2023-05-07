import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { Patient } from "../Types";

const { Option } = Select;


interface Props {
  handleAddPatient: (patient: Patient) => void
}

const PatientAddForm: React.FC<Props> = ({ handleAddPatient }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: Patient) => {
    setIsLoading(true);
    try {
      await handleAddPatient(values);
      form.resetFields();
      notification.success({
        message: "Success",
        description: "Patient added successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add patient",
      });
    }
    setIsLoading(false);
  };
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "50px 20px" }}>
      {/* <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "36px", fontWeight: "bold", color: "#2D2D2D" }}>Add Patient</h1> */}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter patient name" }]}
        >
          <Input placeholder="Patient Name" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please enter patient age" }]}
        >
          <Input placeholder="Patient Age" type="number" />
        </Form.Item>
        <Form.Item
          name="sex"
          label="Sex"
          rules={[{ required: true, message: "Please select patient sex" }]}
        >
          <Select placeholder="Select Patient Sex">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fatherName"
          label="Father's Name"
          rules={[{ required: true, message: "Please enter father's name" }]}
        >
          <Input placeholder="Father's Name" />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[
            { required: true, message: "Please enter patient contact number" },
            {
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "Please enter a valid contact number",
            },
          ]}
        >
          <Input placeholder="Patient Contact Number" type="tel" />
        </Form.Item>
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: "Please enter patient designation" }]}
        >
          <Input placeholder="Patient Designation" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter patient address" }]}
        >
          <Input.TextArea placeholder="Patient Address" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: "150px", borderRadius: "10px" }}>
            Add Patient
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PatientAddForm;
