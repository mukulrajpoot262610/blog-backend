import UserModel from "../models/user-model";

class ProfileService {
    async getProfile(filter) {
        try {
            const data = await UserModel.findOne(filter);
            data.password = "";
            return data;
        } catch (err) {
            return err;
        }
    }

    async updateOne(filter, data) {
        return UserModel.updateOne(filter, data, { new: true });
    }
}

export default new ProfileService();
