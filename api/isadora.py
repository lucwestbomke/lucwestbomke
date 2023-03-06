import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import redis
import pickle
import os
import json
from uuid import uuid4


def handle_post(image):

  return result

def createIsadoraNet():
  class isaNet(nn.Module):
    def __init__(self):
      super().__init__()

      self.conv1 = nn.Conv2d(3, 16, kernel_size=5, stride=1, padding=0)
      self.maxPool1 = nn.MaxPool2d(4, 4)

      conv1SizeV = (np.floor((540 + 2 * 0 - 5 / 1)) + 1) // 4
      conv1SizeH = (np.floor((960 + 2 * 0 - 5 / 1)) + 1) // 4

      self.conv2 = nn.Conv2d(16, 32, kernel_size=5, stride=1, padding=1)
      self.maxPool2 = nn.MaxPool2d(3, 3)

      conv2SizeV = (np.floor((conv1SizeV + 2 * 1 - 5) / 1) + 1) // 3
      conv2SizeH = (np.floor((conv1SizeH + 2 * 1 - 5) / 1) + 1) // 3

      self.conv3 = nn.Conv2d(32, 36, kernel_size=3, stride=1, padding=1)
      self.maxPool3 = nn.MaxPool2d((2, 3))

      conv3SizeV = (np.floor((conv2SizeV + 2 * 1 - 3) / 1) + 1) // 2
      conv3SizeH = (np.floor((conv2SizeH + 2 * 1 - 3) / 1) + 1) // 3

      self.conv4 = nn.Conv2d(36, 40, kernel_size=3, stride=1, padding=0)
      self.maxPool4 = nn.MaxPool2d((2, 3))

      conv4SizeV = (np.floor((conv3SizeV + 2 * 0 - 3) / 1) + 1) // 2
      conv4SizeH = (np.floor((conv3SizeH + 2 * 0 - 3) / 1) + 1) // 3

      expectSize = 40 * int(conv4SizeH * conv4SizeV)

      self.fc1 = nn.Linear(expectSize, 1000)
      self.fc2 = nn.Linear(1000, 220)
      self.fc3 = nn.Linear(220, 50)
      self.out = nn.Linear(50, 6)

    def forward(self, x):
      # x = F.relu( self.maxPool1( self.conv1( x ) ) )
      # x = F.relu( self.maxPool2( self.conv2( x ) ) )
      # x = F.relu( self.maxPool3( self.conv3( x ) ) )
      # x = F.relu( self.maxPool4( self.conv4( x ) ) )

      x = self.maxPool1(F.relu(self.conv1(x)))
      x = self.maxPool2(F.relu(self.conv2(x)))
      x = self.maxPool3(F.relu(self.conv3(x)))
      x = self.maxPool4(F.relu(self.conv4(x)))

      nUnits = x.shape.numel() / x.shape[0]
      x = x.view(-1, int(nUnits))

      x = F.relu(self.fc1(x))
      x = F.relu(self.fc2(x))
      x = F.relu(self.fc3(x))
      x = self.out(x)
      # x = F.softmax( self.out( x ) )

      return x

  net = isaNet()

  lossfun = nn.CrossEntropyLoss()

  optimizer = torch.optim.Adam(net.parameters(), lr=0.001)

  return net, lossfun, optimizer

def image_transpose_tensor(rgba_image):
  image_array = np.array(rgba_image)
  # image_array = image_array.reshape((-1, 3))
  # image_array = image_array.reshape((540, 960, 3))
  image_array = image_array.transpose((2, 0, 1))

  return torch.tensor(image_array).float()

def get_result(net_output):
  net_output = torch.nn.functional.softmax(net_output, dim=1)
  probability = np.max(net_output.detach().numpy()).item()
  categorie = np.argmax(net_output.detach().numpy())
  categorie = categories[categorie]
  list = net_output.detach().numpy()[0, :].tolist()
  return {
    "probability": probability,
    "categorie": categorie,
    "net_ouput": {
        "space": list[0],
        "ocean": list[1],
        "human": list[2],
        "landscape": list[3],
        "animal": list[4],
        "house": list[5],
    },
  }

categories = ["space", "ocean", "human", "landscape", "animal", "house"]

redis_host = os.environ.get("REDIS_HOST", "127.0.0.1")
redis_password = os.environ.get("REDIS_PASSWORD")
redis_port = int(os.environ.get("REDIS_PORT"))

r = redis.Redis(host=redis_host, port=redis_port, db=0, password=redis_password)

def save_tensors_pickle(tensors):
  try:
    with open("./data_tensor.pkl", "wb") as file:
      pickle.dump(tensors, file)
  except:
    pass

def load_tensors_pickle():
  try:
    with open("./data_tensor.pkl", "rb") as file:
      loaded_data_tensors = pickle.load(file)
  except:
    loaded_data_tensors = None
  return loaded_data_tensors

def save_image_redis(tensor):
  id = str(uuid4())
  try:
    r.hset(id, mapping={
      "data": json.dumps(tensor.tolist()),
      "category": -1
    })
  except:
    raise ConnectionError
  return id

def add_categorie_redis(id: str, categorie: float):
  try:
    r.hset(id, "category", categorie)
  except:
    raise ConnectionError
