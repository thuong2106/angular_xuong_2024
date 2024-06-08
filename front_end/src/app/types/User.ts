export type User = {
  email: string;
  role: string;
  name: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type UserLoginRes = {
  token: string;
  user: {
    _id: string;
    email: string;
    role: string;
    name: string;
  };
};
