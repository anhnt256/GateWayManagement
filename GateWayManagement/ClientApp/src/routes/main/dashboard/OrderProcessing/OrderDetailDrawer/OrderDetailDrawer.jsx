import React, { Component } from 'react';
import { Button, Modal, Drawer, Row, Col } from 'antd';

import './OrderDetailDrawer.css';
import { getListOrder, getListOrderDetail } from '../actions';
import { connect } from 'react-redux';
import { EnumRecipeGroup } from '../../../../../constants/enum';

class OrderDetailDrawer extends Component {
  render() {
    const { visible, onDrawerClose, orderReducer } = this.props;
    const { detail } = orderReducer;
    let total = 0;
    let totalTopUp = 0;
    return (
      <Drawer
        title="Xử lý đơn hàng"
        placement="right"
        visible={visible}
        getContainer={false}
        width="900px"
        onClose={onDrawerClose}
      >
        <Row>
          <Col span={16}>Left</Col>
          <Col span={8}>
            {detail &&
              detail.length > 0 &&
              detail.map((item, index) => {
                const { quantity, recipe_name, recipe_group, sell_price } = item;
                if (recipe_group === EnumRecipeGroup.WALLET.id) {
                  totalTopUp += sell_price * quantity;
                }
                total += sell_price * quantity;
                return (
                  <Row key={index}>
                    <Col span={14}>{`${quantity} - ${recipe_name}`}</Col>
                    <Col span={10}>
                      <span style={{ color: recipe_group === EnumRecipeGroup.WALLET.id ? 'red' : 'green' }}>
                        {sell_price * quantity}
                      </span>
                    </Col>
                  </Row>
                );
              })}
            <React.Fragment>
              <Row>
                <Col span={14}>Tổng tiền</Col>
                <Col span={10}>{total}</Col>
              </Row>
              <Row>
                <Col span={14}>Đã thanh toán qua ví</Col>
                <Col span={10}>{total - totalTopUp}</Col>
              </Row>
              {totalTopUp > 0 && (
                <Row>
                  <Col span={14}>Phải thu</Col>
                  <Col span={10}>{totalTopUp}</Col>
                </Row>
              )}
            </React.Fragment>
          </Col>
        </Row>
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailDrawer);
