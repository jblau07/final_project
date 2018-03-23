import React, { Component } from "react";
import { configure, BarcodePicker, ScanSettings, Barcode } from "scandit-sdk";
import { getByUpc } from "../actions/BarcodeAction";
import { connect } from "react-redux";

class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedUpc: null,
      scannedName: []
    };
    this.handleUpcSubmit = this.handleUpcSubmit.bind(this);
  }
  componentDidMount() {

    if(!localStorage.getItem('id')){
      this.props.history.push("/")
    }

    const engineLocation = "https://unpkg.com/scandit-sdk/build";
    configure(
      "AZ7LJzXLLmFWHbYP5xHr8VAEgAxmNGYcGnYoifpGSJrYfTInIQojdIJpKD0FSSi1bC5Ubjh0mGXLarfJZWNjfmAq/jeqIzh2amOBVudpvMVnYg3hx00GonlYsMyeWvW2P1jlS5FY0P5dBiRslDHxevdo9cNsQLFE4y/2kklgJ7sfi3M6RJ3wmqZRxEYrca9VvyUkxcLRCEPXES0mxoNtrmj2pmiUZbowpKpi3S+1Z6+W2lpOBDEcCogiajFAdLTa8IEvgnoJMcXlp3BvLFjK79c0Gv4B/Tr2XWh1vcYVuHNGom4ca7GiyVm1stDwTmD81nA3NK3E3epN9d5T3BjwNrWQRRl3QkFH77q6lshecqkrqFcZ3LFyGbZAcQEAh+U/UbnjmDkasXsKCd+X0ggieaZ6lEhDUFmEmkR9zSin/0Gw4k4xvC7PRkivpEYWBhoUUzMzdYtxgGk1Dx7aiBZKl6yLp27ooLz4Wy/Q8VRZCan9WXnapOx/maokalCmw3hqWFWaIijAWq6GWVK7RJ37u4HgjFyJAoOxhNTvFsKtNAduRRBkXWlMywA0iQBeaNB0QVOmpO0iFNyxQqlLzw+7zQ2oaH25ycVXuWotmPWXunkTOEH5DhbhdlolqN8vLuHV2tyjc1WJjT+ER7+tzV9KylK1HA5by41jxe3I8g0eqgTaDtAZZvs630ESbLAbUYm2lAnU9xXPiNA5iwtLpIo0/hcbfXK/Eg7BM0pcBk14gp1ZLI0EkIRsuE40I7Mh8eNOfw4UYczh3qXbzmUJ/UraLzdK2WF/dORCAEXAycnNECNxYl0sWfIGSdmH9Ikp",
      {
        engineLocation: engineLocation,
        preloadEngineLibrary: false,
        preloadCameras: false
      }
    );

    const scannerContainer = document.getElementById("scandit-barcode-picker");
    const resultContainer = document.getElementById("scandit-barcode-result");
    // const resultAfterApi = document.getElementById('result-after-api');
    // const continueButton = document.getElementById("continue-scanning-button");
    // continueButton.disabled = true;
    // continueButton.hidden = true;
    let picker;

    // create & start picker
    BarcodePicker.create(scannerContainer, {
      playSoundOnScan: true,
      vibrateOnScan: true,
      guiStyle: 2
    })
      .then(picker => {
        const scanSettings = new ScanSettings({
          enabledSymbologies: [
            "ean8",
            "ean13",
            "upca",
            "upce",
            "code128",
            "code39",
            "code93",
            "itf"
          ],
          codeDuplicateFilter: 1000
        });
        picker.applyScanSettings(scanSettings);

        picker.onScan(scanResult => {
          // continueButton.hidden = false;
          // continueButton.disabled = false;
          // picker.pauseScanning();
          // resultContainer.innerHTML = scanResult.barcodes.reduce((string, barcode) => {
          //   string + `${Scandit.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}<br>`
          // })
          console.log("scanResult.barcodes", scanResult.barcodes);
          resultContainer.innerHTML = `${scanResult.barcodes[0].symbology}: ${
            scanResult.barcodes[0].data
          }`;
          this.setState({ scannedUpc: scanResult.barcodes[0].data });
          this.props.getByUpc(this.state.scannedUpc);
          console.log(this.state);
        });

        picker.onScanError(error => {
          alert(error.message);
        });

        // picker.resumeScanning();
      })
      .catch(err => {
        console.log(err);
      });

    // const continueScanning = () => {
    //   if (picker) {
    //     continueButton.disabled = true;

    //     picker.resumeScanning();
    //   }
    // };
  }
  componentDidUpdate() {
    console.log("this.state", this.state);
    console.log("this.props", this.props.ingredient);
  }
  handleUpcSubmit() {
    this.props.getByUpc(this.state.scannedUpc);
  }
  //getByUpc
  render() {
    return (
      <div className="bc-scanner">
        <div id="scandit-barcode-picker" />
        <div id="scandit-barcode-result">No codes scanned yet</div>
        {/* <button onClick={this.handleUpcSubmit}>Submit</button> */}
        <div id="scandit-item-result">{this.props.ingredient.item_name}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredient: state.barcodeScanner.ingredient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getByUpc: upc => {
      dispatch(getByUpc(upc));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScanner);

//DO NOT DELETE!!!
// .fetch("https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json? format=json&q=butter&sort=n&max=25&offset=0&api_key=AGfEqQqGhphAHGNzD43BSzADNdKyC7oIyPt8ovVj&location=Denver+CO")
