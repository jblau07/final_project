// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import { selectFromFridge } from "../actions/FridgeAction";

// class FridgeList extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }
// }

// handleOnChange(event) {

// }





// const mapStateToProps = state => {
//   return {
//     selected: state.fridge.selected
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     selectFromFridge: function (name)  {
//       dispatch(selectFromFridge(name))
//     }

//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(FridgeList)









// export const FridgeList = ({fridge}) => {
//   let data;
//   if (fridge.length === 0) {
//     return (
//       <div></div>
//     )
//   } else {
//     data = fridge.data;

//       return (
//         <ul className="userFridge">
//           {data.map((element,idx) => {
//             return (
//               <div className="ingredient_name">
//                 <p>{element.ingredients.name}</p>
//                 <button>Select</button>
//               </div>
//             )
//           })}
//               </ul>
//       );


//   }
// }

// export default FridgeList;