import * as React from 'react'

export interface IDoneProps {
    doneStatus : string
}

export const Done : React.StatelessComponent<IDoneProps> = (props : IDoneProps) => {
    return (<div>{props.doneStatus }</div>)
}