import React, { Component } from 'react';
import { Col, Row, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { searchCode, useCode } from '../Event/components/games/WinWheel/actions';

const { Search } = Input;

class Exchange extends Component {
  state = {
    code: '',
  };
  onSearchClick = (value) => {
    const { searchCodeConnect } = this.props;
    this.setState({ code: value });
    searchCodeConnect(value);
  };

  useCode = async () => {
    const { code } = this.state;
    if (code !== '') {
      const { useCodeConnect } = this.props;
      await useCodeConnect(code);
      message.success('Đổi quà thành công');
    }
  };

  render() {
    const { gameResult } = this.props;
    const { result } = gameResult;
    const { name, isUsed } = result || {};
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            <Search
              placeholder="input search text"
              onSearch={(value) => this.onSearchClick(value)}
              style={{ width: 500 }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span>{name}</span>
          </Col>
        </Row>
        {!isUsed && (
          <Row>
            <Col span={24}>
              <Button type="primary" onClick={this.useCode}>
                Using Code
              </Button>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  gameResult: state.gameResult,
});

const mapDispatchToProps = {
  useCodeConnect: useCode,
  searchCodeConnect: searchCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
