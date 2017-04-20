UPDATE Vehicles
SET ownerId = NULL
WHERE id = $1;
