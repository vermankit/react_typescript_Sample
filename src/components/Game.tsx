import * as _ from 'lodash';
import * as React from 'react';
import { Answer } from './Answer';
import { Button } from './Button';
import { Done } from './Done';
import { Numbers } from './Number';
import { Star } from './Star';


export class Game extends React.Component{       
       private static randomnumber = () => Math.floor(1+Math.random() * 9);
            
       public state = { selectedNumbers : [],
                        usedNumber : [],
                        // tslint:disable-next-line:object-literal-sort-keys
                        numberOfStars : Game.randomnumber(),
                        answerIsCorrect : null,
                        redraws : 5,
                        doneStatus : ""
                      };

       public setNumber = (num : never) => {
            if(this.state.selectedNumbers.indexOf(num) >= 0){
                return ;
            }
            this.setState((prevState : any)  => ({ answerIsCorrect : null,selectedNumbers : prevState.selectedNumbers.concat(num)}))

       }; 

       public unselectNumber = (num : never) => {
           
             this.setState((prevState : any) => ({ answerIsCorrect : null,selectedNumbers : prevState.selectedNumbers.filter((nums : any) => nums !== num) }))
       };

       public checkAnswer = () => {
           this.setState( (prevState : any ) => ({answerIsCorrect : (prevState.numberOfStars === prevState.selectedNumbers.reduce( (acc : number , n : number) => acc + n,0))}));

       };

       public acceptAnswer = () => {
        this.setState( (prevstate : any) => ({
            
            usedNumber : prevstate.usedNumber.concat(prevstate.selectedNumbers),
            // tslint:disable-next-line:object-literal-sort-keys
            selectedNumbers : [],
            answerIsCorrect : null ,
            numberOfStars : Game.randomnumber()
        }))

       }

       public redraw = () => {
           if(this.state.redraws === 0){
               return;
           }
          this.setState((prev : any ) => ({
            answerIsCorrect  : null,
            numberOfStars : Game.randomnumber(),
            selectedNumbers : []  ,
            // tslint:disable-next-line:object-literal-sort-keys
            redraws : prev.redraws - 1     
          }));
       }

       // tslint:disable-next-line:prefer-const
       
        public possibleCombinationSum = (arr : any ,n : any) =>  { 
        
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();         
         this.possibleCombinationSum(arr,n);
        }        // tslint:disable-next-line:one-variable-per-declaration
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:one-variable-per-declaration
        const listSize = arr.length;
        // tslint:disable-next-line:no-bitwise
        const combinationsCount = (1 << listSize)
        for (let i = 1; i < combinationsCount ; i++ ) {
          let combinationSum = 0;
          for (let j=0 ; j < listSize ; j++) {
            // tslint:disable-next-line:no-bitwise
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };

       public possibleSolution = (numberOfStars : number[] ,usedNumbers : number[]) => {
         const possibleNumbers = _.range(1,10).filter(num => usedNumbers.indexOf(num) === -1);

         return this.possibleCombinationSum(possibleNumbers,numberOfStars);

       };

      

       public updateDoneStatus = () => {
        this.setState( (prevState : any) => { 
           if(prevState.usedNumber.length === 9){
              return {doneStatus : "Done Nice"};
           }
           if(prevState.redraws === 0 &&  !this.possibleSolution(prevState.numberOfStars,prevState.usedNumber)){
             return {doneStatus : "Game Over"};
           }
           return;

         });
       };

        public render() {
            const {numberOfStars,selectedNumbers,answerIsCorrect,usedNumber,redraws,doneStatus} = this.state;
            return  (
                <div  className='container' >
                    <h1>Play Nine</h1>
                    <div className='row'>
                    <Star numberOfStar = {numberOfStars}/>
                    <Button redraws={redraws} redraw={this.redraw} acceptAnswer= {this.acceptAnswer} answerCorrect={answerIsCorrect} check = {this.checkAnswer} selectedNumbers= {selectedNumbers} />
                    <Answer  unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers}/>
                    </div>
                {doneStatus ?  <Done doneStatus={doneStatus}/> : <Numbers usedNumners={usedNumber} selectedNumbers ={selectedNumbers}  selectNumber={this.setNumber}/>}
                
                
                </div>

            );
        }

}