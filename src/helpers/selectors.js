export function getAppointmentsForDay(state, day) {
  let appointmentsArray = []

  const filteredDays = state.days.filter(i => i.name === day);
  if (filteredDays.length === 0) {
    return appointmentsArray;
  } else {
    console.log(filteredDays);
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