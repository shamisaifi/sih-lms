from fastapi import FastAPI, Response, status, Request
from fastapi.responses import JSONResponse
from mongoengine import connect

from models.course import Course

app = FastAPI()

connect("gyaansetu", "mongodb+srv://memberfamily351:%3Cdb_password%3E@cluster0.oddfo.mongodb.net/")


@app.get("/")
async def root():
    return Response(status.HTTP_200_OK, content="welcome to fastapi !")


@app.get("/courses")
async def get_courses(req: Request):
    try:
        courses = Course.objects().to_json()
        return Response(status.HTTP_200_OK, content=courses)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})


@app.post("/save-courses")
async def save_courses(req: Request):
    try:
        data = await req.json()
        course = Course(**data).save()
        return Response(status.HTTP_201_CREATED, content=course.to_json())
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})


@app.get("/course/{course_id}")
async def get_course(course_id: str):
    try:
        course = Course.objects(id=course_id).first()
        return Response(status.HTTP_200_OK, content=course.to_json())
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})


@app.put("/update-course/{course_id}")
async def update_course(course_id: str, req: Request):
    try:
        data = await req.json()
        course = Course.objects(id=course_id).update(**data)
        return Response(status.HTTP_200_OK, content=course.to_json())
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})


@app.delete("/delete-course/{course_id}")
async def delete_course(course_id: str):
    try:
        course = Course.objects(id=course_id).delete()
        return Response(status.HTTP_200_OK, content=course.to_json())
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})
