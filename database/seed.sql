/* 
After sequelize syncs run below for seed information

*/
use bartr_db;

insert into bartr_db.categories (Category,imgSource, updatedAt, createdAt)
values ('Technology','http://cdn.mysitemyway.com/icons-watermarks/simple-black/ocha/ocha_telecommunications-computer/ocha_telecommunications-computer_simple-black_512x512.png', now(), now());

insert into bartr_db.categories (Category, imgSource, updatedAt, createdAt)
values ('Furniture','https://library.missouri.edu/news/wp-content/uploads/sites/53/2017/05/chair_1495130814.png', now(), now());

insert into bartr_db.categories (Category, imgSource, updatedAt, createdAt)
values ('Vehicles', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/CH-Zusatztafel-Leichte_Motorwagen.svg/2000px-CH-Zusatztafel-Leichte_Motorwagen.svg.png', now(), now());

insert into bartr_db.categories (Category,imgSource, updatedAt, createdAt)
values ('Apparel','http://images.clipartpanda.com/shoe-clip-art-KcnXnEacq.svg', now(), now());

insert into bartr_db.categories (Category,imgSource, updatedAt, createdAt)
values ('Sporting Goods','http://www.freeportnewsnetwork.com/wp-content/uploads/2016/07/sports-physicals-600x445.png', now(), now());

insert into bartr_db.categories (Category,imgSource, updatedAt, createdAt)
values ('Other','https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Emojione_BW_2753.svg/2000px-Emojione_BW_2753.svg.png', now(), now());