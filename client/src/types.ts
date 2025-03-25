export interface UserDataFormType {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  rePassword?: string;
}

export interface ProductType {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  description: string;
  image: string;
  recommendList: string[]; // Array of User IDs
  owner: string; // User ID
}

export type ServerErrorMessage = {
  response: {
    data: {
      message: string;
    };
  };
};
