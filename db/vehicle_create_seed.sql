-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS Vehicles;



Create table Vehicles (
  id serial Primary Key,
  make varchar(40),
  model varchar(40),
  year integer,
  ownerId integer references Users(id)
);


insert into Vehicles (make, model, year, ownerId)
values ('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Coup', 2013, 3);
