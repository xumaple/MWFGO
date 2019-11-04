import React from 'react';
import MemberSurvey from './memberSurvey';

class Member extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let next_url = this.props.url + 'memberSurvey/';
        return(
            <div className='memberSurvey'>
                <p><b>Survey</b></p>
                <div><MemberSurvey url={next_url} /></div>
            </div>            
        );
    }
}

export default Member;
