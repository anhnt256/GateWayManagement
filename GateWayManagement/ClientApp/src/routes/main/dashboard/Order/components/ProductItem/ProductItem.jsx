import React from 'react';
import {Button, InputNumber} from 'antd';
import StarRatingComponent from 'react-star-rating-component';

import IntlMessages from 'util/IntlMessages';
import { formatCurrency } from '../../../../../../util/utils';

const ProductItem = ({ recipe, grid, onOrderClick }) => {
  const { avatar, name, sell_price, description } = recipe;
  return (
    <div className={`gx-product-item  ${grid ? 'gx-product-vertical' : 'gx-product-horizontal'}`}>
      <div className="gx-product-image">
        <div className="gx-grid-thumb-equal">
          <span className="gx-link gx-grid-thumb-cover">
            <img alt={name} src="https://wieldy.g-axon.work/static/media/alarm-clock.ba431310.jpg" />
          </span>
        </div>
      </div>

      <div className="gx-product-body">
        <h3 className="gx-product-title">{name}</h3>
        <div className="ant-row-flex">
          <h4>{formatCurrency(sell_price)} </h4>
          {/*<h5 className="gx-text-muted gx-px-2">*/}
          {/*  <del>{mrp}</del>*/}
          {/*</h5>*/}
          {/*<h5 className="gx-text-success">{offer} off</h5>*/}
        </div>
        <p>{description}</p>
      </div>

      <div className="gx-product-footer">
        <Button variant="raised" onClick={() => onOrderClick(recipe)}>
          <IntlMessages id="eCommerce.addToCart" />
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
