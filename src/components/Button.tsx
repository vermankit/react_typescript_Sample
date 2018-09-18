import * as React from 'react';


export interface IButtonProp {
    selectedNumbers : number[],
    check : () => void,
    answerCorrect : any,
    acceptAnswer : () => void,
    redraw : () => void,
    redraws : number
}

export const Button : React.StatelessComponent<IButtonProp> = (props : IButtonProp) => {
   let button;   
   switch(props.answerCorrect){
        case true :
          button = <button onClick={props.acceptAnswer} className="btn btn-success"><i className="fa fa-check"/></button>
        break;
        case false :
        button =  <button  className="btn btn-danger"><i className="fa fa-times"/></button>
        break;
        default :
        button = <button className="btn" onClick={props.check} disabled ={props.selectedNumbers.length === 0}>=</button>
        break;    
   }


return <div className="col-2 text-center">
         {button}
         <br/><br/>
         <button onClick={props.redraw} className="btn btn-warning btm-sm"><i className="fa fa-refresh"/>{props.redraws}</button>
       </div>


}