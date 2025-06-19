import userModel from "../Models/userModel.js";

const createAccessAndRefreshToken = async (userId) => {
    try {
        const findUser = await userModel.findOne({_id:userId});
        // genrate token
        const AccessToken = await findUser.genrateAccessToken();
        const RefreshToken = await findUser.generateRefreshToken();
        findUser.refreshToken = RefreshToken;
        //save refreshTOken
        await findUser.save({validateBeforeSave: false});

        return {AccessToken, RefreshToken};
        
    } catch (error) {
    console.log("Error in generateAccessAndRefreshToken:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
    }
}

export {createAccessAndRefreshToken}