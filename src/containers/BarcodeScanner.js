import React, { Component } from "react";
import { configure, BarcodePicker, ScanSettings, Barcode } from "scandit-sdk";
import { getByUpc } from "../actions/BarcodeAction";
import { connect } from "react-redux";
import { api } from "../config";

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
    if (!localStorage.getItem("id")) {
      this.props.history.push("/");
    }

    const engineLocation = "https://unpkg.com/scandit-sdk/build";
    configure(api.barcode, {
      engineLocation: engineLocation,
      preloadEngineLibrary: false,
      preloadCameras: false
    });

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
      guiStyle: 2,
      enableTapToFocus: true,
      enableCameraSwitcher: true
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
        <header className="veiw-title">
          <h2>Barcode Scanner</h2>
        </header>
        <div id="scandit-barcode-picker" />
        <div id="scandit-barcode-result" />

        <p className="scandit-barcode-desc">
          <i className="fas fa-exclamation-circle" />
          <br />
          <br />
          Align barcode inside highlighted area to add the ingredient to your
          fridge.
        </p>

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
