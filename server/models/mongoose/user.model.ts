import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const userSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 24,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 32,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      match: new RegExp('^((?!.)[w-_.]*[^.])(@w+)(.w+(.w+)?[^.W])$'),
    },
    phone: {
      type: Schema.Types.String,
      required: true,
      match: new RegExp(
        '+(9[976]d|8[987530]d|6[987]d|5[90]d|42d|3[875]d|2[98654321]d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)d{1,14}$'
      ),
    },
    password: {
      type: Schema.Types.String,
      match: new RegExp(
        '^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,64}$'
      ),
    },
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.firstName + ' ' + this.lastName;
        },
      },
    },
    timestamps: true,
  }
);

userSchema.plugin(MongooseDelete, { deletedAt: true, deletedBy: true });

const User = model('Song', userSchema);

export default User;
