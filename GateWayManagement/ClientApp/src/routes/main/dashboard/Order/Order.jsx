import React, { Component } from 'react';
import { Affix, Button, Card, Col, Divider, Row, Tabs, Modal } from 'antd';
import ProductItem from './components/ProductItem/ProductItem';
import TopUpTransaction from '../Profile/components/Transaction/components/TopUpTransaction/TopUpTransaction';
import { getListEvent } from '../Event/actions';
import { connect } from 'react-redux';
import { getListRecipe } from './actions';
import { EnumRecipeGroup } from '../../../../constants/enum';
import { formatCurrency, getDescription } from '../../../../util/utils';
import CartItem from './components/CartItem/CartItem';

const TabPane = Tabs.TabPane;

class Order extends Component {
  state = {
    cart: {
      dishes: [],
      totalTopup: 0,
      totalOrder: 0,
    },
  };
  componentDidMount() {
    const { getListRecipeConnect } = this.props;
    getListRecipeConnect();
  }

  handleOrderClick = (dish) => {
    const { cart } = this.state;
    const cloneCart = { ...cart };
    const { userReducer } = this.props;
    const { money } = userReducer || {};
    const { totalOrder, totalTopup } = cart;
    const { sell_price, id, recipe_group } = dish;
    if (recipe_group !== EnumRecipeGroup.WALLET.id) {
      const newTotal = totalOrder + sell_price * 1;
      if (money < newTotal) {
        Modal.info({
          title: 'Thông báo',
          content: 'Số tiền trong ví không đủ để sử dụng. Vui lòng nạp thêm.',
        });
        return;
      }
      cloneCart.totalOrder = newTotal;
    } else {
      cloneCart.totalTopup = totalTopup + sell_price * 1;
    }
    const { dishes } = cloneCart;
    if (dishes && dishes.length > 0) {
      const index = dishes.findIndex((x) => x.dish.id === id);
      if (index !== -1) {
        dishes[index].quantity += 1;
      } else {
        cloneCart.dishes.push({
          dish,
          quantity: 1,
          note: '',
        });
      }
    } else {
      cloneCart.dishes.push({
        dish,
        quantity: 1,
        note: '',
      });
    }

    this.setState({
      cart: cloneCart,
    });
  };

  handleQuantityAdd = (id) => {
    const { cart } = this.state;
    const { totalOrder, totalTopup } = cart;
    const cloneCart = { ...cart };
    const { dishes } = cloneCart || {};
    const index = dishes.findIndex((x) => x.dish.id === id);
    const { dish } = dishes[index];
    const { sell_price, recipe_group } = dish || {};
    if (recipe_group !== EnumRecipeGroup.WALLET.id) {
      cloneCart.totalOrder = totalOrder + sell_price * 1;
    } else {
      cloneCart.totalTopup = totalTopup + sell_price * 1;
    }
    dishes[index].quantity = dishes[index].quantity + 1;
    this.setState({
      cart: cloneCart,
    });
  };

  handleQuantityMinus = (id) => {
    const { cart } = this.state;
    const { totalOrder, totalTopup } = cart;
    const cloneCart = { ...cart };
    const { dishes } = cloneCart || {};
    const index = dishes.findIndex((x) => x.dish.id === id);
    const { dish } = dishes[index];
    const { sell_price, recipe_group } = dish || {};
    dishes[index].quantity = dishes[index].quantity - 1;
    if (dishes[index].quantity === 0) {
      dishes.splice(index, 1);
    }
    if (recipe_group !== EnumRecipeGroup.WALLET.id) {
      cloneCart.totalOrder = totalOrder - sell_price * 1;
    } else {
      cloneCart.totalTopup = totalTopup - sell_price * 1;
    }
    this.setState({
      cart: cloneCart,
    });
  };

  handleSubmit = () => {
    const { cart } = this.state;
    console.log(cart);
  };

  render() {
    const { cart } = this.state;
    const { dishes, totalTopup, totalOrder } = cart || {};
    const { recipeReducer } = this.props;
    const { recipes } = recipeReducer || {};
    return (
      <Row>
        <Col xl={16} md={16} sm={16}>
          <Tabs defaultActiveKey={EnumRecipeGroup.HOURS.id}>
            {recipes.map((recipeGroup) => {
              const { recipe_group, recipes } = recipeGroup;
              const name = getDescription(recipe_group, EnumRecipeGroup);
              return (
                <TabPane tab={name} key={recipe_group}>
                  <Row>
                    {recipes.map((recipe, index) => (
                      <Col key={index} xl={8} md={8}>
                        <ProductItem key={index} grid recipe={recipe} onOrderClick={this.handleOrderClick} />
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
        <Col xl={8} md={8} sm={8}>
          <Affix offsetTop={80}>
            <Card title="Giỏ hàng">
              {dishes.map((item, index) => {
                const { dish, quantity } = item;
                const { id } = dish || {};
                return (
                  <CartItem
                    key={index}
                    dish={dish}
                    quantity={quantity}
                    onQuantityAdd={() => this.handleQuantityAdd(id)}
                    onQuantityMinus={() => this.handleQuantityMinus(id)}
                  />
                );
              })}
              {dishes && dishes.length > 0 && (
                <React.Fragment>
                  <Divider />
                  <Row>
                    <Col span={14}>Tổng cộng:</Col>
                    <Col span={10}>{formatCurrency(totalTopup + totalOrder)}</Col>
                  </Row>
                  <Divider />
                  <Button onClick={this.handleSubmit} style={{ float: 'right' }}>
                    Gửi yêu cầu
                  </Button>
                </React.Fragment>
              )}
            </Card>
          </Affix>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  recipeReducer: state.recipe,
  userReducer: state.auth,
});

const mapDispatchToProps = {
  getListRecipeConnect: getListRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
