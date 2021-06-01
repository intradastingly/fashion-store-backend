import { Button, Form, Input, Modal } from "antd";
import React, { CSSProperties, useState } from "react";

interface Props {
  isVisible: boolean;
  onCancel: () => void;
  onFinish: (value: any) => void;
}

const EditModal = (props: Props) => {


  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    // number: {
    //   range: "${label} must be between ${min} and ${max}",
    // },
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
              name={"password1"}
              rules={[{ required: true }]}
              label="Password"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"password2"}
              rules={[{ required: true }]}
              label="Repeat Password"
            >
              <Input />
            </Form.Item>
            <Form.Item
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
