const domainName = process.env.localhost;

export const registerAPI = `${domainName}/users/register`;
export const signInAPI = `${domainName}/auth/login`;

export const getRoomTypesAPI = `${domainName}/booking/room-types`;
export const createBookingAPI = `${domainName}/booking/create-booking`;
export const getBookingList = `${domainName}/booking/your-booking`;
