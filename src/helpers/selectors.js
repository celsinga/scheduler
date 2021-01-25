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

export { getAppointmentsForDay, getInterview, getInterviewersForDay };