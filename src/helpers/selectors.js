function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];

  const filteredDays = state.days.filter(i => i.name === day);
  if (filteredDays.length === 0) {
    return appointmentsArray;
  } else {
    filteredDays.forEach((indivDay)=>{
      if(indivDay.name === day){
          indivDay.appointments.forEach((appt)=>{
              appointmentsArray.push(state.appointments[appt]);
          })
      }
  })
  return appointmentsArray;
  }
}

function getInterview(state, interview) {
  if (!interview || !state) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    const interviewer = state.interviewers[interviewerID];
    const student = interview.student;
    const result = {
    student,
    interviewer,
    };
    return result;
  }
}

function getInterviewersForDay(state, day) {
  const interviewers = [];
  const days = state.days.filter(dayX => dayX.name === day);
  const interviewersDay = days[0].interviewers;
  for (const interview in state.interviewers) {
    if (interviewersDay.includes(state.interviewers[interview].id)) {
      interviewers.push(state.interviewers[interview]);
    }
  }
  return interviewers.length ? interviewers : [];
}

function getSpotsRemaining(appointments, days, day) {
  let spots = 0
  const currentDay = days.find(obj => obj.name === day);
  currentDay.appointments.forEach(appointmentId => {
    if (!appointments[appointmentId].interview) {
      spots += 1;
    }
  })
  return spots;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay, getSpotsRemaining };