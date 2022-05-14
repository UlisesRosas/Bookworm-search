const { AuthenticationError } = require('apollo-server-express');
// we only imported tyhe user because Book is asociated in the User model
const { User } = require('../models');
const { signToken } = require('../utils/auth'); 


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id}) 
                .select('-__v -password')
                return userData;
            } 
            throw new AuthenticationError('Not Logged In!');
        }
    },
    Mutation: {
        // adduser
        // login
        // saveBook
        //removeBook
    }

}

module.exports = resolvers;


