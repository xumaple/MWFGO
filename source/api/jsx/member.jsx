import React from 'react';
import MemberSurvey from './memberSurvey';

class Member extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log('Hello');
        return(
            <div className='memberSurvey'>
                <p><b>Survey</b></p>
                <div><MemberSurvey url={`${this.props.url}memberSurvey/`} /></div>
            </div>            
        );
    }
}

export default Member;
