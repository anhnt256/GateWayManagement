import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Modal, Row, Table, message, Tag } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './WinWhellGame.css';
import imgBackGroundGame from './images/bg-game.jpg';
import imgLuckyDraw from './images/quaysomayman.jpg';
import imgBackGroundVongQuay from './images/vongquay-bg.png';
import WinWheel from './components/WinWheel';
import { calcRound, checkRound, getResult } from './actions';

class WinWheelGame extends Component {
  state = {
    isRuleModelOpen: false,
    isGiftModelOpen: false,
  };

  componentDidMount() {
    const { checkRoundConnect } = this.props;
    checkRoundConnect(1);
  }

  showModal = (type) => {
    const { isRuleModelOpen, isGiftModelOpen } = this.state;
    switch (type) {
      case 1: {
        this.setState({
          isRuleModelOpen: !isRuleModelOpen,
        });
        break;
      }
      default: {
        this.setState({
          isGiftModelOpen: !isGiftModelOpen,
        });
      }
    }
  };

  getResult = (gameId) => {
    const { getResultConnect } = this.props;
    getResultConnect(gameId);
    this.showModal(2);
  };

  onCopy = () => {
    message.success('Mã đã được copy vào bộ nhớ tạm. Vui lòng nhấn Ctrl + V để xem và sử dụng');
  };

  calcRound = (gameId) => {
    const { calcRoundConnect } = this.props;
    calcRoundConnect(gameId);
  };

  render() {
    const { isRuleModelOpen, isGiftModelOpen } = this.state;
    const { gameResult } = this.props;
    const { gameResults, round } = gameResult;
    const resultColumns = [
      {
        title: 'Giải thưởng',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'isUsed',
        key: 'isUsed',
        render: (text, record) => {
          if (record.isUsed) {
            return <Tag color="red">Đã sử dụng</Tag>;
          } else {
            return (
              <React.Fragment>
                <CopyToClipboard text={record.code}>
                  <Tag color="green" onClick={this.onCopy}>
                    Sử dụng ngay
                  </Tag>
                </CopyToClipboard>
              </React.Fragment>
            );
          }
        },
      },
    ];
    return (
      <React.Fragment>
        <div className="page">
          <div className="page-content">
            <div className="game-container" style={{ backgroundImage: `url(${imgBackGroundGame})` }}>
              <div className="luckydraw-in">
                <Row>
                  <Col span={24}>
                    <div style={{ marginTop: '15px' }}>
                      <img
                        src={imgLuckyDraw}
                        alt="Quay số may mắn"
                        className="img-fluid d-block"
                        style={{ maxHeight: '200px', margin: '0 auto' }}
                      />
                    </div>
                  </Col>
                </Row>
                <div className=" text-center">
                  <div className="winwheel-container" style={{ backgroundImage: `url(${imgBackGroundVongQuay})` }}>
                    <WinWheel round={round} />
                  </div>
                </div>
              </div>
              <div>
                <Row>
                  <Col span={6} className="linkContent">
                    <span style={{ cursor: 'pointer' }}>Lượt quay: {round}</span>
                  </Col>
                  <Col span={6} className="linkContent">
                    <span onClick={() => this.calcRound(1)} style={{ cursor: 'pointer' }}>Cập nhật</span>
                  </Col>
                  <Col span={6} className="linkContent">
                    <span onClick={() => this.getResult(1)} style={{ cursor: 'pointer' }}>
                      Phần thưởng
                    </span>
                  </Col>
                  <Col span={6} className="linkContent">
                    <span onClick={() => this.showModal(1)} style={{ cursor: 'pointer' }}>
                      Thể lệ
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="THỂ LỆ"
          visible={isRuleModelOpen}
          closable={false}
          style={{ left: '100px' }}
          footer={[
            <button className="btn btn-secondary" onClick={() => this.showModal(1)} type="button">
              {' '}
              Đóng
            </button>,
          ]}
        >
          <h1>Danh sách quà có thể trúng</h1>
        </Modal>
        <Modal
          title="PHẦN THƯỞNG"
          visible={isGiftModelOpen}
          closable={false}
          style={{ left: '100px' }}
          footer={[
            <button className="btn btn-secondary" onClick={() => this.showModal(3)} type="button">
              {' '}
              Đóng
            </button>,
          ]}
        >
          <Row>
            <Col span={24}>
              <Table dataSource={gameResults} columns={resultColumns} />
            </Col>
          </Row>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  gameResult: state.gameResult,
});

const mapDispatchToProps = {
  getResultConnect: getResult,
  checkRoundConnect: checkRound,
  calcRoundConnect: calcRound,
};

export default connect(mapStateToProps, mapDispatchToProps)(WinWheelGame);
