import ArticleModel from "../models/article-model";

class ArticleService {
    async addOne(data) {
        return ArticleModel.create(data);
    }

    async updateOne(filter, data) {
        return ArticleModel.updateOne(filter, data, { new: true });
    }
}

export default new ArticleService();
