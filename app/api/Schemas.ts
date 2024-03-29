import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    quote: {
        type: String,
    },
    image: {
        type: String,
    },
    bio: {
        desc: String,
        life: String,
        wiki: String,
        networth: String,
        education: String,
        occupation: String
    }
});

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }

})

export const Quotes = mongoose.models.Quotes || mongoose.model("Quotes", quoteSchema, "quotes");

export const Logins = mongoose.models.Logins || mongoose.model("Logins", loginSchema, "admins");
