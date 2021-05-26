import { Component, CSSProperties } from "react";
import { Result, Button, Col, Row, Spin } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {}
interface State {
  hasError: boolean;
}
class LoadingPage extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  navigateBack = () => this.props.history.goBack();
  render() {
    return (
      <div style={ErrorPageStyle}>
        <div style={columnStyle}>
          <Spin size="large" />
        </div>
      </div>
    );
  }
}

export default withRouter(LoadingPage);

const ErrorPageStyle: CSSProperties = {
  height: "100vh",
  width: "100vw",
};

const columnStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
