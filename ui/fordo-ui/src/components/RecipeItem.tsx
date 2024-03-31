import defaultImage from "../assets/default.png";

type RecipeItemPropType = Partial<{
    recipe_name: string | null;
    description: string | null;
    prep_time: number | null,
    cook_time: number | null,
    calorie_count: number | null,
    serving_size: number | null
}>;
const RecipeItem = ({ recipe_name,
    description,
    prep_time,
    cook_time,
    calorie_count,
    serving_size
}: RecipeItemPropType) => {
    return (
        <div className="flex items-center space-x-4 text-white">
            <div className="flex-shrink-0">
                <img className="w-16 h-16 rounded-full" src={defaultImage} alt="default food image" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-2xl text-gray-900 truncate dark:text-white">
                    {recipe_name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {description}
                    <br />
                    Calories per serving: {calorie_count}
                    <br />
                    Serves: {serving_size} people
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                Prep Time: {prep_time}
                <br />
                Cook Time: {cook_time}
            </div>
        </div>
    )
}

export default RecipeItem