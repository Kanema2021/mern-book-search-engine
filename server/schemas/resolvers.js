const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // users: async () => {
        //     return User.find()
        // },
        // user: async (parent, { userId }) => {
        //     return User.findOne({ _id: userId });
        // },

        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData
            }
        }
    },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError("No user with this email found!");
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                  $addToSet: { books: book }
                },
                {
                  new: true,
                  runValidators: true,
                }
            );
        },
       
        removeBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { books: book } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers