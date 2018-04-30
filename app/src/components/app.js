import React from "react";
import ReactDom from "react-dom";
import resume1 from "../images/resume1.png";
import resume2 from "../images/resume2.png";
import SingleInput from "./singleinput";
import TextArea from "./textarea";
import axios from "axios";
import downloader from "./download";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      objective: "",
      masterDegree: "",
      masterMarks: "",
      masterYear: "",
      masterUniversity: "",
      bachelorDegree: "",
      bachelorMarks: "",
      bachelorYear: "",
      bachelorUniversity: "",
      highSchoolDegree: "",
      highSchoolMarks: "",
      highSchoolYear: "",
      highSchoolUniversity: "",
      address: "",
      city: "",
      region: "",
      pincode: "",
      skills: [],
      phone: "",
      email: ""
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handlePincodeChange = this.handlePincodeChange.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleMasterMarksChange = this.handleMasterMarksChange.bind(this);
    this.handleMasterDegreeChange = this.handleMasterDegreeChange.bind(this);
    this.handleMasterYearChange = this.handleMasterYearChange.bind(this);
    this.handleMasterUniversityChange = this.handleMasterUniversityChange.bind(
      this
    );
    this.handleBachelorMarksChange = this.handleBachelorMarksChange.bind(this);
    this.handleBachelorDegreeChange = this.handleBachelorDegreeChange.bind(
      this
    );
    this.handleBachelorYearChange = this.handleBachelorYearChange.bind(this);
    this.handleBachelorUniversityChange = this.handleBachelorUniversityChange.bind(
      this
    );
    this.handleHighSchoolMarksChange = this.handleHighSchoolMarksChange.bind(
      this
    );
    this.handleHighSchoolDegreeChange = this.handleHighSchoolDegreeChange.bind(
      this
    );
    this.handleHighSchoolYearChange = this.handleHighSchoolYearChange.bind(
      this
    );
    this.handleHighSchoolUniversityChange = this.handleHighSchoolUniversityChange.bind(
      this
    );
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.handleImageClick1 = this.handleImageClick1.bind(this, "1");
    this.handleImageClick2 = this.handleImageClick2.bind(this, "2");
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
          email: jsonObj.email,
          phone: jsonObj.phone,
          objective: jsonObj.objective,
          masterDegree: jsonObj.masterDegree,
          masterMarks: jsonObj.masterMarks,
          masterYear: jsonObj.masterYear,
          masterUniversity: jsonObj.masterUniversity,
          bachelorDegree: jsonObj.bachelorDegree,
          bachelorMarks: jsonObj.bachelorMarks,
          bachelorYear: jsonObj.bachelorYear,
          bachelorUniversity: jsonObj.bachelorUniversity,
          highSchoolDegree: jsonObj.highSchoolDegree,
          highSchoolMarks: jsonObj.highSchoolMarks,
          highSchoolYear: jsonObj.highSchoolYear,
          highSchoolUniversity: jsonObj.highSchoolUniversity,
          address: jsonObj.location.address,
          city: jsonObj.location.city,
          region: jsonObj.location.region,
          pincode: jsonObj.location.postalCode,
          skills: jsonObj.skills
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFullNameChange(e) {
    const fullName = e.target.value;
    this.setState({
      name: fullName
    });
    console.log(`the new name is ${fullName}`);
  }

  handleEmailChange(e) {
    const emailId = e.target.value;
    this.setState({
      email: emailId
    });
    console.log(`the new email is ${emailId}`);
  }

  handlePhoneChange(e) {
    const phoneNumber = e.target.value;
    this.setState({
      phone: phoneNumber
    });
    console.log(`the new phone is ${phoneNumber}`);
  }

  handleMasterDegreeChange(e) {
    const masterDegreeName = e.target.value;
    this.setState({
      masterDegree: masterDegreeName
    });
    console.log(`the new  degree name is ${masterDegreeName}`);
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

  handleMasterUniversityChange(e) {
    const masterUniversityName = e.target.value;
    if (!masterUniversityName.length) return;
    this.setState({
      masterUniversity: masterUniversityName
    });
    console.log(`the new University  name is ${masterUniversityName}`);
  }

  handleMasterYearChange(e) {
    const masterYearNumber = e.target.validity.valid
      ? e.target.value
      : this.state.masterYear;
    if (Number(masterYearNumber) > 9999 && 4 !== masterYearNumber.length) {
      return;
    }
    this.setState({
      masterYear: masterYearNumber
    });
    console.log(`New Year is: ${masterYearNumber}`);
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
  handleBachelorUniversityChange(e) {
    const bachelorUniversityName = e.target.value;
    if (!bachelorUniversityName.length) return;
    this.setState({
      bachelorUniversity: bachelorUniversityName
    });
    console.log(`the new University  name is ${bachelorUniversityName}`);
  }

  handleBachelorYearChange(e) {
    const bachelorYearNumber = e.target.validity.valid
      ? e.target.value
      : this.state.bachelorYear;
    if (Number(bachelorYearNumber) > 9999 && 4 !== bachelorYearNumber.length) {
      return;
    }
    this.setState({
      bachelorYear: bachelorYearNumber
    });
    console.log(`New Year is: ${bachelorYearNumber}`);
  }
  handleHighSchoolDegreeChange(e) {
    const highSchoolDegreeName = e.target.value;
    this.setState({
      highSchoolDegree: highSchoolDegreeName
    });
    console.log(`the new  degree name is ${highSchoolDegreeName}`);
  }

  handleHighSchoolMarksChange(e) {
    const highSchoolMarksNumber = e.target.value;
    if (Number(highSchoolMarksNumber) > 100) {
      return;
    }
    this.setState({
      highSchoolMarks: highSchoolMarksNumber
    });
    console.log(`New marks are: ${highSchoolMarksNumber}`);
  }

  handleHighSchoolUniversityChange(e) {
    const highSchoolUniversityName = e.target.value;
    if (!highSchoolUniversityName.length) return;
    this.setState({
      highSchoolUniversity: highSchoolUniversityName
    });
    console.log(`the new University name is ${highSchoolUniversityName}`);
  }

  handleHighSchoolYearChange(e) {
    const highSchoolYearNumber = e.target.validity.valid
      ? e.target.value
      : this.state.highSchoolYear;
    if (
      Number(highSchoolYearNumber) > 9999 &&
      4 !== highSchoolYearNumber.length
    ) {
      return;
    }
    this.setState({
      highSchoolYear: highSchoolYearNumber
    });
    console.log(`New Year is: ${highSchoolYearNumber}`);
  }

  handleSkillChange(e) {
    const tmp = e.target.value;
    if (0 === tmp.length) return;
    const skillArray = tmp.split(",", 5);
    this.setState({
      skills: skillArray
    });
    console.log(`The new skills array is ${skillArray}`);
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

  handleImageClick1(param, e) {
    e.preventDefault();
    this.fetchJsonObj(param);
  }

  handleImageClick2(param, e) {
    e.preventDefault();
    this.fetchJsonObj(param);
  }

  handlePincodeChange(e) {
    const pin = e.target.validity.valid ? e.target.value : this.state.pincode;
    this.setState({
      pincode: pin
    });
    console.log(`The pincode has now become ${pin}`);
  }

  downloadPdf(e) {
    e.preventDefault();
    const { id } = this.state;
    console.log("download pdf " + id + " to be downloaded");
    axios
      .get(`http://localhost:9000/api/download/${id}`, { responseType: "blob" })
      .then(res => {
        downloader(res.data, "resume.pdf");
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const {
      id,
      name,
      address,
      city,
      pincode,
      region,
      objective,
      masterDegree,
      masterYear,
      masterUniversity,
      masterMarks,
      bachelorDegree,
      bachelorYear,
      bachelorUniversity,
      bachelorMarks,
      highSchoolDegree,
      highSchoolYear,
      highSchoolUniversity,
      highSchoolMarks,
      email,
      phone,
      skills
    } = this.state;
    const payLoad = {
      basics: {
        id: id,
        name: name,
        email: email,
        phone: phone,
        objective: objective,
        location: {
          address: address,
          postalCode: pincode,
          city: city,
          region: region
        },
        masterDegree: masterDegree,
        masterYear: masterYear,
        masterUniversity: masterUniversity,
        masterMarks: masterMarks,
        bachelorDegree: bachelorDegree,
        bachelorYear: bachelorYear,
        bachelorUniversity: bachelorUniversity,
        bachelorMarks: bachelorMarks,
        highSchoolDegree: highSchoolDegree,
        highSchoolYear: highSchoolYear,
        highSchoolUniversity: highSchoolUniversity,
        highSchoolMarks: highSchoolMarks,
        skills: skills
      }
    };
    this.postChanges(payLoad);
  }

  postChanges(payLoad) {
    const id = payLoad.basics.id;
    console.log(payLoad);
    axios
      .post(`/api/updatechanges/${id}`, payLoad)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
      masterYear,
      masterUniversity,
      masterMarks,
      bachelorDegree,
      bachelorYear,
      bachelorUniversity,
      bachelorMarks,
      highSchoolDegree,
      highSchoolYear,
      highSchoolUniversity,
      highSchoolMarks,
      email,
      phone,
      skills
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
                <img
                  src={resume1}
                  onClick={this.handleImageClick1}
                  alt="Resume for person 1"
                />
              </div>
              <div className="user-image">
                <img
                  src={resume2}
                  onClick={this.handleImageClick2}
                  alt="Resume for person 2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <form onSubmit={this.handleFormSubmit} className="container">
            <h3>Resume</h3>
            <div className="row">
              <SingleInput
                inputType={"text"}
                title={"FullName"}
                name={"name"}
                controlFunc={this.handleFullNameChange}
                content={name}
                pattern={".*"}
              />
              <SingleInput
                inputType={"email"}
                title={"Email"}
                name={"email"}
                controlFunc={this.handleEmailChange}
                content={email}
                pattern={".*"}
              />
              <SingleInput
                inputType={"text"}
                title={"Mobile"}
                name={"phone"}
                controlFunc={this.handlePhoneChange}
                content={phone}
                pattern={".*"}
              />
            </div>
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
                inputType={"text"}
                title={"Year"}
                name={"masteryear"}
                controlFunc={this.handleMasterYearChange}
                content={masterYear}
                pattern={"[0-9]*"}
              />
              <SingleInput
                inputType={"text"}
                title={"University"}
                name={"masteruniversity"}
                controlFunc={this.handleMasterUniversityChange}
                content={masterUniversity}
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
                inputType={"text"}
                title={"Year"}
                name={"bacheloryear"}
                controlFunc={this.handleBachelorYearChange}
                content={bachelorYear}
                pattern={"[0-9]*"}
              />
              <SingleInput
                inputType={"text"}
                title={"University"}
                name={"bacheloruniversity"}
                controlFunc={this.handleBachelorUniversityChange}
                content={bachelorUniversity}
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
            <div className="row">
              <SingleInput
                inputType={"text"}
                title={"HighSchool Degree"}
                name={"highschooldegree"}
                controlFunc={this.handleHighSchoolDegreeChange}
                content={highSchoolDegree}
                pattern={".*"}
              />
              <SingleInput
                inputType={"text"}
                title={"Year"}
                name={"highSchoolyear"}
                controlFunc={this.handleHighSchoolYearChange}
                content={highSchoolYear}
                pattern={"[0-9]*"}
              />
              <SingleInput
                inputType={"text"}
                title={"University"}
                name={"highSchooluniversity"}
                controlFunc={this.handleHighSchoolUniversityChange}
                content={highSchoolUniversity}
                pattern={".*"}
              />
              <SingleInput
                inputType={"number"}
                title={"Percentage"}
                name={"highSchoolmarks"}
                controlFunc={this.handleHighSchoolMarksChange}
                content={highSchoolMarks}
                pattern={".*"}
              />
            </div>

            <SingleInput
              inputType={"text"}
              title={"Skills (Upto 5, seperated by ',')"}
              name={"skill"}
              controlFunc={this.handleSkillChange}
              content={skills}
              pattern={".*"}
            />
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
              className="btn float-right"
              style={{
                color: "white",
                backgroundColor: "seagreen",
                borderColor: "green"
              }}
              value="Save"
            />
            <button
              className="btn btn-primary float-right"
              style={{ marginRight: "8px" }}
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
