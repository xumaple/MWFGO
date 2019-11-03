import React from 'react';
import LeaderSurvey from './leaderSurvey';

class Leader extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='leaderSurvey'>
                <p><b>Survey</b></p>
                <div><LeaderSurvey url={`${this.props.url}leaderSurvey/`} /></div>
            </div>            
        );
    }
}

export default Leader;