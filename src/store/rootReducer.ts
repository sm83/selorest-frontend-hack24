import { combineReducers } from "redux";

import profile from "./slices/profileSlice";
import categories from "./slices/categoriesSlice";

export default combineReducers({
	profile,
	categories,
});
