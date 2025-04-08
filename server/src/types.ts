export interface FormUserState {
  email: string;
  password: string;
}

export interface UserFormState {
  profilePicture?: string | Buffer;
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface ProductType {
  title: string;
  ingredients: string;
  instructions: string;
  description: string;
  image: string;
  recommendList?: string[]; // Array of User IDs
  owner: string; // User ID
}
