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
    title: "Số tiền",
    dataIndex: "money",
    key: "money"
  },
  {
    title: "Chi tiết",
    dataIndex: "detail",
    key: "detail",
    render: text => (
      <React.Fragment>
        {text.map(data => {
          const { name, quantity } = data;
          return <div>{`${quantity} - ${name}`}</div>;
        })}
      </React.Fragment>
    )
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
    money: "30,000",
    detail: [
      {
        name: "Mì xào trứng",
        quantity: 1
      },
      {
        name: "Sting",
        quantity: 1
      }
    ],
    status: "Đang xử lý"
  },
  {
    key: "2",
    createdate: "13-11-2019 19:10",
    money: "50,000",
    detail: [
      {
        name: "Mì xào bò",
        quantity: 1
      },
      {
        name: "Trứng thêm",
        quantity: 1
      },
      {
        name: "Sting",
        quantity: 1
      }
    ],
    status: "Thành công"
  },
  {
    key: "3",
    createdate: "13-11-2019 19:10",
    money: "500,000",
    detail: [
      {
        name: "Card mobile 500k",
        quantity: 1
      }
    ],
    status: "Hủy"
  }
];

const OrderTransaction = () => {
  return (
    <Table
      className="gx-table-responsive"
      columns={columns}
      dataSource={data}
    />
  );
};

export default OrderTransaction;
