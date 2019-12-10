import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TimeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setContext: props.props.setContext, // Calls setContext everytime context is updated
            getContext: props.props.getContext, // Calls getContext in componentDidMount
            time: {"begin": null, "end": null},
            answer: {"begin": null, "end": null},
            // date: null, // TODO: for testing
        }

        this.convert_dict_to_dt = this.convert_dict_to_dt.bind(this);
        this.convert_context_to_time = this.convert_context_to_time.bind(this);
        this.convert_dt_to_dict = this.convert_dt_to_dict.bind(this);
        this.convert_time_to_context = this.convert_time_to_context.bind(this);

        this.setContextHelper = this.setContextHelper.bind(this);

        this.editBegin = this.editBegin.bind(this);
        this.editEnd = this.editEnd.bind(this);

        this.setAnswer = this.setAnswer.bind(this);
        this.editBeginAnswer = this.editBeginAnswer.bind(this);
        this.editEndAnswer = this.editEndAnswer.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);

        //this.setStartDate = this.setStartDate.bind(this);
    }

    convert_dict_to_dt(dict) {
        let date = new Date();
        date.setFullYear(dict["year"]);
        date.setMonth(dict["month"]);
        date.setDate(dict["day"]);
        date.setHours(dict["hour"]);
        date.setMinutes(dict["minute"]);
        
        return date;
    }

    convert_context_to_time(context) {
        let begin = null;
        let end = null;
        if("begin" in context && "end" in context){
            begin = this.convert_dict_to_dt(context["begin"]);
            end = this.convert_dict_to_dt(context["end"]);
        }
        
        return {
            "begin": begin,
            "end": end
        };
    }

    convert_dt_to_dict(dt) {
        return {
            "year": dt.getFullYear(),
            "month": dt.getMonth(),
            "day": dt.getDate(),
            "hour": dt.getHours(),
            "minute": dt.getMinutes()
        };
    }

    convert_time_to_context(time) {
        let begin = null;
        let end = null;
        if(time["begin"] !== null && time["end"] !== null){
            begin = this.convert_dt_to_dict(time["begin"]);
            end = this.convert_dt_to_dict(time["end"]);
        }
        return {
            "begin": begin,
            "end": end
        };

    }

    componentDidMount() {
        let context = this.state.getContext(); 
        if (this.props.props.getAnswer) {
            let answer = this.convert_context_to_time(this.props.props.getAnswer());
            this.setState({ answer: answer });
        }
        if (context !== undefined && context !== null) {
            let time = this.convert_context_to_time(this.state.getContext());
            this.setState({ time: time, });
        }
    }

    setContextHelper(newTime) {
        this.setState({ time: newTime, });
        let context = this.convert_time_to_context(newTime);

        this.state.setContext(context);
    }

    editBegin(date) {
        let newTime = {};
        newTime["end"] = this.state.time["end"];
        newTime["begin"] = date;
        this.setContextHelper(newTime);
    }

    editEnd(date) {
        let newTime = {};
        newTime["end"] = date;
        newTime["begin"] = this.state.time["begin"];
        this.setContextHelper(newTime);
    }

    setAnswer(newAnswer) {
        this.setState({ answer: newAnswer, });
        let answer = this.convert_time_to_context(newAnswer);

        this.props.props.setAnswer(answer);
    }

    editBeginAnswer(date) {
        let newAnswer = {};
        newAnswer["end"] = this.state.answer["end"];
        newAnswer["begin"] = date;
        this.setAnswer(newAnswer);
    }

    editEndAnswer(date) {
        let newAnswer = {};
        newAnswer["end"] = date;
        newAnswer["begin"] = this.state.answer["begin"];
        this.setAnswer(newAnswer);
    }

    renderMember() {
        if (this.state.role === 'member') {

            let begin = this.state.time["begin"];
            let minDate = new Date();
            let minTime = new Date();
            if(this.state.time["begin"] !== null){
                minDate.setFullYear(begin.getFullYear());
                minDate.setMonth(begin.getMonth());
                minDate.setDate(begin.getDate());
                minTime.setHours(begin.getHours());
                minTime.setMinutes(begin.getMinutes());
            }

            let end = this.state.time["end"];
            let maxDate = new Date();
            let maxTime = new Date();
            if(this.state.time["end"] !== null) {
                maxDate.setFullYear(end.getFullYear());
                maxDate.setMonth(end.getMonth());
                maxDate.setDate(end.getDate());
                maxTime.setHours(end.getHours());
                maxTime.setMinutes(end.getMinutes());
            }
            
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
    
    // just for testing
    // setStartDate(date) {
    //     this.setState({
    //         date: date,
    //     });
    // }

    render() {
        console.log(React.version)
        return (
            <div>
                {this.renderOrganizer()}
                {this.renderMember()}
                {this.renderLeader()}
                {/* <DatePicker selected={this.state.date} onChange={date => this.setStartDate(date)} /> */}
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

// import React from "react";
// import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";
 
// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
// class TimeInfo extends React.Component {

//   constructor(props) {
//       super(props);
//       this.state = {
//         startDate: new Date()
//       };
//       this.handleChange = this.handleChange.bind(this);
//   }
 
//   handleChange(date) {
//     this.setState({
//       startDate: date
//     });
//   };
 
//   render() {
//     return (
//       <DatePicker
//         selected={this.state.startDate}
//         onChange={date => this.handleChange(date)}
//       />
//     );
//   }
// }

// export default TimeInfo;