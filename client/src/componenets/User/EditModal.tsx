import { Button, Form, Input, Modal } from "antd";
import React, { CSSProperties, useState } from "react";

interface Props {
  isVisible: boolean;
  onCancel: () => void;
  onFinish: (value: any) => void;
  activeUser: any;
}

const EditModal = (props: Props) => {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <div>
      <Modal
        title="Edit your profile"
        visible={props.isVisible}
        onCancel={props.onCancel}
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div style={modalStyle}>
          <Form
            {...layout}
            name="userEditor"
            onFinish={props.onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              initialValue={props.activeUser.fullName}
              name={"fullName"}
              rules={[{ required: true }]}
              label="Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.phoneNumber}
              name={"phoneNumber"}
              rules={[
                { required: true },
                {
                  pattern: new RegExp(/^(0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/),
                  message: "Please enter a valid phone number",
                },
              ]}
              label="Phone Number"
            >
              <Input />
            </Form.Item>

            <Form.Item
              initialValue={props.activeUser.email}
              rules={[{ required: true, type: "email" }]}
              name={"email"}
              label="Email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.address.street}
              name={["address", "street"]}
              rules={[{ required: true }]}
              label="Street"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.address.zipCode}
              name={["address", "zipCode"]}
              rules={[
                { required: true },
                {
                  pattern: new RegExp(/^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/),
                  message: "Please enter a valid zip code",
                },
              ]}
              label="Zip Code"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.address.city}
              name={["address", "city"]}
              rules={[{ required: true }]}
              label="City"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.address.country}
              name={["address", "country"]}
              rules={[{ required: true }]}
              label="Country"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.activeUser.fullName}
              wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;

// form in modal offset styling
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const modalStyle: CSSProperties = {
  height: "50vh",
  display: "flex",
  flexDirection: "row",
  width: "100%",
  overflow: "auto",
};
