import Post from "../models/Post";

const getPopularTags = async (req, res, next) => {
    try {
        const tags = await Post.aggregate([
            {
                $unwind: "$tags" // Separar cada tag en un documento independiente
            },
            {
                $group: {
                    _id: "$tags", // Agrupar por tag
                    count: { $sum: 1 } // Contar cuántas veces aparece cada tag
                }
            },
            {
                $sort: { count: -1 } // Ordenar por la cuenta en orden descendente
            },
            {
                $limit: 5 // Limitar a los 5 tags más populares
            }
        ]);

        return res.json(tags);
    } catch (error) {
        next(error);
    }
}

export { getPopularTags };