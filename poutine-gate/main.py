from fastapi import FastAPI

from models import Robot

app = FastAPI()

@app.get('/')
async def root():
    return{"message": "Hello World"}



# Get a single robot

# Create a robot
@app.post('/robot/')
async def create_robot(robot: Robot):
    return {robot: robot}

# Update a robot

# Delete a robot
