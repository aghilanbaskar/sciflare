import { Document, Model, Schema } from 'mongoose';
import mongoConnection from './mongoConnection'; // Adjust the import according to your project structure

export interface IOrganization {
  name: string;
  nameLowerCase: string;
  address: string;
  phone: string;
  email: string;
  deleted: boolean;
}

export interface IOrganizationDocument extends IOrganization, Document {}

type IOrganizationModel = Model<IOrganizationDocument> & {
  findByEmail(email: string): Promise<IOrganizationDocument | null>;
};

const OrganizationSchema: Schema<IOrganizationDocument> = new Schema(
  {
    name: { type: String, required: true },
    nameLowerCase: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

OrganizationSchema.statics.findByName = function (
  email: string,
): Promise<IOrganizationDocument | null> {
  return this.findOne({ email, deleted: false });
};

OrganizationSchema.index({ email: 1 });
OrganizationSchema.index({ nameLowerCase: 1, deleted: 1 }, { unique: true });

// Pre-save hook to update nameLowerCase before saving
OrganizationSchema.pre<IOrganizationDocument>('save', function (next) {
  if (this.isModified('name')) {
    this.nameLowerCase = this.name.toLowerCase();
  }
  next();
});

const Organization = mongoConnection.model<
  IOrganizationDocument,
  IOrganizationModel
>('Organization', OrganizationSchema);

export default Organization;
