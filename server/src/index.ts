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
import session  from "express-session";
import { __prod__, COOKIENAME } from "./constants";
import createMemoryStore from "memorystore";

const main = async () => {
    
    const app = express();
    dotenv.config({path: path.resolve(__dirname, '.env')});

    const memoryStore = createMemoryStore(session);

    app.use(session({
        name: COOKIENAME,
        store: new memoryStore({
            checkPeriod: 86400000 // prune expired entries every 24h
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
            httpOnly: true,
            sameSite: "lax", // csrf
            secure: __prod__ ? true : false, // cookie only works in https
          },
        saveUninitialized: false,
        secret: process.env.cookieSecret || "",
        resave: false
    }));
    
    
    await mongoose.connect(process.env.dbconnection || "")

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, CategoryResolver, UserResolver],
            validate: false,
            emitSchemaFile: true,
        }),
        context: ({ req, res }) => ({req, res})
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    
    app.get('/', (req, res) => {res.send('Hello World!')});
    
    app.listen(8000, () => console.log('Listening on port 8000!'));
}

main().catch(err => console.log(err));