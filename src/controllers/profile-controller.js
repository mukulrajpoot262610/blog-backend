import mongoose from "mongoose";
import APIResponse from "../helpers/APIResponse";
import profileService from "../services/profile-service";

class ProfileController {
    async update(req, res) {
        try {
            const { user } = req;
            console.log(user._id);
            const { hashnode, avatar, github, linkedin, about } = req.body;
            let profile = await profileService.findOne({ user: user._id });
            if (!profile) {
                profile = await profileService.addOne({
                    user: mongoose.Types.ObjectId(user._id),
                    hashnode,
                    github,
                    avatar,
                    linkedin,
                    about,
                });
            } else {
                profile = await profileService.updateOne(
                    { user: user._id },
                    {
                        user: mongoose.Types.ObjectId(user._id),
                        hashnode,
                        github,
                        linkedin,
                        avatar,
                        about,
                    }
                );
            }

            return APIResponse.successResponseWithData(res, profile);
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async getProfile(req, res) {
        try {
            const { id } = req.params;
            console.log({ id });
            const profile = await profileService.findOne({
                user: mongoose.Types.ObjectId(id),
            });
            try {
                //
            } catch (err) {
                console.log(err, "error in finding projects");
            }
            try {
                //
            } catch (err) {
                console.log(err, "error in finding courses");
            }
            return APIResponse.successResponseWithData(res, {
                profile: profile && profile.toObject(),
            });
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res, err);
        }
    }
}

export default new ProfileController();
