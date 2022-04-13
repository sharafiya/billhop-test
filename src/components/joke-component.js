import { Component } from "react";
import Checkbox from '@material-ui/core/checkbox'
class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClass: 'any',
            query: 'Any',
            blackList: [],
            jokes: [],
            modal: false
        }
    }

    render (){
        const {selectedClass , modal , jokes} = this.state;
        return(
            <div className="container">
            <div className="row">
                <div
                    className="block">
                    <div className="col-12">


                        <div className="col-6">
                            <h5>Categories</h5>


                            <div className={"any col-3 mx-auto text-start"}>
                                <input type="radio" className={"form-check-input"} name={"any"} id={"any"} checked={selectedClass === 'any' ? true : false} onChange={""} />
                                <label className={"form-check-label ms-2"} htmlFor={"any"}>Any</label>
                            </div>


                            <div className={"custom col-3 mx-auto text-start"}>
                                <input type="radio" className={"form-check-input"} name={"custom"} id={"custom"} checked={selectedClass === 'custom' ? true : false} onChange={""} />
                                <label className={"form-check-label ms-2"} htmlFor={"custom"}>Custom</label>
                                <div className={`custom-input-list text-start ${selectedClass === 'custom' ? '' : 'is-disabled'}`} onClick={""}>
                                    <Checkbox name={"Programming"} checkboxId={"Programming"} />
                                    <Checkbox name={"Miscellaneous"} checkboxId={"Miscellaneous"} />
                                    <Checkbox name={"Dark"} checkboxId={"Dark"} />
                                    <Checkbox name={"Pun"} checkboxId={"Pun"} />
                                    <Checkbox name={"Spooky"} checkboxId={"Spooky"} />
                                    <Checkbox name={"Christmas"} checkboxId={"Christmas"} />
                                </div>
                            </div>

                        </div>


                        <div className={"col-6"}>


                            <h5>Black Flags (Optional)</h5>
                            <div className={"black-list col-5 mx-auto text-start"} onClick={""}>
                                <Checkbox name={"nsfw"} checkboxId={"nsfw"} />
                                <Checkbox name={"religious"} checkboxId={"religious"} />
                                <Checkbox name={"political"} checkboxId={"political"} />
                                <Checkbox name={"racist"} checkboxId={"racist"} />
                                <Checkbox name={"sexist"} checkboxId={"sexist"} />
                                <Checkbox name={"explicit"} checkboxId={"explicit"} />
                            </div>
                        </div>
                    </div>
                    {/* <Modal show={modal} handleClose={""} jokes={jokes} /> */}
                    <div className={"col-12 justify-content-center d-flex"}>
                        <button className={"btn btn-primary mt-5"} onClick={""}>Get Some Jokes</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}