/**
 * 
 */
import mongoose, {Schema, Types} from "mongoose";
import { Password } from '../utils/helper/passwordHashing';

export interface UserAttrs {
    _id?:string
    provider?: string
    displayName?: string // givenName + familyName
    name: { givenName:string, familyName:string }
    email: { value: string, verified: boolean }
    token: string // access token or password
    picture?: string
};

interface UserModel extends mongoose.Model<UserDoc> {
    CreateUser(user: UserAttrs): Promise<UserDoc>;
}

export interface UserDoc extends mongoose.Document {
    _id?:string
    provider: string
    displayName: string // givenName + familyName
    name: { givenName:string, familyName:string }
    email: { value: string, verified: boolean }
    token: string // access token and password
    picture: string
};

const nameSchema = new Schema(
    {
        givenName: {
            type: String,
            required: true,
        },
        familyName: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const emailSchema = new Schema(
    {
        value: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 25,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const userSchema = new Schema(
    {
        provider: {
            type: String,
            required: true,
            default: 'local'
        },
        displayName: {
            type: String,
            default: ''
        },
        name: {
            type: nameSchema,
        },
        email: {
            type: emailSchema,
        },
        token: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'USER_AUTH'
    }
);

userSchema.pre('save', async function (done) {
    if (this.isNew && this.token) {
        const _token = await Password.toHash(this.token);
        this.token = _token;
    }
    // don't working = this.isModified('name')
    this.displayName = `${this.name!.givenName} ${this.name!.familyName}`;

    done();
})

userSchema.statics.CreateUser = async (user:UserAttrs) => {
    try {
        const newUser = new User(user);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
