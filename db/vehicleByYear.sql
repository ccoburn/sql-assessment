select vehicles.make, vehicles.model, vehicles.year, users.firstname, users.lastname
from vehicles
JOIN Users on Vehicles.ownerID = Users.id
where vehicles.year > 2000
order by vehicles.year desc;
