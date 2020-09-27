import React, { Component } from 'react';
import { Container, Row, Col, Spinner  } from 'reactstrap';

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    };
  }

  static displayName = LoadingSpinner.name;

  componentDidMount() {

  }

  render () {
    return (
        <Container>
          <Row>
            <Col className='text-center'>
              <Spinner color="light" />
            </Col>
          </Row>
        </Container>
    )
  }
}

export default LoadingSpinner;