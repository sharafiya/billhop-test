import React, { Component } from "react";
import './translator-component.scss';
import Joke from "./joke-component";
class Translator extends Component {
    constructor(props){
        super(props);
        this.state = {
          english: "",
          robbers: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRobbers = this.handleRobbers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
      }
    
      isConsonant(letter){
        return ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"].indexOf(letter.toLowerCase()) !== -1
      }
    
      handleChange(event){
        this.setState({english: event.target.value});
      }
    
      handleRobbers(event){
        this.setState({robbers: event.target.value});
      }
    
      handleSubmit(event){
        let text = "";
        if (this.state.english === ""){
          text = this.state.robbers;
          this.translateToEnglish(text);
        } else {
          text = this.state.english;
          this.translateToRobbers(text);
        }
        event.preventDefault();
      }
    
      handleButton(event){
        this.setState({
          english: "",
          robbers: ""
        });
        event.preventDefault();
      }
    
      translateToRobbers(text){
        let translatedString = "";
    
        for (let i = 0; i < text.length; i++){
          if (this.isConsonant(text.charAt(i))){
            translatedString += text.charAt(i) + "o" + text.charAt(i);
          } else {
            translatedString += text.charAt(i);
          }
          
          this.setState({
            robbers: translatedString
          });
        }
      }
    
      translateToEnglish(text){
        let translatedString = "";
    
        for (let i = 0; i < text.length; i++){
          if (this.isConsonant(text.charAt(i))){
            translatedString += text.charAt(i);
            i += 2;
          } else {
            translatedString += text.charAt(i);
          }
          this.setState({
            english: translatedString
          });
        }
    
      }
    render (){
        const {english, robbers} = this.state;
        return(
        <div className="main">
            <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="search">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Text"
            value={english}
            onChange={this.handleChange}
          />
          <div className="button">
            <button
              className="but"
              type="submit"
            >
              Translate
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Rövarspråk"
            value={robbers} 
            onChange={this.handleRobbers}
          />
        </div>
        <div className="clear">
            <button
              className="clear-button"
              type="button"
              onClick={this.handleButton}
            >
              Clear
            </button>
          </div>
          </form>
          <Joke />
        </div>)
    }
}


export default Translator;