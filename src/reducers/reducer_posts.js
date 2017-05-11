import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // [action.payload.data.id] => Utilise la chaine de caractères "id" comme clé du nouveau couple clé-valeur et action.payload.data comme valeur. Ce nouveau couple est ajouté à la fin de l'objet, après l'ensemble des couples contenus dans l'objet state via l'expression "...state".
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
