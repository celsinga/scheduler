import React, { useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  
  const mappedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewerForDay = getInterviewersForDay(state, state.day);

    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewerForDay} bookInterview={bookInterview} cancelInterview={cancelInterview}/> 
    )
  });

  useEffect(() => {
    const daysURL = axios.get(`/api/days`);
    const apptURL = axios.get(`/api/appointments`);
    const interURL = axios.get(`/api/interviewers`);
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
