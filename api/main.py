from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from isadora import handle_post as hpoi
from isadora import handle_patch as hpai

import numpy as np

class data(BaseModel):
  image_data: list

app = FastAPI()

@app.post("/api/isadora")
async def isadora(data: data):
  result = hpoi(data.image_data)
  return result

@app.patch("/api/isadora")
async def isadora(data: data):
  result = hpai(data)
  return result