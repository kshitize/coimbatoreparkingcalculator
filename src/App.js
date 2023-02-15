import React, { useState } from "react";
import "./App.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function App() {
  const [selectedEntryDateTime, setSelectedEntryDateTime] = useState(null);
  const [selectedExitDateTime, setSelectedExitDateTime] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState();
  let enterDateTimeString = "";
  let exitDateTimeString = "";
  let totalParkingHours = 0;
  let totalParkingAmount = 0;

  function hoursBetween(d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    const difference = d2 - d1;
    return difference / 3600000;
  }

  //console.log(hoursBetween("2022-01-01 12:00:00", "2022-01-02 14:00:00"));

  if (selectedEntryDateTime != null) {
    const enterdatetime = selectedEntryDateTime["_d"];
    const enterdate = enterdatetime
      .toLocaleString()
      .slice(0, 9)
      .replaceAll("/", "-");
    const entertime = enterdatetime.toString().slice(15, 25);
    enterDateTimeString = enterdate.concat(" ", entertime);
    //console.log(enterDateTimeString)s
  }
  if (selectedExitDateTime != null) {
    const exitdatetime = selectedExitDateTime["_d"];
    const exitdate = exitdatetime
      .toLocaleString()
      .slice(0, 9)
      .replaceAll("/", "-");
    const exittime = exitdatetime.toString().slice(15, 25);
    exitDateTimeString = exitdate.concat(" ", exittime);
    //console.log(exitDateTimeString)
  }

  totalParkingHours = hoursBetween(enterDateTimeString, exitDateTimeString);
  console.log("Parking Time",totalParkingHours);
  console.log("Vehicle Type", selectedVehicleType);

  if(selectedVehicleType=="Car"){
    if(totalParkingHours<=0.5){
      totalParkingAmount = 20;
    }
    if(0.5<totalParkingHours<=2){
      totalParkingAmount = 55;
    }
    if(2<totalParkingHours<=7){
      totalParkingAmount = 55 + (totalParkingHours-2)*10;
    }
    if(7<totalParkingHours<=24){
      totalParkingAmount = 165;
    }
    if(24<totalParkingHours){
      totalParkingAmount = Math.ceil(totalParkingHours/24)*165;
    }
  }
    else if(selectedVehicleType=="SUV"){
      if(totalParkingHours<=0.5){
        totalParkingAmount = 30;
      }
      if(0.5<totalParkingHours<=2){
        totalParkingAmount = 60;
      }
      if(2<totalParkingHours<=7){
        totalParkingAmount = 60 + (totalParkingHours-2)*10;
      }
      if(7<totalParkingHours<=24){
        totalParkingAmount = 180;
      }
      if(24<totalParkingHours){
        totalParkingAmount = Math.ceil(totalParkingHours/24)*180;
      }
    }
    else if(selectedVehicleType=="Bus/Tempo"){
      if(totalParkingHours<=0.5){
        totalParkingAmount = 30;
      }
      if(0.5<totalParkingHours<=2){
        totalParkingAmount = 70;
      }
      if(2<totalParkingHours<=7){
        totalParkingAmount = 70 + (totalParkingHours-2)*10;
      }
      if(7<totalParkingHours<=24){
        totalParkingAmount = 180;
      }
      if(24<totalParkingHours){
        totalParkingAmount = Math.ceil(totalParkingHours/24)*180;
      }
    }
    else if(selectedVehicleType=="2 Wheeler"){
      if(totalParkingHours<=0.5){
        totalParkingAmount = 10;
      }
      if(0.5<totalParkingHours<=2){
        totalParkingAmount = 15;
      }
      if(2<totalParkingHours<=7){
        totalParkingAmount = 15 + (totalParkingHours-2)*5;
      }
      if(7<totalParkingHours<=24){
        totalParkingAmount = 165;
      }
      if(24<totalParkingHours){
        totalParkingAmount = Math.ceil(totalParkingHours/24)*165;
      }
    }

  let inputPropsEnter = {
    placeholder: "In Date and Time....",
    disabled: false,
  };

  let inputPropsExit = {
    placeholder: "Out Date and Time....",
    disabled: false,
  };
  return (
    <>
    <img src="d1.png" className="rounded mx-auto d-block" alt="Image"></img>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bs-secondary-bg text-break">
        <div className="container-fluid">
          <h5 className="navbar-brand rounded mx-auto d-block">
            <b>Coimbatore Parking Calculator</b>
          </h5>
        </div>
      </nav>
      <br></br>
      <h5 className="text-center input-group-text" id="addon-wrapping">Vehicle In Date & Time</h5>
      <Datetime
        dateFormat="DD-MM-YYYY"
        inputProps={inputPropsEnter}
        value={selectedEntryDateTime}
        onChange={(val) => {
          setSelectedEntryDateTime(val);
        }}
      />
      <br></br>
      <h5 className="input-group-text" id="addon-wrapping">Vehicle Out Date & Time</h5>
      <Datetime
        dateFormat="DD-MM-YYYY"
        inputProps={inputPropsExit}
        value={selectedExitDateTime}
        onChange={(val) => {
          setSelectedExitDateTime(val);
        }}
      />
      <br></br>

      <form>
      <label className="input-group-text" id="addon-wrapping" htmlFor ="cars">Choose your Vehicle Type:</label>
      <select className="input-group-text" name="cars" id="cars" value={selectedVehicleType} onChange={(val)=>{setSelectedVehicleType(val.target.value)}}>
      <option value="N/A">Select your Vehicle Type</option>
        <option value="Car">Car</option>
        <option value="SUV">SUV</option>
        <option value="Bus/Tempo">Bus/Tempo</option>
        <option value="2 Wheeler">2 Wheeler</option>
      </select>
      </form>
      <br></br>
      <br></br>

      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Parking for {selectedVehicleType} for {totalParkingHours} Hrs is Rs.
        </span>
        <span className="input-group-text" id="addon-wrapping">
          {totalParkingAmount} /-
        </span>
      </div>

      <div className="card">
 
  <div className="card-body mx-auto">
    <h6 className="text-center card-title mx-auto">Made By Team Coimbatore</h6>
    <a target="_blank" href="https://kshitize.github.io/#all" className="btn btn-primary">CJB Website</a>
  </div>
</div>
    </>
  );
}

export default App;
