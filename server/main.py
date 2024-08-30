from fastapi import FastAPI, Response, status

app = FastAPI()

@app.get("/")
async def root():
    return Response(status.HTTP_200_OK, content="welcome to fastapi !")