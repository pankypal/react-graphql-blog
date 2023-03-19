import * as dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import path from 'path';
import mongoose from 'mongoose';
import {PostResolver} from "./resolvers/post";
import {CategoryResolver} from "./resolvers/category";
import { UserResolver } from './resolvers/user';

const main = async () => {

    const app = express();
    dotenv.config({path: path.resolve(__dirname, '.env')});
    
    await mongoose.connect(process.env.dbconnection || "")

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, CategoryResolver, UserResolver],
            validate: false,
            emitSchemaFile: true,
        }),
        context: ({ req }) => req
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    
    app.get('*', (_, res) => res.send('Hello World!'));
    
    app.listen(8000, () => console.log('Listening on port 8000!'));
}

main().catch(err => console.log(err));