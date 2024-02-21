import { Component } from "react";
import './styles.css'


export class Button extends Component{
    render(){
        const { text, onClick, disabled } = this.props;

        return(
            //Aqui sim é um evento sintético do React
            <button 
                disabled={ disabled } 
                className="button" 
                onClick={ onClick }
            > 
                {text}
            </button>
        )
    }
}