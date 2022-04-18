import { Component } from "react";
import Checkbox from "./checkbox";
import { Row, Col } from 'antd';
import './joke-component.scss';
import JokeDataService from '../services'
import JokeCard from "./jokeCard";
class Joke extends Component {
    constructor(props) {
        super(props);
        this.handleRadios=this.handleRadios.bind(this);
        this.handleCategory=this.handleCategory.bind(this);
        this.handleBlacklist=this.handleBlacklist.bind(this);
        this.handleType=this.handleType.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            selectedClass: 'any',
            blackList: [],
            jokes: [],
            checkedList:['Any'],
            type:["single","twopart"],
            search:"",
            amount:1,
            link:"",
            joke:{},
            translate :0,
            ifError:false,
            setError:""
        }
    }

    handleRadios = (e) => {
        e && e.target.id ==="any" ? 
        this.setState({selectedClass:'any',checkedList:['Any']}): this.setState({selectedClass:'custom',checkedList:[]});
    }

    handleCategory = (e,id) => {
        console.log(id,"id")
        let resultArray = []
     if(e.target.checked)  {   
        resultArray = this.state.checkedList.filter(CheckedId=>
            CheckedId !== e.target.id      
        )
        resultArray.push(e.target.id)
     }
     else                    
     {
        resultArray = this.state.checkedList.filter(CheckedId=>
            CheckedId !== e.target.id         
        )
     }
     this.setState({
        checkedList:resultArray
     }) 
    }

    handleBlacklist = (e,id) => {
        let resultArray = []
     if(e.target.checked)  {   
        resultArray = this.state.blackList.filter(CheckedId=>
            CheckedId !== e.target.id      
        )
        resultArray.push(e.target.id)
     }
     else                    
     {
        resultArray = this.state.blackList.filter(CheckedId=>
            CheckedId !== e.target.id         
        )
     }
     this.setState({
        blackList:resultArray
     }) 
    }

    handleType = (e) => {
        let val=[];
        if(e.target.checked)  {   
            val = this.state.type.filter(CheckedId=>
                CheckedId !== e.target.id      
            )
            val.push(e.target.id)
         }
         else                    
         {
            val = this.state.type.filter(CheckedId=>
                CheckedId !== e.target.id         
            )
         }
        this.setState({type:val})
    }

    onChangeValue(e) {
        const val = e.target.value;
        e.target.type ==="text" ?
        this.setState({ search: val }):this.setState({ amount: val ,setError:""})
      }

      handleSubmit() {
        const val = this.state.checkedList + `${this.state.blackList.length === 0 ? '' : 
        '?blacklistFlags=' + this.state.blackList.join(',')}`+
        `${this.state.type.length === 2 ? "" :this.state.blackList.length===0? '?type=' + this.state.type[0]:'&type=' + this.state.type[0]}`+
        `${this.state.search === "" ? "" : 
        this.state.blackList.length===0 || this.state.type.length !==2?'&contains=' + this.state.search:"?contains=" + this.state.search}`+
        `${this.state.amount === 1 ? "" :(this.state.blackList.length===0 || this.state.type.length !==2)?'?amount=' + this.state.amount:"&amount=" + this.state.amount}`
        console.log(this.state.blackList.length===0 || this.state.type.length !==2)
        console.log(val,"val")
        if(this.state.setError === ""){
        JokeDataService.getJoke(val) 
        .then((response) => {
          console.log(response.data)
        if(response.data.jokes){
            this.setState({
                jokes:response.data.jokes,
                joke:{}
            })
        }else{
            this.setState({
                joke: response.data,
                jokes:[]
              })
        }
         
          this.setState({
            ifError:response.data.error,
            error: response.data.message
          })
        })
        .catch((e) => {
          console.log(e);
        });
      }
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

    render() {
        const { selectedClass,amount ,type,search,jokes,joke,error,ifError} = this.state;
        console.log(jokes)
        return (
            <div className="joke">
              <h3>Joke of the day</h3>
                <Row className="row" justify="center">
                    <Col span={5} className="col">
                        <h5>Categories</h5>
                        <Col span={2} className="col-check">
                            <input type="radio" className="form-check-input" name={"any"} id={"any"} checked={selectedClass === 'any' ? true : false} onChange={this.handleRadios} />
                            <label className="form-check-label" htmlFor={"any"}>Any</label>
                        </Col>
                        <Col span={3} className="col-check">
                            <input type="radio" className="form-check-input" name={"custom"} id={"custom"} checked={selectedClass === 'custom' ? true : false} onChange={this.handleRadios} />
                            <label className="form-check-label" htmlFor={"custom"}>Custom</label>
                            <div id="category" onClick={this.handleCategory}>
                                <Checkbox name="Programming" checkboxId="Programming" disabled={selectedClass==="any"}/>
                                <Checkbox name="Misc" checkboxId="Miscellaneous" disabled={selectedClass==="any"} />
                                <Checkbox name="Dark" checkboxId="Dark"  disabled={selectedClass==="any"}/>
                                <Checkbox name="Pun" checkboxId="Pun"  disabled={selectedClass==="any"} />
                                <Checkbox name="Spooky" checkboxId="Spooky" disabled={selectedClass==="any"} />
                                <Checkbox name="Christmas" checkboxId="Christmas" disabled={selectedClass==="any"} />
                            </div>
                        </Col>

                    </Col>
                    <Col span={5} className="col">
                        <h5>Black Flags (Optional)</h5>
                        <Col span={4} id ="blackList" onClick={this.handleBlacklist}>
                            <Checkbox name={"nsfw"} checkboxId={"nsfw"} />
                            <Checkbox name={"religious"} checkboxId={"religious"} />
                            <Checkbox name={"political"} checkboxId={"political"} />
                            <Checkbox name={"racist"} checkboxId={"racist"} />
                            <Checkbox name={"sexist"} checkboxId={"sexist"} />
                            <Checkbox name={"explicit"} checkboxId={"explicit"} />
                        </Col>
                    </Col>
                    <Col span={5} className="col">
                        <h5>Joke Type</h5>
                        <Col span={4} onClick={this.handleType}>
                            <Checkbox name={"single"} checkboxId={"single"} checked={type.includes("single")?true:false} />
                            <Checkbox name={"twopart"} checkboxId={"twopart"} checked={type.includes("twopart")?true:false} />
                        </Col>
                    </Col>
                
                <Col span={3} className="col">
            <h5>Search String</h5>
                <input
            type="text"
            className="type-search"
            placeholder="Optional"
            value={search}
            onChange={this.onChangeValue}
          />
                </Col>
                <Col span={3} className="col">
            <h5>Amount of Jokes</h5>
                <input
            type="number"
            className="type-amount"
            placeholder=""
            min={1}
            max={10}
            value={amount}
            step={1}
            onChange={this.onChangeValue}
          />
                </Col>
                
                </Row>
                <Row className="get-but">

                    <button type= "submit" className="get" onClick={this.handleSubmit}>Get Jokes</button>
                </Row>
                <div className="box">
                {ifError ?<h4>{error}</h4>:jokes  && jokes.length > 0 ? jokes.map(jo => <JokeCard jokes={jo} />) :(joke.setup || joke.joke )&& <JokeCard jokes={joke}/>}
              </div>
              
            </div>

        )
    }
}

export default Joke;