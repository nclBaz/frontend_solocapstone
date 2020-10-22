export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_PROFILE":
      // console.log(action.payload,"datat adeed")
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
}
