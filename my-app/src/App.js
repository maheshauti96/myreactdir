import React, { Component } from 'react';
import myclasses from './App.css';
// import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  
  state ={
    person:[
          {id:'as' , name:'sumit',age:22 },
          {id:'sd' ,name:'mahesh',age:23},
          {id:'df' , name:'sagar',age:25}
        ]
  }
  
  switchNameHandler= (newname) =>
  {
    console.log("button clicked!!");

    this.setState({
      person:[
        { name:newname,age:22 },
        {name:'mahesh',age:23},
        {name:'sagar',age:30}
      ]

    })
  }

  nameChangeHandler= (event,personId) =>
  {
      const personIndex=this.state.person.findIndex(p =>{
        return p.id === personId;
      } )

     // const person=this.state.person[personIndex];//this return refferenece of array elment not value

        const person={   //create new object and spred operator to get value
          ...this.state.person[personIndex]
        };

        person.name=event.target.value;

        const persons=[...this.state.person];
        persons[personIndex]=person;
        
     this.setState({person:persons })
  }
  
  togglePersonHandle= ()=>
  {
      const doesShow=this.state.showPersons;
      this.setState({showPersons: !doesShow})
  }

  deletePersonHandler=(personindex)=>
  {
      //const person=this.state.person; dont use this approch it takes pointer
      //const person=this.state.person.slice();//it copies all element person array to const person
       const person=[...this.state.person];//spread operator to copy array elemment
       person.splice(personindex,1);
      this.setState({person:person});
  }

  render() 
  {

      let Persons=null;
      let btnclass= '';
      if(this.state.showPersons)
      {
          Persons=(
                <div>
                  {
                     this.state.person.map((person,index) => {
                     return <ErrorBoundary><Person 
                          name={person.name} 
                          age={person.age}
                          click={()=>this.deletePersonHandler(index)}
                          key={person.id}
                          changed={(event)=>this.nameChangeHandler(event,person.id)}
                          />   </ErrorBoundary>  
                    })
                  }
                </div> );
            
              btnclass =myclasses.red;
      }

 let classes = [];
 if(this.state.person.length<=2){
   classes.push(myclasses.red);

 }
 if(this.state.person.length<=1){
   classes.push(myclasses.bold);
 }
   
 return(
   
      <div className={myclasses.App}>
        <h1>hi , i am the react </h1>
        <p className={classes.join(' ')}>this is working</p>
        <button
        className={btnclass} onClick={this.togglePersonHandle}/*{this.switchNameHandler.bind(this,'Maximelian')}*/>Toggle person</button>
         {Persons}

          
      </div>
     

      //return  React.createElement('div',{className:'App'},React.createElement('h1',null,'does this work now'));
    );
  }
}

export default App;
