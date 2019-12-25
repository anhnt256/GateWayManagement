import React, {Component} from "react";
import {Col, Row} from "antd";
import Auxiliary from "../../../../util/Auxiliary";
import ProfileHeader from "./components/ProfileHeader/index";
import Transaction from "./components/Transaction/Transaction";
import Contact from "./components/Contact";


class Profile extends Component {
  render() {
    return (
      <Auxiliary>
        <ProfileHeader/>
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <Transaction />
            </Col>
            <Col xl={8} lg={8} md={8} xs={8}>
              <Contact />
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

export default Profile;
