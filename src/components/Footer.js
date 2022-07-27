import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <Container>
        <div className="d-flex justify-content-between" style={{margin:"20px auto"}}>
            <h5><i className="fas fa-copyright" />&nbsp;Made by ARGHYA DEEP PAL</h5>
            <Button variant="outline-info" href="mailto:ronipal07@gmail.com?subject=Feedback for MOVIES APP" target="_blank">FEEDBACK</Button>
        </div>
    </Container>
  )
}

export default Footer