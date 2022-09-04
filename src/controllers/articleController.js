import APIResponse from "../helpers/APIResponse";
import ArticleModel from "../models/article-model";

class ArticleController {
    async search(req, res) {
        try {
            const { title } = req.body;
            const regex = new RegExp(title, "i");
            const articles = await ArticleModel.find({
                title: { $regex: regex },
            })
                .limit(20)
                .populate("author")
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

    async listAll(req, res) {
        try {
            const articles = await ArticleModel.find()
                .limit(20)
                .populate("author")
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

    async listAllWithLikes(req, res) {
        try {
            const articles = await ArticleModel.find()
                .limit(20)
                .populate("author")
                .sort("-likes");
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
                .populate("author")
                .sort("-createdAt");
            return APIResponse.successResponseWithData(res, data, "success");
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async like(req, res) {
        try {
            const { id: articleId } = req.params;
            const article = await ArticleModel.findById({ _id: articleId });
            const data = await ArticleModel.findByIdAndUpdate(
                { _id: articleId },
                {
                    likes: article.likes + 1,
                },
                { new: true }
            );
            return APIResponse.successResponseWithData(
                res,
                data.likes,
                "success"
            );
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }

    async updateOne(req, res) {
        try {
            const { id: articleId } = req.params;
            const { _id } = req.user;
            const { title, content, cover, slug, subtitle } = req.body;
            if (!slug) {
                return APIResponse.validationError("slug can't be empty");
            }
            const data = await ArticleModel.findByIdAndUpdate(
                { _id: articleId },
                {
                    title,
                    content,
                    subtitle,
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
            const { title, content, cover, slug, subtitle } = req.body;
            if (!slug) {
                return APIResponse.validationError(res, "slug can't be empty");
            }
            const article = await ArticleModel.findOne({ slug });
            if (article) {
                return APIResponse.validationError(res, "slug already in use");
            }
            const createdArticle = await ArticleModel.create({
                title,
                content,
                cover,
                slug,
                subtitle,
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

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            const article = await ArticleModel.findById({ _id: id });
            if (!article) {
                return APIResponse.notFoundResponse(res, "article not found");
            }
            const data = await ArticleModel.findByIdAndDelete({ _id: id });
            return APIResponse.successResponseWithData(
                res,
                data,
                "article deleted"
            );
        } catch (err) {
            console.log(err);
            return APIResponse.errorResponse(res);
        }
    }
}

export default new ArticleController();
