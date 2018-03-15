import React, { Component } from "react";
import Scandit from "scandit-sdk";

class BarcodeScanner extends Component {
  componentDidMount() {
    const engineLocation = "https://unpkg.com/scandit-sdk/build";
    Scandit.configure(
      "AXwrWT7LJXCLBRvfhh7ad0c9J06lD9UlAmBgaFJLoKYUQf7SqXBrid9VVZMrfBzDXzfmpERkuXcebQL3BW2JuV1IKSkIIe+OACUvQB1QWBrCVVhajGPVq51xuARna/3gSHVPYwlBSOfnXPrQ106OIVB39JobeZ5kbi0G4ch+23wcZ+9X9WX2KF15/+pYZxr3CkJterlHVmSdejzbNG5hlNN8VtYXM8tC716NmUtl3F2zLeyPXFKviA0yqSB7UvER/Xhv/393Dwi2Uy6mPlHq4VdWwDPVS6d9onLeLQtoQW9IfBLGMmBm2F5TA4e8YfqtGFAjdm4Wd8pJKMyS6DDlon6H+/I3EXUzMVuDQlSGHEXM72/w+1hqwRKJqTSTIIVPsESsLFoKxpWKmvbWydLoJSYwfqvgqCHfYvee9NsiQx11jYOAKThs8II0SkcmBeIFnFYxWzkKWxvp7QdStyJMOf1wphntH5DFrDJINn8Z9WwqjjlH/ppGXSz8c7XjV0nRbi5tqLgqSR1zaqarekd5WC/O85fOotmrJmP0Ud73LjKy8ymNVkRALgmeG5gEJBKvXCr0av6bzjDm2j7VESlMz2RZDxF5ysImeIXmdcOMbxZ0OWvcayHHRMEpvlYVgau2LpllvYyzUPwxqZzCZbm6thhGyJ4YsgjJKp1M5sQBW0eR7hwgspAHmGycf2bsvtk1qdD88LA+Z8LOahhCYqtOt7YAsKKJG6yP8eNcuvRniFriiH0MIxT84YcKPeAuFd0Iv0VEho3aSqGgrV80GUd38y2HSiPFCEE7Evf3gqYglvh475uetv22u+Pjf8Dw+FvYI5d+d2velY7rXiqOpTMsYUeFPGO8uiYBVtGfrXt++eHgQyarsmpAzeGWnWC6F7G4bg04XpxcrIIH1ekLplHSZq7XpuoKhArcym6uuKJ1ew4a3idBfIDpHIEZDbOiJs1tSwHku1+9UPAUGsggzTyNc67o0977QkfJkTzvuxmabY1gX+L70jwQZJSbr/A8Pw==",
      {
        engineLocation: engineLocation,
        preloadEngineLibrary: false,
        preloadCameras: false
      }
    );

    const scannerContainer = document.getElementById("scandit-barcode-picker");
    const resultContainer = document.getElementById("scandit-barcode-result");
    const continueButton = document.getElementById("continue-scanning-button");
    continueButton.disabled = true;
    continueButton.hidden = true;
    let picker;

    // create & start picker
    Scandit.BarcodePicker.create(scannerContainer, {
      playSoundOnScan: true,
      vibrateOnScan: true,
      guiStyle: 2
    })
      .then(picker => {
        const scanSettings = new Scandit.ScanSettings({
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
          continueButton.hidden = false;
          continueButton.disabled = false;
          // picker.pauseScanning();
          // resultContainer.innerHTML = scanResult.barcodes.reduce((string, barcode) => {
          //   string + `${Scandit.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}<br>`
          // })
          console.log("scanResult.barcodes", scanResult.barcodes);
          resultContainer.innerHTML = `${scanResult.barcodes[0].symbology}: ${
            scanResult.barcodes[0].data
          }`;
        });

        picker.onScanError(error => {
          alert(error.message);
        });

        // picker.resumeScanning();
      })
      .catch(err => {
        console.log(err);
      });

    const continueScanning = () => {
      if (picker) {
        continueButton.disabled = true;

        picker.resumeScanning();
      }
    };
  }
  render() {
    return (
      <div className="bc-scanner">
        <div id="scandit-barcode-picker" />
        <div id="scandit-barcode-result">No codes scanned yet</div>
        <button id="continue-scanning-button" onclick="continueScanning()">
          Continue Scanning
        </button>
      </div>
    );
  }
}
export default BarcodeScanner;
// .fetch("https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json? format=json&q=butter&sort=n&max=25&offset=0&api_key=AGfEqQqGhphAHGNzD43BSzADNdKyC7oIyPt8ovVj&location=Denver+CO")
