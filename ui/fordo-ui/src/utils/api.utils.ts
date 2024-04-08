export const getRecipeList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/recipe/list`, {
      method: "POST",
    })
  ).json();
  console.log(res.recipes);
  return res.recipes;
};

export const getRecipeDetails = async (recipeId: number) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/recipe/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: recipeId,
      }),
    })
  ).json();
  console.log(res.details[0]);
  return res.details[0];
};

export const getMealTypeList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/mealtype/list`, {
      method: "POST",
    })
  ).json();
  console.log(res.mealTypes);
  return res.mealTypes;
};

export const createMealType = async (meal_type_label: string) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);

  const res = await fetch(`http://localhost:3000/mealtype/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ meal_type_label }),
  });
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};

export const getTagList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/tag/list`, {
      method: "POST",
    })
  ).json();
  console.log(res.tags);
  return res.tags;
};

export const createTag = async (tag_label: string) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);

  const res = await fetch(`http://localhost:3000/tag/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag_label }),
  });
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};

export const getIngredientList = async () => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);
  const res = await (
    await fetch(`http://localhost:3000/ingredient/list`, {
      method: "POST",
    })
  ).json();
  console.log(res.ingredients);
  return res.ingredients;
};

export const createRecipe = async (recipe: any) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);

  const res = await fetch(`http://localhost:3000/recipe/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};


export const editRecipe = async (recipe: any) => {
  const baseUrl = import.meta.env.API_BASE_URL;
  console.log(baseUrl);

  const res = await fetch(`http://localhost:3000/recipe/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const success = res.status === 200;
  const resBody = await res.json();
  console.log(resBody);
  return success;
};

export const formDataToRecipePayload = (formData: any) => {
  let formIngredients;
  let formSteps;
  let formNotes;
  let formMealTypes;
  let formTags;

  if (formData?.ingredients) {
    formIngredients = [];
    for (const id in formData.ingredients) {
      formIngredients.push({
        id: parseInt(id),
        quantity: formData.ingredients[id]?.quantity
          ? parseInt(formData.ingredients[id].quantity)
          : null,
        unit: formData.ingredients[id]?.unit || null,
      });
    }
  }

  if (formData?.recipe_steps) {
    formSteps = [];
    for (const id in formData.recipe_steps) {
      formSteps.push({ ...formData.recipe_steps[id], sort_order: id });
    }
    formSteps.sort((a, b) => a.sort_order - b.sort_order);
    for (let i = 0; i < formSteps.length; i++) formSteps[i].sort_order = i + 1;
  }

  if (formData?.notes) {
    formNotes = [];
    for (const id in formData.notes) {
      formNotes.push({ ...formData.notes[id] });
    }
  }

  if (formData?.meal_types) {
    formMealTypes = [];
    for (const id in formData.meal_types) {
      if (formData.meal_types[id]) formMealTypes.push(parseInt(id));
    }
  }

  if (formData?.tags) {
    formTags = [];
    for (const id in formData.tags) {
      if (formData.tags[id]) formTags.push(parseInt(id));
    }
  }

  const recipePayload = {
    id: formData?.id || undefined,
    recipe_name: formData?.recipe_name || null,
    description: formData?.description || null,
    prep_time: formData?.prep_time ? parseInt(formData.prep_time) * 60 : null,
    cook_time: formData?.cook_time ? parseInt(formData.cook_time) * 60 : null,
    serving_size: formData?.serving_size
      ? parseInt(formData.serving_size)
      : null,
    calorie_count: formData?.calorie_count
      ? parseFloat(formData.calorie_count)
      : null,
    ingredients: formIngredients,
    steps: formSteps,
    notes: formNotes,
    meal_types: formMealTypes,
    tags: formTags,
  };

  return recipePayload;
};

export const recipeResponseToFormData = (recipeData: any) => {
  let recipeIngredients: any = {};
  let recipeSteps: any = {};
  let recipeNotes: any = {};
  let recipeMealTypes: any = {};
  let recipeTags: any = {};

  if (recipeData?.ingredients) {
    for (const i of recipeData.ingredients) {
      recipeIngredients[i.id.toString()] = {
        id: i.id.toString(),
        label: i.ingredient_name || null,
        quantity: i.quantity || null,
        unit: i.unit || null,
      };
    }
  }
  if (recipeData?.ingredients) {
    for (const step of recipeData.steps) {
      recipeSteps[step.sort_order.toString()] = {
        // id: step.id.toString(),
        title: step.title || null,
        body: step.body || null,
      };
    }
  }

  if (recipeData?.notes) {
    for (const note of recipeData.notes) {
      recipeNotes[note.id.toString()] = {
        title: note.title || null,
        body: note.body || null,
      };
    }
  }

  if (recipeData?.meal_types) {
    for (const mealType of recipeData.meal_types) {
      recipeMealTypes[mealType.id.toString()] = true;
    }
  }

  if (recipeData?.tags) {
    for (const tag of recipeData.tags) {
      if (tag.id) recipeTags[tag.id.toString()] = true;
    }
  }

  const formData = {
    id: recipeData?.id || undefined,
    recipe_name: recipeData?.recipe_name || null,
    description: recipeData?.description || null,
    prep_time: recipeData?.prep_time
      ? (parseInt(recipeData.prep_time) / 60).toFixed(0)
      : null,
    cook_time: recipeData?.cook_time
      ? (parseInt(recipeData.cook_time) / 60).toFixed(0)
      : null,
    serving_size: recipeData?.serving_size
      ? parseInt(recipeData.serving_size)
      : null,
    calorie_count: recipeData?.calorie_count
      ? parseFloat(recipeData.calorie_count)
      : null,
    ingredients: recipeIngredients,
    recipe_steps: recipeSteps,
    notes: recipeNotes,
    meal_types: recipeMealTypes,
    tags: recipeTags,
  };

  console.log(JSON.stringify(formData, null, 2));
  return formData;
};
