-- create database accomodations;

-- create type role as enum( 'Holder', 'Student', 'Admin');


create table users (
    id serial not null primary key,
    user_first_name varchar (60) not null,
    user_password varchar(20) not null,
    user_last_name varchar(60) not null, 
    user_phone_number int not null,
    user_role role not null
);



create table state (
    id serial not null primary key,
    name varchar(60)
);

   

    create table Classified (
        classified_id serial not null primary key,
        holder_id int not null references users(id), 
        state_id int not null references state(id), 
        condition text,
        image_url varchar(200) not null,
        monthly_price int not null,
        max_students smallint,
        room_count smallint not null,
        address varchar(300) not null,
        additional_info text not null,
        classified_created_at timestamp default current_timestamp
    );

