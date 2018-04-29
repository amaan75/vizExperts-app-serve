import React from "react";
import ReactDom from "react-dom";
import avatar from "../images/avatar.jpg";
import SingleInput from "./singleinput";
import TextArea from "./textarea";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      objective: '',
      masterDegree:'',
      masterMarks: '',
      bachelorDegree:'',
      bachelorMarks: '',
      address: '',
      city: '',
      region: '',
      pincode: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handlePincodeChange = this.handlePincodeChange.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleMasterMarksChange = this.handleMasterMarksChange.bind(this);
    this.handleMasterDegreeChange = this.handleMasterDegreeChange.bind(this);
    this.handleBachelorMarksChange = this.handleBachelorMarksChange.bind(this);
    this.handleBachelorDegreeChange = this.handleBachelorDegreeChange.bind(
      this
    );
  }

  handleFullNameChange(e) {
    const fullName = e.target.value;
    this.setState({
      name: fullName
    });
    console.log(`the new name is ${fullName}`);
  }

  handleMasterDegreeChange(e) {
    const masterDegreeName = e.target.value;
    this.setState({
      masterDegree: masterDegreeName
    });
    console.log(`the new  degree name is ${masterDegreeName}`);
  }

  componentDidMount() {
    this.fetchJsonObj("1");
  }

  fetchJsonObj(id) {
    var jsonObj = "";
    axios
      .get(`http://localhost:9000/api/fetch/${id}`)
      .then(res => {
        jsonObj = res.data.basics;
        console.log(`${jsonObj.name}`);
        this.setState({
          id: jsonObj.id,
          name: jsonObj.name,
          objective: jsonObj.objective,
          masterDegree:jsonObj.masterDegree,
          masterMarks: jsonObj.masterMarks,
          bachelorDegree:jsonObj.bachelorDegree,
          bachelorMarks: jsonObj.bachelorMarks,
          address: jsonObj.location.address,
          city: jsonObj.location.city,
          region: jsonObj.location.region,
          pincode: jsonObj.location.postalCode
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleMasterMarksChange(e) {
    const masterMarksNumber = e.target.value;
    if (Number(masterMarksNumber) > 100) {
      return;
    }
    this.setState({
      masterMarks: masterMarksNumber
    });
    console.log(`New marks are: ${masterMarksNumber}`);
  }

  handleBachelorDegreeChange(e) {
    const bachelorDegreeName = e.target.value;
    this.setState({
      bachelorDegree: bachelorDegreeName
    });
    console.log(`the new  degree name is ${bachelorDegreeName}`);
  }

  handleBachelorMarksChange(e) {
    const bachelorMarksNumber = e.target.value;
    if (Number(bachelorMarksNumber) > 100) {
      return;
    }
    this.setState({
      bachelorMarks: bachelorMarksNumber
    });
    console.log(`New marks are: ${bachelorMarksNumber}`);
  }

  handleAddressChange(e) {
    const address = e.target.value;
    this.setState({
      address: address
    });
    console.log(`address changed to ${address}`);
  }

  handleCityChange(e) {
    const cityName = e.target.value;
    this.setState({
      city: cityName
    });
    console.log(`City changed to ${cityName}`);
  }

  handleRegionChange(e) {
    const regionName = e.target.value;
    this.setState({
      region: regionName
    });
    console.log(`Region changed to ${regionName}`);
  }

  handleObjectiveChange(e) {
    const careerObjective = e.target.value;
    this.setState({
      objective: careerObjective
    });
    console.log(`Career Objective changed to ${careerObjective}`);
  }

  handlePincodeChange(e) {
    const pin = e.target.validity.valid ? e.target.value : this.state.pincode;
    this.setState({
      pincode: pin
    });
    console.log(`The pincode has now become ${pin}`);
  }

  downloadPdf() {
    console.log("download pdf");
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {
      name,
      address,
      city,
      pincode,
      region,
      objective,
      masterDegree,
      masterMarks,
      bachelorDegree,
      bachelorMarks
    } = this.state;
    return (
      <div className="app-container">
        <div className="sidebar-left">
          {
            //main-sidebar-left
          }
          <div className="channels">
            <div className="channel">
              <div className="user-image">
                <img src={avatar} alt="empty avatar" />
              </div>
              <div className="channel-info">
                <h2>{name}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <form onSubmit={this.handleFormSubmit} className="container">
            <h3>Resume</h3>
            <SingleInput
              inputType={"text"}
              title={"FullName"}
              name={"name"}
              controlFunc={this.handleFullNameChange}
              content={name}
              pattern={".*"}
            />
            <TextArea
              title={"My Career Objective"}
              rows={"3"}
              resize={false}
              content={objective}
              name={"careerObjective"}
              controlFunc={this.handleObjectiveChange}
              placeholder={"Enter your Career Objective here"}
            />
            <div className="row">
              <SingleInput
                inputType={"text"}
                title={"Masters Degree"}
                name={"masterdegree"}
                controlFunc={this.handleMasterDegreeChange}
                content={masterDegree}
                pattern={".*"}
              />
              <SingleInput
                inputType={"number"}
                title={"Percentage"}
                name={"mastermarks"}
                controlFunc={this.handleMasterMarksChange}
                content={masterMarks}
                pattern={".*"}
              />
            </div>
            <div className="row">
              <SingleInput
                inputType={"text"}
                title={"Bachelors Degree"}
                name={"bachelordegree"}
                controlFunc={this.handleBachelorDegreeChange}
                content={bachelorDegree}
                pattern={".*"}
              />
              <SingleInput
                inputType={"number"}
                title={"Percentage"}
                name={"bachelormarks"}
                controlFunc={this.handleBachelorMarksChange}
                content={bachelorMarks}
                pattern={".*"}
              />
            </div>
            <SingleInput
              inputType={"text"}
              title={"Address"}
              name={"address"}
              controlFunc={this.handleAddressChange}
              content={address}
              pattern={".*"}
            />
            <SingleInput
              inputType={"text"}
              title={"City"}
              name={"city"}
              controlFunc={this.handleCityChange}
              content={city}
              pattern={".*"}
            />
            <SingleInput
              inputType={"text"}
              title={"State"}
              name={"state"}
              controlFunc={this.handleRegionChange}
              content={region}
              pattern={".*"}
            />
            <SingleInput
              inputType={"text"}
              title={"Pincode"}
              name={"pincode"}
              controlFunc={this.handlePincodeChange}
              content={pincode}
              pattern={"[0-9]*"}
            />
            <input
              type="submit"
              className="btn btn-primary float-right"
              value="Submit"
            />
            <button
              className="btn btn-link float-left"
              onClick={this.downloadPdf}
            >
              Download Pdf
            </button>
          </form>
        </div>
      </div>
    );
  }
}
