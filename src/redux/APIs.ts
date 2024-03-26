const domainName = process.env.localhost;
// auth------------------------------------------------------
export const registerAPI = `${domainName}/users/register`;
export const signInAPI = `${domainName}/auth/login`;

// booking--------------------------------------------------
export const getRoomTypesAPI = `${domainName}/booking/room-types`;
export const createBookingAPI = `${domainName}/booking/create-booking`;
export const getBookingList = `${domainName}/booking/your-booking`;

// transection----------------------------------------------
export const insertTransection = `${domainName}/transection/create-transection`;
