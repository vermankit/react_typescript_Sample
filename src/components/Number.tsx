import * as _ from 'lodash';
import * as React from 'react';



export interface INumberProps {
    selectedNumbers : number[],
    usedNumners : number[],
    selectNumber : (num : number) => void

}

export class Numbers extends React.Component<INumberProps> {
    public arrayofNumber = _.range(1,10);
 
    public numberClassName = (num : number) => {
        if(this.props.usedNumners.indexOf(num) >= 0){
            return 'used';
        }

        if(this.props.selectedNumbers.indexOf(num) >= 0){           
            return 'selected';
        }
     //   alert(num);
        return "";
      };

     public handleClick = (event : any) => {    
        this.props.selectNumber(parseInt(event.currentTarget.textContent,0));
      }

    
      
    public render() {

        return   (<div  className='card text-center'>
                    <div>
                            {
                            this.arrayofNumber.map( (num :number,i : number) => <span key={i}  onClick={this.handleClick}  className={this.numberClassName(num)} >{num}</span>)
                                
                            }    
                    </div>
                    </div>)
         }
    // return(
    //     
    //     )        
    
}

// Numbers.list


