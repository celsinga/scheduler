import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
// import bookInterview from "components/Application"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}/>

      { mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SAVING && <Status message={SAVING} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
        />
      )}
      { mode === CREATE && ( 
      <Form onCancel={back} interviewers={props.interviewers} interviewer={props.interviewer} onSave={save} /> )}
    </article>
  ) 
}
