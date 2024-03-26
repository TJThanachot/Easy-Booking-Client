export type Register = {
  email: string;
  password: string;
  name: string;
  phone: string;
  nationality: string;
};

export type AlertMessage = {
  title: string;
  content: string;
};

export type CreateBooking = {
  check_in: Date;
  check_out: Date;
  total_people: number;
  description: string;
  price_per_night: number;
};

export type CreateTransection = {
  booking_id: number;
  paid_type_id: number;
  total_price: number;
  description: string;
};
