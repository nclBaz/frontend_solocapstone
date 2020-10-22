export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_DATA":
      console.log(action.payload, "datat adeed hkggjghgvb");
      return {
        ...state,
        registerWorker: action.payload,
      };
    default:
      return state;
  }
}
