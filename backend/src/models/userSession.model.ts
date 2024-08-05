import { Document, Model, Schema } from 'mongoose';
import mongoConnection from './mongoConnection';

export interface IUserSession {
  userId: string;
  organizationId: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUserSessionDocument extends IUserSession, Document {}

export interface IUserSessionModel extends Model<IUserSessionDocument> {}

export const UserSessionSchema: Schema<IUserSessionDocument> = new Schema(
  {
    userId: { type: String, required: true },
    organizationId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  },
);

UserSessionSchema.index({ userId: 1, refreshToken: 1 });

const UserSession = mongoConnection.model<
  IUserSessionDocument,
  IUserSessionModel
>('UserSession', UserSessionSchema, 'UserSession');

export default UserSession;
