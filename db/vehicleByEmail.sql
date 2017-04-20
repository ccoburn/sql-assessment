select *
from Vehicles
join Users on Vehicles.ownerID = Users.id
where Users.email = $1;
