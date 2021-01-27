import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "Are you sure you would like to delete?";
const EDIT = "EDIT";
const ERROR_SAVE = "We're sorry, something went wrong";
const ERROR_DELETE = "We're sorry, something went wrong on our end";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING, true);
    props.bookInterview(props.id, interview).then(() => {
      console.log("index!")
      transition(SHOW)
    }).catch(() => transition(ERROR_SAVE, true))
  };

  function deleteAppointment(id) {
    transition(DELETING, true)
    return props.cancelInterview(id).then(() => {
      transition(EMPTY)
    }).catch((err) => {
      console.error(err)
      transition(ERROR_DELETE, true)
    })
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === CONFIRM && (
        <Confirm 
          message={CONFIRM}
          onCancel={() => back()}
          onConfirm={() => (deleteAppointment(props.id))}
        />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === EDIT && (
        <Form 
          onCancel={back} 
          id={props.id}
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id} 
          student={props.interview.student}
          onSave={save} 
          edit={true}
          name={props.interview.student}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      { mode === CREATE && ( 
        <Form 
          onCancel={back}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (<Error message={ERROR_SAVE} onClose={back} />)}
      {mode === ERROR_DELETE && (<Error message={ERROR_DELETE} onClose={back} />)}
    </article>
  ) 
}
