import React from "react";
import { Table, Divider, Icon } from "antd";
import { BLUE, RED } from "../../../../../../../../constants/ThemeSetting";

const columns = [
  {
    title: "Thời gian",
    dataIndex: "createdate",
    key: "createdate"
  },
  {
    title: "Chi tiết",
    dataIndex: "detail",
    key: "detail"
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
    detail: "Miễn phí 1h chơi",
    status: "Thành công"
  },
  {
    key: "2",
    createdate: "13-11-2019 19:10",
    detail: "Giảm 20,000 phí dịch vụ",
    status: "Thành công"
  },
  {
    key: "3",
    createdate: "13-11-2019 19:10",
    detail: "Tặng 100% khi nạp trên 100,000. Tối đa 500,000",
    status: "Thành công"
  },
  {
    key: "3",
    createdate: "13-11-2019 19:10",
    detail: "Tặng 30% khi nạp giờ chơi",
    status: "Thành công"
  }
];

const EventTransaction = () => {
  return (
    <Table
      className="gx-table-responsive"
      columns={columns}
      dataSource={data}
    />
  );
};

export default EventTransaction;
