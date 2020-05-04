import React from 'react';
import { Col, Icon, Row } from 'antd';
import { formatCurrency } from '../../../../../../util/utils';
import { EnumRecipeGroup } from '../../../../../../constants/enum';

const CartItem = ({ dish, quantity, onQuantityAdd, onQuantityMinus }) => {
  const { name, sell_price, recipe_group } = dish;
  return (
    <Row>
      <Col span={14}>
        <Icon type="plus-square" style={{ cursor: 'pointer' }} onClick={onQuantityAdd} /> {quantity}
        <Icon
          type="minus-square"
          style={{ cursor: 'pointer', marginLeft: '3px', marginRight: '5px' }}
          onClick={onQuantityMinus}
        />
        <strong>{name}</strong>
      </Col>
      <Col span={10}>
        <span style={{ color: recipe_group === EnumRecipeGroup.WALLET.id ? '#18FF2B' : 'red' }}>
          {formatCurrency(sell_price)}
        </span>
      </Col>
    </Row>
  );
};
export default CartItem;
