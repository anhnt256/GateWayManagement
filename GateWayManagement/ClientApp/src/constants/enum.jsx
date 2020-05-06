/* eslint-disable import/first,consistent-return */
/* eslint-disable consistent-return */
import React from 'react';

export const EnumRecipeGroup = {
  WALLET: {
    id: 0,
    description: 'Nạp tiền',
  },
  HOURS: {
    id: 1,
    description: 'Nạp giờ',
  },
  DRINK: {
    id: 2,
    description: 'Nước uống',
  },
  FOOD: {
    id: 3,
    description: 'Đồ ăn',
  },
  COMBO: {
    id: 4,
    description: 'Combo',
  },
  CARD: {
    id: 5,
    description: 'Thẻ',
  },
};

export const EnumOrderStatus = {
  CANCEL: {
    id: 1,
    description: 'Đơn hàng bị hủy',
  },
  RECEIVED: {
    id: 2,
    description: 'Đơn hàng mới order',
  },
  PROCESSING: {
    id: 3,
    description: 'Đơn hàng được chấp nhận',
  },
  FINISHED: {
    id: 4,
    description: 'Đơn hàng đã thanh toán',
  },
};
