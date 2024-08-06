import { Document, Model, Schema } from 'mongoose';
import mongoConnection from './mongoConnection';
import * as crypto from 'crypto';

export enum userRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}
export interface IUser {
  firstName: string;
  lastName: string;
  deleted: boolean;
  email: string;
  phone: string;
  avatar: string;
  organizationId: Schema.Types.ObjectId;
  password: string;
  role: userRoleEnum;
  isOwner: boolean;
}

const STATIC_SALT = 'staticSaltForHashing'; // Define your static salt here
const HASH_ITERATIONS = 10000;
const HASH_KEY_LENGTH = 64;
const HASH_ALGORITHM = 'sha512';

const hashPassword = (password: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      HASH_ITERATIONS,
      HASH_KEY_LENGTH,
      HASH_ALGORITHM,
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      },
    );
  });
};

export interface IUserDocument extends IUser, Document {
  isValidPassword(password: string): Promise<boolean>;
  delete(): Promise<IUserDocument>;
}

type IUserModel = Model<IUserDocument> & {
  findByEmail(
    email: string,
    organizationId?: string,
  ): Promise<IUserDocument[] | null>;
};

export const UserSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      set: (value: string) => value.toLowerCase(),
    },
    phone: { type: String, required: false },
    avatar: { type: String, required: false },
    deleted: { type: Boolean, default: false },
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Organization',
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, required: true, enum: userRoleEnum },
    isOwner: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        ret.fullName = `${ret.firstName} ${ret.lastName}`;
        ret.avatar = ret.avatar || 'https://avatar.iran.liara.run/public/boy';
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  },
);

UserSchema.methods.isValidPassword = async function (
  password: string,
): Promise<boolean> {
  return (await hashPassword(password, STATIC_SALT)) === this.password;
};

UserSchema.methods.delete = async function (): Promise<IUserDocument> {
  this.deleted = true;
  return this.save();
};

UserSchema.statics.findByEmail = function (
  email: string,
  organizationId?: string,
): Promise<IUserDocument[] | null> {
  const query: {
    email: string;
    deleted: boolean;
    organizationId?: string;
  } = {
    email,
    deleted: false,
  };
  if (organizationId) {
    query.organizationId = organizationId;
  }
  return this.find(query);
};

UserSchema.index({ email: 1 });
UserSchema.index({ organizationId: 1, email: 1 }, { unique: true });
UserSchema.index({ organizationId: 1, deleted: 1, role: 1 });

UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hashPassword(this.password, STATIC_SALT);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoConnection.model<IUserDocument, IUserModel>(
  'user',
  UserSchema,
  'User',
);

export default User;
