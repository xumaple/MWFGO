import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../utility/textBox';

class TimeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setContext: props.props.setContext, // Calls setContext everytime context is updated
            getContext: props.props.getContext, // Calls getContext in componentDidMount
            answer: ''
        }

        this.editAnswer = this.editAnswer.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);
    }

    componentDidMount() {
        if (this.state.role === 'member' || this.state.role === 'leader') {
            this.setState({answer: this.state.getAnswer()});
        }
    }

    editAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.state.setAnswer(newAnswer);
    }

    renderMember() {
        if (this.state.role === 'member') {
            return (
                <div>
                    <TextBox
                        defaultValue=''
                        value={this.state.answer}
                        editValue={this.editAnswer}
                        limit={50}
                        updateValue={true}
                    />
                </div>
            );
        }
        else return '';
    }

    renderLeader() {
        return '';
    }

    renderOrganizer() {
        return '';
    }
    
    render() {
        return (
            <div>
                {this.renderOrganizer()}
                {this.renderMember()}
                {this.renderLeader()}
            </div>
        );
    }
}

TimeInfo.propTypes = {
    props: PropTypes.shape({
        role: PropTypes.string.isRequired,
        getAnswer: PropTypes.func,
        setAnswer: PropTypes.func,
    }).isRequired,
};

export default TimeInfo;






() => {
    const [startDate, setStartDate] = useState(
      setHours(setMinutes(new Date(), 30), 17)
    );
    return (
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        minTime={setHours(setMinutes(new Date(), 0), 17)}
        maxTime={setHours(setMinutes(new Date(), 30), 20)}
        minDate={new Date()}
        maxDate={addDays(new Date(), 5)}
        dateFormat="MMMM d, yyyy h:mm aa"
        showDisabledMonthNavigation
      />
    );
  };