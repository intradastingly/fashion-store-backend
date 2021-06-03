/* eslint-disable no-template-curly-in-string */
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, Redirect, withRouter } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";
import { Select } from "antd";
import { BarcodeOutlined, FlagOutlined, HomeOutlined, LockOutlined, MailOutlined, NumberOutlined, PushpinOutlined, SmileOutlined, TagOutlined } from "@ant-design/icons";

function AddNewUser() {
  const { saveNewUser, loadAllUsers } = useContext(ApiContext);

  const [created, setCreated] = useState(false);



  const options = [
    { value: "plebian" },
    { value: "admin" },

  ];

//   const filteredOptions = options.filter((o) => !categoryField.includes(o));

  useEffect(() => {
    // loadProducts();
    // mapCategories();
    loadAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };


    const onFinish = (values: any) => {
        saveNewUser(values);
        setCreated(true)

      };
      
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    
      if (created) {
        return <Redirect to="/admin-users" />;
      }
      
      return (
        <>
        <div style={rootStyle}>
          <Form
            {...formItemLayout}
            name="userEditor"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={layoutStyle}
          >
            <Form.Item
                label="Username"
                name={"userName"}
                rules={[{ required: true, message: "Please enter a username." }]}
            >
              <Input
                prefix={<SmileOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
                label="Password"
                name={"password"}
                rules={[{ required: true, message: "Please enter a password." }]}
            >
              <Input    
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
                label="Fullname"
                name={"fullName"}
                rules={[{ required: true, message: "Please enter your full name." }]}
            >
              <Input
                prefix={<TagOutlined className="site-form-item-icon" />}
                placeholder="Full name"
              />
            </Form.Item>
            <Form.Item
                label="Phonenumber"
                name={"phoneNumber"}
                rules={[
                    { required: true, message: "Please enter your phone number." },
                ]}
            >
              <Input
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Phone number"
              />
            </Form.Item>
    
            <Form.Item
                label="Email"
                name={"email"}
                rules={[{ required: true, message: "Please enter your email." }]}
                >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
                label="Street"
                name={["address", "street"]}
                rules={[{ required: true, message: "Please enter your street." }]}
            >
              <Input
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="Street"
              />
            </Form.Item>
            <Form.Item
                label="Zipcode"
                name={["address", "zipCode"]}
                rules={[{ required: true, message: "Please enter your zip code." }]}
            >
              <Input
                prefix={<BarcodeOutlined className="site-form-item-icon" />}
                placeholder="Zip code"
              />
            </Form.Item>
            <Form.Item
                label="City"
                name={["address", "city"]}
                rules={[{ required: true, message: "Please enter your city." }]}
            >
              <Input
                prefix={<PushpinOutlined className="site-form-item-icon" />}
                placeholder="City"
              />
            </Form.Item>
            <Form.Item
                label="Country"
                name={["address", "country"]}
                rules={[{ required: true, message: "Please enter your country." }]}
            >
              <Input
                prefix={<FlagOutlined className="site-form-item-icon" />}
                placeholder="Country"
              />
            </Form.Item>
            <Form.Item
                label="Role"
                name={"role"}
                rules={[{ required: true, message: "Please choose user role" }]}>

                <Select
                    options={options}>

                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
  
             {...tailFormItemLayout}
             >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item
  
             {...tailFormItemLayout}
             >
        
            <Link to="/admin-users">Back</Link>
            </Form.Item>

       
          </Form>
          </div>
        </>
  );
}


const rootStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    marginTop: "10rem",
    justifyContent: "center",
    alignItems: "center",
  };

  const layoutStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "18rem",
  };
  

export default withRouter(AddNewUser);