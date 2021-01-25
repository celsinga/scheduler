import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
        // {
        //   id: 1,
        //   time: "12pm",
        // },
        // {
        //   id: 2,
        //   time: "1pm",
        //   interview: {
        //     student: "Lydia Miller-Jones",
        //     interviewer: {
        //       id: 1,
        //       name: "Sylvia Palmer",
        //       avatar: "https://i.imgur.com/LpaY82x.png",
        //     }
        //   }
        // },
        // {
        //   id: 2,
        //   time: "2pm",
        // },
        // {
        //   id: 3,
        //   time: "3pm",
        //   interview: {
        //     student: "D'Angelo Scott",
        //     interviewer: {
        //       id: 4,
        //       name: "Cohana Roy",
        //       avatar: "https://i.imgur.com/FK8V841.jpg",
        //     }
        //   }
        // },
        // {
        //   id: 3,
        //   time: "4pm",
        // },
        // {
        //   id: 4,
        //   time: "5pm",
        //   interview: {
        //     student: "Elon Musk",
        //     interviewer: {
        //       id: 3,
        //       name: "Mildred Nazir",
        //       avatar: "https://i.imgur.com/T2WwVfS.png",
        //     }
        //   }
        // },
        // {
        //   id: 4,
        //   time: "6pm",
        // },
        // {
        //   id: 5,
        //   time: "7pm",
        //   interview: {
        //     student: "Sade",
        //     interviewer: {
        //       id: 2,
        //       name: "Tori Malcom",
        //       avatar: "https://i.imgur.com/Nmx0Qxo.png",
        //     }
        //   }
        // }
      },
      interviewers: {
        // "1": {
        //   "id": 1,
        //   "name": "Sylvia Palmer",
        //   "avatar": "https://i.imgur.com/LpaY82x.png"
        // }
      }
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  
  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewerForDay = getInterviewersForDay(state, state.day);

    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewerForDay} /> 
    )
  });

  const daysURL = axios.get(`http://localhost:8001/api/days`);
  const apptURL = axios.get(`http://localhost:8001/api/appointments`);
  const interURL = axios.get(`http://localhost:8001/api/interviewers`);

  useEffect(() => {
    Promise.all([
      Promise.resolve(daysURL),
      Promise.resolve(apptURL),
      Promise.resolve(interURL)
    ]).then((all) => {
      setState({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
    <DayList days={state.days} day={state.day} setDay={setDay} />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
    </section>
      <section className="schedule">
        {mappedAppointments} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
