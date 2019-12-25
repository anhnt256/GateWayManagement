import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import Widget from '../../../../../components/Widget';
import { setCurrentGame } from '../actions';


class EventItem extends Component {
  playGame = async (gameId) => {
    const { setCurrentGameConnect, history } = this.props;
    await setCurrentGameConnect(gameId);
    history.push('/main/dashboard/event/game/win-wheel');
  };
  render() {
    const { item } = this.props;
    return (
      <Widget styleName="gx-widget-bg">
        <span className="gx-widget-badge">$20/month</span>
        <i className="icon icon-camera gx-fs-xlxl" />

        <h1 className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-3 gx-mb-sm-4">38,248 Photos</h1>
        <p>NEW PHOTOS ADDED THIS WEEK</p>
        <p>Now kickstart with your next design. Subscribe today and save $20/month</p>
        <Button className="gx-mb-1 gx-btn-warning" onClick={() => this.playGame(item.id)}>
          Chơi ngay
        </Button>
      </Widget>
    );
  }
}

const mapDispatchToProps = {
  setCurrentGameConnect: setCurrentGame,
};

export default withRouter(connect(null, mapDispatchToProps)(EventItem));
