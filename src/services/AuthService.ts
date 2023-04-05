import { ICredential } from '../models/Auth';
import mongoService from './MongoService';

export enum AUTH_ERRORS {
  USER_EXIST,
  USER_NOT_FOUND,
  INVALID_PASSWORD,
}

type ReturnType = {
  error?: AUTH_ERRORS;
  errorMessage?: string;
  data?: any;
};

class AuthService {
  constructor() {}

  private COLLECTION_NAME = 'users';

  trimCredential(data: ICredential): ICredential {
    return {
      login: data.login.trim(),
      password: data.password.trim(),
    };
  }

  async register(data: ICredential): Promise<ReturnType> {
    data = this.trimCredential(data);

    const foundUser = await mongoService
      .getCollection<ICredential>(this.COLLECTION_NAME)
      .findOne({ login: data.login });

    if (foundUser) {
      return {
        error: AUTH_ERRORS.USER_EXIST,
        errorMessage: 'Пользователь с таким логином уже существует',
      };
    }

    const newUser = await mongoService
      .getCollection<ICredential>(this.COLLECTION_NAME)
      .insertOne(data);

    return {
      data: {
        _id: newUser.insertedId,
        ...data,
      },
    };
  }

  async getUser(data: ICredential): Promise<ReturnType> {
    data = this.trimCredential(data);

    const user = await mongoService
      .getCollection<ICredential>(this.COLLECTION_NAME)
      .findOne({ login: data.login });

    if (!user) {
      return {
        error: AUTH_ERRORS.USER_NOT_FOUND,
        errorMessage: 'Пользователь с таким логином не найден',
      };
    }

    if (user.password !== data.password) {
      return {
        error: AUTH_ERRORS.INVALID_PASSWORD,
        errorMessage: 'Неверный пароль',
      };
    }

    return { data: user };
  }

  async getAll(): Promise<ReturnType> {
    const users = await mongoService
      .getCollection<ICredential>(this.COLLECTION_NAME)
      .find()
      .toArray();

    const withoutPass = users.map((user) => ({
      _id: user._id,
      login: user.login,
    }));

    return { data: withoutPass };
  }
}

const authService = new AuthService();

export default authService;
