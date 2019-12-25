import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Modal, Row, Table, message, Tag, Drawer } from 'antd';
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
    wheelSpinning: false,
  };

  componentDidMount() {
    const { checkRoundConnect } = this.props;
    checkRoundConnect(1);
  }

  updateState = (wheelSpinning) => {
    this.setState({ wheelSpinning });
  };

  showModal = (type) => {
    const { isRuleModelOpen, isGiftModelOpen, wheelSpinning } = this.state;
    if (!wheelSpinning) {
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
    }
  };

  getResult = (gameId) => {
    const { wheelSpinning } = this.state;
    const { getResultConnect } = this.props;
    if (!wheelSpinning) {
      getResultConnect(gameId);
      this.showModal(2);
    }
  };

  onCopy = () => {
    message.success('Mã đã được copy vào bộ nhớ tạm. Vui lòng nhấn Ctrl + V để xem và sử dụng');
  };

  calcRound = (gameId) => {
    const { wheelSpinning } = this.state;
    const { calcRoundConnect } = this.props;
    if (!wheelSpinning) {
      calcRoundConnect(gameId);
    }
  };

  render() {
    const { isRuleModelOpen, isGiftModelOpen, wheelSpinning } = this.state;
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
                    <WinWheel round={round} wheelSpinning={wheelSpinning} updateState={this.updateState} />
                  </div>
                </div>
              </div>
              <div>
                <Row>
                  <Col span={6} className="linkContent">
                    <span style={{ cursor: 'pointer' }}>Lượt quay: {round}</span>
                  </Col>
                  <Col span={6} className="linkContent">
                    <span onClick={() => this.calcRound(1)} style={{ cursor: 'pointer' }}>
                      Cập nhật
                    </span>
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
        <Drawer
          title="THỂ LỆ CHƯƠNG TRÌNH"
          placement="right"
          closable={false}
          onClose={() => this.showModal(1)}
          visible={isRuleModelOpen}
        >
          <div style={{ marginTop: '10px', paddingRight: '5px', textAlign: 'justify' }}>
            <p>
              <span style={{ fontWeight: 'bold' }}>1. Thời gian khuyến mãi:</span> 24/12/2019 00:00 đến 01/01/2020 23:59
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>2. Hình thức khuyến mãi:</span> Quay số may mắn
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>3. Chi tiết nội dung khuyến mãi</span>
            </p>
            <p>
              Trong thời gian khuyến mãi, tất cả khách hàng chi tiêu 50,000 vnd (có cộng dồn) sẽ nhận được 1 lượt quay
              số, có cơ hội trúng một trong các giải thưởng sau:
            </p>
            <ul>
              <li>Miễn phí 1h chơi</li>
              <li>Miễn phí 2h chơi</li>
              <li>Miễn phí 5h chơi</li>
              <li>Một phần đồ ăn (*)</li>
              <li>Một phần nước uống (*)</li>
              <li>Tặng thêm 50% giờ chơi (**)</li>
              <li>Tặng thêm 100% giờ chơi (**)</li>
              <li>Tặng thêm 200% giờ chơi (**)</li>
            </ul>
            <p>
              <span style={{ fontWeight: 'bold' }}>Lưu ý:</span>
            </p>
            <ul>
              <li>(*): Một phần đồ ăn trị giá 19,000 vnd, một phần nước uống trị giá 10,000 vnd.</li>
              <li>
                (**): Giờ tặng thêm được áp dụng ở lần nạp tiền tiếp theo. Tối đa 2,000,000 vnd mỗi mã khuyến mãi.
              </li>
              <li>
                Nếu sử dụng các phần thức ăn / nuóc uống khác với giá cao hơn, quý khách vui lòng bù thêm phần chênh
                lệch. Số tiền dư sẽ không được hoàn trả hay sử dụng để quy đổi sang giờ chơi.
              </li>
            </ul>
            <p>
              <span style={{ fontWeight: 'bold' }}>4. Hình thức đổi thưởng</span>
            </p>
            <p>- Khách hàng gửi mã khuyến mãi cho thu ngân thông qua kênh giao tiếp tại net The GateWay.</p>
            <p>
              <span style={{ fontWeight: 'bold' }}>5. Các quy định khác</span>
            </p>
            <ul>
              <li>Chỉ áp dụng duy nhất một hình thức khuyến mãi tại cùng một thời điểm.</li>
              <li>
                Mã khuyến mãi được lưu giữ cho từng tài khoản, quý khách vui lòng tự bảo mật mã khuyến mãi của mình. The
                GateWay không xử lý các tình huống tranh chấp do để mất mã khuyến mãi.
              </li>
              <li>Chương trình có thể kết thúc sớm hơn thời gian dự kiến khi hết ngân sách khuyến mãi.</li>
              <li>Khi xảy ra tranh chấp, quyết định của The GateWay là quyết định cuối cùng.</li>
            </ul>
          </div>
        </Drawer>
        <Modal
          title="PHẦN THƯỞNG"
          visible={isGiftModelOpen}
          closable={false}
          style={{ left: '100px' }}
          footer={[
            <button className="btn btn-secondary" onClick={() => this.showModal(2)} type="button">
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
