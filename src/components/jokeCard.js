import React,{Component} from "react";
import './joke-component.scss'
class JokeCard extends Component {
  constructor(props) {
    super(props);
    this.translate=this.translate.bind(this);
    this.translateToEnglish=this.translateToEnglish.bind(this);
    this.translateToRobbers=this.translateToRobbers.bind(this);
    this.state = {
      trans: 0,
      jokes: this.props.jokes.joke?this.props.jokes.joke: this.props.jokes.setup + this.props.jokes.delivery,
      type:this.props.jokes.type,
      robs:""
    }
  }

  static getDerivedStateFromProps(nextProps){
    return {
       jokes: nextProps.jokes.joke ? nextProps.jokes.joke :nextProps.jokes.setup + nextProps.jokes.delivery,
       type:nextProps.jokes.type
   };
 }




isConsonant(letter) {
  return ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"].indexOf(letter.toLowerCase()) !== -1
}

translateToRobbers(text){
  let translatedString = "";
  for (let i = 0; i < text.length; i++) {
    if (this.isConsonant(text.charAt(i))) {
      translatedString += text.charAt(i) + "o" + text.charAt(i);
    } else {
      translatedString += text.charAt(i);
    }
  }
  this.setState({
    robs: translatedString,
    trans:1
  })
}

translateToEnglish(text){
  let translatedString = "";
  for (let i = 0; i < text.length; i++) {
    if (this.isConsonant(text.charAt(i))) {
      translatedString += text.charAt(i);
      i += 2;
    } else {
      translatedString += text.charAt(i);
    }
  }
  this.setState({
    jokes: translatedString,
    trans:0
  })

}
  translate() {
    if (this.state.trans === 0) {
      this.translateToRobbers(this.state.jokes)
    }
    else {
      this.translateToEnglish(this.state.jokes)
    }
  }

render (){
  const {jokes,trans,robs} = this.state;
  return (
    jokes && <div className="card">
      <div className="card__body">
      { trans === 0 ? <h5>{jokes}</h5>:<h5>{robs}</h5>}
        <button type="submit" className="jokes" onClick={this.translate}>Translate</button>
      </div>
    </div>
  )
}

}
export default JokeCard;

