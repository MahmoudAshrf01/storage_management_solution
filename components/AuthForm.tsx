import React from "react";

type FormType = "sign-in" | "sign-up";

const ReactForm = ({ type }: { type: FormType }) => {
    return (
        <div>
            React Form component : {type}
        </div>
    )
}

export default ReactForm;