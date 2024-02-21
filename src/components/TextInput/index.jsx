import { Component } from "react";

import './styles.css'

export class TextInput extends Component{
    render(){
        const {onChange, value} = this.props
        return (
            <>
            <input className="text-input" 
            onChange={onChange}
            type="search"
            value={value}
            placeholder="type your search" 
            />
            <br/><br/>
            </>
        )
    }
}