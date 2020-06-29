import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';
const reminder = action => {
	let { dueDate } = action;
	return {
		id: Math.floor(Math.random()*1000000),
		text: action.payload,
		dueDate
	}
}

const removeById = (state = [], id) => {
	const reminders = state.filter(reminder => reminder.id !== id);
	console.log('new reduced reminder', reminders);
	return reminders;
}

const reminders = (state = [], action) => {
	let reminders = null;
	state = read_cookie('reminders');
	switch(action.type) {
		case ADD_REMINDER:
			reminders = [...state, reminder(action)];
			bake_cookie('reminders', reminders);
			return reminders;
		case DELETE_REMINDER:
			reminders = removeById(state, action.payload);
			bake_cookie('reminders', reminders);
			return reminders;
		case CLEAR_REMINDERS:
			reminders = [];
			bake_cookie('reminders', reminders);
			return reminders;
		default:
			return state;
	}
}

export default reminders;