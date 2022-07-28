import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <Row style={{margin:"20px auto"}}>
        <Col sm={6} style={{display:'flex', justifyContent: 'center'}}>
            <h5><i className="fas fa-copyright" />&nbsp;Made by ARGHYA DEEP PAL</h5>
        </Col>
        <Col sm={6} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="outline-danger" href="mailto:ronipal07@gmail.com?subject=Feedback for MOVIES APP" target="_blank">FEEDBACK</Button>
        </Col>
    </Row>
  )
}

export default Footer;