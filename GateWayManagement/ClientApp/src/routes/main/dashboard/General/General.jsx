import { Card, Table, Row, Tabs, Col, Icon, Modal } from "antd";
import React, { Component } from "react";
import Auxiliary from "../../../../util/Auxiliary";

const TabPane = Tabs.TabPane;

const dataSource = [
  {
    key: "1",
    name: "Chickfool",
    rank: "1"
  },
  {
    key: "2",
    name: "3Ua",
    rank: "2"
  },
  {
    key: "3",
    name: "3Toan",
    rank: "3"
  },
  {
    key: "4",
    name: "3Huy",
    rank: "4"
  },
  {
    key: "5",
    name: "3Ba",
    rank: "5"
  },
  {
    key: "6",
    name: "Chickfool",
    rank: "6"
  },
  {
    key: "7",
    name: "3Ua",
    rank: "7"
  },
  {
    key: "8",
    name: "3Toan",
    rank: "8"
  },
  {
    key: "9",
    name: "3Huy",
    rank: "9"
  },
  {
    key: "10",
    name: "3Ba",
    rank: "10"
  }
];
const columns = [
  {
    title: "Hạng",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "Tài khoản",
    dataIndex: "name",
    key: "name"
  }
];

const dataSourceTop = [
  {
    key: "1",
    name: "Tặng 100% tiền giờ",
    rank: "1"
  },
  {
    key: "2",
    name: "Tặng 50% tiền giờ",
    rank: "2,3,4,5"
  },
  {
    key: "3",
    name: "Tặng 20% tiền giờ",
    rank: "6,7,8,9,10"
  }
];
const columnsTop = [
  {
    title: "Hạng",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "Phần thưởng",
    dataIndex: "name",
    key: "name"
  }
];

class General extends Component {
  state = {
    isOpenModalTop10: false
  };
  onTabChange = key => {
    console.log("key", key);
  };
  onQuestionClick = () => {
    const { isOpenModalTop10 } = this.state;
    this.setState({
      isOpenModalTop10: !isOpenModalTop10
    });
  };
  render() {
    const { isOpenModalTop10 } = this.state;
    return (
      <Auxiliary>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Card className="gx-card" title="Thông tin phòng máy">
              <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                <TabPane tab="Thông tin chung" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Nội quy" key="2">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Cấu hình" key="3">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Giá" key="4">
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Card
              className="gx-card"
              title={
                <React.Fragment>
                  <span style={{ float: "left" }}>Top 10 trong tháng</span>
                  <Icon
                    style={{ float: "left", marginLeft: "5px" }}
                    type="question-circle"
                    title="Thông tin phần thưởng"
                    onClick={this.onQuestionClick}
                  />
                </React.Fragment>
              }
            >
              <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                <TabPane tab="Nạp nhiều" key="1">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                  />
                </TabPane>
                <TabPane tab="Chơi nhiều" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Dịch vụ" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        <Modal
          width="60%"
          title="Thông tin phần thưởng top 10"
          visible={isOpenModalTop10}
          onOk={this.onQuestionClick}
          onCancel={this.onQuestionClick}
        >
          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab="Nạp nhiều" key="1">
              <Table
                dataSource={dataSourceTop}
                columns={columnsTop}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Chơi nhiều" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Dịch vụ" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Modal>
      </Auxiliary>
    );
  }
}
export default General;
