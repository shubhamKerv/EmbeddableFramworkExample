import React from "react";
import { Task } from "../../organism/task-utilities/task.component";

export default ({ interactionId, onClickPhone }) => {
  return (
    <div style={{margin: '6rem 2rem 50px 2rem'}}>
      <Task taskId={interactionId} onClickPhone={onClickPhone} />
    </div>
  );
};