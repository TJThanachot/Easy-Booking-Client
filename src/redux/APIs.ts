const domainName = process.env.localhost;
// auth------------------------------------------------------
export const registerAPI = `${domainName}/users/register`;
export const signInAPI = `${domainName}/auth/login`;

// booking--------------------------------------------------
export const getRoomTypesAPI = `${domainName}/booking/room-types`;
export const createBookingAPI = `${domainName}/booking/create-booking`;
export const getBookingList = `${domainName}/booking/your-booking`;

//boking the lord room -----------------------------------------------
export const createBookingTheLordRoomAPI = `${domainName}/booking/create-booking/the-lord-room`;
export const getBookedTheLordRoomAPI = `${domainName}/booking/the-lord-room-booked`;

// transection----------------------------------------------
export const insertTransection = `${domainName}/transection/create-transection`;
