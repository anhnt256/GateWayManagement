import React, { Component } from 'react';
import EventItem from './components/EventItem';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { getListEvent } from './actions';

class Event extends Component {
  componentDidMount() {
    const { getListEventConnect } = this.props;
    getListEventConnect();
  }

  render() {
    const { gameReducer } = this.props;
    const { games } = gameReducer;
    return (
      <Row>
        {games.map((item, index) => (
          <Col span={8}>
            <EventItem item={item}/>
          </Col>
        ))}
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  gameReducer: state.game,
});

const mapDispatchToProps = {
  getListEventConnect: getListEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
