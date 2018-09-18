import * as _ from 'lodash';
import * as React from 'react';

export interface IStarProp {
        numberOfStar : number
}

export const Star : React.StatelessComponent<IStarProp> = (prop : IStarProp) => {
  // const numberOfStar = 1 +(Math.random() * 9);     
 //  const stars  = [];

//    for (let i = 0 ;i < numberOfStar; i++)
//    {
//       stars.push(<i key={i} className='fa fa-star' />);
//    }
return  <div className='col-8'>
                {_.range(prop.numberOfStar).map( i =>  <i key={i} className="fa fa-star"/>)}
        </div>  
        }