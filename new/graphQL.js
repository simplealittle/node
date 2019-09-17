var express = require('express');  
var graphqlHTTP = require('express-graphql');  
//var { buildSchema } = require('graphql'); 

const graphql =require('graphql');
 var {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
}=graphql;
 
//定义schema  
//var schema = buildSchema(`  
//  type User{  
//      name: String  
//      sex: String  
//      intro: String  
//  }  
//  type Query {  
//      user:User  
//  }  
//`);  
var data={
    "1": {
        "id": "4",
        "name": "Dan"
    },
    "2": {
        "id": "5",
        "name": "Marie"
    },
    "3": {
        "id": "6",
        "name": "Jessie"
    }
}



  const User = new GraphQLObjectType({
    name: 'User',
    description: 'User对象',
    fields: {
         id: {
            type: GraphQLInt
        },
        name: {
            type:  GraphQLString
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: User,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
            	for(var i in data){
            		if(data[i].id>=args.id){
            			return data[i]
            		}
            	}
//              return data[args.id];
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
});


//定义服务端数据  

  
var app = express();  
app.use('/graphql', graphqlHTTP({  
    schema: Schema,  
//  rootValue: root,  
    graphiql: true, //启用GraphiQL  
}));  
app.listen(8000, () => console.log('请在浏览器中打开地址：http://localhost:8000/graphql'));  