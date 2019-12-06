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
            time: {"begin": new Date(), "end": new Date()},
            answer: {"begin": new Date(), "end": new Date()},
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

    setContextHelper(newTime) {
        this.setState({ time: newTime, });
        this.state.setContext(newTime);
    }

    editBegin(date) {
        newTime = {};
        newTime["end"] = this.state.time["end"];
        newTime["begin"] = date;
        this.setContextHelper(newTime);
    }

    editEnd(date) {
        newTime = {};
        newTime["end"] = date;
        newTime["begin"] = this.state.time["begin"];
        this.setContextHelper(newTime);
    }

    setAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.props.props.setAnswer(newAnswer);
    }

    editBeginAnswer(date) {
        newAnswer = {};
        newAnswer["end"] = this.state.answer["end"];
        newAnswer["begin"] = date;
        this.setContextHelper(newAnswer);
    }

    editEndAnswer(date) {
        newAnswer = {};
        newAnswer["end"] = date;
        newAnswer["begin"] = this.state.answer["begin"];
        this.setContextHelper(newAnswer);
    }

    editAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.state.setAnswer(newAnswer);
    }

    renderMember() {
        if (this.state.role === 'member') {

            begin = this.state.time["begin"];
            minDate = new Date();
            minDate.setFullYear(begin.getFullYear())
            minDate.setMonth(begin.getMonth());
            minDate.setDate(begin.getDate());
            minTime = new Date();
            minTime.setHours(begin.getHours());
            minTime.setMinutes(begin.getMinutes());

            end = this.state.time["end"];
            maxDate = new Date();
            maxDate.setFullYear(end.getFullYear())
            maxDate.setMonth(end.getMonth());
            maxDate.setDate(end.getDate());
            maxTime = new Date();
            maxTime.setHours(end.getHours());
            maxTime.setMinutes(end.getMinutes());
            return (
                <div>
                    Minimum Date/Time: 
                    <DatePicker
                        selected={this.state.answer["begin"]}
                        onChange={date => this.editBeginAnswer(date)}
                        showTimeSelect
                        minDate={minDate}
                        minTime={minTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showDisabledMonthNavigation
                    />
                    Maximum Date/Time: 
                    <DatePicker
                        selected={this.state.answer["end"]}
                        onChange={date => this.editEndAnswer(date)}
                        showTimeSelect
                        maxDate={maxDate}
                        maxTime={maxTime}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showDisabledMonthNavigation
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
        if (this.state.role === 'organizer') {
            return (
                <div>
                    Minimum Date/Time: 
                    <DatePicker
                        selected={this.state.time["begin"]}
                        onChange={date => this.editBegin(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showDisabledMonthNavigation
                    />
                    Maximum Date/Time: 
                    <DatePicker
                        selected={this.state.time["end"]}
                        onChange={date => this.editEnd(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showDisabledMonthNavigation
                    />
                </div>
            );
        }
        else return '';
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