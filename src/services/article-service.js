import ArticleModel from "../models/article-model";

class ArticleService {
    async addOne(data) {
        return ArticleModel.find(data).lean();
    }

    async updateOne(filter, data) {
        return ArticleModel.updateOne(filter, data, { new: true });
    }
}

export default new ArticleService();
