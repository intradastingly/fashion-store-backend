import { Button, message } from "antd";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { ApiContext, userInfo } from "../../contexts/ApiContext";

interface Props extends RouteComponentProps<{ id: string }> {}

const successSave = () => {
  message.success("The user has been updated", 3);
};

const successDelete = () => {
  message.success("The user has been deleted", 3);
};

function EditUsers(props: Props) {
  const { loadAllUsers, users } = useContext(ApiContext);
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);
  const [editUser, setEditUser] = useState<any>({});

  const [userField, setUserField] = useState(editUser.userName);
  const [fullNameField, setfullNameField] = useState(editUser.fullName);
  const [phoneNumberField, setPhoneNumberField] = useState(
    editUser.phoneNumber
  );
  const [roleField, setRoleField] = useState(editUser.role);
  const [emailField, setEmailField] = useState(editUser.email);
  const [userAdress, setUserAdress] = useState({
    city: editUser?.address?.city,
    country: editUser?.address?.country,
    street: editUser?.address?.street,
    zipCode: editUser?.address?.zipCode,
  });

  useEffect(() => {
    const loadUsers = async () => {
      if (!users) {
        return;
      }
      const user = await users.find(
        (u: userInfo) => u._id === props.match.params.id
      );

      setEditUser(user);
    };

    loadUsers();
  }, []);

  const handleDelete = async () => {
    setButtonDeleteLoading(true);

    const response = await fetch("/api/accounts/" + props.match.params.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setButtonDeleteLoading(false);

    loadAllUsers();
    return result;
  };

  const saveUser = async (values: any) => {
    setButtonSaveLoading(true);

    const body = {
      userName: userField,
      fullName: fullNameField,
      phoneNumber: phoneNumberField,
      role: roleField,
      email: emailField,
      address: {
        street: userAdress.street,
        zipCode: userAdress.zipCode,
        city: userAdress.city,
        country: userAdress.country,
      },
    };

    const response = await fetch("/api/accounts/" + props.match.params.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    setUserAdress({
      city: "",
      country: "",
      street: "",
      zipCode: 0,
    });
    setUserField("");
    setfullNameField("");
    setPhoneNumberField("");
    setRoleField("");
    setEmailField("");
    successSave();
    // api context get all users
    loadAllUsers();
    return result;
  };

  console.log(editUser);

  if (buttonDeleteLoading || buttonSaveLoading) {
    return <Redirect to="/admin-users" />;
  }
  return (
    <div style={rootStyle}>
      <form style={layoutStyle}>
        <h2>Edit User</h2>
        <label>City: </label>
        <input
          name="City"
          onChange={(e: any) =>
            setUserAdress({ ...userAdress, city: e.target.value })
          }
          defaultValue={editUser?.address?.city}
        />
        <label>Country: </label>
        <input
          name="Country"
          onChange={(e: any) =>
            setUserAdress({ ...userAdress, country: e.target.value })
          }
          defaultValue={editUser?.address?.country}
        />
        <label>Street: </label>
        <input
          name="Street"
          onChange={(e: any) =>
            setUserAdress({ ...userAdress, street: e.target.value })
          }
          defaultValue={editUser?.address?.street}
        />
        <label>Zip Code: </label>
        <input
          name="ZipCode"
          onChange={(e: any) =>
            setUserAdress({ ...userAdress, zipCode: e.target.value })
          }
          defaultValue={editUser?.address?.zipCode}
        />
        <label>Username: </label>
        <input
          name="username"
          onChange={(e: any) => setUserField(e.target.value)}
          defaultValue={editUser.userName}
        />
        <label>Fullname: </label>
        <input
          name="fullName"
          onChange={(e: any) => setfullNameField(e.target.value)}
          defaultValue={editUser.fullName}
        />
        <label>Phonenumber: </label>
        <input
          name="Phonenumber"
          onChange={(e: any) => setPhoneNumberField(e.target.value)}
          defaultValue={editUser.phoneNumber}
        />
        <label>Role: </label>
        <input
          name="Role"
          onChange={(e: any) => setRoleField(e.target.value)}
          defaultValue={editUser.role}
        />
        <label>Email: </label>
        <input
          name="Email"
          onChange={(e: any) => setEmailField(e.target.value)}
          defaultValue={editUser.email}
        />

        <Button
          type="primary"
          onClick={saveUser}
          htmlType="submit"
          loading={buttonSaveLoading}
        >
          Save
        </Button>

        <Button
          type="primary"
          danger
          onClick={() => {
            handleDelete();
            successDelete();
          }}
          loading={buttonDeleteLoading}
        >
          Delete
        </Button>
        <Link to="/profile">Back</Link>
      </form>
    </div>
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
  width: "16rem",
};

export default EditUsers;
