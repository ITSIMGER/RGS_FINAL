// yesma hami 4 jana ko name r photo x hai

import React from "react";
import { CardImg, CardTitle, Row, Col, CardBody } from "reactstrap";
import "../index.css";

function About() {
  return (
    <div className="container page">
      <h1 className="mt-4"><strong>ABOUT US</strong></h1>
      <div className="mt-5">
        <Row>
          <Col sm="4">
            {/* <Card className="mb-4"> */}
            <CardImg src="assets/nepalgif1.gif" />
            <CardBody>
              <CardTitle>
                <strong class="name">
                <a className="tagko" href="https://imger.xyz" target="_blank" rel="noopener noreferrer" > 
                Utsav Regmi </a>
                </strong>
                <br />
               
              </CardTitle>
            </CardBody>
            {/* </Card> */}
          </Col>

          <Col sm="4">
            {/* <Card className="mb-4"> */}
            <CardImg src="assets/nepalgif1.gif" />
            <CardBody>
              <CardTitle>
                <strong class="name">
                <a className="tagko" href="https://imger.xyz" target="_blank" rel="noopener noreferrer">Sushan Kunwar </a>
                </strong>
                <br />
                
              </CardTitle>
            </CardBody>
            {/* </Card> */}
          </Col>

          <Col sm="4">
            {/* <Card className="mb-4"> */}
            <CardImg src="assets/nepalgif1.gif" />
            <CardBody>
              <CardTitle>
                <strong class="name">
                <a className="tagko" href="https://imger.xyz" target="_blank" rel="noopener noreferrer"> Swapnil Koirala</a>
                </strong>
                <br />
               
              </CardTitle>
            </CardBody>
            {/* </Card> */}
          </Col>          
        </Row>
        <Row>
          <Col sm="4">
            {/* <Card className="mb-4"> */}
            <CardImg src="assets/nepalgif1.gif" />
            <CardBody>
              <CardTitle>
                <strong class="name">
                <a className="tagko" href="https://imger.xyz" target="_blank" rel="noopener noreferrer"> Shupraj Siwakoti </a>
                </strong>
                <br />
               
              </CardTitle>
            </CardBody>
            {/* </Card> */}
          </Col>
</Row>
         

        
      </div>
    </div>
  );
}

export default About;



