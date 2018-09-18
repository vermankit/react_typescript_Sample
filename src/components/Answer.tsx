import * as React from 'react';

export interface IAnswerProps {
    selectedNumbers : number[],
    unselectNumber : (num : number) => void

}

export const Answer :React.StatelessComponent<IAnswerProps> = (props : IAnswerProps) => {
      return <div className='col-2'>
        { 
              // tslint:disable-next-line:jsx-no-lambda
              props.selectedNumbers.map( (num : number, i : number) => <span key={i} onClick= { () => props.unselectNumber(num) }> {num}</span>)
        }
      </div>
}