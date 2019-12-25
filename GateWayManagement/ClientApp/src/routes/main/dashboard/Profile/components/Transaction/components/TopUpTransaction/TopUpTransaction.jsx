import React from "react";
import { Table, Divider, Icon } from "antd";
import {BLUE, RED} from "../../../../../../../../constants/ThemeSetting";

const columns = [
  {
    title: "Thời gian",
    dataIndex: "createdate",
    key: "createdate"
  },
  {
    title: "Số tiền",
    dataIndex: "money",
    key: "money"
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: text => {
      if (text === "Thành công") {
        return <span style={{ color: BLUE }}>{text}</span>;
      } else {
        return <span style={{ color: RED }}>{text}</span>;
      }
    }
  }
];

const data = [
  {
    key: "1",
    createdate: "13-11-2019 19:10",
    money: "10,000",
    status: "Thành công"
  },
  {
    key: "2",
    createdate: "13-11-2019 19:10",
    money: "50,000",
    status: "Thành công"
  },
  {
    key: "3",
    createdate: "13-11-2019 19:10",
    money: "10,000,000",
    status: "Hủy"
  }
];

const TopUpTransaction = () => {
  return (
    <Table
      className="gx-table-responsive"
      columns={columns}
      dataSource={data}
    />
  );
};

export default TopUpTransaction;
