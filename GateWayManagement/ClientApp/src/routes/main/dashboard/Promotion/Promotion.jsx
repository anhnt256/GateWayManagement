import React, { Component } from "react";
import {Col, Row} from "antd";
import EventItem from "../Event/components/EventItem";

const events = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  }
];

class Promotion extends Component {
  render() {
    return (
      <Row>
        {events.map((item, index) => (
          <Col span={8}>
            <EventItem />
          </Col>
        ))}
      </Row>
    );
  }
}
export default Promotion;
