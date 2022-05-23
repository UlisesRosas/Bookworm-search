const { AuthenticationError } = require('apollo-server-express');
// we only imported tyhe user because Book is asociated in the User model
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not Logged In!');
        }
    },
    Mutation: {
        // adduser creates a user
        addUser: async (parent, args) => {
            // wait for the user variables to be provided ex: email, username...
            // uses the create() method to create a user 
            const user = await User.create(args);
            // authenticates the user
            const token = signToken(user);

            return { token, user };
        },
        // login
        login: async (parent, { email, password }) => {
            // waits for the email from the user and uses findOne() to find the user
            //   to find the user with this email
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials!');
            }
            // var waits for correct password from params by using isCorrectPassword()
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credantials');
            }
            const token = signToken(user);
            //  if the above information is correct it will return the user and a auth token
            //    to indicate sign in
            return { token, user };
        },
        
        // saveBook
        // this context param makes sure the user is signed in while performing this mutation
        saveBook: async (parent, { bookData }, context) => {
            // if user is signed in
            if (context.user) {
                // finds the user to update
                // a;ternatively you can use find one and update
                const addBook = await User.findByIdAndUpdate(
                    // gets the user id from context
                    { _id: context.user._id },
                    // This array is from the User model
                    { $addToSet: { savedBooks: bookData } },
                    // insures that the updated version of the array is shown
                    { new: true }
                    // populates the array in to the User model
                )
                return addBook;
            }
            throw new AuthenticationError('You ned to be logged in');
        },
        //removeBook
        // ?????? 
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const takeBook = User.findByIdAndUpdate(
                    // gets the user id from context
                    { _id: context.user._id },
                    // updates the array with book id and without duplicates
                    { $pull: { savedBooks: {bookId} } },
                    // insures that the updated version of the array is shown
                    { new: true }
                )
                if(!args.book.bookId){
                    throw new Error('There is no book with this id')
                }
                return takeBook;
            }
            throw new AuthenticationError('You ned to be logged in');
        }

    }

}

module.exports = resolvers;


