import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import { getListOrder, getListOrderDetail } from './actions';
import { formatCurrency } from '../../../../util/utils';
import OrderDetailDrawer from './OrderDetailDrawer/OrderDetailDrawer';
import { EnumOrderStatus, EnumRecipeGroup } from '../../../../constants/enum';

class OrderProcessing extends Component {
  state = {
    openOrderDetailModal: false,
  };

  componentDidMount() {
    const { getListOrderConnect } = this.props;
    getListOrderConnect();
  }

  handleDetailClick = async (id) => {
    const { getListOrderDetailConnect } = this.props;
    const result = await getListOrderDetailConnect(id);
    if (result === 0) {
      this.setState({ openOrderDetailModal: true });
    }
  };

  handleDrawerClose = () => {
    this.setState({ openOrderDetailModal: false });
  };

  render() {
    const { openOrderDetailModal } = this.state;
    const { orderReducer } = this.props;
    const { orders } = orderReducer || {};
    const columns = [
      {
        title: 'Máy',
        dataIndex: 'machine_name',
        key: 'machine_name',
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'total',
        key: 'total',
        render: (text, record) => <span>{formatCurrency(record.total)}</span>,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          const { status } = record;
          switch (status) {
            case EnumOrderStatus.CANCEL.id: {
              return <Tag color="#f50">{EnumOrderStatus.CANCEL.description}</Tag>;
            }
            case EnumOrderStatus.RECEIVED.id: {
              return <Tag color="#2db7f5">{EnumOrderStatus.RECEIVED.description}</Tag>;
            }
            case EnumOrderStatus.PROCESSING.id: {
              return <Tag color="#108ee9">{EnumOrderStatus.PROCESSING.description}</Tag>;
            }
            default: {
              return <Tag color="#87d068">{EnumOrderStatus.FINISHED.description}</Tag>
            }
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span style={{ cursor: 'pointer', color: 'green' }} onClick={() => this.handleDetailClick(record.id)}>
            Xử lý
          </span>
        ),
      },
    ];
    return (
      <React.Fragment>
        <Table dataSource={orders} columns={columns} />
        <OrderDetailDrawer visible={openOrderDetailModal} onDrawerClose={this.handleDrawerClose} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  orderReducer: state.order,
});

const mapDispatchToProps = {
  getListOrderConnect: getListOrder,
  getListOrderDetailConnect: getListOrderDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderProcessing);
