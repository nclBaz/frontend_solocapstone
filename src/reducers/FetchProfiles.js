export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_APLICATION":
      // console.log(action.payload,"datat adeed")
      return {
        ...state,
        allAplication: action.payload,
      };
    default:
      return state;
  }
}
