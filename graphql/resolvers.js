import Recipe from '../models/Recipe.js'

const Query = {
    recipe: async (parent, { ID }) => {
        return await Recipe.findById(ID);
    },
    getRecipe: async (parent, { amount }) => {
        // Fetch the most recent recipes, return results limited to the amount passed
        return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
    getAllRecipes: async () => {
        return await Recipe.find({});
    }
};

const Mutation = {
    createRecipe: async (parent, { recipeInput: { name, description } }) => {
        //first destructured the args object to get the recipeInput, then destructured the recipeInput to get the name and description
        const recipe = new Recipe({ name, description, createdAt: new Date().toISOString(), thumbsUp: 0, thumbsDown: 0 })
        const res = await recipe.save()
        return {
            id: res.id,
            ...res._doc
        }
    },
    deleteRecipe: async (parent, { ID }) => {
        //returns 1 if successful and 0 if not which matches type def of deleteRecipe return type
        return (await Recipe.deleteOne({ _id: ID })).deletedCount
    },
    editRecipe: async (parent, { ID, recipeInput: { name, description } }) => {
        //returns 1 if successful and 0 if not which matches type def of editRecipe return type
        return (await Recipe.updateOne({ _id: ID }, { $set: { name: name, description: description } })).modifiedCount
    }
}

export default { Query, Mutation }