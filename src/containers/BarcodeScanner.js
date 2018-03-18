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
    const engineLocation = "https://unpkg.com/scandit-sdk/build";
    configure(
      "AUjrmg3LFnsDOOOyBBnYXiIxYoXuBI5/11Flmz5inE/kcU5NOluYVn12511rRLDbGyXDyp95c75XX4cWGgJwPvIgpwTFDPeeb20+N+RZocFGed279h9HjkNXMFf2LDPtDGD3Yo8HHsYpBPCJ5LCfqRCYGIyDjKc8WdcuvyTjv2OmngxeWZh3o+h71t81qqkmGGusYKFnoDCEPero9wqQ1QbLKu0MBtFvwcn2Y/jF4/g4G9jYOKbK2TY8h4A2AfA1jLN62OQ9cg5Cqe5fotxi4Z0RfqYmbgB2LwJxs2bTpbbMOLWRommFrLDpHg+ELAM8pu34Lc1If2S4jUrWWk2hjbfCivp4Dg8RJjCBsgJrB7IuouV9pztvXLpVx7ox0GT5dEtrNZDIDyEm/cDJ/RFYENPCwoXKyYV08QeJcgChGX+lD1f6I7Aw4d5U+ayPZeEc/c2Ua5UdxdLzEu1nlyFVTkK2yQ3QS+k8xgMULXm8+F8KF/5Ib+HFMYZztY7k4fPz1qY/C84Hvu74w/NKmDrWcxGe78HLfWN/mvv86AoS8xOxhRA4sC2wDMUgV0RWPMPcbbQNd1XLJGGjlxR3wTou0kckKJ1qe4tv5DcEtfF/EeWfu7KVyFSbCpk71wLz2hodGBLfW3z3/fKdUE0eHA61H2iWSkuF1Qm9rENvuvThYGWlAEjgwnLA7vuS6HETVWPSe4nbq5DSmLmfejAxUB/V6ys3EVpq4EzC6/Yw0vggknpdRdL+SYNcJSIZlCx3dl0HyP13fZF/I0sCCnRrg90kknZszfEwPdpJ9465ahex+r46f2hpJSTj5e2toy6v",
      {
        engineLocation: engineLocation,
        preloadEngineLibrary: false,
        preloadCameras: false
      }
    );

    const scannerContainer = document.getElementById("scandit-barcode-picker");
    const resultContainer = document.getElementById("scandit-barcode-result");
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
        <button onClick={this.handleUpcSubmit}>Submit</button>
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
