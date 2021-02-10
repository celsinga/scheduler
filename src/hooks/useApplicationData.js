import { useState, useEffect } from "react";

import axios from "axios";
import { getSpotsRemaining } from "helpers/selectors";

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
    const spotsRemaining = getSpotsRemaining(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);
    const day = {
      ...state.days[currentDayIndex],
      spots: spotsRemaining
    }
    const days = [
      ...state.days,
    ]
    days[currentDayIndex] = day

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(()=> {
      setState(prev => ({...prev, appointments, days}));
    })
  }

  //Cancel an Interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spotsRemaining = getSpotsRemaining(appointments, state.days, state.day);
    const currentDayIndex = state.days.findIndex(obj => obj.name === state.day);
    const day = {
      ...state.days[currentDayIndex],
      spots: spotsRemaining
    }
    const days = [
      ...state.days,
    ]

    days[currentDayIndex] = day

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      return setState(prev => {
        return { ...prev, appointments, days }
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
      setState(prevState => ({
        ...prevState,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

  return { state, setState, setDay, bookInterview, cancelInterview }
}