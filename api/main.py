from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import numpy as np

class data(BaseModel):
  data: list
  meta: str

app = FastAPI()

@app.post("/api/isadora")
async def isadora(data: data):
  label = find_label_category(data.meta)
  dataT = image_transpose_tensor(data.data)
  yHat = cnnNet(dataT.unsqueeze(0))
  
  result = get_result(yHat)
  
  # dataT.unsqueeze_(-1)
  # dataT[0,0,0,0] = label
  # conc_tensors = concatenate_tensors(loaded_data_tensors, savable_tensor)

  # save_tensors(conc_tensors)

  image_id = save_image_redis(dataT)

  result["image_id"] = image_id
  return result