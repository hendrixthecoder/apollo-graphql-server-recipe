export default `#graphql
    type Recipe {
        name: String
        description: String
        createdAt: String
        thumbsUp: Int
        thumbsDown: Int
    }

    input RecipeInput {
        name: String
        description: String
    }

    # Kind of like the root query in typical apollo-server with recipe being the query name and Recipe bring the type of data returned
    type Query {
        recipe(ID: ID!): Recipe!
        getRecipe(amount: Int!): [Recipe]
        getAllRecipes: [Recipe]
    }

    type Mutation {
        createRecipe(recipeInput: RecipeInput): Recipe!
        deleteRecipe(ID: ID!): Boolean
        editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
    }
`