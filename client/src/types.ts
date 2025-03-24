export interface UserDataFormType {
  username?: string;
  email: string;
  password: string;
  rePassword?: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export type ServerErrorMessage = {
  response: {
    data: {
      message: string;
    };
  };
};
