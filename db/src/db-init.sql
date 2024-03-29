select version();
-- Database initialization script

-- (1) Create Schema
drop schema if exists fordo cascade;
create schema fordo;

-- (2) Create Tables

-- recipe
create table fordo.recipe (
	id int primary key generated by default as identity,
	recipe_name varchar,
	prep_time int,
	cook_time int,
	calorie_count numeric(10,2),
	serving_size smallint,
	is_active bool not null
);

-- ingredient
create table fordo.ingredient (
	id int primary key generated by default as identity,
	ingredient_name varchar,
	ingredient_details varchar,
	linked_recipe int default null,
	is_active bool not null,
	constraint fk_ingredient_recipe
		foreign key (linked_recipe)
		references recipe(id)
		on delete cascade
);

-- recipe - ingredient map
create table fordo.recipe_ingredient_map (
	id int primary key generated by default as identity,
	recipe_id int not null,
	ingredient_id int not null,
	quantity int,
	unit varchar,
	is_active bool not null,
	constraint fk_recipe_ingredient_map_recipe
		foreign key (recipe_id)
		references recipe(id)
		on delete cascade,
	constraint fk_recipe_ingredient_map_ingredient
		foreign key (ingredient_id)
		references ingredient(id)
		on delete cascade
);

-- ingredient local name type
create table fordo.ingredient_local_name (
	id int primary key generated by default as identity,
	ingredient_id int not null,
	local_name varchar not null,
	is_active bool not null,
	constraint fk_ingredient_ingredient_local_name
		foreign key (ingredient_id)
		references ingredient(id)
		on delete cascade
);

-- recipe step
create table fordo.recipe_step (
	id int primary key generated by default as identity,
	recipe_id int,
	sort_order smallint,
	title varchar default null,
	body varchar default null,
	is_active bool not null,
	constraint fk_recipe_steps_recipe
		foreign key (recipe_id)
		references recipe(id)
		on delete cascade
);


-- meal type
create table fordo.meal_type (
	id int primary key generated by default as identity,
	meal_type_label varchar not null,
	is_active bool not null
);

-- recipe - meal_type map
create table fordo.recipe_meal_type_map (
	id int primary key generated by default as identity,
	recipe_id int not null,
	meal_type_id int not null,
	is_active bool not null,
	constraint fk_recipe_meal_type_map_recipe
		foreign key (recipe_id)
		references recipe(id)
		on delete cascade,
	constraint fk_recipe_meal_type_map_meal_type
		foreign key (meal_type_id)
		references meal_type(id)
		on delete cascade
);


-- note
create table fordo.note (
	id int primary key generated by default as identity,
	title varchar,
	body varchar,
	recipe_id int not null,
	constraint fk_recipe_note
		foreign key (recipe_id)
		references recipe(id)
		on delete cascade,
	is_active bool not null
);

-- tag
create table fordo.tag (
	id int primary key generated by default as identity,
	tag_label varchar unique not null,
	is_active bool not null
);

-- tag map
create table fordo.tag_map (
	id int primary key generated by default as identity,
	recipe_id int not null,
	tag_id int not null,
	is_active bool not null,
	constraint fk_recipe_tag_map
		foreign key (recipe_id)
		references recipe(id)
		on delete cascade,
	constraint fk_tag_tag_map
		foreign key (tag_id)
		references tag(id)
		on delete cascade
);



