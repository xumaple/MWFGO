import React from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Traits from './traits';
import Limiters from './limiters';

class Organizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Container>
                <div className='survey'>
                    <p><b>Traits</b></p>
                    <div><Traits url={this.props.url.concat('traits/')} /></div>
                    {/* <p><b>Limiters</b></p>
                    <div><Limiters url={`${this.props.url}limiters/`} /></div> */}
                </div>
            </Container>        
        );
    }
}

export default Organizer;