import mongoose from "mongoose";
import APIResponse from "../helpers/APIResponse";
import ArticleModel from "../models/article-model";
import UserModel from "../models/user-model";
import profileService from "../services/profile-service";

class ProfileController {
    async update(req, res) {
        try {
            const { user } = req;
            console.log(user._id);
            const { avatar, github, linkedin, about } = req.body;
            let profile = await profileService.getProfile({ user: user._id });
            if (!profile) {
                return APIResponse.notFoundResponse(res, "user not found");
            }

            profile = await UserModel.findByIdAndUpdate(
                { _id: user._id },
                {
                    github,
                    linkedin,
                    avatar,
                    about,
                }
            );

            profile.password = "";
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
            const profile = await profileService.getProfile({
                user: mongoose.Types.ObjectId(id),
            });
            let articles = [];
            const filter = {
                author: mongoose.Types.ObjectId(id),
            };
            try {
                articles = await ArticleModel.find(filter)
                    .limit(20)
                    .sort("-createdAt");
            } catch (err) {
                console.log(err, "error in finding articles");
            }
            return APIResponse.successResponseWithData(res, {
                profile: profile && profile.toObject(),
                articles,
            });
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res, err);
        }
    }

    async getMyProfile(req, res) {
        try {
            const { _id } = req.user;
            const user = await profileService.getProfile({
                _id: mongoose.Types.ObjectId(_id),
            });
            let articles = [];

            const filter = {
                author: mongoose.Types.ObjectId(_id),
            };
            try {
                articles = await ArticleModel.find(filter)
                    .limit(20)
                    .sort("-createdAt");
            } catch (err) {
                console.log(err, "error in finding articles");
            }
            return APIResponse.successResponseWithData(res, {
                profile: user && user.toObject(),
                articles,
            });
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res, err);
        }
    }
}

export default new ProfileController();
