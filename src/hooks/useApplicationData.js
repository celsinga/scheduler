import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(props) {
  //Set State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {

    },
    interviewers: {

    }
  });
  const setDay = day => setState({ ...state, day });

  //Schedule an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(()=> {
      setState(prev => ({...prev, appointments}));
      axios.get("/api/days")
      .then(days => {
        return setState(prev => ({...prev, days: days.data}))
      })
    })
  }
  //Cancel an Interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      return setState(prev => {
        return { ...prev }
      })
    })
    .then(() => {
      return axios.get(`/api/days`)
    })
    .then((data) => {
      setState({
        ...state,
        days: data.data
      })
    })
  }
  //GET DATA
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
  }, [state]);

  return { state, setState, setDay, bookInterview, cancelInterview }
}