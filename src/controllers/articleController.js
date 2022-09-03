import APIResponse from "../helpers/APIResponse";
import ArticleModel from "../models/article-model";

class ArticleController {
    async listAll(req, res) {
        try {
            const articles = await ArticleModel.find()
                .limit(20)
                .sort("-createdAt");
            return APIResponse.successResponseWithData(
                res,
                articles,
                "success"
            );
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async listOne(req, res) {
        try {
            const { slug } = req.params;
            const data = await ArticleModel.findOne({ slug })
                .limit(20)
                .sort("-createdAt");
            return APIResponse.successResponseWithData(res, data, "success");
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async updateOne(req, res) {
        try {
            const { id: articleId } = req.params;
            const { _id } = req.user;
            const { title, content, cover, slug } = req.body;
            if (!slug) {
                return APIResponse.validationError("slug can't be empty");
            }
            const data = await ArticleModel.findByIdAndUpdate(
                { _id: articleId },
                {
                    title,
                    content,
                    cover,
                    slug,
                    author: _id,
                },
                { new: true }
            );
            return APIResponse.successResponseWithData(res, data, "success");
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async createOne(req, res) {
        try {
            const { _id } = req.user;
            const { title, content, cover, slug } = req.body;
            if (!slug) {
                return APIResponse.validationError(res, "slug can't be empty");
            }
            const article = await ArticleModel.find({ slug });
            console.log({ article });
            if (article.length) {
                return APIResponse.validationError(res, "slug already in use");
            }
            const createdArticle = await ArticleModel.create({
                title,
                content,
                cover,
                slug,
                author: _id,
            });

            return APIResponse.successResponseWithData(
                res,
                createdArticle,
                "article created"
            );
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }
}

export default new ArticleController();