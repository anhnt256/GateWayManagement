import React, { Component } from "react";
import { Tabs } from "antd";
import Widget from "../../../../../../components/Widget";
import OrderTransaction from "./components/OrderTransaction/OrderTransaction";
import TopUpTransaction from "./components/TopUpTransaction/TopUpTransaction";
import EventTransaction from "./components/EventTransaction/EventTransaction";

const TabPane = Tabs.TabPane;

class Transaction extends Component {
  render() {
    return (
      <Widget
        title="Lịch sử"
        styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Nạp tiền" key="1">
            <div className="gx-mb-2">
              <TopUpTransaction />
            </div>
          </TabPane>
          <TabPane tab="Dịch vụ" key="2">
            <div className="gx-mb-2">
              <OrderTransaction />
            </div>
          </TabPane>
          <TabPane tab="Sự kiện" key="3">
            <div className="gx-mb-2">
              <EventTransaction />
            </div>
          </TabPane>
        </Tabs>
      </Widget>
    );
  }
}

export default Transaction;
